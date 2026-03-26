"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAtomValue } from "jotai";
import { dashboardDataAtom, isLoadingAtom } from "@/store";
import { Card } from "@/components/ui/card";

export function RevenueForecast({ className }: { className?: string }) {
  const data = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  if (isLoading || !data) {
    return (
      <Card className="h-72 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        <div className="space-y-2 p-1">
          <div className="h-3 w-32 rounded-full bg-[var(--color-bg-subtle)]" />
          <div className="h-8 w-40 rounded-full bg-[var(--color-bg-subtle)]" />
          <div className="h-3 w-20 rounded-full bg-[var(--color-bg-subtle)]" />
        </div>
        <div className="mt-4 h-40 w-full rounded-lg bg-[var(--color-bg-subtle)]" />
      </Card>
    );
  }

  const { revenue } = data;

  return (
    <Card className={cn("gap-0 p-0 h-full flex flex-col", className)}>
      <div className="flex items-start justify-between px-5 pt-4 pb-2">
        <div>
          <p className="text-sm text-[var(--color-content-subtle)]">
            Revenue Forecast
          </p>

          <div className="flex items-baseline gap-2 mt-1 flex-wrap">
            <p className="text-[28px] font-bold text-[var(--color-content-emphasis)] tabular-nums tracking-tight leading-none">
              {revenue.total}
            </p>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-500">
              <TrendingUp size={11} />+{revenue.trend}%
            </span>
            <span className="text-xs text-[var(--color-content-muted)]">
              vs last year
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2.5">
            <span className="flex items-center gap-1.5 font-medium text-[11px] text-[var(--color-content-subtle)]">
              <svg width="16" height="8" viewBox="0 0 16 8">
                <line
                  x1="0"
                  y1="4"
                  x2="16"
                  y2="4"
                  stroke="var(--color-brand-bg-default)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              This year
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-content-subtle)]">
              <svg width="16" height="8" viewBox="0 0 16 8">
                <line
                  x1="0"
                  y1="4"
                  x2="16"
                  y2="4"
                  stroke="var(--color-border-default)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Last year
            </span>
          </div>
        </div>

        <a
          href="#"
          className="text-xs font-semibold text-[var(--color-brand-bg-default)] hover:underline flex items-center gap-0.5 mt-0.5 shrink-0"
        >
          Report
          <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="px-1 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={revenue.data}
            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="rev-this" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-brand-bg-default)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-brand-bg-default)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="rev-last" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-border-default)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-border-default)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* Only horizontal grid lines */}
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="var(--color-border-subtle)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--color-content-muted)" }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--color-content-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v === 0 ? "$0K" : `$${v >= 1000 ? `${v / 1000}K` : v}`
              }
              width={52}
            />

            <Tooltip
              contentStyle={{
                background: "var(--color-bg-default)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--color-content-default)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
              cursor={{ stroke: "var(--color-border-default)", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="var(--color-border-default)"
              strokeWidth={1.5}
              fill="url(#rev-last)"
              dot={false}
            />

            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-brand-bg-default)"
              strokeWidth={2}
              fill="url(#rev-this)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
