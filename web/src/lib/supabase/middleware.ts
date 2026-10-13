import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { skipsAuthGate } from "@/lib/safe-next";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function redirectToSignIn(request: NextRequest, sessionResponse: NextResponse) {
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const url = request.nextUrl.clone();
  url.pathname = "/auth/sign-in";
  url.search = "";
  url.searchParams.set("next", next);
  const redirect = NextResponse.redirect(url);
  sessionResponse.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie);
  });
  return redirect;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";

  if (path === "/how-it-works" || path.startsWith("/how-it-works/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const gated = !skipsAuthGate(request.nextUrl.pathname);

  if (!isSupabaseConfigured()) {
    return gated ? redirectToSignIn(request, supabaseResponse) : supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (gated && !user) {
    return redirectToSignIn(request, supabaseResponse);
  }

  return supabaseResponse;
}
