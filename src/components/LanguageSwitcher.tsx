"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isLocale, localeNames, localeShort, locales, type Locale } from "@/i18n/config";
import { useDict, useLocale } from "@/i18n/client";
import { anchorSlugs, href, routeKeyFromSlug, type RouteKey } from "@/i18n/routes";

/**
 * Language switcher.
 *
 * Two decisions worth stating:
 *
 *  1. Options are shown as native names ("Shqip", "Italiano"), never flags. A
 *     flag names a country, not a language — there is no British flag that
 *     means "English" to an American, and no flag at all for a language
 *     spanning many countries.
 *
 *  2. Each option is a real `<a>` with an `hrefLang`, not a JS click handler.
 *     Crawlers discover the alternate language versions from these, and a
 *     middle-click or "open in new tab" behaves the way a link should.
 *
 * The current page is preserved: the active route is resolved back to a route
 * key and rebuilt in the target locale, so `/sq/makina/kia-rio-2014` becomes
 * `/fr/location-voitures/kia-rio-2014` rather than dumping the user on the
 * homepage.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useDict();
  const [suffix, setSuffix] = useState("");

  /**
   * `usePathname()` carries neither the query string nor the fragment.
   * They are read from the browser after mount rather than via
   * `useSearchParams()`, because that hook opts the whole route into client
   * rendering and would defeat `generateStaticParams`.
   */
  useEffect(() => {
    setSuffix(`${window.location.search}${window.location.hash}`);
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean);
  const rest = isLocale(segments[0] ?? "") ? segments.slice(1) : segments;
  const [slug, ...tailParts] = rest;
  const tail = tailParts.join("/");

  const route: RouteKey | undefined = slug
    ? routeKeyFromSlug(locale, slug)
    : "home";

  /** Re-expresses a fragment in the target locale, so `#lokacionet` → `#agences`. */
  function hashFor(target: Locale): string {
    const index = suffix.indexOf("#");
    if (index === -1) return "";

    const current = suffix.slice(index + 1);
    const match = Object.values(anchorSlugs).find(
      (map) => (map as Record<Locale, string>)[locale] === current
    );
    if (!match) return "";

    return `#${(match as Record<Locale, string>)[target]}`;
  }

  function pathFor(target: Locale): string {
    const hashIndex = suffix.indexOf("#");
    const queryIndex = suffix.indexOf("?");

    const query =
      queryIndex === -1
        ? ""
        : suffix.slice(queryIndex, hashIndex === -1 ? undefined : hashIndex);

    const base = route ? href(target, route, tail || undefined) : href(target, "home");
    return `${base}${query}${hashFor(target)}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={className}
          aria-label={t.nav.changeLanguage}
        >
          <Globe className="size-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide">
            {localeShort[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t.nav.language}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((item) => (
          <DropdownMenuItem key={item} asChild>
            <Link
              href={pathFor(item)}
              hrefLang={item}
              lang={item}
              aria-current={item === locale ? "true" : undefined}
              className="flex items-center justify-between gap-3"
            >
              {localeNames[item]}
              {item === locale && (
                <Check className="size-4 text-primary" aria-hidden="true" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
