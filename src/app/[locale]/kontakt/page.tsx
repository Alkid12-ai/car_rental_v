import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  contact,
  locations,
  mailtoLink,
  site,
  telLinks,
  whatsappLink,
} from "@/data/site";
import { getDictionary, interpolate } from "@/i18n";
import { href, metadataLanguages } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const description = interpolate(t.meta.contact.description, {
    phone: contact.phones[0],
    email: contact.email,
  });

  return {
    title: t.meta.contact.title,
    description,
    alternates: {
      canonical: href(locale, "contact"),
      languages: metadataLanguages("contact"),
    },
    openGraph: {
      title: `${t.meta.contact.title} | ${site.name}`,
      description,
      url: `${site.url}${href(locale, "contact")}`,
    },
  };
}

export default function KontaktPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${t.meta.contact.title} — ${site.name}`,
    url: `${site.url}${href(locale, "contact")}`,
  };

  const channels = [
    {
      icon: Phone,
      title: t.contact.channelPhone,
      lines: telLinks.map((tel) => ({ label: tel.display, href: tel.href })),
      note: t.contact.phoneHours,
    },
    {
      icon: MessageCircle,
      title: t.contact.channelWhatsapp,
      lines: [
        {
          label: contact.whatsappDisplay,
          href: whatsappLink(),
          external: true,
        },
      ],
      note: t.contact.whatsappNote,
    },
    {
      icon: Mail,
      title: t.contact.channelEmail,
      lines: [{ label: contact.email, href: mailtoLink }],
      note: t.contact.emailNote,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <PageHero
          eyebrow={t.contact.eyebrow}
          title={t.contact.heroTitle}
          subtitle={t.contact.heroSubtitle}
        />
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6">
        {/* Contact channels */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            {channels.map((channel, index) => (
              <Reveal key={channel.title} delay={index * 0.06}>
                <Card className="h-full rounded-xl border shadow-soft">
                  <CardContent className="p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <channel.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-display text-lg font-semibold">
                      {channel.title}
                    </h2>
                    <ul className="mt-3 space-y-1.5">
                      {channel.lines.map((line) => (
                        <li key={line.href}>
                          <a
                            href={line.href}
                            {...("external" in line && line.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="text-sm font-medium text-primary transition-colors hover:underline"
                          >
                            {line.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted-foreground">{channel.note}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Form + locations */}
        <section className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <ContactForm />

          <div>
            <SectionHeading
              eyebrow={t.locations.eyebrow}
              title={t.locations.twoPoints}
              description={t.locations.twoPointsDescription}
            />

            <div className="mt-6 space-y-5">
              {locations.map((location) => (
                <Card key={location.id} className="rounded-xl border shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-base font-semibold">
                        {t.places[location.id].shortName}
                      </h3>
                      <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                        <Clock className="size-3" aria-hidden="true" />
                        {t.places[location.id].hours}
                      </span>
                    </div>

                    <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
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

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {location.id === "rinas"
                        ? t.content.locationRinasDescription
                        : t.content.locationDurresDescription}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 rounded-xl border bg-secondary/40 p-5">
              <p className="text-sm font-medium">{t.contact.planningTitle}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t.contact.planningBody}
              </p>
              <Button asChild className="mt-4">
                <Link href={href(locale, "booking")}>{t.nav.reserve}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
