import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-keycap bg-console-deep text-text-on-console">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold text-text-on-console">
            Cyber<span className="text-phosphor-dim">XP</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-text-on-console-muted">
            A clearance-style path from zero technical background to advanced
            ethical hacking practice — checkpoints, badges, and evidence-first
            learning.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor-dim">
            Path
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/roadmap" className="hover:text-phosphor-dim">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/blocks/00" className="hover:text-phosphor-dim">
                Block 00
              </Link>
            </li>
            <li>
              <Link href="/badges" className="hover:text-phosphor-dim">
                Badges
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-phosphor-dim">
                How it works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-phosphor-dim">
            Practice rules
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-on-console-muted">
            Test only on your own isolated lab, a challenge provider&apos;s
            designated targets, or systems covered by explicit written
            authorization. Visibility is not permission.
          </p>
        </div>
      </div>
      <div className="border-t border-bezel px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-text-on-console-muted md:px-6">
        © 2026 CyberXP · Guest progress is local; signed-in progress syncs to
        the cloud
      </div>
    </footer>
  );
}
