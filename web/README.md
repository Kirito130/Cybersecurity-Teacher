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

Apply `supabase/schema.sql` in the Supabase SQL editor before testing signed-in flows.

## Structure

- `src/app` — routes + API handlers (`/api/progress`, `/api/checkpoint/*`)
- `src/components` — shell, auth, progress providers, learning UI
- `src/content` — typed curriculum
- `src/lib` — progress core, quiz scoring, Supabase clients, rate limit
- `supabase/schema.sql` — Postgres + RLS

## Progress modes

- **Guest:** `localStorage` key `cyberxp-progress-v1`
- **Signed in:** cloud tables via Route Handlers; local cache kept as offline mirror
