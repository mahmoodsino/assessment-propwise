"use client";

import { Info } from "lucide-react";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      closeButton
      gap={8}
      visibleToasts={3}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2.5 w-full rounded-lg px-3.5 py-3 text-[13px] font-medium [box-shadow:0px_0px_8px_0px_#0000000D,0px_2px_2px_0px_#0000001A,0px_1px_2px_0px_#00000014,0px_1px_1px_0px_#00000012]",
          title: "flex-1",
          closeButton:
            "shrink-0 !bg-transparent !border-none !shadow-none !relative !inset-auto !translate-x-0 !translate-y-0",
          icon: "shrink-0",
          default: "bg-[#1a1a1a] text-white",
          success: "bg-[#1a1a1a] text-white",
          error:
            "bg-[var(--color-bg-error)] !text-[#752522] border !border-[var(--color-bg-error)]",
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
