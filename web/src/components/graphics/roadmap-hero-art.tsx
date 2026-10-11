"use client";

import { RadarScope } from "@/components/graphics/radar-scope";
import { cn } from "@/lib/utils";

type RoadmapHeroArtProps = {
  className?: string;
};

/** Compact animated radar for the roadmap CRT banner. */
export function RoadmapHeroArt({ className }: RoadmapHeroArtProps) {
  return (
    <div className={cn(className)} aria-hidden>
      <RadarScope />
    </div>
  );
}
