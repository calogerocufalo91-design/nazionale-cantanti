"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-notte/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Nazionale Italiana Cantanti — home">
          <Image
            src="/images/logo.png"
            alt="Nazionale Italiana Cantanti"
            width={180}
            height={54}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/dona-ora"
            className="hidden rounded-full bg-oro px-5 py-2.5 text-sm font-semibold text-oro-scuro transition-colors hover:bg-[#f0c05a] sm:inline-flex"
          >
            Dona ora
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Apri il menu"
            className="group flex items-center gap-2.5 rounded-full px-2 py-2 text-white transition-colors hover:text-azzurro-chiaro"
          >
            <span className="hidden font-cond text-sm uppercase tracking-[0.25em] sm:inline">
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
