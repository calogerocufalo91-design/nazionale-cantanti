// BOZZA C — "Minimal istituzionale / Luxury"
// Direzione estetica: eleganza sobria da istituzione internazionale.
// Marcellus (roman capitale) + Jost (geometrico), avorio, inchiostro caldo,
// bronzo. Filetti sottili, tanto spazio bianco, nessun rumore.
// Contenuti: SOLO dati reali da src/data/*.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { site, nav } from "@/data/site";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { recentSolidarityEvents, archiveNote, partitaDelCuoreArchive } from "@/data/archivio";
import { players, staff } from "@/data/team";
import { partners } from "@/data/partners";
import { nicUnited, projects } from "@/data/projects";
import { galleryImages } from "@/data/gallery";
import { fiveXMille } from "@/data/donation";

const roman = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--pvc-roman",
  display: "swap",
});

const geo = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--pvc-geo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bozza C — Minimal istituzionale / Luxury",
  robots: { index: false, follow: false },
};

function SmallCaps({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-normal uppercase tracking-[0.4em] text-[#8C6D3F]">{children}</p>
  );
}

function Hairline() {
  return <div className="mx-auto h-px w-full max-w-5xl bg-[#17140F]/12" aria-hidden />;
}

export default function BozzaC() {
  const eventiRecenti = recentSolidarityEvents.slice(-5).reverse();
  const ritratti = players.slice(0, 8);
  const direzione = staff.slice(0, 3);

  return (
    <div
      className={`${roman.variable} ${geo.variable} min-h-screen bg-[#FCFBF7] font-[family-name:var(--pvc-geo)] font-light text-[#17140F]`}
    >
      {/* ============ 1 · HEADER ============ */}
      <header className="px-5 pt-12 sm:pt-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <Image
            src="/images/logo-icon.png"
            alt="Logo Nazionale Italiana Cantanti"
            width={36}
            height={46}
            className="h-10 w-auto"
            priority
          />
          <p className="font-[family-name:var(--pvc-roman)] text-xl tracking-[0.28em] uppercase sm:text-2xl">
            Nazionale Italiana Cantanti
          </p>
          <SmallCaps>Dal {site.foundingYear} · Milano</SmallCaps>
        </div>
        <nav
          aria-label="Navigazione bozza C"
          className="mx-auto mt-8 flex max-w-5xl justify-start gap-8 overflow-x-auto border-y border-[#17140F]/12 px-1 py-4 text-[11px] uppercase tracking-[0.3em] text-[#17140F]/70 sm:justify-center"
        >
          {nav.slice(0, 7).map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer whitespace-nowrap transition-colors duration-200 hover:text-[#8C6D3F]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="cursor-pointer whitespace-nowrap transition-colors duration-200 hover:text-[#8C6D3F]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </header>

      <main>
        {/* ============ 2 · HERO ============ */}
        <section className="px-5 py-24 text-center sm:py-36">
          <div className="mx-auto max-w-3xl">
            <SmallCaps>La più antica nazionale di artisti al mondo</SmallCaps>
            <h1 className="mt-10 font-[family-name:var(--pvc-roman)] text-[clamp(2.4rem,1.4rem+4.6vw,4.8rem)] leading-[1.1]">
              In campo per la solidarietà,
              <br />
              dal 1981.
            </h1>
            <p className="mx-auto mt-10 max-w-xl text-[17px] leading-[1.9] text-[#17140F]/70">
              {site.mission}
            </p>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
              <Link
                href="/dona-ora"
                className="cursor-pointer bg-[#17140F] px-10 py-4 text-[11px] uppercase tracking-[0.35em] text-[#FCFBF7] transition-colors duration-300 hover:bg-[#8C6D3F]"
              >
                Sostienici
              </Link>
              <Link
                href="/la-storia"
                className="cursor-pointer border-b border-[#8C6D3F]/60 pb-1 text-[11px] uppercase tracking-[0.35em] text-[#17140F]/80 transition-colors duration-300 hover:text-[#8C6D3F]"
              >
                La storia
              </Link>
            </div>
          </div>
        </section>

        <Hairline />

        {/* numeri istituzionali */}
        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 text-center sm:grid-cols-3">
            {[
              [String(historyStats.lastVerified.incontri), "incontri disputati*"],
              [String(partitaDelCuoreArchive.length), "edizioni della Partita del Cuore"],
              [String(historyStats.lastVerified.anniAttivita), "anni di attività*"],
            ].map(([n, label]) => (
              <div key={label}>
                <p className="font-[family-name:var(--pvc-roman)] text-6xl text-[#17140F]">{n}</p>
                <div className="mx-auto mt-4 h-px w-8 bg-[#8C6D3F]" aria-hidden />
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#17140F]/55">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.25em] text-[#17140F]/40">
            * Ultimo dato pubblicato dall&rsquo;associazione ({historyStats.lastVerified.sourceYear})
          </p>
        </section>

        <Hairline />

        {/* ============ 3 · LA MISSIONE ============ */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SmallCaps>I · La missione</SmallCaps>
              <h2 className="mt-6 font-[family-name:var(--pvc-roman)] text-3xl leading-snug sm:text-4xl">
                Un&rsquo;idea nata
                <br />
                all&rsquo;Arena di Milano
              </h2>
            </div>
            <div className="space-y-7 text-[16px] leading-[1.95] text-[#17140F]/75 lg:col-span-8">
              <p>
                L&rsquo;evento calcistico con finalità benefiche più conosciuto a livello
                internazionale, legato all&rsquo;idea fondante della Nazionale Italiana Cantanti,
                nata nel 1981. Il primo incontro in assoluto si tenne all&rsquo;Arena di Milano,
                ancora prima della nascita ufficiale dell&rsquo;associazione, con due padrini
                d&rsquo;eccezione: Mogol e Lucio Battisti.
              </p>
              <p>
                La Partita del Cuore è stata istituita ufficialmente nel 1992 e da allora si ripete
                con cadenza annuale.
              </p>
              <p className="text-[#17140F]/60">
                {nicUnited.tagline} {nicUnited.description}
              </p>
            </div>
          </div>
        </section>

        {/* fotografia d'archivio, incorniciata */}
        <section className="px-5 pb-24 sm:pb-32">
          <figure className="mx-auto max-w-3xl">
            <div className="border border-[#17140F]/15 bg-[#FCFBF7] p-3 sm:p-4">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/gallery/morandi-perez-arafat.png"
                  alt="Gianni Morandi con Shimon Peres e Yasser Arafat (2000)"
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <figcaption className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-[#17140F]/50">
              Gianni Morandi con Shimon Peres e Yasser Arafat · 2000
            </figcaption>
          </figure>
        </section>

        <Hairline />

        {/* ============ 4 · PROSSIMO EVENTO ============ */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <SmallCaps>II · Il prossimo appuntamento</SmallCaps>
              <h2 className="mt-6 font-[family-name:var(--pvc-roman)] text-[clamp(2rem,1.4rem+3vw,3.6rem)] leading-tight">
                {nextEvent.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl leading-[1.9] text-[#17140F]/70">
                {nextEvent.summary}
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
              <figure>
                <div className="border border-[#17140F]/15 p-3">
                  <div className="relative aspect-[8/5] overflow-hidden">
                    <Image
                      src={nextEvent.image ?? ""}
                      alt={`Locandina ufficiale — ${nextEvent.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-[#17140F]/45">
                  Locandina ufficiale · 35ª edizione
                </figcaption>
              </figure>
              <dl className="divide-y divide-[#17140F]/12 border-y border-[#17140F]/12">
                {[
                  ["Data", `${nextEvent.date}, ore ${nextEvent.time}`],
                  ["Luogo", `${nextEvent.stadium} — ${nextEvent.city}`],
                  ["Diretta", nextEvent.broadcast ?? "—"],
                  ["Beneficiario", nextEvent.cause],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-6 py-4 sm:grid-cols-[9rem_1fr]">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D3F] leading-5">
                      {k}
                    </dt>
                    <dd className="text-[15px] leading-relaxed text-[#17140F]/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/eventi"
                className="cursor-pointer border-b border-[#8C6D3F]/60 pb-1 text-[11px] uppercase tracking-[0.35em] text-[#17140F]/80 transition-colors duration-300 hover:text-[#8C6D3F]"
              >
                Tutti gli eventi
              </Link>
            </div>
          </div>
        </section>

        <Hairline />

        {/* ============ 5 · GLI EVENTI RECENTI (registro) ============ */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <SmallCaps>III · Il registro delle partite</SmallCaps>
            </div>
            <div className="divide-y divide-[#17140F]/12 border-y border-[#17140F]/12">
              {eventiRecenti.map((ev) => (
                <article
                  key={`${ev.date}-${ev.title}`}
                  className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-8"
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D3F] sm:pt-1">
                    {ev.date}
                  </p>
                  <div>
                    <h3 className="font-[family-name:var(--pvc-roman)] text-xl leading-snug">
                      {ev.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#17140F]/60">{ev.purpose}</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#17140F]/50 sm:pt-1 sm:text-right">
                    {ev.city}
                    <br className="hidden sm:block" />
                    <span className="normal-case tracking-normal">{ev.venue}</span>
                  </p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[#17140F]/45">
              {archiveNote}
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/archivio-partite"
                className="cursor-pointer border-b border-[#8C6D3F]/60 pb-1 text-[11px] uppercase tracking-[0.35em] text-[#17140F]/80 transition-colors duration-300 hover:text-[#8C6D3F]"
              >
                Archivio completo
              </Link>
            </div>
          </div>
        </section>

        <Hairline />

        {/* ============ 6 · LA SQUADRA ============ */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <SmallCaps>IV · La squadra</SmallCaps>
              <h2 className="mt-6 font-[family-name:var(--pvc-roman)] text-3xl sm:text-4xl">
                Gli artisti in campo
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {ritratti.map((p) => (
                <figure key={p.name} className="group text-center">
                  <div className="relative mx-auto aspect-[3/4] w-full max-w-[190px] overflow-hidden">
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 190px"
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span className="font-[family-name:var(--pvc-roman)] text-[15px] tracking-wide">
                      {p.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mx-auto mt-16 max-w-2xl border-y border-[#17140F]/12 py-8 text-center">
              <SmallCaps>La direzione</SmallCaps>
              <div className="mt-5 space-y-2">
                {direzione.map((s) => (
                  <p key={s.name} className="text-[15px]">
                    <span className="font-[family-name:var(--pvc-roman)]">{s.name}</span>
                    <span className="text-[#17140F]/55"> · {s.role}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/la-squadra"
                className="cursor-pointer border-b border-[#8C6D3F]/60 pb-1 text-[11px] uppercase tracking-[0.35em] text-[#17140F]/80 transition-colors duration-300 hover:text-[#8C6D3F]"
              >
                Tutti i {players.length} componenti
              </Link>
            </div>
          </div>
        </section>

        <Hairline />

        {/* ============ 7 · PARTNER ============ */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <SmallCaps>V · I partner</SmallCaps>
            <div className="mt-10 flex flex-wrap items-baseline justify-center gap-x-20 gap-y-10">
              {partners.map((p) => (
                <div key={p.name}>
                  <p className="font-[family-name:var(--pvc-roman)] text-2xl tracking-[0.08em]">
                    {p.name}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#17140F]/50">
                    {p.role}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#17140F]/35">
              [DA COMPLETARE: loghi ufficiali in public/images/partners/]
            </p>
          </div>
        </section>

        <Hairline />

        {/* ============ 8 · SOSTEGNO / 5x1000 ============ */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <SmallCaps>VI · Le cause sostenute</SmallCaps>
            </div>
            <div className="grid gap-12 sm:grid-cols-3">
              {projects.map((pr) => (
                <article key={pr.title} className="text-center">
                  <h3 className="font-[family-name:var(--pvc-roman)] text-xl leading-snug">
                    {pr.title}
                  </h3>
                  <div className="mx-auto mt-4 h-px w-8 bg-[#8C6D3F]" aria-hidden />
                  <p className="mt-4 text-sm leading-[1.9] text-[#17140F]/60">{pr.description}</p>
                </article>
              ))}
            </div>
            <div className="mx-auto mt-20 max-w-2xl border border-[#8C6D3F]/40 px-8 py-12 text-center sm:px-14">
              <SmallCaps>Il tuo 5&times;1000</SmallCaps>
              <p className="mt-6 font-[family-name:var(--pvc-roman)] text-2xl leading-snug">
                {fiveXMille.context}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#17140F]/60">
                Codice fiscale di {fiveXMille.beneficiaryName}, l&rsquo;ente partner che riceve il
                5&times;1000 per le iniziative sociali della Nazionale Cantanti
              </p>
              <p className="mt-4 font-[family-name:var(--pvc-roman)] text-3xl tracking-[0.15em]">
                {fiveXMille.beneficiaryCF}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-6">
                <Link
                  href="/5x1000"
                  className="cursor-pointer bg-[#17140F] px-9 py-4 text-[11px] uppercase tracking-[0.35em] text-[#FCFBF7] transition-colors duration-300 hover:bg-[#8C6D3F]"
                >
                  Dona il 5&times;1000
                </Link>
                <Link
                  href="/dona-ora"
                  className="cursor-pointer border border-[#17140F]/30 px-9 py-4 text-[11px] uppercase tracking-[0.35em] transition-colors duration-300 hover:border-[#8C6D3F] hover:text-[#8C6D3F]"
                >
                  Dona ora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* memoria */}
        <section className="px-5 pb-28">
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6">
            {galleryImages.slice(8, 11).map((g) => (
              <figure key={g.src}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 320px"
                    className="object-cover grayscale"
                  />
                </div>
                <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] leading-relaxed text-[#17140F]/45">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      {/* ============ 9 · FOOTER ============ */}
      <footer className="border-t border-[#17140F]/12 px-5 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <Image
            src="/images/logo-icon.png"
            alt="Logo Nazionale Italiana Cantanti"
            width={28}
            height={36}
            className="mx-auto h-8 w-auto"
          />
          <p className="mt-5 font-[family-name:var(--pvc-roman)] text-lg tracking-[0.2em] uppercase">
            {site.name}
          </p>
          <p className="mt-4 text-sm text-[#17140F]/60">
            {site.address.line1} · {site.address.line2}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block cursor-pointer text-sm text-[#17140F]/60 transition-colors duration-200 hover:text-[#8C6D3F]"
          >
            {site.email}
          </a>
          <div className="mt-8 flex justify-center gap-10 text-[11px] uppercase tracking-[0.3em] text-[#17140F]/60">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-colors duration-200 hover:text-[#8C6D3F]"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-colors duration-200 hover:text-[#8C6D3F]"
            >
              Facebook
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-10 text-[10px] uppercase tracking-[0.25em] text-[#17140F]/45">
            <Link
              href="/privacy-policy"
              className="cursor-pointer transition-colors duration-200 hover:text-[#8C6D3F]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contributi-pubblici"
              className="cursor-pointer transition-colors duration-200 hover:text-[#8C6D3F]"
            >
              Contributi pubblici
            </Link>
          </div>
          <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[#17140F]/35">
            © {site.name} · dal {site.foundingYear} — Bozza estetica C · Minimal / Luxury
          </p>
        </div>
      </footer>
    </div>
  );
}
