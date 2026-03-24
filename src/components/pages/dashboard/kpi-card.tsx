"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardKPI } from "@/types/dashboard";
import { SparklineChart } from "./sparkline-chart";

interface KpiCardProps {
  kpi: DashboardKPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isUp = kpi.trendDirection === "up";

  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-default)] px-4 py-3.5">
      <div className="flex items-start justify-between gap-2">
        {/* Left: label + value */}
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-[450] text-[#5F5F5F]">{kpi.label}</p>
          <p className="font-[650] text-[var(--color-content-emphasis)] tracking-tight tabular-nums leading-none">
            {kpi.value}
          </p>
        </div>

        {/* Right: spark line + percentage*/}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="w-20">
            <SparklineChart
              data={kpi.sparklineData}
              color={isUp ? "#10b981" : "#ef4444"}
            />
          </div>
          <div
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-semibold",
              isUp ? "text-emerald-500" : "text-red-500"
            )}
          >
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            <span>
              {isUp ? "+" : "-"}
              {kpi.trend}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
