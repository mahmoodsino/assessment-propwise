"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md border", className)}
      {...props}
    />
  );
}
