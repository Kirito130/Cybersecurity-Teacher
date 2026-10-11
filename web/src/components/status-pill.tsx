import { cn } from "@/lib/utils";

type Status = "locked" | "available" | "in-progress" | "cleared";

const lamp: Record<Status, string> = {
  locked: "bg-locked shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]",
  available: "bg-phosphor shadow-[0_0_8px_color-mix(in_oklab,var(--phosphor)_55%,transparent)]",
  "in-progress":
    "bg-phosphor-bright shadow-[0_0_8px_color-mix(in_oklab,var(--phosphor-bright)_55%,transparent)]",
  cleared:
    "bg-cleared shadow-[0_0_8px_color-mix(in_oklab,var(--cleared)_50%,transparent)]",
};

const styles: Record<Status, string> = {
  locked: "bg-console-deep text-text-on-console-muted border-bezel",
  available: "bg-crt text-phosphor-bright border-crt-line",
  "in-progress": "bg-crt text-phosphor border-phosphor-dim",
  cleared: "bg-crt text-cleared border-cleared/50",
};

const labels: Record<Status, string> = {
  locked: "Offline",
  available: "Standby",
  "in-progress": "Active",
  cleared: "Cleared",
};

export function StatusPill({
  status,
  className,
}: {
  status: Status;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
        styles[status],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-2 w-2 shrink-0 rounded-full", lamp[status])}
      />
      {labels[status]}
    </span>
  );
}
