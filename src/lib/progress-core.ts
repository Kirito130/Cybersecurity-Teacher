import { blocks, getTopicsForBlock } from "@/content";

export type ProgressState = {
  completedTopics: string[];
  quizPassed: string[];
  practicalPassed: string[];
  earnedBadges: string[];
  quizScores: Record<string, number>;
  practicalScores: Record<string, number>;
};

export function emptyProgress(): ProgressState {
  return {
    completedTopics: [],
    quizPassed: [],
    practicalPassed: [],
    earnedBadges: [],
    quizScores: {},
    practicalScores: {},
  };
}

export function isTopicComplete(state: ProgressState, topicId: string) {
  return state.completedTopics.includes(topicId);
}

export function isCheckpointCleared(state: ProgressState, blockId: string) {
  const checkpointId = `checkpoint-${blockId}`;
  return (
    state.quizPassed.includes(checkpointId) &&
    state.practicalPassed.includes(checkpointId)
  );
}

export function isBlockUnlocked(state: ProgressState, blockId: string) {
  const block = blocks.find((item) => item.id === blockId);
  if (!block) return false;
  if (block.prerequisites.length === 0) return true;
  return block.prerequisites.every((prereq) =>
    isCheckpointCleared(state, prereq),
  );
}

export function blockProgress(state: ProgressState, blockId: string) {
  const topics = getTopicsForBlock(blockId);
  if (topics.length === 0) {
    return {
      completed: 0,
      total: 0,
      percent: isCheckpointCleared(state, blockId) ? 100 : 0,
    };
  }
  const completed = topics.filter((topic) =>
    isTopicComplete(state, topic.id),
  ).length;
  const checkpointBonus = isCheckpointCleared(state, blockId) ? 1 : 0;
  const total = topics.length + 1;
  const done = completed + checkpointBonus;
  return {
    completed: done,
    total,
    percent: Math.round((done / total) * 100),
  };
}

export function toggleTopicComplete(state: ProgressState, topicId: string) {
  const next = { ...state, completedTopics: [...state.completedTopics] };
  const index = next.completedTopics.indexOf(topicId);
  if (index >= 0) next.completedTopics.splice(index, 1);
  else next.completedTopics.push(topicId);
  return next;
}

export function applyCheckpointResult(
  state: ProgressState,
  checkpointId: string,
  kind: "quiz" | "practical",
  score: number,
  passed: boolean,
): ProgressState {
  const next: ProgressState = {
    ...state,
    quizPassed: [...state.quizPassed],
    practicalPassed: [...state.practicalPassed],
    earnedBadges: [...state.earnedBadges],
    quizScores: { ...state.quizScores },
    practicalScores: { ...state.practicalScores },
  };

  if (kind === "quiz") {
    next.quizScores[checkpointId] = score;
    if (passed && !next.quizPassed.includes(checkpointId)) {
      next.quizPassed.push(checkpointId);
    }
  } else {
    next.practicalScores[checkpointId] = score;
    if (passed && !next.practicalPassed.includes(checkpointId)) {
      next.practicalPassed.push(checkpointId);
    }
  }

  const blockId = checkpointId.replace("checkpoint-", "");
  const badgeId = `badge-${blockId}`;
  if (
    next.quizPassed.includes(checkpointId) &&
    next.practicalPassed.includes(checkpointId) &&
    !next.earnedBadges.includes(badgeId)
  ) {
    next.earnedBadges.push(badgeId);
  }

  if (
    ["00", "01", "02", "03", "04"].every((id) =>
      next.earnedBadges.includes(`badge-${id}`),
    ) &&
    !next.earnedBadges.includes("badge-foundations")
  ) {
    next.earnedBadges.push("badge-foundations");
  }

  if (
    ["08", "09", "10"].every((id) =>
      next.earnedBadges.includes(`badge-${id}`),
    ) &&
    !next.earnedBadges.includes("badge-core-web")
  ) {
    next.earnedBadges.push("badge-core-web");
  }

  if (
    next.earnedBadges.includes("badge-15") &&
    !next.earnedBadges.includes("badge-independent")
  ) {
    next.earnedBadges.push("badge-independent");
  }

  return next;
}

export function mergeProgress(
  primary: ProgressState,
  secondary: ProgressState,
): ProgressState {
  const quizScores = { ...secondary.quizScores, ...primary.quizScores };
  const practicalScores = {
    ...secondary.practicalScores,
    ...primary.practicalScores,
  };
  return {
    completedTopics: Array.from(
      new Set([...secondary.completedTopics, ...primary.completedTopics]),
    ),
    quizPassed: Array.from(
      new Set([...secondary.quizPassed, ...primary.quizPassed]),
    ),
    practicalPassed: Array.from(
      new Set([...secondary.practicalPassed, ...primary.practicalPassed]),
    ),
    earnedBadges: Array.from(
      new Set([...secondary.earnedBadges, ...primary.earnedBadges]),
    ),
    quizScores,
    practicalScores,
  };
}
