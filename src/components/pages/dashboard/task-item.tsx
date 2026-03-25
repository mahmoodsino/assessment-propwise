"use client";

import {
  Mail,
  Phone,
  Video,
  FileText,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/dashboard";

const typeIcon = {
  task: <FileText size={11} />,
  email: <Mail size={11} />,
  meeting: <Video size={11} />,
  call: <Phone size={11} />,
};

const typeColor = {
  task: "bg-grey-100 text-grey-500",
  email: "bg-blue-50 text-blue-600",
  meeting: "bg-violet-50 text-violet-600",
  call: "bg-blue-50 text-blue-600",
};

const priorityColor = {
  low: "text-emerald-600",
  med: "text-amber-500",
  high: "text-red-500",
};

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: Props) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 transition-colors",
        !task.isOverdue && "hover:bg-[var(--color-bg-subtle)]",
        task.completed && "opacity-50",
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 shrink-0 text-[var(--color-content-muted)] hover:text-[var(--color-brand-bg-default)] transition-colors"
      >
        {task.completed ? (
          <CheckCircle2
            size={16}
            className="text-[var(--color-content-muted)]"
          />
        ) : (
          <Circle size={16} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-[13px] font-medium text-[var(--color-content-emphasis)] leading-snug",
            task.completed && "line-through text-[var(--color-content-muted)]",
          )}
        >
          {task.title}
        </p>

        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          {task.isOverdue ? (
            <>
              <AlertTriangle size={11} className="text-red-500 shrink-0" />
              <span className="text-[11px] font-medium text-red-500">
                {task.dueLabel}
              </span>
            </>
          ) : (
            <>
              <Clock
                size={11}
                className="text-[var(--color-content-muted)] shrink-0"
              />
              <span className="text-[11px] text-[var(--color-content-muted)]">
                {task.dueLabel}
              </span>
            </>
          )}

          <span
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
              typeColor[task.type],
            )}
          >
            {typeIcon[task.type]}
            {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
          </span>
        </div>
      </div>

      {!task.completed && task.priority && (
        <span
          className={cn(
            "text-[12px] font-semibold shrink-0 mt-0.5",
            priorityColor[task.priority],
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      )}
    </div>
  );
}
