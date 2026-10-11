"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RadarScopeProps = {
  className?: string;
};

/** Animated clearance radar — decorative, product-specific HUD graphic. */
export function RadarScope({ className }: RadarScopeProps) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("relative aspect-square w-full max-w-md", className)}
    >
      <svg viewBox="0 0 240 240" className="h-full w-full">
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="color-mix(in oklab, var(--crt) 80%, black)"
          stroke="color-mix(in oklab, var(--phosphor) 35%, transparent)"
          strokeWidth="2"
        />
        {[36, 64, 92].map((r) => (
          <circle
            key={r}
            cx="120"
            cy="120"
            r={r}
            fill="none"
            stroke="color-mix(in oklab, var(--phosphor) 22%, transparent)"
            strokeWidth="1"
          />
        ))}
        <line
          x1="120"
          y1="12"
          x2="120"
          y2="228"
          stroke="color-mix(in oklab, var(--phosphor) 18%, transparent)"
        />
        <line
          x1="12"
          y1="120"
          x2="228"
          y2="120"
          stroke="color-mix(in oklab, var(--phosphor) 18%, transparent)"
        />

        <g className={reduced ? undefined : "radar-sweep"}>
          <path
            d="M120 120 L120 18 A102 102 0 0 1 198 66 Z"
            fill="url(#radarFan)"
            opacity="0.85"
          />
        </g>

        <circle cx="168" cy="78" r="4" fill="var(--phosphor-bright)" className={reduced ? undefined : "node-pulse"} />
        <circle cx="92" cy="150" r="3.5" fill="var(--cleared)" />
        <circle cx="150" cy="168" r="3" fill="var(--phosphor)" opacity="0.7" />
        <circle cx="70" cy="90" r="2.5" fill="var(--locked)" />

        <defs>
          <linearGradient id="radarFan" x1="120" y1="120" x2="180" y2="40">
            <stop offset="0%" stopColor="var(--phosphor)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--phosphor)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-phosphor">
        Clearance scan
      </p>
    </div>
  );
}
