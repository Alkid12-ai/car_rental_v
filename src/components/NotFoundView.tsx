"use client";

import Link from "next/link";
import { CarFront, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDict, useLocale } from "@/i18n/client";
import { href } from "@/i18n/routes";

/**
 * 404 body.
 *
 * Split out as a client component because `not-found.tsx` cannot read the
 * `[locale]` param — yet it renders *inside* `[locale]/layout.tsx`, so the
 * provider already knows the locale. Without this split, a French visitor
 * hitting a dead link would be answered in Albanian and bounced to `/sq`.
 */
export default function NotFoundView() {
  const locale = useLocale();
  const t = useDict();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <span className="grid size-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <CarFront className="size-8" aria-hidden="true" />
      </span>

      <p className="mt-6 font-display text-5xl font-bold text-primary">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t.notFound.body}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={href(locale, "cars")}>
            <Search className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {t.actions.viewCars}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={href(locale, "home")}>
            <Home className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {t.actions.home}
          </Link>
        </Button>
      </div>
    </div>
  );
}
