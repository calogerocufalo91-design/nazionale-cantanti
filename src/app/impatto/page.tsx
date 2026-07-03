import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ImpactStats } from "@/components/content/ImpactStats";
import { DonationCTA } from "@/components/content/DonationCTA";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Impatto e trasparenza",
  description:
    "Dove vanno i fondi raccolti dalla Nazionale Italiana Cantanti: progetti sostenuti e trasparenza.",
};

const tiles = [
  { value: String(projects.length), label: "progetti solidali documentati" },
  { value: "35ª", label: "edizione della Partita del Cuore (2026)" },
  {
    value: "Da confermare",
    label: "fondi raccolti e devoluti",
    pending: true,
  },
];

export default function ImpattoPage() {
  return (
    <>
      <PageHero
        kicker="Impatto"
        title="Dove va il vostro aiuto"
        subtitle="La solidarietà si misura nei fatti. Ecco i progetti che sostieni quando doni alla Nazionale Cantanti."
        crumbs={[{ label: "Impatto" }]}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle kicker="I numeri" title="Trasparenza" />
            <p className="mt-6 max-w-2xl text-notte/70">
              Riportiamo solo dati verificati. Gli importi economici saranno
              pubblicati una volta confermati ufficialmente dall&apos;associazione.
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <ImpactStats tiles={tiles} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Progetti sostenuti"
              title="Il bene, concretamente"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-notte/10 bg-carta p-7"
              >
                <h3 className="font-serif text-xl font-semibold text-notte">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-notte/70">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <DonationCTA />
          </div>
        </Container>
      </section>
    </>
  );
}
