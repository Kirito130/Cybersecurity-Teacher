-- CyberXP Phase C — evidence uploads, certificates, notifications

-- ---------------------------------------------------------------------------
-- practical evidence
-- ---------------------------------------------------------------------------

create table if not exists public.practical_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  checkpoint_id text not null,
  checkpoint_uuid uuid references public.content_checkpoints (id) on delete set null,
  attempt_id uuid references public.checkpoint_attempts (id) on delete set null,
  notes text,
  enrollment_id uuid references public.enrollments (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists practical_evidence_user_checkpoint_idx
  on public.practical_evidence (user_id, checkpoint_id, created_at desc);

drop trigger if exists practical_evidence_set_updated_at on public.practical_evidence;
create trigger practical_evidence_set_updated_at
  before update on public.practical_evidence
  for each row execute function public.set_updated_at();

create table if not exists public.evidence_files (
  id uuid primary key default gen_random_uuid(),
  evidence_id uuid not null references public.practical_evidence (id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  content_type text not null,
  byte_size integer not null check (byte_size > 0 and byte_size <= 26214400),
  created_at timestamptz not null default now()
);

create index if not exists evidence_files_evidence_idx
  on public.evidence_files (evidence_id);

-- ---------------------------------------------------------------------------
-- certificates
-- ---------------------------------------------------------------------------

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  enrollment_id uuid references public.enrollments (id) on delete set null,
  path_id uuid references public.learning_paths (id) on delete set null,
  block_id uuid references public.content_blocks (id) on delete set null,
  title text not null,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  verification_code text not null unique default encode(gen_random_bytes(16), 'hex'),
  metadata jsonb not null default '{}'::jsonb,
  check (path_id is not null or block_id is not null)
);

create index if not exists certificates_user_idx
  on public.certificates (user_id, issued_at desc);

-- Public verify: returns non-sensitive certificate fields by code
create or replace function public.verify_certificate(code text)
returns table (
  title text,
  issued_at timestamptz,
  revoked_at timestamptz,
  is_valid boolean,
  path_slug text,
  block_slug text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.title,
    c.issued_at,
    c.revoked_at,
    (c.revoked_at is null) as is_valid,
    p.slug as path_slug,
    b.slug as block_slug
  from public.certificates c
  left join public.learning_paths p on p.id = c.path_id
  left join public.content_blocks b on b.id = c.block_id
  where c.verification_code = code
  limit 1;
$$;

revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Storage bucket note (run in dashboard or via storage API; SQL is best-effort)
-- Private bucket `evidence`: max 25 MB; MIME allowlist enforced in app.
-- ---------------------------------------------------------------------------

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'storage' and table_name = 'buckets'
  ) then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'evidence',
      'evidence',
      false,
      26214400,
      array[
        'image/png',
        'image/jpeg',
        'image/webp',
        'application/pdf',
        'text/plain',
        'text/markdown'
      ]
    )
    on conflict (id) do update
    set
      public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.practical_evidence enable row level security;
alter table public.evidence_files enable row level security;
alter table public.certificates enable row level security;
alter table public.notifications enable row level security;

revoke insert, update, delete on public.practical_evidence from anon, authenticated;
revoke insert, update, delete on public.evidence_files from anon, authenticated;
revoke insert, update, delete on public.certificates from anon, authenticated;
revoke insert, update, delete on public.notifications from anon, authenticated;

grant select on public.practical_evidence to authenticated;
grant select on public.evidence_files to authenticated;
grant select on public.certificates to authenticated;
grant select on public.notifications to authenticated;

drop policy if exists "practical_evidence_select_own" on public.practical_evidence;
drop policy if exists "evidence_files_select_own" on public.evidence_files;
drop policy if exists "certificates_select_own" on public.certificates;
drop policy if exists "notifications_select_own" on public.notifications;
drop policy if exists "notifications_update_own_read" on public.notifications;

create policy "practical_evidence_select_own"
  on public.practical_evidence for select
  to authenticated
  using (auth.uid() = user_id);

create policy "evidence_files_select_own"
  on public.evidence_files for select
  to authenticated
  using (
    exists (
      select 1 from public.practical_evidence e
      where e.id = evidence_id and e.user_id = auth.uid()
    )
  );

create policy "certificates_select_own"
  on public.certificates for select
  to authenticated
  using (auth.uid() = user_id);

create policy "notifications_select_own"
  on public.notifications for select
  to authenticated
  using (auth.uid() = user_id);

-- Allow learners to mark their own notifications read (limited update)
grant update on public.notifications to authenticated;

create policy "notifications_update_own_read"
  on public.notifications for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
