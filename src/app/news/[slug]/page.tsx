import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { newsArticles } from "@/data/news";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return { title: "News" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-notte pb-14 pt-36 text-white sm:pt-44">
        <div className="hero-glow opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-notte via-notte/85 to-notte/60"
        />
        <Container className="relative">
          <Breadcrumbs
            items={[{ label: "News", href: "/news" }, { label: article.title }]}
          />
          <p className="mt-8 font-cond text-sm uppercase tracking-wide text-azzurro-chiaro">
            {article.dateLabel}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
            {article.title}
          </h1>
        </Container>
      </section>

      <article className="bg-carta py-16 sm:py-20">
        <Container className="max-w-3xl">
          {article.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
          <p className="text-lg leading-relaxed text-notte/80">
            {article.excerpt}
          </p>
          <p className="mt-8 rounded-xl border border-notte/10 bg-white p-5 text-sm text-notte/60">
            Il testo integrale di questo articolo sarà pubblicato al termine
            della verifica dei contenuti con l&apos;associazione.
          </p>
          <div className="mt-10">
            <Link
              href="/news"
              className="text-sm font-medium text-azzurro underline-offset-4 hover:underline"
            >
              ← Torna alle news
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
}
