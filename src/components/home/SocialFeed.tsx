import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

const FB_PAGE = "https://www.facebook.com/NazCantanti";
const FB_EMBED = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_PAGE,
)}&tabs=timeline&width=500&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

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

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Facebook: feed reale della pagina ufficiale */}
          <ScrollReveal className="overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center gap-3 border-b border-notte/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </span>
              <span className="font-serif text-lg font-semibold text-notte">
                La pagina Facebook
              </span>
            </div>
            <iframe
              title="Feed Facebook della Nazionale Italiana Cantanti"
              src={FB_EMBED}
              className="h-[560px] w-full"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              loading="lazy"
              allow="encrypted-media; clipboard-write; web-share"
            />
          </ScrollReveal>

          {/* Instagram: card premium verso il profilo reale */}
          <ScrollReveal className="flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] p-8 sm:p-10">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z" />
                </svg>
              </span>
              <p className="mt-6 font-serif text-3xl font-semibold text-white sm:text-4xl">
                @nazionale_cantanti
              </p>
              <p className="mt-4 max-w-sm text-white/85">
                Foto, reel e storie dal cuore della squadra. Seguici per non
                perdere nulla della prossima Partita del Cuore.
              </p>
            </div>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-[#C13584] transition-transform duration-200 hover:scale-[1.03]"
            >
              Segui su Instagram
            </a>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
