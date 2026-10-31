import type { Block } from "@/content/types";
import {
  blockProgress,
  isBlockUnlocked,
  isCheckpointCleared,
  type ProgressState,
} from "@/lib/progress";

export const shortTitles: Record<string, string> = {
  "00": "Orientation",
  "01": "Isolated lab",
  "02": "Networking",
  "03": "Linux",
  "04": "Windows",
  "05": "Programming",
  "06": "Build apps",
  "07": "Security principles",
  "08": "Pentest method",
  "09": "Web vulnerabilities",
  "10": "APIs & code review",
  "11": "Host access",
  "12": "Active Directory",
  "13": "Cloud & containers",
  "14": "Reverse engineering",
  "15": "Professional delivery",
  "16": "Mobile specialty",
  "17": "Wireless & IoT",
  "18": "AI app security",
};

export type ChapterState = "locked" | "open" | "in-progress" | "cleared";

export const stateLabel: Record<ChapterState, string> = {
  locked: "Not open",
  open: "Open",
  "in-progress": "In progress",
  cleared: "Complete",
};

export type ChapterStatus = {
  block: Block;
  unlocked: boolean;
  cleared: boolean;
  percent: number;
  done: number;
  total: number;
  state: ChapterState;
};

export function chapterStatus(
  block: Block,
  progress: ProgressState,
  fullAccess: boolean,
): ChapterStatus {
  const unlocked = fullAccess || isBlockUnlocked(progress, block.id);
  const cleared = isCheckpointCleared(progress, block.id);
  const { percent, completed, total } = blockProgress(progress, block.id);
  const state: ChapterState = !unlocked
    ? "locked"
    : cleared
      ? "cleared"
      : percent > 0
        ? "in-progress"
        : "open";
  return { block, unlocked, cleared, percent, done: completed, total, state };
}

export function parseHours(range: string): [number, number] {
  const [low, high] = range.split(/[–-]/).map((value) => Number.parseInt(value, 10));
  const min = Number.isFinite(low) ? low : 0;
  const max = Number.isFinite(high) ? high : min;
  return [min, max];
}

export function sumHours(items: Block[]): [number, number] {
  return items.reduce<[number, number]>(
    (sum, block) => {
      const [min, max] = parseHours(block.estimatedHours);
      return [sum[0] + min, sum[1] + max];
    },
    [0, 0],
  );
}

export function markText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g);
}
