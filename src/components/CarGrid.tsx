"use client";

import { CarFront } from "lucide-react";

import CarCard from "@/components/CarCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Car } from "@/data/cars";
import { useDict } from "@/i18n/client";

interface CarGridProps {
  cars: Car[];
  className?: string;
  /** Renders the first row eagerly for faster LCP */
  priorityCount?: number;
  /** Shown when the filter yields no results */
  onReset?: () => void;
}

export default function CarGrid({
  cars,
  className,
  priorityCount = 0,
  onReset,
}: CarGridProps) {
  const t = useDict();

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-background text-muted-foreground shadow-xs">
          <CarFront className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold">
          {t.fleet.emptyTitle}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t.fleet.emptyBody}
        </p>
        {onReset && (
          <Button variant="outline" className="mt-5" onClick={onReset}>
            {t.actions.reset}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {cars.map((car, index) => (
        <Reveal key={car.id} delay={Math.min(index * 0.06, 0.3)}>
          <CarCard car={car} priority={index < priorityCount} className="h-full" />
        </Reveal>
      ))}
    </div>
  );
}
