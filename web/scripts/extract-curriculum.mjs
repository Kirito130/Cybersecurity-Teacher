/**
 * Parse Ethical_Hacking_Penetration_Testing_Roadmap.md into typed content modules.
 * Run: node scripts/extract-curriculum.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const mdPath = path.join(root, "Ethical_Hacking_Penetration_Testing_Roadmap.md");
const outDir = path.join(__dirname, "../src/content");

const text = fs.readFileSync(mdPath, "utf8");

const links = Object.fromEntries(
  [...text.matchAll(/^\[([^\]]+)\]:\s+(\S+)/gm)].map((m) => [m[1], m[2]]),
);

function resolveLink(label) {
  // markdown: [Label][REF] or [Label](url)
  const ref = label.match(/^\[([^\]]+)\]\[([^\]]+)\]$/);
  if (ref) {
    return { label: ref[1], url: links[ref[2]] ?? "#" };
  }
  const inline = label.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (inline) return { label: inline[1], url: inline[2] };
  // bare [Label][REF] already captured
  const bare = label.match(/^(.+)$/);
  return { label: bare?.[1] ?? label, url: "#" };
}

function parseResourceCell(cell) {
  const m = cell.trim().match(/\[([^\]]+)\]\[([^\]]+)\]/);
  if (!m) return { label: cell.trim(), url: "#" };
  return { label: m[1], url: links[m[2]] ?? "#" };
}

function esc(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function parseSubtopicRow(line) {
  // | 02.1.1 Devices → ... | [reading][REF] | [video][REF] |
  const parts = line
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 3) return null;
  const [left, readingCell, videoCell] = parts;
  const idMatch = left.match(/^(\d+\.\d+\.\d+)\s+([^→]+?)(?:\s*→\s*(.*))?$/);
  if (!idMatch) return null;
  return {
    id: idMatch[1],
    title: idMatch[2].trim(),
    concepts: (idMatch[3] ?? "").trim(),
    reading: parseResourceCell(readingCell),
    video: parseResourceCell(videoCell),
  };
}

const blockRe =
  /^## Block (\d+)\s+[—-]\s+(.+)$/gm;
const blocksMeta = [];
let m;
while ((m = blockRe.exec(text))) {
  blocksMeta.push({ id: m[1], title: m[2].trim(), start: m.index });
}

const effortTable = {};
for (const row of text.matchAll(
  /^\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/gm,
)) {
  effortTable[row[1].padStart(2, "0")] = {
    destination: row[2].trim(),
    hours: row[3].trim(),
    required: row[4].trim(),
  };
}

function sliceBlock(id) {
  const idx = blocksMeta.findIndex((b) => b.id === id);
  if (idx < 0) return "";
  const start = blocksMeta[idx].start;
  const end =
    idx + 1 < blocksMeta.length
      ? blocksMeta[idx + 1].start
      : text.indexOf("## Certification");
  return text.slice(start, end > start ? end : undefined);
}

function parseBlock(id) {
  const section = sliceBlock(id);
  const titleMatch = section.match(/^## Block \d+\s+[—-]\s+(.+)$/m);
  const outcomeMatch = section.match(/\*\*Outcome:\*\*\s*(.+)/);
  const topics = [];
  const topicRe = /^### (\d+\.\d+)\s+[—-]\s+(.+)$/gm;
  const topicHeads = [...section.matchAll(topicRe)];
  for (let i = 0; i < topicHeads.length; i++) {
    const head = topicHeads[i];
    const topicId = head[1];
    const topicTitle = head[2].trim();
    const start = head.index + head[0].length;
    const end =
      i + 1 < topicHeads.length ? topicHeads[i + 1].index : section.length;
    const body = section.slice(start, end);
    if (body.includes("### Checkpoint")) {
      // trim at checkpoint if somehow included
    }
    const checkpointCut = body.search(/^### Checkpoint/m);
    const topicBody =
      checkpointCut >= 0 ? body.slice(0, checkpointCut) : body;
    const subtopics = [];
    for (const line of topicBody.split("\n")) {
      if (!line.trim().startsWith("|")) continue;
      if (line.includes("---") || line.includes("Subtopic")) continue;
      const sub = parseSubtopicRow(line);
      if (sub) subtopics.push(sub);
    }
    const taskMatch = topicBody.match(
      /\*\*Topic task:\*\*\s*([\s\S]*?)(?=\n### |\n## |\n\*\*|$)/,
    );
    topics.push({
      id: topicId,
      blockId: id,
      slug: topicId.replace(".", "-"),
      title: topicTitle,
      subtopics,
      task: (taskMatch?.[1] ?? "").trim().replace(/\n+/g, " "),
    });
  }

  // checkpoint
  const ckMatch = section.match(
    /### Checkpoint (\d+)\s+[—-]\s+(.+)\n([\s\S]*?)(?=\n---|\n## |$)/,
  );
  let checkpoint = null;
  if (ckMatch) {
    const ckBody = ckMatch[3];
    const questions = [];
    const qBlock = ckBody.match(
      /\*\*Original quiz:\*\*\s*\n([\s\S]*?)<details/,
    );
    if (qBlock) {
      const qLines = [...qBlock[1].matchAll(/^\d+\.\s+(.+)$/gm)].map(
        (x) => x[1].trim(),
      );
      const answers = [
        ...(ckBody.match(/<details>[\s\S]*?<\/details>/)?.[0] ?? "").matchAll(
          /^\d+\.\s+([\s\S]*?)(?=^\d+\.|^<\/details>)/gm,
        ),
      ].map((x) => x[1].trim().replace(/\n+/g, " "));
      qLines.forEach((prompt, i) => {
        questions.push({
          id: `q${i + 1}`,
          prompt,
          modelAnswer: answers[i] ?? "",
        });
      });
    }
    const practicalMatch = ckBody.match(
      /\*\*Practical gate:\*\*\s*([\s\S]*?)(?=\n---|\n## |$)/,
    );
    const practicalBrief = (practicalMatch?.[1] ?? "").trim().replace(/\n+/g, " ");
    const scoreMatch = practicalBrief.match(/Score:\s*\*\*(.+?)\*\*/i);
    const criteriaLabels = scoreMatch
      ? scoreMatch[1].split("/").map((s) => s.trim())
      : ["Criterion 1", "Criterion 2", "Criterion 3", "Criterion 4"];
    const practicalCriteria = criteriaLabels.slice(0, 4).map((label, i) => ({
      id: `c${i + 1}`,
      label: label.charAt(0).toUpperCase() + label.slice(1),
      description: `${label} — from the curriculum practical gate.`,
    }));
    // critical questions: isolation/scope keywords
    const criticalQuestionIds = questions
      .filter((q) =>
        /authoriz|scope|isolat|NAT|boundary|permission|consent/i.test(
          q.prompt + " " + q.modelAnswer,
        ),
      )
      .map((q) => q.id);
    if (criticalQuestionIds.length === 0 && questions[0]) {
      criticalQuestionIds.push("q1");
    }
    checkpoint = {
      id: `checkpoint-${id}`,
      blockId: id,
      title: `Checkpoint ${ckMatch[1]} — ${ckMatch[2].trim()}`,
      criticalQuestionIds,
      quizQuestions: questions,
      practicalCriteria,
      practicalBrief,
      passRules:
        "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3.",
    };
  }

  const hours = effortTable[id]?.hours ?? "—";
  const prereqRaw = effortTable[id]?.required ?? "None";
  let prerequisites = [];
  if (/Gate\s+(\d+)/i.test(prereqRaw)) {
    const gates = [...prereqRaw.matchAll(/Gate[s]?\s+(\d+)/gi)].flatMap((x) =>
      x[0].includes("and")
        ? []
        : [x[1].padStart(2, "0")],
    );
    // better parse
    prerequisites = [...prereqRaw.matchAll(/(\d{1,2})/g)].map((x) =>
      x[1].padStart(2, "0"),
    );
    if (/None/i.test(prereqRaw)) prerequisites = [];
  }
  // specialist prereqs like "Gates 10 and 14"
  if (/Gates?\s+/i.test(prereqRaw)) {
    prerequisites = [...prereqRaw.matchAll(/(\d{1,2})/g)].map((x) =>
      x[1].padStart(2, "0"),
    );
  }
  if (/^None$/i.test(prereqRaw.trim())) prerequisites = [];

  return {
    block: {
      id,
      slug: id,
      number: id,
      title: titleMatch?.[1]?.trim() ?? id,
      outcome: outcomeMatch?.[1]?.trim() ?? "",
      estimatedHours: hours,
      prerequisites,
      topicIds: topics.map((t) => t.id),
      checkpointId: checkpoint?.id ?? null,
      badgeId: `badge-${id}`,
      detailLevel: "full",
      topicCount: topics.length,
      isSpecialist: Number(id) >= 16,
    },
    topics,
    checkpoint,
  };
}

