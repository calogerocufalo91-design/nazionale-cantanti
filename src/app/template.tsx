"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

// template.tsx viene rimontato a ogni navigazione: perfetto per la transizione.
// Una tendina "notte" copre e poi scorre via (wipe) rivelando la nuova pagina,
// mentre il contenuto entra in dissolvenza. Rispetta prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[95] origin-left bg-notte"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[96] origin-left bg-oro"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
