import Link from "next/link";
import {
  Car,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getDictionary, interpolate, type Locale } from "@/i18n";
import { anchorHref, href } from "@/i18n/routes";
import {
  contact,
  locations,
  mailtoLink,
  site,
  social,
  telLinks,
} from "@/data/site";

const socialIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

/**
 * `locale` arrives as a prop rather than from request context: this is a Server
 * Component, so it has no access to the client i18n context, and reading
 * `headers()` here would opt every page out of static rendering.
 */
export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const currentYear = new Date().getFullYear();
  const activeSocial = social.filter((item) => item.url.trim().length > 0);

  const navItems = [
    { href: href(locale, "cars"), label: t.nav.cars },
    { href: anchorHref(locale, "locations"), label: t.nav.locations },
    { href: anchorHref(locale, "howItWorks"), label: t.nav.howItWorks },
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  return (
    <footer className="mt-20 border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Car className="size-4" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.footer.brandBlurb}
            </p>

            {activeSocial.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t.footer.followTitle}
                </p>
                <div className="mt-3 flex gap-2">
                  {activeSocial.map((item) => {
                    const Icon = socialIcons[item.id];
                    if (!Icon) return null;
                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="grid size-9 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          <nav aria-label={t.footer.linksTitle}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              {t.footer.linksTitle}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href(locale, "cars")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.footer.allCars}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Locations */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              {t.footer.locationsTitle}
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              {locations.map((location) => (
                <li key={location.id}>
                  <p className="flex items-center gap-1.5 font-medium text-foreground">
                    <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                    {t.places[location.id].shortName}
                  </p>
                  <p className="mt-1 pl-5 text-muted-foreground">
                    {/* Rinas has no street address, so the line is suppressed rather than left blank. */}
                    {location.address}
                    {location.address ? <br /> : null}
                    {t.places[location.id].city}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 pl-5 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {t.places[location.id].hours}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              {t.footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {telLinks.map((tel) => (
                <li key={tel.href}>
                  <a
                    href={tel.href}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="size-3.5 text-primary" aria-hidden="true" />
                    {tel.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={mailtoLink}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-3.5 text-primary" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              {/*
                Registered address. Rendered from `contact.postal` - the same
                constant the structured data uses - so the tagged address and the
                visible address are guaranteed to match. The pickup-point
                addresses already appear in the Locations column above; repeating
                them here was what let the two drift out of sync.
              */}
              <li>
                <p className="flex items-start gap-2 text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    {contact.postal.street}
                    <br />
                    {contact.postal.city} {contact.postal.postalCode}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            {interpolate(t.footer.copyright, {
              year: currentYear,
              name: site.name,
            })}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
