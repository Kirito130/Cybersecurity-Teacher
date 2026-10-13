import { badges, getBadge } from "./badges";
import { blocks, getBlock, getBlockBySlug } from "./blocks";
import {
  checkpoints,
  getCheckpoint,
  getCheckpointByBlock,
} from "./checkpoints";
import { topics00 } from "./topics-00";
import { topics01 } from "./topics-01";
import { topics02 } from "./topics-02";
import { topics03 } from "./topics-03";
import { topics04 } from "./topics-04";
import { topics05 } from "./topics-05";
import { topics06 } from "./topics-06";
import { topics07 } from "./topics-07";
import { topics08 } from "./topics-08";
import { topics09 } from "./topics-09";
import { topics10 } from "./topics-10";
import { topics11 } from "./topics-11";
import { topics12 } from "./topics-12";
import { topics13 } from "./topics-13";
import { topics14 } from "./topics-14";
import { topics15 } from "./topics-15";
import { topics16 } from "./topics-16";
import { topics17 } from "./topics-17";
import { topics18 } from "./topics-18";
import type { Topic } from "./types";

const topics: Topic[] = [...topics00, ...topics01, ...topics02, ...topics03, ...topics04, ...topics05, ...topics06, ...topics07, ...topics08, ...topics09, ...topics10, ...topics11, ...topics12, ...topics13, ...topics14, ...topics15, ...topics16, ...topics17, ...topics18];

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
