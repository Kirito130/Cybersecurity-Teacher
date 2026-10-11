"use client";

import Link from "next/link";
import type { Topic } from "@/content/types";
import { getBlock } from "@/content";
import { useProgress } from "@/components/progress-provider";
import { isTopicComplete } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/status-pill";

export function TopicView({ topic }: { topic: Topic }) {
  const { progress, completeTopic } = useProgress();
  const block = getBlock(topic.blockId);
  const done = isTopicComplete(progress, topic.id);

  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen px-5 py-10 md:px-10 md:py-14">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/blocks/${block?.slug ?? topic.blockId}`}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor hover:underline"
              >
                Block {topic.blockId}
              </Link>
              <StatusPill status={done ? "cleared" : "available"} />
            </div>
            <h1 className="mt-3 font-display text-4xl text-text-on-crt">
              {topic.title}
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-crt-muted">
              Topic {topic.id}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 md:px-6 md:py-14">
        <section>
          <h2 className="font-display text-2xl text-text-on-console">
            Subtopics
          </h2>
          <ul className="mt-4 space-y-4">
            {topic.subtopics.map((subtopic) => (
              <li key={subtopic.id} className="crt-panel p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-crt-muted">
                  {subtopic.id}
                </p>
                <h3 className="mt-1 font-display text-lg text-text-on-crt">
                  {subtopic.title}
                </h3>
                <p className="mt-2 text-sm text-text-on-crt-muted">
                  {subtopic.concepts}
                </p>
                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <a
                    href={subtopic.reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-phosphor-bright hover:underline"
                  >
                    Reading: {subtopic.reading.label}
                  </a>
                  <a
                    href={subtopic.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-phosphor-bright hover:underline"
                  >
                    Video: {subtopic.video.label}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="crt-panel p-5">
          <h2 className="font-display text-2xl text-text-on-crt">Topic task</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-on-crt-muted">
            {topic.task}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => void completeTopic(topic.id)}>
              {done ? "Mark incomplete" : "Mark topic complete"}
            </Button>
            <Link href={`/blocks/${block?.slug ?? topic.blockId}`}>
              <Button variant="secondary">Back to block</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
