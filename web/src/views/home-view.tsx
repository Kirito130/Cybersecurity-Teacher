"use client";

import { useState } from "react";
import { ChapterBoard } from "@/kit/board";
import { sumHours } from "@/kit/chapter";
import { StampLink } from "@/kit/controls";
import { Chevrons, Drift, Stacks, Weave } from "@/kit/patterns";
import { badges, blocks, checkpoints, getCheckpoint, getTopic, topics } from "@/content";
import type { Block } from "@/content/types";

const STEPS = [
  {
    id: "read",
    n: "01",
    title: "Read the topic",
    body: "Each topic names the idea, points to one reading and one video, and ends with a written task.",
  },
  {
    id: "lab",
    n: "02",
    title: "Practice in your lab",
    body: "From Chapter 01 onward you work in an isolated lab you build. Chapter 00 stays on paper: scope, notes, and permission.",
  },
  {
    id: "quiz",
    n: "03",
    title: "Write the quiz",
    body: "Six short answers. Score 10 of 12. A zero on a critical scope or isolation question fails the chapter.",
  },
  {
    id: "practical",
    n: "04",
    title: "Complete the practical",
    body: "Score four criteria. Pass at 16 of 20 with nothing below 3. The next chapter does not open until both parts pass.",
  },
] as const;

export function HomeView() {
  const core = blocks.filter((block) => !block.isSpecialist);
  const side = blocks.filter((block) => block.isSpecialist);
  const hours = sumHours(core);
  const firstTopic = getTopic("00.1");
  const firstCheckpoint = getCheckpoint("checkpoint-00");
  const critical = firstCheckpoint?.quizQuestions.filter((question) =>
    firstCheckpoint.criticalQuestionIds.includes(question.id),
  );

  return (
    <>
      <TitleScreen
        facts={{
          chapters: core.length,
          branches: side.length,
          topics: topics.length,
          checkpoints: checkpoints.length,
          badges: badges.length,
          hours,
        }}
      />
      {firstTopic && firstCheckpoint ? (
        <LoopScreen
          topicTitle={firstTopic.title}
          task={firstTopic.task}
          question={firstCheckpoint.quizQuestions[0]?.prompt ?? ""}
        />
      ) : null}
      <MapScreen core={core} side={side} hours={hours} />
      {critical?.length ? (
        <RuleScreen prompts={critical.slice(0, 3).map((question) => question.prompt)} />
      ) : null}
      <StartScreen />
    </>
  );
}

function TitleScreen({
  facts,
}: {
  facts: {
    chapters: number;
    branches: number;
    topics: number;
    checkpoints: number;
    badges: number;
    hours: [number, number];
  };
}) {
  const rail = [
    `${facts.chapters} core chapters`,
    `${facts.branches} side branches`,
    `${facts.topics} topics`,
    `${facts.checkpoints} chapter quizzes`,
    `${facts.badges} badges`,
    `${facts.hours[0].toLocaleString("en-US")}–${facts.hours[1].toLocaleString("en-US")} focused hours`,
  ];
  return (
    <section className="sheet-paper stage-fit stage relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] text-signal lg:block">
        <Weave className="h-full w-full" />
      </div>
      <div className="gutter stage-body relative min-h-0 py-[clamp(1rem,3vh,2.25rem)]">
        <div>
          <h1 className="billboard ink max-w-[16ch]">
            Hack only
            <br />
            with <span className="act">permission.</span>
          </h1>
          <p className="lede measure mt-[clamp(0.75rem,2vh,1.25rem)] ink">
            Nineteen chapters from zero technical background to professional
            delivery. Isolated lab. Finish the chapter quiz and practical before
            the next chapter opens.
          </p>
          <div className="mt-[clamp(1rem,2.4vh,1.75rem)] flex flex-wrap gap-4">
            <StampLink href="/chapters/00">Open chapter 00</StampLink>
            <StampLink href="/roadmap" kind="ghost">
              Read the map
            </StampLink>
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden border-t-[4px] border-[var(--edge)] py-[clamp(1rem,2.2vh,1.5rem)]">
        <div className="rail-track flex w-max gap-14" aria-hidden="true">
          {[...rail, ...rail].map((item, index) => (
            <span key={`${item}-${index}`} className="ui">
              {item}
            </span>
          ))}
        </div>
        <p className="sr-only">{rail.join(". ")}</p>
      </div>
    </section>
  );
}

