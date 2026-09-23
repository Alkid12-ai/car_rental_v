import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  Car,
  CreditCard,
  Headphones,
  KeyRound,
  Plane,
  ShieldCheck,
  Waves,
} from "lucide-react";

import CarGrid from "@/components/CarGrid";
import CtaLink from "@/components/CtaLink";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getPopularCars } from "@/data/cars";
import { contact, site, whatsappLink } from "@/data/site";
import { getDictionary, interpolate } from "@/i18n";
import { anchorSlugs, href } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";
import { faqJsonLd } from "@/lib/seo";

interface PageProps {
  params: { locale: string };
}

export default function HomePage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const popularCars = getPopularCars();

  /** Step numbers are presentation, not content — kept out of the dictionary. */
  const steps = [
    {
      step: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Body,
    },
    {
      step: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Body,
    },
    {
      step: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Body,
    },
    {
      step: "04",
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Body,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(t)) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Hero locale={locale} />
      </div>

      <div className="mx-auto mt-24 max-w-7xl space-y-24 px-4 sm:px-6 lg:mt-32 lg:space-y-32">
        {/* Most requested cars */}
        <section id={anchorSlugs.fleet[locale]}>
          <SectionHeading
            title={t.fleet.title}
            description={t.fleet.description}
            action={
              <CtaLink href={href(locale, "cars")} variant="outline">
                {t.actions.seeAll}
              </CtaLink>
            }
          />
          {/* The hero image is the LCP here, so the grid below the fold must not
              compete for bandwidth with priority preloads. */}
          <CarGrid cars={popularCars} className="mt-8" />
        </section>

        {/* Locations */}
        <section id={anchorSlugs.locations[locale]}>
          <SectionHeading
            title={t.locations.title}
            description={interpolate(t.meta.home.description, {
              count: site.fleetSize,
              price: site.priceFrom,
            })}
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <FeatureCard
                icon={Plane}
                eyebrow={t.locations.cardEyebrowRinas}
                title={t.locations.cardTitleRinas}
                description={t.content.locationRinasDescription}
                items={[...t.content.locationRinasHighlights]}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <FeatureCard
                icon={Waves}
                eyebrow={t.locations.cardEyebrowDurres}
                title={t.locations.cardTitleDurres}
                description={t.content.locationDurresDescription}
                items={[...t.content.locationDurresHighlights]}
              />
            </Reveal>
          </div>

          <div className="mt-10">
            <CtaLink href={href(locale, "cars")}>{t.locations.seeAll}</CtaLink>
          </div>
        </section>

        {/* How it works */}
        <section id={anchorSlugs.howItWorks[locale]}>
          <SectionHeading
            eyebrow={t.howItWorks.eyebrow}
            title={t.howItWorks.title}
            description={t.howItWorks.description}
            align="center"
          />

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.06}>
                <li className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-soft">
                  <span className="font-display text-3xl font-bold text-primary/25">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Transparency */}
        <section>
          <SectionHeading
            eyebrow={t.transparency.eyebrow}
            title={t.transparency.title}
            description={t.transparency.description}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Reveal>
              <FeatureCard
                icon={BadgeCheck}
                title={t.transparency.includedTitle}
                description={t.transparency.includedBody}
                items={[...t.content.included]}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <FeatureCard
                icon={CreditCard}
                title={t.transparency.requirementsTitle}
                description={t.transparency.requirementsBody}
                items={[...t.content.requirements]}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <FeatureCard
                icon={ShieldCheck}
                title={t.transparency.whyTitle}
                description={interpolate(t.transparency.whyBody, {
                  count: site.fleetSize,
                })}
                items={[
                  t.transparency.whyItem1,
                  t.transparency.whyItem2,
                  t.transparency.whyItem3,
                  t.transparency.whyItem4,
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            description={t.faq.description}
          />

          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {t.content.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Closing CTA */}
        <section className="rounded-2xl border bg-primary px-6 py-12 text-primary-foreground shadow-soft sm:px-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                {t.cta.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">
                {t.cta.body}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href={href(locale, "booking")}>
                  <CalendarCheck className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {t.nav.reserve}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
              >
                <a
                  href={whatsappLink(t.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Headphones className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {contact.phones[0]}
                </a>
              </Button>
            </div>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-3">
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <Car className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {interpolate(t.cta.statFleet, { count: site.fleetSize })}
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <KeyRound className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {t.cta.statPickup}
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <Headphones className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {t.cta.statSupport}
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
