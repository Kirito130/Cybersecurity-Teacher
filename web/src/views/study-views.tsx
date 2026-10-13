"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { chapterStatus, shortTitles, stateLabel } from "@/kit/chapter";
import { AreaSlot, Marked, Meter, Stamp, StampLink, Wait } from "@/kit/controls";
import { EmptyNote, ErrorNote, OfflineNote } from "@/kit/states";
import { getBlock, getTopicsForBlock } from "@/content";
import type { Block, Checkpoint, Topic } from "@/content/types";
import { evaluatePractical, evaluateQuiz } from "@/lib/quiz-scoring";
import { signInHref } from "@/lib/safe-next";
import { useAuth } from "@/state/auth-provider";
import { useProgress } from "@/state/progress-provider";

export function ChapterView({ block, topics }: { block: Block; topics: Topic[] }) {
  const { progress } = useProgress();
  const { fullAccess, loading, user } = useAuth();
  const status = chapterStatus(block, progress, fullAccess);
  const checkpoint = block.checkpointId;

  if (loading) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter">
          <Wait label="Checking access" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter max-w-3xl">
          <EmptyNote
            title="Sign in to open this chapter"
            body="The map stays public. Chapter pages need an account."
            href={signInHref(`/chapters/${block.slug}`)}
            action="Sign in"
          />
        </div>
      </section>
    );
  }

  if (!status.unlocked) {
    return (
      <section className="sheet-blush stage justify-center">
        <div className="gutter max-w-3xl">
          <h1 className="display">Chapter {block.number} is not open yet.</h1>
          <p className="lede measure mt-6">
            Finish the previous chapter first. Prerequisites:{" "}
            {block.prerequisites.length
              ? block.prerequisites
                  .map((id) => `Chapter ${id} (${shortTitles[id] ?? id})`)
                  .join(", ")
              : "none"}
            .
          </p>
          <div className="mt-8">
            <StampLink href="/roadmap">Back to the map</StampLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage">
        <div className="gutter stage-body gap-10 py-[clamp(1.25rem,4vh,3rem)]">
          <div>
            <h1 className="display max-w-[18ch] ink">
              Chapter {block.number}: {block.title}
            </h1>
            <p className="mt-3 fine">
              {stateLabel[status.state]} · {block.estimatedHours} hours
              {block.isSpecialist ? " · optional specialty" : ""}
            </p>
            <p className="lede measure mt-6">{block.outcome}</p>
          </div>
          <div>
            <Meter value={status.percent} max={Math.max(4, status.total)} />
            <p className="mt-3 fine">
              {status.done}/{status.total} · {topics.length} topics
            </p>
          </div>
        </div>
      </section>

      <section className="sheet-blush">
        <div className="gutter py-[clamp(2rem,6vh,4rem)]">
          <h2 className="title">Topics</h2>
          {topics.length === 0 ? (
            <p className="mt-6 lede">No topics are listed for this chapter yet.</p>
          ) : (
            <ol className="mt-8">
              {topics.map((topic) => {
                const done = progress.completedTopics.includes(topic.id);
                return (
                  <li
                    key={topic.id}
                    className="grid gap-3 border-t-[4px] border-[var(--edge)] py-6 md:grid-cols-[8rem_1fr_auto] md:items-center"
                  >
                    <span className="mark">{topic.id}</span>
                    <div>
                      <Link href={`/topics/${topic.slug}`} className="kicker ink">
                        {topic.title}
                      </Link>
                      <p className="mt-2 fine quiet">
                        {topic.subtopics.length} subtopics · {done ? "Marked done" : "Open"}
                      </p>
                    </div>
                    <StampLink href={`/topics/${topic.slug}`} kind="ghost">
                      Open
                    </StampLink>
                  </li>
                );
              })}
            </ol>
          )}
          {checkpoint ? (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StampLink href={`/checkpoint/${checkpoint}`}>
                Open chapter quiz and practical
              </StampLink>
              <p className="fine quiet">Quiz and practical. Both must pass.</p>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}

export function TopicStudy({ topic }: { topic: Topic }) {
  const { progress, completeTopic, syncing } = useProgress();
  const { loading, user } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const done = progress.completedTopics.includes(topic.id);
  const chapter = getBlock(topic.blockId);
  const siblings = getTopicsForBlock(topic.blockId);
  const index = siblings.findIndex((item) => item.id === topic.id);
  const next = index >= 0 ? siblings[index + 1] : undefined;

  if (loading) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter">
          <Wait label="Opening topic" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter max-w-3xl">
          <EmptyNote
            title="Sign in to study this topic"
            body="Topics are behind an account so progress can be stored."
            href={signInHref(`/topics/${topic.slug}`)}
            action="Sign in"
          />
        </div>
      </section>
    );
  }

  async function toggle() {
    setPending(true);
    setError(null);
    try {
      await completeTopic(topic.id);
    } catch {
      setError("Could not save that mark. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage">
        <div className="gutter stage-body gap-10 py-[clamp(1.25rem,4vh,3rem)]">
          <div>
            <h1 className="display max-w-[18ch] ink">{topic.title}</h1>
            <p className="mt-3 fine">
              Topic {topic.id}
              {chapter ? ` · Chapter ${chapter.number}` : ""}
              {syncing ? " · Saving…" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {chapter ? (
              <StampLink href={`/chapters/${chapter.slug}`} kind="ghost">
                Chapter
              </StampLink>
            ) : null}
            <Stamp type="button" onClick={() => void toggle()} disabled={pending}>
              {pending ? "Saving…" : done ? "Mark as open" : "Mark as done"}
            </Stamp>
          </div>
        </div>
      </section>

      <section className="sheet-blush">
        <div className="gutter space-y-10 py-[clamp(2rem,6vh,4rem)]">
          {error ? <ErrorNote body={error} /> : null}
          {topic.subtopics.map((subtopic) => (
            <section key={subtopic.id} className="panel">
              <h2 className="kicker ink">
                Subtopic {subtopic.id}: {subtopic.title}
              </h2>
              <p className="mt-4">{subtopic.concepts}</p>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a href={subtopic.reading.url} className="cite" target="_blank" rel="noreferrer">
                  Reading: {subtopic.reading.label}
                </a>
                <a href={subtopic.video.url} className="cite" target="_blank" rel="noreferrer">
                  Video: {subtopic.video.label}
                </a>
              </p>
            </section>
          ))}
          <section className="panel">
            <h2 className="kicker ink">Topic task</h2>
            <p className="mt-4 lede">
              <Marked text={topic.task} />
            </p>
          </section>
          <div className="flex flex-wrap gap-4">
            {next ? (
              <StampLink href={`/topics/${next.slug}`}>Next topic</StampLink>
            ) : chapter?.checkpointId ? (
              <StampLink href={`/checkpoint/${chapter.checkpointId}`}>
                Chapter quiz and practical
              </StampLink>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}

type QuizResult = {
  score: number;
  passed: boolean;
  perQuestion: Record<string, number>;
  modelAnswers?: Record<string, string>;
};

export function CheckpointStudy({ checkpoint }: { checkpoint: Checkpoint }) {
  const { progress, submitCheckpoint, applyServerProgress } = useProgress();
  const { loading, user, configured } = useAuth();
  const chapter = getBlock(checkpoint.blockId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [criteria, setCriteria] = useState<Record<string, number>>(() =>
    Object.fromEntries(checkpoint.practicalCriteria.map((item) => [item.id, 0])),
  );
  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [practical, setPractical] = useState<{ score: number; passed: boolean } | null>(
    null,
  );
  const [quizError, setQuizError] = useState<string | null>(null);
  const [practicalError, setPracticalError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [quizPending, setQuizPending] = useState(false);
  const [practicalPending, setPracticalPending] = useState(false);

  const quizSaved = progress.quizPassed.includes(checkpoint.id);
  const practicalSaved = progress.practicalPassed.includes(checkpoint.id);

  if (loading) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter">
          <Wait label="Opening chapter quiz" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="sheet-paper stage justify-center">
        <div className="gutter max-w-3xl">
          <EmptyNote
            title="Sign in for the chapter quiz and practical"
            body="Quiz and practical scores are stored on the account."
            href={signInHref(`/checkpoint/${checkpoint.id}`)}
            action="Sign in"
          />
        </div>
      </section>
    );
  }

  async function onQuiz(event: FormEvent) {
    event.preventDefault();
    setQuizPending(true);
    setQuizError(null);
    setOffline(false);
    try {
      if (configured) {
        const res = await fetch("/api/checkpoint/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkpointId: checkpoint.id, answers }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          setQuizError(data?.error ?? "The quiz could not be scored.");
          return;
        }
        const data = (await res.json()) as QuizResult & { progress?: typeof progress };
        setQuiz(data);
        if (data.progress) applyServerProgress(data.progress);
        else submitCheckpoint(checkpoint.id, "quiz", data.score, data.passed);
        return;
      }
      const local = evaluateQuiz(checkpoint, answers);
      setQuiz({
        score: local.total,
        passed: local.passed,
        perQuestion: local.perQuestion,
        modelAnswers: Object.fromEntries(
          checkpoint.quizQuestions.map((question) => [question.id, question.modelAnswer]),
        ),
      });
      submitCheckpoint(checkpoint.id, "quiz", local.total, local.passed);
    } catch {
      setOffline(true);
    } finally {
      setQuizPending(false);
    }
  }

  async function onPractical(event: FormEvent) {
    event.preventDefault();
    setPracticalPending(true);
    setPracticalError(null);
    setOffline(false);
    try {
      if (configured) {
        const res = await fetch("/api/checkpoint/practical", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checkpointId: checkpoint.id,
            criteriaScores: criteria,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          setPracticalError(data?.error ?? "The practical could not be recorded.");
          return;
        }
        const data = (await res.json()) as {
          score: number;
          passed: boolean;
          progress?: typeof progress;
        };
        setPractical({ score: data.score, passed: data.passed });
        if (data.progress) applyServerProgress(data.progress);
        else submitCheckpoint(checkpoint.id, "practical", data.score, data.passed);
        return;
      }
      const local = evaluatePractical(criteria);
      setPractical({ score: local.total, passed: local.passed });
      submitCheckpoint(checkpoint.id, "practical", local.total, local.passed);
    } catch {
      setOffline(true);
    } finally {
      setPracticalPending(false);
    }
  }

  const practicalTotal = useMemo(
    () => Object.values(criteria).reduce((sum, value) => sum + value, 0),
    [criteria],
  );

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage sheet-ink">
        <div className="gutter stage-body gap-10 py-[clamp(1.25rem,4vh,3rem)]">
          <div>
            <h1 className="display max-w-[18ch]">{checkpoint.title}</h1>
            <p className="mt-3 fine">
              {chapter ? `Chapter ${chapter.number}` : "Chapter"} · Quiz{" "}
              {quizSaved ? "passed" : "open"} · Practical{" "}
              {practicalSaved ? "passed" : "open"}
            </p>
          </div>
          <p className="lede measure">
            <Marked text={checkpoint.passRules} />
          </p>
        </div>
      </section>

      <section className="sheet-paper">
        <div className="gutter space-y-8 py-[clamp(2rem,6vh,4rem)]">
          {offline ? <OfflineNote /> : null}
          <section>
            <h2 className="title">Quiz</h2>
            <form className="mt-8 space-y-8" onSubmit={(event) => void onQuiz(event)}>
              {checkpoint.quizQuestions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <label className="caption" htmlFor={`q-${question.id}`}>
                    {question.id.toUpperCase()}
                    {checkpoint.criticalQuestionIds.includes(question.id)
                      ? " · critical"
                      : ""}
                  </label>
                  <p className="kicker ink">{question.prompt}</p>
                  <AreaSlot
                    id={`q-${question.id}`}
                    value={answers[question.id] ?? ""}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value,
                      }))
                    }
                    maxLength={4000}
                    required
                  />
                  {quiz?.perQuestion[question.id] !== undefined ? (
                    <p className="fine">
                      Score {quiz.perQuestion[question.id]}/2
                      {quiz.modelAnswers?.[question.id]
                        ? ` · Model: ${quiz.modelAnswers[question.id]}`
                        : ""}
                    </p>
                  ) : null}
                </div>
              ))}
              {quizError ? <ErrorNote body={quizError} /> : null}
              {quiz ? (
                <p className="kicker" role="status">
                  {quiz.passed ? "Quiz passed" : "Quiz not passed"} · {quiz.score}/
                  {checkpoint.quizQuestions.length * 2}
                </p>
              ) : null}
              <Stamp type="submit" disabled={quizPending}>
                {quizPending ? "Scoring…" : "Score quiz"}
              </Stamp>
            </form>
          </section>
        </div>
      </section>

      <section className="sheet-blush">
        <div className="gutter space-y-8 py-[clamp(2rem,6vh,4rem)]">
          <h2 className="title">Practical</h2>
          <p className="lede measure">
            <Marked text={checkpoint.practicalBrief} />
          </p>
          <form className="space-y-6" onSubmit={(event) => void onPractical(event)}>
            {checkpoint.practicalCriteria.map((criterion) => (
              <fieldset key={criterion.id} className="panel">
                <legend className="caption">{criterion.label}</legend>
                <p className="mt-2 fine">{criterion.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <label key={score} className="ui inline-flex min-h-11 items-center gap-2">
                      <input
                        type="radio"
                        name={criterion.id}
                        value={score}
                        checked={criteria[criterion.id] === score}
                        onChange={() =>
                          setCriteria((current) => ({ ...current, [criterion.id]: score }))
                        }
                      />
                      {score}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {practicalError ? <ErrorNote body={practicalError} /> : null}
            <p className="fine">Running total {practicalTotal}/20</p>
            {practical ? (
              <p className="kicker" role="status">
                {practical.passed ? "Practical passed" : "Practical not passed"} ·{" "}
                {practical.score}/20
              </p>
            ) : null}
            <Stamp type="submit" disabled={practicalPending}>
              {practicalPending ? "Saving…" : "Record practical"}
            </Stamp>
          </form>
          {chapter ? (
            <StampLink href={`/chapters/${chapter.slug}`} kind="ghost">
              Back to chapter
            </StampLink>
          ) : null}
        </div>
      </section>
    </article>
  );
}
