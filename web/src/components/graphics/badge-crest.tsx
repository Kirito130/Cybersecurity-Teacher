"use client";

import { motion, useReducedMotion } from "framer-motion";

type BadgeCrestProps = {
  label: string;
  tone?: "signal" | "xp" | "cleared";
  locked?: boolean;
  className?: string;
};

const fills = {
  signal: "var(--phosphor)",
  xp: "var(--phosphor-bright)",
  cleared: "var(--cleared)",
};

export function BadgeCrest({
  label,
  tone = "signal",
  locked = false,
  className,
}: BadgeCrestProps) {
  const reduced = useReducedMotion();
  const stroke = locked ? "var(--locked)" : fills[tone];

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden
    >
      <svg viewBox="0 0 96 108" className="h-24 w-20" fill="none">
        {/* Metal rim */}
        <path
          d="M48 6 L84 24 V54 C84 76 66 92 48 100 C30 92 12 76 12 54 V24 Z"
          fill={locked ? "var(--olive)" : "var(--bezel)"}
          stroke={locked ? "var(--locked)" : "var(--keycap)"}
          strokeWidth="2"
        />
        {/* Phosphor face */}
        <path
          d="M48 14 L76 28 V52 C76 70 62 84 48 90 C34 84 20 70 20 52 V28 Z"
          fill={
            locked
              ? "var(--crt-elevated)"
              : `color-mix(in oklab, ${stroke} 22%, var(--crt))`
          }
          stroke={stroke}
          strokeWidth="2"
        />
        <circle
          cx="48"
          cy="46"
          r="14"
          stroke={stroke}
          strokeWidth="2"
          fill="var(--crt)"
          opacity={locked ? 0.5 : 1}
        />
        <path
          d="M41 46 L46 51 L57 38"
          stroke={locked ? "var(--locked)" : stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={locked ? 0.4 : 1}
        />
        <text
          x="48"
          y="78"
          textAnchor="middle"
          fill={locked ? "var(--locked)" : "var(--text-on-crt-muted)"}
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
        >
          {label}
        </text>
      </svg>
    </motion.div>
  );
}
