import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckpointStudy } from "@/views/study-views";
import { checkpoints, getCheckpoint } from "@/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return checkpoints.map((checkpoint) => ({ id: checkpoint.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const checkpoint = getCheckpoint(id);
  if (!checkpoint) return { title: "Chapter quiz and practical" };
  return { title: checkpoint.title };
}

export default async function CheckpointPage({ params }: PageProps) {
  const { id } = await params;
  const checkpoint = getCheckpoint(id);
  if (!checkpoint) notFound();
  return <CheckpointStudy checkpoint={checkpoint} />;
}
