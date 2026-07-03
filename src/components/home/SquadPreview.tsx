import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlayerGrid } from "@/components/content/PlayerGrid";
import { players } from "@/data/team";

export function SquadPreview() {
  const preview = players.slice(0, 8);

  return (
    <section className="bg-carta py-24 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              kicker="La squadra"
              title="I campioni che scendono in campo"
            />
            <Link
              href="/la-squadra"
              className="text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
            >
              Tutta la rosa →
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <PlayerGrid players={preview} />
        </div>
      </Container>
    </section>
  );
}
