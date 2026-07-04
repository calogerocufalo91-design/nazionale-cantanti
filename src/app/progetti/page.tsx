import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { nicUnited, projects } from "@/data/projects";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Progetti",
  description:
    "I progetti e le iniziative solidali della Nazionale Italiana Cantanti, da NIC United alle donazioni sul territorio.",
};

export default function ProgettiPage() {
  return (
    <>
      <PageHero
        kicker="Progetti"
        title="La musica che fa del bene"
        subtitle={nicUnited.description}
        crumbs={[{ label: "Progetti" }]}
        poster={pageHeroes.progetti.poster}
        posterAlt={pageHeroes.progetti.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle kicker="NIC United" title={nicUnited.tagline} />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <ScrollReveal
                key={project.title}
                delay={i * 0.08}
                className="flex flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white"
              >
                <div className="relative h-48 bg-notte">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-cond text-5xl font-semibold text-oro/80">
                        0{i + 1}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-xl font-semibold text-notte">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-notte/70">
                    {project.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
