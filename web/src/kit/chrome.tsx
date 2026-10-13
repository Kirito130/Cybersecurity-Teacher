"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { UserAvatar } from "@/kit/avatar";
import { Stamp, StampLink } from "@/kit/controls";
import { useAuth } from "@/state/auth-provider";
import { setMotionPaused, useMotionPreference } from "@/state/motion-preference";

function accountLabel(displayName: string | null, email: string | null | undefined) {
  const name = displayName?.trim();
  if (name) return name;
  const local = email?.split("@")[0]?.trim();
  if (local) return local;
  return "Account";
}

const primary = [
  { href: "/roadmap", label: "Map" },
  { href: "/badges", label: "Badges" },
  { href: "/help", label: "Help" },
] as const;

function currentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-3 no-underline">
      <svg
        width="36"
        height="36"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="shrink-0"
        shapeRendering="crispEdges"
      >
        <rect width="16" height="16" fill="currentColor" className="text-[var(--act)]" />
        <path
          fill="var(--color-paper)"
          d="M2 4h1v2H2zM6 4h1v2H6zM3 6h1v1H3zM5 6h1v1H5zM4 7h1v1H4zM3 8h1v1H3zM5 8h1v1H5zM2 9h1v2H2zM6 9h1v2H6zM9 4h1v7H9zM10 4h3v1h-3zM10 7h2v1h-2zM13 5h1v2h-1z"
        />
      </svg>
      <span className="ui ink">CyberXP</span>
    </Link>
  );
}

export function Mast() {
  const pathname = usePathname();
  const { user, displayName, avatarUrl, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeId = `${panelId}-close`;
  const signedInLabel = accountLabel(displayName, user?.email);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.getElementById(closeId)?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeId]);

  return (
    <header className="no-print sheet-paper sticky top-0 z-40">
      <div className="gutter flex h-[var(--mast)] items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="way"
              aria-current={currentPath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-1 lg:flex">
          {loading ? (
            <span className="fine quiet">Session…</span>
          ) : user ? (
            <>
              <Link
                href="/account/profile"
                className="way gap-2"
                aria-current={pathname.startsWith("/account") ? "page" : undefined}
              >
                <UserAvatar url={avatarUrl} size={52} />
                <span className="max-w-[10rem] truncate">{signedInLabel}</span>
              </Link>
              <Stamp kind="ghost" type="button" onClick={() => void signOut()}>
                Sign out
              </Stamp>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className="way">
                Sign in
              </Link>
              <StampLink href="/auth/sign-up">Create account</StampLink>
            </>
          )}
        </div>
        <div className="lg:hidden">
          <Stamp
            kind="ghost"
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(true)}
          >
            Menu
          </Stamp>
        </div>
      </div>
      <hr className="rule" />

      {open ? (
        <div
          id={panelId}
          className="sheet-night fixed inset-0 z-50 flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="gutter flex h-[var(--mast)] items-center justify-between">
            <span className="ui">Menu</span>
            <Stamp id={closeId} kind="ghost" type="button" onClick={() => setOpen(false)}>
              Close
            </Stamp>
          </div>
          <nav className="gutter flex flex-1 flex-col justify-center gap-6 pb-16">
            <Link href="/" className="display" onClick={() => setOpen(false)}>
              Home
            </Link>
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="display"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/account/profile"
                  className="display inline-flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <UserAvatar url={avatarUrl} size={64} />
                  <span className="truncate">{signedInLabel}</span>
                </Link>
                <Stamp
                  kind="ghost"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void signOut();
                  }}
                >
                  Sign out
                </Stamp>
              </>
            ) : (
              <div className="flex flex-wrap gap-4">
                <StampLink href="/auth/sign-in" kind="ghost">
                  Sign in
                </StampLink>
                <StampLink href="/auth/sign-up">Create account</StampLink>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MotionSwitch() {
  const motion = useMotionPreference();
  if (motion === "reduced") {
    return <span className="fine quiet">Motion off (system)</span>;
  }
  return (
    <Stamp
      kind="ghost"
      type="button"
      onClick={() => setMotionPaused(motion === "run")}
    >
      {motion === "run" ? "Pause patterns" : "Play patterns"}
    </Stamp>
  );
}

export function Colophon() {
  return (
    <footer className="sheet-night no-print">
      <div className="gutter grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="ui">CyberXP</p>
          <p className="mt-4 measure lede">
            Chapters, topics, subtopics, and tasks. Practice only on systems you
            own or have written permission to test.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
          <ul className="space-y-3">
            <li>
              <Link href="/roadmap" className="cite">
                Map
              </Link>
            </li>
            <li>
              <Link href="/chapters/00" className="cite">
                Chapter 00
              </Link>
            </li>
            <li>
              <Link href="/badges" className="cite">
                Badges
              </Link>
            </li>
          </ul>
          <ul className="space-y-3">
            <li>
              <Link href="/auth/sign-in" className="cite">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/auth/sign-up" className="cite">
                Create account
              </Link>
            </li>
            <li>
              <Link href="/account/profile" className="cite">
                Profile
              </Link>
            </li>
          </ul>
          <ul className="space-y-3">
            <li>
              <Link href="/help" className="cite">
                Help
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="cite">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="rule" />
      <div className="gutter flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="fine quiet">
          Privacy text is a product disclosure. It has not had legal review.
        </p>
        <MotionSwitch />
      </div>
    </footer>
  );
}

export function AccountNav() {
  const pathname = usePathname();
  const items = [
    { href: "/account/profile", label: "Profile" },
    { href: "/account/settings", label: "Settings" },
    { href: "/account/password", label: "Password" },
  ];
  return (
    <nav aria-label="Account" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="way"
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
