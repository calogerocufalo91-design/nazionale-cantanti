// BOZZA D — "Modern Sport / Dinamico"
// Direzione estetica: energia da club sportivo contemporaneo. Kanit corsivo
// pesante + Titillium Web, azzurro Nazionale, tricolore reinterpretato come
// segno grafico, tagli diagonali e ticker. Contenuti: SOLO dati reali da src/data/*.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Kanit, Titillium_Web } from "next/font/google";
import { site, nav } from "@/data/site";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { recentSolidarityEvents, archiveNote, partitaDelCuoreArchive } from "@/data/archivio";
import { players, staff } from "@/data/team";
import { partners } from "@/data/partners";
import { nicUnited, projects } from "@/data/projects";
import { fiveXMille } from "@/data/donation";

const sport = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--pvd-sport",
  display: "swap",
});

const testo = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--pvd-testo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bozza D — Modern Sport / Dinamico",
  robots: { index: false, follow: false },
};

const AZZURRO = "#0067B1";
const NAVY = "#081C30";
const VERDE = "#00854A";
const ROSSO = "#CE2B37";

function TricoloreSlash() {
  return (
    <span className="inline-flex -skew-x-12 gap-1" aria-hidden>
      <span className="h-5 w-1.5 rounded-sm bg-[#00854A]" />
      <span className="h-5 w-1.5 rounded-sm border border-[#081C30]/20 bg-white" />
      <span className="h-5 w-1.5 rounded-sm bg-[#CE2B37]" />
    </span>
  );
}

