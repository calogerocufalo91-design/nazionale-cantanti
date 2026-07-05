"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { nav, site, type NavItem } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

const items: NavItem[] = [{ label: "Home", href: "/" }, ...nav];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

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
    window.dispatchEvent(new Event("nic:lenis-stop"));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("nic:lenis-start"));
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-notte text-white"
          initial={reduce ? undefined : { clipPath: "circle(0% at 90% 6%)" }}
          animate={reduce ? undefined : { clipPath: "circle(150% at 90% 6%)" }}
          exit={reduce ? undefined : { clipPath: "circle(0% at 90% 6%)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <div className="hero-glow opacity-40" aria-hidden />

          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
            <span className="font-cond text-sm uppercase tracking-[0.35em] text-azzurro-chiaro">
              Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi il menu"
              className="group rounded-full border border-white/15 p-3 text-white/80 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro-chiaro"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:rotate-90"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <motion.nav
            className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-8 sm:px-8"
            variants={reduce ? undefined : listVariants}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <ul>
              {items.map((item) => {
                const inner = (
                  <>
                    <span className="font-serif text-3xl font-semibold text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-azzurro-chiaro sm:text-4xl">
                      {item.label}
                      {item.external && (
                        <span aria-hidden className="ml-3 align-super text-lg text-oro/80">
                          ↗
                        </span>
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 origin-left scale-x-0 bg-oro/40 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </>
                );
                const cls =
                  "group flex items-center gap-4 border-b border-white/10 py-4";
                return (
                  <motion.li
                    key={item.href}
                    variants={reduce ? undefined : itemVariants}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className={cls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href} onClick={onClose} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          <motion.div
            className="relative mx-auto w-full max-w-6xl px-6 pb-10 sm:px-8"
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          >
            <Link
              href="/dona-ora"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-oro px-8 py-4 text-lg font-medium text-oro-scuro transition-colors hover:bg-[#f0c05a]"
            >
              Dona ora
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Facebook
              </a>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
