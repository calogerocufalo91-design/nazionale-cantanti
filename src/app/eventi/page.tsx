import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventCard } from "@/components/content/EventCard";
import { nextEvent, archivedEvents } from "@/data/events";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Eventi",
  description:
    "Le partite e le iniziative della Nazionale Italiana Cantanti: il prossimo evento e l'archivio storico.",
};

export default function EventiPage() {
  return (
    <>
      <PageHero
        kicker="Eventi"
        title="Le partite del cuore"
        subtitle="Il prossimo appuntamento in campo e l'archivio delle iniziative."
        crumbs={[{ label: "Eventi" }]}
        poster={pageHeroes.eventi.poster}
        posterAlt={pageHeroes.eventi.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle kicker="In arrivo" title="Il prossimo evento" />
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal>
              <EventCard event={nextEvent} />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Archivio"
              title="Eventi passati e rinviati"
            />
            <p className="mt-6 max-w-2xl text-notte/70">
              Alcune iniziative del 2020 furono rinviate per l&apos;emergenza
              Covid-19. Le conserviamo qui come archivio storico.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {archivedEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={(i % 3) * 0.08}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
