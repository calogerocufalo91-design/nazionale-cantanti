import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlayerGrid } from "@/components/content/PlayerGrid";
import { StaffList } from "@/components/content/StaffList";
import { players, staff } from "@/data/team";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "La Squadra",
  description:
    "I cantanti e gli artisti che scendono in campo per la Nazionale Italiana Cantanti, e lo staff che rende possibile ogni evento.",
};

export default function SquadraPage() {
  return (
    <>
      <PageHero
        kicker="La squadra"
        title="I campioni della Nazionale Cantanti"
        subtitle="Cantanti e artisti che indossano la maglia per gli altri. L'elenco riflette la rosa pubblicata dall'associazione."
        crumbs={[{ label: "La Squadra" }]}
        poster={pageHeroes.squadra.poster}
        posterAlt={pageHeroes.squadra.alt}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle kicker="In campo" title="La rosa" />
          </ScrollReveal>
          <div className="mt-12">
            <PlayerGrid players={players} />
          </div>
        </Container>
      </section>

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Dietro le quinte"
              title="Dirigenza e staff"
            />
            <p className="mt-6 max-w-2xl text-notte/70">
              L&apos;organigramma della Nazionale Italiana Cantanti.
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <StaffList staff={staff} />
          </div>
        </Container>
      </section>
    </>
  );
}
