"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import {
  hasFullAccess,
  parseAccountRole,
  type AccountRole,
} from "@/lib/account-role";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type AuthContextValue = {
  user: User | null;
  role: AccountRole | null;
  displayName: string | null;
  avatarUrl: string | null;
  fullAccess: boolean;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  refreshProfile: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(configured);
  const [role, setRole] = useState<AccountRole | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [roleFor, setRoleFor] = useState<string | null>(null);
  const [profileTick, setProfileTick] = useState(0);

  const refresh = useCallback(async () => {
    if (!configured) {
      setUser(null);
      setAuthLoading(false);
      return;
    }
    try {
      const supabase = createClient();
      const {
        data: { user: next },
      } = await supabase.auth.getUser();
      setUser(next);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    if (!configured) return;

    const supabase = createClient();
    let cancelled = false;

    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (cancelled) return;
        setUser(data.user);
        setAuthLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
        setAuthLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signOut = useCallback(async () => {
    if (!configured) return;
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Local session clear still proceeds below.
    }
    setUser(null);
    setRole(null);
    setDisplayName(null);
    setAvatarUrl(null);
    setRoleFor(null);
  }, [configured]);

  const refreshProfile = useCallback(() => {
    setProfileTick((value) => value + 1);
  }, []);

  const userId = user?.id ?? null;

  useEffect(() => {
    if (!configured || authLoading) return;
    if (!userId) {
      setRole(null);
      setDisplayName(null);
      setAvatarUrl(null);
      setRoleFor(null);
      return;
    }
    let cancelled = false;
    const supabase = createClient();
    void (async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("role, display_name, avatar_url")
          .eq("id", userId)
          .maybeSingle();
        if (cancelled) return;
        setRole(parseAccountRole(data?.role));
        setDisplayName(
          typeof data?.display_name === "string" && data.display_name.trim()
            ? data.display_name.trim()
            : null,
        );
        setAvatarUrl(
          typeof data?.avatar_url === "string" && data.avatar_url.trim()
            ? data.avatar_url.trim()
            : null,
        );
      } catch {
        if (cancelled) return;
        setRole(null);
        setDisplayName(null);
        setAvatarUrl(null);
      } finally {
        if (!cancelled) setRoleFor(userId);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, authLoading, userId, profileTick]);

  const roleReady = !userId || roleFor === userId;
  const loading = authLoading || !roleReady;
  const fullAccess = roleReady && hasFullAccess(role);

  const value = useMemo(
    () => ({
      user,
      role,
      displayName,
      avatarUrl,
      fullAccess,
      loading,
      configured,
      signOut,
      refresh,
      refreshProfile,
    }),
    [
      user,
      role,
      displayName,
      avatarUrl,
      fullAccess,
      loading,
      configured,
      signOut,
      refresh,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
