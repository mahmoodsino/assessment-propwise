"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Period } from "@/types/dashboard";

const tabs = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Quarter", value: "this_quarter" },
  { label: "This Year", value: "this_year" },
  { label: "Custom", value: "custom" },
] as const;

interface Props {
  value: Period;
  onChange: (period: Period) => void;
}

export function DateFilterTabs({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const active = activeRef.current;
    if (!container || !active) return;
    const cr = container.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    setIndicator({ left: ar.left - cr.left, width: ar.width });
  }, [value]);

  return (
    <div className="overflow-x-auto scrollbar-none">
      <div
        ref={containerRef}
        className="relative flex items-center gap-0.5 p-1 rounded-lg bg-[var(--color-bg-subtle)] w-fit"
      >
        {/* Animated sliding indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-lg bg-[var(--color-bg-default)] shadow-sm transition-all duration-200 ease-in-out"
          style={{ left: indicator.left, width: indicator.width }}
        />

        {tabs.map((tab, index) => {
          const isActive = value === tab.value;
          return (
            <button
              key={tab.value}
              ref={isActive ? activeRef : undefined}
              type="button"
              onClick={() => onChange(tab.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(tab.value);
                }
                if (e.key === "ArrowRight" && tabs[index + 1])
                  onChange(tabs[index + 1].value);
                if (e.key === "ArrowLeft" && tabs[index - 1])
                  onChange(tabs[index - 1].value);
              }}
              aria-pressed={isActive}
              className={cn(
                "relative z-10 px-4 py-1 rounded-lg text-[13px] font-[450] transition-colors duration-200 whitespace-nowrap",
                "focus:outline-none focus-visible:ring-2",
                isActive
                  ? "text-[var(--color-content-default)] font-medium"
                  : "text-[var(--color-content-muted)] hover:text-[var(--color-content-subtle)] hover:bg-[var(--color-bg-emphasis)]",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