function LoopScreen({
  topicTitle,
  task,
  question,
}: {
  topicTitle: string;
  task: string;
  question: string;
}) {
  const [active, setActive] = useState<(typeof STEPS)[number]["id"]>("read");
  const step = STEPS.find((item) => item.id === active) ?? STEPS[0];
  const example =
    active === "read"
      ? topicTitle
      : active === "lab"
        ? task
        : active === "quiz"
          ? question
          : "Quiz 10/12 with no critical zero. Practical 16/20 with no criterion below 3.";

  return (
    <section className="sheet-ink stage-fit stage overflow-hidden">
      <div className="gutter stage-body grid items-center gap-8 py-[clamp(1.25rem,4vh,3rem)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display">
            Topics, tasks, then the next chapter.
          </h2>
          <ol className="mt-8 space-y-0">
            {STEPS.map((item) => (
              <li key={item.id} className="border-t-[4px] border-[var(--edge-soft)]">
                <button
                  type="button"
                  className="grid w-full grid-cols-[auto_1fr] gap-x-4 py-[clamp(0.7rem,1.8vh,1.2rem)] text-left"
                  aria-pressed={item.id === active}
                  onClick={() => setActive(item.id)}
                >
                  <span className="mark">{item.n}</span>
                  <span className={`kicker ${item.id === active ? "ink" : "quiet"}`}>
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="absolute inset-0 text-paper opacity-25">
            <Chevrons className="h-full w-full" />
          </div>
          <div className="panel relative">
            <p className="kicker ink">{step.title}</p>
            <p className="lede mt-4">{step.body}</p>
            <p className="mt-8 fine">{example}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapScreen({
  core,
  side,
  hours,
}: {
  core: Block[];
  side: Block[];
  hours: [number, number];
}) {
  return (
    <section className="sheet-blush stage-fit stage overflow-hidden">
      <div className="gutter stage-body py-[clamp(1.25rem,4vh,3rem)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display">Chapters 00 through 18.</h2>
          <p className="fine measure">
            Core chapters {hours[0]}–{hours[1]} hours. Chapters 16–18 are optional
            specialties after the core.
          </p>
        </div>
        <div className="relative mt-6 min-h-0">
          <div className="pointer-events-none absolute inset-0 text-indigo opacity-20">
            <Drift className="h-full w-full" />
          </div>
          <ChapterBoard core={core} side={side} />
        </div>
      </div>
    </section>
  );
}

function RuleScreen({ prompts }: { prompts: string[] }) {
  return (
    <section className="sheet-night stage-fit stage overflow-hidden">
      <div className="gutter stage-body grid items-center gap-10 py-[clamp(1.25rem,4vh,3rem)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display mt-0">Visibility is not permission.</h2>
          <p className="lede mt-6 measure">
            These are questions from Chapter 00. A public IP, a login redirect, or
            a scanner output does not authorize a test.
          </p>
        </div>
        <ol className="lg:col-span-7">
          {prompts.map((prompt, index) => (
            <li
              key={prompt}
              className="border-t-[4px] border-[var(--edge-soft)] py-[clamp(0.85rem,2vh,1.4rem)]"
            >
              <p className="kicker">
                {index + 1}. {prompt}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StartScreen() {
  return (
    <section className="sheet-signal stage-fit stage relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 text-paper opacity-20">
        <Stacks className="h-full w-full" />
      </div>
      <div className="gutter stage-body relative py-[clamp(1.5rem,5vh,3.5rem)]">
        <h2 className="display max-w-[16ch]">
          Home, map, and badges stay open. Chapters and topics need an account.
        </h2>
        <p className="lede measure mt-6">
          Chapter and topic pages redirect to sign-in until a session exists.
          Browser progress can move to the account on first sign-in if the cloud
          copy is empty.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <StampLink href="/auth/sign-up">Create account</StampLink>
          <StampLink href="/auth/sign-in" kind="ghost">
            Sign in
          </StampLink>
        </div>
      </div>
    </section>
  );
}
