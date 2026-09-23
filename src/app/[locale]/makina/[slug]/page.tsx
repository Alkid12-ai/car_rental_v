import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronRight,
  Cog,
  Fuel,
  MessageCircle,
  Tag,
  Users,
} from "lucide-react";

import CarGallery from "@/components/CarGallery";
import CarGrid from "@/components/CarGrid";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cars, getCarBySlug, getAllSlugs, type Car } from "@/data/cars";
import { contact, site, whatsappLink } from "@/data/site";
import { breadcrumbJsonLd, carJsonLd, cloudinaryImage } from "@/lib/seo";
import { getDictionary, interpolate } from "@/i18n";
import type { Dictionary } from "@/i18n/dictionaries/sq";
import { href, metadataLanguages } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";
import {
  categoryLabel,
  describeCar,
  featuresForCar,
  fuelLabel,
  transmissionLabel,
} from "@/i18n/carCopy";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const car = getCarBySlug(params.slug);
  if (!car) {
    return { title: t.meta.carNotFound };
  }

  const title = interpolate(t.meta.carTitle, {
    name: car.name,
    year: car.year,
    price: car.pricePerDay,
  });
  const description = interpolate(t.meta.carDescription, {
    name: car.name,
    year: car.year,
    transmission: transmissionLabel(car.transmission, t),
    seats: car.seats,
    fuel: fuelLabel(car.fuel, t),
    minDays: car.minDays,
  });

  return {
    title,
    description,
    alternates: {
      canonical: href(locale, "cars", car.slug),
      languages: metadataLanguages("cars", car.slug),
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}${href(locale, "cars", car.slug)}`,
      images: [
        {
          url: cloudinaryImage(car.image, { width: 1200, height: 630 }),
          width: 1200,
          height: 630,
          alt: interpolate(t.fleet.imageAlt, { name: car.name, year: car.year }),
        },
      ],
    },
  };
}

const specs = (car: Car, t: Dictionary) => [
  {
    icon: Cog,
    label: t.carDetail.specTransmission,
    value: transmissionLabel(car.transmission, t),
  },
  {
    icon: Users,
    label: t.carDetail.specSeats,
    value: interpolate(t.carDetail.specSeatsValue, { count: car.seats }),
  },
  { icon: Fuel, label: t.carDetail.specFuel, value: fuelLabel(car.fuel, t) },
  {
    icon: Tag,
    label: t.carDetail.specCategory,
    value: categoryLabel(car.category, t),
  },
  { icon: CalendarDays, label: t.carDetail.specYear, value: String(car.year) },
  {
    icon: CalendarClock,
    label: t.carDetail.specMinDays,
    value: interpolate(t.carDetail.specMinDaysValue, { count: car.minDays }),
  },
];

export default function CarDetailPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  const related = cars.filter((item) => item.slug !== car.slug).slice(0, 3);

  const breadcrumbs = breadcrumbJsonLd([
    { name: t.carDetail.breadcrumbHome, path: href(locale, "home") },
    { name: t.carDetail.breadcrumbCars, path: href(locale, "cars") },
    { name: `${car.name} ${car.year}`, path: href(locale, "cars", car.slug) },
  ]);

  const description = describeCar(car, t);
  const features = featuresForCar(car, t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd(car, t, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href={href(locale, "home")} className="transition-colors hover:text-primary">
                {t.carDetail.breadcrumbHome}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li>
              <Link href={href(locale, "cars")} className="transition-colors hover:text-primary">
                {t.carDetail.breadcrumbCars}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li className="font-medium text-foreground" aria-current="page">
              {car.name} {car.year}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <CarGallery
              images={car.gallery}
              alt={interpolate(t.fleet.imageAlt, {
                name: car.name,
                year: car.year,
              })}
            />

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full font-semibold">
                  {categoryLabel(car.category, t)}
                </Badge>
                {car.transmission === "automatic" && (
                  <Badge className="rounded-full font-semibold">
                    {t.carDetail.autoBadge}
                  </Badge>
                )}
                <Badge variant="outline" className="rounded-full">
                  {interpolate(t.carDetail.minDaysBadge, { days: car.minDays })}
                </Badge>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {car.name} {car.year}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>

            {/* Specs */}
            <h2 className="mt-10 font-display text-xl font-semibold">
              {t.carDetail.specsTitle}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {specs(car, t).map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border bg-card p-4 shadow-xs"
                >
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <dt className="mt-2.5 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Features */}
            <h2 className="mt-10 font-display text-xl font-semibold">
              {t.carDetail.featuresTitle}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Included / requirements */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Card className="rounded-xl border shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-display text-base font-semibold">
                    {t.carDetail.includedTitle}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {t.content.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-xl border shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-display text-base font-semibold">
                    {t.carDetail.requirementsTitle}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {t.content.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking card */}
          <Card className="rounded-xl border shadow-soft lg:sticky lg:top-28">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t.carDetail.priceLabel}
              </p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold text-primary">
                  {car.pricePerDay}€
                </span>
                <span className="text-sm text-muted-foreground">
                  {t.carDetail.perDay}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {interpolate(t.carDetail.metaLine, {
                  fuel: fuelLabel(car.fuel, t),
                  transmission: transmissionLabel(car.transmission, t),
                  days: car.minDays,
                })}
              </p>

              <Separator className="my-5" />

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {t.carDetail.specTransmission}
                  </span>
                  <span className="font-medium">
                    {transmissionLabel(car.transmission, t)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.carDetail.specSeats}</span>
                  <span className="font-medium">{car.seats}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {t.carDetail.specCategory}
                  </span>
                  <span className="font-medium">{categoryLabel(car.category, t)}</span>
                </li>
              </ul>

              <div className="mt-6 space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link href={`${href(locale, "booking")}?car=${car.slug}`}>
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    {t.actions.bookThisCar}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a
                    href={whatsappLink(
                      interpolate(t.carDetail.whatsappMessage, {
                        name: car.name,
                        year: car.year,
                      })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.actions.askWhatsapp}
                  </a>
                </Button>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                {interpolate(t.carDetail.noOnlinePayment, {
                  phone: contact.phones[0],
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <SectionHeading
              title={t.carDetail.relatedTitle}
              action={
                <Button asChild variant="outline">
                  <Link href={href(locale, "cars")}>
                    <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    {t.footer.allCars}
                  </Link>
                </Button>
              }
            />
            <CarGrid cars={related} className="mt-8" />
          </section>
        )}
      </div>
    </>
  );
}
