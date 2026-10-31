-- CyberXP Phase A — foundations
-- Safe to re-run: uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS where possible.
-- Apply after (or instead of) the original schema.sql baseline.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists timezone text;
alter table public.profiles add column if not exists learning_goal text;
alter table public.profiles add column if not exists preferences jsonb not null default '{}'::jsonb;
alter table public.profiles add column if not exists role text not null default 'learner';
alter table public.profiles add column if not exists last_seen_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('learner', 'admin'));
  end if;
end $$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- topic_progress (surrogate PK for Phase C enrollment scoping)
-- ---------------------------------------------------------------------------

create table if not exists public.topic_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

alter table public.topic_progress add column if not exists id uuid;
alter table public.topic_progress add column if not exists status text;
alter table public.topic_progress add column if not exists started_at timestamptz;
alter table public.topic_progress add column if not exists source text;
alter table public.topic_progress add column if not exists enrollment_id uuid;
alter table public.topic_progress add column if not exists created_at timestamptz;
alter table public.topic_progress add column if not exists updated_at timestamptz;

update public.topic_progress
set
  id = coalesce(id, gen_random_uuid()),
  status = coalesce(status, 'completed'),
  source = coalesce(source, 'manual'),
  created_at = coalesce(created_at, completed_at, now()),
  updated_at = coalesce(updated_at, completed_at, now()),
  started_at = coalesce(started_at, completed_at),
  completed_at = case
    when coalesce(status, 'completed') = 'completed' then coalesce(completed_at, now())
    else completed_at
  end
where id is null
   or status is null
   or source is null
   or created_at is null
   or updated_at is null;

alter table public.topic_progress alter column id set default gen_random_uuid();
alter table public.topic_progress alter column id set not null;
alter table public.topic_progress alter column status set default 'completed';
alter table public.topic_progress alter column status set not null;
alter table public.topic_progress alter column source set default 'manual';
alter table public.topic_progress alter column source set not null;
alter table public.topic_progress alter column created_at set default now();
alter table public.topic_progress alter column created_at set not null;
alter table public.topic_progress alter column updated_at set default now();
alter table public.topic_progress alter column updated_at set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'topic_progress_status_check'
  ) then
    alter table public.topic_progress
      add constraint topic_progress_status_check
      check (status in ('not_started', 'in_progress', 'completed'));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'topic_progress_source_check'
  ) then
    alter table public.topic_progress
      add constraint topic_progress_source_check
      check (source in ('manual', 'local_migration', 'import', 'system'));
  end if;
end $$;

do $$
declare
  pk_cols text;
begin
  select string_agg(a.attname, ',' order by array_position(c.conkey, a.attnum))
  into pk_cols
  from pg_constraint c
  join pg_class t on t.oid = c.conrelid
  join pg_namespace n on n.oid = t.relnamespace
  join pg_attribute a on a.attrelid = t.oid and a.attnum = any (c.conkey)
  where n.nspname = 'public'
    and t.relname = 'topic_progress'
    and c.contype = 'p';

  if pk_cols is distinct from 'id' then
    alter table public.topic_progress drop constraint if exists topic_progress_pkey;
    alter table public.topic_progress add primary key (id);
  end if;
end $$;

create unique index if not exists topic_progress_user_topic_enrollment_uidx
  on public.topic_progress (user_id, topic_id, enrollment_id) nulls not distinct;

drop trigger if exists topic_progress_set_updated_at on public.topic_progress;
create trigger topic_progress_set_updated_at
  before update on public.topic_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- checkpoint_attempts (append-only history)
-- ---------------------------------------------------------------------------

create table if not exists public.checkpoint_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  checkpoint_id text not null,
  kind text not null check (kind in ('quiz', 'practical')),
  score integer not null check (score >= 0),
  passed boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.checkpoint_attempts add column if not exists attempt_number integer;
alter table public.checkpoint_attempts add column if not exists max_score integer;
alter table public.checkpoint_attempts add column if not exists pass_threshold integer;
alter table public.checkpoint_attempts add column if not exists content_version text;
alter table public.checkpoint_attempts add column if not exists enrollment_id uuid;

