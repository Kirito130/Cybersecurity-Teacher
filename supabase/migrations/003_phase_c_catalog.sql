-- CyberXP Phase C — content catalog (CMS-ready)
-- Curriculum remains seedable from TypeScript; published_at gates learner reads.

-- ---------------------------------------------------------------------------
-- learning_paths / path_items
-- ---------------------------------------------------------------------------

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists learning_paths_set_updated_at on public.learning_paths;
create trigger learning_paths_set_updated_at
  before update on public.learning_paths
  for each row execute function public.set_updated_at();

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number text not null,
  title text not null,
  outcome text not null default '',
  estimated_hours_min integer,
  estimated_hours_max integer,
  detail_level text not null default 'stub'
    check (detail_level in ('full', 'stub')),
  is_specialist boolean not null default false,
  topic_count integer not null default 0 check (topic_count >= 0),
  badge_slug text,
  checkpoint_slug text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists content_blocks_set_updated_at on public.content_blocks;
create trigger content_blocks_set_updated_at
  before update on public.content_blocks
  for each row execute function public.set_updated_at();

create table if not exists public.path_items (
  id uuid primary key default gen_random_uuid(),
  path_id uuid not null references public.learning_paths (id) on delete cascade,
  block_id uuid not null references public.content_blocks (id) on delete cascade,
  sort_order integer not null default 0,
  is_required boolean not null default true,
  unique (path_id, block_id)
);

create table if not exists public.content_block_prereqs (
  block_id uuid not null references public.content_blocks (id) on delete cascade,
  prereq_block_id uuid not null references public.content_blocks (id) on delete cascade,
  primary key (block_id, prereq_block_id),
  check (block_id <> prereq_block_id)
);

create table if not exists public.content_topics (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null references public.content_blocks (id) on delete cascade,
  slug text not null,
  external_id text not null unique,
  title text not null,
  task text not null default '',
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (block_id, slug)
);

drop trigger if exists content_topics_set_updated_at on public.content_topics;
create trigger content_topics_set_updated_at
  before update on public.content_topics
  for each row execute function public.set_updated_at();

create table if not exists public.content_subtopics (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.content_topics (id) on delete cascade,
  slug text not null,
  external_id text not null unique,
  title text not null,
  concepts text not null default '',
  reading_label text,
  reading_url text,
  video_label text,
  video_url text,
  sort_order integer not null default 0,
  unique (topic_id, slug)
);

create table if not exists public.content_checkpoints (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null unique references public.content_blocks (id) on delete cascade,
  slug text not null unique,
  title text not null,
  practical_brief text not null default '',
  pass_rules text not null default '',
  quiz_pass_threshold integer not null default 10,
  quiz_max_score integer not null default 12,
  practical_pass_threshold integer not null default 16,
  practical_max_score integer not null default 20,
  practical_min_criterion integer not null default 3,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists content_checkpoints_set_updated_at on public.content_checkpoints;
create trigger content_checkpoints_set_updated_at
  before update on public.content_checkpoints
  for each row execute function public.set_updated_at();

create table if not exists public.content_quiz_questions (
  id uuid primary key default gen_random_uuid(),
  checkpoint_id uuid not null references public.content_checkpoints (id) on delete cascade,
  slug text not null,
  prompt text not null,
  model_answer text not null,
  sort_order integer not null default 0,
  is_scope_critical boolean not null default false,
  unique (checkpoint_id, slug)
);

create table if not exists public.content_practical_criteria (
  id uuid primary key default gen_random_uuid(),
  checkpoint_id uuid not null references public.content_checkpoints (id) on delete cascade,
  slug text not null,
  label text not null,
  description text not null default '',
  max_points integer not null default 5 check (max_points > 0),
  sort_order integer not null default 0,
  unique (checkpoint_id, slug)
);

create table if not exists public.content_badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  block_id uuid references public.content_blocks (id) on delete set null,
  name text not null,
  description text not null default '',
  unlock_condition text not null default '',
  kind text not null check (kind in ('block', 'milestone')),
  rules jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists content_badges_set_updated_at on public.content_badges;
create trigger content_badges_set_updated_at
  before update on public.content_badges
  for each row execute function public.set_updated_at();

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  version text not null,
  snapshot jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique (entity_type, entity_id, version)
);

