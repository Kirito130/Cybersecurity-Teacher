# CyberXP

A clearance-style learning path from zero technical background to advanced ethical hacking practice — checkpoints, badges, and evidence-first study.

Curriculum source: [`Ethical_Hacking_Penetration_Testing_Roadmap.md`](Ethical_Hacking_Penetration_Testing_Roadmap.md).

## Current product surface

- Next.js app in [`web/`](web/)
- **Chapters 00–18** fully detailed (topics, resources, tasks, checkpoints)
- Roadmap UI uses **Chapter** wording; routes live at `/chapters/[id]` (`/blocks/*` redirects)
- Supabase Auth + cloud progress (guest/local mode without env vars)
- Badges for every chapter gate plus milestones

## Run locally

```bash
cd web
npm install
cp .env.example .env.local   # then fill Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL**, **anon public** key, and **service_role** key into `web/.env.local` (see [`web/.env.example`](web/.env.example)).
3. In the SQL editor, apply migrations in order — see [`web/supabase/README.md`](web/supabase/README.md).
4. Optional: `cd web && npm run seed:content` to load the TypeScript curriculum into `content_*` tables.
5. Auth → URL configuration: add `http://localhost:3000/auth/callback` to redirect URLs.
6. Restart `npm run dev`.

### Regenerating curriculum from the markdown

```bash
cd web
node scripts/extract-curriculum.mjs
node scripts/finalize-content.mjs
```

## Practice rules

Test only on your own isolated lab, a challenge provider’s designated targets, or systems covered by explicit written authorization.

## License

See [LICENSE](LICENSE).
