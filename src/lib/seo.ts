import type { Car } from "@/data/cars";
import { site } from "@/data/site";
import { intlTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/sq";
import {
  categoryLabel,
  describeCar,
  fuelLabel,
  transmissionLabel,
} from "@/i18n/carCopy";
import { href } from "@/i18n/routes";

/**
 * Applies Cloudinary delivery transforms to a raw Cloudinary URL.
 * Used for URLs served directly by the browser (OG images), where
 * `next/image` isn't doing the optimisation for us.
 */
export function cloudinaryImage(
  url: string,
  {
    width,
    height,
    crop = "fill",
  }: { width?: number; height?: number; crop?: string } = {}
): string {
  if (!url?.includes("/image/upload/")) return url;

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width && height) transforms.push(`c_${crop}`);

  return url.replace("/image/upload/", `/image/upload/${transforms.join(",")}/`);
}

/** "Volkswagen Golf 5" → "Volkswagen", "Mercedes-Benz C Class" → "Mercedes-Benz" */
export function brandName(carName: string): string {
  if (/^Mercedes-Benz/i.test(carName)) return "Mercedes-Benz";
  return carName.split(" ")[0];
}

/**
 * FAQPage structured data. Eligible for rich results in Google and a strong
 * match for the rental questions customers actually search for.
 */
export function faqJsonLd(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/**
 * Car listing structured data. Typed as both Product (which Google supports
 * for offers) and Car (for vehicle-specific attributes).
 */
export function carJsonLd(car: Car, t: Dictionary, locale: Locale) {
  const category = categoryLabel(car.category, t);
  const detailUrl = `${site.url}${href(locale, "cars", car.slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: `${car.name} ${car.year}`,
    sku: car.slug,
    description: describeCar(car, t),
    inLanguage: intlTags[locale],
    category,
    bodyType: category,
    brand: { "@type": "Brand", name: brandName(car.name) },
    model: car.name,
    vehicleModelDate: String(car.year),
    vehicleTransmission: transmissionLabel(car.transmission, t),
    fuelType: fuelLabel(car.fuel, t),
    seatingCapacity: car.seats,
    image: [cloudinaryImage(car.image, { width: 1200, height: 675 })],
    offers: {
      "@type": "Offer",
      price: car.pricePerDay,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      url: detailUrl,
      seller: { "@type": "Organization", name: site.name },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: car.pricePerDay,
        priceCurrency: site.currency,
        unitCode: "DAY",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "DAY",
        },
      },
    },
  };
}
