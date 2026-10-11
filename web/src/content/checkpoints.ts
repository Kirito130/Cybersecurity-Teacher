import type { Checkpoint } from "./types";

export const checkpoints: Checkpoint[] = [
  {
    id: "checkpoint-00",
    blockId: "00",
    title: "Checkpoint 00 — Permission and practice plan",
    quizQuestions: [
      {
        id: "q1",
        prompt:
          "A company publishes its IP address. What additional condition must be met before you test it?",
        modelAnswer:
          "Explicit authorization from an appropriate owner and scope covering the asset and proposed actions; visibility alone grants nothing.",
      },
      {
        id: "q2",
        prompt:
          "How does a penetration test differ from simply running a vulnerability scanner?",
        modelAnswer:
          "A test uses a defined scope, manual validation, impact analysis, and reporting; a scanner provides candidate findings, including mistakes.",
      },
      {
        id: "q3",
        prompt:
          "A permitted application redirects to an external identity provider. What should you do?",
        modelAnswer:
          "Stop at that boundary unless the separate service is explicitly authorized; clarify with the owner.",
      },
      {
        id: "q4",
        prompt:
          "What is the difference between an observation and a hypothesis? Give an example.",
        modelAnswer:
          "“The response is 403” is an observation; “the role check caused it” is a hypothesis that needs a controlled test.",
      },
      {
        id: "q5",
        prompt: "Why is a VM snapshot useful, and what does it not replace?",
        modelAnswer:
          "It enables rollback of guest state; it does not replace independent backups, isolation, or evidence records.",
      },
      {
        id: "q6",
        prompt: "Why should you record unsuccessful tests?",
        modelAnswer:
          "They show coverage, prevent repeated dead ends, and constrain conclusions about what was actually tested.",
      },
    ],
    practicalCriteria: [
      {
        id: "c1",
        label: "Scope completeness",
        description:
          "Cedar Lab authorization sheet covers assets, exclusions, techniques, stop contact, dates, evidence, and cleanup.",
      },
      {
        id: "c2",
        label: "Isolation reasoning",
        description:
          "Lab diagram and restore plan show how the practice environment stays separated from home/work networks.",
      },
      {
        id: "c3",
        label: "Reproducible notes",
        description:
          "Notebook sample lets another person (or future you) repeat a harmless action from evidence alone.",
      },
      {
        id: "c4",
        label: "Correct boundary decisions",
        description:
          "Ten scope decisions correctly classify permitted, prohibited, and clarify-needed actions — including IdP and unexpected IP cases.",
      },
    ],
    practicalBrief:
      "Submit the Cedar Lab authorization sheet, diagram, notebook sample, and ten scope decisions. Score each criterion 0–5 using the universal practical checkpoint rules.",
    passRules:
      "Quiz: score each answer 0–2; pass at 10/12 with no zero on a scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3.",
  },
];

export function getCheckpoint(id: string) {
  return checkpoints.find((checkpoint) => checkpoint.id === id);
}

export function getCheckpointByBlock(blockId: string) {
  return checkpoints.find((checkpoint) => checkpoint.blockId === blockId);
}
