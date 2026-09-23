# rentcardb

Marketing and booking site for **rentcardb**, a car rental business based in Durrës, Albania, with a pickup desk at Rinas (Tirana International) Airport.

Built with Next.js App Router, fully internationalised into four languages, and statically generated.

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui (new-york), Plus Jakarta Sans |
| Motion | Framer Motion |
| Icons | Lucide |
| Images | Cloudinary, optimised through `next/image` |
| Fonts | `next/font/google` (self-hosted, no layout shift) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

No environment variables are required. The car fleet is committed as data, not fetched at runtime.

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run sync:cars` | Re-import the fleet from the live site (cached) |
| `npm run sync:cars:fresh` | Same, bypassing the cache |

## Internationalisation

Four locales, all served under a path prefix. There is no "naked" URL for any locale.

| Locale | Language | Tag |
|---|---|---|
| `sq` | Albanian (default) | `sq-AL` |
| `en` | English | `en-GB` |
| `it` | Italian | `it-IT` |
| `fr` | French | `fr-FR` |

### Localised routes

A URL never contains another language's word for a page. An Italian searching for *noleggio auto* lands on `/it/noleggio-auto`, not on a URL containing the Albanian *makina*.

| Route | sq | en | it | fr |
|---|---|---|---|---|
| Home | `/sq` | `/en` | `/it` | `/fr` |
| Fleet | `makina` | `cars` | `noleggio-auto` | `location-voitures` |
| Booking | `rezervo` | `booking` | `prenota` | `reservation` |
| About | `rreth-nesh` | `about` | `chi-siamo` | `a-propos` |
| Contact | `kontakt` | `contact` | `contatti` | `contact` |

In-page anchors are localised too (`#lokacionet` / `#locations` / `#sedi` / `#agences`).

**Car detail slugs are not localised** — model names are proper nouns, so `/fr/location-voitures/kia-rio-2014` shares its trailing segment with every other locale.

### How routing works

Route folders on disk keep their Albanian names (`app/[locale]/makina/`). `src/middleware.ts` does two jobs before Next resolves anything:

1. **Prefixes every path with a locale**, choosing from the `rentcardb.locale` cookie or the `Accept-Language` header. Header-based, never IP-based — IP redirects break crawlers.
2. **Maps the localised slug onto the canonical folder.** `/en/cars` is rewritten to serve `/en/makina`; `/en/makina` is 308-redirected to `/en/cars` so the two do not compete as duplicates.

This keeps the route tree in one place instead of four.

### Adding a locale

1. `src/i18n/config.ts` — add to `locales`, `intlTags`, `ogLocales`, `localeNames`, `localeShort`.
2. `src/i18n/routes.ts` — add a slug to **every** entry in `routeSlugs` and `anchorSlugs`.
3. `src/i18n/dictionaries/<locale>.ts` — copy `en.ts` and translate it.
4. `src/i18n/index.ts` — register it in `overlays`.

Step 3 is self-checking: dictionaries are typed as `Dictionary`, so a missing key is a compile error, and the build fails until the file is complete.

## Architecture

### Data vs. dictionary — the one rule worth knowing

- **`src/data/`** holds facts that are not translated: names, URLs, prices, counts, phone numbers, street addresses, coordinates.
- **`src/i18n/dictionaries/`** holds everything a customer *reads*.

The same sentence must never live in both. When it did, the footer rendered one address while the structured data advertised another — a NAP inconsistency, which silently suppresses local search visibility. `contact.postal` is now the single source for the registered address, and `locations[]` the single source for pickup points.

### Content is generated, not stored

Car descriptions and feature lists are composed at render time from real vehicle attributes plus dictionary templates (`src/i18n/carCopy.ts`). The seven most-booked models have hand-written prose in `carCopy.overrides`. This is what lets one fleet read naturally in four languages.

### Project structure

```
src/
  app/
    [locale]/
      layout.tsx        Root layout — sets <html lang>, providers, header/footer
      page.tsx          Home
      makina/           Fleet listing and [slug] detail pages
      rezervo/          Multi-step booking
      rreth-nesh/       About
      kontakt/          Contact
      [...rest]/        Catch-all → 404
      not-found.tsx
    sitemap.ts          All locales with hreflang alternates
    robots.ts
    globals.css         Design tokens
  components/           Feature components
    ui/                 shadcn/ui primitives
  data/                 Fleet and site facts
  i18n/                 Locales, routes, formatting, dictionaries
  lib/                  SEO/JSON-LD helpers, booking rules
  middleware.ts         Locale routing
scripts/
  scrape-cars.mjs       Fleet importer
```

### Components and locale

There is **no `app/layout.tsx`** — the root layout lives at `app/[locale]/layout.tsx`, because that is the only place that can set `<html lang>` per request.

- **Server Components** receive `locale` as a prop (e.g. `Footer`, `Hero`). They cannot read the client i18n context.
- **Client Components** call `useLocale()` from `@/i18n/client`.

> ⚠️ **Never import from the `@/i18n` barrel inside a Client Component.** That barrel imports all four dictionaries and would ship every language to the browser. Use `@/i18n/format` (pure functions), `@/i18n/config`, `@/i18n/routes` or `@/i18n/client`.

Never hardcode a path. Use `href(locale, route, suffix?)` and `anchorHref(locale, anchor)` from `@/i18n/routes`.

## Car data

`src/data/cars.generated.json` is the fleet, generated by `scripts/scrape-cars.mjs`. It carries a `scrapedAt` timestamp, which is used as the `lastmod` value for car pages in the sitemap — so search engines re-crawl when the inventory actually changes rather than on a fixed schedule.

The scraper reads attribute values in Albanian and normalises them to locale-neutral keys (`economy`, `diesel`, `automatic`…), so translated labels are lookups rather than parsed strings.

## SEO

- `AutoRental` organisation schema with address, geo, opening hours and social profiles
- `Product` + `Car` schema per vehicle, with locale-correct offer URLs
- `FAQPage` and `BreadcrumbList` schema
- Per-page canonical URLs and `hreflang` alternates for all four locales, plus `x-default`
- A locale-aware sitemap with alternates on every entry
- The `<title>` template appends the brand name

## Design

The visual system — typography, spacing, elevation, motion easing and the anti-pattern list — is documented in [`design.md`](design.md).

## License

No licence is granted. This is a private business website; the source is public for transparency, not for reuse.

