"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useAuth } from "@/state/auth-provider";
import {
  applyCheckpointResult,
  emptyProgress,
  isTopicComplete,
  mergeProgress,
  toggleTopicComplete,
  type ProgressState,
} from "@/lib/progress-core";
import {
  clearLocalProgress,
  loadLocalProgress,
  saveLocalProgress,
} from "@/lib/progress-local";

type ProgressContextValue = {
  progress: ProgressState;
  mode: "local" | "cloud";
  syncing: boolean;
  completeTopic: (topicId: string) => Promise<void>;
  submitCheckpoint: (
    checkpointId: string,
    kind: "quiz" | "practical",
    score: number,
    passed: boolean,
  ) => void;
  applyServerProgress: (next: ProgressState) => void;
  resetAll: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

const serverSnapshot: ProgressState = {
  completedTopics: [],
  quizPassed: [],
  practicalPassed: [],
  earnedBadges: [],
  quizScores: {},
  practicalScores: {},
};

let memoryState: ProgressState = { ...serverSnapshot };
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function getSnapshot(): ProgressState {
  return memoryState;
}

function getServerSnapshot(): ProgressState {
  return serverSnapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setMemory(next: ProgressState, persistLocal: boolean) {
  memoryState = next;
  if (persistLocal) saveLocalProgress(next);
  emit();
}

if (typeof window !== "undefined") {
  memoryState = loadLocalProgress();
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading, configured } = useAuth();
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [syncing, setSyncing] = useState(false);
  const syncedUserRef = useRef<string | null>(null);

  const mode: "local" | "cloud" = user ? "cloud" : "local";

  useEffect(() => {
    if (authLoading) return;

    if (!user || !configured) {
      syncedUserRef.current = null;
      setMemory(loadLocalProgress(), false);
      return;
    }

    if (syncedUserRef.current === user.id) return;
    syncedUserRef.current = user.id;

    let cancelled = false;

    void (async () => {
      setSyncing(true);
      try {
        const local = loadLocalProgress();
        const res = await fetch("/api/progress");
        if (cancelled) return;
        if (!res.ok) {
          setMemory(local, true);
          return;
        }
        const data = (await res.json()) as { progress: ProgressState };
        const cloud = data.progress ?? emptyProgress();
        const cloudEmpty =
          cloud.completedTopics.length === 0 &&
          cloud.quizPassed.length === 0 &&
          cloud.practicalPassed.length === 0 &&
          cloud.earnedBadges.length === 0;
        const localHasData =
          local.completedTopics.length > 0 ||
          local.quizPassed.length > 0 ||
          local.practicalPassed.length > 0 ||
          local.earnedBadges.length > 0;

        if (cloudEmpty && localHasData) {
          const syncRes = await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ progress: local }),
          });
          if (cancelled) return;
          if (syncRes.ok) {
            const synced = (await syncRes.json()) as {
              progress: ProgressState;
            };
            setMemory(synced.progress, true);
            return;
          }
        }

        if (!cancelled) setMemory(mergeProgress(cloud, local), true);
      } catch {
        if (!cancelled) setMemory(loadLocalProgress(), true);
      } finally {
        if (!cancelled) setSyncing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, configured]);

  const completeTopic = useCallback(
    async (topicId: string) => {
      if (user && configured) {
        const currentlyComplete = isTopicComplete(memoryState, topicId);
        const res = await fetch("/api/progress/topics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicId,
            completed: !currentlyComplete,
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { progress: ProgressState };
          setMemory(data.progress, true);
          return;
        }
      }
      setMemory(toggleTopicComplete(memoryState, topicId), true);
    },
    [user, configured],
  );

  const submitCheckpoint = useCallback(
    (
      checkpointId: string,
      kind: "quiz" | "practical",
      score: number,
      passed: boolean,
    ) => {
      setMemory(
        applyCheckpointResult(memoryState, checkpointId, kind, score, passed),
        true,
      );
    },
    [],
  );

  const applyServerProgress = useCallback((next: ProgressState) => {
    setMemory(next, true);
  }, []);

  const resetAll = useCallback(async () => {
    if (user && configured) {
      const res = await fetch("/api/progress", { method: "DELETE" });
      if (res.ok) {
        clearLocalProgress();
        setMemory(emptyProgress(), true);
        return;
      }
    }
    clearLocalProgress();
    setMemory(emptyProgress(), true);
  }, [user, configured]);

  const value = useMemo(
    () => ({
      progress,
      mode,
      syncing,
      completeTopic,
      submitCheckpoint,
      applyServerProgress,
      resetAll,
    }),
    [
      progress,
      mode,
      syncing,
      completeTopic,
      submitCheckpoint,
      applyServerProgress,
      resetAll,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
