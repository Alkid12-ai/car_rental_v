"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import Bezel from "@/components/Bezel";
import CarGrid from "@/components/CarGrid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  availableCategories,
  availableFuels,
  seatOptions,
  transmissions,
  type Car,
  type Category,
  type Fuel,
  type Transmission,
} from "@/data/cars";
import { compareText, interpolate } from "@/i18n/format";
import { categoryLabel, fuelLabel, transmissionLabel } from "@/i18n/carCopy";
import { useI18n } from "@/i18n/client";

type CategoryFilter = Category | "all";
type TransmissionFilter = Transmission | "all";
type FuelFilter = Fuel | "all";
type SeatFilter = number | "all";

const SORT_KEYS = ["popular", "priceAsc", "priceDesc", "nameAsc"] as const;

type SortKey = (typeof SORT_KEYS)[number];

/** Lower bound of the price slider — the ceiling is taken from the fleet itself. */
const PRICE_FLOOR = 20;

interface CarsExplorerProps {
  cars: Car[];
}

export default function CarsExplorer({ cars }: CarsExplorerProps) {
  const { locale, t } = useI18n();

  const sortLabels: Record<SortKey, string> = {
    popular: t.filters.sortPopular,
    priceAsc: t.filters.sortPriceAsc,
    priceDesc: t.filters.sortPriceDesc,
    nameAsc: t.filters.sortNameAsc,
  };

  const priceCeiling = useMemo(
    () => Math.max(PRICE_FLOOR + 10, ...cars.map((car) => car.pricePerDay)),
    [cars]
  );

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [transmission, setTransmission] = useState<TransmissionFilter>("all");
  const [fuel, setFuel] = useState<FuelFilter>("all");
  const [seats, setSeats] = useState<SeatFilter>("all");
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    const result = cars.filter((car) => {
      if (category !== "all" && car.category !== category) return false;
      if (transmission !== "all" && car.transmission !== transmission) return false;
      if (fuel !== "all" && car.fuel !== fuel) return false;
      if (seats !== "all" && car.seats !== seats) return false;
      if (car.pricePerDay > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "priceAsc":
        return result.sort((a, b) => a.pricePerDay - b.pricePerDay);
      case "priceDesc":
        return result.sort((a, b) => b.pricePerDay - a.pricePerDay);
      case "nameAsc":
        return result.sort((a, b) => compareText(a.name, b.name, locale));
      default:
        return result.sort(
          (a, b) =>
            Number(b.popular) - Number(a.popular) ||
            compareText(a.name, b.name, locale)
        );
    }
  }, [cars, category, transmission, fuel, seats, maxPrice, sort, locale]);

  const isDirty =
    category !== "all" ||
    transmission !== "all" ||
    fuel !== "all" ||
    seats !== "all" ||
    maxPrice !== priceCeiling;

  function reset() {
    setCategory("all");
    setTransmission("all");
    setFuel("all");
    setSeats("all");
    setMaxPrice(priceCeiling);
    setSort("popular");
  }

  const chipBase =
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";
  const chipOn = "border-primary bg-primary text-primary-foreground";
  const chipOff = "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:items-start">
      {/* Filters */}
      <Bezel
        className="shadow-soft lg:sticky lg:top-28"
        innerClassName="space-y-6 p-5"
      >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold">
              <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
              {t.filters.title}
            </h2>
            {isDirty && (
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="h-8 px-2 text-xs text-muted-foreground"
              >
                <X className="size-3.5" aria-hidden="true" />
                {t.actions.clear}
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {t.filters.category}
            </Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
                className={cn(chipBase, category === "all" ? chipOn : chipOff)}
              >
                {t.filters.all}
              </button>
              {availableCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={cn(chipBase, category === item ? chipOn : chipOff)}
                >
                  {categoryLabel(item, t)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {t.filters.transmission}
            </Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTransmission("all")}
                aria-pressed={transmission === "all"}
                className={cn(chipBase, transmission === "all" ? chipOn : chipOff)}
              >
                {t.filters.all}
              </button>
              {transmissions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTransmission(item)}
                  aria-pressed={transmission === item}
                  className={cn(chipBase, transmission === item ? chipOn : chipOff)}
                >
                  {transmissionLabel(item, t)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {t.filters.fuel}
            </Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFuel("all")}
                aria-pressed={fuel === "all"}
                className={cn(chipBase, fuel === "all" ? chipOn : chipOff)}
              >
                {t.filters.all}
              </button>
              {availableFuels.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFuel(item)}
                  aria-pressed={fuel === item}
                  className={cn(chipBase, fuel === item ? chipOn : chipOff)}
                >
                  {fuelLabel(item, t)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {t.filters.seats}
            </Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSeats("all")}
                aria-pressed={seats === "all"}
                className={cn(chipBase, seats === "all" ? chipOn : chipOff)}
              >
                {t.filters.all}
              </button>
              {seatOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSeats(item)}
                  aria-pressed={seats === item}
                  className={cn(chipBase, seats === item ? chipOn : chipOff)}
                >
                  {interpolate(t.filters.seatsCount, { count: item })}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {t.filters.maxPrice}
              </Label>
              <span className="text-sm font-semibold text-primary">
                {interpolate(t.filters.pricePerDay, { price: maxPrice })}
              </span>
            </div>
            <Slider
              value={[maxPrice]}
              min={PRICE_FLOOR}
              max={priceCeiling}
              step={1}
              onValueChange={(value) => setMaxPrice(value[0] ?? priceCeiling)}
              aria-label={t.filters.maxPriceAria}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{PRICE_FLOOR}€</span>
              <span>{priceCeiling}€</span>
            </div>
          </div>
      </Bezel>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {interpolate(
              filtered.length === 1 ? t.filters.resultOne : t.filters.resultMany,
              { count: filtered.length }
            )}
          </p>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="sort"
              className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
            >
              {t.filters.sort}
            </Label>
            <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
              <SelectTrigger id="sort" className="w-[13.5rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_KEYS.map((key) => (
                  <SelectItem key={key} value={key}>
                    {sortLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CarGrid cars={filtered} priorityCount={3} onReset={reset} />
      </div>
    </div>
  );
}
