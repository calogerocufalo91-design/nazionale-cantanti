import Image from "next/image";
import type { PartitaDelCuoreEdition } from "@/data/history";

// Le edizioni senza foto reale NON mostrano un'immagine: presentano un pannello
// tipografico con l'anno. Mai una foto generica accostata a una data precisa.
export function Timeline({
  editions,
}: {
  editions: PartitaDelCuoreEdition[];
}) {
  return (
    <ol className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:thin]">
      {editions.map((ed) => (
        <li
          key={ed.edition}
          className="flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white sm:w-[320px]"
        >
          <div className="relative h-40 bg-notte">
            {ed.image ? (
              <Image
                src={ed.image}
                alt={`Partita del Cuore ${ed.year}, ${ed.city}`}
                fill
                sizes="320px"
                className="object-cover opacity-90"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <span className="font-cond text-5xl font-semibold text-oro">
                  {ed.year}
                </span>
                <span className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  {ed.edition}ª edizione
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="font-cond text-sm uppercase tracking-wide text-azzurro">
              {ed.city} · {ed.stadium}
            </p>
            <p className="mt-1 text-sm font-medium text-notte">
              vs {ed.opponent}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-notte/70">
              {ed.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
