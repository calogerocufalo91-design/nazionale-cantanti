import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

function Card({ img }: { img: GalleryImage }) {
  return (
    <figure className="relative h-52 w-72 shrink-0 overflow-hidden rounded-xl bg-[#0a1727] sm:h-64 sm:w-96">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="384px"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte/90 via-transparent to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm leading-snug text-white/90">
        {img.alt}
      </figcaption>
    </figure>
  );
}

function Row({
  images,
  dir,
}: {
  images: GalleryImage[];
  dir: "l" | "r";
}) {
  const cls = dir === "l" ? "marquee-l" : "marquee-r";
  return (
    <div className="marquee-row">
      <div className={`marquee-track ${cls}`}>
        {images.map((img) => (
          <Card key={img.src} img={img} />
        ))}
      </div>
      <div className={`marquee-track ${cls}`} aria-hidden>
        {images.map((img) => (
          <Card key={`dup-${img.src}`} img={img} />
        ))}
      </div>
    </div>
  );
}

// Due file di foto storiche REALI che scorrono in direzioni opposte (si fermano
// al passaggio del mouse). Contenuto autentico dell'archivio, effetto cinematografico.
export function LegendsMarquee({ images }: { images: GalleryImage[] }) {
  const rowA = images.filter((_, i) => i % 2 === 0);
  const rowB = images.filter((_, i) => i % 2 === 1);
  return (
    <div className="flex flex-col gap-5">
      <Row images={rowA} dir="l" />
      <Row images={rowB} dir="r" />
    </div>
  );
}
