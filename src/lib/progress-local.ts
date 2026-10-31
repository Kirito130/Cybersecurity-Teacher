import { emptyProgress, type ProgressState } from "@/lib/progress-core";

export const STORAGE_KEY = "cyberxp-progress-v1";

export function loadLocalProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...emptyProgress(),
      ...parsed,
      completedTopics: parsed.completedTopics ?? [],
      quizPassed: parsed.quizPassed ?? [],
      practicalPassed: parsed.practicalPassed ?? [],
      earnedBadges: parsed.earnedBadges ?? [],
      quizScores: parsed.quizScores ?? {},
      practicalScores: parsed.practicalScores ?? {},
    };
  } catch {
    return emptyProgress();
  }
}

export function saveLocalProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearLocalProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
