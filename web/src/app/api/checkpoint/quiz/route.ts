import { NextResponse } from "next/server";
import { z } from "zod";
import { getCheckpoint } from "@/content";
import { recordCheckpointAttempt } from "@/lib/progress-db";
import { evaluateQuiz } from "@/lib/quiz-scoring";
import { rateLimit } from "@/lib/rate-limit";
import {
  isServiceRoleConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  checkpointId: z.string().min(1).max(64),
  answers: z.record(z.string(), z.string().max(4000)),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
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

  const limited = rateLimit(`quiz:${user.id}`, 10, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many quiz attempts. Try again shortly." },
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

  const result = evaluateQuiz(checkpoint, parsed.data.answers);

  try {
    const progress = await recordCheckpointAttempt(supabase, user.id, {
      checkpointId: checkpoint.id,
      kind: "quiz",
      score: result.total,
      maxScore: checkpoint.quizQuestions.length * 2,
      passThreshold: 10,
      passed: result.passed,
      payload: {
        perQuestion: result.perQuestion,
        // Store answer lengths only — not full free text — to reduce PII in logs/DB
        answerLengths: Object.fromEntries(
          Object.entries(parsed.data.answers).map(([id, text]) => [
            id,
            text.trim().length,
          ]),
        ),
      },
    });

    return NextResponse.json({
      progress,
      score: result.total,
      passed: result.passed,
      perQuestion: result.perQuestion,
      modelAnswers: Object.fromEntries(
        checkpoint.quizQuestions.map((question) => [
          question.id,
          question.modelAnswer,
        ]),
      ),
    });
  } catch (error) {
    console.error("POST /api/checkpoint/quiz", error);
    return NextResponse.json(
      { error: "Failed to score quiz" },
      { status: 500 },
    );
  }
}
