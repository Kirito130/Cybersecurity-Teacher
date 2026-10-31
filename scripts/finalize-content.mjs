import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../src/content");
const data = JSON.parse(
  fs.readFileSync(path.join(outDir, "blocks.generated.json"), "utf8"),
);

// Prefer "Chapter" wording in outcomes that mention Block N
for (const block of data.blocks) {
  block.outcome = block.outcome.replace(/\bBlock\b/g, "Chapter");
  block.detailLevel = "full";
}

fs.writeFileSync(
  path.join(outDir, "blocks.ts"),
  `import type { Block } from "./types";

export const blocks: Block[] = ${JSON.stringify(data.blocks, null, 2)};

export function getBlock(id: string) {
  return blocks.find((block) => block.id === id || block.slug === id);
}

export function getBlockBySlug(slug: string) {
  return blocks.find((block) => block.slug === slug || block.id === slug);
}
`,
);

fs.writeFileSync(
  path.join(outDir, "checkpoints.ts"),
  `import type { Checkpoint } from "./types";

export const checkpoints: Checkpoint[] = ${JSON.stringify(data.checkpoints, null, 2)};

export function getCheckpoint(id: string) {
  return checkpoints.find((checkpoint) => checkpoint.id === id);
}

export function getCheckpointByBlock(blockId: string) {
  return checkpoints.find((checkpoint) => checkpoint.blockId === blockId);
}
`,
);

const ids = data.blocks.map((b) => b.id);
const imports = ids
  .map((id) => `import { topics${id} } from "./topics-${id}";`)
  .join("\n");
const spread = ids.map((id) => `...topics${id}`).join(", ");

fs.writeFileSync(
  path.join(outDir, "index.ts"),
  `import { badges, getBadge } from "./badges";
import { blocks, getBlock, getBlockBySlug } from "./blocks";
import {
  checkpoints,
  getCheckpoint,
  getCheckpointByBlock,
} from "./checkpoints";
${imports}
import type { Topic } from "./types";

const topics: Topic[] = [${spread}];

export {
  badges,
  blocks,
  checkpoints,
  getBadge,
  getBlock,
  getBlockBySlug,
  getCheckpoint,
  getCheckpointByBlock,
  topics,
};

export function getTopic(id: string) {
  return topics.find((topic) => topic.id === id || topic.slug === id);
}

export function getTopicsForBlock(blockId: string) {
  return topics.filter((topic) => topic.blockId === blockId);
}

export function getBadgeForBlock(blockId: string) {
  return badges.find((badge) => badge.blockId === blockId);
}
`,
);

// Update badge copy to Chapter
const badgesPath = path.join(outDir, "badges.ts");
let badgesSrc = fs.readFileSync(badgesPath, "utf8");
badgesSrc = badgesSrc
  .replace(/Cleared Block /g, "Cleared Chapter ")
  .replace(/Completed Blocks /g, "Completed Chapters ")
  .replace(/through Block /g, "through Chapter ");
fs.writeFileSync(badgesPath, badgesSrc);

console.log(
  `Finalized ${data.blocks.length} chapters, ${data.checkpoints.length} checkpoints`,
);
