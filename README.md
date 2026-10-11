# CyberXP

A clearance-style learning path from zero technical background to advanced ethical hacking practice — checkpoints, badges, and evidence-first study.

Curriculum source: [`Ethical_Hacking_Penetration_Testing_Roadmap.md`](Ethical_Hacking_Penetration_Testing_Roadmap.md).

## Phase 1

- Next.js app in [`web/`](web/)
- Console / Command Path UI shell
- Interactive roadmap for Blocks 00–18
- Fully detailed **Block 00**
- Guest progress in browser `localStorage`

## Phase 2 (current)

- Supabase Auth (email/password) at `/auth/sign-up` and `/auth/sign-in`
- Postgres tables: `profiles`, `topic_progress`, `checkpoint_attempts`, `earned_badges`
- Cloud sync for signed-in users; local → cloud migration when cloud is empty
- Server-side quiz/practical scoring APIs with per-user rate limits
- Guest mode still works without Supabase env vars

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
2. Copy **Project URL** and **anon public** key into `web/.env.local`.
3. In the SQL editor, run [`web/supabase/schema.sql`](web/supabase/schema.sql).
4. Auth → URL configuration: add `http://localhost:3000/auth/callback` to redirect URLs.
5. Restart `npm run dev`.

```bash
npm run build
npm start
```

## Practice rules

Test only on your own isolated lab, a challenge provider’s designated targets, or systems covered by explicit written authorization.

## License

See [LICENSE](LICENSE).
