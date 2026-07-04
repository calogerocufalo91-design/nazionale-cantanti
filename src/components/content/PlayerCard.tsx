"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Player } from "@/data/team";

// Card con leggera inclinazione 3D che segue il mouse (disattivata su reduced-motion
// e su touch, dove il tilt non ha senso). Foto reale del giocatore.
export function PlayerCard({ player }: { player: Player }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) scale(1.02)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-notte transition-transform duration-300 ease-out will-change-transform"
    >
      <Image
        src={player.photo}
        alt={player.name}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte/90 via-notte/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(79,169,224,0.25), transparent 60%)",
        }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3">
        <span className="font-cond text-sm font-medium uppercase tracking-wide text-white">
          {player.name}
        </span>
      </figcaption>
    </figure>
  );
}
