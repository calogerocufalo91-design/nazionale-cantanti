"use client";

import { useMemo, useRef, useState } from "react";
import {
  archivioItems,
  cittaGiocate,
  matchItem,
  DECENNI,
  type ArchivioItem,
} from "@/lib/archivio-view";
import { MappaCuore } from "@/components/shared/MappaCuore";
import { StadioPanel } from "@/components/shared/StadioPanel";

const CATEGORIA_STILI: Record<
  ArchivioItem["categoria"]["tone"],
  { bordo: string; chip: string }
> = {
  pdc: { bordo: "border-l-oro", chip: "bg-oro/15 text-[#7a5a10]" },
  triangolare: { bordo: "border-l-azzurro", chip: "bg-azzurro/10 text-azzurro" },
  raccolta: { bordo: "border-l-[#1e7d3a]", chip: "bg-[#1e7d3a]/10 text-[#1e6b34]" },
  solidale: { bordo: "border-l-notte/40", chip: "bg-notte/5 text-notte/70" },
};

const ESITO_STILI: Record<ArchivioItem["esito"]["tone"], string> = {
  vittoria: "bg-[#e3f2e6] text-[#1e6b34]",
  pareggio: "bg-azzurro/10 text-azzurro",
  rigori: "bg-[#ece7f7] text-[#5b4a9e]",
  programma: "bg-oro text-oro-scuro",
  neutro: "bg-notte/5 text-notte/70",
};

function CardArchivio({ item }: { item: ArchivioItem }) {
  const [open, setOpen] = useState(false);
  const stile = CATEGORIA_STILI[item.categoria.tone];

  return (
    <li
      className={`relative rounded-xl border border-notte/10 border-l-4 bg-white transition-shadow hover:shadow-md ${stile.bordo}`}
    >
      <span
        aria-hidden
        className="absolute -left-[35px] top-6 h-2.5 w-2.5 rounded-full bg-oro ring-4 ring-carta"
      />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5 text-left"
      >
        <span className="font-cond text-2xl font-semibold leading-none text-notte">
          {item.year || "—"}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-serif text-[15px] font-semibold text-notte">
            {item.title}
          </span>
          <span className="block truncate text-xs text-notte/55">
            {item.city} · {item.stadium}
          </span>
        </span>
        <span
          className={`hidden rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:inline-block ${stile.chip}`}
        >
          {item.categoria.label}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${ESITO_STILI[item.esito.tone]}`}
        >
          {item.esito.label}
        </span>
        <span
          aria-hidden
          className={`text-notte/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-notte/10 px-4 py-4">
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-notte/45">Data</dt>
              <dd className="font-medium text-notte">{item.dateLabel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-notte/45">Sfida</dt>
              <dd className="font-medium text-notte">{item.subtitle}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-notte/45">
                Risultato / nota
              </dt>
              <dd className="font-medium text-notte">{item.result}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-notte/70">
            {item.description}
          </p>
        </div>
      )}
    </li>
  );
}

