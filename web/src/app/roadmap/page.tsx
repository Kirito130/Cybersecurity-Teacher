import type { Metadata } from "next";
import { RoadmapPath } from "@/components/roadmap-path";
import { RoadmapHeroArt } from "@/components/graphics/roadmap-hero-art";

export const metadata: Metadata = {
  title: "Roadmap",
};

export default function RoadmapPage() {
  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen relative overflow-hidden px-5 py-10 md:px-10 md:py-14">
            <RoadmapHeroArt className="pointer-events-none absolute top-2 right-0 hidden w-56 max-w-[45%] opacity-80 md:block lg:right-8 lg:w-72" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
              Training map
            </p>
            <h1 className="mt-3 max-w-xl font-display text-4xl text-text-on-crt md:text-5xl">
              The CyberXP path
            </h1>
            <p className="mt-4 max-w-2xl text-text-on-crt-muted">
              Guests keep progress in this browser. Sign in to sync checkpoints
              and badges to your CyberXP account.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <RoadmapPath />
      </div>
    </div>
  );
}