-- Backfill attempt_number for legacy rows
with numbered as (
  select
    id,
    row_number() over (
      partition by user_id, checkpoint_id, kind, enrollment_id
      order by created_at asc, id asc
    ) as rn
  from public.checkpoint_attempts
  where attempt_number is null
)
update public.checkpoint_attempts a
set attempt_number = numbered.rn
from numbered
where a.id = numbered.id;

update public.checkpoint_attempts
set
  max_score = coalesce(
    max_score,
    case when kind = 'quiz' then 12 else 20 end
  ),
  pass_threshold = coalesce(
    pass_threshold,
    case when kind = 'quiz' then 10 else 16 end
  )
where max_score is null or pass_threshold is null;

alter table public.checkpoint_attempts alter column attempt_number set not null;
alter table public.checkpoint_attempts alter column max_score set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'checkpoint_attempts_max_score_check'
  ) then
    alter table public.checkpoint_attempts
      add constraint checkpoint_attempts_max_score_check
      check (max_score >= 0);
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'checkpoint_attempts_attempt_number_check'
  ) then
    alter table public.checkpoint_attempts
      add constraint checkpoint_attempts_attempt_number_check
      check (attempt_number >= 1);
  end if;
end $$;

create unique index if not exists checkpoint_attempts_user_ckpt_kind_num_enrollment_uidx
  on public.checkpoint_attempts (
    user_id, checkpoint_id, kind, attempt_number, enrollment_id
  ) nulls not distinct;

create index if not exists checkpoint_attempts_user_created_idx
  on public.checkpoint_attempts (user_id, created_at desc);

create index if not exists checkpoint_attempts_user_checkpoint_idx
  on public.checkpoint_attempts (user_id, checkpoint_id, kind, created_at desc);

create index if not exists checkpoint_attempts_passed_idx
  on public.checkpoint_attempts (user_id, checkpoint_id, kind)
  where passed = true;

-- ---------------------------------------------------------------------------
-- checkpoint_clearance (summary / unlock source of truth)
-- ---------------------------------------------------------------------------

create table if not exists public.checkpoint_clearance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  checkpoint_id text not null,
  kind text not null check (kind in ('quiz', 'practical')),
  best_score integer not null check (best_score >= 0),
  max_score integer not null check (max_score >= 0),
  passed boolean not null default false,
  passed_at timestamptz,
  best_attempt_id uuid references public.checkpoint_attempts (id) on delete set null,
  attempt_count integer not null default 0 check (attempt_count >= 0),
  enrollment_id uuid,
  updated_at timestamptz not null default now()
);

create unique index if not exists checkpoint_clearance_user_ckpt_kind_enrollment_uidx
  on public.checkpoint_clearance (user_id, checkpoint_id, kind, enrollment_id)
  nulls not distinct;

create index if not exists checkpoint_clearance_user_idx
  on public.checkpoint_clearance (user_id);

drop trigger if exists checkpoint_clearance_set_updated_at on public.checkpoint_clearance;
create trigger checkpoint_clearance_set_updated_at
  before update on public.checkpoint_clearance
  for each row execute function public.set_updated_at();

-- Backfill clearance from historical attempts (best score; first pass time)
insert into public.checkpoint_clearance (
  user_id,
  checkpoint_id,
  kind,
  best_score,
  max_score,
  passed,
  passed_at,
  best_attempt_id,
  attempt_count,
  enrollment_id
)
select
  a.user_id,
  a.checkpoint_id,
  a.kind,
  max(a.score) as best_score,
  (
    select a2.max_score
    from public.checkpoint_attempts a2
    where a2.user_id = a.user_id
      and a2.checkpoint_id = a.checkpoint_id
      and a2.kind = a.kind
      and a2.enrollment_id is not distinct from a.enrollment_id
    order by a2.score desc, a2.created_at desc
    limit 1
  ) as max_score,
  bool_or(a.passed) as passed,
  min(a.created_at) filter (where a.passed) as passed_at,
  (
    select a3.id
    from public.checkpoint_attempts a3
    where a3.user_id = a.user_id
      and a3.checkpoint_id = a.checkpoint_id
      and a3.kind = a.kind
      and a3.enrollment_id is not distinct from a.enrollment_id
    order by a3.score desc, a3.created_at desc
    limit 1
  ) as best_attempt_id,
  count(*)::integer as attempt_count,
  a.enrollment_id
