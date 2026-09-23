import type { Metadata } from "next";

import CarsExplorer from "@/components/CarsExplorer";
import PageHero from "@/components/PageHero";
import { cars, priceBounds } from "@/data/cars";
import { site } from "@/data/site";
import { getDictionary, interpolate } from "@/i18n";
import { href, metadataLanguages } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";

const bounds = priceBounds();

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const description = interpolate(t.meta.cars.description, { price: bounds.min });

  return {
    title: t.meta.cars.title,
    description,
    alternates: {
      canonical: href(locale, "cars"),
      languages: metadataLanguages("cars"),
    },
    openGraph: {
      title: `${t.meta.cars.title} | ${site.name}`,
      description,
      url: `${site.url}${href(locale, "cars")}`,
    },
  };
}

export default function MakinaPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <PageHero
          eyebrow={t.fleet.eyebrow}
          title={t.fleet.pageTitle}
          subtitle={interpolate(t.fleet.pageSubtitle, {
            count: cars.length,
            price: bounds.min,
          })}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <CarsExplorer cars={cars} />
      </div>
    </>
  );
}
