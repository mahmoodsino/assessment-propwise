"use client";

import { cn } from "@/lib/utils";
import type { Period } from "@/types/dashboard";

interface Tab {
  label: string;
  value: Period;
}

const TABS: Tab[] = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Quarter", value: "this_quarter" },
  { label: "This Year", value: "this_year" },
  { label: "Custom", value: "custom" },
];

interface DateFilterTabsProps {
  value: Period;
  onChange: (period: Period) => void;
}

export function DateFilterTabs({ value, onChange }: DateFilterTabsProps) {
  return (
    <div className="flex items-center gap-0.5 p-1 rounded-lg bg-[var(--color-bg-subtle)] w-fit flex-wrap">
      {TABS.map((tab, index) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(tab.value);
            }
            if (e.key === "ArrowRight") {
              const next = TABS[index + 1];
              if (next) onChange(next.value);
            }
            if (e.key === "ArrowLeft") {
              const prev = TABS[index - 1];
              if (prev) onChange(prev.value);
            }
          }}
          aria-pressed={value === tab.value}
          className={cn(
            "px-4 py-1 rounded-lg text-[13px] font-[450] transition-all duration-200",
            "focus:outline-none focus-visible:ring-2",
            value === tab.value
              ? "bg-[var(--color-bg-default)] text-[var(--color-content-default)] font-medium shadow-sm"
              : "text-[var(--color-content-muted)] hover:text-[var(--color-content-subtle)] hover:bg-[var(--color-bg-emphasis)]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
