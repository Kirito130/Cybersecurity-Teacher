"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const lines = [
  "BLK 00 · STANDBY · TOPICS 0/3",
  "AUTH · SCOPE RECORD REQUIRED",
  "GATE 00 · QUIZ + PRACTICAL",
  "MEDAL · SCOPE KEEPER LOCKED",
  "PATH · CORE CLEARANCE OPEN",
  "RULE · AUTHORIZED LABS ONLY",
  "BLK 01 · OFFLINE · AWAIT GATE",
  "SYNC · LOCAL DEMO STORAGE",
];

type TelemetryFeedProps = {
  className?: string;
};

/** Scrolling mission telemetry — readable progress cues, not decorative noise. */
export function TelemetryFeed({ className }: TelemetryFeedProps) {
  const reduced = useReducedMotion();
  const loop = [...lines, ...lines];

  return (
    <div
      aria-hidden
      className={cn(
        "relative h-40 overflow-hidden rounded-[var(--radius-md)] border border-crt-line bg-crt px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-phosphor",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-crt to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-crt to-transparent" />
      <div className={reduced ? undefined : "telemetry-scroll"}>
        <ul className="space-y-2 py-2">
          {loop.map((line, index) => (
            <li key={`${line}-${index}`} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-phosphor-bright" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
