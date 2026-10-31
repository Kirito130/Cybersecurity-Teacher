import type { SupabaseClient } from "@supabase/supabase-js";
import {
  applyCheckpointResult,
  emptyProgress,
  type ProgressState,
} from "@/lib/progress-core";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  CURRICULUM_VERSION,
  awardXp,
  recomputeBlockProgress,
  recordActivity,
  refreshLearnerCounters,
} from "@/lib/xp/engagement";

type TopicRow = {
  topic_id: string;
  status: string;
};
type ClearanceRow = {
  checkpoint_id: string;
  kind: "quiz" | "practical";
  best_score: number;
  passed: boolean;
};
type BadgeRow = { badge_id: string };

function admin(): SupabaseClient {
  return createAdminClient();
}

export async function fetchCloudProgress(
  _supabase: SupabaseClient,
  userId: string,
): Promise<ProgressState> {
  const db = admin();
  const [topicsRes, clearanceRes, badgesRes] = await Promise.all([
    db
      .from("topic_progress")
      .select("topic_id, status")
      .eq("user_id", userId)
      .is("enrollment_id", null),
    db
      .from("checkpoint_clearance")
      .select("checkpoint_id, kind, best_score, passed")
      .eq("user_id", userId)
      .is("enrollment_id", null),
    db
      .from("earned_badges")
      .select("badge_id")
      .eq("user_id", userId)
      .is("enrollment_id", null)
      .is("revoked_at", null),
  ]);

  if (topicsRes.error) throw topicsRes.error;
  if (clearanceRes.error) throw clearanceRes.error;
  if (badgesRes.error) throw badgesRes.error;

  const state = emptyProgress();
  state.completedTopics = ((topicsRes.data ?? []) as TopicRow[])
    .filter((row) => row.status === "completed")
    .map((row) => row.topic_id);

  for (const row of (clearanceRes.data ?? []) as ClearanceRow[]) {
    if (row.kind === "quiz") {
      state.quizScores[row.checkpoint_id] = row.best_score;
      if (row.passed && !state.quizPassed.includes(row.checkpoint_id)) {
        state.quizPassed.push(row.checkpoint_id);
      }
    } else {
      state.practicalScores[row.checkpoint_id] = row.best_score;
      if (row.passed && !state.practicalPassed.includes(row.checkpoint_id)) {
        state.practicalPassed.push(row.checkpoint_id);
      }
    }
  }

  const badgeIds = ((badgesRes.data ?? []) as BadgeRow[]).map(
    (row) => row.badge_id,
  );
  state.earnedBadges = Array.from(new Set(badgeIds));

  return state;
}

async function syncEarnedBadges(
  userId: string,
  progress: ProgressState,
  sourceCheckpointId?: string,
) {
  const db = admin();
  if (progress.earnedBadges.length === 0) return;

  const { data: existing, error: existingError } = await db
    .from("earned_badges")
    .select("badge_id")
    .eq("user_id", userId)
    .is("enrollment_id", null)
    .is("revoked_at", null);
  if (existingError) throw existingError;

  const have = new Set(
    ((existing ?? []) as BadgeRow[]).map((row) => row.badge_id),
  );
  const toInsert = progress.earnedBadges.filter((id) => !have.has(id));
  if (toInsert.length === 0) return;

  const { error } = await db.from("earned_badges").upsert(
    toInsert.map((badge_id) => ({
      user_id: userId,
      badge_id,
      source_checkpoint_id: sourceCheckpointId ?? null,
      criteria_snapshot: {
        quizPassed: progress.quizPassed,
        practicalPassed: progress.practicalPassed,
        earnedBadges: progress.earnedBadges,
      },
    })),
    { onConflict: "user_id,badge_id,enrollment_id" },
  );
  if (error) throw error;

  for (const badgeId of toInsert) {
    await awardXp(db, {
      userId,
      eventType: "badge_earn",
      refType: "badge",
      refId: badgeId,
      idempotencyKey: `badge_earn:${userId}:${badgeId}`,
    });
    await recordActivity(db, {
      userId,
      action: "earn_badge",
      refType: "badge",
      refId: badgeId,
      summary: `Earned badge ${badgeId}`,
    });
  }
}

async function afterProgressMutation(
  userId: string,
  progress: ProgressState,
  sourceCheckpointId?: string,
) {
  const db = admin();
  await syncEarnedBadges(userId, progress, sourceCheckpointId);
  await refreshLearnerCounters(db, userId, progress);
  await recomputeBlockProgress(db, userId, progress, null);
}

