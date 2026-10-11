"use client";

import { cn } from "@/lib/utils";
import { BlockGlyph } from "@/components/graphics/block-glyph";

type PathPlatformProps = {
  blockId: string;
  status: "locked" | "available" | "in-progress" | "cleared";
  className?: string;
};

export function PathPlatform({ blockId, status, className }: PathPlatformProps) {
  const locked = status === "locked";
  const cleared = status === "cleared";
  const active = status === "available" || status === "in-progress";

  return (
    <div
      className={cn("path-platform", locked && "is-locked", cleared && "is-cleared", active && "is-active", className)}
      aria-hidden
    >
      <div className="path-platform__glyph">
        <BlockGlyph
          blockId={blockId}
          className={cn(
            "h-10 w-10",
            locked && "text-locked",
            cleared && "text-cleared",
            active && "text-phosphor-bright",
            status === "in-progress" && "text-phosphor",
          )}
        />
      </div>
      <div className="path-platform__top" />
      <div className="path-platform__face" />
      {cleared ? <span className="path-platform__check">✓</span> : null}
      {locked ? <span className="path-platform__lock" /> : null}
    </div>
  );
}
