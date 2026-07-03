"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav } from "@/data/site";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-notte text-white lg:hidden"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-cond text-lg uppercase tracking-widest text-azzurro-chiaro">
              Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi il menu"
              className="rounded-full p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro-chiaro"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-6">
            <Link
              href="/"
              onClick={onClose}
              className="border-b border-white/10 py-4 font-serif text-2xl transition-colors hover:text-azzurro-chiaro"
            >
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="border-b border-white/10 py-4 font-serif text-2xl transition-colors hover:text-azzurro-chiaro"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dona-ora"
              onClick={onClose}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-oro px-6 py-4 text-lg font-medium text-oro-scuro"
            >
              Dona ora
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
