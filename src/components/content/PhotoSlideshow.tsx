"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Slide = { src: string; alt: string };

// Carosello di foto REALI in dissolvenza incrociata (con leggero Ken Burns).
// Pensato come sfondo atmosferico. Su reduced-motion resta ferma sulla prima.
export function PhotoSlideshow({
  slides,
  className,
  intervalMs = 4500,
}: {
  slides: Slide[];
  className?: string;
  intervalMs?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      intervalMs,
    );
    return () => clearInterval(t);
  }, [reduce, slides.length, intervalMs]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={cn(
              "object-cover",
              !reduce && i === index && "slideshow-kb",
            )}
          />
        </div>
      ))}
    </div>
  );
}
