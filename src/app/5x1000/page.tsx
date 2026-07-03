import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { fiveXMille } from "@/data/donation";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "5x1000",
  description:
    "Destina il tuo 5x1000 per sostenere le iniziative sociali della Nazionale Italiana Cantanti.",
};

export default function CinquePerMillePage() {
  return (
    <>
      <PageHero
        kicker="5x1000"
        title="Un gesto che non ti costa nulla"
        subtitle="Con la tua dichiarazione dei redditi puoi sostenere gratuitamente le iniziative sociali sostenute dalla Nazionale Cantanti."
        crumbs={[{ label: "5x1000" }]}
        poster={pageHeroes.cinquePerMille.poster}
        posterAlt={pageHeroes.cinquePerMille.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-notte/80">
            {fiveXMille.context}
          </p>

          <div className="mt-10 rounded-3xl bg-notte p-8 text-center text-white sm:p-12">
            <p className="font-cond text-sm uppercase tracking-[0.25em] text-azzurro-chiaro">
              Firma per
            </p>
            <p className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
              {fiveXMille.beneficiaryName}
            </p>
            <p className="mt-6 font-cond text-sm uppercase tracking-widest text-white/50">
              Codice fiscale
            </p>
            <p className="mt-1 font-cond text-4xl font-semibold text-oro">
              {fiveXMille.beneficiaryCF}
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-notte/10 bg-white p-6 text-sm text-notte/70">
            <p>
              Indica il codice fiscale nel riquadro &quot;Sostegno del volontariato
              e delle organizzazioni non lucrative di utilità sociale&quot; della
              tua dichiarazione dei redditi.
            </p>
            <p className="mt-3 text-notte/50">
              Le scadenze fiscali variano ogni anno: verifica quelle in vigore al
              momento della presentazione della dichiarazione.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
