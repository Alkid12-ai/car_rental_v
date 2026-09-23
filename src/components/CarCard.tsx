"use client";

import Image from "next/image";
import Link from "next/link";
import { Cog, Fuel, Users } from "lucide-react";

import Bezel from "@/components/Bezel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Car } from "@/data/cars";
import { interpolate } from "@/i18n/format";
import { categoryLabel, fuelLabel, transmissionLabel } from "@/i18n/carCopy";
import { useDict, useLocale } from "@/i18n/client";
import { href } from "@/i18n/routes";

interface CarCardProps {
  car: Car;
  className?: string;
  /** Renders the image eagerly — use for above-the-fold cards */
  priority?: boolean;
}

export default function CarCard({ car, className, priority }: CarCardProps) {
  const locale = useLocale();
  const t = useDict();
  const category = categoryLabel(car.category, t);
  /** Built once — three call sites would otherwise drift apart. */
  const detailHref = href(locale, "cars", car.slug);

  return (
    <Bezel
      className={cn(
        "group h-full shadow-soft transition-[transform,box-shadow] duration-700 ease-vanguard hover:-translate-y-1.5 hover:shadow-soft-lg",
        className
      )}
      innerClassName="flex h-full flex-col overflow-hidden"
    >
      <Link
        href={detailHref}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        aria-label={interpolate(t.fleet.viewDetailsLabel, {
          name: car.name,
          year: car.year,
        })}
      >
        <Image
          src={car.image}
          alt={interpolate(t.fleet.imageAlt, { name: car.name, year: car.year })}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-vanguard group-hover:scale-[1.06]"
        />
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 rounded-full bg-background font-semibold text-foreground shadow-xs"
        >
          {category}
        </Badge>
        {car.transmission === "automatic" && (
          <Badge className="absolute right-3 top-3 rounded-full font-semibold shadow-xs">
            {t.carDetail.autoBadge}
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">
            <Link href={detailHref} className="hover:text-primary">
              {car.name}
            </Link>{" "}
            <span className="font-normal text-muted-foreground">{car.year}</span>
          </h3>
          <p className="shrink-0 text-right">
            <span className="font-display text-2xl font-bold text-primary">
              {car.pricePerDay}€
            </span>
            <span className="block text-xs text-muted-foreground">
              {t.fleet.perDay}
            </span>
          </p>
        </div>

        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Cog className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            <dt className="sr-only">{t.carDetail.specTransmission}</dt>
            <dd>{transmissionLabel(car.transmission, t)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            <dt className="sr-only">{t.carDetail.specSeats}</dt>
            <dd>{interpolate(t.fleet.seatsShort, { count: car.seats })}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            <dt className="sr-only">{t.carDetail.specFuel}</dt>
            <dd>{fuelLabel(car.fuel, t)}</dd>
          </div>
        </dl>

        <p className="mt-3 text-xs font-medium text-muted-foreground">
          {interpolate(t.fleet.cardMeta, { days: car.minDays, category })}
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <Button asChild variant="outline" className="flex-1">
            <Link href={detailHref}>{t.actions.details}</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href={`${href(locale, "booking")}?car=${car.slug}`}>
              {t.actions.book}
            </Link>
          </Button>
        </div>
      </div>
    </Bezel>
  );
}
