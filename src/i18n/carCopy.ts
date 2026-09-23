import type { Car, Category, Fuel, Transmission } from "@/data/cars";
import type { Dictionary } from "@/i18n/dictionaries/sq";
import { interpolate } from "@/i18n/format";

/**
 * Per-locale prose for a car.
 *
 * Car descriptions and feature lists are generated at render time from real
 * vehicle attributes plus dictionary templates, rather than being baked onto
 * the car record at module load. That is what allows the same fleet to read
 * naturally in four languages.
 */

/** Localised label for a car's category, e.g. "economy" → "Ekonomike". */
export function categoryLabel(category: Category, t: Dictionary): string {
  return t.attributes.category[category];
}

/** Localised label for a car's fuel, e.g. "diesel" → "Naftë". */
export function fuelLabel(fuel: Fuel, t: Dictionary): string {
  return t.attributes.fuel[fuel];
}

/** Localised label for a car's transmission. */
export function transmissionLabel(
  transmission: Transmission,
  t: Dictionary
): string {
  return t.attributes.transmission[transmission];
}

/**
 * Full marketing description for a car. Uses the hand-written override when
 * one exists for that slug, otherwise composes one from the template.
 */
export function describeCar(car: Car, t: Dictionary): string {
  const override = t.carCopy.overrides[car.slug];
  if (override) return override;

  return interpolate(t.carCopy.template, {
    name: car.name,
    year: car.year,
    intro: t.carCopy.intro[car.category],
    category: categoryLabel(car.category, t),
    seats: car.seats,
    fuel: fuelLabel(car.fuel, t),
    transmission:
      car.transmission === "automatic"
        ? t.carCopy.transmissionAuto
        : t.carCopy.transmissionManual,
    minDays: car.minDays,
  });
}

/** Feature bullets for a car, derived from its confirmed attributes. */
export function featuresForCar(car: Car, t: Dictionary): string[] {
  const features: string[] = [
    car.transmission === "automatic"
      ? t.carCopy.featureTransmissionAuto
      : t.carCopy.featureTransmissionManual,
    car.fuel === "diesel"
      ? t.carCopy.featureFuelDiesel
      : car.fuel === "petrol"
        ? t.carCopy.featureFuelPetrol
        : t.carCopy.featureFuelPetrolLpg,
  ];

  if (car.seats >= 7) {
    features.push(interpolate(t.carCopy.featureSeats, { count: car.seats }));
  }

  features.push(
    t.carCopy.featureAc,
    t.carCopy.featureBluetooth,
    t.carCopy.featureSafety
  );

  return features;
}
