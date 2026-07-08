"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "oro" | "ghost" | "azzurro" | "notte";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-azzurro-chiaro will-change-transform";

// Shadow-on-hover ricco per ogni variante — la parte visibile della
// micro-interazione oltre al magnetismo.
const variants = {
  oro: "bg-oro text-oro-scuro shadow-[0_6px_22px_-8px_rgba(232,178,58,0.55)] hover:bg-[#f0c05a] hover:shadow-[0_16px_36px_-10px_rgba(232,178,58,0.7)]",
  azzurro:
    "bg-azzurro text-white shadow-[0_6px_22px_-8px_rgba(0,114,187,0.55)] hover:bg-[#0090e6] hover:shadow-[0_16px_36px_-10px_rgba(79,169,224,0.7)]",
  notte: "bg-notte text-white hover:bg-notte-800 hover:shadow-[0_16px_36px_-10px_rgba(11,29,46,0.7)]",
  ghost:
    "border border-white/40 text-white hover:bg-white/10 hover:border-white/70",
};

export function MagneticButton({
  href,
  children,
  variant = "oro",
  className,
  external,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  // Componiamo transform: translate magnetico + scale su hover. Salviamo
  // separatamente le due parti in ref per non azzerarci a vicenda.
  const translate = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  const apply = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale.current})`;
  };

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    translate.current = { x: x * 0.2, y: y * 0.3 };
    apply();
  };

  const onEnter = () => {
    if (reduce) return;
    scale.current = 1.03;
    apply();
  };

  const onLeave = () => {
    translate.current = { x: 0, y: 0 };
    scale.current = 1;
    apply();
  };

  const classes = cn(base, variants[variant], className);
  const content = (
    <motion.span className="pointer-events-none">{children}</motion.span>
  );

  // Transition compound su transform (magnetic + scale) + shadow + colore.
  const style = {
    transition:
      "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out",
  } as const;

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={classes}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={style}
    >
      {content}
    </Link>
  );
}
