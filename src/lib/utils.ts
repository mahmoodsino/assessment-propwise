import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "AED"): string {
  if (value >= 1000000) return `${currency} ${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${currency} ${(value / 1000).toFixed(0)}K`;
  return `${currency} ${value.toLocaleString()}`;
}
