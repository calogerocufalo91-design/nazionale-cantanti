import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { site } from "@/data/site";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali della Nazionale Italiana Cantanti.",
};

const sections = [
  {
    h: "Titolare del trattamento",
    p: `Il titolare del trattamento dei dati è ${site.name}, ${site.address.line1}, ${site.address.line2}. Email: ${site.email}.`,
  },
  {
    h: "Dati raccolti",
    p: "Questo sito raccoglie i dati che decidi di comunicare tramite i moduli di contatto e l'iscrizione alla newsletter (ad esempio nome ed email), al solo scopo di rispondere alle tue richieste e inviarti aggiornamenti.",
  },
  {
    h: "Finalità e base giuridica",
    p: "I dati sono trattati per dare seguito alle tue richieste e, con il tuo consenso, per l'invio di comunicazioni. Non vengono ceduti a terzi per finalità commerciali.",
  },
  {
    h: "I tuoi diritti",
    p: "Puoi richiedere in ogni momento l'accesso, la rettifica o la cancellazione dei tuoi dati scrivendo al titolare.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="Privacy Policy"
        crumbs={[{ label: "Privacy Policy" }]}
        poster={pageHeroes.legal.poster}
        posterAlt={pageHeroes.legal.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-serif text-xl font-semibold text-notte">
                  {s.h}
                </h2>
                <p className="mt-3 text-notte/75">{s.p}</p>
              </div>
            ))}
            <div className="rounded-xl border border-notte/10 bg-white p-6 text-sm text-notte/60">
              Informativa in versione sintetica. Il testo completo e conforme
              (inclusi cookie e servizi di terze parti effettivamente utilizzati)
              sarà finalizzato con l&apos;associazione prima della pubblicazione.
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
