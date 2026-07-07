"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Kicker } from "@/components/ui/Kicker";
import { MappaCuore } from "@/components/shared/MappaCuore";
import { archivioItems, cittaGiocate } from "@/lib/archivio-view";

export function MappaCuoreSection() {
  const places = useMemo(() => cittaGiocate(archivioItems), []);
  const [hoverCitta, setHoverCitta] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-notte py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 10%, rgba(0,114,187,0.28), transparent 65%), radial-gradient(45% 40% at 90% 80%, rgba(232,178,58,0.10), transparent 60%)",
        }}
      />
      {/* filo oro sottile in alto, coerente con il resto del sito */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/60 to-transparent"
      />

      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <Kicker className="text-azzurro-chiaro">La Mappa del Cuore</Kicker>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {places.length} città,{" "}
              <span className="text-azzurro-chiaro">un&apos;unica maglia</span>
            </h2>
            <p className="mt-5 text-white/75">
              Ogni punto racconta una città, uno stadio e una partita giocata
              per la solidarietà. Da Torino a Palermo, da L&apos;Aquila a
              Cagliari: passa il mouse su una città per vedere stadio, edizioni
              e ultima presenza.
            </p>

            <div
              className="mt-8 -mx-6 overflow-x-auto px-6 pb-1 sm:mx-0 sm:overflow-visible sm:px-0"
              aria-label="Elenco città della Mappa del Cuore"
            >
              <ul className="flex min-w-max gap-2 sm:flex-wrap">
                {places.slice(0, 12).map((p) => {
                  const active = hoverCitta === p.city;
                  return (
                    <li key={p.city}>
                      <button
                        type="button"
                        onMouseEnter={() => setHoverCitta(p.city)}
                        onMouseLeave={() => setHoverCitta(null)}
                        onFocus={() => setHoverCitta(p.city)}
                        onBlur={() => setHoverCitta(null)}
                        onClick={() =>
                          setHoverCitta((c) => (c === p.city ? null : p.city))
                        }
                        aria-pressed={active}
                        className={[
                          "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                          active
                            ? "border-oro bg-oro text-oro-scuro shadow-[0_0_0_4px_rgba(232,178,58,0.15)]"
                            : "border-white/18 text-white/80 hover:border-oro/60 hover:text-oro",
                        ].join(" ")}
                      >
                        {p.city} · {p.count}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/archivio-partite"
                className="inline-flex items-center gap-2 rounded-full bg-azzurro px-5 py-2.5 font-medium text-white transition-colors hover:bg-azzurro-chiaro"
              >
                Esplora l&apos;archivio completo
                <span aria-hidden>→</span>
              </Link>
              <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                dal 1981 · oltre 640 partite benefiche
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px] lg:max-w-[440px]">
            <MappaCuore
              places={places}
              hoveredCity={hoverCitta}
              onHover={setHoverCitta}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
