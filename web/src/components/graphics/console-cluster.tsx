"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RadarScope } from "@/components/graphics/radar-scope";
import { TelemetryFeed } from "@/components/graphics/telemetry-feed";

type ConsoleClusterProps = {
  className?: string;
};

/**
 * Product-specific “mission board” graphic: gauges + radar + telemetry.
 * Illustrative UI art — not stock photography.
 */
export function ConsoleCluster({ className }: ConsoleClusterProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "grid gap-4 rounded-[var(--radius-lg)] border border-bezel bg-ink p-3 shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:grid-cols-[1fr_1.1fr] md:p-4",
        className,
      )}
    >
      <div className="crt-panel relative overflow-hidden p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-phosphor">
          Scope · active
        </p>
        <div className="mt-2 flex justify-center">
          <RadarScope className="max-w-[240px]" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="crt-panel grid grid-cols-3 gap-2 p-3">
          {[
            { label: "Path", value: "19", unit: "BLK" },
            { label: "Gate", value: "01", unit: "NEXT" },
            { label: "Medal", value: "00", unit: "OWN" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-on-crt-muted">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-2xl text-phosphor-bright">
                {stat.value}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-on-crt-muted">
                {stat.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="crt-panel relative flex-1 overflow-hidden p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-phosphor">
              Telemetry
            </p>
            <span
              className={cn(
                "h-2 w-2 rounded-full bg-phosphor",
                !reduced && "node-pulse",
              )}
            />
          </div>
          <TelemetryFeed className="h-36 border-0 bg-transparent p-0" />
        </div>

        <div className="shell-plate grid grid-cols-2 gap-3 p-3">
          <Gauge label="Focus" />
          <Gauge label="Evidence" delay />
        </div>
      </div>
    </div>
  );
}

function Gauge({ label, delay }: { label: string; delay?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="text-center">
      <svg viewBox="0 0 80 56" className="mx-auto h-14 w-20" aria-hidden>
        <path
          d="M8 48 A32 32 0 0 1 72 48"
          fill="none"
          stroke="var(--bezel)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M8 48 A32 32 0 0 1 52 20"
          fill="none"
          stroke="var(--phosphor)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="48"
          x2="40"
          y2="22"
          stroke="var(--keycap)"
          strokeWidth="2"
          className={reduced ? undefined : "gauge-needle"}
          style={delay && !reduced ? { animationDelay: "0.8s" } : undefined}
        />
        <circle cx="40" cy="48" r="3" fill="var(--keycap)" />
      </svg>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-on-console-muted">
        {label}
      </p>
    </div>
  );
}
