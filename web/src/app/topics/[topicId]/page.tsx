import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function TopicPage({ params }: PageProps) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();
  return <TopicStudy topic={topic} />;
}
