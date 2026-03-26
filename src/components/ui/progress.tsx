"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib";

interface ProgressProps extends React.ComponentProps<
  typeof ProgressPrimitive.Root
> {
  value?: number;
  color?: string;
}

function Progress({ className, value = 0, color, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg-subtle)]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${value}%`,
          backgroundColor: color ?? "var(--color-brand-bg-default)",
        }}
      />
    </ProgressPrimitive.Root>
  );
}

interface PipelineBarProps {
  /** 0–100 percentage width relative to max */
  value: number;
  count: number;
  label: string;
  variant?: "navy" | "muted" | "green";
  className?: string;
}

function PipelineBar({
  value,
  count,
  label,
  variant = "navy",
  className,
}: PipelineBarProps) {
  const styles = {
    navy: {
      bar: "bg-brand-800",
      badge: "bg-white/20 text-white",
      text: "text-blue-200",
    },
    muted: {
      bar: "bg-brand-800 blur-[1px]",
      badge: "bg-white/20 text-white",
      text: "text-[#7A80A8]",
    },
    green: {
      bar: "bg-emerald-100",
      badge: "bg-white/20 text-black",
      text: "text-emerald-700",
    },
  } as const;

  const PipelineStyle = styles[variant];
  const widthPipeline = Math.max(value, 10);

  return (
    <div
      className={cn(
        "h-9 rounded-lg flex items-center px-1.5 gap-2 transition-all duration-500",
        PipelineStyle.bar,
        className,
      )}
      style={{ width: `${widthPipeline}%` }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "flex items-center gap-1 rounded-lg px-2 py-0.5 leading-none shrink-0 text-[11px]",
          PipelineStyle.badge,
        )}
      >
        <span className={cn("font-bold")}>{count}</span>
        <span className={cn("font-medium")}>{label}</span>
      </div>
    </div>
  );
}

export { Progress, PipelineBar };
