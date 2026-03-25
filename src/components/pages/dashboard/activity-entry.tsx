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

const ICONS = {
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
          {ICONS[entry.icon]}
        </div>
        {!isLast && (
          <div className="w-px bg-[var(--color-border-subtle)] grow mt-1" />
        )}
      </div>

      <div className={cn("min-w-0", isLast ? "pb-2" : "pb-4")}>
        <p className="text-xs text-[var(--color-content-default)] leading-snug">
          <MessageWithHighlights
            message={entry.message}
            highlights={entry.highlights}
          />
        </p>
        <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
          {entry.relativeTime}
        </p>
      </div>
    </div>
  );
}

function MessageWithHighlights({
  message,
  highlights,
}: {
  message: string;
  highlights: ActivityEntryType["highlights"];
}) {
  if (!highlights?.length) return <>{message}</>;

  const parts: { text: string; type?: string }[] = [];
  let rest = message;

  for (const h of highlights) {
    const i = rest.indexOf(h.text);
    if (i === -1) continue;
    if (i > 0) parts.push({ text: rest.slice(0, i) });
    parts.push({ text: h.text, type: h.type });
    rest = rest.slice(i + h.text.length);
  }

  if (rest) parts.push({ text: rest });

  return (
    <>
      {parts.map((part, i) =>
        part.type ? (
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
        ),
      )}
    </>
  );
}
