import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow,transform] duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-phosphor text-crt border border-phosphor-dim shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_0_#1f8a34] hover:bg-phosphor-bright active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] px-5 py-2.5 text-sm",
        secondary:
          "bg-keycap text-text-on-crt border border-olive shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_0_#2a2a26] hover:bg-olive active:translate-y-px px-5 py-2.5 text-sm",
        ghost:
          "bg-transparent text-text-on-console hover:bg-bezel/40 px-3 py-2 text-sm",
        outline:
          "border-2 border-keycap bg-console text-text-on-console hover:border-phosphor hover:text-phosphor-dim px-5 py-2.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
        danger:
          "bg-danger/15 text-danger border border-danger/40 hover:bg-danger/25 px-4 py-2 text-sm",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-3 text-xs",
        lg: "min-h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
