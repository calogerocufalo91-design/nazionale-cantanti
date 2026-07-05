import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventCard } from "@/components/content/EventCard";
import { ArchiveEventCard } from "@/components/content/ArchiveEventCard";
import { nextEvent } from "@/data/events";
import { recentSolidarityEvents } from "@/data/archivio";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Eventi",
  description:
    "Le partite e le iniziative della Nazionale Italiana Cantanti: il prossimo evento e gli appuntamenti solidali più recenti.",
};

export default function EventiPage() {
  // Gli eventi recenti, dal più nuovo al più vecchio.
  const recent = [...recentSolidarityEvents].reverse().slice(0, 6);

  return (
    <>
      <PageHero
        kicker="Eventi"
        title="Le partite del cuore"
        subtitle="Il prossimo appuntamento in campo e gli eventi solidali più recenti."
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
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                kicker="Appena giocate"
                title="Gli eventi solidali più recenti"
              />
              <Link
                href="/archivio-partite"
                className="text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
              >
                Sfoglia l&apos;archivio completo →
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((event, i) => (
              <ScrollReveal
                key={`${event.date}-${event.title}`}
                delay={(i % 3) * 0.08}
              >
                <ArchiveEventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
