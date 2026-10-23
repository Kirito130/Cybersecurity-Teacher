import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Wait } from "@/kit/controls";
import { TopicStudy } from "@/views/study-views";
import { getTopic, topics } from "@/content";

type PageProps = {
  params: Promise<{ topicId: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return { title: "Topic" };
  return { title: topic.title };
}

export default function TopicPage({ params }: PageProps) {
  return (
    <Suspense fallback={<TopicFallback />}>
      <TopicContent params={params} />
    </Suspense>
  );
}

async function TopicContent({ params }: PageProps) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();
  return <TopicStudy topic={topic} />;
}

function TopicFallback() {
  return (
    <section className="sheet-paper stage justify-center">
      <div className="gutter">
        <Wait label="Opening topic" />
      </div>
    </section>
  );
}
