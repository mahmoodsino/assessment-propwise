"use client";

import { Menu, Plus, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/ui";

interface Props {
  onMenuClick?: () => void;
  onSimulateError?: () => void;
}

export function DashboardHeader({ onMenuClick, onSimulateError }: Props) {
  const actions = (
    <div className="flex items-center gap-2 shrink-0">
      <ThemeToggle />
      {onSimulateError && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onSimulateError}
          title="Simulate API failure"
        >
          <WifiOff size={15} />
        </Button>
      )}
      <Button
        variant="brand"
        size="default"
        onClick={() => toast("Feature coming soon")}
      >
        <Plus size={14} />
        Create
      </Button>
    </div>
  );

  return (
    <div className="flex items-center justify-between gap-4 bg-[var(--color-bg-default)] pt-4">
      <div className="flex flex-col tablet-s:flex-row tablet-s:items-center gap-2 w-full">
        <div className="tablet-s:flex-none flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden border"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </Button>
          <div className="flex tablet-s:hidden">{actions}</div>
        </div>

        <div>
          <h1 className="text-lg font-bold text-[var(--color-content-emphasis)] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[var(--color-content-subtle)] mt-0.5">
            Here&apos;s your pipeline health and sales activity at a glance.
          </p>
        </div>
      </div>

      <div className="hidden tablet-s:flex">{actions}</div>
    </div>
  );
}
