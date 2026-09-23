import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Outer shell radius — design.md §4A calls for exaggerated squircle radii. */
export const SHELL_RADIUS = "rounded-[2rem]";
/** Shell padding. The inner core's radius is derived from this value. */
export const SHELL_PADDING = "p-1.5";
/** Concentric inner radius: outer radius minus shell padding. */
export const CORE_RADIUS = "rounded-[calc(2rem-0.375rem)]";

interface BezelProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Overrides for the inner core (background, padding, radius) */
  innerClassName?: string;
}

/**
 * design.md §4A — the "Double-Bezel" (Doppelrand) housing.
 *
 * Premium surfaces must never sit flat on the background; they should read as a
 * machined plate seated in a tray. The outer shell carries the hairline ring and
 * the padding; the inner core owns the background and a top inset highlight, with
 * a mathematically concentric radius.
 */
export default function Bezel({
  children,
  className,
  innerClassName,
  as: Tag = "div",
}: BezelProps) {
  return (
    <Tag
      className={cn(
        SHELL_RADIUS,
        SHELL_PADDING,
        "bg-black/[0.035] ring-1 ring-black/5",
        "dark:bg-white/[0.045] dark:ring-white/10",
        className
      )}
    >
      <div
        className={cn(
          CORE_RADIUS,
          "h-full bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
          "dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
