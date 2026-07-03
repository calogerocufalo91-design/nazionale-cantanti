import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TunnelReveal } from "@/components/motion/TunnelReveal";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { nextEvent } from "@/data/events";

export function NextEvent() {
  const e = nextEvent;
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <TunnelReveal>
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-notte text-white lg:grid-cols-2">
            {e.image && (
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[440px]">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-8 sm:p-12">
              <Kicker className="text-azzurro-chiaro">Prossimo evento</Kicker>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                {e.title}
              </h2>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="text-white/50">Data</dt>
                  <dd className="mt-1 font-medium">
                    {e.date}
                    {e.time ? ` · ${e.time}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50">Dove</dt>
                  <dd className="mt-1 font-medium">
                    {e.stadium}, {e.city}
                  </dd>
                </div>
                {e.broadcast && (
                  <div>
                    <dt className="text-white/50">In diretta</dt>
                    <dd className="mt-1 font-medium">{e.broadcast}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-white/50">A favore di</dt>
                  <dd className="mt-1 font-medium">{e.cause}</dd>
                </div>
              </dl>
              <p className="mt-6 max-w-md text-white/70">{e.summary}</p>
              <div className="mt-8">
                <MagneticButton href={`/eventi/${e.slug}`} variant="azzurro">
                  Dettagli e prevendite
                </MagneticButton>
              </div>
            </div>
          </div>
        </TunnelReveal>
      </Container>
    </section>
  );
}
