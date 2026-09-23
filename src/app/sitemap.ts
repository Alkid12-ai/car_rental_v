import type { MetadataRoute } from "next";

import generated from "@/data/cars.generated.json";
import { getAllSlugs } from "@/data/cars";
import { site } from "@/data/site";
import { locales } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

/**
 * Car pages carry the real last-modified date of the fleet data, so Google
 * re-crawls when the inventory actually changes instead of on a fixed date.
 */
const fleetUpdatedAt = new Date((generated as { scrapedAt: string }).scrapedAt);

/**
 * Static pages have no modified date of their own, so they inherit the fleet's.
 * The previous `new Date()` claimed every page had changed on every request,
 * which is the fastest way to teach a crawler to ignore the signal entirely.
 */
const contentUpdatedAt = fleetUpdatedAt;

/** The hreflang map for one route, including the `x-default` Google expects. */
function languagesFor(route: RouteKey, suffix?: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) {
    map[locale] = `${site.url}${href(locale, route, suffix)}`;
  }
  map["x-default"] = `${site.url}${href("en", route, suffix)}`;
  return map;
}

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

/**
 * Every locale gets its own entry, and every entry lists all of them as
 * alternates. That is what lets Google connect `/it/noleggio-auto` to
 * `/fr/location-voitures` and serve the right one per user.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    route: RouteKey;
    priority: number;
    changeFrequency: ChangeFrequency;
  }> = [
    { route: "home", priority: 1, changeFrequency: "weekly" },
    { route: "cars", priority: 0.9, changeFrequency: "weekly" },
    { route: "booking", priority: 0.7, changeFrequency: "monthly" },
    { route: "contact", priority: 0.6, changeFrequency: "monthly" },
    { route: "about", priority: 0.5, changeFrequency: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const item of staticRoutes) {
    const languages = languagesFor(item.route);
    for (const locale of locales) {
      entries.push({
        url: `${site.url}${href(locale, item.route)}`,
        lastModified: contentUpdatedAt,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
        alternates: { languages },
      });
    }
  }

  for (const slug of getAllSlugs()) {
    const languages = languagesFor("cars", slug);
    for (const locale of locales) {
      entries.push({
        url: `${site.url}${href(locale, "cars", slug)}`,
        lastModified: fleetUpdatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
