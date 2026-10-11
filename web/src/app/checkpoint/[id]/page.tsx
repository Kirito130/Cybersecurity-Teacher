import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { checkpoints, getCheckpoint } from "@/content";
import { CheckpointView } from "@/components/checkpoint-view";

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
  if (!checkpoint) return { title: "Checkpoint" };
  return { title: checkpoint.title };
}

export default async function CheckpointPage({ params }: PageProps) {
  const { id } = await params;
  const checkpoint = getCheckpoint(id);
  if (!checkpoint) notFound();
  return <CheckpointView checkpoint={checkpoint} />;
}
