import { NextResponse } from "next/server";
import {
  AVATAR_BUCKET,
  AVATAR_MAX_BYTES,
  avatarObjectPath,
  publicAvatarUrl,
  sniffAvatarType,
} from "@/lib/avatar";
import { rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  isServiceRoleConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function notReady() {
  return NextResponse.json(
    { error: "Profile photos are not available right now." },
    { status: 503 },
  );
}

async function requireUser() {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    return { error: notReady() as NextResponse, user: null };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      user: null,
    };
  }
  return { error: null, user };
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if (auth.error || !auth.user) return auth.error;

  const limited = rateLimit(`avatar:${auth.user.id}`, 8, 15 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many photo updates. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Choose a PNG, JPEG, or WebP image." },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > AVATAR_MAX_BYTES) {
    return NextResponse.json(
      { error: "Photo must be 2 MB or smaller." },
      { status: 400 },
    );
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  const contentType = sniffAvatarType(buffer);
  if (!contentType) {
    return NextResponse.json(
      { error: "Choose a PNG, JPEG, or WebP image." },
      { status: 400 },
    );
  }

  const path = avatarObjectPath(auth.user.id, contentType);
  const admin = createAdminClient();

  const { data: existing } = await admin.storage.from(AVATAR_BUCKET).list(auth.user.id);
  const stale = (existing ?? [])
    .map((item) => item.name)
    .filter((name) => name.startsWith("avatar."))
    .map((name) => `${auth.user!.id}/${name}`);
  if (stale.length > 0) {
    await admin.storage.from(AVATAR_BUCKET).remove(stale);
  }

  const { error: uploadError } = await admin.storage
    .from(AVATAR_BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: true,
      cacheControl: "3600",
    });
  if (uploadError) {
    console.error("POST /api/account/avatar upload", uploadError);
    return NextResponse.json(
      { error: "Could not save the photo." },
      { status: 500 },
    );
  }

  const avatarUrl = publicAvatarUrl(path, Date.now());
  if (!avatarUrl) {
    return notReady();
  }

  const { error: updateError } = await admin
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", auth.user.id);
  if (updateError) {
    console.error("POST /api/account/avatar profile", updateError);
    return NextResponse.json(
      { error: "Could not save the photo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ avatarUrl });
}

export async function DELETE() {
  const auth = await requireUser();
  if (auth.error || !auth.user) return auth.error;

  const limited = rateLimit(`avatar-del:${auth.user.id}`, 8, 15 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many photo updates. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const admin = createAdminClient();
  const { data: existing } = await admin.storage.from(AVATAR_BUCKET).list(auth.user.id);
  const paths = (existing ?? []).map((item) => `${auth.user!.id}/${item.name}`);
  if (paths.length > 0) {
    await admin.storage.from(AVATAR_BUCKET).remove(paths);
  }

  const { error: updateError } = await admin
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", auth.user.id);
  if (updateError) {
    console.error("DELETE /api/account/avatar profile", updateError);
    return NextResponse.json(
      { error: "Could not remove the photo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ avatarUrl: null });
}
