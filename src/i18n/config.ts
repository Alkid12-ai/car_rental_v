/**
 * Locale configuration.
 *
 * The site ships in four languages. Albanian is the default and lives under
 * the `/sq` prefix like every other locale, so no locale has a "naked" URL.
 */
export const locales = ["sq", "en", "it", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sq";

/**
 * BCP-47 tags, used for `Intl` date/number formatting and as `<html lang>`.
 */
export const intlTags: Record<Locale, string> = {
  sq: "sq-AL",
  en: "en-GB",
  it: "it-IT",
  fr: "fr-FR",
};

/** Open Graph locale identifiers (`og:locale`). */
export const ogLocales: Record<Locale, string> = {
  sq: "sq_AL",
  en: "en_GB",
  it: "it_IT",
  fr: "fr_FR",
};

/** Native language names, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  sq: "Shqip",
  en: "English",
  it: "Italiano",
  fr: "Français",
};

/** Short uppercase labels, for compact switchers. */
export const localeShort: Record<Locale, string> = {
  sq: "SQ",
  en: "EN",
  it: "IT",
  fr: "FR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Picks the best locale from an `Accept-Language` header.
 *
 * Deliberately header-based rather than IP-based: IP redirects break
 * crawlers and frustrate the Albanian diaspora, who are a core audience.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        quality: q ? Number.parseFloat(q) : 1,
      };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}
