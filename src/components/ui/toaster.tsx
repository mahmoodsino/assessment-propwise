"use client";

import { Toaster as SonnerToaster } from "sonner";
import { Info, X } from "lucide-react";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      closeButton
      gap={8}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2.5 w-full rounded-lg px-3.5 py-3 text-[13px] font-medium",
          title: "flex-1",
          closeButton:
            "shrink-0 !bg-transparent !border-none !shadow-none !relative !inset-auto !translate-x-0 !translate-y-0",
          icon: "shrink-0",
          default: "bg-[#1a1a1a] text-white",
          success: "bg-[#1a1a1a] text-white",
          error:
            "bg-[var(--color-bg-error)] text-[var(--color-content-error)] border border-[var(--color-bg-error)]",
          warning:
            "bg-[var(--color-bg-attention)] text-[var(--color-content-attention)] border border-[var(--color-bg-attention)]",
          info: "bg-[#1a1a1a] text-white",
        },
      }}
      icons={{
        success: <Info size={15} className="shrink-0" />,
        error: <Info size={15} className="shrink-0" />,
        warning: <Info size={15} className="shrink-0" />,
        info: <Info size={15} className="shrink-0" />,
      }}
    />
  );
}
