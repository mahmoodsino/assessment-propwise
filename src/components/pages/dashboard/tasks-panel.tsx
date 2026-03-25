"use client";

import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  dashboardDataAtom,
  isLoadingAtom,
  taskOverridesAtom,
  tasksAtom,
  taskProgressAtom,
} from "@/store";
import { Card } from "@/components/ui";
import { Progress } from "@/components/ui";
import { TaskItem } from "./task-item";

export function TasksPanel() {
  const data = useAtomValue(dashboardDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const tasks = useAtomValue(tasksAtom);
  const progress = useAtomValue(taskProgressAtom);
  const [overrides, setOverrides] = useAtom(taskOverridesAtom);

  if (isLoading || !data) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        <div className="p-4 space-y-4">
          <div className="h-4 w-36 rounded-full bg-[var(--color-bg-subtle)]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[var(--color-bg-subtle)] shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 rounded-full bg-[var(--color-bg-subtle)]" />
                <div className="h-2.5 w-1/2 rounded-full bg-[var(--color-bg-subtle)]" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newCompleted = !task.completed;
    setOverrides((prev) => ({ ...prev, [id]: newCompleted }));
    if (newCompleted) {
      toast.success("Task completed", {
        action: {
          label: "Undo",
          onClick: () => setOverrides((prev) => ({ ...prev, [id]: false })),
        },
      });
    }
  };

  const totalProgress =
    progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <Card className="p-0 gap-0">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <p className="font-bold text-[var(--color-content-emphasis)]">
          Tasks & Reminders
        </p>
        <button className="flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-bg-default)] hover:underline">
          <Plus size={13} />
          Quick add
        </button>
      </div>

      <div className="px-4 pb-3">
        <Progress value={totalProgress} color="#3C7E44" className="h-1" />
        <p className="text-[11px] text-[var(--color-content-muted)] text-right mt-1">
          {progress.completed}/{progress.total} done
        </p>
      </div>

      <div className="pb-2">
        {tasks.map((task, i) => (
          <div key={task.id}>
            <TaskItem task={task} onToggle={handleToggle} />
            {i < tasks.length - 1 && (
              <div className="mx-4 border-b border-[var(--color-border-subtle)]" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
