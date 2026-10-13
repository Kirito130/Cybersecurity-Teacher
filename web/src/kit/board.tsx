"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { chapterStatus, shortTitles, stateLabel, type ChapterStatus } from "@/kit/chapter";
import { Meter } from "@/kit/controls";
import type { Block } from "@/content/types";
import { useAuth } from "@/state/auth-provider";
import { useProgress } from "@/state/progress-provider";

export function ChapterBoard({
  core,
  side,
}: {
  core: Block[];
  side: Block[];
}) {
  const { progress } = useProgress();
  const { fullAccess } = useAuth();
  const rows = useMemo(
    () => [...core, ...side].map((block) => chapterStatus(block, progress, fullAccess)),
    [core, side, progress, fullAccess],
  );
  const firstOpen = rows.find((row) => row.unlocked && row.state !== "cleared") ?? rows[0];
  const [selected, setSelected] = useState(firstOpen?.block.id ?? "00");
  const active = rows.find((row) => row.block.id === selected) ?? firstOpen;

  return (
    <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-12">
      <ol className="grid min-h-0 grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:col-span-8 lg:grid-cols-6">
        {rows.map((row) => (
          <li key={row.block.id}>
            <button
              type="button"
              className="cell h-full min-h-[5.5rem] w-full"
              data-state={row.state === "cleared" ? "cleared" : row.state === "locked" ? "locked" : "open"}
              aria-current={row.block.id === active?.block.id ? "true" : undefined}
              onClick={() => setSelected(row.block.id)}
            >
              <span className="mark">{row.block.number}</span>
              <span className="fine font-display font-bold uppercase leading-tight">
                {shortTitles[row.block.id]}
              </span>
            </button>
          </li>
        ))}
      </ol>
      {active ? <BoardDetail row={active} /> : null}
    </div>
  );
}

function BoardDetail({ row }: { row: ChapterStatus }) {
  const href = row.unlocked ? `/chapters/${row.block.slug}` : "/auth/sign-in?next=/chapters/00";
  return (
    <aside className="panel flex flex-col justify-between lg:col-span-4">
      <div>
        <h3 className="kicker ink">
          Chapter {row.block.number}: {row.block.title}
        </h3>
        <p className="mt-2 fine">
          {stateLabel[row.state]} · {row.block.estimatedHours} hours ·{" "}
          {row.block.topicCount} topics
        </p>
        <p className="mt-4 fine">{row.block.outcome}</p>
        <div className="mt-4">
          <Meter value={row.percent} max={8} />
          <p className="mt-2 fine">
            {row.done}/{row.total} completed
          </p>
        </div>
      </div>
      <Link href={href} className="stamp mt-8">
        {row.unlocked ? "Open chapter" : "Sign in to open"}
      </Link>
    </aside>
  );
}
