import { redirect } from "next/navigation";
import { blocks } from "@/content";

type PageProps = {
  params: Promise<{ blockId: string }>;
};

export function generateStaticParams() {
  return blocks.map((block) => ({ blockId: block.slug }));
}

/** Legacy /blocks/* URLs redirect to /chapters/* */
export default async function LegacyBlockRedirect({ params }: PageProps) {
  const { blockId } = await params;
  redirect(`/chapters/${blockId}`);
}
