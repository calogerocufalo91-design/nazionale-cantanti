"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE_OUT } from "@/lib/motion";
import { site } from "@/data/site";

const LINES = ["La musica", "scende in campo", "per gli altri"];

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 * i, ease: EASE_OUT },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-notte"
    >
      {/* luci da stadio in movimento */}
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte via-transparent to-notte/40"
      />

      <motion.div
        style={reduce ? undefined : { y, opacity, scale }}
        className="relative mx-auto w-full max-w-7xl px-6 sm:px-8"
      >
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cond text-sm font-medium uppercase tracking-[0.35em] text-azzurro-chiaro"
        >
          dal {site.foundingYear} · {site.name}
        </motion.p>

        <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.98] text-white sm:text-7xl md:text-8xl">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={reduce ? undefined : lineVariants}
                custom={i}
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : "show"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
          className="mt-8 flex h-1 w-40 origin-left overflow-hidden rounded-full"
        >
          <span className="h-full flex-1 bg-[#1e7d3a]" />
          <span className="h-full flex-1 bg-white/90" />
          <span className="h-full flex-1 bg-[#c8102e]" />
        </motion.div>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg text-white/70"
        >
          Sport, spettacolo e solidarietà: i cantanti italiani uniti per
          trasformare una partita in un gesto concreto di aiuto.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href="/dona-ora" variant="oro">
            Dona ora
          </MagneticButton>
          <MagneticButton href="/la-storia" variant="ghost">
            Scopri la storia
          </MagneticButton>
        </motion.div>
      </motion.div>

      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-cond text-xs uppercase tracking-[0.3em]">
              Scorri
            </span>
            <span className="h-8 w-px bg-white/30" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
