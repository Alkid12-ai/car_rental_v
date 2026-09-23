import { cars, priceBounds } from "./cars";
import type { LocationId } from "./cars";

/** Real fleet figures, derived from the scraped inventory */
const fleet = priceBounds();

/**
 * Company facts that are NOT translated: names, URLs, prices and counts.
 * Anything a customer reads as prose lives in `src/i18n/dictionaries/` instead —
 * keeping the same sentence in two places is how the postal-address
 * contradiction in this file originally crept in.
 */
export const site = {
  name: "rentcardb",
  url: "https://www.rentcardb.com",
  /** Cheapest daily rate in the fleet — derived so it can never drift */
  priceFrom: fleet.min,
  /** Highest daily rate in the fleet */
  priceTo: fleet.max,
  /** Live count of vehicles in the fleet */
  fleetSize: cars.length,
  currency: "EUR",
  /**
   * Car featured behind the homepage hero. Referenced by slug rather than
   * list position so re-scraping the fleet never silently swaps the hero art.
   */
  heroCarSlug: "mercedes-benz-c-class-2014",
} as const;

export const contact = {
  phones: ["+355 69 232 1333", "+355 69 294 0000"],
  /** Primary number in E.164 format, without the leading plus, for wa.me */
  whatsapp: "355692321333",
  whatsappDisplay: "+355 69 232 1333",
  email: "info@rentcardb.com",
  /**
   * Registered office. This is the ONE source of truth for our postal address:
   * it feeds both the structured data in `layout.tsx` and the visible footer, so
   * the two can never drift apart. Google cross-checks NAP consistency, and a
   * mismatch between tagged and visible address suppresses local-pack eligibility.
   * Pickup points live in `locations` below - deliberately kept separate.
   */
  postal: {
    street: "Rruga Don Nikoll Kacorri",
    city: "Durrës",
    postalCode: "2001",
    country: "AL",
  },
  /**
   * Google Plus Code for the Durrës office. This is a coordinate shorthand, not
   * a street - "Rruga Don Nikoll Kacorri 2001, Durrës" and "8C9W+FQ, Durrës 2001"
   * are two representations of the same place.
   */
  plusCode: "8C9W+FQ",
  /**
   * Durrës office coordinates, decoded from `plusCode` above. These must stay in
   * sync with `postal`: search engines read `geo` and `address` as one entity, so
   * an airport coordinate paired with a Durrës street is a data conflict.
   */
  geo: { latitude: 41.318688, longitude: 19.446938 },
  /**
   * Query the Plus Code rather than storing a `maps.app.goo.gl` share link:
   * share links expire and cannot be machine-verified, whereas a Plus Code is
   * stable, human-readable, and resolves to the exact point.
   */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=8C9W%2BFQ%20Durr%C3%ABs",
} as const;

export const whatsappLink = (
  message = "Përshëndetje! Dëshiroj të rezervoj një makinë me qera."
): string =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailtoLink = `mailto:${contact.email}`;
export const telLinks = contact.phones.map((phone) => ({
  display: phone,
  href: `tel:${phone.replace(/\s/g, "")}`,
}));

/**
 * Social profiles shown in the footer. Entries with an empty `url` are skipped,
 * so adding a real profile URL is all that's needed to make an icon appear.
 */
export const social: { id: string; label: string; url: string }[] = [
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/rentcardb" },
  { id: "instagram", label: "Instagram", url: "https://instagram.com/rentcardb" },
];

/**
 * Pickup points. Single source of truth for WHICH points exist and WHERE they
 * are — the display name, city, opening hours and marketing copy all live in
 * the dictionary so they can be translated.
 *
 * Localized labels are deliberately not stored here: the same string in two
 * places is exactly how this file's address fields drifted apart.
 */
export interface LocationInfo {
  id: LocationId;
  /**
   * Street address — a fact, identical in every language.
   *
   * Optional on purpose: Rinas is a desk inside the arrivals terminal, not a
   * street address. Inventing one there would be a false local-signal and
   * Google would try to geocode it, so the field is simply absent and the
   * display name plus city carry the meaning.
   */
  address?: string;
  /** Precise coordinates, used for per-branch structured data */
  geo: { latitude: number; longitude: number };
  /** Optional Plus Code, where we have one for this pickup point */
  plusCode?: string;
}

export const locations: LocationInfo[] = [
  {
    id: "rinas",
    // No street address — we meet customers inside the arrivals terminal.
    // Tirana International Airport “Nënë Tereza” (Rinas) terminal
    geo: { latitude: 41.4147, longitude: 19.7206 },
  },
  {
    id: "durres",
    address: "Rruga Don Nikoll Kacorri",
    geo: { latitude: 41.318688, longitude: 19.446938 },
    plusCode: contact.plusCode,
  },
];


