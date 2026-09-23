import { intlTags, type Locale } from "./config";

/**
 * Locale-aware formatting helpers.
 *
 * These live outside the dictionaries on purpose. Dictionaries must stay as
 * plain serializable data so they can be passed from Server Components into
 * Client Components; any module that mixes in functions cannot cross that
 * boundary. Formatting logic is locale-agnostic code, so it is safe for the
 * client bundle.
 */

/** Reads a value out of a dictionary entry keyed by locale. */
export function pick<T>(byLocale: Record<Locale, T>, locale: Locale): T {
  return byLocale[locale];
}

/** Formats an ISO date (yyyy-mm-dd) in the given locale. */
export function formatDate(iso: string, locale: Locale): string {
  if (!iso) return "—";

  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "—";

  return new Intl.DateTimeFormat(intlTags[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

/** Formats a number as a price in EUR, e.g. `1.234 €` on fr, `€1,234` on en. */
export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlTags[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Plural selection.
 *
 * `Intl.PluralRules` handles the genuinely tricky cases — French treats 0 as
 * singular ("0 jour"), English and Italian do not — so this is preferred over
 * a naive `n === 1` check.
 */
export function pluralize(
  count: number,
  forms: { one: string; other: string },
  locale: Locale
): string {
  const rule = new Intl.PluralRules(intlTags[locale]).select(count);
  return rule === "one" ? forms.one : forms.other;
}

/**
 * Replaces `{placeholder}` tokens in a dictionary string.
 *
 *   interpolate("{count} makina", { count: 31 }) → "31 makina"
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}

/** Locale-aware alphabetical comparison, used for sorting car names. */
export function compareText(a: string, b: string, locale: Locale): number {
  return a.localeCompare(b, intlTags[locale]);
}
