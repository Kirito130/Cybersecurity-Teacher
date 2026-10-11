import Link from "next/link";
import { cn } from "@/lib/utils";

/** Serrated stamp mark matching Tonemaki desktop logo treatment. */
export function BrandStamp({
  href = "/",
  className,
  label = "CyberXP™",
}: {
  href?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="CyberXP home"
      className={cn(
        "relative inline-flex h-11 items-center justify-center px-4",
        "bg-[#dad6c8] text-[#141414]",
        "font-display text-[0.9375rem] font-extrabold uppercase tracking-[0.04em]",
        "origin-center",
        className,
      )}
      style={{
        transform: "rotate(-3deg)",
        clipPath:
          "polygon(0% 12%,2.5% 0%,7% 10%,12% 0%,17% 11%,22% 0%,27% 10%,32% 0%,37% 11%,42% 0%,47% 10%,52% 0%,57% 11%,62% 0%,67% 10%,72% 0%,77% 11%,82% 0%,87% 10%,92% 0%,97% 11%,100% 0%,100% 88%,97.5% 100%,93% 90%,88% 100%,83% 89%,78% 100%,73% 90%,68% 100%,63% 89%,58% 100%,53% 90%,48% 100%,43% 89%,38% 100%,33% 90%,28% 100%,23% 89%,18% 100%,13% 90%,8% 100%,3% 89%,0% 100%)",
      }}
    >
      {label}
    </Link>
  );
}
