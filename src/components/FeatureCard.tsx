import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

import Bezel from "@/components/Bezel";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items?: string[];
  className?: string;
  /** Small label shown above the title, e.g. "24/7" */
  eyebrow?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  items,
  className,
  eyebrow,
}: FeatureCardProps) {
  return (
    <Bezel
      className={cn(
        "h-full shadow-soft transition-[transform,box-shadow] duration-700 ease-vanguard hover:-translate-y-1.5 hover:shadow-soft-lg",
        className
      )}
      innerClassName="flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        {eyebrow && (
          <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary-foreground">
            {eyebrow}
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {items && items.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t pt-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </Bezel>
  );
}
