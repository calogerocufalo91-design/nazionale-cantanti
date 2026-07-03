import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/data/news";

// Gli articoli senza immagine reale mostrano un pannello neutro col titolo,
// mai un'immagine inventata.
export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative h-44 bg-notte">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <span className="font-serif text-lg text-white/80">
              Nazionale Cantanti
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-cond text-xs uppercase tracking-wide text-azzurro">
          {article.dateLabel}
        </p>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-notte">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-notte/70">
          {article.excerpt}
        </p>
        <span className="mt-4 text-sm font-medium text-azzurro">
          Leggi di più →
        </span>
      </div>
    </Link>
  );
}
