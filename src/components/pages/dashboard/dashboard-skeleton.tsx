"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui/skeleton";

interface DashboardSkeletonProps {
  className?: string;
}

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return <Skeleton className={cn("rounded-xl ", className)} />;
}
