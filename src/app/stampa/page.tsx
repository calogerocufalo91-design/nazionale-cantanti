import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { staff } from "@/data/team";
import { nextEvent } from "@/data/events";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Stampa",
  description:
    "Area media della Nazionale Italiana Cantanti: materiali ufficiali scaricabili, press kit Partita del Cuore 2026, accrediti e contatto stampa.",
};

// Solo materiali REALI già presenti nel progetto: loghi ufficiali e locandina.
const MATERIALI = [
  {
    titolo: "Logo ufficiale",
    descrizione: "Marchio completo della Nazionale Italiana Cantanti (PNG).",
    src: "/images/logo.png",
    download: "nazionale-cantanti-logo.png",
    sfondo: "bg-notte",
  },
  {
    titolo: "Stemma",
    descrizione: "Versione compatta dello stemma, per avatar e favicon (PNG).",
    src: "/images/logo-icon.png",
    download: "nazionale-cantanti-stemma.png",
    sfondo: "bg-notte",
  },
  {
    titolo: "Locandina Partita del Cuore 2026",
    descrizione: "Locandina ufficiale della 35ª edizione (JPEG).",
    src: "/images/events/partita-del-cuore-2026.jpeg",
    download: "partita-del-cuore-2026-locandina.jpeg",
    sfondo: "bg-carta",
  },
] as const;

function IconDownload() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StampaPage() {
  const comunicazione = staff.find((m) => m.role === "Comunicazione");

  return (
    <>
      <PageHero
        kicker="Stampa"
        title="Area media"
        subtitle="Materiali ufficiali, press kit e riferimenti per giornalisti e media partner."
        crumbs={[{ label: "Stampa" }]}
        poster={pageHeroes.stampa.poster}
        posterAlt={pageHeroes.stampa.alt}
      />

      {/* Materiali ufficiali — download immediati */}
      <section className="bg-carta py-16 sm:py-20">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Materiali ufficiali"
              title="Download immediati"
            />
            <p className="mt-6 max-w-3xl text-notte/70">
              Loghi e locandina ufficiali, pronti all&apos;uso editoriale. Per
              formati vettoriali o esigenze particolari scrivi
              all&apos;ufficio stampa.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALI.map((m, i) => (
              <ScrollReveal key={m.titolo} delay={i * 0.06}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white transition-shadow hover:shadow-lg">
                  <div
                    className={`relative flex h-44 items-center justify-center ${m.sfondo}`}
                  >
                    <Image
                      src={m.src}
                      alt={m.titolo}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-semibold text-notte">
                      {m.titolo}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-notte/60">
                      {m.descrizione}
                    </p>
                    <a
                      href={m.src}
                      download={m.download}
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-azzurro px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0090e6]"
                    >
                      <IconDownload />
                      Scarica
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Foto ufficiali → gallery reale */}
            <ScrollReveal delay={0.18}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white transition-shadow hover:shadow-lg">
                <div className="relative flex h-44 items-center justify-center bg-notte">
                  <Image
                    src="/images/gallery/ramazzotti-pele-schumacher.jpg"
                    alt="Foto d'archivio della Nazionale Cantanti"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover opacity-90"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-semibold text-notte">
                    Foto ufficiali
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-notte/60">
                    Immagini d&apos;archivio della Nazionale. Alta risoluzione
                    disponibile su richiesta.
                  </p>
                  <Link
                    href="/gallery"
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-azzurro px-4 py-2 text-sm font-medium text-azzurro transition-colors hover:bg-azzurro hover:text-white"
                  >
                    Apri la gallery
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Press kit Partita del Cuore 2026 */}
      <section className="bg-notte py-16 text-white sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <ScrollReveal>
              <p className="font-cond text-sm font-medium uppercase tracking-[0.28em] text-oro">
                Press kit
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {nextEvent.title}
              </h2>
              <dl className="mt-8 grid gap-x-10 gap-y-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="uppercase tracking-wide text-white/50">
                    Data e ora
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {nextEvent.date}
                    {nextEvent.time ? ` — ore ${nextEvent.time}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wide text-white/50">
                    Luogo
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {nextEvent.stadium}, {nextEvent.city}
                  </dd>
                </div>
                {nextEvent.broadcast && (
                  <div>
                    <dt className="uppercase tracking-wide text-white/50">
                      Diretta TV
                    </dt>
                    <dd className="mt-1 text-lg font-medium">
                      {nextEvent.broadcast}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="uppercase tracking-wide text-white/50">
                    A favore di
                  </dt>
                  <dd className="mt-1 text-lg font-medium">
                    {nextEvent.cause}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/images/events/partita-del-cuore-2026.jpeg"
                  download="partita-del-cuore-2026-locandina.jpeg"
                  className="inline-flex items-center gap-2 rounded-full bg-oro px-6 py-3 text-sm font-semibold text-oro-scuro transition-colors hover:bg-[#f0c05a]"
                >
                  <IconDownload />
                  Scarica la locandina
                </a>
                <a
                  href={`mailto:${site.email}?subject=Richiesta press kit — ${nextEvent.title}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-oro hover:text-oro"
                >
                  Richiedi il kit completo
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative mx-auto aspect-[3/4] w-56 overflow-hidden rounded-2xl ring-1 ring-white/15 sm:w-64">
                <Image
                  src="/images/events/partita-del-cuore-2026.jpeg"
                  alt={`Locandina ufficiale ${nextEvent.title}`}
                  fill
                  sizes="(max-width: 640px) 224px, 256px"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Comunicati, accrediti, contatto */}
      <section className="bg-carta py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <ScrollReveal>
              <div className="flex h-full flex-col rounded-2xl border border-notte/10 bg-white p-7">
                <h3 className="font-serif text-xl font-semibold text-notte">
                  Comunicati e notizie
                </h3>
                <p className="mt-2 flex-1 text-sm text-notte/60">
                  Le comunicazioni ufficiali dell&apos;associazione: iniziative,
                  donazioni, risultati e annunci.
                </p>
                <Link
                  href="/news"
                  className="mt-5 inline-flex w-fit rounded-full border border-azzurro px-5 py-2.5 text-sm font-medium text-azzurro transition-colors hover:bg-azzurro hover:text-white"
                >
                  Vai alle news
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-notte/10 bg-white p-7">
                <h3 className="font-serif text-xl font-semibold text-notte">
                  Accrediti evento
                </h3>
                <p className="mt-2 flex-1 text-sm text-notte/60">
                  Richiedi l&apos;accredito stampa per {nextEvent.title} e per
                  gli eventi della Nazionale. Indica testata, ruolo e data.
                </p>
                <a
                  href={`mailto:${site.email}?subject=Accredito stampa — ${nextEvent.title}`}
                  className="mt-5 inline-flex w-fit rounded-full bg-azzurro px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0090e6]"
                >
                  Richiedi accredito
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-oro/60 bg-white p-7">
                <p className="font-cond text-xs font-medium uppercase tracking-[0.25em] text-oro">
                  Contatto stampa
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-notte">
                  Ufficio comunicazione
                </h3>
                {comunicazione && (
                  <p className="mt-2 text-sm text-notte/70">
                    Referente: <strong>{comunicazione.name}</strong> —{" "}
                    {comunicazione.role}
                  </p>
                )}
                <p className="mt-1 flex-1 text-sm text-notte/60">
                  Interviste, dichiarazioni e richieste editoriali.
                </p>
                <a
                  href={`mailto:${site.email}?subject=Richiesta stampa`}
                  className="mt-5 inline-flex w-fit rounded-full bg-notte px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-notte/85"
                >
                  {site.email}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
