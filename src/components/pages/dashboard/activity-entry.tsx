import {
  ArrowLeftRight,
  FileText,
  Mail,
  Phone,
  StickyNote,
  UserRoundPlus,
  Zap,
} from "lucide-react";
import type { ActivityEntry as ActivityEntryType } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const icons = {
  lead: <UserRoundPlus size={13} />,
  deal: <ArrowLeftRight size={13} />,
  call: <Phone size={13} />,
  email: <Mail size={13} />,
  note: <StickyNote size={13} />,
  task: <FileText size={13} />,
  commission: <Zap size={13} />,
};

interface Props {
  entry: ActivityEntryType;
  isLast?: boolean;
}

export function ActivityEntry({ entry, isLast = false }: Props) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-x-3">
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-[var(--color-bg-default)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-content-subtle)] shrink-0">
          {icons[entry.icon]}
        </div>
        {!isLast && (
          <div className="w-px bg-[var(--color-border-subtle)] grow mt-1" />
        )}
      </div>

      <div className={cn("min-w-0", isLast ? "pb-2" : "pb-4")}>
        <p className="text-xs text-[var(--color-content-default)] leading-snug">
          {tokenize(entry.message, entry.highlights).map((part, i) =>
            part.isHighlight ? (
              <span
                key={i}
                className={
                  part.type === "person" || part.type === "stage"
                    ? "text-[var(--color-brand-bg-default)] font-medium"
                    : "font-bold text-[var(--color-content-emphasis)]"
                }
              >
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
        <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
          {entry.relativeTime}
        </p>
      </div>
    </div>
  );
}

function tokenize(
  message: string,
  highlights: ActivityEntryType["highlights"]
) {
  if (!highlights?.length) return [{ text: message, isHighlight: false }];

  const result: { text: string; isHighlight: boolean; type?: string }[] = [];
  let remaining = message;

  for (const h of highlights) {
    const idx = remaining.indexOf(h.text);
    if (idx === -1) continue;
    if (idx > 0)
      result.push({ text: remaining.slice(0, idx), isHighlight: false });
    result.push({ text: h.text, isHighlight: true, type: h.type });
    remaining = remaining.slice(idx + h.text.length);
  }

  if (remaining) result.push({ text: remaining, isHighlight: false });
  return result;
}
