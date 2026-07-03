"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type KenBurnsImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function KenBurnsImage({
  src,
  alt,
  className,
  priority,
  sizes = "100vw",
}: KenBurnsImageProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.12 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={reduce ? undefined : { duration: 18, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
