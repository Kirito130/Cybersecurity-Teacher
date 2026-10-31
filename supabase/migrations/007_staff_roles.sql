-- Allow a developer staff role. Admin and developer both receive full path access in the app.
-- Safe to re-run.

alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('learner', 'admin', 'developer'));
