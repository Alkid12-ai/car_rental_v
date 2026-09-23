import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  Clock,
  Handshake,
  Headphones,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import FeatureCard from "@/components/FeatureCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contact, locations, site } from "@/data/site";
import { getDictionary, interpolate } from "@/i18n";
import { href, metadataLanguages } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const description = interpolate(t.meta.about.description, {
    count: site.fleetSize,
  });

  return {
    title: t.meta.about.title,
    description,
    alternates: {
      canonical: href(locale, "about"),
      languages: metadataLanguages("about"),
    },
    openGraph: {
      title: `${t.meta.about.title} | ${site.name}`,
      description,
      url: `${site.url}${href(locale, "about")}`,
    },
  };
}

export default function RrethNeshPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);

  const values = [
    {
      icon: ShieldCheck,
      title: t.about.value1Title,
      description: t.about.value1Body,
    },
    {
      icon: Wallet,
      title: t.about.value2Title,
      description: t.about.value2Body,
    },
    {
      icon: Headphones,
      title: t.about.value3Title,
      description: t.about.value3Body,
    },
  ];

  const stats = [
    { value: String(site.fleetSize), label: t.about.statFleet },
    { value: "2", label: t.about.statPoints },
    { value: "24/7", label: t.about.statPickup },
    { value: "3", label: t.about.statSteps },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <PageHero
          eyebrow={t.about.eyebrow}
          title={t.about.heroTitle}
          subtitle={t.about.heroSubtitle}
        />
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6">
        {/* Story */}
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-balance">
                {interpolate(t.about.storyTitle, { count: site.fleetSize })}
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>{t.about.storyP1}</p>
                <p>{interpolate(t.about.storyP2, { count: site.fleetSize })}</p>
                <p>{t.about.storyP3}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={href(locale, "cars")}>
                    {t.actions.viewCars}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={href(locale, "booking")}>
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    {t.nav.reserve}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-6 shadow-soft"
                >
                  <p className="font-display text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Values */}
        <section>
          <SectionHeading
            eyebrow={t.about.valuesEyebrow}
            title={t.about.valuesTitle}
            description={t.about.valuesDescription}
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <FeatureCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Booking steps */}
        <section>
          <SectionHeading
            eyebrow={t.about.processEyebrow}
            title={t.about.processTitle}
            description={t.about.processDescription}
          />
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {t.content.bookingSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <li className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-soft">
                  <span className="font-display text-3xl font-bold text-primary/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Locations */}
        <section>
          <SectionHeading
            eyebrow={t.locations.eyebrow}
            title={t.locations.pageTitle}
            description={t.locations.pageDescription}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {locations.map((location, index) => (
              <Reveal key={location.id} delay={index * 0.06}>
                <Card className="h-full rounded-xl border shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold">
                        {t.places[location.id].shortName}
                      </h3>
                      <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                        <Clock className="size-3" aria-hidden="true" />
                        {t.places[location.id].hours}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {location.id === "rinas"
                        ? t.content.locationRinasDescription
                        : t.content.locationDurresDescription}
                    </p>
                    <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>
                        {location.address}
                        {location.address ? <br /> : null}
                        {t.places[location.id].city}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section>
          <Card className="rounded-2xl border shadow-soft">
            <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                  {t.about.requirementsTitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t.about.requirementsBody}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={href(locale, "booking")}>{t.nav.reserve}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={href(locale, "contact")}>{t.actions.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <ul className="space-y-3">
                {t.content.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border bg-muted/40 p-3.5 text-sm"
                  >
                    <BadgeCheck
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Contact strip */}
        <section className="rounded-2xl border bg-secondary/40 p-6 sm:p-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Handshake className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {t.about.questionsTitle}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {interpolate(t.about.questionsBody, {
                    phone: contact.phones[0],
                    email: contact.email,
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={href(locale, "contact")}>{t.actions.contact}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={href(locale, "cars")}>
                  <Car className="size-4" aria-hidden="true" />
                  {t.nav.cars}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
