import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";

/**
 * Validates a `[locale]` route param and narrows it to `Locale`.
 *
 * `[locale]/layout.tsx` already rejects unknown locales, so this is redundant
 * for the normal render path. It exists because the alternative — quietly
 * falling back to the default locale — would serve Albanian content at a URL
 * like `/de/makina` and answer 200, which is worse than a 404: it creates a
 * crawlable page in a language the site does not claim to support.
 */
export function resolveLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
