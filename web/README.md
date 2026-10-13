# CyberXP web app

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion + Supabase Auth.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` → `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; required for cloud progress writes and the Help inbox)
- `SUPPORT_EMAIL` (optional; shown on `/help` when it is a plain email address)

Apply Supabase migrations in order (see [`supabase/README.md`](supabase/README.md)), then optionally:

```bash
npm run seed:content
```

## Structure

- `src/app` — routes + API handlers (`/api/progress`, `/api/checkpoint/*`, `/api/certificates/verify`, `/api/help`)
- `src/components` — shell, auth, progress providers, learning UI
- `src/content` — typed curriculum (source of truth until CMS UI)
- `src/lib` — progress, XP/engagement, certificates, evidence, orgs, Supabase clients
- `supabase/migrations/` — Phase A–C Postgres + RLS
- `scripts/seed-content-catalog.ts` — seed `content_*` from TypeScript

## Access

Home (`/`), Roadmap, Badges, Help, sign-in, sign-up, and Privacy and declarations are public. Block, topic, checkpoint, and account pages redirect to sign-in until a session exists.

## Progress modes

- **Guest:** can view the public pages above. Study pages require an account. A browser copy may still exist under `localStorage` key `cyberxp-progress-v1`.
- **Signed in:** cloud tables via Route Handlers + service-role writes; local cache as offline mirror
