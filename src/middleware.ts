import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, matchLocale, type Locale } from "@/i18n/config";
import { routeSlugs } from "@/i18n/routes";

/**
 * Locale routing.
 *
 * Two jobs, both of which must happen before Next resolves a route:
 *
 *  1. Prefix every path with a locale, so no locale owns a "naked" URL.
 *  2. Translate a localized slug onto the canonical route *folder*.
 *
 * On (2): the folders on disk keep their Albanian names (`app/[locale]/makina`)
 * while the public URL uses whatever slug targets local search intent —
 * `/en/cars`, `/it/noleggio-auto`. A rewrite serves the Albanian folder under
 * the localized URL, so the tree exists once instead of four times.
 *
 * Only `config` and `routes` are imported. Both are plain data with no
 * dictionary behind them, which keeps the middleware bundle tiny — pulling in
 * `@/i18n` would drag all four dictionaries onto the edge.
 */

/** Remembers an explicit choice, so the switcher survives a later visit. */
const LOCALE_COOKIE = "rentcardb.locale";

/** Typed lookup into the slug tables without importing the whole barrel. */
const routeEntries = Object.entries(routeSlugs) as [
  string,
  Record<Locale, string>,
][];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  // 1. No locale prefix — decide one and redirect. `/` included.
  if (!first || !isLocale(first)) {
    const stored = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale =
      stored && isLocale(stored)
        ? stored
        : matchLocale(request.headers.get("accept-language"));

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    const response = NextResponse.redirect(url);
    // Latent bug avoided: `NextResponse.redirect` is a Response, not a
    // NextResponse, so `.cookies` is only available on this constructor.
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = first as Locale;
  const slug = rest[0];

  if (slug) {
    const key = routeEntries.find(([, map]) =>
      Object.values(map).includes(slug)
    )?.[0];

    if (key) {
      const official = routeSlugs[key as keyof typeof routeSlugs][locale];
      const canonical = routeSlugs[key as keyof typeof routeSlugs][defaultLocale];
      const tail = rest.slice(1);

      // 2a. Right route, wrong language's slug (e.g. `/en/makina`) — send it to
      // the official slug so the two URLs don't compete as duplicates.
      if (official !== slug) {
        const url = request.nextUrl.clone();
        url.pathname = [`/${locale}`, official, ...tail]
          .filter(Boolean)
          .join("/");
        return NextResponse.redirect(url, 308);
      }

      // 2b. Correct public slug — serve it from the canonical folder.
      if (official !== canonical) {
        const url = request.nextUrl.clone();
        url.pathname = [`/${locale}`, canonical, ...tail]
          .filter(Boolean)
          .join("/");
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Everything except Next internals and static files. `sitemap.xml` and
   * `robots.txt` are excluded deliberately: they are generated at the app root
   * and must not acquire a locale prefix.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|txt|woff2?)$).*)",
  ],
};
