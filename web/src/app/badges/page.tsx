"use client";

import { badges } from "@/content";
import { useProgress } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BadgeCrest } from "@/components/graphics/badge-crest";
import { cn } from "@/lib/utils";

export default function BadgesPage() {
  const { progress, resetAll } = useProgress();
  const blockBadges = badges.filter((badge) => badge.kind === "block");
  const milestones = badges.filter((badge) => badge.kind === "milestone");

  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen flex flex-col gap-4 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10 md:py-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
                Medal gallery
              </p>
              <h1 className="mt-3 font-display text-4xl text-text-on-crt md:text-5xl">
                Badge gallery
              </h1>
              <p className="mt-4 max-w-2xl text-text-on-crt-muted">
                Earn a block badge when you clear a block&apos;s quiz and
                practical checkpoint. Milestone badges mark longer stretches of
                the path.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void resetAll()}
            >
              Reset progress
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <section>
          <Reveal>
            <h2 className="font-display text-2xl text-text-on-console">
              Block badges
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blockBadges.map((badge, index) => {
              const earned = progress.earnedBadges.includes(badge.id);
              return (
                <Reveal key={badge.id} delay={Math.min(index * 0.02, 0.3)}>
                  <li
                    className={cn(
                      "flex gap-4 p-4",
                      earned
                        ? "crt-interactive border-phosphor/50"
                        : "crt-panel",
                    )}
                  >
                    <BadgeCrest
                      label={badge.blockId ?? "BLK"}
                      tone={earned ? "cleared" : "signal"}
                      locked={!earned}
                      className="shrink-0"
                    />
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                        {earned ? "Earned" : "Locked"}
                        {badge.blockId ? ` · Block ${badge.blockId}` : ""}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-text-on-crt">
                        {badge.name}
                      </h3>
                      <p className="mt-2 text-sm text-text-on-crt-muted">
                        {badge.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section>
          <Reveal>
            <h2 className="font-display text-2xl text-text-on-console">
              Milestones
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {milestones.map((badge, index) => {
              const earned = progress.earnedBadges.includes(badge.id);
              return (
                <Reveal key={badge.id} delay={index * 0.06}>
                  <li
                    className={cn(
                      "flex gap-4 p-4",
                      earned
                        ? "crt-interactive border-cleared/50"
                        : "crt-panel",
                    )}
                  >
                    <BadgeCrest
                      label="MILE"
                      tone="xp"
                      locked={!earned}
                      className="shrink-0"
                    />
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                        {earned ? "Earned" : "Locked"}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-text-on-crt">
                        {badge.name}
                      </h3>
                      <p className="mt-2 text-sm text-text-on-crt-muted">
                        {badge.description}
                      </p>
                      <p className="mt-3 text-xs text-text-on-crt-muted">
                        {badge.unlockCondition}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
