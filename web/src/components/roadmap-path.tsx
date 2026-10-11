"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { blocks } from "@/content";
import type { Block } from "@/content/types";
import { useProgress } from "@/components/progress-provider";
import {
  blockProgress,
  isBlockUnlocked,
  isCheckpointCleared,
} from "@/lib/progress";
import { StatusPill } from "@/components/status-pill";
import { Reveal } from "@/components/motion/reveal";
import { PathPlatform } from "@/components/graphics/path-platform";
import { cn } from "@/lib/utils";

const shortTitles: Record<string, string> = {
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

type PathStatus = "locked" | "available" | "in-progress" | "cleared";

type PathItem = {
  block: Block;
  unlocked: boolean;
  cleared: boolean;
  percent: number;
  status: PathStatus;
};

function statusFor(
  unlocked: boolean,
  cleared: boolean,
  percent: number,
): PathStatus {
  if (!unlocked) return "locked";
  if (cleared) return "cleared";
  if (percent > 0) return "in-progress";
  return "available";
}

function BlockLabel({ item }: { item: PathItem }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-phosphor-dim">
        Block {item.block.number}
      </p>
      <h3 className="mt-1 font-display text-xl text-text-on-console md:text-2xl">
        {shortTitles[item.block.id] ?? item.block.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <StatusPill status={item.status} />
        {item.block.detailLevel === "full" ? (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-phosphor-dim">
            Playable
          </span>
        ) : null}
        {item.unlocked && item.percent > 0 ? (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-console-muted">
            {item.percent}%
          </span>
        ) : null}
      </div>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-text-on-console-muted">
        {item.block.outcome}
      </p>
    </div>
  );
}

function PlatformNode({ item }: { item: PathItem }) {
  const title = shortTitles[item.block.id] ?? item.block.title;
  if (!item.unlocked) {
    return (
      <div
        className="path-step"
        aria-label={`Block ${item.block.number} locked: ${title}`}
      >
        <PathPlatform blockId={item.block.id} status={item.status} />
      </div>
    );
  }

  return (
    <Link
      href={`/blocks/${item.block.slug}`}
      className="path-step block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-phosphor-bright"
      aria-label={`Open Block ${item.block.number}: ${title}`}
    >
      <PathPlatform blockId={item.block.id} status={item.status} />
    </Link>
  );
}

function PathBoard({ items }: { items: PathItem[] }) {
  const reduced = useReducedMotion();
  const boardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ["start 70%", "end 35%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });
  const inkScale = useTransform(smooth, [0, 1], [0.06, 1]);

  return (
    <div ref={boardRef} className="path-board mt-2">
      <div aria-hidden className="path-rail">
        {reduced ? (
          <div className="path-rail__ink" />
        ) : (
          <motion.div className="path-rail__ink" style={{ scaleY: inkScale }} />
        )}
      </div>

      <ol className="relative">
        {items.map((item, index) => {
          const side = index % 2 === 0 ? "left" : "right";
          const label = <BlockLabel item={item} />;
          const labeled = item.unlocked ? (
            <Link
              href={`/blocks/${item.block.slug}`}
              className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
            >
              {label}
            </Link>
          ) : (
            label
          );

          return (
            <Reveal
              key={item.block.id}
              delay={reduced ? 0 : Math.min(index * 0.025, 0.35)}
              y={16}
            >
              <li
                className={cn(
                  "relative flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-6 md:py-8",
                  side === "right" && "md:flex-row-reverse",
                )}
              >
                <div
                  className={cn(
                    "order-2 min-w-0 flex-1 md:order-none",
                    side === "left" && "md:text-right",
                  )}
                >
                  {labeled}
                </div>

                <div className="relative z-10 order-1 mx-auto shrink-0 md:order-none md:mx-0">
                  <PlatformNode item={item} />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[42%] hidden h-0.5 w-9 -translate-y-1/2 md:block",
                      side === "left"
                        ? "right-[calc(100%+2px)] bg-gradient-to-l from-phosphor/80 to-transparent"
                        : "left-[calc(100%+2px)] bg-gradient-to-r from-phosphor/80 to-transparent",
                    )}
                  />
                </div>

                <div className="hidden flex-1 md:block" aria-hidden />
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

export function RoadmapPath() {
  const { progress } = useProgress();
  const reduced = useReducedMotion();

  const items: PathItem[] = blocks
    .filter((block) => !block.isSpecialist)
    .map((block) => {
      const unlocked = isBlockUnlocked(progress, block.id);
      const cleared = isCheckpointCleared(progress, block.id);
      const { percent } = blockProgress(progress, block.id);
      return {
        block,
        unlocked,
        cleared,
        percent,
        status: statusFor(unlocked, cleared, percent),
      };
    });

  const specialist = blocks.filter((block) => block.isSpecialist);

  return (
    <div className="space-y-14">
      <section>
        <Reveal>
          <h2 className="font-display text-2xl text-text-on-console md:text-3xl">
            Core path
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-on-console-muted md:text-base">
            Climb the clearance map. Finish topics, clear the checkpoint, and
            unlock the next platform.
          </p>
        </Reveal>

        <PathBoard items={items} />
      </section>

      <section>
        <Reveal>
          <h2 className="font-display text-2xl text-text-on-console md:text-3xl">
            Specialist branches
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-on-console-muted md:text-base">
            Optional side platforms after their prerequisites. They do not
            replace the core path.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {specialist.map((block, index) => {
            const unlocked = isBlockUnlocked(progress, block.id);
            const cleared = isCheckpointCleared(progress, block.id);
            const status = statusFor(unlocked, cleared, 0);
            const item: PathItem = {
              block,
              unlocked,
              cleared,
              percent: 0,
              status,
            };
            return (
              <Reveal key={block.id} delay={reduced ? 0 : index * 0.06}>
                <li className="flex flex-col items-center text-center">
                  <PlatformNode item={item} />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-phosphor-dim">
                    Block {block.number}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-text-on-console">
                    {shortTitles[block.id] ?? block.title}
                  </h3>
                  <div className="mt-2">
                    <StatusPill status={status} />
                  </div>
                  <p className="mt-2 max-w-xs text-sm text-text-on-console-muted">
                    {block.outcome}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
