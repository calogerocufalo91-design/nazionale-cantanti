import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { site } from "@/data/site";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Contributi ed erogazioni pubbliche",
  description:
    "Informativa sui contributi e sulle erogazioni pubbliche ricevute, ai sensi della Legge 124/2017.",
};

export default function ContributiPage() {
  return (
    <>
      <PageHero
        kicker="Trasparenza"
        title="Contributi ed erogazioni pubbliche"
        crumbs={[{ label: "Contributi ed erogazioni pubbliche" }]}
        poster={pageHeroes.legal.poster}
        posterAlt={pageHeroes.legal.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-notte/80">
            <p>
              Ai sensi dell&apos;art. 1, commi 125-129, della Legge n. 124/2017,
              {" "}
              {site.name} pubblica in questa sezione gli importi di eventuali
              contributi, sovvenzioni ed erogazioni pubbliche ricevute.
            </p>
            <div className="rounded-xl border border-notte/10 bg-white p-6 text-sm text-notte/60">
              L&apos;elenco aggiornato per l&apos;anno di riferimento sarà
              pubblicato qui non appena reso disponibile dall&apos;associazione.
            </div>
            <p className="text-sm text-notte/60">
              Per informazioni:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-azzurro underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
