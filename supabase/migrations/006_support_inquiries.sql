-- CyberXP — support inbox and profile field limits
-- Safe to re-run.

update public.profiles
set display_name = left(display_name, 60)
where display_name is not null and char_length(display_name) > 60;

update public.profiles
set timezone = left(timezone, 64)
where timezone is not null and char_length(timezone) > 64;

update public.profiles
set learning_goal = left(learning_goal, 280)
where learning_goal is not null and char_length(learning_goal) > 280;

update public.profiles
set display_name = null
where display_name is not null and char_length(btrim(display_name)) = 0;

update public.profiles
set timezone = null
where timezone is not null and char_length(btrim(timezone)) = 0;

update public.profiles
set learning_goal = null
where learning_goal is not null and char_length(btrim(learning_goal)) = 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_display_name_len'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_len
      check (
        display_name is null
        or char_length(btrim(display_name)) between 1 and 60
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_timezone_len'
  ) then
    alter table public.profiles
      add constraint profiles_timezone_len
      check (
        timezone is null
        or (
          char_length(timezone) between 1 and 64
          and timezone ~ '^[A-Za-z0-9_+/-]{1,64}$'
        )
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_learning_goal_len'
  ) then
    alter table public.profiles
      add constraint profiles_learning_goal_len
      check (
        learning_goal is null
        or char_length(btrim(learning_goal)) between 1 and 280
      );
  end if;
end $$;

create table if not exists public.support_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  category text not null,
  message text not null,
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint support_inquiries_name_len check (char_length(btrim(name)) between 1 and 80),
  constraint support_inquiries_email_len check (char_length(email) between 3 and 254),
  constraint support_inquiries_category_check check (category in ('question', 'issue', 'account')),
  constraint support_inquiries_message_len check (char_length(btrim(message)) between 10 and 4000)
);

create index if not exists support_inquiries_created_idx
  on public.support_inquiries (created_at desc);

alter table public.support_inquiries enable row level security;

revoke all on public.support_inquiries from anon, authenticated;
