"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { CalendarDays, Clock, MapPin, Search, Tag, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Bezel from "@/components/Bezel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rentalDays } from "@/data/cars";
import {
  MIN_RENTAL_DAYS,
  defaultBooking,
  driverAgeValues,
  timeSlots,
  toSearchParams,
  todayISO,
  type BookingQuery,
} from "@/lib/booking";
import { cn } from "@/lib/utils";
import { interpolate } from "@/i18n/format";
import { useDict, useLocale } from "@/i18n/client";
import { href } from "@/i18n/routes";

interface BookingWidgetProps {
  className?: string;
  /** Pre-selects a car, e.g. when arriving from a car detail page */
  car?: string;
  /** Label of the submit button */
  submitLabel?: string;
}

function Field({
  label,
  icon: Icon,
  htmlFor,
  children,
  className,
}: {
  label: string;
  icon: typeof MapPin;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
      >
        <Icon className="size-3.5 text-primary" aria-hidden="true" />
        {label}
      </Label>
      {children}
    </div>
  );
}

/**
 * Availability search widget. Collects the pickup/dropoff details and hands
 * them to the multi-step booking flow via the URL, so the state is shareable
 * and survives a page reload.
 */
export default function BookingWidget({
  className,
  car,
  submitLabel,
}: BookingWidgetProps) {
  const router = useRouter();
  const t = useDict();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  /** Pickup points come from the dictionary so labels follow the locale. */
  const pickupPoints = [
    { id: "rinas" as const, label: t.places.rinas.shortName },
    { id: "durres" as const, label: t.places.durres.shortName },
  ];

  const [booking, setBooking] = useState<BookingQuery>(() => {
    const defaults = defaultBooking(car);
    return defaults;
  });

  const days = useMemo(
    () => rentalDays(booking.from, booking.to),
    [booking.from, booking.to]
  );

  const set = <K extends keyof BookingQuery>(key: K, value: BookingQuery[K]) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (days <= 0) {
      toast.error(t.booking.validationDates);
      return;
    }
    if (days < MIN_RENTAL_DAYS) {
      toast.error(
        interpolate(t.booking.validationMinDays, { minDays: MIN_RENTAL_DAYS })
      );
      return;
    }

    startTransition(() => {
      router.push(`${href(locale, "booking")}?${toSearchParams({ ...booking, car })}`);
    });
  }

  return (
    <Bezel
      className={cn("shadow-soft-lg", className)}
      innerClassName="p-5 sm:p-6"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label={t.booking.pickupPoint} icon={MapPin}>
            <Select
              value={booking.pickup}
              onValueChange={(value) => set("pickup", value as BookingQuery["pickup"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.booking.choosePoint} />
              </SelectTrigger>
              <SelectContent>
                {pickupPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    {point.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t.booking.dropoffPoint} icon={MapPin}>
            <Select
              value={booking.dropoff}
              onValueChange={(value) =>
                set("dropoff", value as BookingQuery["dropoff"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.booking.choosePoint} />
              </SelectTrigger>
              <SelectContent>
                {pickupPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    {point.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t.booking.pickupDate} icon={CalendarDays} htmlFor="from">
            <Input
              id="from"
              type="date"
              required
              min={todayISO()}
              value={booking.from}
              onChange={(event) => set("from", event.target.value)}
            />
          </Field>

          <Field label={t.booking.pickupTime} icon={Clock}>
            <Select
              value={booking.fromTime}
              onValueChange={(value) => set("fromTime", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t.booking.dropoffDate} icon={CalendarDays} htmlFor="to">
            <Input
              id="to"
              type="date"
              required
              min={booking.from || todayISO()}
              value={booking.to}
              onChange={(event) => set("to", event.target.value)}
            />
          </Field>

          <Field label={t.booking.dropoffTime} icon={Clock}>
            <Select
              value={booking.toTime}
              onValueChange={(value) => set("toTime", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t.booking.driverAge} icon={User}>
            <Select value={booking.age} onValueChange={(value) => set("age", value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {driverAgeValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t.ageRanges[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t.booking.promoCode} icon={Tag} htmlFor="promo">
            <Input
              id="promo"
              placeholder={t.booking.promoPlaceholder}
              autoComplete="off"
              value={booking.promo}
              onChange={(event) => set("promo", event.target.value)}
            />
          </Field>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {days > 0 ? (
              <>
                <span className="font-semibold text-foreground">
                  {interpolate(t.booking.summaryDays, { days })}
                </span>{" "}
                {t.booking.priceFinalStep}
              </>
            ) : (
              t.booking.summaryChooseDates
            )}
          </p>

          <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
            <Search className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {isPending ? t.booking.searching : submitLabel ?? t.booking.submit}
          </Button>
        </div>
      </form>
    </Bezel>
  );
}