export async function setTopicComplete(
  _supabase: SupabaseClient,
  userId: string,
  topicId: string,
  completed: boolean,
) {
  const db = admin();
  if (completed) {
    const now = new Date().toISOString();
    const { error } = await db.from("topic_progress").upsert(
      {
        user_id: userId,
        topic_id: topicId,
        status: "completed",
        started_at: now,
        completed_at: now,
        source: "manual",
        enrollment_id: null,
      },
      { onConflict: "user_id,topic_id,enrollment_id" },
    );
    if (error) throw error;

    await awardXp(db, {
      userId,
      eventType: "topic_complete",
      refType: "topic",
      refId: topicId,
      idempotencyKey: `topic_complete:${userId}:${topicId}`,
    });
    await recordActivity(db, {
      userId,
      action: "complete_topic",
      refType: "topic",
      refId: topicId,
      summary: `Completed topic ${topicId}`,
    });
  } else {
    const { error } = await db
      .from("topic_progress")
      .delete()
      .eq("user_id", userId)
      .eq("topic_id", topicId)
      .is("enrollment_id", null);
    if (error) throw error;
  }

  const progress = await fetchCloudProgress(db, userId);
  await afterProgressMutation(userId, progress);
}

async function nextAttemptNumber(
  db: SupabaseClient,
  userId: string,
  checkpointId: string,
  kind: "quiz" | "practical",
): Promise<number> {
  const { data, error } = await db
    .from("checkpoint_attempts")
    .select("attempt_number")
    .eq("user_id", userId)
    .eq("checkpoint_id", checkpointId)
    .eq("kind", kind)
    .is("enrollment_id", null)
    .order("attempt_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return ((data?.attempt_number as number | undefined) ?? 0) + 1;
}

async function upsertClearance(
  db: SupabaseClient,
  input: {
    userId: string;
    checkpointId: string;
    kind: "quiz" | "practical";
    score: number;
    maxScore: number;
    passed: boolean;
    attemptId: string;
  },
) {
  const { data: existing, error: readError } = await db
    .from("checkpoint_clearance")
    .select("*")
    .eq("user_id", input.userId)
    .eq("checkpoint_id", input.checkpointId)
    .eq("kind", input.kind)
    .is("enrollment_id", null)
    .maybeSingle();
  if (readError) throw readError;

  const now = new Date().toISOString();
  if (!existing) {
    const { error } = await db.from("checkpoint_clearance").insert({
      user_id: input.userId,
      checkpoint_id: input.checkpointId,
      kind: input.kind,
      best_score: input.score,
      max_score: input.maxScore,
      passed: input.passed,
      passed_at: input.passed ? now : null,
      best_attempt_id: input.attemptId,
      attempt_count: 1,
      enrollment_id: null,
    });
    if (error) throw error;
    return;
  }

  const bestScore = Math.max(existing.best_score as number, input.score);
  const becamePassed = input.passed || (existing.passed as boolean);
  const { error } = await db
    .from("checkpoint_clearance")
    .update({
      best_score: bestScore,
      max_score:
        bestScore === input.score
          ? input.maxScore
          : (existing.max_score as number),
      passed: becamePassed,
      passed_at: existing.passed_at ?? (input.passed ? now : null),
      best_attempt_id:
        bestScore === input.score
          ? input.attemptId
          : (existing.best_attempt_id as string),
      attempt_count: (existing.attempt_count as number) + 1,
    })
    .eq("id", existing.id);
  if (error) throw error;
}

export async function recordCheckpointAttempt(
  _supabase: SupabaseClient,
  userId: string,
  input: {
    checkpointId: string;
    kind: "quiz" | "practical";
    score: number;
    passed: boolean;
    maxScore?: number;
    passThreshold?: number;
    payload?: Record<string, unknown>;
  },
) {
  const db = admin();
  const maxScore =
    input.maxScore ?? (input.kind === "quiz" ? 12 : 20);
  const passThreshold =
    input.passThreshold ?? (input.kind === "quiz" ? 10 : 16);
  const attemptNumber = await nextAttemptNumber(
    db,
    userId,
    input.checkpointId,
    input.kind,
  );

  const { data: attempt, error } = await db
    .from("checkpoint_attempts")
    .insert({
      user_id: userId,
      checkpoint_id: input.checkpointId,
      kind: input.kind,
      attempt_number: attemptNumber,
      score: input.score,
      max_score: maxScore,
      passed: input.passed,
      pass_threshold: passThreshold,
      content_version: CURRICULUM_VERSION,
      payload: input.payload ?? {},
      enrollment_id: null,
    })
    .select("id")
    .single();
  if (error) throw error;

  await upsertClearance(db, {
    userId,
    checkpointId: input.checkpointId,
    kind: input.kind,
    score: input.score,
    maxScore,
    passed: input.passed,
    attemptId: attempt.id as string,
  });

  if (input.passed) {
    await awardXp(db, {
      userId,
      eventType: input.kind === "quiz" ? "quiz_pass" : "practical_pass",
      refType: "checkpoint",
      refId: `${input.checkpointId}:${input.kind}`,
      idempotencyKey: `${input.kind}_pass:${userId}:${input.checkpointId}`,
    });
    await recordActivity(db, {
      userId,
      action: input.kind === "quiz" ? "pass_quiz" : "pass_practical",
      refType: "checkpoint",
      refId: input.checkpointId,
      summary: `Passed ${input.kind} for ${input.checkpointId}`,
    });
  }

  const progress = await fetchCloudProgress(db, userId);
  const withBadges = applyCheckpointResult(
    progress,
    input.checkpointId,
    input.kind,
    input.score,
    input.passed,
  );
  // Re-sync badges from derived rules (clearance already loaded; merge derived)
  const merged: ProgressState = {
    ...progress,
    earnedBadges: Array.from(
      new Set([...progress.earnedBadges, ...withBadges.earnedBadges]),
    ),
    quizPassed: withBadges.quizPassed,
    practicalPassed: withBadges.practicalPassed,
    quizScores: withBadges.quizScores,
    practicalScores: withBadges.practicalScores,
  };
  await afterProgressMutation(userId, merged, input.checkpointId);
  return fetchCloudProgress(db, userId);
}

export async function syncProgressToCloud(
  _supabase: SupabaseClient,
  userId: string,
  state: ProgressState,
) {
  const db = admin();
  const now = new Date().toISOString();

  if (state.completedTopics.length > 0) {
    const { error } = await db.from("topic_progress").upsert(
      state.completedTopics.map((topic_id) => ({
        user_id: userId,
        topic_id,
        status: "completed",
        started_at: now,
        completed_at: now,
        source: "local_migration",
        enrollment_id: null,
      })),
      { onConflict: "user_id,topic_id,enrollment_id" },
    );
    if (error) throw error;

    for (const topicId of state.completedTopics) {
      await awardXp(db, {
        userId,
        eventType: "topic_complete",
        refType: "topic",
        refId: topicId,
        idempotencyKey: `topic_complete:${userId}:${topicId}`,
      });
    }
  }

  for (const checkpointId of state.quizPassed) {
    const score = state.quizScores[checkpointId] ?? 10;
    const { data } = await db
      .from("checkpoint_clearance")
      .select("id")
      .eq("user_id", userId)
      .eq("checkpoint_id", checkpointId)
      .eq("kind", "quiz")
      .eq("passed", true)
      .is("enrollment_id", null)
      .limit(1);
    if (!data?.length) {
      await recordCheckpointAttempt(db, userId, {
        checkpointId,
        kind: "quiz",
        score,
        passed: true,
        payload: { source: "local_migration" },
      });
    }
  }

  for (const checkpointId of state.practicalPassed) {
    const score = state.practicalScores[checkpointId] ?? 16;
    const { data } = await db
      .from("checkpoint_clearance")
      .select("id")
      .eq("user_id", userId)
      .eq("checkpoint_id", checkpointId)
      .eq("kind", "practical")
      .eq("passed", true)
      .is("enrollment_id", null)
      .limit(1);
    if (!data?.length) {
      await recordCheckpointAttempt(db, userId, {
        checkpointId,
        kind: "practical",
        score,
        passed: true,
        payload: { source: "local_migration" },
      });
    }
  }

  const progress = await fetchCloudProgress(db, userId);
  await afterProgressMutation(userId, progress);
  return progress;
}

export async function resetCloudProgress(
  _supabase: SupabaseClient,
  userId: string,
) {
  const db = admin();
  const deletions = await Promise.all([
    db.from("topic_progress").delete().eq("user_id", userId),
    db.from("checkpoint_clearance").delete().eq("user_id", userId),
    db.from("checkpoint_attempts").delete().eq("user_id", userId),
    db.from("earned_badges").delete().eq("user_id", userId),
    db.from("xp_events").delete().eq("user_id", userId),
    db.from("activity_events").delete().eq("user_id", userId),
    db.from("block_progress").delete().eq("user_id", userId),
    db.from("learner_stats").delete().eq("user_id", userId),
  ]);
  for (const result of deletions) {
    if (result.error) throw result.error;
  }

  const { error } = await db.from("learner_stats").insert({ user_id: userId });
  if (error) throw error;
}
