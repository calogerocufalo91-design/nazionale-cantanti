"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { stadioInfo, type CittaGiocata } from "@/lib/archivio-view";

const PLACEHOLDER_URL = "/images/stadi/placeholder-stadio.svg";

type StadioPanelProps = {
  place: CittaGiocata | null;
  totalCities?: number;
  totalMatches?: number;
  className?: string;
};

/**
 * Pannello dettagli stadio: grande, elegante, con visual istituzionale in
 * alto e informazioni sotto. Progettato per stare in una zona dedicata del
 * layout — NON è un tooltip che si sovrappone ad altri contenuti.
 */
export function StadioPanel({
  place,
  totalCities,
  totalMatches,
  className,
}: StadioPanelProps) {
  const reduce = useReducedMotion();
  const info = place ? stadioInfo(place.city) : null;

  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      aria-live="polite"
      aria-atomic
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-notte-800/85 to-notte/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-oro/10 backdrop-blur-xl">
        {/* Cornice oro sottile decorativa */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/60 to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oro/25 to-transparent"
        />

        <AnimatePresence mode="wait" initial={false}>
          {place && info ? (
            <motion.div
              key={info.city}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              className="text-left text-white"
            >
              <StadioPanelBody info={info} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <StadioPanelEmpty
                totalCities={totalCities}
                totalMatches={totalMatches}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StadioPanelBody({
  info,
}: {
  info: ReturnType<typeof stadioInfo>;
}) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [visualFailed, setVisualFailed] = useState(false);
  const showRealPhoto =
    info.visualStatus === "licensed" && !!info.imageUrl && !photoFailed;
  const visualSrc = visualFailed ? PLACEHOLDER_URL : info.visualUrl;

  return (
    <>
      {/* Visual istituzionale in alto */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-notte-800">
        {showRealPhoto ? (
          <Image
            src={info.imageUrl!}
            alt={info.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          // Visual istituzionale (SVG generativo originale) — non è una foto.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visualSrc}
            alt={info.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setVisualFailed(true)}
          />
        )}
        {/* Gradient soft in basso per fondere con la card */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-notte/85 via-notte/10 to-transparent"
        />
        {/* Badge in alto a sinistra */}
        <div className="absolute left-4 top-4">
          {showRealPhoto ? (
            <span className="rounded-full bg-oro px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-oro-scuro shadow-sm">
              Foto ufficiale
            </span>
          ) : (
            <span className="rounded-full bg-azzurro-chiaro/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-azzurro-chiaro ring-1 ring-azzurro-chiaro/40 backdrop-blur">
              {info.visualLabel}
            </span>
          )}
        </div>
        {/* Città in overlay in basso */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-5 pb-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-oro/80">
              {info.city}
            </p>
            <p className="mt-1 truncate font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
              {info.stadiumName}
            </p>
          </div>
        </div>
      </div>

      {/* Corpo informazioni */}
      <div className="px-5 pb-6 pt-5 sm:px-6">
        {/* Metriche */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/8 pb-4">
          <StatBlock
            value={String(info.matchesCount)}
            label={info.matchesCount === 1 ? "partita" : "partite"}
          />
          {info.latestYear ? (
            <StatBlock
              value={String(info.latestYear)}
              label="ultima edizione"
            />
          ) : null}
          {info.events.length > 0 ? (
            <StatBlock
              value={String(info.events.length)}
              label={info.events.length === 1 ? "evento" : "eventi in archivio"}
            />
          ) : null}
        </div>

        {/* Eventi principali */}
        {info.events.length > 0 && (
          <div className="mt-4">
            <p className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-azzurro-chiaro">
              Eventi principali
            </p>
            <ul className="mt-3 space-y-2.5">
              {info.events.slice(0, 3).map((e) => (
                <li
                  key={`${e.year}-${e.title}`}
                  className="flex gap-3 border-l-2 border-oro/50 pl-3 text-[13px] leading-snug"
                >
                  <span className="font-cond min-w-[36px] text-white/50">
                    {e.year || "—"}
                  </span>
                  <span className="text-white/90">{e.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nota rappresentazione / crediti */}
        {!showRealPhoto ? (
          <p className="mt-5 border-t border-white/8 pt-3 text-[11px] italic leading-snug text-white/45">
            Illustrazione istituzionale · rappresentazione non fotografica.
          </p>
        ) : info.imageCredit || info.imageLicense ? (
          <p className="mt-5 border-t border-white/8 pt-3 text-[11px] leading-snug text-white/55">
            {info.imageCredit}
            {info.imageCredit && info.imageLicense ? " · " : ""}
            {info.imageLicense}
          </p>
        ) : null}
      </div>
    </>
  );
}

function StadioPanelEmpty({
  totalCities,
  totalMatches,
}: {
  totalCities?: number;
  totalMatches?: number;
}) {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-7">
      <div>
        <p className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-azzurro-chiaro">
          La Mappa del Cuore
        </p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
          Scegli una città sulla mappa
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Passa il mouse su un punto o su una pillola per scoprire lo stadio,
          il numero di edizioni giocate e l&apos;ultima presenza della
          Nazionale Cantanti in quella città.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/8 pt-5">
        {typeof totalCities === "number" && (
          <div>
            <dt className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Città
            </dt>
            <dd className="mt-1 font-serif text-3xl font-semibold text-oro">
              {totalCities}
            </dd>
          </div>
        )}
        {typeof totalMatches === "number" && (
          <div>
            <dt className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Partite
            </dt>
            <dd className="mt-1 font-serif text-3xl font-semibold text-oro">
              {totalMatches}+
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-6 text-[11px] italic leading-snug text-white/40">
        Illustrazioni istituzionali · rappresentazioni non fotografiche.
      </p>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-xl font-semibold leading-none text-oro">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
    </div>
  );
}
