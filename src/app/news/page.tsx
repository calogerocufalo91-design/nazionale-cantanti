import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/content/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { NewsCard } from "@/components/content/NewsCard";
import { newsArticles } from "@/data/news";
import { pageHeroes } from "@/data/media";

export const metadata: Metadata = {
  title: "News",
  description:
    "Le ultime notizie della Nazionale Italiana Cantanti: partite, iniziative benefiche e progetti sul territorio.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="News"
        title="Le ultime dalla Nazionale"
        subtitle="Partite, donazioni e iniziative: gli aggiornamenti dell'associazione."
        crumbs={[{ label: "News" }]}
        poster={pageHeroes.news.poster}
        posterAlt={pageHeroes.news.alt}
      />

      <section className="bg-carta py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={(i % 3) * 0.08}>
                <NewsCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
