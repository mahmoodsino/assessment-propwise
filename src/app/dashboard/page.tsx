"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import {
  ActivityFeed,
  DashboardHeader,
  DateFilterTabs,
  KpiCards,
  PipelineSummary,
  RevenueForecast,
  TasksPanel,
} from "@/components/pages/dashboard";
import { useDashboard } from "@/hooks/use-dashboard";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardPage() {
  const { activePeriod, changePeriod } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — hidden off-screen on mobile, always visible on lg+ */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — no left padding on mobile, sidebar-width padding on desktop */}
      <div className="flex-1 min-w-0 lg:ml-52 m-3 rounded-xl bg-[var(--color-bg-default)]">
        <main className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-5">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <DateFilterTabs value={activePeriod} onChange={changePeriod} />
          <KpiCards />
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 items-stretch">
            <div className="xl:col-span-3">
              <RevenueForecast />
            </div>
            <div className="xl:col-span-2 flex">
              <ActivityFeed className="flex-1 max-h-[350px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-3">
              <PipelineSummary />
            </div>
            <div className="xl:col-span-2">
              <TasksPanel />
            </div>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
