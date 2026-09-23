/**
 * Car inventory.
 *
 * The raw vehicle records in `cars.generated.json` are produced by
 * `npm run sync:cars`, which scrapes the live listing at rentcardb.com
 * (slug, name, year, category, transmission, seats, fuel, price, minDays, image).
 *
 * Two deliberate choices:
 *
 *  1. Attribute values are stored as **locale-neutral keys**
 *     (`"economy"`, `"diesel"`, `"automatic"`), not display strings. They are
 *     used both as filter values and as lookup keys into the dictionary, so
 *     translating a display label must never change what a filter matches.
 *  2. There is no `description` or `features` field. That prose is generated
 *     per-locale at render time by `@/i18n/carCopy`, so each language gets its
 *     own sentences instead of a pre-baked string.
 */
import generated from "./cars.generated.json";

export type Category =
  | "economy"
  | "family"
  | "suv"
  | "premium"
  | "sportive"
  | "minibus";

export type Fuel = "petrol" | "diesel" | "petrolLpg";
export type Transmission = "manual" | "automatic";
export type LocationId = "rinas" | "durres";

export interface Car {
  /** Stable identifier, equal to the slug */
  id: string;
  /** URL segment used by /[locale]/<cars>/[slug] */
  slug: string;
  /** Short model name, e.g. "Kia Rio" */
  name: string;
  year: number;
  category: Category;
  /** Price in EUR per day */
  pricePerDay: number;
  /** Weekly rate. Only present once a real figure is confirmed. */
  pricePerWeek?: number;
  transmission: Transmission;
  seats: number;
  fuel: Fuel;
  minDays: number;
  image: string;
  gallery: string[];
  /** Highlighted in the "Makinat më të kërkuara" homepage section */
  popular: boolean;
  locations: LocationId[];
}

/** Shape written by scripts/scrape-cars.mjs */
interface RawCar {
  slug: string;
  name: string;
  year: number | null;
  category: string | null;
  transmission: string | null;
  seats: number | null;
  fuel: string | null;
  pricePerDay: number | null;
  minDays: number | null;
  image: string | null;
}

/**
 * The scrape stores values exactly as the source site renders them (Albanian).
 * Normalising here keeps `cars.generated.json` a faithful dump of the source
 * while the application itself stays language-agnostic.
 */
const categoryKeys: Record<string, Category> = {
  Ekonomike: "economy",
  Familjare: "family",
  SUV: "suv",
  Premium: "premium",
  Sportive: "sportive",
  Minibus: "minibus",
};

const fuelKeys: Record<string, Fuel> = {
  "Benzinë": "petrol",
  "Benzine & Gaz": "petrolLpg",
  "Naftë": "diesel",
};

const transmissionKeys: Record<string, Transmission> = {
  Manual: "manual",
  Automatik: "automatic",
};

interface CarOverride {
  category?: Category;
  pricePerWeek?: number;
  popular?: boolean;
}

/**
 * Hand-curated values. The scraper only reads what the listing page renders;
 * anything missing there is set here rather than guessed in code.
 */
const overrides: Record<string, CarOverride> = {
  /* Featured on the live homepage under "Makinat më të kërkuara" */
  "kia-rio-2014": { popular: true },
  "toyota-auris-2009": { popular: true },
  "hyundai-i20-2012": { popular: true },
  "toyota-yaris-2010": { popular: true },
  "toyota-yaris-2009": { popular: true },
  "opel-meriva-2009": { popular: true },

  /* Category missing on the source listing (it renders no badge) */
  "hyundai-starex-2012": { category: "minibus" },
};

/** Order used by the homepage "Makinat më të kërkuara" section */
const popularOrder = [
  "kia-rio-2014",
  "toyota-auris-2009",
  "hyundai-i20-2012",
  "toyota-yaris-2010",
  "toyota-yaris-2009",
  "opel-meriva-2009",
];

