import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Kicker } from "@/components/ui/Kicker";
import { PhotoSlideshow, type Slide } from "./PhotoSlideshow";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

// Le foto usate qui sono reali ma sfocate sotto un overlay azzurro/notte: sfondo
// atmosferico, non presentate come prova di un fatto specifico (vedi media.ts).
export function PageHero({
  kicker,
  title,
  subtitle,
  crumbs,
  poster,
  posterAlt,
  slides,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  poster?: string;
  posterAlt?: string;
  slides?: Slide[];
}) {
  return (
    <section className="relative overflow-hidden bg-notte pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
      {slides && slides.length > 0 ? (
        <div className="absolute inset-0 opacity-40">
          <PhotoSlideshow slides={slides} />
        </div>
      ) : poster ? (
        <Image
          src={poster}
          alt={posterAlt ?? ""}
          fill
          sizes="100vw"
          className="object-cover opacity-30 blur-[2px]"
        />
      ) : null}
      <div className="hero-glow opacity-60" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte via-notte/85 to-notte/60"
      />
      <Container className="relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {kicker && <Kicker className="text-azzurro-chiaro">{kicker}</Kicker>}
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-white/70">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
