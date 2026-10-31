"use client";

import { Stacks } from "@/kit/patterns";
import { Stamp } from "@/kit/controls";
import { badges } from "@/content";
import { useProgress } from "@/state/progress-provider";

export function BadgesView() {
  const { progress, resetAll } = useProgress();
  const chapterBadges = badges.filter((badge) => badge.kind === "block");
  const milestones = badges.filter((badge) => badge.kind === "milestone");
  const earned = new Set(progress.earnedBadges);

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] text-signal lg:block">
          <Stacks className="h-full w-full" />
        </div>
        <div className="gutter stage-body relative gap-8 py-[clamp(1.25rem,4vh,3rem)]">
          <div>
            <h1 className="display max-w-[12ch]">Earned in this product.</h1>
            <p className="lede measure mt-6">
              A chapter badge is recorded when that chapter&apos;s quiz and
              practical both pass. Milestone badges mark longer stretches. They
              are not a professional license or a credential from another
              organization.
            </p>
          </div>
          <Stamp type="button" kind="ghost" onClick={() => void resetAll()}>
            Reset progress
          </Stamp>
        </div>
      </section>

      <section className="sheet-blush">
        <div className="gutter py-[clamp(2rem,6vh,4rem)]">
          <h2 className="title">Chapter badges</h2>
          <ul className="mt-8 columns-1 gap-8 md:columns-2">
            {chapterBadges.map((badge) => {
              const held = earned.has(badge.id);
              return (
                <li
                  key={badge.id}
                  className="mb-6 break-inside-avoid border-t-[4px] border-[var(--edge)] pt-4"
                >
                  <h3 className="kicker ink">{badge.name}</h3>
                  <p className="mt-2 fine">
                    {held ? "Earned" : "Not earned"}
                    {badge.blockId ? ` · Chapter ${badge.blockId}` : ""}
                  </p>
                  <p className="mt-2 fine">{badge.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="sheet-ink">
        <div className="gutter py-[clamp(2rem,6vh,4rem)]">
          <h2 className="title">Milestones</h2>
          <ul className="mt-8 space-y-8">
            {milestones.map((badge) => {
              const held = earned.has(badge.id);
              return (
                <li key={badge.id} className="border-t-[4px] border-[var(--edge-soft)] pt-4">
                  <h3 className="kicker">{badge.name}</h3>
                  <p className="mt-2 fine">{held ? "Earned" : "Not earned"}</p>
                  <p className="mt-2 fine">{badge.description}</p>
                  <p className="mt-3 fine">{badge.unlockCondition}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
}
