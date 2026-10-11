import type { SupabaseClient } from "@supabase/supabase-js";
import { blocks, getTopicsForBlock } from "@/content";
import {
  blockProgress,
  isBlockUnlocked,
  isCheckpointCleared,
  type ProgressState,
} from "@/lib/progress-core";
import {
  CURRICULUM_VERSION,
  STREAK_WEEK_XP_THRESHOLD,
  XP_BY_EVENT,
  levelFromXp,
  utcWeekStart,
  type XpEventType,
} from "@/lib/xp/config";

export { CURRICULUM_VERSION };

type AwardXpInput = {
  userId: string;
  eventType: XpEventType;
  xp?: number;
  refType?: "topic" | "checkpoint" | "badge" | "system";
  refId?: string;
  idempotencyKey: string;
  enrollmentId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function awardXp(
  admin: SupabaseClient,
  input: AwardXpInput,
): Promise<number> {
  const xp =
    input.xp ??
    (input.eventType === "admin_adjust"
      ? 0
      : XP_BY_EVENT[input.eventType as keyof typeof XP_BY_EVENT]);

  const { data: inserted, error } = await admin
    .from("xp_events")
    .insert({
      user_id: input.userId,
      event_type: input.eventType,
      ref_type: input.refType ?? null,
      ref_id: input.refId ?? null,
      xp,
      idempotency_key: input.idempotencyKey,
      enrollment_id: input.enrollmentId ?? null,
      metadata: input.metadata ?? {},
    })
    .select("id, xp")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") return 0;
    throw error;
  }
  if (!inserted) return 0;

  await bumpLearnerStatsForXp(admin, input.userId, inserted.xp as number);
  return inserted.xp as number;
}

async function bumpLearnerStatsForXp(
  admin: SupabaseClient,
  userId: string,
  xpDelta: number,
) {
  const weekStart = utcWeekStart();
  const { data: existing } = await admin
    .from("learner_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existing) {
    await admin.from("learner_stats").insert({
      user_id: userId,
      total_xp: Math.max(0, xpDelta),
      level: levelFromXp(Math.max(0, xpDelta)),
      streak_week_xp: Math.max(0, xpDelta),
      streak_week_start: weekStart,
      last_activity_at: new Date().toISOString(),
    });
    return;
  }

  let streakWeekXp = existing.streak_week_xp as number;
  let streakWeekStart = existing.streak_week_start as string | null;
  let currentStreak = existing.current_streak_weeks as number;
  let longest = existing.longest_streak_weeks as number;

  if (streakWeekStart !== weekStart) {
    const prev = streakWeekStart;
    if (prev) {
      const prevDate = new Date(`${prev}T00:00:00.000Z`);
      const expectedPrev = new Date(`${weekStart}T00:00:00.000Z`);
      expectedPrev.setUTCDate(expectedPrev.getUTCDate() - 7);
      const continued =
        prevDate.getTime() === expectedPrev.getTime() &&
        streakWeekXp >= STREAK_WEEK_XP_THRESHOLD;
      currentStreak = continued ? currentStreak + 1 : 0;
      longest = Math.max(longest, currentStreak);
    }
    streakWeekXp = 0;
    streakWeekStart = weekStart;
  }

  streakWeekXp += Math.max(0, xpDelta);
  if (
    streakWeekXp >= STREAK_WEEK_XP_THRESHOLD &&
    (existing.streak_week_xp as number) < STREAK_WEEK_XP_THRESHOLD
  ) {
    // First time crossing threshold this week — streak counts at week rollover.
  }

  const totalXp = Math.max(0, (existing.total_xp as number) + xpDelta);
  const { error } = await admin
    .from("learner_stats")
    .update({
      total_xp: totalXp,
      level: levelFromXp(totalXp),
      streak_week_xp: streakWeekXp,
      streak_week_start: streakWeekStart,
      current_streak_weeks: currentStreak,
      longest_streak_weeks: longest,
      last_activity_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
  if (error) throw error;
}

export async function recordActivity(
  admin: SupabaseClient,
  input: {
    userId: string;
    action:
      | "view_topic"
      | "start_checkpoint"
      | "complete_topic"
      | "pass_quiz"
      | "pass_practical"
      | "earn_badge";
    refType?: string;
    refId?: string;
    summary?: string;
  },
) {
  const { error } = await admin.from("activity_events").insert({
    user_id: input.userId,
    action: input.action,
    ref_type: input.refType ?? null,
    ref_id: input.refId ?? null,
    summary: input.summary ?? null,
  });
  if (error) throw error;
}

export async function refreshLearnerCounters(
  admin: SupabaseClient,
  userId: string,
  progress: ProgressState,
) {
  const checkpointsCleared = progress.quizPassed.filter((id) =>
    progress.practicalPassed.includes(id),
  ).length;

  const { error } = await admin.from("learner_stats").upsert(
    {
      user_id: userId,
      topics_completed: progress.completedTopics.length,
      checkpoints_cleared: checkpointsCleared,
      badges_earned: progress.earnedBadges.length,
      last_activity_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}

export async function recomputeBlockProgress(
  admin: SupabaseClient,
  userId: string,
  progress: ProgressState,
  enrollmentId: string | null = null,
) {
  const rows = blocks.map((block) => {
    const stats = blockProgress(progress, block.id);
    const topics = getTopicsForBlock(block.id);
    const checkpointId = `checkpoint-${block.id}`;
    const quizPassed = progress.quizPassed.includes(checkpointId);
    const practicalPassed = progress.practicalPassed.includes(checkpointId);
    return {
      user_id: userId,
      block_id: block.id,
      topics_done: topics.filter((t) =>
        progress.completedTopics.includes(t.id),
      ).length,
      topics_total: topics.length,
      quiz_passed: quizPassed,
      practical_passed: practicalPassed,
      percent: stats.percent,
      unlocked: isBlockUnlocked(progress, block.id),
      cleared: isCheckpointCleared(progress, block.id),
      enrollment_id: enrollmentId,
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await admin.from("block_progress").upsert(rows, {
    onConflict: "user_id,block_id,enrollment_id",
  });
  if (error) throw error;
}
