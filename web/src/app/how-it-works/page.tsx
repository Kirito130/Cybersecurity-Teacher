import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it works",
};

export default function HowItWorksPage() {
  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen px-5 py-10 md:px-10 md:py-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
              Mission briefing
            </p>
            <h1 className="mt-3 font-display text-4xl text-text-on-crt md:text-5xl">
              How CyberXP works
            </h1>
            <p className="mt-4 max-w-2xl text-text-on-crt-muted">
              A prerequisite-led path with practice after every topic and a
              checkpoint between every block.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 md:px-6 md:py-16">
        <section className="crt-panel p-5 md:p-6">
          <h2 className="font-display text-2xl text-text-on-crt">
            Study workflow
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-text-on-crt-muted">
            <li>Follow Blocks 00–15 in order. Finish topics top to bottom.</li>
            <li>
              For each subtopic: read, watch the named lesson, and reproduce the
              ideas in your notes.
            </li>
            <li>Complete the topic task before moving down the block.</li>
            <li>
              At the end of the block, clear the checkpoint quiz and practical
              assessment.
            </li>
            <li>
              Revisit one earlier exercise each week without its walkthrough.
            </li>
          </ol>
        </section>

        <section className="crt-panel p-5 md:p-6">
          <h2 className="font-display text-2xl text-text-on-crt">
            Checkpoint rules
          </h2>
          <ul className="mt-4 space-y-3 text-text-on-crt-muted">
            <li>
              <strong className="text-text-on-crt">Quiz:</strong> six
              short-answer questions scored 0–2. Pass at 10/12 with no zero on a
              scope/isolation question.
            </li>
            <li>
              <strong className="text-text-on-crt">Practical checkpoint:</strong>{" "}
              four criteria scored 0–5. Pass at 16/20 with no criterion below 3.
            </li>
            <li>
              Scope violations or fabricated evidence are automatic practical
              failures.
            </li>
            <li>
              First attempt: personal notes and official docs are allowed;
              walkthroughs and answer keys are not.
            </li>
          </ul>
        </section>

        <section className="crt-panel p-5 md:p-6">
          <h2 className="font-display text-2xl text-text-on-crt">
            Session rhythm
          </h2>
          <p className="mt-4 text-text-on-crt-muted">
            For a two-hour session: 15 minutes recall, 30 minutes reading/video,
            60 minutes hands-on work, 15 minutes notes and retest planning.
            Budget about half your time for practice.
          </p>
        </section>

        <section id="accounts" className="crt-panel p-5 md:p-6">
          <h2 className="font-display text-2xl text-text-on-crt">Accounts</h2>
          <p className="mt-4 text-text-on-crt-muted">
            Create an account at{" "}
            <Link href="/auth/sign-up" className="text-phosphor hover:underline">
              /auth/sign-up
            </Link>{" "}
            to sync topics, checkpoint attempts, and badges via Supabase. Guests
            still use browser{" "}
            <code className="rounded-[var(--radius-sm)] bg-crt px-1.5 py-0.5 font-mono text-sm text-phosphor-bright">
              localStorage
            </code>
            ; on first sign-in, local progress migrates if your cloud path is
            empty. Quiz submissions for signed-in users are scored on the
            server with per-minute rate limits.
          </p>
        </section>

        <section className="shell-plate border-phosphor-dim/40 p-5 md:p-6">
          <h2 className="font-display text-2xl text-text-on-console">
            Authorization reminder
          </h2>
          <p className="mt-4 text-text-on-console-muted">
            Practice only on your own isolated lab, provider-designated
            challenges, or systems with explicit written authorization. A public
            IP or free account is not permission to test.
          </p>
        </section>

        <Link href="/blocks/00">
          <Button size="lg">Begin Block 00</Button>
        </Link>
      </div>
    </div>
  );
}
