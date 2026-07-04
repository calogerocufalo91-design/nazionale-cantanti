"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Il menu (o altri overlay) possono fermare/riavviare lo smooth-scroll,
    // così non scorre dietro il pannello aperto.
    const onStop = () => lenis.stop();
    const onStart = () => lenis.start();
    window.addEventListener("nic:lenis-stop", onStop);
    window.addEventListener("nic:lenis-start", onStart);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("nic:lenis-stop", onStop);
      window.removeEventListener("nic:lenis-start", onStart);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
