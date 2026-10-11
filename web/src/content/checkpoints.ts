import type { Checkpoint } from "./types";

export const checkpoints: Checkpoint[] = [
  {
    id: "checkpoint-00",
    blockId: "00",
    title: "Checkpoint 00 — Permission and practice plan",
    criticalQuestionIds: ["q1", "q3"],
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
  {
    id: "checkpoint-01",
    blockId: "01",
    title: "Checkpoint 01 — Rebuildable workstation",
    criticalQuestionIds: ["q5"],
    quizQuestions: [
      {
        id: "q1",
        prompt:
          "Why does adding disk space not necessarily fix a machine running out of RAM?",
        modelAnswer:
          "RAM holds active working data; disk capacity is a different resource. Paging may help capacity but can be much slower.",
      },
      {
        id: "q2",
        prompt:
          "What does an operating system provide that an ordinary application does not?",
        modelAnswer:
          "It manages hardware, processes, memory, files, and access between programs and devices.",
      },
      {
        id: "q3",
        prompt: "Is renaming picture.jpg to picture.txt a conversion? Explain.",
        modelAnswer:
          "No. The bytes and format stay the same; only the name changes.",
      },
      {
        id: "q4",
        prompt: "Which two machines are meant by “host” and “guest”?",
        modelAnswer:
          "The host runs the hypervisor; the guest is the OS inside a virtual machine.",
      },
      {
        id: "q5",
        prompt:
          "Why is NAT alone insufficient to guarantee a vulnerable guest cannot reach other systems?",
        modelAnswer:
          "NAT commonly permits outbound traffic and may have port forwards; verify routes and interfaces and use stronger lab separation.",
      },
      {
        id: "q6",
        prompt: "What must you record so another learner can recreate your VM?",
        modelAnswer:
          "Image/source and version, architecture, virtual resources, network mode, setup steps, and recovery/verification procedure.",
      },
    ],
    practicalCriteria: [
      {
        id: "c1",
        label: "Working rebuild",
        description:
          "Another learner (or you later) can rebuild the guest from your written instructions alone.",
      },
      {
        id: "c2",
        label: "Data recovery",
        description:
          "You recover a file from your own backup or restore process and show evidence it matches.",
      },
      {
        id: "c3",
        label: "Isolation verification",
        description:
          "You demonstrate snapshot rollback and explain guest connectivity (internal vs NAT vs unintended paths).",
      },
      {
        id: "c4",
        label: "Hardware-and-OS explanation",
        description:
          "You correctly relate host resources, guest settings, and OS/process behavior from your inventory notes.",
      },
    ],
    practicalBrief:
      "Rebuild a guest from your instructions, recover a file, demonstrate snapshot rollback, and explain its connectivity. Score: working rebuild / data recovery / isolation verification / hardware-and-OS explanation.",
    passRules:
      "Quiz: score each answer 0–2; pass at 10/12 with no zero on the isolation question (q5). Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3.",
  },
];

export function getCheckpoint(id: string) {
  return checkpoints.find((checkpoint) => checkpoint.id === id);
}

export function getCheckpointByBlock(blockId: string) {
  return checkpoints.find((checkpoint) => checkpoint.blockId === blockId);
}
