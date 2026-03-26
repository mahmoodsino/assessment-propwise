import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib";

const variants = {
  default: "bg-[var(--color-brand-bg-default)] text-white hover:bg-brand-700",
  brand: "bg-[var(--color-brand-bg-default)] text-white hover:bg-brand-700",
  outline:
    "border border-[var(--color-border-default)] bg-[var(--color-bg-default)] text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)]",
  secondary:
    "bg-[var(--color-bg-subtle)] text-[var(--color-content-default)] hover:bg-[var(--color-bg-emphasis)]",
  ghost:
    "text-[var(--color-content-subtle)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-content-default)]",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  link: "text-[var(--color-brand-bg-default)] underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-9 px-3.5 gap-1.5",
  xs: "h-6 px-2 gap-1 text-xs rounded-md",
  sm: "h-7 px-2.5 gap-1 text-xs rounded-md",
  lg: "h-10 px-4 gap-2",
  xl: "h-11 px-5 gap-2 text-base",
  icon: "size-9",
  "icon-xs": "size-6 rounded-md",
  "icon-sm": "size-7 rounded-md",
  "icon-lg": "size-10",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-brand-bg-default)] focus-visible:ring-offset-1",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
