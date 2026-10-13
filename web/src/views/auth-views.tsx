"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Field, Stamp, TextSlot, Wait } from "@/kit/controls";
import { Turns } from "@/kit/patterns";
import { ErrorNote } from "@/kit/states";
import { readSafeNext } from "@/lib/safe-next";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { useAuth } from "@/state/auth-provider";

function AuthFrame({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className="sheet-paper stage-fit stage overflow-hidden">
      <div className="stage-body grid items-center lg:grid-cols-12">
        <div className="gutter py-12 lg:col-span-6">
          <h1 className="display">{title}</h1>
          <p className="lede measure mt-4">{lede}</p>
          <div className="mt-8 max-w-md">{children}</div>
        </div>
        <div className="relative hidden min-h-0 text-signal lg:col-span-6 lg:block">
          <Turns className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
}

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading } = useAuth();
  const configured = isSupabaseConfigured();
  const nextPath = readSafeNext(params.get("next")) ?? "/roadmap";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    params.get("error") === "not_configured"
      ? "Supabase is not configured. Add the env vars and restart the app."
      : params.get("error")
        ? "Sign-in link failed. Try again."
        : null,
  );
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(nextPath);
  }, [loading, user, nextPath, router]);

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
        setError("Sign-in failed. Check the email and password.");
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthFrame
      title="Sign in."
      lede="Home, the map, and badges stay open. Chapters and topics need a session."
    >
      {!configured ? (
        <ErrorNote body="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in web/.env.local, apply the migrations, then restart the app." />
      ) : (
        <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
          <Field id="email" label="Email">
            <TextSlot
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field id="password" label="Password">
            <TextSlot
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>
          {error ? <p className="warn" role="alert">{error}</p> : null}
          <Stamp type="submit" wide disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Stamp>
        </form>
      )}
      <p className="mt-6 fine">
        No account?{" "}
        <Link
          href={
            nextPath === "/roadmap"
              ? "/auth/sign-up"
              : `/auth/sign-up?next=${encodeURIComponent(nextPath)}`
          }
          className="cite"
        >
          Create one
        </Link>
      </p>
    </AuthFrame>
  );
}

function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const configured = isSupabaseConfigured();
  const nextPath = readSafeNext(params.get("next")) ?? "/roadmap";
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
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });
      if (signError) {
        setError("Could not create the account. Try a different email.");
        return;
      }
      if (data.session) {
        router.push(nextPath);
        router.refresh();
        return;
      }
      setMessage(
        "Check your email to confirm the account, then sign in. If confirmations are off in Supabase, you can sign in now.",
      );
    } catch {
      setError("Unable to create an account right now. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthFrame
      title="Create an account."
      lede="Required to open chapters and topics. A local progress copy can move to the account on first sign-in if the cloud copy is empty."
    >
      {!configured ? (
        <ErrorNote body="Configure the Supabase env vars before creating accounts." />
      ) : (
        <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
          <Field id="display-name" label="Display name" hint="Optional. 60 characters at most.">
            <TextSlot
              id="display-name"
              type="text"
              maxLength={60}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </Field>
          <Field id="email" label="Email">
            <TextSlot
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field id="password" label="Password" hint="At least 8 characters.">
            <TextSlot
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>
          {error ? <p className="warn" role="alert">{error}</p> : null}
          {message ? <p className="fine" role="status">{message}</p> : null}
          <Stamp type="submit" wide disabled={pending}>
            {pending ? "Creating…" : "Create account"}
          </Stamp>
        </form>
      )}
      <p className="mt-6 fine">
        Already have one?{" "}
        <Link
          href={
            nextPath === "/roadmap"
              ? "/auth/sign-in"
              : `/auth/sign-in?next=${encodeURIComponent(nextPath)}`
          }
          className="cite"
        >
          Sign in
        </Link>
      </p>
    </AuthFrame>
  );
}

export function SignInPage() {
  return (
    <Suspense
      fallback={
        <section className="sheet-paper stage justify-center">
          <div className="gutter">
            <Wait label="Loading sign-in" />
          </div>
        </section>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

export function SignUpPage() {
  return (
    <Suspense
      fallback={
        <section className="sheet-paper stage justify-center">
          <div className="gutter">
            <Wait label="Loading sign-up" />
          </div>
        </section>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
