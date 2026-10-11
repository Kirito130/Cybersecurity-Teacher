import type { Checkpoint } from "@/content/types";

export function scoreAnswer(answer: string, model: string) {
  const normalized = answer.trim().toLowerCase();
  if (!normalized) return 0;
  const keywords = model
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 4)
    .slice(0, 8);
  if (keywords.length === 0) return normalized.length > 20 ? 1 : 0;
  const hits = keywords.filter((word) => normalized.includes(word)).length;
  const ratio = hits / keywords.length;
  if (ratio >= 0.45 && normalized.length > 24) return 2;
  if (ratio >= 0.2 || normalized.length > 40) return 1;
  return 0;
}

export function evaluateQuiz(
  checkpoint: Checkpoint,
  answers: Record<string, string>,
) {
  const perQuestion: Record<string, number> = {};
  let total = 0;
  for (const question of checkpoint.quizQuestions) {
    const score = scoreAnswer(answers[question.id] ?? "", question.modelAnswer);
    perQuestion[question.id] = score;
    total += score;
  }
  const scopeZero = (perQuestion.q1 ?? 0) === 0 || (perQuestion.q3 ?? 0) === 0;
  const passed = total >= 10 && !scopeZero;
  return { perQuestion, total, passed };
}

export function evaluatePractical(scores: Record<string, number>) {
  const values = Object.values(scores);
  const total = values.reduce((sum, value) => sum + value, 0);
  const passed = total >= 16 && values.every((value) => value >= 3);
  return { total, passed };
}

export function publicQuizQuestions(checkpoint: Checkpoint) {
  return checkpoint.quizQuestions.map(({ id, prompt }) => ({ id, prompt }));
}
