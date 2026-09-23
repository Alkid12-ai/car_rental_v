import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** Small uppercase label above the title */
  eyebrow?: string;
  align?: "left" | "center";
  /** Optional element rendered on the right (e.g. a link or button) */
  action?: ReactNode;
  className?: string;
  /** Heading level for correct document outline */
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  action,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className="inline-flex rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-foreground">
            {eyebrow}
          </p>
        )}
        <Tag className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </Tag>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
