"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  // Due soglie: `scrolled` attiva blur+bg, `settled` intensifica ombra +
  // linea sottile in basso. Coerente con lo standard "sticky con blur/ombra
  // leggeri on scroll, non piatto e statico".
  const [scrolled, setScrolled] = useState(false);
  const [settled, setSettled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setSettled(y > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-500 ease-out",
        scrolled
          ? "bg-notte"
          : "bg-transparent",
        settled
          ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.06)]"
          : scrolled
          ? "shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]"
          : "shadow-none",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-[height] duration-500 ease-out sm:px-8",
          settled ? "h-16" : "h-20",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Nazionale Italiana Cantanti — home"
        >
          <Image
            src="/images/logo.png"
            alt="Nazionale Italiana Cantanti"
            width={240}
            height={72}
            className={cn(
              "w-auto object-contain transition-[height,transform] duration-500 ease-out group-hover:scale-[1.02]",
              settled ? "h-10 sm:h-11" : "h-12 sm:h-14",
            )}
            priority
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/dona-ora"
            className={cn(
              "group/donate hidden items-center gap-1.5 rounded-full bg-oro px-5 py-2.5 text-sm font-semibold text-oro-scuro shadow-[0_4px_18px_-6px_rgba(232,178,58,0.55)]",
              "transition-[transform,box-shadow,background-color] duration-300 ease-out",
              "hover:scale-[1.03] hover:bg-[#f0c05a] hover:shadow-[0_10px_28px_-8px_rgba(232,178,58,0.7)]",
              "active:scale-[0.98] sm:inline-flex",
            )}
          >
            <span>Dona ora</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover/donate:translate-x-1"
            >
              →
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Apri il menu"
            aria-expanded={menuOpen}
            className="group -mr-1.5 flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full px-2.5 text-white transition-colors duration-300 hover:text-azzurro-chiaro sm:mr-0"
          >
            <span className="hidden font-cond text-sm uppercase tracking-[0.28em] sm:inline">
              Menu
            </span>
            <span className="flex flex-col items-end gap-[5px]">
              <span className="block h-[2px] w-6 bg-current transition-all duration-300 group-hover:w-7" />
              <span className="block h-[2px] w-4 bg-current transition-all duration-300 group-hover:w-7" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
