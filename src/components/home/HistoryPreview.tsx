import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Timeline } from "@/components/content/Timeline";
import { PhotoSlideshow } from "@/components/content/PhotoSlideshow";
import { partitaDelCuoreEditions } from "@/data/history";
import { galleryImages } from "@/data/gallery";

// Capitolo "storia" della home: banda cinematografica scura con le foto REALI
// dell'archivio che ruotano sullo sfondo (atmosfera, non prova di un fatto) e
// la timeline delle edizioni in primo piano.
export function HistoryPreview() {
  return (
    <section className="relative overflow-hidden bg-notte py-24 text-white sm:py-28">
      <div className="absolute inset-0 opacity-25">
        <PhotoSlideshow
          slides={galleryImages.map((g) => ({ src: g.src, alt: g.alt }))}
          intervalMs={5200}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-notte via-notte/75 to-notte"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              light
              kicker="La storia"
              title="Dalla prima Partita del Cuore a oggi"
            />
            <div className="flex flex-wrap gap-5">
              <Link
                href="/la-storia"
                className="text-sm font-medium text-azzurro-chiaro underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Tutta la storia →
              </Link>
              <Link
                href="/archivio-partite"
                className="text-sm font-medium text-azzurro-chiaro underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Archivio completo →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative mx-auto mt-12 w-full max-w-6xl px-6 sm:px-8">
        <Timeline editions={partitaDelCuoreEditions} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-notte to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-notte to-transparent"
        />
      </div>
    </section>
  );
}
