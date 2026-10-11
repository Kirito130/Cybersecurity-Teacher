"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  trackClassName?: string;
  label?: string;
  detail?: string;
  segments?: number;
};

export function ProgressBar({
  value,
  className,
  trackClassName,
  label,
  detail,
  segments = 0,
}: ProgressBarProps) {
  const reduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)}>
      {label || detail ? (
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-crt-muted">
          <span>{label}</span>
          <span>{detail ?? `${clamped}%`}</span>
        </div>
      ) : null}
      <div
        className={cn(
          "relative h-2.5 overflow-hidden rounded-[var(--radius-sm)] border border-crt-line bg-crt shadow-[inset_0_1px_3px_rgba(0,0,0,0.45)]",
          trackClassName,
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <motion.div
          className="h-full bg-phosphor"
          initial={reduced ? false : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
        />
        {segments > 1 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex"
          >
            {Array.from({ length: segments - 1 }).map((_, index) => (
              <div
                key={index}
                className="h-full flex-1 border-r border-crt/70"
              />
            ))}
            <div className="flex-1" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
