"use client";

import { useAuth } from "@/state/auth-provider";
import { useProgress } from "@/state/progress-provider";
import { isBlockUnlocked } from "@/lib/progress";

export function useBlockAccess(blockId: string) {
  const { fullAccess, loading } = useAuth();
  const { progress } = useProgress();
  return {
    loading,
    unlocked: fullAccess || isBlockUnlocked(progress, blockId),
  };
}