-- Dual-write bridge columns on learner tables (text IDs remain source of truth until cutover)
alter table public.topic_progress add column if not exists topic_uuid uuid
  references public.content_topics (id) on delete set null;
alter table public.checkpoint_attempts add column if not exists checkpoint_uuid uuid
  references public.content_checkpoints (id) on delete set null;
alter table public.checkpoint_clearance add column if not exists checkpoint_uuid uuid
  references public.content_checkpoints (id) on delete set null;
alter table public.earned_badges add column if not exists badge_uuid uuid
  references public.content_badges (id) on delete set null;
alter table public.block_progress add column if not exists block_uuid uuid
  references public.content_blocks (id) on delete set null;

-- ---------------------------------------------------------------------------
-- RLS: published catalog readable; model answers never exposed to clients
-- ---------------------------------------------------------------------------

alter table public.learning_paths enable row level security;
alter table public.path_items enable row level security;
alter table public.content_blocks enable row level security;
alter table public.content_block_prereqs enable row level security;
alter table public.content_topics enable row level security;
alter table public.content_subtopics enable row level security;
alter table public.content_checkpoints enable row level security;
alter table public.content_quiz_questions enable row level security;
alter table public.content_practical_criteria enable row level security;
alter table public.content_badges enable row level security;
alter table public.content_revisions enable row level security;

revoke all on public.learning_paths from anon, authenticated;
revoke all on public.path_items from anon, authenticated;
revoke all on public.content_blocks from anon, authenticated;
revoke all on public.content_block_prereqs from anon, authenticated;
revoke all on public.content_topics from anon, authenticated;
revoke all on public.content_subtopics from anon, authenticated;
revoke all on public.content_checkpoints from anon, authenticated;
revoke all on public.content_quiz_questions from anon, authenticated;
revoke all on public.content_practical_criteria from anon, authenticated;
revoke all on public.content_badges from anon, authenticated;
revoke all on public.content_revisions from anon, authenticated;

grant select on public.learning_paths to anon, authenticated;
grant select on public.path_items to anon, authenticated;
grant select on public.content_blocks to anon, authenticated;
grant select on public.content_block_prereqs to anon, authenticated;
grant select on public.content_topics to anon, authenticated;
grant select on public.content_subtopics to anon, authenticated;
grant select on public.content_checkpoints to anon, authenticated;
grant select on public.content_practical_criteria to anon, authenticated;
grant select on public.content_badges to anon, authenticated;
-- content_quiz_questions: no SELECT grant — prompts served via API; answers server-only
-- content_revisions: no client SELECT

drop policy if exists "learning_paths_select_published" on public.learning_paths;
drop policy if exists "path_items_select_published" on public.path_items;
drop policy if exists "content_blocks_select_published" on public.content_blocks;
drop policy if exists "content_block_prereqs_select" on public.content_block_prereqs;
drop policy if exists "content_topics_select_published" on public.content_topics;
drop policy if exists "content_subtopics_select_published" on public.content_subtopics;
drop policy if exists "content_checkpoints_select_published" on public.content_checkpoints;
drop policy if exists "content_practical_criteria_select_published" on public.content_practical_criteria;
drop policy if exists "content_badges_select_published" on public.content_badges;

create policy "learning_paths_select_published"
  on public.learning_paths for select
  to anon, authenticated
  using (published_at is not null);

create policy "content_blocks_select_published"
  on public.content_blocks for select
  to anon, authenticated
  using (published_at is not null);

create policy "path_items_select_published"
  on public.path_items for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.learning_paths p
      where p.id = path_id and p.published_at is not null
    )
  );

create policy "content_block_prereqs_select"
  on public.content_block_prereqs for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.content_blocks b
      where b.id = block_id and b.published_at is not null
    )
  );

create policy "content_topics_select_published"
  on public.content_topics for select
  to anon, authenticated
  using (published_at is not null);

create policy "content_subtopics_select_published"
  on public.content_subtopics for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.content_topics t
      where t.id = topic_id and t.published_at is not null
    )
  );

create policy "content_checkpoints_select_published"
  on public.content_checkpoints for select
  to anon, authenticated
  using (published_at is not null);

create policy "content_practical_criteria_select_published"
  on public.content_practical_criteria for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.content_checkpoints c
      where c.id = checkpoint_id and c.published_at is not null
    )
  );

create policy "content_badges_select_published"
  on public.content_badges for select
  to anon, authenticated
  using (published_at is not null);
