-- CyberXP Phase 2 schema
-- Run in the Supabase SQL editor (Dashboard → SQL → New query).

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.topic_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

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

create index if not exists checkpoint_attempts_user_created_idx
  on public.checkpoint_attempts (user_id, created_at desc);

create index if not exists checkpoint_attempts_user_checkpoint_idx
  on public.checkpoint_attempts (user_id, checkpoint_id, kind, created_at desc);

create table if not exists public.earned_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

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

alter table public.profiles enable row level security;
alter table public.topic_progress enable row level security;
alter table public.checkpoint_attempts enable row level security;
alter table public.earned_badges enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "topic_progress_select_own"
  on public.topic_progress for select
  using (auth.uid() = user_id);

create policy "topic_progress_insert_own"
  on public.topic_progress for insert
  with check (auth.uid() = user_id);

create policy "topic_progress_delete_own"
  on public.topic_progress for delete
  using (auth.uid() = user_id);

create policy "checkpoint_attempts_select_own"
  on public.checkpoint_attempts for select
  using (auth.uid() = user_id);

create policy "checkpoint_attempts_insert_own"
  on public.checkpoint_attempts for insert
  with check (auth.uid() = user_id);

create policy "earned_badges_select_own"
  on public.earned_badges for select
  using (auth.uid() = user_id);

create policy "earned_badges_insert_own"
  on public.earned_badges for insert
  with check (auth.uid() = user_id);

create policy "earned_badges_delete_own"
  on public.earned_badges for delete
  using (auth.uid() = user_id);
