import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths inside a valid locale, e.g. `/en/does-not-exist`.
 *
 * Without this, an unmatched URL never reaches `[locale]/not-found.tsx`: Next
 * cannot resolve a segment it has no route for, so it falls back to its built-in
 * 404 — which renders with no root layout, and therefore no `<html lang>`, no
 * header, no styling and no way back to the site.
 *
 * Matching the path first is what puts the request inside `[locale]/layout.tsx`,
 * where the locale is known; `notFound()` then hands it to the branded 404.
 */
export default function CatchAll(): never {
  notFound();
}
