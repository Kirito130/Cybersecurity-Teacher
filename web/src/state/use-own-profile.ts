"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/state/auth-provider";
import { createClient } from "@/lib/supabase/client";

export type OwnProfile = {
  displayName: string;
  avatarUrl: string;
  timezone: string;
  learningGoal: string;
  createdAt: string | null;
  email: string;
};

type LoadState =
  | { status: "ready"; profile: OwnProfile }
  | { status: "missing" }
  | { status: "error" };

export function useOwnProfile() {
  const { user, loading: authLoading, configured } = useAuth();
  const userId = user?.id ?? null;
  const [seenUserId, setSeenUserId] = useState(userId);
  const [requestId, setRequestId] = useState(0);
  const [doneId, setDoneId] = useState(-1);
  const [loadState, setLoadState] = useState<LoadState | null>(null);

  if (userId !== seenUserId) {
    setSeenUserId(userId);
    setDoneId(-1);
    setLoadState(null);
  }

  useEffect(() => {
    if (authLoading || !configured || !user) return;
    let cancelled = false;
    const request = requestId;
    const activeUser = user;

    void (async () => {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("profiles")
        .select("display_name, avatar_url, timezone, learning_goal, created_at")
        .eq("id", activeUser.id)
        .maybeSingle();

      if (cancelled) return;

      if (queryError) {
        setLoadState({ status: "error" });
      } else if (!data) {
        setLoadState({ status: "missing" });
      } else {
        setLoadState({
          status: "ready",
          profile: {
            displayName: data.display_name ?? "",
            avatarUrl: data.avatar_url ?? "",
            timezone: data.timezone ?? "",
            learningGoal: data.learning_goal ?? "",
            createdAt: data.created_at ?? null,
            email: activeUser.email ?? "",
          },
        });
      }
      setDoneId(request);
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, configured, user, requestId]);

  const needsFetch = Boolean(configured && userId && !authLoading);
  const loading = authLoading || (needsFetch && doneId !== requestId);
  const settled = doneId === requestId ? loadState : null;

  return {
    user,
    configured,
    profile: settled?.status === "ready" ? settled.profile : null,
    error:
      settled?.status === "error"
        ? "Could not load your profile."
        : settled?.status === "missing"
          ? "No profile record exists for this account yet."
          : null,
    loading,
    reload: () => setRequestId((value) => value + 1),
  };
}
