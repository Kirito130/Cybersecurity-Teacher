import { NextResponse } from "next/server";
import { readSafeNext } from "@/lib/safe-next";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = readSafeNext(searchParams.get("next")) ?? "/roadmap";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/auth/sign-in?error=not_configured`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/sign-in?error=auth_callback`);
}
