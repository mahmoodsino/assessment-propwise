import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { DashboardData, Period, Task } from "@/types/dashboard";

export const activePeriodAtom = atomWithStorage<Period>(
  "propwise-period",
  "today"
);
export const dashboardDataAtom = atom<DashboardData | null>(null);
export const isLoadingAtom = atom<boolean>(true);
export const hasErrorAtom = atom<boolean>(false);
export const taskOverridesAtom = atom<Record<string, boolean>>({});

export const tasksAtom = atom((get) => {
  const data = get(dashboardDataAtom);
  const overrides = get(taskOverridesAtom);
  if (!data) return [];
  return data.tasks.items.map((t: Task) => ({
    ...t,
    completed: overrides[t.id] ?? t.completed,
  }));
});

export const taskProgressAtom = atom((get) => {
  const tasks = get(tasksAtom);
  return {
    completed: tasks.filter((t) => t.completed).length,
    total: tasks.length,
  };
});
