import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Wait } from "@/kit/controls";
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

export default function CheckpointPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CheckpointFallback />}>
      <CheckpointContent params={params} />
    </Suspense>
  );
}

async function CheckpointContent({ params }: PageProps) {
  const { id } = await params;
  const checkpoint = getCheckpoint(id);
  if (!checkpoint) notFound();
  return <CheckpointStudy checkpoint={checkpoint} />;
}

function CheckpointFallback() {
  return (
    <section className="sheet-paper stage justify-center">
      <div className="gutter">
        <Wait label="Opening quiz" />
      </div>
    </section>
  );
}
