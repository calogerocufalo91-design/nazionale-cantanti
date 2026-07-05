import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerCarousel } from "@/components/content/PartnerCarousel";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
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
                <span aria-hidden className="block h-1 w-10 rounded-full bg-oro" />
                <h3 className="mt-5 font-serif text-xl font-semibold text-notte">
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

      <section className="bg-notte py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 text-center sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            <ScrollReveal className="px-4">
              <p className="font-cond text-5xl font-semibold text-oro">1981</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/70">
                l&apos;anno in cui tutto è iniziato
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.07} className="px-4">
              <p className="font-cond text-5xl font-semibold text-oro">
                <AnimatedCounter to={35} suffix="ª" />
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/70">
                edizione della Partita del Cuore
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.14} className="px-4">
              <p className="font-cond text-5xl font-semibold text-oro">
                <AnimatedCounter to={640} suffix="+" />
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/70">
                partite benefiche disputate
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.21} className="px-4">
              <p className="font-cond text-5xl font-semibold text-oro">Rai 1</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/70">
                la diretta del prossimo evento
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative h-[380px] sm:h-[440px]">
          <Image
            src="/images/news/givova-terra-santa-filo-di-pace.jpg"
            alt="La Nazionale Cantanti con lo sponsor tecnico Givova"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-notte via-notte/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0">
            <Container className="pb-10">
              <p className="font-cond text-sm uppercase tracking-[0.25em] text-azzurro-chiaro">
                Una partnership che lascia il segno
              </p>
              <p className="mt-2 max-w-2xl font-serif text-2xl font-semibold text-white sm:text-3xl">
                Con lo sponsor tecnico Givova: un filo di pace che attraversa
                il tempo.
              </p>
            </Container>
          </div>
        </div>
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
