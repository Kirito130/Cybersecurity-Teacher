import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow,transform] duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-phosphor text-ink border border-coral-dim shadow-[0_2px_0_#c44a2a] hover:bg-phosphor-bright active:translate-y-px active:shadow-none px-5 py-2.5 text-sm",
        secondary:
          "bg-wasabi text-ink border border-[#08c23c] shadow-[0_2px_0_#068a2c] hover:brightness-110 active:translate-y-px active:shadow-none px-5 py-2.5 text-sm",
        ghost:
          "bg-transparent text-sand hover:bg-ink-muted hover:text-paper px-3 py-2 text-sm",
        outline:
          "border border-paper bg-transparent text-paper hover:border-phosphor hover:text-phosphor px-5 py-2.5 text-sm",
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
