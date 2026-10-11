"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    params.get("error") === "not_configured"
      ? "Supabase is not configured. Add env vars and restart the app."
      : params.get("error")
        ? "Sign-in link failed. Try again."
        : null,
  );
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!configured) return;
    setPending(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      router.push("/roadmap");
      router.refresh();
    } catch {
      setError("Unable to sign in right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen px-5 py-10 md:px-10 md:py-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
              Access
            </p>
            <h1 className="mt-3 font-display text-4xl text-text-on-crt">
              Sign in
            </h1>
            <p className="mt-3 max-w-xl text-sm text-text-on-crt-muted">
              Cloud progress syncs after you authenticate. Guests can still use
              local demo progress.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 py-10 md:px-6">
        {!configured ? (
          <div className="crt-panel p-5 text-sm text-text-on-crt-muted">
            Set{" "}
            <code className="text-phosphor">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-phosphor">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in <code className="text-phosphor">web/.env.local</code>, run{" "}
            <code className="text-phosphor">supabase/schema.sql</code>, then
            restart <code className="text-phosphor">npm run dev</code>.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="crt-panel space-y-4 p-5">
            <label className="block text-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-[var(--radius-md)] border border-crt-line bg-crt px-3 py-2 text-text-on-crt"
              />
            </label>
            <label className="block text-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                Password
              </span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-[var(--radius-md)] border border-crt-line bg-crt px-3 py-2 text-text-on-crt"
              />
            </label>
            {error ? (
              <p className="text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-text-on-console-muted">
          No account?{" "}
          <Link href="/auth/sign-up" className="text-phosphor-dim hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-16 text-center text-text-on-console-muted">
          Loading…
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
