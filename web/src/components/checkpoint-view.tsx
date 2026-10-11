"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Checkpoint } from "@/content/types";
import { getBadgeForBlock, getBlock } from "@/content";
import { useProgress } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { evaluatePractical, evaluateQuiz } from "@/lib/quiz-scoring";
import type { ProgressState } from "@/lib/progress-core";
import { cn } from "@/lib/utils";

type CheckpointViewProps = {
  checkpoint: Checkpoint;
};

export function CheckpointView({ checkpoint }: CheckpointViewProps) {
  const {
    progress,
    mode,
    submitCheckpoint,
    applyServerProgress,
  } = useProgress();
  const reduced = useReducedMotion();
  const block = getBlock(checkpoint.blockId);
  const badge = getBadgeForBlock(checkpoint.blockId);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [perQuestion, setPerQuestion] = useState<Record<string, number>>({});
  const [modelAnswers, setModelAnswers] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pendingQuiz, setPendingQuiz] = useState(false);
  const [pendingPractical, setPendingPractical] = useState(false);

  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        checkpoint.practicalCriteria.map((criterion) => [criterion.id, 3]),
      ),
  );
  const [practicalSubmitted, setPracticalSubmitted] = useState(false);
  const [badgeFlash, setBadgeFlash] = useState(false);

  const quizPassedAlready = progress.quizPassed.includes(checkpoint.id);
  const practicalPassedAlready = progress.practicalPassed.includes(
    checkpoint.id,
  );
  const badgeEarned = badge
    ? progress.earnedBadges.includes(badge.id)
    : false;

  const practicalTotal = useMemo(
    () =>
      Object.values(criteriaScores).reduce(
        (sum, value) => sum + Number(value || 0),
        0,
      ),
    [criteriaScores],
  );

  async function handleQuizSubmit() {
    setSubmitError(null);
    setPendingQuiz(true);
    try {
      if (mode === "cloud") {
        const res = await fetch("/api/checkpoint/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checkpointId: checkpoint.id,
            answers,
          }),
        });
        const data = (await res.json()) as {
          error?: string;
          progress?: ProgressState;
          score?: number;
          passed?: boolean;
          perQuestion?: Record<string, number>;
          modelAnswers?: Record<string, string>;
        };
        if (!res.ok) {
          setSubmitError(data.error ?? "Quiz submission failed");
          return;
        }
        setPerQuestion(data.perQuestion ?? {});
        setQuizScore(data.score ?? 0);
        setModelAnswers(data.modelAnswers ?? {});
        setQuizSubmitted(true);
        setShowKeys(true);
        if (data.progress) applyServerProgress(data.progress);
        return;
      }

      const result = evaluateQuiz(checkpoint, answers);
      setPerQuestion(result.perQuestion);
      setQuizScore(result.total);
      setModelAnswers(
        Object.fromEntries(
          checkpoint.quizQuestions.map((question) => [
            question.id,
            question.modelAnswer,
          ]),
        ),
      );
      setQuizSubmitted(true);
      setShowKeys(true);
      submitCheckpoint(
        checkpoint.id,
        "quiz",
        result.total,
        result.passed,
      );
    } catch {
      setSubmitError("Unable to submit quiz right now.");
    } finally {
      setPendingQuiz(false);
    }
  }

  async function handlePracticalSubmit() {
    setSubmitError(null);
    setPendingPractical(true);
    try {
      if (mode === "cloud") {
        const res = await fetch("/api/checkpoint/practical", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checkpointId: checkpoint.id,
            criteriaScores,
          }),
        });
        const data = (await res.json()) as {
          error?: string;
          progress?: ProgressState;
          score?: number;
          passed?: boolean;
        };
        if (!res.ok) {
          setSubmitError(data.error ?? "Practical submission failed");
          return;
        }
        setPracticalSubmitted(true);
        if (data.progress) {
          applyServerProgress(data.progress);
          if (
            data.passed &&
            badge &&
            data.progress.earnedBadges.includes(badge.id)
          ) {
            setBadgeFlash(true);
          }
        }
        return;
      }

      const result = evaluatePractical(criteriaScores);
      setPracticalSubmitted(true);
      submitCheckpoint(
        checkpoint.id,
        "practical",
        result.total,
        result.passed,
      );
      const quizOk =
        quizPassedAlready ||
        (quizSubmitted &&
          quizScore >= 10 &&
          (perQuestion.q1 ?? 0) > 0 &&
          (perQuestion.q3 ?? 0) > 0);
      if (result.passed && quizOk) setBadgeFlash(true);
    } catch {
      setSubmitError("Unable to submit practical scores right now.");
    } finally {
      setPendingPractical(false);
    }
  }

  return (
    <div className="bg-console text-text-on-console">
      <div className="console-hero-frame">
        <div className="console-hero">
          <div className="console-hero__screen px-5 py-10 md:px-10 md:py-14">
            <Link
              href={`/blocks/${block?.slug ?? checkpoint.blockId}`}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor hover:underline"
            >
              Block {checkpoint.blockId}
            </Link>
            <h1 className="mt-3 font-display text-4xl text-text-on-crt">
              {checkpoint.title}
            </h1>
            <p className="mt-4 text-sm text-text-on-crt-muted">
              {checkpoint.passRules}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-crt-muted">
              {mode === "cloud"
                ? "Signed in — quiz scoring runs on the server with attempt limits."
                : "Guest mode — local scoring. Sign in to sync cloud progress."}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <section>
          <h2 className="font-display text-2xl text-text-on-console">
            Checkpoint quiz
          </h2>
          <ol className="mt-6 space-y-5">
            {checkpoint.quizQuestions.map((question, index) => (
              <li key={question.id} className="crt-panel p-4">
                <p className="font-medium text-text-on-crt">
                  {index + 1}. {question.prompt}
                </p>
                <textarea
                  className="mt-3 min-h-28 w-full rounded-[var(--radius-md)] border border-crt-line bg-crt px-3 py-2 text-sm text-text-on-crt"
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: event.target.value,
                    }))
                  }
                  disabled={quizSubmitted || quizPassedAlready || pendingQuiz}
                  aria-label={`Answer ${index + 1}`}
                />
                {showKeys || quizPassedAlready ? (
                  <div className="mt-3 text-sm">
                    {quizSubmitted ? (
                      <p className="text-text-on-crt-muted">
                        Score: {perQuestion[question.id] ?? 0}/2
                      </p>
                    ) : null}
                    {(modelAnswers[question.id] || question.modelAnswer) &&
                    (showKeys || mode === "local") ? (
                      <p className="mt-1 text-text-on-crt-muted">
                        <span className="font-medium text-text-on-crt">
                          Model answer:{" "}
                        </span>
                        {modelAnswers[question.id] ?? question.modelAnswer}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => void handleQuizSubmit()}
              disabled={quizSubmitted || quizPassedAlready || pendingQuiz}
            >
              {pendingQuiz ? "Scoring…" : "Submit quiz"}
            </Button>
            {quizSubmitted || quizPassedAlready ? (
              <p className="text-sm text-text-on-console-muted">
                Score:{" "}
                {quizSubmitted
                  ? quizScore
                  : (progress.quizScores[checkpoint.id] ?? "—")}
                /12
                {(quizSubmitted ? quizScore >= 10 : quizPassedAlready)
                  ? " — quiz cleared"
                  : " — review and retry after study"}
              </p>
            ) : null}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-on-console">
            Practical checkpoint
          </h2>
          <p className="mt-3 text-sm text-text-on-console-muted">
            {checkpoint.practicalBrief}
          </p>
          <ul className="mt-6 space-y-4">
            {checkpoint.practicalCriteria.map((criterion) => (
              <li key={criterion.id} className="crt-panel p-4">
                <p className="font-medium text-text-on-crt">{criterion.label}</p>
                <p className="mt-1 text-sm text-text-on-crt-muted">
                  {criterion.description}
                </p>
                <label className="mt-3 flex items-center gap-3 text-sm">
                  <span className="text-text-on-crt-muted">Self-score (0–5)</span>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    className="w-20 rounded-[var(--radius-md)] border border-crt-line bg-crt px-2 py-1 text-text-on-crt"
                    value={criteriaScores[criterion.id]}
                    disabled={
                      practicalSubmitted ||
                      practicalPassedAlready ||
                      pendingPractical
                    }
                    onChange={(event) => {
                      const value = Math.max(
                        0,
                        Math.min(5, Number(event.target.value) || 0),
                      );
                      setCriteriaScores((current) => ({
                        ...current,
                        [criterion.id]: value,
                      }));
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => void handlePracticalSubmit()}
              disabled={
                practicalSubmitted || practicalPassedAlready || pendingPractical
              }
            >
              {pendingPractical ? "Saving…" : "Submit practical scores"}
            </Button>
            <p className="text-sm text-text-on-console-muted">
              Total:{" "}
              {practicalSubmitted || practicalPassedAlready
                ? (progress.practicalScores[checkpoint.id] ?? practicalTotal)
                : practicalTotal}
              /20
            </p>
          </div>
        </section>

        {submitError ? (
          <p className="text-sm text-danger" role="alert">
            {submitError}
          </p>
        ) : null}

        {(badgeFlash || badgeEarned) && badge ? (
          <motion.div
            initial={reduced ? false : { scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "border border-phosphor bg-phosphor-soft p-6 text-center",
            )}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor">
              Medal awarded
            </p>
            <h2 className="mt-2 font-display text-3xl text-text-on-crt">
              {badge.name}
            </h2>
            <p className="mt-2 text-sm text-text-on-crt-muted">
              {badge.description}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/badges">
                <Button>View badge gallery</Button>
              </Link>
              <Link href="/roadmap">
                <Button variant="secondary">Return to roadmap</Button>
              </Link>
            </div>
          </motion.div>
        ) : null}

        <Link
          href={`/blocks/${block?.slug ?? checkpoint.blockId}`}
          className="inline-block text-sm text-phosphor-dim hover:underline"
        >
          ← Back to Block {checkpoint.blockId}
        </Link>
      </div>
    </div>
  );
}
