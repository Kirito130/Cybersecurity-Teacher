import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center px-4 py-16 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor-dim">
        Signal lost
      </p>
      <h1 className="mt-3 font-display text-4xl text-text-on-console">
        Path not found
      </h1>
      <p className="mt-3 text-text-on-console-muted">
        That segment is not on the CyberXP map.
      </p>
      <Link href="/roadmap" className="mt-6 inline-flex justify-center">
        <Button>Back to roadmap</Button>
      </Link>
    </div>
  );
}
