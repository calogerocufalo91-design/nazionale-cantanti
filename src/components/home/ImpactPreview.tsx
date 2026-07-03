import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { nicUnited, projects } from "@/data/projects";

export function ImpactPreview() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionTitle kicker="L'impatto" title="Dove va il vostro aiuto" />
          <p className="mt-6 max-w-2xl text-lg text-notte/70">
            {nicUnited.description}
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-notte/10 bg-carta p-7"
            >
              <span className="font-cond text-3xl font-semibold text-oro">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-notte">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-notte/70">
                {project.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/impatto"
            className="text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
          >
            Scopri la trasparenza dei progetti →
          </Link>
        </div>
      </Container>
    </section>
  );
}
