"use client";

import { ArrowUpRight } from "lucide-react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { dashboardDataAtom, isLoadingAtom } from "@/store";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ActivityEntry } from "./activity-entry";
import type { ActivityEntry as ActivityEntryType } from "@/types/dashboard";

// Simulated new entries that get prepended on refresh
const newEntries: ActivityEntryType[] = [
  {
    id: "new-1",
    message: "You were assigned a new lead: Ahmed Al-Rashid",
    highlights: [{ text: "Ahmed Al-Rashid", type: "person" }],
    timestamp: new Date().toISOString(),
    relativeTime: "Just now",
    icon: "lead",
  },
  {
    id: "new-2",
    message: "System transferred deal to Negotiation stage",
    highlights: [{ text: "Negotiation stage", type: "stage" }],
    timestamp: new Date().toISOString(),
    relativeTime: "Just now",
    icon: "deal",
  },
  {
    id: "new-3",
    message: "Nadia K. logged a call with James Chen",
    highlights: [{ text: "James Chen", type: "person" }],
    timestamp: new Date().toISOString(),
    relativeTime: "Just now",
    icon: "call",
  },
];

let newEntryIndex = 0;

export function ActivityFeed({ className }: { className?: string }) {
  const data = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  // Local state to hold prepended entries
  const [liveEntries, setLiveEntries] = useState<ActivityEntryType[]>([]);

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      const next = newEntries[newEntryIndex % newEntries.length];
      newEntryIndex++;

      // Prepend new entry with a unique id each time
      setLiveEntries((prev) => [
        { ...next, id: `live-${Date.now()}`, relativeTime: "Just now" },
        ...prev.slice(0, 2),
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading || !data) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        <div className="p-4 space-y-4">
          <div className="h-4 w-28 rounded-full bg-[var(--color-bg-subtle)]" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[var(--color-bg-subtle)] shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-full rounded-full bg-[var(--color-bg-subtle)]" />
                <div className="h-2.5 w-16 rounded-full bg-[var(--color-bg-subtle)]" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const { activities } = data;

  return (
    <Card className={cn("p-0 gap-0 flex flex-col", className)}>
      {/* Title */}
      <div className="px-4 pt-4 pb-3 shrink-0 flex items-center justify-between">
        <p className="font-semibold text-[var(--color-content-emphasis)]">
          Activity Feed
        </p>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-300",
            )}
          />
          <span className="text-[10px] text-[var(--color-content-muted)]">
            Live
          </span>
        </div>
      </div>

      {/* Scrollable groups */}
      <div className="flex-1 overflow-y-auto">
        {/* Live entries — prepended at top */}
        {liveEntries.length > 0 && (
          <div>
            <div className="px-4 py-1.5 bg-[var(--color-bg-subtle)] sticky top-0 z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-content-muted)]">
                Just now
              </p>
            </div>
            <div className="px-4 pt-3 pb-1">
              {liveEntries.map((entry, ei) => (
                <ActivityEntry
                  key={entry.id}
                  entry={entry}
                  isLast={ei === liveEntries.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Original groups */}
        {activities.groups.map((group) => (
          <div key={group.label}>
            <div className="px-4 py-1.5 bg-[var(--color-bg-subtle)] sticky top-0 z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-content-muted)]">
                {group.label}
              </p>
            </div>
            <div className="px-4 pt-3 pb-1">
              {group.entries.map((entry, ei) => (
                <ActivityEntry
                  key={entry.id}
                  entry={entry}
                  isLast={ei === group.entries.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--color-border-subtle)] px-4 py-3 text-center shrink-0">
        <a
          href="#"
          className="text-xs font-semibold text-[var(--color-brand-bg-default)] hover:underline inline-flex items-center gap-1"
        >
          View full activity log
          <ArrowUpRight size={13} />
        </a>
      </div>
    </Card>
  );
}
