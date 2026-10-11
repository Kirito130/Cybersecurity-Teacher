import type { SupabaseClient } from "@supabase/supabase-js";
import {
  applyCheckpointResult,
  emptyProgress,
  type ProgressState,
} from "@/lib/progress-core";

type TopicRow = { topic_id: string };
type AttemptRow = {
  checkpoint_id: string;
  kind: "quiz" | "practical";
  score: number;
  passed: boolean;
  created_at: string;
};
type BadgeRow = { badge_id: string };

export async function fetchCloudProgress(
  supabase: SupabaseClient,
  userId: string,
): Promise<ProgressState> {
  const [topicsRes, attemptsRes, badgesRes] = await Promise.all([
    supabase.from("topic_progress").select("topic_id").eq("user_id", userId),
    supabase
      .from("checkpoint_attempts")
      .select("checkpoint_id, kind, score, passed, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true }),
    supabase.from("earned_badges").select("badge_id").eq("user_id", userId),
  ]);

  if (topicsRes.error) throw topicsRes.error;
  if (attemptsRes.error) throw attemptsRes.error;
  if (badgesRes.error) throw badgesRes.error;

  let state = emptyProgress();
  state.completedTopics = ((topicsRes.data ?? []) as TopicRow[]).map(
    (row) => row.topic_id,
  );

  for (const attempt of (attemptsRes.data ?? []) as AttemptRow[]) {
    state = applyCheckpointResult(
      state,
      attempt.checkpoint_id,
      attempt.kind,
      attempt.score,
      attempt.passed,
    );
  }

  const badgeIds = ((badgesRes.data ?? []) as BadgeRow[]).map(
    (row) => row.badge_id,
  );
  state.earnedBadges = Array.from(
    new Set([...state.earnedBadges, ...badgeIds]),
  );

  return state;
}

async function syncEarnedBadges(
  supabase: SupabaseClient,
  userId: string,
  progress: ProgressState,
) {
  if (progress.earnedBadges.length === 0) return;
  const { error } = await supabase.from("earned_badges").upsert(
    progress.earnedBadges.map((badge_id) => ({
      user_id: userId,
      badge_id,
    })),
    { onConflict: "user_id,badge_id" },
  );
  if (error) throw error;
}

export async function setTopicComplete(
  supabase: SupabaseClient,
  userId: string,
  topicId: string,
  completed: boolean,
) {
  if (completed) {
    const { error } = await supabase.from("topic_progress").upsert(
      {
        user_id: userId,
        topic_id: topicId,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,topic_id" },
    );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("topic_progress")
      .delete()
      .eq("user_id", userId)
      .eq("topic_id", topicId);
    if (error) throw error;
  }
}

export async function recordCheckpointAttempt(
  supabase: SupabaseClient,
  userId: string,
  input: {
    checkpointId: string;
    kind: "quiz" | "practical";
    score: number;
    passed: boolean;
    payload?: Record<string, unknown>;
  },
) {
  const { error } = await supabase.from("checkpoint_attempts").insert({
    user_id: userId,
    checkpoint_id: input.checkpointId,
    kind: input.kind,
    score: input.score,
    passed: input.passed,
    payload: input.payload ?? {},
  });
  if (error) throw error;

  const progress = await fetchCloudProgress(supabase, userId);
  await syncEarnedBadges(supabase, userId, progress);
  return progress;
}

export async function syncProgressToCloud(
  supabase: SupabaseClient,
  userId: string,
  state: ProgressState,
) {
  if (state.completedTopics.length > 0) {
    const { error } = await supabase.from("topic_progress").upsert(
      state.completedTopics.map((topic_id) => ({
        user_id: userId,
        topic_id,
        completed_at: new Date().toISOString(),
      })),
      { onConflict: "user_id,topic_id" },
    );
    if (error) throw error;
  }

  for (const checkpointId of state.quizPassed) {
    const score = state.quizScores[checkpointId] ?? 10;
    const { data } = await supabase
      .from("checkpoint_attempts")
      .select("id")
      .eq("user_id", userId)
      .eq("checkpoint_id", checkpointId)
      .eq("kind", "quiz")
      .eq("passed", true)
      .limit(1);
    if (!data?.length) {
      const { error } = await supabase.from("checkpoint_attempts").insert({
        user_id: userId,
        checkpoint_id: checkpointId,
        kind: "quiz",
        score,
        passed: true,
        payload: { source: "local_migration" },
      });
      if (error) throw error;
    }
  }

  for (const checkpointId of state.practicalPassed) {
    const score = state.practicalScores[checkpointId] ?? 16;
    const { data } = await supabase
      .from("checkpoint_attempts")
      .select("id")
      .eq("user_id", userId)
      .eq("checkpoint_id", checkpointId)
      .eq("kind", "practical")
      .eq("passed", true)
      .limit(1);
    if (!data?.length) {
      const { error } = await supabase.from("checkpoint_attempts").insert({
        user_id: userId,
        checkpoint_id: checkpointId,
        kind: "practical",
        score,
        passed: true,
        payload: { source: "local_migration" },
      });
      if (error) throw error;
    }
  }

  const progress = await fetchCloudProgress(supabase, userId);
  await syncEarnedBadges(supabase, userId, progress);
  return progress;
}

export async function resetCloudProgress(
  supabase: SupabaseClient,
  userId: string,
) {
  const deletions = await Promise.all([
    supabase.from("topic_progress").delete().eq("user_id", userId),
    supabase.from("checkpoint_attempts").delete().eq("user_id", userId),
    supabase.from("earned_badges").delete().eq("user_id", userId),
  ]);
  for (const result of deletions) {
    if (result.error) throw result.error;
  }
}
