"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Car,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useDict, useLocale } from "@/i18n/client";
import { anchorHref, href } from "@/i18n/routes";
import { contact, mailtoLink, telLinks } from "@/data/site";

/**
 * Anchors are never "current" — they point at a section, not a page. The home
 * route is deliberately not in this list, so the prefix test cannot mark it
 * active on every locale-prefixed route.
 */
function isLinkActive(pathname: string, link: string) {
  if (link.includes("#")) return false;
  return pathname === link || pathname.startsWith(`${link}/`);
}

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const { dark, toggle } = useTheme();
  const t = useDict();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Every href is built from the route table — no path is hardcoded. */
  const navItems = [
    { href: href(locale, "cars"), label: t.nav.cars },
    { href: anchorHref(locale, "locations"), label: t.nav.locations },
    { href: anchorHref(locale, "howItWorks"), label: t.nav.howItWorks },
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 sm:px-6">
      {/* design.md §5A — floating glass nav pill, detached from the top edge.
          backdrop-blur is permitted here only because the header is sticky (§6). */}
      <div
        className={cn(
          "mx-auto w-full max-w-7xl rounded-full border border-black/5 bg-background/80 ring-1 ring-white/40 backdrop-blur-xl dark:border-white/10 dark:ring-white/5",
          "transition-[box-shadow,background-color] duration-700 ease-vanguard",
          scrolled ? "bg-background/95 shadow-soft-lg" : "shadow-soft"
        )}
      >
        <div className="flex h-14 w-full items-center justify-between gap-3 px-2.5 sm:h-16 sm:px-4">
          <Link
            href={href(locale, "home")}
            className="flex shrink-0 items-center gap-2.5"
            aria-label={t.nav.homeLabel}
          >
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft sm:size-10">
              <Car className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold tracking-tight sm:text-lg">
                rentcardb
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground xl:block">
                {t.nav.brandSub}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t.nav.mainNav}>
            {navItems.map((item) => {
              const active = isLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-500 ease-vanguard",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Trust anchor: a direct line to the business stays inside the pill */}
            <a
              href={telLinks[0].href}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-500 ease-vanguard hover:bg-accent hover:text-accent-foreground xl:inline-flex"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {telLinks[0].display}
            </a>
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={dark ? t.nav.themeToLight : t.nav.themeToDark}
              className="hidden sm:inline-flex"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href={href(locale, "booking")}>
                <CalendarCheck className="size-4" aria-hidden="true" />
                {t.nav.reserve}
              </Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label={t.nav.openMenu}>
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(20rem,90vw)] p-0">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="font-display text-lg">{t.nav.menu}</SheetTitle>
                  <SheetDescription className="text-sm">
                    {t.nav.menuSubtitle}
                  </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col p-3" aria-label={t.nav.mobileNav}>
                  {navItems.map((item) => {
                    const active = isLinkActive(pathname, item.href);
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "rounded-md px-3 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <Separator />

                <div className="space-y-4 p-6">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link href={href(locale, "booking")}>
                        <CalendarCheck className="size-4" aria-hidden="true" />
                        {t.nav.reserve}
                      </Link>
                    </Button>
                  </SheetClose>

                  <div className="space-y-2 text-sm">
                    {telLinks.map((tel) => (
                      <a
                        key={tel.href}
                        href={tel.href}
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        {tel.display}
                      </a>
                    ))}
                    <a
                      href={mailtoLink}
                      className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      {contact.email}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
