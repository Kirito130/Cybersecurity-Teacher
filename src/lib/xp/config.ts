export const XP_BY_EVENT = {
  topic_complete: 25,
  quiz_pass: 50,
  practical_pass: 75,
  badge_earn: 100,
  streak_bonus: 40,
} as const;

export type XpEventType = keyof typeof XP_BY_EVENT | "admin_adjust";

/** Cumulative XP thresholds → level (index 0 unused; level 1 starts at 0). */
export const LEVEL_THRESHOLDS = [
  0, 0, 200, 500, 1000, 1500, 2000, 3000, 4000, 8000, 12000, 15000, 20000,
  35000, 50000,
] as const;

export const STREAK_WEEK_XP_THRESHOLD = 200;

export const CURRICULUM_VERSION = "ts-content-v1";

export function levelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = 2; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) level = i;
    else break;
  }
  if (totalXp >= LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]) {
    const extra = totalXp - LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    level = LEVEL_THRESHOLDS.length - 1 + Math.floor(extra / 15000);
  }
  return Math.max(1, level);
}

/** Monday UTC date for the week containing `when`. */
export function utcWeekStart(when = new Date()): string {
  const d = new Date(
    Date.UTC(when.getUTCFullYear(), when.getUTCMonth(), when.getUTCDate()),
  );
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0, 10);
}
