"use client";

import { useAtomValue } from "jotai";
import { dashboardDataAtom, isLoadingAtom } from "@/store";
import { formatCurrency, cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { PipelineBar } from "@/components/ui/progress";
import { ArrowUpRight } from "lucide-react";

type StageVariant = "navy" | "muted" | "green";

// Maps stage index to bar style and label color
const stageVariants: StageVariant[] = [
  "navy",
  "muted",
  "navy",
  "muted",
  "green",
  "green",
];
const stageLabelClass = (v: StageVariant) =>
  v === "muted"
    ? "text-[var(--color-content-muted)]"
    : "text-[var(--color-content-default)]";

export function PipelineSummary() {
  const data = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  if (isLoading || !data) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        <div className="p-4 space-y-2 mb-2">
          <div className="h-4 w-36 rounded-full bg-[var(--color-bg-subtle)]" />
          <div className="h-3 w-48 rounded-full bg-[var(--color-bg-subtle)]" />
        </div>
        <div className="px-4 pb-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-20 rounded-full bg-[var(--color-bg-subtle)] shrink-0" />
              <div className="h-9 rounded-full bg-[var(--color-bg-subtle)] flex-1" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const { pipeline } = data;
  const maxCount = Math.max(...pipeline.stages.map((s) => s.count));

  return (
    <Card className="p-0 gap-0">
      <div className="flex items-start justify-between px-5 pt-4 pb-4">
        <div>
          <p className="font-semibold text-[var(--color-content-emphasis)]">
            Pipeline Summary
          </p>
          <p className="text-xs text-[var(--color-content-subtle)] mt-0.5">
            {pipeline.totalDeals} deals across {pipeline.stages.length} stages ·{" "}
            {pipeline.totalValue} total value
          </p>
        </div>
        <a
          href="#"
          className="text-xs font-semibold text-[var(--color-brand-bg-default)] hover:underline flex items-center gap-0.5 shrink-0 mt-0.5"
        >
          Details
          <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="px-5 pb-5 space-y-2">
        {pipeline.stages.map((stage, i) => {
          const variant = stageVariants[i] ?? "navy";
          const widthPct = Math.max((stage.count / maxCount) * 100, 10);

          return (
            <div key={stage.stage} className="flex items-center gap-3">
              <span
                className={cn(
                  "text-xs font-medium w-24 shrink-0 text-right",
                  stageLabelClass(variant)
                )}
              >
                {stage.stage}
              </span>
              <div className="flex-1">
                <PipelineBar
                  value={widthPct}
                  count={stage.count}
                  label={formatCurrency(stage.value, stage.currency)}
                  variant={variant}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
