import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { contact, site, social } from "@/data/site";
import {
  getDictionary,
  interpolate,
  intlTags,
  isLocale,
  locales,
  ogLocales,
  type Locale,
} from "@/i18n";
import { I18nProvider } from "@/i18n/client";
import { metadataLanguages } from "@/i18n/routes";
import { ThemeProvider } from "@/hooks/use-theme";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

type LocaleParams = { params: { locale: string } };

/**
 * This is the root layout for the whole site — there is deliberately no
 * `app/layout.tsx`. Placing `<html>` here is what allows `lang` to follow the
 * active locale, which is required for correct hyphenation, screen-reader
 * pronunciation and Google's language detection. A root layout above
 * `[locale]` could not see the locale at all.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = getDictionary(locale);

  const description = interpolate(t.meta.home.description, {
    count: site.fleetSize,
    price: site.priceFrom,
  });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.home.title,
      template: `%s | ${site.name}`,
    },
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    /** Canonical + hreflang defaults for the homepage; each page overrides. */
    alternates: {
      canonical: `/${locale}`,
      languages: metadataLanguages("home"),
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: t.meta.home.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.home.title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "travel",
  };
}

export const viewport: Viewport = {
  themeColor: "#0B6E7F",
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;
  const t = getDictionary(locale);

  /**
   * Organization-level structured data. `inLanguage` is set so an answer engine
   * quoting a French page does not attribute Albanian prose to it.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: site.name,
    description: interpolate(t.meta.home.description, {
      count: site.fleetSize,
      price: site.priceFrom,
    }),
    url: `${site.url}/${locale}`,
    inLanguage: intlTags[locale],
    telephone: contact.phones,
    email: contact.email,
    priceRange: `${site.priceFrom}€-${site.priceTo}€`,
    currenciesAccepted: site.currency,
    paymentAccepted: "Cash, Credit Card",
    areaServed: [
      { "@type": "City", name: "Tiranë" },
      { "@type": "City", name: "Durrës" },
      { "@type": "Place", name: "Aeroporti Ndërkombëtar i Tiranës (Rinas)" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.postal.street,
      addressLocality: contact.postal.city,
      postalCode: contact.postal.postalCode,
      addressCountry: contact.postal.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    hasMap: contact.mapsUrl,
    sameAs: social.filter((profile) => profile.url).map((profile) => profile.url),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <html lang={intlTags[locale]} suppressHydrationWarning>
      <body
        className={`${jakarta.variable} min-h-[100dvh] bg-background font-sans text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <I18nProvider locale={locale} dict={t}>
            <div className="flex min-h-[100dvh] flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
            </div>
            <WhatsAppButton />
            <Toaster position="top-center" richColors />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
