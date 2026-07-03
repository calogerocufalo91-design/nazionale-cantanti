import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { GalleryLightbox } from "@/components/content/GalleryLightbox";
import { galleryImages } from "@/data/gallery";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "L'archivio storico della Nazionale Italiana Cantanti: campioni, artisti e leggende in un unico racconto per immagini.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Gallery"
        title="Immagini di una leggenda"
        subtitle="Scatti dall'archivio storico dell'associazione. Clicca su una foto per ingrandirla."
        crumbs={[{ label: "Gallery" }]}
        poster={pageHeroes.gallery.poster}
        posterAlt={pageHeroes.gallery.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <GalleryLightbox images={galleryImages} />
        </Container>
      </section>
    </>
  );
}
