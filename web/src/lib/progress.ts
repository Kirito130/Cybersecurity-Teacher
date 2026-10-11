export {
  applyCheckpointResult as markCheckpointResult,
  blockProgress,
  emptyProgress,
  isBlockUnlocked,
  isCheckpointCleared,
  isTopicComplete,
  mergeProgress,
  toggleTopicComplete,
  type ProgressState,
} from "@/lib/progress-core";

export {
  clearLocalProgress as resetProgress,
  loadLocalProgress as loadProgress,
  saveLocalProgress as saveProgress,
  STORAGE_KEY,
} from "@/lib/progress-local";
