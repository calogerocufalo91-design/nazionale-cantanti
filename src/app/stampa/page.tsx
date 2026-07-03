import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { site } from "@/data/site";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Stampa",
  description:
    "Area stampa della Nazionale Italiana Cantanti: contatti e richieste per media e giornalisti.",
};

export default function StampaPage() {
  return (
    <>
      <PageHero
        kicker="Stampa"
        title="Area media"
        subtitle="Sei un giornalista o un media partner? Qui trovi i riferimenti per richieste stampa."
        crumbs={[{ label: "Stampa" }]}
        poster={pageHeroes.stampa.poster}
        posterAlt={pageHeroes.stampa.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-notte/10 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-notte">
              Richieste stampa
            </h2>
            <p className="mt-4 text-notte/70">
              Per accrediti, interviste e materiali ufficiali (cartella stampa,
              foto ad alta risoluzione, loghi) scrivi all&apos;associazione:
            </p>
            <a
              href={`mailto:${site.email}?subject=Richiesta stampa`}
              className="mt-6 inline-flex rounded-full bg-azzurro px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#0090e6]"
            >
              {site.email}
            </a>
            <p className="mt-6 text-sm text-notte/50">
              Il kit stampa completo sarà disponibile a breve.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
