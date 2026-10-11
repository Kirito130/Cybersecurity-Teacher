# CyberXP

A clearance-style learning path from zero technical background to advanced ethical hacking practice — checkpoints, badges, and evidence-first study.

Curriculum source: [`Ethical_Hacking_Penetration_Testing_Roadmap.md`](Ethical_Hacking_Penetration_Testing_Roadmap.md).

## Phase 1

- Next.js app in [`web/`](web/)
- Console / Command Path UI shell
- Interactive roadmap for Blocks 00–18
- Fully detailed **Block 00**
- Guest progress in browser `localStorage`

## Phase 2

- Supabase Auth (email/password) at `/auth/sign-up` and `/auth/sign-in`
- Postgres schema Phases A–C in [`web/supabase/migrations/`](web/supabase/migrations/) (progress, XP, content catalog, orgs, evidence, certificates)
- Cloud sync for signed-in users via service-role Route Handlers; local → cloud migration when cloud is empty
- Server-side quiz/practical scoring APIs with per-user rate limits
- Guest mode still works without Supabase env vars

## Phase 3 (current)

- Fully detailed **Block 01** (hardware/OS, everyday fluency, VMs + recovery)
- Checkpoint 01 quiz + practical gate; isolation question is critical for pass
- Lab Builder badge after clearing Gate 01
- Blocks 02–18 remain roadmap outlines until expanded

## Run locally

```bash
cd web
npm install
cp .env.example .env.local   # then fill Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase env vars, the app runs in guest/local mode.

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL**, **anon public** key, and **service_role** key into `web/.env.local` (see [`web/.env.example`](web/.env.example)).
3. In the SQL editor, apply migrations in order — see [`web/supabase/README.md`](web/supabase/README.md).
4. Optional: `cd web && npm run seed:content` to load the TypeScript curriculum into `content_*` tables.
5. Auth → URL configuration: add `http://localhost:3000/auth/callback` to redirect URLs.
6. Restart `npm run dev`.

```bash
npm run build
npm start
```

## Practice rules

Test only on your own isolated lab, a challenge provider’s designated targets, or systems covered by explicit written authorization.

## License

See [LICENSE](LICENSE).
