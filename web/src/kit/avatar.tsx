import { cn } from "@/lib/utils";

function DefaultMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect width="16" height="16" fill="currentColor" className="text-[var(--act)]" />
      <path
        fill="var(--color-paper)"
        d="M2 4h1v2H2zM6 4h1v2H6zM3 6h1v1H3zM5 6h1v1H5zM4 7h1v1H4zM3 8h1v1H3zM5 8h1v1H5zM2 9h1v2H2zM6 9h1v2H6zM9 4h1v7H9zM10 4h3v1h-3zM10 7h2v1h-2zM13 5h1v2h-1z"
      />
    </svg>
  );
}

/** Decorative avatar beside a labelled control. Empty alt keeps the nearby username as the name. */
export function UserAvatar({
  url,
  size = 28,
  className,
}: {
  url?: string | null;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("avatar", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element -- public Supabase storage URL
        <img src={url} alt="" width={size} height={size} />
      ) : (
        <DefaultMark className="h-full w-full" />
      )}
    </span>
  );
}
