import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Wait } from "@/kit/controls";
import { ChapterView } from "@/views/study-views";
import { blocks, getBlockBySlug, getTopicsForBlock } from "@/content";

type PageProps = {
  params: Promise<{ chapterId: string }>;
};

export function generateStaticParams() {
  return blocks.map((block) => ({ chapterId: block.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getBlockBySlug(chapterId);
  if (!chapter) return { title: "Chapter" };
  return { title: `Chapter ${chapter.number}` };
}

export default function ChapterPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ChapterFallback />}>
      <ChapterContent params={params} />
    </Suspense>
  );
}

async function ChapterContent({ params }: PageProps) {
  const { chapterId } = await params;
  const chapter = getBlockBySlug(chapterId);
  if (!chapter) notFound();
  const topics = getTopicsForBlock(chapter.id);
  return <ChapterView block={chapter} topics={topics} />;
}

function ChapterFallback() {
  return (
    <section className="sheet-paper stage justify-center">
      <div className="gutter">
        <Wait label="Opening chapter" />
      </div>
    </section>
  );
}
