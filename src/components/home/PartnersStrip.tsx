import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerCarousel } from "@/components/content/PartnerCarousel";
import { partners } from "@/data/partners";

export function PartnersStrip() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              kicker="Partner"
              title="Chi cammina insieme a noi"
            />
            <Link
              href="/partner"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
            >
              Diventa partner
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover/link:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <PartnerCarousel partners={partners} />
        </div>
      </Container>
    </section>
  );
}
