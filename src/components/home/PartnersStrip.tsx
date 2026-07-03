import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerCarousel } from "@/components/content/PartnerCarousel";
import { partners } from "@/data/partners";

export function PartnersStrip() {
  return (
    <section className="bg-carta py-24 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              kicker="Partner"
              title="Chi cammina insieme a noi"
            />
            <Link
              href="/partner"
              className="text-sm font-medium text-azzurro underline-offset-4 transition-colors hover:text-notte hover:underline"
            >
              Diventa partner →
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
