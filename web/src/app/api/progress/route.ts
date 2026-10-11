import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import {
  fetchCloudProgress,
  resetCloudProgress,
  syncProgressToCloud,
} from "@/lib/progress-db";
import { emptyProgress, type ProgressState } from "@/lib/progress-core";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured", progress: emptyProgress() },
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

  try {
    const progress = await fetchCloudProgress(supabase, user.id);
    return NextResponse.json({ progress });
  } catch (error) {
    console.error("GET /api/progress", error);
    return NextResponse.json(
      { error: "Failed to load progress" },
      { status: 500 },
    );
  }
}

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

  const limited = rateLimit(`progress-sync:${user.id}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  try {
    const body = (await request.json()) as { progress?: ProgressState };
    if (!body.progress) {
      return NextResponse.json({ error: "Missing progress" }, { status: 400 });
    }
    const progress = await syncProgressToCloud(
      supabase,
      user.id,
      body.progress,
    );
    return NextResponse.json({ progress });
  } catch (error) {
    console.error("POST /api/progress", error);
    return NextResponse.json(
      { error: "Failed to sync progress" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
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

  const limited = rateLimit(`progress-reset:${user.id}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  try {
    await resetCloudProgress(supabase, user.id);
    return NextResponse.json({ progress: emptyProgress() });
  } catch (error) {
    console.error("DELETE /api/progress", error);
    return NextResponse.json(
      { error: "Failed to reset progress" },
      { status: 500 },
    );
  }
}
