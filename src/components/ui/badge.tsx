import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap transition-all [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand-bg-default)] text-[var(--color-content-inverted)]",
        brand:
          "bg-[var(--color-brand-bg-subtle)] text-[var(--color-brand-bg-default)]",
        success:
          "bg-[var(--color-bg-success)] text-[var(--color-content-success)]",
        destructive:
          "bg-[var(--color-bg-error)] text-[var(--color-content-error)]",
        warning:
          "bg-[var(--color-bg-attention)] text-[var(--color-content-attention)]",
        info: "bg-[var(--color-bg-info)] text-[var(--color-content-info)]",
        outline:
          "border-[var(--color-border-default)] text-[var(--color-content-default)] bg-transparent",
        secondary:
          "bg-[var(--color-bg-subtle)] text-[var(--color-content-subtle)]",
        ghost:
          "text-[var(--color-content-subtle)] hover:bg-[var(--color-bg-subtle)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
