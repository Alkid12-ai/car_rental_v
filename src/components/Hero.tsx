import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, MapPin, Wallet } from "lucide-react";

import BookingWidget from "@/components/BookingWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cars, getCarBySlug } from "@/data/cars";
import { site } from "@/data/site";
import { getDictionary, interpolate, type Locale } from "@/i18n";
import { href } from "@/i18n/routes";

/** Car featured behind the headline — resolved by slug, not list position. */
const heroCar = getCarBySlug(site.heroCarSlug) ?? cars[0];
const heroImage = heroCar.image;

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const stats = [
    {
      icon: BadgeCheck,
      label: interpolate(t.hero.statAvailable, { count: site.fleetSize }),
    },
    { icon: Clock, label: t.hero.statPickup },
    {
      icon: Wallet,
      label: interpolate(t.hero.statPrice, { price: site.priceFrom }),
    },
  ];

  return (
    <section className="relative">
      <div className="relative isolate overflow-hidden rounded-2xl border shadow-soft">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_55%)]" />

        <div className="relative z-10 px-6 pb-24 pt-12 sm:px-10 sm:pb-28 sm:pt-16 lg:pb-32 lg:pt-20">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground hover:bg-white/20"
            >
              <MapPin className="size-3.5" aria-hidden="true" />
              {t.hero.badge}
            </Badge>

            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.08] text-primary-foreground text-balance sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              {interpolate(t.hero.subtitle, {
                count: site.fleetSize,
                from: site.priceFrom,
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href={href(locale, "cars")}>
                  {t.actions.seeAll}
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link href={href(locale, "booking")}>{t.nav.reserve}</Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {stats.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-primary-foreground/90"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Search widget straddles the hero edge on larger screens */}
      <BookingWidget
        className="relative z-20 mx-auto -mt-16 max-w-6xl sm:-mt-20 lg:-mt-16 lg:mx-10"
        submitLabel={t.booking.submitSearch}
      />
    </section>
  );
}
