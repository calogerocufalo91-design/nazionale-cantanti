import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

const FB_PAGE = "https://www.facebook.com/NazCantanti";

export function SocialFeed() {
  return (
    <section className="bg-notte py-24 text-white sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionTitle
            light
            kicker="Seguici su Facebook e Instagram"
            title="Direttamente dai social"
          />
          <p className="mt-6 max-w-2xl text-white/70">
            Gol, backstage, ospiti e momenti dal campo: segui la Nazionale
            Cantanti dove il racconto non si ferma mai.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Facebook */}
          <ScrollReveal>
            <a
              href={FB_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src="/images/events/partita-del-cuore-2026.jpeg"
                  alt="Ultimo dalla pagina Facebook della Nazionale Cantanti"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-notte via-notte/20 to-transparent"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-sm font-medium text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                  </svg>
                  Facebook
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-serif text-2xl font-semibold text-white">
                  Nazionale Italiana Cantanti
                </p>
                <p className="mt-2 text-white/60">
                  La pagina ufficiale: eventi, dirette e aggiornamenti.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-azzurro-chiaro transition-transform duration-300 group-hover:translate-x-1">
                  Segui su Facebook
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          </ScrollReveal>

          {/* Instagram */}
          <ScrollReveal>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src="/images/news/moreno-donadoni-capocannoniere.jpeg"
                  alt="Momenti dal campo della Nazionale Cantanti su Instagram"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/70 via-[#E1306C]/60 to-[#F77737]/60 mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-notte via-transparent to-transparent"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z" />
                  </svg>
                  Instagram
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-white/[0.04] p-7">
                <p className="font-serif text-2xl font-semibold text-white">
                  @nazionale_cantanti
                </p>
                <p className="mt-2 text-white/60">
                  Foto, reel e storie dal cuore della squadra.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-[#F49CC0] transition-transform duration-300 group-hover:translate-x-1">
                  Segui su Instagram
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
