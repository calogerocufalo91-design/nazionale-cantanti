"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "oro" | "ghost" | "azzurro";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-azzurro-chiaro";

const variants = {
  oro: "bg-oro text-oro-scuro hover:bg-[#f0c05a]",
  azzurro: "bg-azzurro text-white hover:bg-[#0090e6]",
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

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const classes = cn(base, variants[variant], className);
  const content = (
    <motion.span className="pointer-events-none">{children}</motion.span>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transition: "transform 0.2s ease-out" }}
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
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {content}
    </Link>
  );
}
