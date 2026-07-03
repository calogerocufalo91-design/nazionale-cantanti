import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerCarousel } from "@/components/content/PartnerCarousel";
import { partners } from "@/data/partners";
import { site } from "@/data/site";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Diventa partner della Nazionale Italiana Cantanti: visibilità nazionale e un progetto di valore sociale.",
};

const valueProps = [
  {
    title: "Visibilità nazionale",
    body: "Eventi in diretta TV e una community appassionata: il tuo marchio accanto a volti amati del pubblico italiano.",
  },
  {
    title: "Valore sociale",
    body: "Associa il tuo brand a una missione benefica reale, dal 1981: sport, musica e solidarietà.",
  },
  {
    title: "Partnership su misura",
    body: "Dalla sponsorizzazione tecnica alle iniziative dedicate, costruiamo insieme la collaborazione più adatta.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        kicker="Partner"
        title="Insieme, per fare la differenza"
        subtitle="Le aziende che scelgono la Nazionale Cantanti mettono il loro nome accanto a un progetto di solidarietà che dura da oltre quarant'anni."
        crumbs={[{ label: "Partner" }]}
        poster={pageHeroes.partner.poster}
        posterAlt={pageHeroes.partner.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle
              kicker="Perché diventare partner"
              title="Il tuo brand, un gesto che conta"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valueProps.map((v, i) => (
              <ScrollReveal
                key={v.title}
                delay={i * 0.08}
                className="rounded-2xl border border-notte/10 bg-white p-7"
              >
                <h3 className="font-serif text-xl font-semibold text-notte">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-notte/70">
                  {v.body}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <SectionTitle kicker="Al nostro fianco" title="I partner" />
          </ScrollReveal>
          <div className="mt-12">
            <PartnerCarousel partners={partners} />
          </div>
          <div className="mt-14 rounded-3xl bg-notte p-10 text-center text-white sm:p-14">
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              Vuoi sostenere la Nazionale Cantanti?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Scrivici per costruire insieme una partnership su misura.
            </p>
            <a
              href={`mailto:${site.email}?subject=Proposta di partnership`}
              className="mt-8 inline-flex rounded-full bg-oro px-7 py-3.5 font-medium text-oro-scuro transition-colors hover:bg-[#f0c05a]"
            >
              Diventa partner
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
