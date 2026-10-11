import { badges, getBadge } from "./badges";
import { blocks, getBlock, getBlockBySlug } from "./blocks";
import {
  checkpoints,
  getCheckpoint,
  getCheckpointByBlock,
} from "./checkpoints";
import { topics00 } from "./topics-00";
import type { Topic } from "./types";

const topics: Topic[] = [...topics00];

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
