import { Container } from "@/components/layout/Container";
import { TunnelReveal } from "@/components/motion/TunnelReveal";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export function Manifesto() {
  return (
    <section className="bg-carta py-24 sm:py-32">
      <Container>
        <TunnelReveal className="max-w-4xl">
          <span aria-hidden className="block h-px w-16 bg-oro" />
          <Kicker className="mt-6">La nostra missione</Kicker>
          <p className="mt-6 font-serif text-title leading-[1.35] text-notte">
            {site.mission}
          </p>
        </TunnelReveal>
      </Container>
    </section>
  );
}
