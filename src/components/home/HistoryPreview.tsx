import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Timeline } from "@/components/content/Timeline";
import { partitaDelCuoreEditions } from "@/data/history";

export function HistoryPreview() {
  return (
    <section className="bg-carta py-24 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              kicker="La storia"
              title="Dalla prima Partita del Cuore a oggi"
            />
            <Link
              href="/la-storia"
              className="text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
            >
              Tutta la storia →
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <Timeline editions={partitaDelCuoreEditions} />
        </div>
      </Container>
    </section>
  );
}
