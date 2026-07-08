import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// Sezione "ponte": collega il Prossimo Evento (sopra, sfondo chiaro) alla Mappa
// del Cuore (sotto, sfondo navy). Una colonna singola, sobria: introduce chi è
// la Nazionale Cantanti e apre il viaggio tra le città. I numeri vivono altrove
// (StatsBand, Mappa del Cuore): qui resta solo il racconto.
export function StoriaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-carta via-carta to-[#eef1f4] py-24 sm:py-28">
      {/* Filo oro superiore + bagliore d'atmosfera */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 85% 10%, rgba(0,114,187,0.07), transparent 60%)",
        }}
      />

      <Container className="relative">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-cond text-sm font-medium uppercase tracking-[0.34em] text-azzurro">
            Chi siamo
          </p>
          <h2 className="mt-4 font-serif text-heading font-semibold text-notte">
            La storia di una maglia{" "}
            <span className="text-azzurro">che unisce</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-notte/75">
            Una squadra di cantanti che da oltre quarant&apos;anni trasforma ogni
            trasferta in un incontro tra musica, sport e territorio. Città dopo
            città, ne è nata una mappa che attraversa l&apos;Italia.
          </p>

          <div className="mt-10">
            <Link
              href="/la-storia"
              className="group inline-flex items-center gap-2 rounded-full bg-notte px-8 py-4 font-medium text-white shadow-[0_16px_40px_-18px_rgba(11,29,46,0.55)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-notte-800 hover:shadow-[0_22px_50px_-18px_rgba(11,29,46,0.65)] active:scale-[0.98]"
            >
              Scopri la storia
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
