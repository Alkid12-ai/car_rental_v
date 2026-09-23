import { defaultLocale, type Locale } from "./config";
import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import { sq, type Dictionary } from "./dictionaries/sq";

export {
  defaultLocale,
  intlTags,
  isLocale,
  localeNames,
  localeShort,
  locales,
  ogLocales,
} from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./dictionaries/sq";
export {
  compareText,
  formatCurrency,
  formatDate,
  interpolate,
  pick,
  pluralize,
} from "./format";

/**
 * Recursive merge used to fill a locale's gaps from the reference dictionary.
 *
 * Arrays are replaced wholesale rather than merged element-by-element: merging
 * a translated FAQ list into the Albanian one index-by-index would produce a
 * half-translated question/answer pair, which is worse than an entirely
 * Albanian entry.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || Array.isArray(override)) return (override ?? base) as T;
  if (typeof base !== "object" || base === null) return override as T;

  const source = base as Record<string, unknown>;
  const result: Record<string, unknown> = { ...source };

  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    if (value === undefined) continue;
    result[key] = deepMerge(source[key], value);
  }

  return result as T;
}

/**
 * Locale overlays. Each entry is a complete dictionary; anything it omits falls
 * back to Albanian, so a partially shipped locale degrades to the default
 * language instead of rendering a blank string.
 *
 * To add a language: create `dictionaries/<locale>.ts` exporting a `Dictionary`
 * and register it here.
 *
 * Note this barrel deliberately does NOT export a `resolveLocale`. Route params
 * are validated by `resolveLocale` in `@/i18n/server`, which 404s on an unknown
 * locale. A second, lenient version here would silently render the default
 * language at a URL like `/de/...` and answer 200 — a crawlable page in a
 * language the site does not claim to support.
 */
const overlays: Partial<Record<Locale, Dictionary>> = { en, it, fr };

/** Complete dictionary for a locale, with Albanian filling any gaps. */
export function getDictionary(locale: Locale): Dictionary {
  if (locale === defaultLocale) return sq;

  const overlay = overlays[locale];
  if (!overlay) return sq;

  return deepMerge(sq, overlay);
}

/** Percentage of a locale's keys that are translated. Useful as a build check. */
export function translationCoverage(locale: Locale): number {
  const overlay = overlays[locale];
  if (locale === defaultLocale || !overlay) return locale === defaultLocale ? 100 : 0;

  const countLeaves = (value: unknown): number => {
    if (typeof value === "string") return 1;
    if (Array.isArray(value)) return value.length;
    if (value && typeof value === "object") {
      return Object.values(value as Record<string, unknown>).reduce<number>(
        (sum, child) => sum + countLeaves(child),
        0
      );
    }
    return 0;
  };

  const total = countLeaves(sq);
  const translated = countLeaves(overlay);
  return total === 0 ? 0 : Math.round((translated / total) * 100);
}
