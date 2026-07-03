import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { historyStats } from "@/data/history";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  note?: boolean;
};

const stats: Stat[] = [
  {
    value: historyStats.lastVerified.incontri,
    label: "incontri disputati",
    note: true,
  },
  {
    value: historyStats.lastVerified.anniAttivita,
    label: "anni di attività",
    note: true,
  },
  { value: 35, suffix: "ª", label: "Partita del Cuore" },
];

export function StatsBand() {
  return (
    <section className="bg-notte py-24 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08} className="text-center">
              <div className="font-cond text-6xl font-semibold leading-none text-oro sm:text-7xl">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                {stat.note && <span className="align-super text-2xl text-oro/70">*</span>}
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-white/40">
          * dati di attività aggiornati al {historyStats.lastVerified.sourceYear},
          in corso di aggiornamento.
        </p>
      </Container>
    </section>
  );
}
