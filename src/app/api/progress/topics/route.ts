import { NextResponse } from "next/server";
import { z } from "zod";
import { getTopic } from "@/content";
import { fetchCloudProgress, setTopicComplete } from "@/lib/progress-db";
import { rateLimit } from "@/lib/rate-limit";
import {
  isServiceRoleConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  topicId: z.string().min(1).max(32),
  completed: z.boolean(),
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

  const limited = rateLimit(`topic:${user.id}`, 60, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
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

  if (!getTopic(parsed.data.topicId)) {
    return NextResponse.json({ error: "Unknown topic" }, { status: 404 });
  }

  try {
    await setTopicComplete(
      supabase,
      user.id,
      parsed.data.topicId,
      parsed.data.completed,
    );
    const progress = await fetchCloudProgress(supabase, user.id);
    return NextResponse.json({ progress });
  } catch (error) {
    console.error("POST /api/progress/topics", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 },
    );
  }
}
