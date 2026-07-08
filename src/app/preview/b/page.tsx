// BOZZA B — "Cinematic / Dark"
// Direzione estetica: campagna cinematografica. Nero profondo, luce dorata,
// display monumentale (Bebas Neue) + corpo sobrio (Manrope) + citazioni in
// corsivo serif (Cormorant Garamond). Contenuti: SOLO dati reali da src/data/*.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Manrope, Cormorant_Garamond } from "next/font/google";
import { site, nav } from "@/data/site";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { recentSolidarityEvents, archiveNote, partitaDelCuoreArchive } from "@/data/archivio";
import { players } from "@/data/team";
import { partners } from "@/data/partners";
import { nicUnited, projects } from "@/data/projects";
import { galleryImages } from "@/data/gallery";
import { fiveXMille } from "@/data/donation";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--pvb-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--pvb-body",
  display: "swap",
});

const quote = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--pvb-quote",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bozza B — Cinematic / Dark",
  robots: { index: false, follow: false },
};

/** Visual generativi originali già presenti nel progetto, per città. */
const cityVisual: Record<string, string> = {
  Roma: "/images/stadi/visual-roma.svg",
  Palermo: "/images/stadi/visual-palermo.svg",
  Napoli: "/images/stadi/visual-napoli.svg",
  Milano: "/images/stadi/visual-milano.svg",
  Verona: "/images/stadi/visual-verona.svg",
  "L'Aquila": "/images/stadi/visual-laquila.svg",
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D5A754]">
      <span className="h-px w-10 bg-[#D5A754]/70" aria-hidden />
      {children}
    </p>
  );
}

