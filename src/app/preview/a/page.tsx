// BOZZA A — "Editorial / Magazine"
// Direzione estetica: rivista sportiva premium. Tipografia protagonista
// (Fraunces serif espressivo + Archivo grottesco), carta avorio, inchiostro,
// rosso editoriale. Contenuti: SOLO dati reali da src/data/*.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Archivo } from "next/font/google";
import { site, nav } from "@/data/site";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { recentSolidarityEvents, archiveNote, partitaDelCuoreArchive } from "@/data/archivio";
import { players, staff } from "@/data/team";
import { partners } from "@/data/partners";
import { nicUnited, projects } from "@/data/projects";
import { galleryImages } from "@/data/gallery";
import { fiveXMille } from "@/data/donation";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--pva-serif",
  display: "swap",
});

const grotesk = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--pva-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bozza A — Editorial / Magazine",
  robots: { index: false, follow: false },
};

const INK = "#181512";
const PAPER = "#F6F2EA";

/* ---------- micro-componenti della variante ---------- */

function Rule({ thick = false }: { thick?: boolean }) {
  return <div className={thick ? "border-t-2 border-[#181512]" : "border-t border-[#181512]/30"} />;
}

function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="mb-10">
      <Rule thick />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
        <div className="flex items-baseline gap-4">
          <span className="font-[family-name:var(--pva-sans)] text-xs font-bold tracking-[0.25em] text-[#B5232B]">
            {n}
          </span>
          <h2 className="font-[family-name:var(--pva-serif)] text-[clamp(1.7rem,1.2rem+2.4vw,3rem)] font-semibold leading-none">
            {title}
          </h2>
        </div>
        {note ? (
          <span className="font-[family-name:var(--pva-sans)] text-[11px] uppercase tracking-[0.2em] text-[#181512]/60">
            {note}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- pagina ---------- */

export default function BozzaA() {
  const editorialEvents = recentSolidarityEvents.slice(-6).reverse();
  const rosa = players.slice(0, 12);
  const direzione = staff.slice(0, 4);
  const primaEdizione = partitaDelCuoreArchive[0];
  const edizioni = partitaDelCuoreArchive.length;

  return (
    <div
      className={`${serif.variable} ${grotesk.variable} min-h-screen font-[family-name:var(--pva-sans)]`}
      style={{ background: PAPER, color: INK }}
    >
      {/* filetto tricolore da testata */}
      <div className="flex h-1.5">
        <div className="w-1/3 bg-[#00804d]" />
        <div className="w-1/3 bg-[#F6F2EA]" />
        <div className="w-1/3 bg-[#B5232B]" />
      </div>

      {/* ============ 1 · MASTHEAD ============ */}
      <header className="mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#181512]/70">
          <span>Fondata nel {site.foundingYear}</span>
          <span className="hidden sm:block">Milano · Italia</span>
          <span>Anteprima grafica — Bozza A</span>
        </div>
        <div className="mt-4 border-y-2 border-[#181512] py-6 text-center sm:py-8">
          <div className="mb-3 flex justify-center">
            <Image
              src="/images/logo-icon.png"
              alt="Logo Nazionale Italiana Cantanti"
              width={44}
              height={56}
              className="h-12 w-auto"
            />
          </div>
          <h1 className="font-[family-name:var(--pva-serif)] text-[clamp(2rem,1rem+5vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight">
            Nazionale Italiana
            <br />
            Cantanti
          </h1>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B5232B] sm:text-xs">
            Dal 1981 in campo per la solidarietà
          </p>
        </div>
        <nav
          aria-label="Navigazione bozza A"
          className="flex gap-6 overflow-x-auto border-b border-[#181512]/30 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] sm:justify-center"
        >
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap transition-colors duration-200 hover:text-[#B5232B]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap transition-colors duration-200 hover:text-[#B5232B]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {/* ============ 2 · HERO EDITORIALE ============ */}
        <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#B5232B]">
              L&rsquo;apertura
            </p>
            <h2 className="font-[family-name:var(--pva-serif)] text-[clamp(2.1rem,1.2rem+4.4vw,4.2rem)] font-semibold leading-[1.02]">
              La squadra che gioca
              <br />
              <em className="font-normal italic text-[#B5232B]">per chi ha bisogno</em>,
              <br />
              da quarantacinque anni.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#181512]/80">
              {site.mission}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dona-ora"
                className="cursor-pointer bg-[#181512] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F6F2EA] transition-colors duration-200 hover:bg-[#B5232B]"
              >
                Sostieni la missione
              </Link>
              <Link
                href="/la-storia"
                className="cursor-pointer border border-[#181512] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 hover:border-[#B5232B] hover:text-[#B5232B]"
              >
                Leggi la storia
              </Link>
            </div>
          </div>
          <aside className="border-t-2 border-[#181512] pt-4 lg:col-span-4 lg:border-l lg:border-t-0 lg:border-[#181512]/30 lg:pl-8 lg:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#181512]/60">
              I numeri
            </p>
            <div className="mt-4 space-y-6">
              <div>
                <p className="font-[family-name:var(--pva-serif)] text-5xl font-bold">
                  {historyStats.lastVerified.incontri}
                </p>
                <p className="mt-1 text-sm text-[#181512]/70">
                  incontri disputati in {historyStats.lastVerified.anniAttivita} anni di attività
                  <sup>*</sup>
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--pva-serif)] text-5xl font-bold">{edizioni}</p>
                <p className="mt-1 text-sm text-[#181512]/70">
                  edizioni della Partita del Cuore dal {primaEdizione.year}
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--pva-serif)] text-5xl font-bold">83.000</p>
                <p className="mt-1 text-sm text-[#181512]/70">
                  spettatori alla prima edizione, {primaEdizione.stadium} di {primaEdizione.city}
                </p>
              </div>
            </div>
            <p className="mt-6 border-t border-[#181512]/20 pt-3 text-[11px] leading-snug text-[#181512]/50">
              * Ultimo dato pubblicato dall&rsquo;associazione ({historyStats.lastVerified.sourceYear}).
            </p>
          </aside>
        </section>

        {/* foto editoriale d'apertura */}
        <figure className="pb-14">
          <div className="relative aspect-[16/7] overflow-hidden bg-[#181512]/10">
            <Image
              src="/images/gallery/ramazzotti-pele-schumacher.jpg"
              alt="Eros Ramazzotti con Pelé e Michael Schumacher"
              fill
              sizes="(max-width: 1152px) 100vw, 1112px"
              className="object-cover grayscale"
            />
          </div>
          <figcaption className="flex justify-between gap-4 border-b border-[#181512]/30 py-2 text-[11px] uppercase tracking-[0.15em] text-[#181512]/60">
            <span>Eros Ramazzotti con Pelé e Michael Schumacher</span>
            <span className="whitespace-nowrap">Archivio NIC</span>
          </figcaption>
        </figure>

        {/* ============ 3 · LA MISSIONE ============ */}
        <section className="pb-16">
          <SectionHead n="N.01" title="La missione" note="Chi siamo" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-[family-name:var(--pva-serif)] text-[clamp(1.15rem,1rem+0.9vw,1.55rem)] font-medium leading-snug">
                <span className="float-left mr-3 mt-1 font-[family-name:var(--pva-serif)] text-6xl font-black leading-[0.8] text-[#B5232B]">
                  L
                </span>
                &rsquo;evento calcistico con finalità benefiche più conosciuto a livello
                internazionale, legato all&rsquo;idea fondante della Nazionale Italiana Cantanti,
                nata nel 1981.
              </p>
              <p className="mt-5 leading-relaxed text-[#181512]/80">
                Il primo incontro in assoluto si tenne all&rsquo;Arena di Milano, ancora prima
                della nascita ufficiale dell&rsquo;associazione, con due padrini d&rsquo;eccezione:
                Mogol e Lucio Battisti. La Partita del Cuore è stata istituita ufficialmente nel
                1992 e da allora si ripete con cadenza annuale.
              </p>
              <p className="mt-5 leading-relaxed text-[#181512]/80">{nicUnited.description}</p>
              <p className="mt-5 font-[family-name:var(--pva-serif)] text-lg italic text-[#B5232B]">
                &ldquo;{nicUnited.tagline}&rdquo;
              </p>
            </div>
            <div className="lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#181512]/10">
                  <Image
                    src="/images/gallery/sting-maglia-nic.png"
                    alt="Sting con la maglia della Nazionale Italiana Cantanti"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover grayscale"
                  />
                </div>
                <figcaption className="border-b border-[#181512]/30 py-2 text-[11px] uppercase tracking-[0.15em] text-[#181512]/60">
                  Sting con la maglia della Nazionale Italiana Cantanti
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ 4 · PROSSIMO EVENTO ============ */}
        <section className="pb-16">
          <SectionHead n="N.02" title="In copertina" note="Prossimo evento" />
          <div className="grid gap-10 lg:grid-cols-12">
            <figure className="lg:col-span-6">
              <div className="relative aspect-[8/5] overflow-hidden bg-[#181512]/10">
                <Image
                  src={nextEvent.image ?? ""}
                  alt={`Locandina ufficiale — ${nextEvent.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-b border-[#181512]/30 py-2 text-[11px] uppercase tracking-[0.15em] text-[#181512]/60">
                La locandina ufficiale della {nextEvent.title}
              </figcaption>
            </figure>
            <div className="lg:col-span-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B5232B]">
                35ª edizione · {nextEvent.broadcast}
              </p>
              <h3 className="mt-3 font-[family-name:var(--pva-serif)] text-[clamp(1.8rem,1.3rem+2.4vw,3.1rem)] font-bold leading-[1.02]">
                {nextEvent.title}
              </h3>
              <p className="mt-4 max-w-lg leading-relaxed text-[#181512]/80">{nextEvent.summary}</p>
              <dl className="mt-7 border-t-2 border-[#181512] text-sm">
                {[
                  ["Data", `${nextEvent.date} — ore ${nextEvent.time}`],
                  ["Stadio", `${nextEvent.stadium}, ${nextEvent.city}`],
                  ["Diretta", nextEvent.broadcast ?? "—"],
                  ["A sostegno di", nextEvent.cause],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 border-b border-[#181512]/25 py-2.5"
                  >
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#181512]/60">
                      {k}
                    </dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/eventi"
                  className="cursor-pointer bg-[#B5232B] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F6F2EA] transition-colors duration-200 hover:bg-[#181512]"
                >
                  Tutti gli eventi
                </Link>
                <Link
                  href="/news"
                  className="cursor-pointer border border-[#181512] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 hover:border-[#B5232B] hover:text-[#B5232B]"
                >
                  Le prevendite — News
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5 · CRONACHE / GRIGLIA EVENTI ============ */}
        <section className="pb-16">
          <SectionHead n="N.03" title="Le cronache" note="Ultimi eventi disputati" />
          <div className="grid gap-x-10 lg:grid-cols-2">
            {editorialEvents.map((ev, i) => (
              <article
                key={`${ev.date}-${ev.title}`}
                className="group border-b border-[#181512]/25 py-6"
              >
                <div className="flex gap-6">
                  <span className="font-[family-name:var(--pva-serif)] text-4xl font-light leading-none text-[#181512]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B5232B]">
                      {ev.date} · {ev.city}
                    </p>
                    <h3 className="mt-1.5 font-[family-name:var(--pva-serif)] text-xl font-semibold leading-tight transition-colors duration-200 group-hover:text-[#B5232B]">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#181512]/70">{ev.purpose}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-[#181512]/50">
                      {ev.venue} — {ev.result}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <p className="max-w-2xl text-[11px] leading-snug text-[#181512]/50">{archiveNote}</p>
            <Link
              href="/archivio-partite"
              className="cursor-pointer whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-[#B5232B] transition-colors duration-200 hover:text-[#181512]"
            >
              Archivio partite →
            </Link>
          </div>
        </section>

        {/* ============ 6 · LA ROSA ============ */}
        <section className="pb-16">
          <SectionHead n="N.04" title="La rosa" note={`${players.length} artisti in campo`} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {rosa.map((p) => (
              <figure key={p.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#181512]/10">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
                    className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-2 border-t border-[#181512]/30 pt-1.5 font-[family-name:var(--pva-serif)] text-sm font-semibold leading-tight">
                  {p.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-8 border-t-2 border-[#181512] pt-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#181512]/60">
                La direzione
              </p>
              <div className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {direzione.map((s) => (
                  <p key={s.name} className="text-sm">
                    <span className="font-[family-name:var(--pva-serif)] font-semibold">{s.name}</span>
                    <span className="text-[#181512]/60"> — {s.role}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-end lg:col-span-4 lg:justify-end">
              <Link
                href="/la-squadra"
                className="cursor-pointer text-xs font-bold uppercase tracking-[0.2em] text-[#B5232B] transition-colors duration-200 hover:text-[#181512]"
              >
                Tutta la squadra →
              </Link>
            </div>
          </div>
        </section>

        {/* ============ 7 · PARTNER ============ */}
        <section className="pb-16">
          <SectionHead n="N.05" title="I sostenitori" note="Partner & sponsor" />
          <div className="grid gap-px overflow-hidden border border-[#181512]/25 bg-[#181512]/25 sm:grid-cols-3">
            {partners.map((p) => (
              <div key={p.name} className="bg-[#F6F2EA] px-8 py-10 text-center">
                <p className="font-[family-name:var(--pva-serif)] text-2xl font-bold">{p.name}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#181512]/60">
                  {p.role}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#181512]/50">
            [DA COMPLETARE: file logo ufficiali in <code>public/images/partners/</code> — finché
            mancano, i partner sono indicati per esteso senza loghi inventati.]
          </p>
        </section>

        {/* ============ 8 · L'IMPATTO ============ */}
        <section className="pb-16">
          <SectionHead n="N.06" title="Oltre il campo" note="Cause & impatto" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-5">
              {projects.map((pr) => (
                <article key={pr.title} className="border-b border-[#181512]/25 pb-6">
                  <h3 className="font-[family-name:var(--pva-serif)] text-xl font-semibold">
                    {pr.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#181512]/70">{pr.description}</p>
                </article>
              ))}
            </div>
            <div className="lg:col-span-7">
              {projects[0].image ? (
                <figure>
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#181512]/10">
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-b border-[#181512]/30 py-2 text-[11px] uppercase tracking-[0.15em] text-[#181512]/60">
                    {projects[0].title}
                  </figcaption>
                </figure>
              ) : null}
              <div className="mt-8 border-2 border-[#181512] p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B5232B]">
                  5&times;1000
                </p>
                <p className="mt-3 font-[family-name:var(--pva-serif)] text-xl font-semibold leading-snug">
                  {fiveXMille.context}
                </p>
                <p className="mt-4 text-sm text-[#181512]/70">
                  Codice fiscale di {fiveXMille.beneficiaryName}, l&rsquo;ente partner che riceve il
                  5&times;1000 per le iniziative sociali della Nazionale Cantanti:
                </p>
                <p className="mt-2 font-[family-name:var(--pva-serif)] text-3xl font-bold tracking-wide">
                  {fiveXMille.beneficiaryCF}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/5x1000"
                    className="cursor-pointer bg-[#181512] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F6F2EA] transition-colors duration-200 hover:bg-[#B5232B]"
                  >
                    Dona il 5&times;1000
                  </Link>
                  <Link
                    href="/dona-ora"
                    className="cursor-pointer border border-[#181512] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 hover:border-[#B5232B] hover:text-[#B5232B]"
                  >
                    Dona ora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* strip d'archivio */}
        <section className="pb-20">
          <Rule />
          <div className="grid grid-cols-2 gap-5 pt-8 sm:grid-cols-4">
            {galleryImages.slice(0, 4).map((g) => (
              <figure key={g.src}>
                <div className="relative aspect-square overflow-hidden bg-[#181512]/10">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 260px"
                    className="object-cover grayscale"
                  />
                </div>
                <figcaption className="mt-1.5 text-[10px] uppercase tracking-[0.12em] leading-snug text-[#181512]/55">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="pt-6 text-right">
            <Link
              href="/gallery"
              className="cursor-pointer text-xs font-bold uppercase tracking-[0.2em] text-[#B5232B] transition-colors duration-200 hover:text-[#181512]"
            >
              Sfoglia la gallery →
            </Link>
          </div>
        </section>
      </main>

      {/* ============ 9 · FOOTER / COLOPHON ============ */}
      <footer className="border-t-2 border-[#181512]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-[family-name:var(--pva-serif)] text-lg font-bold">{site.name}</p>
              <p className="mt-2 text-sm text-[#181512]/70">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#181512]/60">
                Contatti
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block cursor-pointer text-sm underline-offset-4 transition-colors duration-200 hover:text-[#B5232B] hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#181512]/60">
                Social
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#B5232B]"
                >
                  Instagram
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#B5232B]"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#181512]/60">
                Note legali
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <Link
                  href="/privacy-policy"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#B5232B]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contributi-pubblici"
                  className="block cursor-pointer transition-colors duration-200 hover:text-[#B5232B]"
                >
                  Contributi ed erogazioni pubbliche
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#181512]/25 pt-5 text-[11px] uppercase tracking-[0.18em] text-[#181512]/50">
            <span>
              © {site.name} — dal {site.foundingYear}
            </span>
            <span>Bozza estetica A · Editorial / Magazine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
