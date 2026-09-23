import type { LocationId } from "@/data/cars";
import { defaultLocale } from "@/i18n/config";
import { formatDate } from "@/i18n/format";

/** Business rules for a rental */
export const MIN_RENTAL_DAYS = 2;
export const MAX_RENTAL_DAYS = 60;

/** Half-hour pickup/dropoff slots covering the full day */
export const timeSlots: string[] = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${String(hours).padStart(2, "0")}:${minutes}`;
});

/**
 * Driver-age bands. Stored as locale-neutral keys; display labels live in the
 * dictionary under `ageRanges`.
 */
export const driverAgeValues = ["young", "standard", "senior"] as const;

export type DriverAge = (typeof driverAgeValues)[number];

export interface BookingQuery {
  pickup: LocationId;
  dropoff: LocationId;
  /** Pickup date, ISO yyyy-mm-dd */
  from: string;
  /** Dropoff date, ISO yyyy-mm-dd */
  to: string;
  fromTime: string;
  toTime: string;
  age: string;
  promo: string;
}

function toISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayISO(): string {
  return toISO(new Date());
}

export function addDaysISO(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  date.setDate(date.getDate() + days);
  return toISO(date);
}

/** Sensible starting values: pickup today, return after the minimum rental. */
export function defaultBooking(car?: string): BookingQuery & { car?: string } {
  const from = todayISO();
  return {
    pickup: "rinas",
    dropoff: "rinas",
    from,
    to: addDaysISO(from, MIN_RENTAL_DAYS),
    fromTime: "12:00",
    toTime: "12:00",
    age: "25-65",
    promo: "",
    ...(car ? { car } : {}),
  };
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Rebuilds booking state from URL search params, falling back to defaults. */
export function parseBookingParams(
  params: RawParams
): BookingQuery & { car?: string } {
  const fallback = defaultBooking();
  const pick = (key: keyof BookingQuery): string =>
    first(params[key])?.trim() || fallback[key];

  const pickup = pick("pickup") as LocationId;
  const dropoff = pick("dropoff") as LocationId;
  const from = pick("from");
  const to = pick("to");

  return {
    pickup: pickup === "durres" ? "durres" : "rinas",
    dropoff: dropoff === "durres" ? "durres" : "rinas",
    from,
    to,
    fromTime: pick("fromTime"),
    toTime: pick("toTime"),
    age: pick("age"),
    promo: first(params.promo)?.trim() ?? "",
    ...(first(params.car) ? { car: first(params.car) as string } : {}),
  };
}

export function toSearchParams(
  query: BookingQuery & { car?: string }
): string {
  const params = new URLSearchParams();
  params.set("pickup", query.pickup);
  params.set("dropoff", query.dropoff);
  params.set("from", query.from);
  params.set("to", query.to);
  params.set("fromTime", query.fromTime);
  params.set("toTime", query.toTime);
  params.set("age", query.age);
  if (query.promo) params.set("promo", query.promo);
  if (query.car) params.set("car", query.car);
  return params.toString();
}

/**
 * @deprecated Use `formatDate(iso, locale)` from `@/i18n` so dates follow the
 * active locale. Retained only so earlier call sites keep the default locale.
 */
export const formatDateAl = (iso: string): string =>
  formatDate(iso, defaultLocale);