export default function BozzaD() {
  const risultati = recentSolidarityEvents.slice(-6).reverse();
  const roster = players.slice(0, 10);
  const tecnico = staff.slice(0, 4);
  const ultimaEdizione = partitaDelCuoreArchive[partitaDelCuoreArchive.length - 1];
  const cittaTicker = [
    ...new Set(partitaDelCuoreArchive.map((e) => e.city)),
  ];

  return (
    <div
      className={`${sport.variable} ${testo.variable} min-h-screen bg-[#F4F7FA] font-[family-name:var(--pvd-testo)] text-[#081C30]`}
    >
      {/* keyframes locali della bozza D (namespace pvd-) */}
      <style>{`
        @keyframes pvdTicker { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .pvd-ticker { animation: pvdTicker 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .pvd-ticker { animation: none; } }
      `}</style>

      {/* ============ 1 · HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-[#081C30]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/preview/d" className="flex cursor-pointer items-center gap-3">
            <span className="-skew-x-12 rounded-md bg-[#0067B1] p-1.5">
              <Image
                src="/images/logo-icon.png"
                alt="Logo Nazionale Italiana Cantanti"
                width={26}
                height={33}
                className="h-7 w-auto skew-x-12 brightness-0 invert"
                priority
              />
            </span>
            <span className="font-[family-name:var(--pvd-sport)] text-lg font-extrabold italic leading-none tracking-tight">
              NAZIONALE
              <span className="block text-xs font-bold not-italic tracking-[0.3em] text-[#0067B1]">
                CANTANTI
              </span>
            </span>
          </Link>
          <nav
            aria-label="Navigazione bozza D"
            className="hidden items-center gap-1 lg:flex"
          >
            {nav.slice(0, 7).map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer rounded-full px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide text-[#081C30]/70 transition-colors duration-200 hover:bg-[#0067B1]/10 hover:text-[#0067B1]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="cursor-pointer rounded-full px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide text-[#081C30]/70 transition-colors duration-200 hover:bg-[#0067B1]/10 hover:text-[#0067B1]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/dona-ora"
            className="-skew-x-12 cursor-pointer rounded-md bg-[#CE2B37] px-5 py-2.5 transition-colors duration-200 hover:bg-[#081C30]"
          >
            <span className="block skew-x-12 text-[12px] font-extrabold uppercase tracking-[0.15em] text-white">
              Dona ora
            </span>
          </Link>
        </div>
      </header>

      <main>
        {/* ============ 2 · HERO ============ */}
        <section className="relative overflow-hidden bg-white">
          {/* fasce diagonali tricolori */}
          <div
            className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[42%] lg:block"
            aria-hidden
          >
            <div className="absolute inset-y-0 right-40 w-24 -skew-x-12 bg-[#00854A]/12" />
            <div className="absolute inset-y-0 right-16 w-16 -skew-x-12 bg-[#0067B1]/12" />
            <div className="absolute inset-y-0 -right-6 w-14 -skew-x-12 bg-[#CE2B37]/12" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#0067B1]">
                <TricoloreSlash />
                Dal {site.foundingYear} · oltre {historyStats.lastVerified.incontri} incontri*
              </p>
              <h1 className="mt-5 font-[family-name:var(--pvd-sport)] text-[clamp(2.6rem,1.4rem+6vw,5.6rem)] font-black italic uppercase leading-[0.95] tracking-tight">
                In campo
                <br />
                per la <span className="text-[#0067B1]">solidarietà</span>
                <span className="text-[#CE2B37]">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#081C30]/75">
                {site.mission}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/eventi"
                  className="-skew-x-12 cursor-pointer rounded-md bg-[#0067B1] px-8 py-4 transition-colors duration-200 hover:bg-[#081C30]"
                >
                  <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em] text-white">
                    Prossimo match
                  </span>
                </Link>
                <Link
                  href="/la-squadra"
                  className="-skew-x-12 cursor-pointer rounded-md border-2 border-[#081C30] px-8 py-4 transition-colors duration-200 hover:border-[#0067B1] hover:text-[#0067B1]"
                >
                  <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em]">
                    La rosa
                  </span>
                </Link>
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#081C30]/45">
                * Ultimo dato pubblicato ({historyStats.lastVerified.sourceYear})
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  [String(historyStats.lastVerified.incontri), "incontri disputati*", AZZURRO],
                  [String(historyStats.lastVerified.anniAttivita), "anni di attività*", VERDE],
                  [String(partitaDelCuoreArchive.length), "edizioni Partita del Cuore", ROSSO],
                  [String(players.length), "artisti in rosa", NAVY],
                ].map(([n, label, colore]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#081C30]/10 bg-white p-5 shadow-[0_2px_12px_rgba(8,28,48,0.06)]"
                  >
                    <p
                      className="font-[family-name:var(--pvd-sport)] text-4xl font-black italic leading-none"
                      style={{ color: colore }}
                    >
                      {n}
                    </p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#081C30]/55">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ticker delle città reali */}
          <div className="border-y border-[#081C30]/10 bg-[#081C30] py-3" aria-hidden>
            <div className="flex overflow-hidden">
              {[0, 1].map((copy) => (
                <div key={copy} className="pvd-ticker flex min-w-full shrink-0 items-center">
                  {cittaTicker.map((c) => (
                    <span
                      key={`${copy}-${c}`}
                      className="mx-6 flex items-center gap-6 whitespace-nowrap font-[family-name:var(--pvd-sport)] text-sm font-bold italic uppercase tracking-[0.2em] text-white/70"
                    >
                      {c}
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0067B1]" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3 · MISSIONE ============ */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#0067B1]">
                <TricoloreSlash />
                Chi siamo
              </p>
              <h2 className="mt-4 font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase leading-[0.98] tracking-tight sm:text-5xl">
                Musica in campo,
                <br />
                <span className="text-[#0067B1]">solidarietà</span> in rete
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-relaxed text-[#081C30]/75 lg:col-span-7">
              <p>
                L&rsquo;evento calcistico con finalità benefiche più conosciuto a livello
                internazionale, legato all&rsquo;idea fondante della Nazionale Italiana Cantanti,
                nata nel 1981. Il primo incontro in assoluto si tenne all&rsquo;Arena di Milano, con
                due padrini d&rsquo;eccezione: Mogol e Lucio Battisti.
              </p>
              <p>
                La Partita del Cuore è stata istituita ufficialmente nel 1992 e da allora si ripete
                con cadenza annuale.
              </p>
              <p className="rounded-xl border-l-4 border-[#00854A] bg-white p-5 text-[15px] shadow-[0_2px_12px_rgba(8,28,48,0.06)]">
                <strong className="font-bold">{nicUnited.tagline}</strong> {nicUnited.description}
              </p>
            </div>
          </div>
        </section>

        {/* ============ 4 · MATCH CENTER (prossimo evento) ============ */}
        <section className="relative overflow-hidden bg-[#081C30] py-20 text-white">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(55% 65% at 85% 15%, rgba(0,103,177,0.35), transparent 65%), radial-gradient(45% 55% at 10% 90%, rgba(206,43,55,0.18), transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#7BB8E3]">
              <TricoloreSlash />
              Match center · 35ª edizione
            </p>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <p className="font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase leading-none sm:text-5xl">
                    Nazionale
                    <br />
                    Cantanti
                  </p>
                  <span className="-skew-x-12 rounded-md bg-[#CE2B37] px-4 py-2 font-[family-name:var(--pvd-sport)] text-2xl font-black italic text-white">
                    VS
                  </span>
                  <p className="font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase leading-none text-white/85 sm:text-5xl">
                    Nazionale
                    <br />
                    della Politica
                  </p>
                </div>
                <h2 className="mt-8 text-xl font-light text-white/80">
                  <strong className="font-bold text-white">{nextEvent.title}</strong> —{" "}
                  {nextEvent.summary}
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    nextEvent.date,
                    `ore ${nextEvent.time}`,
                    nextEvent.city,
                    nextEvent.broadcast ?? "",
                    `per ${nextEvent.cause}`,
                  ]
                    .filter(Boolean)
                    .map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/25 px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white/85"
                      >
                        {chip}
                      </span>
                    ))}
                </div>
                <p className="mt-5 text-sm text-white/55">{nextEvent.stadium}</p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    href="/eventi"
                    className="-skew-x-12 cursor-pointer rounded-md bg-[#0067B1] px-8 py-4 transition-colors duration-200 hover:bg-white hover:text-[#081C30]"
                  >
                    <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em]">
                      Info & biglietti
                    </span>
                  </Link>
                  <Link
                    href="/news"
                    className="-skew-x-12 cursor-pointer rounded-md border-2 border-white/30 px-8 py-4 transition-colors duration-200 hover:border-[#0067B1] hover:text-[#7BB8E3]"
                  >
                    <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em]">
                      Ultime news
                    </span>
                  </Link>
                </div>
              </div>
              <figure className="relative">
                <div className="relative -skew-x-3 overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="relative aspect-[8/5] skew-x-3 scale-105">
                    <Image
                      src={nextEvent.image ?? ""}
                      alt={`Locandina ufficiale — ${nextEvent.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Locandina ufficiale · {ultimaEdizione.date}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ 5 · RISULTATI (griglia eventi) ============ */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#0067B1]">
                <TricoloreSlash />
                Gli ultimi match
              </p>
              <h2 className="mt-4 font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase tracking-tight sm:text-5xl">
                Risultati & raccolte
              </h2>
            </div>
            <Link
              href="/archivio-partite"
              className="cursor-pointer text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#0067B1] transition-colors duration-200 hover:text-[#081C30]"
            >
              Archivio completo →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {risultati.map((ev) => (
              <article
                key={`${ev.date}-${ev.title}`}
                className="group flex flex-col rounded-xl border border-[#081C30]/10 bg-white p-6 shadow-[0_2px_12px_rgba(8,28,48,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(8,28,48,0.12)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0067B1]">
                    {ev.date}
                  </span>
                  <span className="rounded-full bg-[#00854A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#00854A]">
                    {ev.result}
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--pvd-sport)] text-xl font-extrabold italic leading-tight">
                  {ev.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#081C30]/65">{ev.purpose}</p>
                <p className="mt-4 border-t border-[#081C30]/10 pt-3 text-[11px] font-bold uppercase tracking-wide text-[#081C30]/45">
                  {ev.city} · {ev.venue}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#081C30]/45">{archiveNote}</p>
        </section>

        {/* ============ 6 · LA ROSA ============ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#0067B1]">
                  <TricoloreSlash />
                  La rosa
                </p>
                <h2 className="mt-4 font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase tracking-tight sm:text-5xl">
                  {players.length} artisti convocati
                </h2>
              </div>
              <Link
                href="/la-squadra"
                className="cursor-pointer text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#0067B1] transition-colors duration-200 hover:text-[#081C30]"
              >
                Tutta la squadra →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {roster.map((p, i) => (
                <figure
                  key={p.name}
                  className="group relative overflow-hidden rounded-xl bg-[#081C30]"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081C30]/95 via-transparent to-transparent" />
                    <span
                      className="absolute right-3 top-2 font-[family-name:var(--pvd-sport)] text-3xl font-black italic text-white/25"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <span className="font-[family-name:var(--pvd-sport)] text-base font-extrabold italic uppercase leading-tight text-white transition-colors duration-200 group-hover:text-[#7BB8E3]">
                      {p.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 rounded-xl border border-[#081C30]/10 bg-[#F4F7FA] p-6">
              {tecnico.map((s) => (
                <p key={s.name} className="text-sm">
                  <span className="font-bold">{s.name}</span>
                  <span className="text-[#081C30]/55"> — {s.role}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7 · PARTNER ============ */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.3em] text-[#081C30]/50">
            I nostri partner
          </p>
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="-skew-x-6 rounded-lg border border-[#081C30]/10 bg-white px-10 py-6 text-center shadow-[0_2px_12px_rgba(8,28,48,0.06)]"
              >
                <p className="skew-x-6 font-[family-name:var(--pvd-sport)] text-2xl font-extrabold italic uppercase">
                  {p.name}
                </p>
                <p className="skew-x-6 mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0067B1]">
                  {p.role}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.15em] text-[#081C30]/35">
            [DA COMPLETARE: loghi ufficiali in public/images/partners/ — niente loghi inventati]
          </p>
        </section>

        {/* ============ 8 · IMPATTO / DONA ============ */}
        <section className="relative overflow-hidden bg-[#081C30] py-20 text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1.5" aria-hidden>
            <div className="w-1/3 bg-[#00854A]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#CE2B37]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#7BB8E3]">
              <TricoloreSlash />
              Oltre il campo
            </p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--pvd-sport)] text-4xl font-black italic uppercase leading-[0.98] tracking-tight sm:text-5xl">
              Ogni gol è una causa <span className="text-[#7BB8E3]">sostenuta</span>
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {projects.map((pr) => (
                <article
                  key={pr.title}
                  className="rounded-xl border border-white/12 bg-white/5 p-7 transition-colors duration-200 hover:border-[#7BB8E3]/50"
                >
                  <h3 className="font-[family-name:var(--pvd-sport)] text-xl font-extrabold italic leading-snug">
                    {pr.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{pr.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-14 grid items-center gap-10 rounded-2xl bg-white p-8 text-[#081C30] sm:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#0067B1]">
                  5&times;1000
                </p>
                <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed">
                  {fiveXMille.context}{" "}
                  <span className="text-sm text-[#081C30]/60">
                    (codice fiscale di {fiveXMille.beneficiaryName}, ente partner che riceve il
                    5&times;1000 per le iniziative sociali della Nazionale Cantanti)
                  </span>
                </p>
                <p className="mt-4 font-[family-name:var(--pvd-sport)] text-4xl font-black italic tracking-wide text-[#0067B1]">
                  {fiveXMille.beneficiaryCF}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/5x1000"
                  className="-skew-x-12 cursor-pointer rounded-md bg-[#CE2B37] px-8 py-4 text-center transition-colors duration-200 hover:bg-[#081C30]"
                >
                  <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em] text-white">
                    Dona il 5&times;1000
                  </span>
                </Link>
                <Link
                  href="/dona-ora"
                  className="-skew-x-12 cursor-pointer rounded-md border-2 border-[#081C30] px-8 py-4 text-center transition-colors duration-200 hover:border-[#0067B1] hover:text-[#0067B1]"
                >
                  <span className="block skew-x-12 text-[13px] font-extrabold uppercase tracking-[0.15em]">
                    Dona ora
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ 9 · FOOTER ============ */}
      <footer className="bg-[#050F1B] py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="-skew-x-12 rounded-md bg-[#0067B1] p-1.5">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Logo Nazionale Italiana Cantanti"
                    width={22}
                    height={28}
                    className="h-6 w-auto skew-x-12 brightness-0 invert"
                  />
                </span>
                <span className="font-[family-name:var(--pvd-sport)] text-base font-extrabold italic uppercase">
                  Nazionale Cantanti
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {site.name}
                <br />
                {site.address.line1}, {site.address.line2}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7BB8E3]">
                Contatti
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block cursor-pointer text-sm text-white/70 transition-colors duration-200 hover:text-[#7BB8E3]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7BB8E3]">
                Social
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-white/70">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#7BB8E3]"
                >
                  Instagram
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#7BB8E3]"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7BB8E3]">
                Note legali
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-white/70">
                <Link
                  href="/privacy-policy"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#7BB8E3]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contributi-pubblici"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#7BB8E3]"
                >
                  Contributi ed erogazioni pubbliche
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-white/35">
            <span>
              © {site.name} · dal {site.foundingYear}
            </span>
            <span>Bozza estetica D · Modern Sport / Dinamico</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
