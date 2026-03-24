"use client";

import { Menu, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[var(--color-bg-default)] pt-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-[var(--color-content-emphasis)] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[var(--color-content-subtle)] mt-0.5">
            Here&apos;s your pipeline health and sales activity at a glance.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />
        <Button
          variant="brand"
          size="default"
          onClick={() => toast("Feature coming soon")}
        >
          <Plus size={14} />
          Create
        </Button>
      </div>
    </div>
  );
}
