import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Timeline } from "@/components/content/Timeline";
import { LegendsMarquee } from "@/components/content/LegendsMarquee";
import Link from "next/link";
import {
  historyIntro,
  historyStats,
  partitaDelCuoreEditions,
} from "@/data/history";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "La Storia",
  description:
    "Dal 1981 la Nazionale Italiana Cantanti trasforma il calcio in solidarietà: la storia della Partita del Cuore, edizione dopo edizione.",
};

export default function StoriaPage() {
  return (
    <>
      <PageHero
        kicker="La storia"
        title="Dal 1981, una storia di solidarietà"
        subtitle={historyIntro.body}
        crumbs={[{ label: "La Storia" }]}
        slides={galleryImages.map((g) => ({ src: g.src, alt: g.alt }))}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker={historyIntro.title}
              title="Le edizioni della Partita del Cuore"
            />
            <p className="mt-6 max-w-2xl text-notte/70">
              Un dato di riferimento pubblicato dalla Nazionale:{" "}
              <strong>
                {historyStats.lastVerified.incontri} incontri in{" "}
                {historyStats.lastVerified.anniAttivita} anni di attività
              </strong>{" "}
              (aggiornato al {historyStats.lastVerified.sourceYear}, in corso di
              aggiornamento).
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <Timeline editions={partitaDelCuoreEditions} />
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-notte py-20 text-white sm:py-24">
        <Container>
          <SectionTitle
            light
            kicker="Le leggende"
            title="Sono passati tutti da qui"
          />
          <p className="mt-6 max-w-2xl text-white/70">
            Campioni dello sport, premi Nobel e star internazionali: quarant&apos;anni
            di incontri straordinari, dall&apos;archivio reale della Nazionale.
          </p>
        </Container>
        <div className="mt-12">
          <LegendsMarquee images={galleryImages} />
        </div>
        <Container className="mt-10">
          <Link
            href="/gallery"
            className="text-sm font-medium text-azzurro-chiaro underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Vai alla gallery completa →
          </Link>
        </Container>
      </section>
    </>
  );
}
