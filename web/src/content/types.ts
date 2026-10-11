export type ResourceLink = {
  label: string;
  url: string;
};

export type Subtopic = {
  id: string;
  title: string;
  concepts: string;
  reading: ResourceLink;
  video: ResourceLink;
};

export type Topic = {
  id: string;
  blockId: string;
  slug: string;
  title: string;
  subtopics: Subtopic[];
  task: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  modelAnswer: string;
};

export type PracticalCriterion = {
  id: string;
  label: string;
  description: string;
};

export type Checkpoint = {
  id: string;
  blockId: string;
  title: string;
  quizQuestions: QuizQuestion[];
  practicalCriteria: PracticalCriterion[];
  practicalBrief: string;
  passRules: string;
};

export type BadgeDefinition = {
  id: string;
  blockId: string | null;
  name: string;
  description: string;
  unlockCondition: string;
  kind: "block" | "milestone";
};

export type Block = {
  id: string;
  slug: string;
  number: string;
  title: string;
  outcome: string;
  estimatedHours: string;
  prerequisites: string[];
  topicIds: string[];
  checkpointId: string | null;
  badgeId: string;
  detailLevel: "full" | "stub";
  topicCount: number;
  isSpecialist?: boolean;
};
