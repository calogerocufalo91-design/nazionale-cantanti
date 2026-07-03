"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

// template.tsx viene rimontato a ogni navigazione. Una tendina "notte" copre per
// un istante (con il nome al centro) e poi si solleva rivelando la nuova pagina.
// Elegante, senza lampi di colore. Rispetta prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[96] flex items-center justify-center bg-notte"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.7, delay: 0.35, ease: CURTAIN_EASE }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 1, 1, 0], y: 0 }}
          transition={{ duration: 0.9, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
        >
          <p className="font-cond text-xs uppercase tracking-[0.4em] text-azzurro-chiaro">
            dal 1981
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
            Nazionale Italiana Cantanti
          </p>
          <span className="mx-auto mt-4 block h-px w-16 bg-oro" />
        </motion.div>
      </motion.div>
    </>
  );
}
