# CyberXP Supabase schema

Apply SQL migrations **in order** in the Supabase SQL editor (Dashboard → SQL → New query), or via the Supabase CLI.

| Order | File | Contents |
|---|---|---|
| 1 | [`migrations/001_phase_a_foundations.sql`](migrations/001_phase_a_foundations.sql) | Profiles, topic progress, attempts, clearance, badges, RLS |
| 2 | [`migrations/002_phase_b_engagement.sql`](migrations/002_phase_b_engagement.sql) | XP events, learner stats, activity, block progress |
| 3 | [`migrations/003_phase_c_catalog.sql`](migrations/003_phase_c_catalog.sql) | Learning paths + content catalog |
| 4 | [`migrations/004_phase_c_orgs.sql`](migrations/004_phase_c_orgs.sql) | Orgs, cohorts, enrollments, subtopic progress |
| 5 | [`migrations/005_phase_c_evidence_certificates.sql`](migrations/005_phase_c_evidence_certificates.sql) | Evidence, certificates, notifications, storage bucket |
| 6 | [`migrations/006_support_inquiries.sql`](migrations/006_support_inquiries.sql) | Help inbox, profile field length checks |
| 7 | [`migrations/007_staff_roles.sql`](migrations/007_staff_roles.sql) | Developer staff role |
| 8 | [`migrations/008_avatars_storage.sql`](migrations/008_avatars_storage.sql) | Public `avatars` storage bucket + policies |

[`schema.sql`](schema.sql) is a pointer only — it does not contain DDL.

## App environment

See [`../.env.example`](../.env.example):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; required for cloud progress writes and the Help inbox)
- `SUPPORT_EMAIL` (optional public contact address shown on `/help`)

## Content seed

After Phase C catalog migration:

```bash
npm run seed:content
```

This upserts blocks/topics/checkpoints/badges from TypeScript into `content_*` tables and backfills UUID bridge columns on learner rows.

## Security model

- Authenticated clients: **SELECT** own learner rows; **SELECT** published catalog (except quiz `model_answer`).
- Scored writes (attempts, clearance, badges, XP, topic completion): **service role** via Next.js Route Handlers only.
- Certificate public verify: `verify_certificate(code)` RPC + `GET /api/certificates/verify?code=…`.
