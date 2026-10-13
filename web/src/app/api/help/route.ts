import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  isServiceRoleConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.strictObject({
  name: z.string().trim().min(1).max(80),
  email: z
    .string()
    .trim()
    .min(3)
    .max(254)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  category: z.enum(["question", "issue", "account"]),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json(
      { error: "The message inbox is not available right now." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`help:${ip}`, 8, 15 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the name, email, category, and message, then try again." },
      { status: 400 },
    );
  }

  const emailKey = parsed.data.email.toLowerCase();
  const emailLimited = rateLimit(`help-email:${emailKey}`, 5, 60 * 60_000);
  if (!emailLimited.ok) {
    return NextResponse.json(
      { error: "Too many messages from this email. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(emailLimited.retryAfterSec) },
      },
    );
  }

  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("support_inquiries")
    .insert({
      name: parsed.data.name,
      email: emailKey,
      category: parsed.data.category,
      message: parsed.data.message,
      user_id: userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("POST /api/help", error?.message ?? "missing row");
    return NextResponse.json(
      { error: "Unable to save your message right now." },
      { status: 500 },
    );
  }

  console.info("support inquiry stored", {
    id: data.id,
    category: parsed.data.category,
  });

  return NextResponse.json({ ok: true });
}
