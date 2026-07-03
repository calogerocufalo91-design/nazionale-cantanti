"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Dot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  tw: number;
  color: string;
};

const COLORS = ["255,255,255", "79,169,224", "232,178,58"];

export function Particles({ density = 0.00009 }: { density?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.floor(w * h * density));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      phase += 0.02;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -5) {
          d.y = h + 5;
          d.x = Math.random() * w;
        }
        if (d.x < -5) d.x = w + 5;
        if (d.x > w + 5) d.x = -5;
        const alpha = d.a + Math.sin(phase * d.tw * 40) * 0.15;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color},${Math.max(0, alpha)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce, density]);

  if (reduce) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
