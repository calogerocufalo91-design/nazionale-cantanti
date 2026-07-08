import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/data/news";

// Gli articoli senza immagine reale mostrano un pannello neutro col titolo,
// mai un'immagine inventata.
export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white shadow-[0_2px_6px_-3px_rgba(11,29,46,0.12)] transition-[transform,box-shadow,border-color] duration-[220ms] ease-out hover:-translate-y-1 hover:border-notte/15 hover:shadow-[0_20px_45px_-25px_rgba(11,29,46,0.35)]"
    >
      <div className="relative h-44 overflow-hidden bg-notte">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
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
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-notte transition-colors group-hover:text-azzurro">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-notte/70">
          {article.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-azzurro">
          Leggi di più
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
