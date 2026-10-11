/**
 * Seeds Phase C content_* tables from TypeScript curriculum.
 *
 * Usage (from web/):
 *   npm run seed:content
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { badges, blocks, checkpoints, topics } from "../src/content";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function parseHours(estimated: string): {
  min: number | null;
  max: number | null;
} {
  const match = estimated.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (!match) return { min: null, max: null };
  return { min: Number(match[1]), max: Number(match[2]) };
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const now = new Date().toISOString();

  const { data: path, error: pathError } = await supabase
    .from("learning_paths")
    .upsert(
      {
        slug: "core-clearance",
        title: "CyberXP Core Clearance Path",
        description:
          "Clearance-style path from orientation through independent assessments.",
        is_default: true,
        sort_order: 0,
        published_at: now,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  if (pathError) throw pathError;

  const blockIdBySlug = new Map<string, string>();

  for (const [index, block] of blocks.entries()) {
    const hours = parseHours(block.estimatedHours);
    const { data, error } = await supabase
      .from("content_blocks")
      .upsert(
        {
          slug: block.id,
          number: block.number,
          title: block.title,
          outcome: block.outcome,
          estimated_hours_min: hours.min,
          estimated_hours_max: hours.max,
          detail_level: block.detailLevel,
          is_specialist: Boolean(block.isSpecialist),
          topic_count: block.topicCount,
          badge_slug: block.badgeId,
          checkpoint_slug: block.checkpointId,
          published_at: now,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (error) throw error;
    blockIdBySlug.set(block.id, data.id as string);

    await supabase.from("path_items").upsert(
      {
        path_id: path.id,
        block_id: data.id,
        sort_order: index,
        is_required: !block.isSpecialist,
      },
      { onConflict: "path_id,block_id" },
    );
  }

  for (const block of blocks) {
    const blockUuid = blockIdBySlug.get(block.id)!;
    for (const prereq of block.prerequisites) {
      const prereqUuid = blockIdBySlug.get(prereq);
      if (!prereqUuid) continue;
      const { error } = await supabase.from("content_block_prereqs").upsert(
        {
          block_id: blockUuid,
          prereq_block_id: prereqUuid,
        },
        { onConflict: "block_id,prereq_block_id" },
      );
      if (error) throw error;
    }
  }

  const topicUuidByExternal = new Map<string, string>();
  for (const [index, topic] of topics.entries()) {
    const blockUuid = blockIdBySlug.get(topic.blockId);
    if (!blockUuid) continue;
    const { data, error } = await supabase
      .from("content_topics")
      .upsert(
        {
          block_id: blockUuid,
          slug: topic.slug,
          external_id: topic.id,
          title: topic.title,
          task: topic.task,
          sort_order: index,
          published_at: now,
        },
        { onConflict: "external_id" },
      )
      .select("id")
      .single();
    if (error) throw error;
    topicUuidByExternal.set(topic.id, data.id as string);

    for (const [subIndex, sub] of topic.subtopics.entries()) {
      const { error: subError } = await supabase
        .from("content_subtopics")
        .upsert(
          {
            topic_id: data.id,
            slug: sub.id.replace(/\./g, "-"),
            external_id: sub.id,
            title: sub.title,
            concepts: sub.concepts,
            reading_label: sub.reading.label,
            reading_url: sub.reading.url,
            video_label: sub.video.label,
            video_url: sub.video.url,
            sort_order: subIndex,
          },
          { onConflict: "external_id" },
        );
      if (subError) throw subError;
    }
  }

  const checkpointUuidBySlug = new Map<string, string>();
  for (const checkpoint of checkpoints) {
    const blockUuid = blockIdBySlug.get(checkpoint.blockId);
    if (!blockUuid) continue;
    const { data, error } = await supabase
      .from("content_checkpoints")
      .upsert(
        {
          block_id: blockUuid,
          slug: checkpoint.id,
          title: checkpoint.title,
          practical_brief: checkpoint.practicalBrief,
          pass_rules: checkpoint.passRules,
          quiz_pass_threshold: 10,
          quiz_max_score: checkpoint.quizQuestions.length * 2,
          practical_pass_threshold: 16,
          practical_max_score: checkpoint.practicalCriteria.length * 5,
          practical_min_criterion: 3,
          published_at: now,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (error) throw error;
    checkpointUuidBySlug.set(checkpoint.id, data.id as string);

    for (const [qIndex, question] of checkpoint.quizQuestions.entries()) {
      const { error: qError } = await supabase
        .from("content_quiz_questions")
        .upsert(
          {
            checkpoint_id: data.id,
            slug: question.id,
            prompt: question.prompt,
            model_answer: question.modelAnswer,
            sort_order: qIndex,
            is_scope_critical: question.id === "q1" || question.id === "q3",
          },
          { onConflict: "checkpoint_id,slug" },
        );
      if (qError) throw qError;
    }

    for (const [cIndex, criterion] of checkpoint.practicalCriteria.entries()) {
      const { error: cError } = await supabase
        .from("content_practical_criteria")
        .upsert(
          {
            checkpoint_id: data.id,
            slug: criterion.id,
            label: criterion.label,
            description: criterion.description,
            max_points: 5,
            sort_order: cIndex,
          },
          { onConflict: "checkpoint_id,slug" },
        );
      if (cError) throw cError;
    }
  }

  const badgeUuidBySlug = new Map<string, string>();
  for (const badge of badges) {
    const blockUuid = badge.blockId
      ? blockIdBySlug.get(badge.blockId) ?? null
      : null;
    const rules =
      badge.kind === "milestone"
        ? {
            requiresBadges:
              badge.id === "badge-foundations"
                ? ["badge-00", "badge-01", "badge-02", "badge-03", "badge-04"]
                : badge.id === "badge-core-web"
                  ? ["badge-08", "badge-09", "badge-10"]
                  : badge.id === "badge-independent"
                    ? ["badge-15"]
                    : [],
          }
        : { requiresCheckpointClearance: true };

    const { data: badgeRow, error } = await supabase
      .from("content_badges")
      .upsert(
        {
          slug: badge.id,
          block_id: blockUuid,
          name: badge.name,
          description: badge.description,
          unlock_condition: badge.unlockCondition,
          kind: badge.kind,
          rules,
          published_at: now,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (error) throw error;
    badgeUuidBySlug.set(badge.id, badgeRow.id as string);
  }

  // Dual-write bridge: attach UUIDs onto existing learner rows when text IDs match
  for (const [externalId, topicUuid] of topicUuidByExternal) {
    await supabase
      .from("topic_progress")
      .update({ topic_uuid: topicUuid })
      .eq("topic_id", externalId)
      .is("topic_uuid", null);
  }
  for (const [slug, checkpointUuid] of checkpointUuidBySlug) {
    await supabase
      .from("checkpoint_attempts")
      .update({ checkpoint_uuid: checkpointUuid })
      .eq("checkpoint_id", slug)
      .is("checkpoint_uuid", null);
    await supabase
      .from("checkpoint_clearance")
      .update({ checkpoint_uuid: checkpointUuid })
      .eq("checkpoint_id", slug)
      .is("checkpoint_uuid", null);
  }
  for (const [slug, blockUuid] of blockIdBySlug) {
    await supabase
      .from("block_progress")
      .update({ block_uuid: blockUuid })
      .eq("block_id", slug)
      .is("block_uuid", null);
  }
  for (const [slug, badgeUuid] of badgeUuidBySlug) {
    await supabase
      .from("earned_badges")
      .update({ badge_uuid: badgeUuid })
      .eq("badge_id", slug)
      .is("badge_uuid", null);
  }

  console.log(
    `Seeded catalog: ${blocks.length} blocks, ${topics.length} topics, ${checkpoints.length} checkpoints, ${badges.length} badges.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
