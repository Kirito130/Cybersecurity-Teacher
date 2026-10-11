"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ClearanceMap } from "@/components/graphics/clearance-map";
import { BadgeCrest } from "@/components/graphics/badge-crest";
import { ScrollPath } from "@/components/graphics/scroll-path";
import { ConsoleCluster } from "@/components/graphics/console-cluster";

const stages = [
  {
    code: "01",
    title: "Study the block",
    body: "Work topics in order — read, watch the named lesson, and capture what you can reproduce.",
  },
  {
    code: "02",
    title: "Prove the task",
    body: "Finish the topic task before you drop down the map. No skipping ahead without evidence.",
  },
  {
    code: "03",
    title: "Clear the checkpoint",
    body: "Pass the quiz and practical checkpoint to unlock the next block and earn its badge.",
  },
];

const previewBlocks = [
  { id: "00", title: "Orientation", state: "open" as const },
  { id: "01", title: "Isolated lab", state: "next" as const },
  { id: "02", title: "Networking", state: "locked" as const },
  { id: "03", title: "Linux", state: "locked" as const },
];

export default function HomePage() {
  const reduced = useReducedMotion();

  return (
    <>
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden">
        <div aria-hidden className="crt-mesh pointer-events-none absolute inset-0" />
        {!reduced ? (
          <div
            aria-hidden
            className="crt-scan pointer-events-none absolute inset-0"
          />
        ) : null}
        <ClearanceMap
          className="pointer-events-none absolute inset-y-0 right-0 hidden max-w-full w-[min(48%,26rem)] overflow-hidden opacity-40 md:block"
          parallax={false}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-10 text-center md:px-10">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full"
          >
            <p className="font-display text-[clamp(3.5rem,12vw,8rem)] font-extrabold leading-none tracking-[-0.05em] text-paper">
              Cyber<span className="text-coral">XP</span>
            </p>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-sand">
              Leave zero behind.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sand-muted md:text-lg">
              A clearance path that unites{" "}
              <strong className="font-semibold text-paper">
                study, proof, and checkpoints
              </strong>{" "}
              — from no tech background to ethical hacking practice.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/roadmap">
                <Button size="lg">Open the roadmap</Button>
              </Link>
              <Link href="/blocks/00">
                <Button size="lg" variant="outline">
                  Start Block 00
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="paper-band">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-coral-dim">
            Clearance loop
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            How you advance on the path.
          </h2>

          <ScrollPath className="relative mt-12">
            <ol className="space-y-0">
              {stages.map((stage) => (
                <li
                  key={stage.code}
                  className="relative pb-10 pl-12 last:pb-0 md:pl-14"
                >
                  <span
                    className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-ink/20 bg-ink font-mono text-[11px] font-semibold text-coral"
                    aria-hidden
                  >
                    {stage.code}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollPath>
        </div>
      </section>

      <section className="border-y border-bezel bg-ink-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.95fr_1.05fr] md:px-6 md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-coral">
              Mission board
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
              See your clearance status live.
            </h2>
            <p className="mt-3 max-w-md text-sand-muted">
              Radar, gauges, and telemetry mirror the same loop you play on the
              roadmap — visible progress, the next gate, and medals still
              locked.
            </p>
            <Link href="/roadmap" className="mt-8 inline-block">
              <Button size="lg">Enter the path</Button>
            </Link>
          </div>
          <ConsoleCluster />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-coral">
            Open modules
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
            First clearances on the board.
          </h2>
          <p className="mt-3 max-w-xl text-sand-muted">
            Progress is tracked in this browser. Block 00 is open — later
            modules stay offline until you clear each checkpoint.
          </p>

          <ul className="mt-10 divide-y divide-bezel border-y border-bezel">
            {previewBlocks.map((block) => (
              <li
                key={block.id}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={
                      block.state === "open"
                        ? "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-wasabi shadow-[0_0_8px_var(--wasabi)]"
                        : block.state === "next"
                          ? "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-phosphor"
                          : "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-locked"
                    }
                    aria-hidden
                  />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">
                      Block {block.id}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-paper">
                      {block.title}
                    </p>
                  </div>
                </div>
                <p className="pl-6 font-mono text-[11px] uppercase tracking-[0.1em] text-sand-muted sm:pl-0">
                  {block.state === "open"
                    ? "Standby · open"
                    : block.state === "next"
                      ? "Next unlock"
                      : "Offline"}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link href="/roadmap">
              <Button size="lg">Explore full path</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="paper-band">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-6 md:py-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-coral-dim">
              Medal gallery
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Checkpoints clear. Badges stick.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Every block ends with a quiz and practical checkpoint. Pass both
              to unlock the next segment and bank a block badge in your gallery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/badges">
                <Button size="lg">View badges</Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-ink text-ink hover:border-coral hover:text-coral"
                >
                  See the rules
                </Button>
              </Link>
            </div>
          </Reveal>

          <div className="flex items-end justify-center gap-3 md:justify-end">
            <BadgeCrest label="BLOCK 00" tone="cleared" />
            <BadgeCrest label="BLOCK 01" tone="signal" locked />
            <BadgeCrest
              label="MILE"
              tone="xp"
              locked
              className="hidden sm:block"
            />
          </div>
        </div>
      </section>
    </>
  );
}
