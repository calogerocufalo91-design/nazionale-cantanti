import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FAQAccordion, type FAQ } from "@/components/content/FAQAccordion";
import { donationChannels, fiveXMille } from "@/data/donation";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Dona ora",
  description:
    "Sostieni i progetti solidali della Nazionale Italiana Cantanti. Dona o destina il tuo 5x1000.",
};

const faqs: FAQ[] = [
  {
    q: "Come posso donare?",
    a: "Puoi sostenere le iniziative della Nazionale Cantanti tramite i canali ufficiali dell'associazione. Per conoscere il canale attivo scrivi a " +
      donationChannels.fallbackContactEmail +
      ": ti indicheremo la modalità corretta e verificata.",
  },
  {
    q: "Cos'è il 5x1000 e come lo destino?",
    a: `Il 5x1000 è una quota delle tue imposte che puoi destinare gratuitamente a un ente del terzo settore. Puoi indicare ${fiveXMille.beneficiaryName} (codice fiscale ${fiveXMille.beneficiaryCF}), l'ente partner che riceve il 5x1000 per le iniziative sociali sostenute dalla Nazionale Cantanti.`,
  },
  {
    q: "Dove vanno i fondi raccolti?",
    a: "A progetti di solidarietà reali: donazioni di strumenti musicali a scuole e case famiglia, sostegno a realtà del territorio e alle cause delle singole partite. Il dettaglio è nella pagina Impatto.",
  },
];

export default function DonaOraPage() {
  const hasDirectLink = Boolean(donationChannels.primaryCtaUrl);

  return (
    <>
      <PageHero
        kicker="Sostienici"
        title="Il tuo gesto trasforma una partita in aiuto"
        subtitle="Dal 1981 mettiamo lo spettacolo al servizio della solidarietà. Con il tuo contributo continuiamo a farlo."
        crumbs={[{ label: "Dona ora" }]}
        poster={pageHeroes.donaOra.poster}
        posterAlt={pageHeroes.donaOra.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <div className="rounded-3xl bg-oro p-8 text-center sm:p-12">
              <h2 className="font-serif text-2xl font-semibold text-oro-scuro sm:text-3xl">
                Fai una donazione
              </h2>
              {hasDirectLink ? (
                <>
                  <p className="mx-auto mt-4 max-w-md text-oro-scuro/80">
                    Sostieni ora le iniziative solidali della Nazionale Cantanti.
                  </p>
                  <a
                    href={donationChannels.primaryCtaUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex rounded-full bg-notte px-8 py-4 font-medium text-white transition-colors hover:bg-notte-800"
                  >
                    Dona ora
                  </a>
                </>
              ) : (
                <>
                  <p className="mx-auto mt-4 max-w-md text-oro-scuro/80">
                    Il canale di donazione online ufficiale è in aggiornamento.
                    Nel frattempo scrivici: ti guidiamo verso la modalità
                    corretta e verificata.
                  </p>
                  <a
                    href={`mailto:${donationChannels.fallbackContactEmail}?subject=Voglio donare`}
                    className="mt-8 inline-flex rounded-full bg-notte px-8 py-4 font-medium text-white transition-colors hover:bg-notte-800"
                  >
                    Scrivici per donare
                  </a>
                </>
              )}
              <p className="mt-6 text-sm text-oro-scuro/70">
                Preferisci il 5x1000?{" "}
                <Link href="/5x1000" className="font-medium underline">
                  Scopri come destinarlo
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <ScrollReveal>
            <SectionTitle kicker="Domande frequenti" title="Come aiutare" />
          </ScrollReveal>
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
