import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { site } from "@/data/site";

// Numeri correnti: "oltre 640 partite benefiche" è il dato fornito dal cliente
// con l'archivio (2026); gli anni di attività sono calcolati dalla fondazione.
const anniAttivita = new Date().getFullYear() - site.foundingYear;

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 640, suffix: "+", label: "partite benefiche" },
  { value: anniAttivita, label: "anni di attività" },
  { value: 35, suffix: "ª", label: "Partita del Cuore" },
];

export function StatsBand() {
  return (
    <section className="bg-notte py-24 text-white sm:py-28">
      <Container>
        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-white/10">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={i * 0.08}
              className="px-4 py-8 text-center sm:py-2"
            >
              <div className="font-cond text-6xl font-semibold leading-none text-oro sm:text-7xl">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
