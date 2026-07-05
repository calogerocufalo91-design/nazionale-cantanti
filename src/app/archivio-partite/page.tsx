import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArchiveEventCard } from "@/components/content/ArchiveEventCard";
import {
  archiveIntro,
  archiveCategories,
  archiveNote,
  partitaDelCuoreArchive,
  recentSolidarityEvents,
  type ArchiveEdition,
} from "@/data/archivio";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Archivio Partite",
  description: archiveIntro.subtitle,
};

const DECADES = [
  { id: "anni-90", label: "Anni '90", from: 1992, to: 1999 },
  { id: "anni-2000", label: "2000–2009", from: 2000, to: 2009 },
  { id: "anni-2010", label: "2010–2019", from: 2010, to: 2019 },
  { id: "anni-2020", label: "2020–oggi", from: 2020, to: 2026 },
];

function EditionRow({ edition }: { edition: ArchiveEdition }) {
  const special = /triangolare|formula/i.test(edition.opponent);
  const upcoming = /in programma/i.test(edition.result);
  return (
    <div className="grid gap-4 rounded-2xl border border-notte/10 bg-white p-6 sm:grid-cols-[120px_1fr] sm:gap-6">
      <div>
        <span className="font-cond text-5xl font-semibold leading-none text-oro">
          {edition.year}
        </span>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-notte/50">
          {edition.edition}
        </p>
      </div>
      <div>
        <p className="font-cond text-sm uppercase tracking-wide text-azzurro">
          {edition.city} · {edition.stadium} · {edition.date}
        </p>
        <h3 className="mt-1 font-serif text-xl font-semibold text-notte">
          {special ? edition.opponent : `vs ${edition.opponent}`}
        </h3>
        <span
          className={
            "mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium " +
            (upcoming ? "bg-oro text-oro-scuro" : "bg-notte/5 text-notte/80")
          }
        >
          {edition.result}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-notte/70">
          {edition.description}
        </p>
      </div>
    </div>
  );
}

export default function ArchivioPartitePage() {
  return (
    <>
      <PageHero
        kicker="Archivio"
        title={archiveIntro.title}
        subtitle={archiveIntro.subtitle}
        crumbs={[{ label: "Archivio Partite" }]}
        poster={pageHeroes.eventi.poster}
        posterAlt={pageHeroes.eventi.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="1992 — oggi"
              title="Le edizioni della Partita del Cuore"
            />
            <p className="mt-6 max-w-3xl text-notte/70">
              {archiveIntro.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {archiveCategories.map((cat) => (
                <li
                  key={cat}
                  className="rounded-full border border-notte/15 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-notte/60"
                >
                  {cat}
                </li>
              ))}
            </ul>
            <nav
              aria-label="Salta a un decennio"
              className="mt-8 flex flex-wrap gap-2"
            >
              {DECADES.map((d) => (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  className="rounded-full bg-notte px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-azzurro"
                >
                  {d.label}
                </a>
              ))}
            </nav>
          </ScrollReveal>

          <div className="mt-14 space-y-16">
            {DECADES.map((decade) => {
              const editions = partitaDelCuoreArchive.filter(
                (e) => e.year >= decade.from && e.year <= decade.to,
              );
              return (
                <div key={decade.id} id={decade.id} className="scroll-mt-28">
                  <ScrollReveal>
                    <div className="flex items-center gap-4">
                      <h3 className="font-cond text-2xl font-semibold uppercase tracking-[0.15em] text-notte">
                        {decade.label}
                      </h3>
                      <span aria-hidden className="h-px flex-1 bg-notte/15" />
                      <span className="text-sm text-notte/50">
                        {editions.length} edizioni
                      </span>
                    </div>
                  </ScrollReveal>
                  <ul className="mt-6 space-y-4">
                    {editions.map((edition) => (
                      <ScrollReveal key={edition.year} as="li">
                        <EditionRow edition={edition} />
                      </ScrollReveal>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Oltre la Partita del Cuore"
              title="Eventi solidali recenti"
            />
            <p className="mt-6 max-w-3xl text-notte/70">
              Archivio delle principali edizioni della Partita del Cuore e degli
              eventi solidali recenti: partite speciali, triangolari benefici e
              raccolte fondi sul territorio.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentSolidarityEvents.map((event, i) => (
              <ScrollReveal
                key={`${event.date}-${event.title}`}
                delay={(i % 3) * 0.08}
              >
                <ArchiveEventCard event={event} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-notte/10 bg-carta p-6 text-sm leading-relaxed text-notte/60">
            {archiveNote}
          </div>
        </Container>
      </section>
    </>
  );
}
