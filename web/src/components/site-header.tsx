"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useProgress } from "@/components/progress-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/badges", label: "Badges" },
  { href: "/how-it-works", label: "How it works" },
];

function hudLabel(pathname: string): string {
  const blockMatch = pathname.match(/^\/blocks\/(\d{2})/);
  if (blockMatch) return `BLK ${blockMatch[1]} · ACTIVE`;
  if (pathname.startsWith("/topics/")) return `TOPIC · ACTIVE`;
  if (pathname.startsWith("/checkpoint/")) return `GATE · ACTIVE`;
  if (pathname.startsWith("/roadmap")) return `MAP · STANDBY`;
  if (pathname.startsWith("/badges")) return `MEDALS · STANDBY`;
  return `PATH · STANDBY`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, configured, signOut } = useAuth();
  const { mode, syncing } = useProgress();
  const [open, setOpen] = useState(false);
  const hud = hudLabel(pathname);

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-keycap bg-console text-text-on-console shadow-[0_2px_0_color-mix(in_oklab,var(--keycap)_25%,transparent)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-text-on-console md:text-2xl"
          >
            Cyber<span className="text-phosphor">XP</span>
          </Link>
          <div
            className="hidden items-center gap-2 rounded-[var(--radius-sm)] border border-keycap bg-crt px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-phosphor sm:flex"
            aria-live="polite"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-phosphor shadow-[0_0_6px_var(--phosphor)]"
            />
            {hud}
          </div>
        </div>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-[var(--radius-md)] px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                  active
                    ? "bg-crt text-phosphor-bright"
                    : "text-text-on-console-muted hover:bg-bezel/50 hover:text-text-on-console",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && user ? (
            <>
              <span className="max-w-[10rem] truncate font-mono text-[11px] uppercase tracking-[0.1em] text-text-on-console-muted">
                {syncing ? "Sync…" : mode === "cloud" ? "Cloud" : "Local"} ·{" "}
                {user.email}
              </span>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-console-muted hover:text-text-on-console"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href={configured ? "/auth/sign-in" : "/how-it-works#accounts"}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-on-console-muted hover:text-text-on-console"
            >
              Sign in
            </Link>
          )}
          <Link href="/roadmap">
            <Button size="sm">Enter path</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-md)] border border-bezel bg-console-deep text-text-on-console md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-bezel bg-console-deep px-4 py-4 md:hidden"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-phosphor-dim">
            {hud}
          </p>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[var(--radius-md)] px-3 py-3 text-base font-medium text-text-on-console hover:bg-bezel/40"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <button
                type="button"
                className="rounded-[var(--radius-md)] px-3 py-3 text-left font-mono text-sm uppercase tracking-[0.12em] text-text-on-console-muted"
                onClick={() => {
                  setOpen(false);
                  void handleSignOut();
                }}
              >
                Sign out ({user.email})
              </button>
            ) : (
              <Link
                href={configured ? "/auth/sign-in" : "/how-it-works#accounts"}
                className="rounded-[var(--radius-md)] px-3 py-3 font-mono text-sm uppercase tracking-[0.12em] text-text-on-console-muted"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            )}
            <Link href="/roadmap" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full">Enter path</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
