import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/content/ContactForm";
import { site } from "@/data/site";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta la Nazionale Italiana Cantanti: indirizzo, email e modulo per scriverci.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        kicker="Contatti"
        title="Scrivici"
        subtitle="Per informazioni, collaborazioni o semplicemente per dirci la tua."
        crumbs={[{ label: "Contatti" }]}
        poster={pageHeroes.contatti.poster}
        posterAlt={pageHeroes.contatti.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-notte">
                Dove siamo
              </h2>
              <address className="mt-4 not-italic text-notte/70">
                {site.name}
                <br />
                {site.address.line1}
                <br />
                {site.address.line2}
              </address>
              <p className="mt-6 text-sm font-medium text-notte">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="text-azzurro underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <div className="mt-8 flex gap-4">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-notte/70 underline-offset-4 hover:text-notte hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-notte/70 underline-offset-4 hover:text-notte hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-notte/10 bg-white p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
