"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMotionPreference } from "@/state/motion-preference";

type PatternProps = {
  className?: string;
  title?: string;
};

function Frame({
  className,
  title,
  children,
  viewBox,
}: PatternProps & { children: ReactNode; viewBox: string }) {
  const motion = useMotionPreference();
  return (
    <svg
      className={className}
      viewBox={viewBox}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-motion={motion}
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  );
}

/** Woven bands — Book of Shapes "grid / woven" category, original construction. */
export function Weave({ className, title }: PatternProps) {
  const bars = Array.from({ length: 18 }, (_, i) => i);
  return (
    <Frame className={className} title={title} viewBox="0 0 160 160">
      {bars.map((i) => (
        <rect
          key={`h-${i}`}
          className="weave-bar"
          style={{ "--i": i, "--wx": "6px", "--wy": "0px" } as CSSProperties}
          x={-8}
          y={i * 9}
          width="176"
          height="4"
          fill="currentColor"
          opacity={i % 2 === 0 ? 0.22 : 0.08}
        />
      ))}
      {bars.map((i) => (
        <rect
          key={`v-${i}`}
          className="weave-bar"
          style={{ "--i": i + 3, "--wx": "0px", "--wy": "6px" } as CSSProperties}
          x={i * 9}
          y={-8}
          width="4"
          height="176"
          fill="currentColor"
          opacity={i % 3 === 0 ? 0.28 : 0.1}
        />
      ))}
    </Frame>
  );
}

/** Stepped chevrons — Book of Shapes "chevron blocks" category. */
export function Chevrons({ className, title }: PatternProps) {
  const tiles = Array.from({ length: 36 }, (_, i) => i);
  return (
    <Frame className={className} title={title} viewBox="0 0 144 144">
      {tiles.map((i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x = col * 24;
        const y = row * 24;
        return (
          <path
            key={i}
            className="chev-block"
            style={{ "--i": i } as CSSProperties}
            d={`M${x} ${y + 12} L${x + 12} ${y} L${x + 24} ${y + 12} L${x + 12} ${y + 24} Z`}
            fill="currentColor"
            opacity={((col + row) % 3) * 0.12 + 0.1}
          />
        );
      })}
    </Frame>
  );
}

/** Drifting pixels — Book of Shapes "flow dots" category. */
export function Drift({ className, title }: PatternProps) {
  const dots = Array.from({ length: 48 }, (_, i) => i);
  return (
    <Frame className={className} title={title} viewBox="0 0 160 160">
      {dots.map((i) => {
        const x = (i * 37) % 152;
        const y = (i * 23) % 152;
        return (
          <rect
            key={i}
            className="drift-dot"
            style={
              {
                "--i": i,
                "--dx": `${(i % 5) * 3 - 6}px`,
                "--dy": `${(i % 4) * 3 - 4}px`,
              } as CSSProperties
            }
            x={x}
            y={y}
            width={i % 7 === 0 ? 6 : 3}
            height={i % 7 === 0 ? 6 : 3}
            fill="currentColor"
            opacity={i % 4 === 0 ? 0.45 : 0.18}
          />
        );
      })}
    </Frame>
  );
}

/** Pixel isometric stacks — Book of Shapes "isometric" category. */
export function Stacks({ className, title }: PatternProps) {
  const cubes = [
    [20, 90],
    [52, 74],
    [84, 58],
    [36, 106],
    [68, 90],
    [100, 74],
    [116, 106],
    [84, 122],
  ] as const;
  return (
    <Frame className={className} title={title} viewBox="0 0 160 160">
      {cubes.map(([x, y], i) => (
        <g key={i} className="iso-face" style={{ "--i": i } as CSSProperties}>
          <polygon
            points={`${x},${y} ${x + 16},${y - 8} ${x + 32},${y} ${x + 16},${y + 8}`}
            fill="currentColor"
            opacity="0.55"
          />
          <polygon
            points={`${x},${y} ${x + 16},${y + 8} ${x + 16},${y + 24} ${x},${y + 16}`}
            fill="currentColor"
            opacity="0.28"
          />
          <polygon
            points={`${x + 16},${y + 8} ${x + 32},${y} ${x + 32},${y + 16} ${x + 16},${y + 24}`}
            fill="currentColor"
            opacity="0.16"
          />
        </g>
      ))}
    </Frame>
  );
}

/** Pixel quarter-turns — Book of Shapes "truchet" category. */
export function Turns({ className, title }: PatternProps) {
  const tiles = Array.from({ length: 64 }, (_, i) => i);
  return (
    <Frame className={className} title={title} viewBox="0 0 160 160">
      {tiles.map((i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        const x = col * 20;
        const y = row * 20;
        const flip = (col + row) % 2 === 0;
        return (
          <g
            key={i}
            className="turn-tile"
            style={{ "--i": i } as CSSProperties}
            transform={`translate(${x} ${y})`}
          >
            <rect x="0" y="0" width="20" height="20" fill="currentColor" opacity="0.04" />
            <path
              d={flip ? "M0 0 H8 V20 H0 Z M12 0 H20 V20 H12 Z" : "M0 0 H20 V8 H0 Z M0 12 H20 V20 H0 Z"}
              fill="currentColor"
              opacity="0.32"
            />
          </g>
        );
      })}
    </Frame>
  );
}

export function PatternPoster({
  kind,
  className,
}: {
  kind: "weave" | "chevrons" | "drift" | "stacks" | "turns";
  className?: string;
}) {
  const shared = className ?? "h-full w-full";
  if (kind === "weave") return <Weave className={shared} />;
  if (kind === "chevrons") return <Chevrons className={shared} />;
  if (kind === "drift") return <Drift className={shared} />;
  if (kind === "stacks") return <Stacks className={shared} />;
  return <Turns className={shared} />;
}