const allIds = blocksMeta.map((b) => b.id.padStart(2, "0"));
// fix ids - block headers use 00, 01 without pad sometimes
const normalizedIds = blocksMeta.map((b) =>
  b.id.length === 1 ? b.id.padStart(2, "0") : b.id,
);

const parsed = {};
for (const meta of blocksMeta) {
  const id = meta.id.padStart(2, "0");
  // re-find with original
  parsed[id] = parseBlock(meta.id.length === 1 ? meta.id.padStart(2, "0") : meta.id);
}

// Fix parseBlock to use the actual header id as in file
function parseBlockFixed(rawId) {
  const id = rawId.padStart(2, "0");
  const section = (() => {
    const idx = blocksMeta.findIndex((b) => b.id === rawId || b.id.padStart(2, "0") === id);
    if (idx < 0) return "";
    const start = blocksMeta[idx].start;
    const end =
      idx + 1 < blocksMeta.length
        ? blocksMeta[idx + 1].start
        : text.search(/^## Certification/m);
    return text.slice(start, end > start ? end : undefined);
  })();

  const titleMatch = section.match(/^## Block \d+\s+[—-]\s+(.+)$/m);
  const outcomeMatch = section.match(/\*\*Outcome:\*\*\s*(.+)/);
  const topics = [];
  const topicHeads = [...section.matchAll(/^### (\d+\.\d+)\s+[—-]\s+(.+)$/gm)];
  for (let i = 0; i < topicHeads.length; i++) {
    const head = topicHeads[i];
    const topicId = head[1];
    const topicTitle = head[2].trim();
    const start = head.index + head[0].length;
    const end =
      i + 1 < topicHeads.length ? topicHeads[i + 1].index : section.length;
    let topicBody = section.slice(start, end);
    const ckCut = topicBody.search(/^### Checkpoint/m);
    if (ckCut >= 0) topicBody = topicBody.slice(0, ckCut);
    const subtopics = [];
    for (const line of topicBody.split("\n")) {
      if (!line.trim().startsWith("|")) continue;
      if (line.includes("---") || /Subtopic/i.test(line)) continue;
      const sub = parseSubtopicRow(line);
      if (sub) subtopics.push(sub);
    }
    const taskMatch = topicBody.match(/\*\*Topic task:\*\*\s*([\s\S]+)/);
    let task = "";
    if (taskMatch) {
      task = taskMatch[1]
        .split("\n")
        .filter((l) => !l.startsWith("###") && !l.startsWith("##"))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
    }
    topics.push({
      id: topicId,
      blockId: id,
      slug: topicId.replace(".", "-"),
      title: topicTitle,
      subtopics,
      task,
    });
  }

  const ckMatch = section.match(
    /### Checkpoint (\d+)\s+[\u2014\u2013\-]\s+(.+)\r?\n([\s\S]*)/,
  );
  let checkpoint = null;
  if (ckMatch) {
    const ckBody = ckMatch[3];
    const beforeDetails = ckBody.split("<details")[0];
    const qLines = [...beforeDetails.matchAll(/^\d+\.\s+(.+)$/gm)].map((x) =>
      x[1].trim(),
    );
    const details = ckBody.match(/<details[\s\S]*?<\/details>/)?.[0] ?? "";
    const answers = [...details.matchAll(/^\d+\.\s+(.+)$/gm)].map((x) =>
      x[1].trim(),
    );
    const questions = qLines.map((prompt, i) => ({
      id: `q${i + 1}`,
      prompt,
      modelAnswer: answers[i] ?? "",
    }));
    const practicalMatch = ckBody.match(
      /\*\*Practical gate:\*\*\s*([\s\S]*?)(?=\n---|\n## |$)/,
    );
    const practicalBrief = (practicalMatch?.[1] ?? "")
      .trim()
      .replace(/\s+/g, " ");
    const scoreMatch = practicalBrief.match(/Score:\s*\*\*(.+?)\*\*/i);
    const criteriaLabels = scoreMatch
      ? scoreMatch[1].split("/").map((s) => s.trim())
      : [
          "Criterion A",
          "Criterion B",
          "Criterion C",
          "Criterion D",
        ];
    const practicalCriteria = criteriaLabels.slice(0, 4).map((label, i) => ({
      id: `c${i + 1}`,
      label: label.replace(/^./, (c) => c.toUpperCase()),
      description: `Assessed as: ${label}.`,
    }));
    while (practicalCriteria.length < 4) {
      practicalCriteria.push({
        id: `c${practicalCriteria.length + 1}`,
        label: `Criterion ${practicalCriteria.length + 1}`,
        description: "Curriculum practical criterion.",
      });
    }
    const criticalQuestionIds = questions
      .filter((q) =>
        /authoriz|scope|isolat|\bNAT\b|boundary|permission|consent|written/i.test(
          `${q.prompt} ${q.modelAnswer}`,
        ),
      )
      .map((q) => q.id);
    if (!criticalQuestionIds.length && questions.length) {
      criticalQuestionIds.push(questions[0].id);
    }
    checkpoint = {
      id: `checkpoint-${id}`,
      blockId: id,
      title: `Checkpoint ${ckMatch[1].padStart(2, "0")} — ${ckMatch[2].trim()}`,
      criticalQuestionIds,
      quizQuestions: questions,
      practicalCriteria,
      practicalBrief,
      passRules:
        "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3.",
    };
  }

  const hours = effortTable[id]?.hours ?? "—";
  const prereqRaw = effortTable[id]?.required ?? "None";
  let prerequisites = [];
  if (!/^None$/i.test(prereqRaw.trim())) {
    prerequisites = [...prereqRaw.matchAll(/(\d{1,2})/g)].map((x) =>
      x[1].padStart(2, "0"),
    );
  }

  return {
    block: {
      id,
      slug: id,
      number: id,
      title: titleMatch?.[1]?.trim() ?? id,
      outcome: outcomeMatch?.[1]?.trim() ?? "",
      estimatedHours: hours,
      prerequisites,
      topicIds: topics.map((t) => t.id),
      checkpointId: checkpoint?.id ?? null,
      badgeId: `badge-${id}`,
      detailLevel: "full",
      topicCount: topics.length,
      isSpecialist: Number(id) >= 16,
    },
    topics,
    checkpoint,
  };
}

const results = blocksMeta.map((b) => parseBlockFixed(b.id));

// Write topics files
const allTopics = [];
const allCheckpoints = [];
const allBlocks = [];

for (const r of results) {
  allBlocks.push(r.block);
  allTopics.push(...r.topics);
  if (r.checkpoint) allCheckpoints.push(r.checkpoint);
  const topicsFile = `topics-${r.block.id}.ts`;
  const body = `import type { Topic } from "./types";

export const topics${r.block.id}: Topic[] = ${JSON.stringify(r.topics, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, topicsFile), body, "utf8");
  console.log(
    `Wrote ${topicsFile}: ${r.topics.length} topics, ${r.topics.reduce((n, t) => n + t.subtopics.length, 0)} subtopics, checkpoint=${!!r.checkpoint}`,
  );
}

fs.writeFileSync(
  path.join(outDir, "blocks.generated.json"),
  JSON.stringify({ blocks: allBlocks, checkpoints: allCheckpoints }, null, 2),
  "utf8",
);

console.log(
  `\nSummary: ${allBlocks.length} chapters, ${allTopics.length} topics, ${allCheckpoints.length} checkpoints`,
);
console.log(
  "Missing subtopics:",
  allTopics.filter((t) => t.subtopics.length === 0).map((t) => t.id),
);
console.log(
  "Empty tasks:",
  allTopics.filter((t) => !t.task).map((t) => t.id),
);
console.log(
  "Checkpoints missing answers:",
  allCheckpoints
    .filter((c) => c.quizQuestions.some((q) => !q.modelAnswer))
    .map((c) => c.id),
);
