"use client";

import Image from "next/image";
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
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: 0.9, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
        >
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={72}
            height={72}
            className="h-16 w-auto object-contain"
            priority
          />
          <motion.span
            className="mt-4 block h-px bg-oro"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