export default function BozzaB() {
  const capitoli = [
    partitaDelCuoreArchive[0], // 1992 Roma
    partitaDelCuoreArchive[1], // 1993 Palermo
    partitaDelCuoreArchive[2], // 1994 Napoli
    partitaDelCuoreArchive[3], // 1995 Milano
    partitaDelCuoreArchive[4], // 1996 Verona
    partitaDelCuoreArchive[partitaDelCuoreArchive.length - 1], // 2026 L'Aquila
  ];
  const cronacheRecenti = recentSolidarityEvents.slice(-4).reverse();
  const rosa = players.slice(0, 10);

  return (
    <div
      className={`${display.variable} ${body.variable} ${quote.variable} min-h-screen bg-[#07080B] font-[family-name:var(--pvb-body)] text-[#EDE8DE]`}
    >
      {/* ============ 1 · HEADER ============ */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link href="/preview/b" className="flex cursor-pointer items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo Nazionale Italiana Cantanti"
              width={150}
              height={62}
              className="h-9 w-auto sm:h-10"
              priority
            />
            <span className="hidden font-[family-name:var(--pvb-display)] text-xl tracking-[0.12em] text-[#EDE8DE] md:block">
              Nazionale Italiana Cantanti
            </span>
          </Link>
          <nav
            aria-label="Navigazione bozza B"
            className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EDE8DE]/75 lg:flex"
          >
            {nav.slice(0, 6).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="cursor-pointer transition-colors duration-200 hover:text-[#D5A754]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/dona-ora"
            className="cursor-pointer border border-[#D5A754] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D5A754] transition-colors duration-200 hover:bg-[#D5A754] hover:text-[#07080B]"
          >
            Dona ora
          </Link>
        </div>
      </header>

      <main>
        {/* ============ 2 · HERO CINEMATOGRAFICA ============ */}
        <section className="relative flex min-h-svh items-end overflow-hidden">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src="/images/stadi/visual-laquila.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07080B]/55 via-[#07080B]/35 to-[#07080B]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(65% 55% at 50% 38%, rgba(213,167,84,0.14), transparent 70%)",
              }}
            />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-24">
            <Kicker>Dal {site.foundingYear} · {historyStats.lastVerified.incontri} incontri disputati*</Kicker>
            <h1 className="mt-6 font-[family-name:var(--pvb-display)] text-[clamp(3.4rem,2rem+9vw,9rem)] leading-[0.9] tracking-[0.02em]">
              In campo per
              <br />
              <span className="text-[#D5A754]">la solidarietà.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#EDE8DE]/75 sm:text-lg">
              {site.mission}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/dona-ora"
                className="cursor-pointer bg-[#D5A754] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#07080B] transition-colors duration-200 hover:bg-[#EDE8DE]"
              >
                Sostieni una causa
              </Link>
              <Link
                href="/la-storia"
                className="cursor-pointer border border-[#EDE8DE]/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#EDE8DE] transition-colors duration-200 hover:border-[#D5A754] hover:text-[#D5A754]"
              >
                La nostra storia
              </Link>
            </div>
            <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#EDE8DE]/40">
              * Ultimo dato pubblicato dall&rsquo;associazione ({historyStats.lastVerified.sourceYear})
            </p>
          </div>
        </section>

        {/* ============ 3 · LA MISSIONE ============ */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Kicker>
              <span className="mx-auto">La missione</span>
            </Kicker>
            <blockquote className="mt-8 font-[family-name:var(--pvb-quote)] text-[clamp(1.7rem,1.2rem+2.6vw,3.1rem)] italic leading-[1.25] text-[#EDE8DE]">
              &ldquo;L&rsquo;evento calcistico con finalità benefiche più conosciuto a livello
              internazionale, legato all&rsquo;idea fondante della Nazionale Italiana Cantanti,
              nata nel 1981.&rdquo;
            </blockquote>
            <div className="mx-auto mt-8 h-px w-16 bg-[#D5A754]" aria-hidden />
            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-[#EDE8DE]/70">
              Il primo incontro in assoluto si tenne all&rsquo;Arena di Milano, ancora prima della
              nascita ufficiale dell&rsquo;associazione, con due padrini d&rsquo;eccezione: Mogol e
              Lucio Battisti. La Partita del Cuore è stata istituita ufficialmente nel 1992 e da
              allora si ripete con cadenza annuale.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#EDE8DE]/50">
              {nicUnited.tagline} — {nicUnited.description}
            </p>
          </div>
        </section>

        {/* ============ 4 · PROSSIMO EVENTO ============ */}
        <section className="relative overflow-hidden py-24 sm:py-28">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(70% 80% at 80% 20%, rgba(0,114,187,0.16), transparent 65%), radial-gradient(50% 60% at 15% 85%, rgba(213,167,84,0.10), transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <Kicker>Il prossimo appuntamento</Kicker>
              <h2 className="mt-6 font-[family-name:var(--pvb-display)] text-[clamp(2.6rem,1.6rem+5vw,5.5rem)] leading-[0.92]">
                {nextEvent.title}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#EDE8DE]/70">{nextEvent.summary}</p>
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 text-sm sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Data", nextEvent.date],
                  ["Ore", nextEvent.time ?? "—"],
                  ["Città", nextEvent.city],
                  ["Diretta", nextEvent.broadcast ?? "—"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-[#D5A754]/40 pt-3">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-[#EDE8DE]/50">{k}</dt>
                    <dd className="mt-1 font-[family-name:var(--pvb-display)] text-2xl tracking-wide text-[#D5A754]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-[#EDE8DE]/60">
                {nextEvent.stadium} · a sostegno di{" "}
                <span className="text-[#EDE8DE]">{nextEvent.cause}</span>
              </p>
              <div className="mt-9 flex flex-wrap gap-5">
                <Link
                  href="/eventi"
                  className="cursor-pointer bg-[#D5A754] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#07080B] transition-colors duration-200 hover:bg-[#EDE8DE]"
                >
                  Scopri l&rsquo;evento
                </Link>
                <Link
                  href="/archivio-partite"
                  className="cursor-pointer border border-[#EDE8DE]/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200 hover:border-[#D5A754] hover:text-[#D5A754]"
                >
                  Archivio partite
                </Link>
              </div>
            </div>
            <figure className="relative">
              <div
                className="relative aspect-[8/5] overflow-hidden border border-[#D5A754]/35"
                style={{ boxShadow: "0 0 80px rgba(213,167,84,0.12)" }}
              >
                <Image
                  src={nextEvent.image ?? ""}
                  alt={`Locandina ufficiale — ${nextEvent.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#EDE8DE]/40">
                La locandina ufficiale · 35ª edizione
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ============ 5 · I CAPITOLI (griglia eventi) ============ */}
        <section className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Kicker>La saga della Partita del Cuore</Kicker>
                <h2 className="mt-5 font-[family-name:var(--pvb-display)] text-[clamp(2.4rem,1.6rem+4vw,4.6rem)] leading-[0.92]">
                  Sei capitoli di un&rsquo;epopea
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#EDE8DE]/55">
                Dallo Stadio Olimpico del 1992 allo Stadio Gran Sasso d&rsquo;Italia del 2026:{" "}
                {partitaDelCuoreArchive.length} edizioni raccontate come atti di uno stesso film.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capitoli.map((ed) => (
                <article
                  key={ed.year}
                  className="group relative overflow-hidden border border-[#EDE8DE]/10 bg-[#0B0D12] transition-colors duration-300 hover:border-[#D5A754]/50"
                >
                  <div className="relative aspect-[8/5] overflow-hidden">
                    <Image
                      src={cityVisual[ed.city] ?? "/images/stadi/placeholder-stadio.svg"}
                      alt={`Visual editoriale ispirato a ${ed.city}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-4 font-[family-name:var(--pvb-display)] text-5xl text-[#EDE8DE] drop-shadow">
                      {ed.year}
                    </p>
                    <p className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.25em] text-[#D5A754]">
                      {ed.edition}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--pvb-display)] text-2xl tracking-wide">
                      {ed.city} · {ed.stadium}
                    </h3>
                    <p className="mt-2 text-sm text-[#EDE8DE]/60">
                      vs {ed.opponent} — <span className="text-[#D5A754]">{ed.result}</span>
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#EDE8DE]/55">
                      {ed.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {/* cronache recenti */}
            <div className="mt-16 border-t border-[#EDE8DE]/10 pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#EDE8DE]/50">
                Ultimi eventi solidali
              </p>
              <div className="mt-5 divide-y divide-[#EDE8DE]/10">
                {cronacheRecenti.map((ev) => (
                  <div
                    key={`${ev.date}-${ev.title}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4"
                  >
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-5">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#D5A754]">
                        {ev.date}
                      </span>
                      <span className="font-medium text-[#EDE8DE]">{ev.title}</span>
                      <span className="text-sm text-[#EDE8DE]/50">
                        {ev.city} · {ev.venue}
                      </span>
                    </div>
                    <span className="text-sm text-[#EDE8DE]/60">{ev.result}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#EDE8DE]/40">
                {archiveNote}
              </p>
            </div>
          </div>
        </section>

        {/* ============ 6 · IL CAST (squadra) ============ */}
        <section className="relative overflow-hidden py-24 sm:py-28">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(60% 70% at 50% 0%, rgba(213,167,84,0.08), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Kicker>Il cast</Kicker>
                <h2 className="mt-5 font-[family-name:var(--pvb-display)] text-[clamp(2.4rem,1.6rem+4vw,4.6rem)] leading-[0.92]">
                  {players.length} artisti, una maglia
                </h2>
              </div>
              <Link
                href="/la-squadra"
                className="cursor-pointer border-b border-[#D5A754] pb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#D5A754] transition-colors duration-200 hover:text-[#EDE8DE]"
              >
                Tutta la squadra →
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {rosa.map((p) => (
                <figure key={p.name} className="group relative overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px"
                      className="object-cover brightness-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-transparent to-transparent" />
                  </div>
                  <figcaption className="absolute bottom-3 left-4 right-3">
                    <span className="font-[family-name:var(--pvb-display)] text-lg leading-none tracking-wide text-[#EDE8DE] transition-colors duration-300 group-hover:text-[#D5A754]">
                      {p.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7 · PARTNER ============ */}
        <section className="border-y border-[#EDE8DE]/10 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-[#EDE8DE]/45">
              Al nostro fianco
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
              {partners.map((p) => (
                <div key={p.name} className="text-center">
                  <p className="font-[family-name:var(--pvb-display)] text-3xl tracking-[0.08em] text-[#EDE8DE]/85">
                    {p.name}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D5A754]/80">
                    {p.role}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.15em] text-[#EDE8DE]/30">
              [DA COMPLETARE: loghi ufficiali in public/images/partners/ — in questa bozza i partner
              compaiono in lettering, senza loghi inventati]
            </p>
          </div>
        </section>

        {/* ============ 8 · IMPATTO + CLIMAX DONAZIONE ============ */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(75% 60% at 50% 100%, rgba(213,167,84,0.16), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 text-center sm:grid-cols-3">
              {[
                [String(historyStats.lastVerified.incontri), "incontri disputati*"],
                [String(historyStats.lastVerified.anniAttivita), "anni di attività*"],
                ["83.000", "spettatori alla prima edizione, Roma 1992"],
              ].map(([n, label]) => (
                <div key={label}>
                  <p className="font-[family-name:var(--pvb-display)] text-[clamp(3.4rem,2.4rem+4vw,6rem)] leading-none text-[#D5A754]">
                    {n}
                  </p>
                  <p className="mx-auto mt-3 max-w-[24ch] text-sm text-[#EDE8DE]/60">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-[#EDE8DE]/35">
              * Ultimo dato pubblicato dall&rsquo;associazione ({historyStats.lastVerified.sourceYear})
            </p>

            <div className="mt-20 grid gap-8 lg:grid-cols-3">
              {projects.map((pr) => (
                <article
                  key={pr.title}
                  className="border border-[#EDE8DE]/10 bg-[#0B0D12] p-7 transition-colors duration-300 hover:border-[#D5A754]/50"
                >
                  <h3 className="font-[family-name:var(--pvb-display)] text-2xl tracking-wide text-[#EDE8DE]">
                    {pr.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#EDE8DE]/60">{pr.description}</p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-20 max-w-3xl border border-[#D5A754]/40 p-10 text-center sm:p-14">
              <Kicker>
                <span className="mx-auto">5&times;1000</span>
              </Kicker>
              <p className="mt-6 font-[family-name:var(--pvb-quote)] text-2xl italic leading-snug text-[#EDE8DE] sm:text-3xl">
                {fiveXMille.context}
              </p>
              <p className="mt-5 text-sm text-[#EDE8DE]/55">
                Codice fiscale di {fiveXMille.beneficiaryName}, ente partner che riceve il
                5&times;1000 per le iniziative sociali della Nazionale Cantanti
              </p>
              <p className="mt-3 font-[family-name:var(--pvb-display)] text-4xl tracking-[0.1em] text-[#D5A754] sm:text-5xl">
                {fiveXMille.beneficiaryCF}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-5">
                <Link
                  href="/5x1000"
                  className="cursor-pointer bg-[#D5A754] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#07080B] transition-colors duration-200 hover:bg-[#EDE8DE]"
                >
                  Dona il 5&times;1000
                </Link>
                <Link
                  href="/dona-ora"
                  className="cursor-pointer border border-[#EDE8DE]/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200 hover:border-[#D5A754] hover:text-[#D5A754]"
                >
                  Dona ora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* memoria — filmstrip */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#EDE8DE]/45">
              Dalla pellicola dell&rsquo;archivio
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {galleryImages.slice(4, 8).map((g) => (
                <figure key={g.src} className="group relative overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 300px"
                      className="object-cover brightness-75 transition-all duration-500 group-hover:brightness-100"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07080B]/95 to-transparent px-3 pb-2 pt-8 text-[10px] uppercase tracking-[0.12em] text-[#EDE8DE]/75">
                    {g.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ============ 9 · FOOTER ============ */}
      <footer className="border-t border-[#EDE8DE]/10 bg-[#050608]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src="/images/logo.png"
                alt="Logo Nazionale Italiana Cantanti"
                width={150}
                height={62}
                className="h-10 w-auto"
              />
              <p className="mt-4 text-sm leading-relaxed text-[#EDE8DE]/55">
                {site.name}
                <br />
                {site.address.line1}, {site.address.line2}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D5A754]">
                Contatti
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block cursor-pointer text-sm text-[#EDE8DE]/75 transition-colors duration-200 hover:text-[#D5A754]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D5A754]">
                Social
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-[#EDE8DE]/75">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#D5A754]"
                >
                  Instagram
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#D5A754]"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D5A754]">
                Note legali
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-[#EDE8DE]/75">
                <Link
                  href="/privacy-policy"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#D5A754]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contributi-pubblici"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#D5A754]"
                >
                  Contributi ed erogazioni pubbliche
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDE8DE]/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-[#EDE8DE]/35">
            <span>
              © {site.name} · dal {site.foundingYear}
            </span>
            <span>Bozza estetica B · Cinematic / Dark</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
