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
 * Pannello dettagli stadio: grande, elegante, con visual editoriale in
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
      {/* Glow morbido attorno alla card */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-b from-oro/12 via-transparent to-azzurro/12 opacity-70 blur-lg"
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-notte-800 to-notte shadow-[0_40px_90px_-25px_rgba(0,0,0,0.75)] ring-1 ring-oro/15">
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
      {/* Visual editoriale in alto — grande e scenografico */}
      <div className="relative aspect-[16/10] w-full min-h-[240px] overflow-hidden bg-notte-800 sm:min-h-[280px]">
        {showRealPhoto ? (
          <Image
            src={info.imageUrl!}
            alt={info.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="scale-[1.03] object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          // Visual editoriale (SVG generativo originale) — non è una foto.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visualSrc}
            alt={info.imageAlt}
            className="h-full w-full scale-[1.03] object-cover"
            loading="lazy"
            onError={() => setVisualFailed(true)}
          />
        )}
        {/* Gradient soft in basso per fondere con la card */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-notte via-notte/25 to-transparent"
        />
        {/* Bordo interno elegante sopra il visual */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-3xl ring-1 ring-inset ring-white/10"
        />
        {/* Badge in alto a sinistra */}
        <div className="absolute left-4 top-4">
          {showRealPhoto ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-oro px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-oro-scuro shadow-sm">
              Foto ufficiale
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-notte/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-oro ring-1 ring-oro/40">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-oro"
              />
              {info.visualLabel}
            </span>
          )}
        </div>
        {/* Città + stadio in overlay in basso */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-oro/85">
            {info.city}
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-[26px]">
            {info.stadiumName}
          </p>
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
          <p className="mt-5 flex items-center gap-2 border-t border-white/8 pt-3 text-[11px] italic leading-snug text-white/45">
            <span
              aria-hidden
              className="inline-block h-1 w-1 shrink-0 rounded-full bg-oro/50"
            />
            Rappresentazione editoriale non fotografica.
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
        Rappresentazioni editoriali non fotografiche.
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
