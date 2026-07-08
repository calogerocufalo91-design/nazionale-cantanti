"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Kicker } from "@/components/ui/Kicker";
import { MappaCuore } from "@/components/shared/MappaCuore";
import { StadioPanel } from "@/components/shared/StadioPanel";
import { archivioItems, cittaGiocate } from "@/lib/archivio-view";

export function MappaCuoreSection() {
  const places = useMemo(() => cittaGiocate(archivioItems), []);
  const reduce = useReducedMotion();

  // Città su cui è "fermato" il puntatore (persistente) — resta selezionata
  // finché l'utente non ne sceglie un'altra. Default: la più giocata.
  const [pinned, setPinned] = useState<string | null>(
    places[0]?.city ?? null,
  );
  // Città temporaneamente evidenziata (hover marker/pillola) — sovrascrive
  // pinned solo durante l'hover, poi torna a pinned.
  const [hovered, setHovered] = useState<string | null>(null);

  const activeCity = hovered ?? pinned;
  const activePlace = places.find((p) => p.city === activeCity) ?? null;

  // Handler stabili: permettono a <Marker> e <CityPill> (memoizzati) di NON
  // ri-renderizzarsi tutti a ogni hover. Senza questi, ogni passaggio del mouse
  // ricreava le callback e invalidava la memoizzazione.
  const handleLeave = useCallback(() => setHovered(null), []);
  const handleSelect = useCallback((city: string) => setPinned(city), []);
  const handleToggle = useCallback(
    (city: string) => setPinned((c) => (c === city ? null : city)),
    [],
  );

  const totalMatches = useMemo(
    () => places.reduce((s, p) => s + p.count, 0),
    [places],
  );

  return (
    <section
      id="mappa-cuore"
      className="relative scroll-mt-24 overflow-hidden bg-notte py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Sfondo scenografico */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 45% at 18% 10%, rgba(0,114,187,0.30), transparent 65%), radial-gradient(45% 40% at 92% 90%, rgba(232,178,58,0.10), transparent 60%), radial-gradient(40% 35% at 60% 50%, rgba(79,169,224,0.14), transparent 70%)",
        }}
      />
      {/* Griglia sottile sul fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at 50% 45%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, #000 0%, transparent 75%)",
        }}
      />
      {/* Filo oro in alto e in basso */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/50 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oro/30 to-transparent"
      />

      <Container className="relative">
        {/* Header sezione */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Kicker className="text-azzurro-chiaro">La Mappa del Cuore</Kicker>
          <h2 className="mt-4 font-serif text-display font-semibold">
            {places.length} città,{" "}
            <span className="text-azzurro-chiaro">un&apos;unica maglia</span>
          </h2>
          <p className="mt-5 max-w-xl text-lead text-white/75">
            Ogni punto è uno stadio che ha ospitato la Nazionale Cantanti. Scegli
            una città per scoprirne lo stadio, le edizioni giocate e l&apos;ultima
            presenza.
          </p>
        </motion.div>

        {/* Grid principale: mappa (protagonista) + pannello dettagli */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:gap-12">
          {/* Colonna mappa */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            {/* Cornice del "palco" mappa */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-notte-800/70 to-notte/60 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8">
              {/* Etichette angolari */}
              <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-oro" />
                Italia · dal 1981
              </div>

              <div className="mx-auto w-full max-w-[520px] pt-8 sm:pt-6">
                <MappaCuore
                  places={places}
                  activeCity={activeCity}
                  onActivate={setHovered}
                  onSelect={handleSelect}
                  showMarkerLabel
                />
              </div>

              {/* Legenda */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/8 pt-5 text-[11px] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-oro" />
                  Città che ha ospitato la NIC
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-oro/40 ring-1 ring-oro/70" />
                  Più grande = più partite
                </span>
              </div>
            </div>
          </motion.div>

          {/* Colonna pannello dettagli */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.55,
              delay: 0.15,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <StadioPanel
              place={activePlace}
              totalCities={places.length}
              totalMatches={totalMatches}
            />
          </motion.div>
        </div>

        {/* Zona pillole città — sotto la mappa, non in overlay */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 lg:mt-14"
        >
          <p className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
            Scorri le città
          </p>
          <div
            className="mt-3 -mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:overflow-visible sm:px-0"
            aria-label="Elenco città della Mappa del Cuore"
          >
            <ul className="flex min-w-max gap-2 sm:flex-wrap">
              {places.map((p) => (
                <CityPill
                  key={p.city}
                  city={p.city}
                  count={p.count}
                  isActive={activeCity === p.city}
                  isPinned={pinned === p.city}
                  onHover={setHovered}
                  onLeave={handleLeave}
                  onToggle={handleToggle}
                />
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA verso l'archivio completo */}
        <div className="mt-10 border-t border-white/8 pt-8 lg:mt-14">
          <Link
            href="/archivio-partite"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-azzurro px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(0,114,187,0.6)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-azzurro-chiaro hover:shadow-[0_16px_38px_-10px_rgba(79,169,224,0.7)] active:scale-[0.98]"
          >
            Esplora l&apos;archivio completo
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

type CityPillProps = {
  city: string;
  count: number;
  isActive: boolean;
  isPinned: boolean;
  onHover: (city: string) => void;
  onLeave: () => void;
  onToggle: (city: string) => void;
};

// Pillola città memoizzata: a ogni hover si ri-renderizza solo la pillola che
// cambia stato, non tutte e ~30 insieme.
const CityPill = memo(function CityPill({
  city,
  count,
  isActive,
  isPinned,
  onHover,
  onLeave,
  onToggle,
}: CityPillProps) {
  return (
    <li>
      <button
        type="button"
        onMouseEnter={() => onHover(city)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(city)}
        onBlur={onLeave}
        onClick={() => onToggle(city)}
        aria-pressed={isPinned}
        className={[
          "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
          isActive
            ? "border-oro bg-oro text-oro-scuro shadow-[0_0_0_4px_rgba(232,178,58,0.15)]"
            : "border-white/15 text-white/75 hover:border-oro/60 hover:text-oro",
        ].join(" ")}
      >
        {city} · {count}
      </button>
    </li>
  );
});
