import type { Metadata } from "next";
import { ChapterBoard } from "@/kit/board";
import { sumHours } from "@/kit/chapter";
import { blocks } from "@/content";

export const metadata: Metadata = {
  title: "Map",
};

export default function RoadmapPage() {
  const core = blocks.filter((block) => !block.isSpecialist);
  const side = blocks.filter((block) => block.isSpecialist);
  const hours = sumHours(core);

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage">
        <div className="gutter stage-body py-[clamp(1.25rem,4vh,3rem)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="display">Chapters 00 through 18.</h1>
            <p className="fine measure">
              The map is public. Sign in to open a chapter. Core chapters{" "}
              {hours[0]}–{hours[1]} hours. Chapters 16–18 are optional
              specialties.
            </p>
          </div>
          <div className="mt-8 min-h-0">
            <ChapterBoard core={core} side={side} />
          </div>
        </div>
      </section>
    </article>
  );
}