export function ArchivioEsplora() {
  const [query, setQuery] = useState("");
  const [decennio, setDecennio] = useState<string>("tutti");
  const [hoverCitta, setHoverCitta] = useState<string | null>(null);
  const listaRef = useRef<HTMLDivElement>(null);

  const places = useMemo(() => cittaGiocate(archivioItems), []);

  const filtrati = useMemo(() => {
    const dec = DECENNI.find((d) => d.id === decennio);
    return archivioItems.filter((item) => {
      if (dec && (item.year < dec.from || item.year > dec.to)) return false;
      return matchItem(item, query);
    });
  }, [query, decennio]);

  const gruppi = useMemo(
    () =>
      DECENNI.map((d) => ({
        ...d,
        items: filtrati.filter((i) => i.year >= d.from && i.year <= d.to),
      })).filter((g) => g.items.length > 0),
    [filtrati],
  );

  const selezionaCitta = (city: string) => {
    setQuery(city);
    setDecennio("tutti");
    listaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cittaSelezionata =
    places.find((p) => p.city.toLowerCase() === query.trim().toLowerCase())
      ?.city ?? null;

  return (
    <div>
      {/* Mappa delle città */}
      <section className="relative overflow-hidden bg-notte py-16 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(55% 45% at 20% 15%, rgba(0,114,187,0.28), transparent 65%), radial-gradient(45% 40% at 90% 85%, rgba(232,178,58,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
          <div>
            <p className="font-cond text-sm font-medium uppercase tracking-[0.28em] text-azzurro-chiaro">
              La mappa del cuore
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {places.length} città, un&apos;unica maglia
            </h3>
            <p className="mt-4 max-w-xl text-white/70">
              Ogni punto è una città che ha ospitato la Nazionale Cantanti: più
              è grande, più partite si sono giocate lì. Scegli una città per
              vedere i suoi eventi in archivio.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] lg:gap-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-notte-800/40 to-notte/30 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-8">
              <div className="mx-auto w-full max-w-[480px]">
                <MappaCuore
                  places={places}
                  activeCity={hoverCitta ?? cittaSelezionata}
                  onActivate={setHoverCitta}
                  onSelect={selezionaCitta}
                  showMarkerLabel
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <StadioPanel
                place={
                  places.find(
                    (p) => p.city === (hoverCitta ?? cittaSelezionata),
                  ) ?? null
                }
                totalCities={places.length}
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="font-cond text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Scegli una città per filtrare l&apos;archivio
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {places.map((p) => {
                const active =
                  cittaSelezionata === p.city || hoverCitta === p.city;
                return (
                  <li key={p.city}>
                    <button
                      type="button"
                      onClick={() => selezionaCitta(p.city)}
                      onMouseEnter={() => setHoverCitta(p.city)}
                      onMouseLeave={() => setHoverCitta(null)}
                      onFocus={() => setHoverCitta(p.city)}
                      onBlur={() => setHoverCitta(null)}
                      aria-pressed={cittaSelezionata === p.city}
                      className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                        active
                          ? "border-oro bg-oro text-oro-scuro shadow-[0_0_0_4px_rgba(232,178,58,0.15)]"
                          : "border-white/18 text-white/80 hover:border-oro/60 hover:text-oro"
                      }`}
                    >
                      {p.city} · {p.count}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Barra filtri sticky — si incolla ESATTAMENTE sotto l'header assestato
          (h-16 = 4rem) tenendo conto della safe-area del notch: così niente
          buco in cui trapelano le card, e su iPhone col notch l'header non copre
          più la riga degli anni. Sfondo opaco per non far "fantasmare" le card
          sotto la barra. */}
      <div
        ref={listaRef}
        className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-40 border-y border-notte/10 bg-carta py-3 shadow-[0_6px_16px_-12px_rgba(11,29,46,0.5)]"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-6 sm:px-8">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtra per decennio"
          >
            {[{ id: "tutti", label: "Tutti" }, ...DECENNI].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDecennio(d.id)}
                aria-pressed={decennio === d.id}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  decennio === d.id
                    ? "bg-notte text-white"
                    : "bg-white text-notte/70 ring-1 ring-notte/15 hover:text-notte"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="relative min-w-[200px] flex-1">
            <label htmlFor="ricerca-archivio" className="sr-only">
              Cerca per anno, città, stadio o avversario
            </label>
            <input
              id="ricerca-archivio"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca anno, città, stadio, avversario…"
              className="w-full rounded-full border border-notte/15 bg-white py-2 pl-10 pr-4 text-sm text-notte placeholder:text-notte/40 focus:border-azzurro focus:outline-none focus:ring-2 focus:ring-azzurro/30"
            />
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-notte/40"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="m20 20-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xs text-notte/50" aria-live="polite">
            {filtrati.length} {filtrati.length === 1 ? "risultato" : "risultati"}
          </p>
        </div>
      </div>

      {/* Timeline per decenni */}
      <section className="bg-carta py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          {gruppi.length === 0 && (
            <div className="rounded-2xl border border-notte/10 bg-white p-10 text-center">
              <p className="font-serif text-xl font-semibold text-notte">
                Nessun risultato per questa ricerca
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDecennio("tutti");
                }}
                className="mt-4 rounded-full bg-azzurro px-5 py-2 text-sm font-medium text-white"
              >
                Azzera i filtri
              </button>
            </div>
          )}

          <div className="space-y-14">
            {gruppi.map((g) => (
              <div key={g.id}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="font-cond text-2xl font-semibold uppercase tracking-[0.15em] text-notte">
                    {g.label}
                  </h3>
                  <span aria-hidden className="h-px flex-1 bg-notte/15" />
                  <span className="text-sm text-notte/50">
                    {g.items.length} {g.items.length === 1 ? "evento" : "eventi"}
                  </span>
                </div>
                <ul className="relative ml-3 space-y-3 border-l border-notte/15 pl-7">
                  {g.items.map((item) => (
                    <CardArchivio key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
