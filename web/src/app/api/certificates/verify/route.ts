import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import {
  isServiceRoleConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";

const querySchema = z.object({
  code: z.string().min(8).max(128),
});

export async function GET(request: Request) {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const limited = rateLimit(`cert-verify:${ip}`, 30, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    code: url.searchParams.get("code") ?? "",
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.rpc("verify_certificate", {
      code: parsed.data.code,
    });
    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      title: row.title,
      issuedAt: row.issued_at,
      revokedAt: row.revoked_at,
      isValid: row.is_valid,
      pathSlug: row.path_slug,
      blockSlug: row.block_slug,
    });
  } catch (error) {
    console.error("GET /api/certificates/verify", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 },
    );
  }
}