from public.checkpoint_attempts a
group by a.user_id, a.checkpoint_id, a.kind, a.enrollment_id
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- earned_badges
-- ---------------------------------------------------------------------------

create table if not exists public.earned_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

alter table public.earned_badges add column if not exists id uuid;
alter table public.earned_badges add column if not exists source_checkpoint_id text;
alter table public.earned_badges add column if not exists criteria_snapshot jsonb;
alter table public.earned_badges add column if not exists revoked_at timestamptz;
alter table public.earned_badges add column if not exists enrollment_id uuid;

update public.earned_badges
set id = coalesce(id, gen_random_uuid())
where id is null;

alter table public.earned_badges alter column id set default gen_random_uuid();
alter table public.earned_badges alter column id set not null;

do $$
declare
  pk_cols text;
begin
  select string_agg(a.attname, ',' order by array_position(c.conkey, a.attnum))
  into pk_cols
  from pg_constraint c
  join pg_class t on t.oid = c.conrelid
  join pg_namespace n on n.oid = t.relnamespace
  join pg_attribute a on a.attrelid = t.oid and a.attnum = any (c.conkey)
  where n.nspname = 'public'
    and t.relname = 'earned_badges'
    and c.contype = 'p';

  if pk_cols is distinct from 'id' then
    alter table public.earned_badges drop constraint if exists earned_badges_pkey;
    alter table public.earned_badges add primary key (id);
  end if;
end $$;

create unique index if not exists earned_badges_user_badge_enrollment_uidx
  on public.earned_badges (user_id, badge_id, enrollment_id) nulls not distinct;

-- ---------------------------------------------------------------------------
-- RLS: learners SELECT own; scored/progress writes are service-role only
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.topic_progress enable row level security;
alter table public.checkpoint_attempts enable row level security;
alter table public.checkpoint_clearance enable row level security;
alter table public.earned_badges enable row level security;

revoke insert, update, delete on public.topic_progress from anon, authenticated;
revoke insert, update, delete on public.checkpoint_attempts from anon, authenticated;
revoke insert, update, delete on public.checkpoint_clearance from anon, authenticated;
revoke insert, update, delete on public.earned_badges from anon, authenticated;

grant select on public.topic_progress to authenticated;
grant select on public.checkpoint_attempts to authenticated;
grant select on public.checkpoint_clearance to authenticated;
grant select on public.earned_badges to authenticated;
grant select, update on public.profiles to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "topic_progress_select_own" on public.topic_progress;
drop policy if exists "topic_progress_insert_own" on public.topic_progress;
drop policy if exists "topic_progress_delete_own" on public.topic_progress;
drop policy if exists "checkpoint_attempts_select_own" on public.checkpoint_attempts;
drop policy if exists "checkpoint_attempts_insert_own" on public.checkpoint_attempts;
drop policy if exists "earned_badges_select_own" on public.earned_badges;
drop policy if exists "earned_badges_insert_own" on public.earned_badges;
drop policy if exists "earned_badges_delete_own" on public.earned_badges;
drop policy if exists "checkpoint_clearance_select_own" on public.checkpoint_clearance;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role
     and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'role changes are not allowed';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_escalation on public.profiles;
create trigger profiles_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_profile_role_escalation();

create policy "topic_progress_select_own"
  on public.topic_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "checkpoint_attempts_select_own"
  on public.checkpoint_attempts for select
  to authenticated
  using (auth.uid() = user_id);

create policy "checkpoint_clearance_select_own"
  on public.checkpoint_clearance for select
  to authenticated
  using (auth.uid() = user_id);

create policy "earned_badges_select_own"
  on public.earned_badges for select
  to authenticated
  using (auth.uid() = user_id and revoked_at is null);
