import { Container } from "@/components/layout/Container";
import { TunnelReveal } from "@/components/motion/TunnelReveal";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export function Manifesto() {
  return (
    <section className="bg-carta py-24 sm:py-32">
      <Container>
        <TunnelReveal className="max-w-4xl">
          <Kicker>La nostra missione</Kicker>
          <p className="mt-6 font-serif text-2xl leading-[1.4] text-notte sm:text-3xl md:text-4xl">
            {site.mission}
          </p>
        </TunnelReveal>
      </Container>
    </section>
  );
}
