"use client";

import Link from "next/link";
import type { Block, Topic } from "@/content/types";
import { getBadge, getCheckpoint } from "@/content";
import { useProgress } from "@/components/progress-provider";
import {
  blockProgress,
  isBlockUnlocked,
  isCheckpointCleared,
  isTopicComplete,
} from "@/lib/progress";
import { ProgressBar } from "@/components/ui/progress";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";

type BlockHubProps = {
  block: Block;
  topics: Topic[];
};

export function BlockHub({ block, topics }: BlockHubProps) {
  const { progress } = useProgress();
  const unlocked = isBlockUnlocked(progress, block.id);
  const cleared = isCheckpointCleared(progress, block.id);
  const { percent } = blockProgress(progress, block.id);
  const topicsDone = topics.filter((topic) =>
    isTopicComplete(progress, topic.id),
  ).length;
  const badge = getBadge(block.badgeId);
  const checkpoint = block.checkpointId
    ? getCheckpoint(block.checkpointId)
    : null;

  const status = !unlocked
    ? "locked"
    : cleared
      ? "cleared"
      : percent > 0
        ? "in-progress"
        : "available";

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <StatusPill status="locked" />
        <h1 className="mt-4 font-display text-3xl text-text-on-console">
          Block {block.number} is locked
        </h1>
        <p className="mt-3 text-text-on-console-muted">
          Clear the prerequisite checkpoint
          {block.prerequisites.length > 1 ? "s" : ""}{" "}
          {block.prerequisites.join(", ")} before entering this block.
        </p>
        <Link href="/roadmap" className="mt-6 inline-block">
          <Button variant="outline">Back to roadmap</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen px-5 py-10 md:px-10 md:py-14">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
                Block {block.number}
              </p>
              <StatusPill status={status} />
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl text-text-on-crt md:text-5xl">
              {block.title}
            </h1>
            <p className="mt-4 max-w-2xl text-text-on-crt-muted">{block.outcome}</p>
            <div className="mt-6 max-w-md">
              <ProgressBar
                value={percent}
                label="Block progress"
                detail={
                  topics.length > 0
                    ? `${topicsDone} of ${topics.length} topics`
                    : `${percent}%`
                }
                segments={Math.max(topics.length, 0)}
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-crt-muted">
              {block.estimatedHours} focused hours · {block.topicCount} topics
              {block.detailLevel === "stub" ? " · outline — topics coming soon" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[1.4fr_0.8fr] md:px-6 md:py-14">
        <section>
          <h2 className="font-display text-2xl text-text-on-console">Topics</h2>
          {topics.length === 0 ? (
            <div className="shell-recess mt-4 border-dashed p-6 text-sm text-text-on-console-muted">
              Detailed topic pages for this block arrive in a later content
              phase. The roadmap destination and badge are defined so the path
              stays complete.
            </div>
          ) : (
            <ol className="mt-4 space-y-3">
              {topics.map((topic) => {
                const done = isTopicComplete(progress, topic.id);
                return (
                  <li key={topic.id}>
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="crt-interactive flex items-start justify-between gap-4 px-4 py-4"
                    >
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-crt-muted">
                          {topic.id}
                        </p>
                        <h3 className="mt-1 font-display text-lg text-text-on-crt">
                          {topic.title}
                        </h3>
                      </div>
                      <StatusPill status={done ? "cleared" : "available"} />
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}

          {checkpoint ? (
            <div className="crt-panel mt-8 p-5">
              <h2 className="font-display text-2xl text-text-on-crt">
                {checkpoint.title}
              </h2>
              <p className="mt-2 text-sm text-text-on-crt-muted">
                {checkpoint.passRules}
              </p>
              <Link
                href={`/checkpoint/${checkpoint.id}`}
                className="mt-4 inline-block"
              >
                <Button>
                  {cleared ? "Review checkpoint" : "Open checkpoint"}
                </Button>
              </Link>
            </div>
          ) : null}
        </section>

        <aside className="space-y-4">
          <div className="crt-panel p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-on-crt-muted">
              Block badge
            </p>
            <h2 className="mt-2 font-display text-xl text-text-on-crt">
              {badge?.name ?? "Badge"}
            </h2>
            <p className="mt-2 text-sm text-text-on-crt-muted">
              {badge?.description}
            </p>
            <p className="mt-3 text-xs text-text-on-crt-muted">
              {badge?.unlockCondition}
            </p>
            {cleared ? (
              <p className="mt-4 text-sm font-medium text-cleared">
                Badge unlocked in this browser.
              </p>
            ) : null}
          </div>
          <div className="shell-plate p-5 text-sm text-text-on-console-muted">
            <p className="font-medium text-text-on-console">Practice rule</p>
            <p className="mt-2">
              Authorized labs and written scope only. Block 00 exists so you
              build that habit before installing vulnerable targets.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
