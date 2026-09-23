import { locales, type Locale } from "./config";

/**
 * Localized URL segments — the single source of truth for every route.
 *
 * Because slugs target local search intent (an Italian searching "noleggio
 * auto" should not land on a URL containing the Albanian word "makina"),
 * nothing in the app should hardcode a path. Always go through `href()`.
 *
 * Car *detail* slugs are NOT localized: model names are proper nouns, so
 * `/sq/makina/kia-rio-2014` and `/fr/location-voitures/kia-rio-2014` share
 * the same trailing segment.
 */
export const routeSlugs = {
  home: { sq: "", en: "", it: "", fr: "" },
  cars: {
    sq: "makina",
    en: "cars",
    it: "noleggio-auto",
    fr: "location-voitures",
  },
  booking: {
    sq: "rezervo",
    en: "booking",
    it: "prenota",
    fr: "reservation",
  },
  about: {
    sq: "rreth-nesh",
    en: "about",
    it: "chi-siamo",
    fr: "a-propos",
  },
  contact: {
    sq: "kontakt",
    en: "contact",
    it: "contatti",
    fr: "contact",
  },
} as const;

export type RouteKey = keyof typeof routeSlugs;

/**
 * In-page anchors, also localized so an English page never links to
 * `#si-funksionon`.
 */
export const anchorSlugs = {
  locations: {
    sq: "lokacionet",
    en: "locations",
    it: "sedi",
    fr: "agences",
  },
  howItWorks: {
    sq: "si-funksionon",
    en: "how-it-works",
    it: "come-funziona",
    fr: "comment-ca-marche",
  },
  fleet: { sq: "makinat", en: "fleet", it: "flotta", fr: "flotte" },
} as const;

export type AnchorKey = keyof typeof anchorSlugs;

/**
 * Builds a locale-aware path.
 *
 *   href("en", "cars")                 → "/en/cars"
 *   href("fr", "cars", "kia-rio-2014") → "/fr/location-voitures/kia-rio-2014"
 */
export function href(locale: Locale, route: RouteKey, suffix?: string): string {
  const segment = routeSlugs[route][locale];
  return `/${[locale, segment, suffix].filter(Boolean).join("/")}`;
}

/** Locale-aware hash link, e.g. `/#lokacionet` on sq, `/#locations` on en. */
export function anchorHref(locale: Locale, anchor: AnchorKey): string {
  return `${href(locale, "home")}#${anchorSlugs[anchor][locale]}`;
}

/**
 * Every locale variant of a route. Feeds `alternates.languages` (hreflang)
 * and the sitemap, so the two can never disagree.
 */
export function alternatesFor(
  route: RouteKey,
  suffix?: string
): { locale: Locale; path: string }[] {
  return locales.map((locale) => ({
    locale,
    path: href(locale, route, suffix),
  }));
}

/**
 * Builds the `languages` object for Next's `Metadata.alternates`, including
 * the `x-default` entry Google expects.
 */
export function metadataLanguages(
  route: RouteKey,
  suffix?: string
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const { locale, path } of alternatesFor(route, suffix)) {
    languages[locale] = path;
  }
  languages["x-default"] = href("en", route, suffix);

  return languages;
}

/**
 * Finds which route key a localized slug belongs to. Used by middleware to
 * resolve an incoming path segment back to a known route.
 */
export function routeKeyFromSlug(
  locale: Locale,
  slug: string
): RouteKey | undefined {
  const entries = Object.entries(routeSlugs) as [RouteKey, Record<Locale, string>][];
  return entries.find(([, map]) => map[locale] === slug)?.[0];
}
