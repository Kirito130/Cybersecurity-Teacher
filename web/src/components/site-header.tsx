"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { BrandStamp } from "@/components/brand-stamp";
import { useAuth } from "@/components/auth-provider";
import { useProgress } from "@/components/progress-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/badges", label: "Badges" },
  { href: "/how-it-works", label: "How it works" },
];

const helpLinks = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/blocks/00", label: "Block 00" },
  { href: "/badges", label: "Badges" },
  { href: "/how-it-works", label: "Process" },
  { href: "/how-it-works#accounts", label: "Accounts" },
  { href: "/auth/sign-in", label: "Sign in" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const helpMenuId = useId();
  const hud = hudLabel(pathname);
  const accountHref = configured ? "/auth/sign-in" : "/how-it-works#accounts";

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHelpOpen(false);
      setMobileOpen(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!helpOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!helpRef.current?.contains(event.target as Node)) {
        setHelpOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setHelpOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [helpOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#141414] text-[#fffbea]">
      <div className="mx-auto grid h-[63px] max-w-[90rem] grid-cols-[auto_1fr_auto] items-center gap-6 px-[5%] md:px-[71px]">
        <div className="relative justify-self-start">
          <BrandStamp />
          <span className="sr-only" aria-live="polite">
            {hud}
            {user
              ? ` · ${syncing ? "Syncing" : mode === "cloud" ? "Cloud" : "Local"}`
              : ""}
          </span>
        </div>

        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3.5 py-[7px] text-sm font-medium transition-colors",
                  active
                    ? "text-[#fffbea]"
                    : "text-[#bbbaad] hover:text-[#fffbea]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="justify-self-end">
          <div className="hidden items-center gap-1 md:flex">
            <div className="relative" ref={helpRef}>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3.5 py-[7px] text-sm font-medium text-[#bbbaad] transition-colors hover:text-[#fffbea]"
                aria-expanded={helpOpen}
                aria-controls={helpMenuId}
                aria-haspopup="menu"
                onClick={() => setHelpOpen((value) => !value)}
              >
                Help
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={cn(
                    "transition-transform duration-150",
                    helpOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {helpOpen ? (
                <div
                  id={helpMenuId}
                  role="menu"
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] border border-[#333] bg-[#fffbea] py-2 text-[#141414] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                >
                  {helpLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={
                        link.href === "/auth/sign-in" && !configured
                          ? "/how-it-works#accounts"
                          : link.href
                      }
                      role="menuitem"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-[#141414] hover:text-[#fffbea]"
                      onClick={() => setHelpOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!loading && user ? (
                    <button
                      type="button"
                      role="menuitem"
                      className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#141414] hover:text-[#fffbea]"
                      onClick={() => {
                        setHelpOpen(false);
                        void handleSignOut();
                      }}
                    >
                      Sign out
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            {!loading && user ? (
              <button
                type="button"
                onClick={() => void handleSignOut()}
                aria-label={`Sign out (${user.email})`}
                title={user.email ?? "Sign out"}
                className="ml-2 inline-flex h-[37px] items-center rounded-[42px] border border-solid border-[#fffbea] px-[17.5px] text-sm font-medium text-[#fffbea] transition-colors hover:border-[#ff7145] hover:text-[#ff7145]"
              >
                Logout
              </button>
            ) : (
              <Link
                href={accountHref}
                className="ml-2 inline-flex h-[37px] items-center rounded-[42px] border border-solid border-[#fffbea] px-[17.5px] text-sm font-medium text-[#fffbea] transition-colors hover:border-[#ff7145] hover:text-[#ff7145]"
              >
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#fffbea] md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.75} />
            ) : (
              <span className="flex w-6 flex-col gap-[5px]" aria-hidden>
                <span className="h-[2px] w-full bg-[#ff7145]" />
                <span className="h-[2px] w-full bg-[#fffbea]" />
                <span className="h-[2px] w-full bg-[#fffbea]" />
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-[#333] bg-[#141414] px-[5%] py-4 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-3 text-base",
                    active ? "text-[#fffbea]" : "text-[#bbbaad]",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {helpLinks.map((link) => (
              <Link
                key={`m-${link.href}-${link.label}`}
                href={
                  link.href === "/auth/sign-in" && !configured
                    ? "/how-it-works#accounts"
                    : link.href
                }
                className="py-3 text-sm text-[#bbbaad]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <button
                type="button"
                className="mt-3 inline-flex h-[37px] w-full items-center justify-center rounded-[42px] border border-solid border-[#fffbea] text-sm font-medium text-[#fffbea]"
                onClick={() => {
                  setMobileOpen(false);
                  void handleSignOut();
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                href={accountHref}
                className="mt-3 inline-flex h-[37px] w-full items-center justify-center rounded-[42px] border border-solid border-[#fffbea] text-sm font-medium text-[#fffbea]"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
