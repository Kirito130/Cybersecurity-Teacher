import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type StampKind = "solid" | "ghost" | "warn";

const stampClass: Record<StampKind, string> = {
  solid: "stamp",
  ghost: "stamp stamp-ghost",
  warn: "stamp stamp-warn",
};

export function Stamp({
  kind = "solid",
  wide,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: StampKind;
  wide?: boolean;
}) {
  return (
    <button className={cn(stampClass[kind], wide && "stamp-wide", className)} {...props}>
      {children}
    </button>
  );
}

export function StampLink({
  href,
  kind = "solid",
  wide,
  className,
  children,
}: {
  href: string;
  kind?: StampKind;
  wide?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(stampClass[kind], wide && "stamp-wide", className)}>
      {children}
    </Link>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="space-y-2">
      <label className="caption" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="warn" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextSlot(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="slot" {...props} />;
}

export function AreaSlot(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="slot" {...props} />;
}

export function SelectSlot(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="slot" {...props} />;
}

export function Meter({ value, max = 10 }: { value: number; max?: number }) {
  const cells = Math.max(1, max);
  const on = Math.round((value / 100) * cells);
  return (
    <span className="bars" aria-hidden="true">
      {Array.from({ length: cells }, (_, i) => (
        <i key={i} data-on={i < on} />
      ))}
    </span>
  );
}

export function Wait({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" role="status" aria-live="polite">
      <span className="wait flex gap-1">
        <i />
        <i />
        <i />
      </span>
      <span className="fine quiet">{label}</span>
    </div>
  );
}

export function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
