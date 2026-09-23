import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  eyebrow: string;
  subtitle?: string;
  /** Optional background photo. Falls back to a teal gradient when omitted. */
  image?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Dark, image-backed page banner. Mirrors the layout used on the homepage
 * hero but sized for inner pages.
 */
export default function PageHero({
  title,
  eyebrow,
  subtitle,
  image,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border shadow-soft",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_60%)]" />
        </>
      )}

      <div className="relative z-10 max-w-2xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 sm:text-xs">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-[1.08] text-primary-foreground text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
