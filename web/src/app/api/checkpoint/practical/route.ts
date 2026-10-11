import { NextResponse } from "next/server";
import { z } from "zod";
import { getCheckpoint } from "@/content";
import { recordCheckpointAttempt } from "@/lib/progress-db";
import { evaluatePractical } from "@/lib/quiz-scoring";
import { rateLimit } from "@/lib/rate-limit";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  checkpointId: z.string().min(1).max(64),
  criteriaScores: z.record(z.string(), z.number().int().min(0).max(5)),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`practical:${user.id}`, 10, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many practical submissions. Try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const checkpoint = getCheckpoint(parsed.data.checkpointId);
  if (!checkpoint) {
    return NextResponse.json({ error: "Unknown checkpoint" }, { status: 404 });
  }

  const expectedIds = new Set(
    checkpoint.practicalCriteria.map((criterion) => criterion.id),
  );
  const scores = parsed.data.criteriaScores;
  for (const id of expectedIds) {
    if (scores[id] === undefined) {
      return NextResponse.json(
        { error: "Missing criterion scores" },
        { status: 400 },
      );
    }
  }
  for (const id of Object.keys(scores)) {
    if (!expectedIds.has(id)) {
      return NextResponse.json(
        { error: "Unexpected criterion id" },
        { status: 400 },
      );
    }
  }

  const result = evaluatePractical(scores);

  try {
    const progress = await recordCheckpointAttempt(supabase, user.id, {
      checkpointId: checkpoint.id,
      kind: "practical",
      score: result.total,
      passed: result.passed,
      payload: { criteriaScores: scores },
    });

    return NextResponse.json({
      progress,
      score: result.total,
      passed: result.passed,
    });
  } catch (error) {
    console.error("POST /api/checkpoint/practical", error);
    return NextResponse.json(
      { error: "Failed to record practical scores" },
      { status: 500 },
    );
  }
}
