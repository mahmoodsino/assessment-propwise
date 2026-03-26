"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { cn } from "@/lib";

const avatarSizeClasses = {
  xs: "size-6  text-[9px]",
  sm: "size-8  text-[11px]",
  md: "size-10 text-[13px]",
  lg: "size-12 text-[14px]",
  xl: "size-16 text-[16px]",
  "2xl": "size-20 text-[18px]",
} as const;

type AvatarSize = keyof typeof avatarSizeClasses;

function Avatar({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full shrink-0",
        avatarSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square w-full h-full rounded-full object-cover overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex items-center justify-center w-full h-full rounded-full",
        "bg-[var(--color-bg-subtle)] text-[var(--color-content-default)] font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute -right-1 -bottom-1 inline-flex items-center justify-center border border-[var(--color-border-subtle)]",
        "rounded-full bg-white p-0.5 ring-[var(--color-bg-default)] select-none",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2",
        "[&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-[var(--color-bg-default)]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "bg-[var(--color-bg-subtle)] text-[var(--color-content-subtle)]",
        "text-[11px] font-semibold",
        "ring-2 ring-[var(--color-bg-default)]",
        "size-8",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  type AvatarSize,
};
