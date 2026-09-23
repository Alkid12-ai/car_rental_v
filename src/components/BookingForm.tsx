"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Tag,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cars as allCars, calculatePrice, rentalDays, type Car } from "@/data/cars";
import { contact, locations, whatsappLink } from "@/data/site";
import {
  MIN_RENTAL_DAYS,
  driverAgeValues,
  timeSlots,
  todayISO,
  type BookingQuery,
} from "@/lib/booking";
import { cn } from "@/lib/utils";
import { formatDate, interpolate } from "@/i18n/format";
import { categoryLabel, transmissionLabel } from "@/i18n/carCopy";
import { href } from "@/i18n/routes";
import { useI18n } from "@/i18n/client";

const ease = [0.22, 1, 0.36, 1] as const;

interface BookingFormProps {
  initial: BookingQuery & { car?: string };
}

function Field({
  label,
  icon: Icon,
  htmlFor,
  children,
}: {
  label: string;
  icon: typeof MapPin;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function BookingForm({ initial }: BookingFormProps) {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useI18n();
  const steps = [t.booking.step1, t.booking.step2, t.booking.step3];
  /** Locale-aware date rendering; `locale` comes from the provider, not a prop. */
  const date = (iso: string) => formatDate(iso, locale);
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingQuery>(initial);
  const [selectedSlug, setSelectedSlug] = useState<string>(initial.car ?? "");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [reference, setReference] = useState<string | null>(null);

  const days = useMemo(
    () => rentalDays(booking.from, booking.to),
    [booking.from, booking.to]
  );

  const selectedCar: Car | undefined = useMemo(
    () => allCars.find((car) => car.slug === selectedSlug),
    [selectedSlug]
  );

  const pricing = selectedCar ? calculatePrice(selectedCar, days) : null;

  const set = <K extends keyof BookingQuery>(key: K, value: BookingQuery[K]) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  /** Pickup-point names come from the dictionary, so they follow the locale. */
  const locationLabel = (id: string) =>
    (t.places as Record<string, { shortName: string }>)[id]?.shortName ?? id;

  function goToStepTwo() {
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
    setStep(2);
  }

  function goToStepThree() {
    if (!selectedSlug) {
      toast.error(t.booking.chooseCar);
      return;
    }
    setStep(3);
  }

  function handleConfirm(event: React.FormEvent) {
    event.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim() || !customer.email.trim()) {
      toast.error(t.booking.validationCustomer);
      return;
    }

    const code = `RCB-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setReference(code);
    toast.success(t.booking.successToast);
  }

  if (reference && selectedCar && pricing) {
    const message = interpolate(t.booking.whatsappMessageFull, {
      reference,
      car: `${selectedCar.name} ${selectedCar.year}`,
      pickup: locationLabel(booking.pickup),
      dropoff: locationLabel(booking.dropoff),
      from: date(booking.from),
      to: date(booking.to),
      fromTime: booking.fromTime,
      toTime: booking.toTime,
      days: pricing.days,
      total: pricing.total,
      name: customer.name,
      phone: customer.phone,
    });

    return (
      <Card className="rounded-xl border shadow-soft">
        <CardContent className="p-6 text-center sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold">
            {interpolate(t.booking.successTitle, {
              name: customer.name.split(" ")[0],
            })}
          </h2>
          {/*
            Rendered as one interpolated sentence rather than being split around
            a highlighted token: word order differs per language, so slicing a
            sentence into fragments is how translations end up ungrammatical.
          */}
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {interpolate(t.booking.successBody, {
              reference,
              phone: contact.phones[0],
            })}
          </p>

          <div className="mx-auto mt-7 max-w-md rounded-xl border bg-muted/40 p-5 text-left">
            <SummaryRow
              label={t.booking.summaryCar}
              value={`${selectedCar.name} ${selectedCar.year}`}
            />
            <SummaryRow
              label={t.booking.summaryPickup}
              value={`${locationLabel(booking.pickup)} · ${date(booking.from)} · ${booking.fromTime}`}
            />
            <SummaryRow
              label={t.booking.summaryDropoff}
              value={`${locationLabel(booking.dropoff)} · ${date(booking.to)} · ${booking.toTime}`}
            />
            <Separator className="my-2" />
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold">
                {t.booking.summaryTotal} (
                {interpolate(t.booking.summaryDays, { days: pricing.days })})
              </span>
              <span className="font-display text-xl font-bold text-primary">
                {pricing.total}€
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {t.booking.sendWhatsapp}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={href(locale, "cars")}>{t.actions.otherCars}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
      <div>
        {/* Stepper */}
        <ol className="flex items-center gap-2 sm:gap-4">
          {steps.map((label, index) => {
            const number = index + 1;
            const done = step > number;
            const active = step === number;
            return (
              <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors",
                    active && "border-primary bg-primary text-primary-foreground",
                    done && "border-primary bg-primary/10 text-primary",
                    !active && !done && "border-border bg-background text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {done ? <Check className="size-4" /> : number}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
                {index < steps.length - 1 && (
                  <span
                    className={cn(
                      "h-px flex-1 transition-colors",
                      done ? "bg-primary/40" : "bg-border"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:hidden">
          {interpolate(t.booking.stepCounter, { step, label: steps[step - 1] })}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
            className="mt-6"
          >
            {step === 1 && (
              <Card className="rounded-xl border shadow-soft">
                <CardContent className="p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold">
                    {t.booking.step1Title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {interpolate(t.booking.step1Body, { minDays: MIN_RENTAL_DAYS })}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label={t.booking.pickupPoint} icon={MapPin}>
                      <Select
                        value={booking.pickup}
                        onValueChange={(value) =>
                          set("pickup", value as BookingQuery["pickup"])
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {t.places[location.id].shortName}
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
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {t.places[location.id].shortName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label={t.booking.pickupDate} icon={CalendarDays} htmlFor="b-from">
                      <Input
                        id="b-from"
                        type="date"
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

                    <Field label={t.booking.dropoffDate} icon={CalendarDays} htmlFor="b-to">
                      <Input
                        id="b-to"
                        type="date"
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
                      <Select
                        value={booking.age}
                        onValueChange={(value) => set("age", value)}
                      >
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

                    <Field label={t.booking.promoCode} icon={Tag} htmlFor="b-promo">
                      <Input
                        id="b-promo"
                        placeholder={t.booking.promoPlaceholder}
                        value={booking.promo}
                        onChange={(event) => set("promo", event.target.value)}
                      />
                    </Field>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-5">
                    <p className="text-sm text-muted-foreground">
                      {days > 0
                        ? interpolate(t.booking.daysRental, { days })
                        : t.booking.summaryChooseDates}
                    </p>
                    <Button onClick={goToStepTwo}>
                      {t.actions.continue}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="rounded-xl border shadow-soft">
                <CardContent className="p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold">
                    {t.booking.step2Title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {interpolate(t.booking.step2Body, {
                      days,
                      from: locationLabel(booking.pickup),
                      to: locationLabel(booking.dropoff),
                    })}
                  </p>

                  <div className="mt-6 space-y-3">
                    {allCars.map((car) => {
                      const active = car.slug === selectedSlug;
                      const total = calculatePrice(car, days);
                      return (
                        <button
                          key={car.id}
                          type="button"
                          onClick={() => setSelectedSlug(car.slug)}
                          aria-pressed={active}
                          className={cn(
                            "flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                            active
                              ? "border-primary bg-accent/60 shadow-soft"
                              : "hover:border-primary/40 hover:bg-accent/30"
                          )}
                        >
                          <span className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24">
                            <Image
                              src={car.image}
                              alt=""
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="font-display text-base font-semibold">
                                {car.name} {car.year}
                              </span>
                              {active && (
                                <Check className="size-4 text-primary" aria-hidden="true" />
                              )}
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {categoryLabel(car.category, t)} ·{" "}
                              {transmissionLabel(car.transmission, t)} ·{" "}
                              {interpolate(t.fleet.seatsShort, { count: car.seats })}
                            </span>
                            <span className="mt-2 block text-sm font-semibold text-primary">
                              {total.total}€
                              <span className="ml-1 font-normal text-muted-foreground">
                                {interpolate(t.booking.totalPerDay, {
                                  price: total.perDay,
                                })}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-5">
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      <ArrowLeft className="size-4" aria-hidden="true" />
                      {t.actions.back}
                    </Button>
                    <Button onClick={goToStepThree}>
                      {t.actions.continue}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && selectedCar && pricing && (
              <Card className="rounded-xl border shadow-soft">
                <CardContent className="p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold">
                    {t.booking.step3Title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.booking.step3Body}
                  </p>

                  <form onSubmit={handleConfirm} className="mt-6 space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="c-name"
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {t.booking.fullName}
                        </Label>
                        <Input
                          id="c-name"
                          required
                          autoComplete="name"
                          value={customer.name}
                          onChange={(event) =>
                            setCustomer((prev) => ({ ...prev, name: event.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="c-phone"
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {t.booking.phone}
                        </Label>
                        <Input
                          id="c-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="+355 69 ..."
                          value={customer.phone}
                          onChange={(event) =>
                            setCustomer((prev) => ({ ...prev, phone: event.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label
                          htmlFor="c-email"
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {t.booking.email}
                        </Label>
                        <Input
                          id="c-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={customer.email}
                          onChange={(event) =>
                            setCustomer((prev) => ({ ...prev, email: event.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label
                          htmlFor="c-notes"
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {t.booking.notes}
                        </Label>
                        <Textarea
                          id="c-notes"
                          rows={3}
                          placeholder={t.booking.notesPlaceholder}
                          value={customer.notes}
                          onChange={(event) =>
                            setCustomer((prev) => ({ ...prev, notes: event.target.value }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-5">
                      <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        {t.actions.back}
                      </Button>
                      <Button type="submit" size="lg">
                        <Check className="size-4" aria-hidden="true" />
                        {t.booking.confirmBooking}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky summary */}
      <Card className="rounded-xl border shadow-soft lg:sticky lg:top-28">
        <CardContent className="p-5">
          <h2 className="font-display text-base font-semibold">
            {t.booking.summaryTitle}
          </h2>

          <div className="mt-4 divide-y">
            <SummaryRow
              label={t.booking.summaryPickup}
              value={locationLabel(booking.pickup)}
            />
            <SummaryRow
              label={t.booking.summaryPickupDate}
              value={`${date(booking.from)} · ${booking.fromTime}`}
            />
            <SummaryRow
              label={t.booking.summaryDropoff}
              value={locationLabel(booking.dropoff)}
            />
            <SummaryRow
              label={t.booking.summaryDropoffDate}
              value={`${date(booking.to)} · ${booking.toTime}`}
            />
            <SummaryRow
              label={t.booking.summaryDuration}
              value={days > 0 ? interpolate(t.booking.summaryDays, { days }) : "—"}
            />
            <SummaryRow
              label={t.booking.summaryCar}
              value={
                selectedCar
                  ? `${selectedCar.name} ${selectedCar.year}`
                  : t.booking.summaryCarUnset
              }
            />
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{t.booking.summaryTotal}</span>
            <span className="font-display text-2xl font-bold text-primary">
              {pricing ? `${pricing.total}€` : "—"}
            </span>
          </div>

          {/*
            The weekly-rate note is only meaningful when the car actually has a
            weekly rate, so it is guarded on that rather than on `discount`
            alone — `pricePerWeek` is optional on `Car`.
          */}
          {pricing && pricing.discount && selectedCar?.pricePerWeek && (
            <p className="mt-2 text-xs text-muted-foreground">
              {interpolate(t.booking.summaryDiscountNote, {
                price: selectedCar.pricePerWeek,
              })}
            </p>
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {t.booking.summaryFootnote}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
