"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { interpolate } from "@/i18n/format";
import { useDict } from "@/i18n/client";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

export default function CarGallery({ images, alt }: CarGalleryProps) {
  const t = useDict();
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-muted shadow-soft">
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div
          className="mt-3 grid grid-cols-4 gap-3"
          role="tablist"
          aria-label={t.carDetail.galleryLabel}
        >
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={interpolate(t.carDetail.galleryPhoto, { index: index + 1 })}
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50",
                index === active
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
