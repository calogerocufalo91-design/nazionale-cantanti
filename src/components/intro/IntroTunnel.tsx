"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const SESSION_KEY = "nic-intro-seen";
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

// Intro "Sipario": una linea oro si disegna al centro, il marchio emerge sopra
// di essa, poi lo schermo si apre in due come un sipario rivelando il sito.
// step: -1 non avviata, 0 linea, 1 marchio, 2 apertura, 3 finita.
export function IntroTunnel() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(-1);

  // Avvio (asincrono via rAF): decide se riprodurre o saltare.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      if (reduce || seen) {
        setStep(3);
        return;
      }
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event("nic:lenis-stop"));
      setStep(0);
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("nic:lenis-start"));
    };
  }, [reduce]);

  // Avanzamento a tempo: setState solo dentro i timer.
  useEffect(() => {
    if (step < 0 || step >= 3) return;
    const delays = [800, 1600, 850];
    const t = setTimeout(() => setStep((s) => s + 1), delays[step]);
    return () => clearTimeout(t);
  }, [step]);

  // Chiusura: memorizza e sblocca lo scroll.
  useEffect(() => {
    if (step >= 3) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("nic:lenis-start"));
    }
  }, [step]);

  if (step < 0 || step >= 3) return null;

  const open = step === 2;
  const skip = () => setStep(3);

  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      {/* pannello superiore del sipario */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-notte"
        animate={open ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.85, ease: CURTAIN_EASE }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(0,114,187,0.25),transparent_70%)]"
        />
      </motion.div>

      {/* pannello inferiore del sipario */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-notte"
        animate={open ? { y: "101%" } : { y: 0 }}
        transition={{ duration: 0.85, ease: CURTAIN_EASE }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(0,114,187,0.18),transparent_70%)]"
        />
      </motion.div>

      {/* contenuto centrale, a cavallo della linea di apertura */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={open ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={
            step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={72}
            height={72}
            className="h-14 w-auto object-contain sm:h-16"
            priority
          />
          <p className="mt-5 text-center font-serif text-2xl font-semibold text-white sm:text-4xl">
            Nazionale Italiana Cantanti
          </p>
        </motion.div>

        {/* la linea oro: il "filo" lungo cui si aprirà il sipario */}
        <motion.span
          aria-hidden
          className="mt-7 block h-px w-56 bg-oro sm:w-72"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, ease: CURTAIN_EASE }}
        />

        <motion.p
          className="mt-6 font-cond text-xs uppercase tracking-[0.5em] text-azzurro-chiaro"
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={
            step >= 1
              ? { opacity: 1, letterSpacing: "0.5em" }
              : { opacity: 0 }
          }
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          dal 1981 · musica · sport · solidarietà
        </motion.p>
      </motion.div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-8 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
      >
        Salta intro
      </button>
    </div>
  );
}
