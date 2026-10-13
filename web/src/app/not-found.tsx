import { StampLink } from "@/kit/controls";
import { Turns } from "@/kit/patterns";

export default function NotFound() {
  return (
    <section className="sheet-night stage-fit stage overflow-hidden">
      <div className="gutter stage-body grid items-center gap-10 py-[clamp(2rem,6vh,4rem)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="display">Page not found.</h1>
          <p className="lede measure mt-6">
            Check the link, or open the chapter map.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <StampLink href="/roadmap">Open the map</StampLink>
            <StampLink href="/" kind="ghost">
              Home
            </StampLink>
          </div>
        </div>
        <div className="relative hidden min-h-[16rem] text-paper lg:col-span-5 lg:col-start-8 lg:block">
          <Turns className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
