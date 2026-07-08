import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ArchivioEsplora } from "@/components/archivio/ArchivioEsplora";
import { archiveIntro, archiveNote } from "@/data/archivio";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Archivio Partite",
  description: archiveIntro.subtitle,
};

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
