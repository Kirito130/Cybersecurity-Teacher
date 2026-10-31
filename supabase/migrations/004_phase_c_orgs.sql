-- CyberXP Phase C — organizations, cohorts, enrollments, assignments
-- Also: subtopic progress + learning sessions

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists organizations_set_updated_at on public.organizations;
create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

create table if not exists public.org_memberships (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'instructor', 'learner')),
  status text not null default 'active'
    check (status in ('active', 'invited', 'suspended')),
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);

create index if not exists org_memberships_user_idx
  on public.org_memberships (user_id);

create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  path_id uuid references public.learning_paths (id) on delete set null,
  name text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  capacity integer check (capacity is null or capacity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists cohorts_set_updated_at on public.cohorts;
create trigger cohorts_set_updated_at
  before update on public.cohorts
  for each row execute function public.set_updated_at();

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'completed', 'dropped')),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (cohort_id, user_id)
);

create index if not exists enrollments_user_idx
  on public.enrollments (user_id);

-- Wire nullable enrollment_id FKs on learner tables
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'topic_progress_enrollment_id_fkey'
  ) then
    alter table public.topic_progress
      add constraint topic_progress_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete cascade;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'checkpoint_attempts_enrollment_id_fkey'
  ) then
    alter table public.checkpoint_attempts
      add constraint checkpoint_attempts_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete cascade;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'checkpoint_clearance_enrollment_id_fkey'
  ) then
    alter table public.checkpoint_clearance
      add constraint checkpoint_clearance_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete cascade;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'earned_badges_enrollment_id_fkey'
  ) then
    alter table public.earned_badges
      add constraint earned_badges_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete cascade;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'xp_events_enrollment_id_fkey'
  ) then
    alter table public.xp_events
      add constraint xp_events_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete set null;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'block_progress_enrollment_id_fkey'
  ) then
    alter table public.block_progress
      add constraint block_progress_enrollment_id_fkey
      foreign key (enrollment_id) references public.enrollments (id) on delete cascade;
  end if;
end $$;

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  cohort_id uuid references public.cohorts (id) on delete cascade,
  title text not null,
  assignment_type text not null check (
    assignment_type in ('path', 'block', 'checkpoint')
  ),
  ref_id text not null,
  due_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.assignment_assignees (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  unique (assignment_id, user_id)
);

-- ---------------------------------------------------------------------------
-- subtopic_progress + learning_sessions
-- ---------------------------------------------------------------------------

create table if not exists public.subtopic_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subtopic_id text not null,
  subtopic_uuid uuid references public.content_subtopics (id) on delete set null,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  last_position_seconds integer not null default 0 check (last_position_seconds >= 0),
  time_spent_seconds integer not null default 0 check (time_spent_seconds >= 0),
  enrollment_id uuid references public.enrollments (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists subtopic_progress_user_subtopic_enrollment_uidx
  on public.subtopic_progress (user_id, subtopic_id, enrollment_id) nulls not distinct;

drop trigger if exists subtopic_progress_set_updated_at on public.subtopic_progress;
create trigger subtopic_progress_set_updated_at
  before update on public.subtopic_progress
  for each row execute function public.set_updated_at();

create table if not exists public.learning_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  seconds_active integer not null default 0 check (seconds_active >= 0),
  context_type text,
  context_id text,
  enrollment_id uuid references public.enrollments (id) on delete set null
);

create index if not exists learning_sessions_user_started_idx
  on public.learning_sessions (user_id, started_at desc);

-- ---------------------------------------------------------------------------
-- Helper: is org staff for a cohort's org
-- ---------------------------------------------------------------------------

create or replace function public.is_org_staff(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.org_memberships m
    where m.org_id = target_org_id
      and m.user_id = auth.uid()
      and m.status = 'active'
      and m.role in ('owner', 'admin', 'instructor')
  );
$$;

create or replace function public.is_cohort_staff(target_cohort_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cohorts c
    join public.org_memberships m on m.org_id = c.org_id
    where c.id = target_cohort_id
      and m.user_id = auth.uid()
      and m.status = 'active'
      and m.role in ('owner', 'admin', 'instructor')
  );
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.organizations enable row level security;
alter table public.org_memberships enable row level security;
alter table public.cohorts enable row level security;
alter table public.enrollments enable row level security;
alter table public.assignments enable row level security;
alter table public.assignment_assignees enable row level security;
alter table public.subtopic_progress enable row level security;
alter table public.learning_sessions enable row level security;

revoke insert, update, delete on public.organizations from anon, authenticated;
revoke insert, update, delete on public.org_memberships from anon, authenticated;
revoke insert, update, delete on public.cohorts from anon, authenticated;
revoke insert, update, delete on public.enrollments from anon, authenticated;
revoke insert, update, delete on public.assignments from anon, authenticated;
revoke insert, update, delete on public.assignment_assignees from anon, authenticated;
revoke insert, update, delete on public.subtopic_progress from anon, authenticated;
revoke insert, update, delete on public.learning_sessions from anon, authenticated;

grant select on public.organizations to authenticated;
grant select on public.org_memberships to authenticated;
grant select on public.cohorts to authenticated;
grant select on public.enrollments to authenticated;
grant select on public.assignments to authenticated;
grant select on public.assignment_assignees to authenticated;
grant select on public.subtopic_progress to authenticated;
grant select on public.learning_sessions to authenticated;

drop policy if exists "organizations_select_member" on public.organizations;
drop policy if exists "org_memberships_select_own_or_staff" on public.org_memberships;
drop policy if exists "cohorts_select_member_or_staff" on public.cohorts;
drop policy if exists "enrollments_select_own_or_staff" on public.enrollments;
drop policy if exists "assignments_select_org_member" on public.assignments;
drop policy if exists "assignment_assignees_select_own_or_staff" on public.assignment_assignees;
drop policy if exists "subtopic_progress_select_own" on public.subtopic_progress;
drop policy if exists "learning_sessions_select_own" on public.learning_sessions;

create policy "organizations_select_member"
  on public.organizations for select
  to authenticated
  using (
    exists (
      select 1 from public.org_memberships m
      where m.org_id = id
        and m.user_id = auth.uid()
        and m.status = 'active'
    )
  );

create policy "org_memberships_select_own_or_staff"
  on public.org_memberships for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_org_staff(org_id)
  );

create policy "cohorts_select_member_or_staff"
  on public.cohorts for select
  to authenticated
  using (
    public.is_org_staff(org_id)
    or exists (
      select 1 from public.enrollments e
      where e.cohort_id = id and e.user_id = auth.uid()
    )
  );

create policy "enrollments_select_own_or_staff"
  on public.enrollments for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_cohort_staff(cohort_id)
  );

create policy "assignments_select_org_member"
  on public.assignments for select
  to authenticated
  using (
    exists (
      select 1 from public.org_memberships m
      where m.org_id = org_id
        and m.user_id = auth.uid()
        and m.status = 'active'
    )
  );

create policy "assignment_assignees_select_own_or_staff"
  on public.assignment_assignees for select
  to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.assignments a
      where a.id = assignment_id
        and public.is_org_staff(a.org_id)
    )
  );

create policy "subtopic_progress_select_own"
  on public.subtopic_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "learning_sessions_select_own"
  on public.learning_sessions for select
  to authenticated
  using (auth.uid() = user_id);
