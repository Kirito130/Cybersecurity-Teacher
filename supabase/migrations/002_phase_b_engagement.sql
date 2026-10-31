-- CyberXP Phase B — engagement (XP, stats, activity, block progress)

-- ---------------------------------------------------------------------------
-- xp_events (append-only ledger)
-- ---------------------------------------------------------------------------

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_type text not null check (
    event_type in (
      'topic_complete',
      'quiz_pass',
      'practical_pass',
      'badge_earn',
      'streak_bonus',
      'admin_adjust'
    )
  ),
  ref_type text check (ref_type in ('topic', 'checkpoint', 'badge', 'system')),
  ref_id text,
  xp integer not null,
  idempotency_key text not null,
  enrollment_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint xp_events_admin_adjust_negative_check check (
    event_type = 'admin_adjust' or xp >= 0
  )
);

create unique index if not exists xp_events_idempotency_uidx
  on public.xp_events (idempotency_key);

create index if not exists xp_events_user_created_idx
  on public.xp_events (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- learner_stats (cache)
-- ---------------------------------------------------------------------------

create table if not exists public.learner_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  total_xp integer not null default 0 check (total_xp >= 0),
  level integer not null default 1 check (level >= 1),
  topics_completed integer not null default 0 check (topics_completed >= 0),
  checkpoints_cleared integer not null default 0 check (checkpoints_cleared >= 0),
  badges_earned integer not null default 0 check (badges_earned >= 0),
  current_streak_weeks integer not null default 0 check (current_streak_weeks >= 0),
  longest_streak_weeks integer not null default 0 check (longest_streak_weeks >= 0),
  streak_week_xp integer not null default 0 check (streak_week_xp >= 0),
  streak_week_start date,
  last_activity_at timestamptz,
  updated_at timestamptz not null default now()
);

drop trigger if exists learner_stats_set_updated_at on public.learner_stats;
create trigger learner_stats_set_updated_at
  before update on public.learner_stats
  for each row execute function public.set_updated_at();

-- Ensure a stats row exists for every profile
insert into public.learner_stats (user_id)
select id from public.profiles
on conflict (user_id) do nothing;

create or replace function public.handle_new_user_stats()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.learner_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_profile_created_stats on public.profiles;
create trigger on_profile_created_stats
  after insert on public.profiles
  for each row execute function public.handle_new_user_stats();

-- ---------------------------------------------------------------------------
-- activity_events
-- ---------------------------------------------------------------------------

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null check (
    action in (
      'view_topic',
      'start_checkpoint',
      'complete_topic',
      'pass_quiz',
      'pass_practical',
      'earn_badge'
    )
  ),
  ref_type text,
  ref_id text,
  summary text,
  created_at timestamptz not null default now()
);

create index if not exists activity_events_user_created_idx
  on public.activity_events (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- block_progress (materialized summary)
-- ---------------------------------------------------------------------------

create table if not exists public.block_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  block_id text not null,
  topics_done integer not null default 0 check (topics_done >= 0),
  topics_total integer not null default 0 check (topics_total >= 0),
  quiz_passed boolean not null default false,
  practical_passed boolean not null default false,
  percent integer not null default 0 check (percent >= 0 and percent <= 100),
  unlocked boolean not null default false,
  cleared boolean not null default false,
  enrollment_id uuid,
  updated_at timestamptz not null default now()
);

create unique index if not exists block_progress_user_block_enrollment_uidx
  on public.block_progress (user_id, block_id, enrollment_id) nulls not distinct;

create index if not exists block_progress_user_idx
  on public.block_progress (user_id);

drop trigger if exists block_progress_set_updated_at on public.block_progress;
create trigger block_progress_set_updated_at
  before update on public.block_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.xp_events enable row level security;
alter table public.learner_stats enable row level security;
alter table public.activity_events enable row level security;
alter table public.block_progress enable row level security;

revoke insert, update, delete on public.xp_events from anon, authenticated;
revoke insert, update, delete on public.learner_stats from anon, authenticated;
revoke insert, update, delete on public.activity_events from anon, authenticated;
revoke insert, update, delete on public.block_progress from anon, authenticated;

grant select on public.xp_events to authenticated;
grant select on public.learner_stats to authenticated;
grant select on public.activity_events to authenticated;
grant select on public.block_progress to authenticated;

drop policy if exists "xp_events_select_own" on public.xp_events;
drop policy if exists "learner_stats_select_own" on public.learner_stats;
drop policy if exists "activity_events_select_own" on public.activity_events;
drop policy if exists "block_progress_select_own" on public.block_progress;

create policy "xp_events_select_own"
  on public.xp_events for select
  to authenticated
  using (auth.uid() = user_id);

create policy "learner_stats_select_own"
  on public.learner_stats for select
  to authenticated
  using (auth.uid() = user_id);

create policy "activity_events_select_own"
  on public.activity_events for select
  to authenticated
  using (auth.uid() = user_id);

create policy "block_progress_select_own"
  on public.block_progress for select
  to authenticated
  using (auth.uid() = user_id);
