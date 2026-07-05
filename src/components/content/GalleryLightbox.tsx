"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i === null ? 0 : (i - 1 + images.length) % images.length,
        );
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("nic:lenis-stop"));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("nic:lenis-start"));
    };
  }, [active, images.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-notte focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 45vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-notte/95 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Chiudi"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 text-3xl text-white/70 hover:text-white"
          >
            ×
          </button>
          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <p className="mt-4 max-w-2xl text-center text-sm text-white/70">
            {images[active].alt}
          </p>
        </div>
      )}
    </>
  );
}
