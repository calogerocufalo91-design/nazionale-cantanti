import type { Variants } from "framer-motion";

// Curva principale del design system (equivale a cubic-bezier(0.22,1,0.36,1)):
// arrivo morbido, senza rimbalzi, coerente con l'estetica editoriale.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Curva per micro-interazioni brevi (hover, tap): partenza reattiva.
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const;

// Durate standard, in secondi, condivise fra reveal e micro-interazioni.
export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.6,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

// Stagger container: figli sfalsati di 100ms (nel range 80-120 richiesto).
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Variante figlio per container stagger. Combinare `staggerContainer` +
// `staggerItem` sui figli invece di applicare delay manuali multipli.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const staggerContainer = stagger;
