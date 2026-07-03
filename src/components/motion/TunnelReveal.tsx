"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Effetto "tunnel": il contenuto emerge dalla profondità entrando nel viewport
// e si allontana uscendo. Legato alla posizione di scroll (non one-shot).
export function TunnelReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    [0.86, 1, 1, 0.95],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.24, 0.76, 1],
    [0.25, 1, 1, 0.5],
  );
  const y = useTransform(scrollYProgress, [0, 0.28], [70, 0]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity, y, transformOrigin: "center" }}>
        {children}
      </motion.div>
    </div>
  );
}
