import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { TunnelReveal } from "@/components/motion/TunnelReveal";
import { DonationCTA } from "@/components/content/DonationCTA";

export function DonateClimax() {
  return (
    <section className="relative overflow-hidden bg-oro py-28 sm:py-36">
      <Container className="relative text-center">
        <TunnelReveal>
          <p className="font-cond text-sm font-medium uppercase tracking-[0.3em] text-oro-scuro/70">
            Il tuo gesto conta
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-display font-semibold text-oro-scuro">
            Trasforma una partita in un aiuto concreto
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-oro-scuro/80">
            Ogni contributo sostiene i progetti di solidarietà della Nazionale
            Italiana Cantanti. Anche il tuo 5×1000 fa la differenza.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <DonationCTA variant="notte" />
            <Link
              href="/5x1000"
              className="inline-flex items-center justify-center rounded-full border border-oro-scuro/40 px-7 py-3.5 font-medium text-oro-scuro transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:border-oro-scuro/60 hover:bg-oro-scuro/10 hover:shadow-[0_10px_28px_-12px_rgba(11,29,46,0.55)] active:scale-[0.98]"
            >
              Dona il 5×1000
            </Link>
          </div>
        </TunnelReveal>
      </Container>
    </section>
  );
}