const rawCars = (generated as { cars: RawCar[] }).cars;

export const cars: Car[] = rawCars
  .map((raw): Car | null => {
    // Skip malformed records rather than shipping a broken card.
    if (
      !raw.slug ||
      !raw.name ||
      !raw.year ||
      !raw.transmission ||
      !raw.seats ||
      !raw.fuel ||
      !raw.pricePerDay ||
      !raw.image
    ) {
      return null;
    }

    const override = overrides[raw.slug] ?? {};

    return {
      id: raw.slug,
      slug: raw.slug,
      name: raw.name,
      year: raw.year,
      category:
        override.category ?? categoryKeys[raw.category ?? ""] ?? "economy",
      pricePerDay: raw.pricePerDay,
      ...(override.pricePerWeek ? { pricePerWeek: override.pricePerWeek } : {}),
      transmission: transmissionKeys[raw.transmission] ?? "manual",
      seats: raw.seats,
      fuel: fuelKeys[raw.fuel] ?? "petrol",
      minDays: raw.minDays ?? 2,
      image: raw.image,
      gallery: [raw.image],
      popular: override.popular ?? popularOrder.includes(raw.slug),
      locations: ["rinas", "durres"],
    };
  })
  .filter((car): car is Car => car !== null);

/* --- selectors ------------------------------------------------------------ */

/** Canonical display order for the category filter */
export const categories: Category[] = [
  "economy",
  "family",
  "suv",
  "premium",
  "sportive",
  "minibus",
];

export const transmissions: Transmission[] = ["manual", "automatic"];

export const fuels: Fuel[] = ["petrol", "diesel", "petrolLpg"];

/** Seat counts present in the fleet, ascending */
export const seatOptions: number[] = [...new Set(cars.map((car) => car.seats))].sort(
  (a, b) => a - b
);

/** Categories that actually have at least one car, in canonical order */
export const availableCategories = categories.filter((category) =>
  cars.some((car) => car.category === category)
);

/** Fuel types that actually have at least one car */
export const availableFuels = fuels.filter((fuel) =>
  cars.some((car) => car.fuel === fuel)
);

export const getCarBySlug = (slug: string): Car | undefined =>
  cars.find((car) => car.slug === slug);

export const getPopularCars = (): Car[] =>
  popularOrder
    .map((slug) => cars.find((car) => car.slug === slug))
    .filter((car): car is Car => car !== undefined);

export const getAllSlugs = (): string[] => cars.map((car) => car.slug);

export const priceBounds = (): { min: number; max: number } => {
  if (cars.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...cars.map((car) => car.pricePerDay)),
    max: Math.max(...cars.map((car) => car.pricePerDay)),
  };
};

/* --- pricing helpers ------------------------------------------------------ */

/**
 * Number of rental days between two ISO dates.
 * Returns 0 when either date is missing or the range is invalid.
 */
export function rentalDays(pickup?: string, dropoff?: string): number {
  if (!pickup || !dropoff) return 0;
  const start = new Date(`${pickup}T00:00:00`);
  const end = new Date(`${dropoff}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return diff > 0 ? diff : 0;
}

/**
 * Total price for a car over a date range. Applies the weekly rate to whole
 * 7-day blocks only when the car actually has one defined.
 */
export function calculatePrice(
  car: Car,
  days: number
): { days: number; total: number; perDay: number; discount: boolean } {
  if (days <= 0) {
    return { days: 0, total: 0, perDay: car.pricePerDay, discount: false };
  }

  const weekly = car.pricePerWeek;
  if (!weekly) {
    return {
      days,
      total: days * car.pricePerDay,
      perDay: car.pricePerDay,
      discount: false,
    };
  }

  const weeks = Math.floor(days / 7);
  const rest = days % 7;
  const total = weeks * 7 * weekly + rest * car.pricePerDay;

  return {
    days,
    total,
    perDay: Math.round(total / days),
    discount: weeks > 0,
  };
}
