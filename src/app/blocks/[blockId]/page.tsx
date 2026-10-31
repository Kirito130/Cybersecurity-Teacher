import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Wait } from "@/kit/controls";
import { blocks } from "@/content";

type PageProps = {
  params: Promise<{ blockId: string }>;
};

export function generateStaticParams() {
  return blocks.map((block) => ({ blockId: block.slug }));
}

/** Legacy /blocks/* URLs redirect to /chapters/* */
export default function LegacyBlockRedirect({ params }: PageProps) {
  return (
    <Suspense fallback={<LegacyBlockFallback />}>
      <LegacyBlockContent params={params} />
    </Suspense>
  );
}

async function LegacyBlockContent({ params }: PageProps) {
  const { blockId } = await params;
  redirect(`/chapters/${blockId}`);
}

function LegacyBlockFallback() {
  return (
    <section className="sheet-paper stage justify-center">
      <div className="gutter">
        <Wait label="Opening chapter" />
      </div>
    </section>
  );
}
