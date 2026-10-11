"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function SignUpPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!configured) return;
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = createClient();
      const { data, error: signError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { display_name: displayName.trim() || undefined },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      if (data.session) {
        router.push("/roadmap");
        router.refresh();
        return;
      }
      setMessage(
        "Check your email to confirm your account, then sign in. If confirmations are disabled in Supabase, you can sign in immediately.",
      );
    } catch {
      setError("Unable to create an account right now.");
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
              Enlist
            </p>
            <h1 className="mt-3 font-display text-4xl text-text-on-crt">
              Create account
            </h1>
            <p className="mt-3 max-w-xl text-sm text-text-on-crt-muted">
              Save checkpoints and badges across devices. Local demo progress
              migrates on first sign-in if your cloud path is empty.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 py-10 md:px-6">
        {!configured ? (
          <div className="crt-panel p-5 text-sm text-text-on-crt-muted">
            Configure Supabase env vars before creating accounts. See{" "}
            <Link href="/how-it-works#accounts" className="text-phosphor hover:underline">
              How it works
            </Link>
            .
          </div>
        ) : (
          <form onSubmit={onSubmit} className="crt-panel space-y-4 p-5">
            <label className="block text-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                Display name
              </span>
              <input
                type="text"
                maxLength={60}
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="mt-2 w-full rounded-[var(--radius-md)] border border-crt-line bg-crt px-3 py-2 text-text-on-crt"
              />
            </label>
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
                Password (min 8)
              </span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
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
            {message ? (
              <p className="text-sm text-phosphor" role="status">
                {message}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating…" : "Create account"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-text-on-console-muted">
          Already enlisted?{" "}
          <Link href="/auth/sign-in" className="text-phosphor-dim hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
