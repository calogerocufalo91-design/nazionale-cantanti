import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { site } from "@/data/site";

const FB_PAGE = "https://www.facebook.com/NazCantanti";

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z" />
    </svg>
  );
}

type SocialCard = {
  href: string;
  platform: string;
  handle: string;
  image: string;
  alt: string;
  icon: React.ReactNode;
};

const cards: SocialCard[] = [
  {
    href: FB_PAGE,
    platform: "Facebook",
    handle: "Nazionale Italiana Cantanti",
    image: "/images/events/partita-del-cuore-2026.jpeg",
    alt: "Dal campo della Nazionale Italiana Cantanti",
    icon: <FacebookIcon />,
  },
  {
    href: site.social.instagram,
    platform: "Instagram",
    handle: "@nazionale_cantanti",
    image: "/images/news/moreno-donadoni-capocannoniere.jpeg",
    alt: "Un momento dal campo della Nazionale Cantanti",
    icon: <InstagramIcon />,
  },
];

export function SocialFeed() {
  return (
    <section className="bg-notte py-24 text-white sm:py-28">
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-cond text-sm font-medium uppercase tracking-[0.3em] text-azzurro-chiaro">
            Social
          </p>
          <h2 className="mt-3 font-serif text-heading font-semibold">
            Il racconto continua ogni giorno
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lead text-white/70">
            Gol, backstage e momenti dal campo: seguici e non perderti nulla.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {cards.map((c, i) => (
            <ScrollReveal key={c.platform} delay={i * 0.08}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-white/25 sm:aspect-[5/6]"
              >
                {/* Foto reale come sfondo — atmosfera, non un finto feed */}
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 460px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-notte via-notte/45 to-notte/10"
                />

                {/* Intestazione piattaforma */}
                <div className="relative flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white">
                    {c.icon}
                  </span>
                  <span className="font-cond text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                    {c.platform}
                  </span>
                </div>

                {/* Piede: handle + invito a seguire */}
                <div className="relative">
                  <p className="font-serif text-2xl font-semibold leading-tight text-white">
                    {c.handle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-oro transition-colors duration-300 group-hover:text-[#f4cd6b]">
                    Segui
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
