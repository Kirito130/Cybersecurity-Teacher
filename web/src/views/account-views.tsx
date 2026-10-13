"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { UserAvatar } from "@/kit/avatar";
import { AccountNav } from "@/kit/chrome";
import { Field, Stamp, TextSlot, Wait } from "@/kit/controls";
import { EmptyNote, ErrorNote } from "@/kit/states";
import { AVATAR_MAX_BYTES } from "@/lib/avatar";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/state/auth-provider";
import { useOwnProfile } from "@/state/use-own-profile";

function Shell({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  const { loading, user } = useAuth();
  if (loading) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter">
          <Wait label="Opening account" />
        </div>
      </section>
    );
  }
  if (!user) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter max-w-3xl">
          <EmptyNote
            title="Sign in to open the account"
            body="Profile, settings, and password live behind the session."
            href="/auth/sign-in?next=/account/profile"
            action="Sign in"
          />
        </div>
      </section>
    );
  }
  return (
    <section className="sheet-paper stage">
      <div className="gutter stage-body py-[clamp(1.5rem,5vh,3.5rem)]">
        <AccountNav />
        <h1 className="display mt-8">{title}</h1>
        <p className="lede measure mt-4">{lede}</p>
        <div className="mt-10 max-w-xl">{children}</div>
      </div>
    </section>
  );
}

export function ProfileView() {
  const { refreshProfile } = useAuth();
  const { profile, error, loading, reload } = useOwnProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [photoPending, setPhotoPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoStatus, setPhotoStatus] = useState<string | null>(null);

  useEffect(() => {
    if (profile) setName(profile.displayName);
  }, [profile]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setSaveError(null);
    setStatus(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ display_name: name.trim() || null })
        .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "");
      if (updateError) {
        setSaveError("Could not save the name.");
        return;
      }
      setStatus("Saved.");
      refreshProfile();
      reload();
    } catch {
      setSaveError("Could not save. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  async function uploadPhoto(file: File) {
    setPhotoPending(true);
    setPhotoError(null);
    setPhotoStatus(null);
    if (file.size > AVATAR_MAX_BYTES) {
      setPhotoError("Photo must be 2 MB or smaller.");
      setPhotoPending(false);
      return;
    }
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/account/avatar", {
        method: "POST",
        body,
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; avatarUrl?: string }
        | null;
      if (!response.ok) {
        setPhotoError(payload?.error ?? "Could not save the photo.");
        return;
      }
      setPhotoStatus("Photo saved.");
      refreshProfile();
      reload();
    } catch {
      setPhotoError("Could not save the photo. Check the connection and try again.");
    } finally {
      setPhotoPending(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function removePhoto() {
    setPhotoPending(true);
    setPhotoError(null);
    setPhotoStatus(null);
    try {
      const response = await fetch("/api/account/avatar", { method: "DELETE" });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!response.ok) {
        setPhotoError(payload?.error ?? "Could not remove the photo.");
        return;
      }
      setPhotoStatus("Photo removed.");
      refreshProfile();
      reload();
    } catch {
      setPhotoError("Could not remove the photo. Check the connection and try again.");
    } finally {
      setPhotoPending(false);
    }
  }

  return (
    <Shell
      title="Profile."
      lede="Your display name and photo appear in the header when you are signed in. Email stays on the account record."
    >
      {loading ? <Wait label="Loading profile" /> : null}
      {error ? <ErrorNote body={error} /> : null}
      {profile ? (
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="caption" id="profile-photo-label">
              Profile photo
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <UserAvatar url={profile.avatarUrl || null} size={72} />
              <div className="space-y-3">
                <p className="fine quiet">
                  PNG, JPEG, or WebP. 2 MB or smaller. Until you add one, the CyberXP mark is
                  shown.
                </p>
                <input
                  ref={fileInputRef}
                  id="profile-photo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  aria-labelledby="profile-photo-label"
                  disabled={photoPending}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void uploadPhoto(file);
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  <Stamp
                    type="button"
                    disabled={photoPending}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {photoPending ? "Working…" : profile.avatarUrl ? "Replace photo" : "Add photo"}
                  </Stamp>
                  {profile.avatarUrl ? (
                    <Stamp
                      kind="ghost"
                      type="button"
                      disabled={photoPending}
                      onClick={() => void removePhoto()}
                    >
                      Remove
                    </Stamp>
                  ) : null}
                </div>
                {photoError ? (
                  <p className="warn" role="alert">
                    {photoError}
                  </p>
                ) : null}
                {photoStatus ? (
                  <p className="fine" role="status">
                    {photoStatus}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
            <p className="fine quiet">Email {profile.email || "not available"}</p>
            <Field id="display-name" label="Display name">
              <TextSlot
                id="display-name"
                type="text"
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            {saveError ? <p className="warn" role="alert">{saveError}</p> : null}
            {status ? <p className="fine" role="status">{status}</p> : null}
            <Stamp type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save name"}
            </Stamp>
          </form>
        </div>
      ) : null}
    </Shell>
  );
}

export function SettingsView() {
  const { profile, error, loading, reload } = useOwnProfile();
  const [timezone, setTimezone] = useState("");
  const [goal, setGoal] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setTimezone(profile.timezone);
      setGoal(profile.learningGoal);
    }
  }, [profile]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setSaveError(null);
    setStatus(null);
    try {
      const supabase = createClient();
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          timezone: timezone.trim() || null,
          learning_goal: goal.trim() || null,
        })
        .eq("id", userId ?? "");
      if (updateError) {
        setSaveError("Could not save settings.");
        return;
      }
      setStatus("Saved.");
      reload();
    } catch {
      setSaveError("Could not save. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell title="Settings." lede="Optional notes for how you study. They stay on your profile row.">
      {loading ? <Wait label="Loading settings" /> : null}
      {error ? <ErrorNote body={error} /> : null}
      {profile ? (
        <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
          <Field id="timezone" label="Timezone" hint="Free text. Example: America/New_York.">
            <TextSlot
              id="timezone"
              type="text"
              maxLength={80}
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            />
          </Field>
          <Field id="goal" label="Learning goal" hint="What you want from the chapters. 200 characters at most.">
            <TextSlot
              id="goal"
              type="text"
              maxLength={200}
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
          </Field>
          {saveError ? <p className="warn" role="alert">{saveError}</p> : null}
          {status ? <p className="fine" role="status">{status}</p> : null}
          <Stamp type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save settings"}
          </Stamp>
        </form>
      ) : null}
    </Shell>
  );
}

export function PasswordView() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (password !== confirm) {
      setSaveError("The two passwords do not match.");
      return;
    }
    setPending(true);
    setSaveError(null);
    setStatus(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setSaveError("Could not change the password.");
        return;
      }
      setPassword("");
      setConfirm("");
      setStatus("Password updated.");
    } catch {
      setSaveError("Could not change the password. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell title="Password." lede="Choose a new password of at least 8 characters. This updates the current session account.">
      <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
        <Field id="new-password" label="New password">
          <TextSlot
            id="new-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        <Field id="confirm-password" label="Confirm password">
          <TextSlot
            id="confirm-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
        </Field>
        {saveError ? <p className="warn" role="alert">{saveError}</p> : null}
        {status ? <p className="fine" role="status">{status}</p> : null}
        <Stamp type="submit" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </Stamp>
      </form>
    </Shell>
  );
}
