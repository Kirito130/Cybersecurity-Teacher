# CyberXP

CyberXP is a structured cybersecurity learning web app. It takes a learner from no technical background through professional penetration-testing delivery, using a gated chapter roadmap, isolated-lab practice, quizzes, practicals, and badges.

The curriculum is based on the Ethical Hacking / Penetration Testing roadmap in this repository. The product emphasis is **authorized practice only**: learners study concepts, work in their own lab, and prove chapter clearance before later chapters unlock.

---

## Purpose

- Give beginners a single, ordered path instead of a pile of disconnected tutorials.
- Teach foundations (computers, networking, Linux, Windows, programming, apps, crypto) before attack tooling.
- Require evidence of understanding: short-answer quizzes, practical criteria, and critical safety questions (scope / isolation / permission).
- Persist progress for signed-in learners so work survives across devices.
- Keep scoring and chapter unlocks on the server so clients cannot simply claim clearance.

---

## How it works

### Learning loop

Each chapter (block) follows the same pattern:

1. **Read topics** — Each topic states the idea, points to one reading and one video, and ends with a written or lab task.
2. **Practice in your lab** — From Chapter 01 onward, work happens in an isolated lab you build. Chapter 00 stays on paper: scope, notes, and permission.
3. **Write the chapter quiz** — Six short answers. Pass at **10 of 12**. A zero on a critical scope or isolation question fails the chapter.
4. **Complete the practical** — Score four criteria. Pass at **16 of 20** with nothing below **3**.
5. **Earn the chapter badge** — When both quiz and practical pass, the chapter clears and dependent chapters unlock.

The next chapter does not open until both checkpoint parts pass.

### Curriculum shape

| Layer | What it is |
|---|---|
| **Chapters 00–15** | Core path (orientation → foundations → method → web/network/AD/cloud/RE → professional delivery) |
| **Chapters 16–18** | Optional specialist branches (mobile, wireless/IoT, AI application security) |
| **Topics** | Reading + video + task units inside a chapter |
| **Checkpoints** | Per-chapter quiz + practical gate |
| **Badges** | Awards tied to chapter clearance and milestones |

Content lives as typed TypeScript in `src/content/` (source of truth for the app UI). After Supabase catalog migrations, `npm run seed:content` can upsert that catalog into `content_*` tables.

### Progress and accounts

| Mode | Behavior |
|---|---|
| **Guest** | Home, Roadmap, Badges, Help, Privacy, and auth pages are public. Study pages (chapters, topics, checkpoints, account) require sign-in. |
| **Signed in** | Progress is stored in Supabase via Route Handlers (service-role writes for scored actions). A browser cache under `localStorage` key `cyberxp-progress-v1` acts as an offline mirror. |

Chapter unlock rules use prerequisites on each block: a chapter unlocks when every prerequisite chapter’s quiz **and** practical have passed.

### Security model (high level)

- Learners may **read** their own progress rows and published catalog content (quiz model answers are not exposed to the client catalog path used for scoring).
- Scored writes (attempts, clearance, badges, XP, topic completion) go through Next.js API routes using the **service role**, not direct client writes.
- Certificate verification (when used) is available via `GET /api/certificates/verify?code=…`.
- See [`supabase/README.md`](supabase/README.md) for migrations and RLS details.

---

## Tech stack

| Area | Choice |
|---|---|
| App | Next.js 16 (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS 4, Framer Motion |
| Auth & data | Supabase Auth + PostgreSQL |
| Validation | Zod |
| Content | Typed modules under `src/content/` |

---

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm
- A Supabase project (Auth + Postgres)

### Install

```bash
npm install
```

### Environment

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPPORT_EMAIL=support@example.com
```

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key (browser + SSR session) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes for cloud progress / Help inbox | **Server only** — never expose in client bundles |
| `SUPPORT_EMAIL` | Optional | Shown on `/help` when it is a plain email address |

Without Supabase configured, public pages still load; gated routes redirect to sign-in.

### Database

Apply SQL migrations **in order** (Supabase SQL editor or CLI). Full table:

See [`supabase/README.md`](supabase/README.md).

Summary:

1. `001_phase_a_foundations.sql` — profiles, topic progress, attempts, clearance, badges, RLS  
2. `002_phase_b_engagement.sql` — XP, learner stats, activity, block progress  
3. `003_phase_c_catalog.sql` — learning paths + content catalog  
4. `004_phase_c_orgs.sql` — orgs, cohorts, enrollments  
5. `005_phase_c_evidence_certificates.sql` — evidence, certificates, notifications, storage  
6. `006_support_inquiries.sql` — Help inbox  
7. `007_staff_roles.sql` — developer staff role  
8. `008_avatars_storage.sql` — public avatars bucket + policies  

Then seed the catalog from TypeScript:

```bash
npm run seed:content
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
|---|---|
| `npm run dev` | Local development (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run seed:content` | Upsert curriculum into Supabase `content_*` tables |
| `npm run content:extract` | Curriculum extract/finalize scripts |

---

## How to use the app

### As a learner

1. Open the home page and skim the learning loop and chapter map.
2. Create an account at `/auth/sign-up`, then sign in.
3. Start at **Chapter 00** (`/chapters/00`) — orientation, authorization, and learning habits.
4. Work each topic: reading → video → task; mark topics complete as you finish.
5. When topics for the chapter are done, take the **checkpoint** quiz and practical.
6. Pass both gates to clear the chapter, earn its badge, and unlock the next chapter.
7. Use **Roadmap** (`/roadmap`) for the full path, **Badges** (`/badges`) for awards, and **Account** for profile and settings.
8. Use **Help** (`/help`) for support (inbox + optional `SUPPORT_EMAIL`).

### Public vs signed-in routes

| Public (no account) | Requires sign-in |
|---|---|
| `/` Home | `/chapters/…`, `/blocks/…` |
| `/roadmap` | `/topics/…` |
| `/badges` | `/checkpoint/…` |
| `/help`, `/privacy` | `/account/…` |
| `/auth/sign-in`, `/auth/sign-up` | |

---

## Project structure

```
src/
  app/           # Routes + API handlers
  content/       # Typed curriculum (blocks, topics, checkpoints, badges)
  kit/           # UI chrome, controls, boards, patterns
  lib/           # Progress, XP, certificates, Supabase clients, scoring
  state/         # Auth + progress providers, access hooks
  views/         # Page-level view compositions
supabase/
  migrations/    # Ordered Postgres + RLS migrations
scripts/         # Content seed and curriculum tooling
```

### Main API routes

| Route | Role |
|---|---|
| `/api/progress`, `/api/progress/topics` | Load / sync learner progress |
| `/api/checkpoint/quiz`, `/api/checkpoint/practical` | Score and persist checkpoint results |
| `/api/certificates/verify` | Public certificate code lookup |
| `/api/help` | Support inquiry inbox |
| `/api/account/avatar` | Avatar upload handling |

---

## Related docs

- [`supabase/README.md`](supabase/README.md) — migrations, seed, and RLS overview  
- [`Ethical_Hacking_Penetration_Testing_Roadmap.md`](Ethical_Hacking_Penetration_Testing_Roadmap.md) — source curriculum roadmap  

---

## License / status

Private app (`"private": true` in `package.json`). Treat as an in-development learning product: configure Supabase, apply migrations, and seed content before relying on cloud progress in a shared environment.
