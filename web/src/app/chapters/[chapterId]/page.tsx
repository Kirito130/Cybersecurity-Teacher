import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function ChapterPage({ params }: PageProps) {
  const { chapterId } = await params;
  const chapter = getBlockBySlug(chapterId);
  if (!chapter) notFound();
  const topics = getTopicsForBlock(chapter.id);
  return <ChapterView block={chapter} topics={topics} />;
}
