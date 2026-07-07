import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArchivioEsplora } from "@/components/archivio/ArchivioEsplora";
import {
  archiveIntro,
  archiveCategories,
  archiveNote,
  partitaDelCuoreArchive,
  recentSolidarityEvents,
} from "@/data/archivio";
import { archivioItems, cittaGiocate } from "@/lib/archivio-view";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Archivio Partite",
  description: archiveIntro.subtitle,
};

export default function ArchivioPartitePage() {
  const numCitta = cittaGiocate(archivioItems).length;

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

      <section className="bg-carta py-16 sm:py-20">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="1992 — oggi"
              title="Un archivio storico da esplorare"
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
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-notte/10 bg-white p-6 text-center">
                <p className="font-cond text-4xl font-semibold text-oro">
                  {partitaDelCuoreArchive.length}
                </p>
                <p className="mt-1 text-sm text-notte/60">
                  edizioni della Partita del Cuore
                </p>
              </div>
              <div className="rounded-2xl border border-notte/10 bg-white p-6 text-center">
                <p className="font-cond text-4xl font-semibold text-oro">
                  {recentSolidarityEvents.length}
                </p>
                <p className="mt-1 text-sm text-notte/60">
                  eventi solidali recenti
                </p>
              </div>
              <div className="rounded-2xl border border-notte/10 bg-white p-6 text-center">
                <p className="font-cond text-4xl font-semibold text-oro">
                  {numCitta}
                </p>
                <p className="mt-1 text-sm text-notte/60">città toccate</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <ArchivioEsplora />

      <section className="bg-carta pb-20">
        <Container>
          <div className="rounded-2xl border border-notte/10 bg-white p-6 text-sm leading-relaxed text-notte/60">
            {archiveNote}
          </div>
        </Container>
      </section>
    </>
  );
}
