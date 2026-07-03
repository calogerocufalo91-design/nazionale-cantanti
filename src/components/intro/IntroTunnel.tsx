"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const WORDS = ["1981", "Musica", "Campo", "Cuore", "Solidarietà"];
const SESSION_KEY = "nic-intro-seen";
const BRAND_STEP = WORDS.length;
const DONE_STEP = WORDS.length + 1;

export function IntroTunnel() {
  const reduce = useReducedMotion();
  // step: -1 non avviato, 0..WORDS.length-1 parole, WORDS.length brand, DONE_STEP finito.
  const [step, setStep] = useState(-1);

  // Avvio: decide (rAF, quindi setState asincrono) se riprodurre o saltare.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      if (reduce || seen) {
        setStep(DONE_STEP);
        return;
      }
      document.body.style.overflow = "hidden";
      setStep(0);
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  // Avanzamento della sequenza: setState solo dentro il timer (asincrono).
  useEffect(() => {
    if (step < 0 || step >= DONE_STEP) return;
    const delay = step === BRAND_STEP ? 1600 : 620;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);

  // Chiusura: sblocca scroll e memorizza (side-effect esterni, nessun setState).
  useEffect(() => {
    if (step >= DONE_STEP) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
    }
  }, [step]);

  if (step < 0 || step >= DONE_STEP) return null;

  const skip = () => setStep(DONE_STEP);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-notte"
        style={{ perspective: 900 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="tunnel-rays" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,169,224,0.18),transparent_60%)]"
        />

        {step < BRAND_STEP && (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={WORDS[step]}
              initial={{ scale: 0.35, opacity: 0, z: -300 }}
              animate={{ scale: 1.15, opacity: 1, z: 0 }}
              exit={{ scale: 3.2, opacity: 0, z: 400 }}
              transition={{ duration: 0.62, ease: EASE_OUT }}
              className="font-serif text-6xl font-semibold text-white sm:text-8xl"
            >
              {WORDS[step]}
            </motion.span>
          </AnimatePresence>
        )}

        {step === BRAND_STEP && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="px-6 text-center"
          >
            <p className="font-cond text-sm uppercase tracking-[0.4em] text-azzurro-chiaro">
              dal 1981
            </p>
            <p className="mt-4 font-serif text-4xl font-semibold text-white sm:text-6xl">
              Nazionale Italiana Cantanti
            </p>
            <div className="mx-auto mt-6 h-[3px] w-24 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full bg-oro"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        <button
          type="button"
          onClick={skip}
          className="absolute bottom-8 right-8 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
        >
          Salta intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
