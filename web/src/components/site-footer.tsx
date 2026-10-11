import Link from "next/link";
import { Award, BookOpen, Map, User } from "lucide-react";
import { BrandStamp } from "@/components/brand-stamp";

const utilityIcons = [
  { href: "/roadmap", label: "Roadmap", Icon: Map },
  { href: "/badges", label: "Badges", Icon: Award },
  { href: "/how-it-works", label: "How it works", Icon: BookOpen },
  { href: "/auth/sign-in", label: "Sign in", Icon: User },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#141414] text-[#fffbea]">
      <div className="mx-auto max-w-[90rem] px-[5%] py-12 md:px-[71px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-[21px] gap-y-2">
            <Link
              href="/roadmap"
              className="text-sm font-medium text-[#ff7145] transition-colors hover:text-[#ff8f6a]"
            >
              Start path
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-sm font-medium text-[#dad6c8] transition-colors hover:text-[#fffbea]"
            >
              Sign in
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-[10.5px]">
            {utilityIcons.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="inline-flex h-[21px] w-[21px] items-center justify-center text-[#575757] transition-colors hover:text-[#dad6c8]"
              >
                <Icon size={18} strokeWidth={1.6} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-[#333] pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <BrandStamp className="h-9 self-start text-xs" />
            <p className="text-sm text-[#bbbaad]">
              Built for clearance learners · CyberXP™
            </p>
            <p className="text-sm text-[#bbbaad]">© 2026 CyberXP™</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#bbbaad]">
            <Link
              href="/how-it-works"
              className="transition-colors hover:text-[#fffbea]"
            >
              How it works
            </Link>
            <Link
              href="/how-it-works#accounts"
              className="transition-colors hover:text-[#fffbea]"
            >
              Accounts
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
