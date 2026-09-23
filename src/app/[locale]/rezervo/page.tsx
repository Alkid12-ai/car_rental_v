import type { Metadata } from "next";

import BookingForm from "@/components/BookingForm";
import PageHero from "@/components/PageHero";
import { site } from "@/data/site";
import { parseBookingParams } from "@/lib/booking";
import { getDictionary } from "@/i18n";
import { href, metadataLanguages } from "@/i18n/routes";
import { resolveLocale } from "@/i18n/server";

interface PageProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);

  return {
    title: t.meta.booking.title,
    description: t.meta.booking.description,
    alternates: {
      canonical: href(locale, "booking"),
      languages: metadataLanguages("booking"),
    },
    openGraph: {
      title: `${t.meta.booking.title} | ${site.name}`,
      description: t.meta.booking.description,
      url: `${site.url}${href(locale, "booking")}`,
    },
  };
}

export default function RezervoPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDictionary(locale);
  const initial = parseBookingParams(searchParams);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <PageHero
          eyebrow={t.booking.eyebrow}
          title={t.booking.heroTitle}
          subtitle={t.booking.heroSubtitle}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <BookingForm initial={initial} />
      </div>
    </>
  );
}
