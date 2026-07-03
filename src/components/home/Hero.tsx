import { KenBurnsImage } from "@/components/motion/KenBurnsImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { heroMedia } from "@/data/media";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-notte">
      <KenBurnsImage
        src={heroMedia.poster}
        alt={heroMedia.alt}
        priority
        className="absolute inset-0"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte via-notte/70 to-notte/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-notte/80 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-32 sm:px-8">
        <p className="font-cond text-sm font-medium uppercase tracking-[0.35em] text-azzurro-chiaro">
          dal {site.foundingYear} · {site.name}
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
          La musica che scende in campo per gli altri
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/75">
          Sport, spettacolo e solidarietà: i cantanti italiani uniti per
          trasformare una partita in un gesto concreto di aiuto.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <MagneticButton href="/dona-ora" variant="oro">
            Dona ora
          </MagneticButton>
          <MagneticButton href="/la-storia" variant="ghost">
            Scopri la storia
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
