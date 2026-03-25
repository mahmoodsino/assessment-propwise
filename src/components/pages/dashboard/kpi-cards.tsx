"use client";

import { useAtomValue } from "jotai";
import { dashboardDataAtom, isLoadingAtom } from "@/store";
import { KpiCard } from "./kpi-card";

export function KpiCards() {
  const data = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-default)] px-4 py-3.5 h-[106px] overflow-hidden relative"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
            <div className="h-2.5 w-20 rounded-full bg-[var(--color-bg-subtle)] mb-3" />
            <div className="h-6 w-16 rounded-full bg-[var(--color-bg-subtle)] mb-2.5" />
            <div className="h-2 w-12 rounded-full bg-[var(--color-bg-subtle)]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 tablet-s:grid-cols-2 sm:grid-cols-4 gap-3">
      {data.kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
