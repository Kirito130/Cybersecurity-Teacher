"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { x: 60, y: 70, fill: "var(--cleared)", pulse: false },
  { x: 145, y: 145, fill: "var(--cleared)", pulse: false },
  { x: 140, y: 230, fill: "var(--phosphor-bright)", pulse: true },
  { x: 85, y: 320, fill: "var(--crt-line)", pulse: false },
  { x: 110, y: 390, fill: "var(--crt-line)", pulse: false },
  { x: 310, y: 470, fill: "var(--crt-line)", pulse: false },
  { x: 400, y: 500, fill: "var(--phosphor)", pulse: true },
];

type ClearanceMapProps = {
  className?: string;
  parallax?: boolean;
};

export function ClearanceMap({ className, parallax = true }: ClearanceMapProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced || !parallax ? [0, 0] : [40, -40]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y }}
      className={className}
    >
      <svg
        viewBox="0 0 420 560"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 70 C130 110, 170 160, 140 230 C110 300, 60 330, 110 390 C160 450, 260 420, 310 470 C360 520, 380 530, 400 500"
          stroke="color-mix(in oklab, var(--phosphor) 35%, transparent)"
          strokeWidth="2"
          strokeDasharray="7 10"
        />
        <motion.path
          d="M60 70 C130 110, 170 160, 140 230 C110 300, 60 330, 110 390"
          stroke="var(--phosphor-bright)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`}>
            {node.pulse ? (
              <circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill="color-mix(in oklab, var(--phosphor) 28%, transparent)"
                className={reduced ? undefined : "node-pulse"}
              />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill={node.fill}
              stroke="color-mix(in oklab, var(--text-on-crt) 40%, transparent)"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
