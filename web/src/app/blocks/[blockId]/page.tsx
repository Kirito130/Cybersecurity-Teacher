import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blocks, getBlockBySlug, getTopicsForBlock } from "@/content";
import { BlockHub } from "@/components/block-hub";

type PageProps = {
  params: Promise<{ blockId: string }>;
};

export function generateStaticParams() {
  return blocks.map((block) => ({ blockId: block.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { blockId } = await params;
  const block = getBlockBySlug(blockId);
  if (!block) return { title: "Block" };
  return { title: `Block ${block.number}` };
}

export default async function BlockPage({ params }: PageProps) {
  const { blockId } = await params;
  const block = getBlockBySlug(blockId);
  if (!block) notFound();
  const topics = getTopicsForBlock(block.id);
  return <BlockHub block={block} topics={topics} />;
}
