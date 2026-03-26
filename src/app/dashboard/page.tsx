"use client";

import { useState } from "react";
import { Sidebar } from "@/components";
import {
  ActivityFeed,
  DashboardHeader,
  DateFilterTabs,
  KpiCards,
  PipelineSummary,
  RevenueForecast,
  TasksPanel,
} from "@/components";
import { useDashboard } from "@/hooks";
import { Toaster } from "@/components";

export default function DashboardPage() {
  const { activePeriod, changePeriod, reload } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 sm:ml-52 sm:m-3 sm:rounded-xl bg-[var(--color-bg-default)]">
        <main className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-5">
          <DashboardHeader
            onSimulateError={() => reload(activePeriod, false, true)}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <DateFilterTabs value={activePeriod} onChange={changePeriod} />
          <KpiCards />
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-stretch">
            <div className="sm:col-span-3">
              <RevenueForecast />
            </div>
            <div className="sm:col-span-2 flex">
              <ActivityFeed className="flex-1 max-h-[350px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="sm:col-span-3">
              <PipelineSummary />
            </div>
            <div className="sm:col-span-2">
              <TasksPanel />
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
