// Indice delle bozze estetiche: 4 direzioni indipendenti dello stesso sito,
// costruite sui medesimi contenuti reali (src/data/*). Pagina di servizio per
// la presentazione al presidente.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bozze estetiche — Nazionale Italiana Cantanti",
  robots: { index: false, follow: false },
};

const bozze = [
  {
    href: "/preview/a",
    letter: "A",
    name: "Editorial / Magazine",
    concept:
      "Rivista sportiva premium: tipografia serif protagonista, carta avorio, filetti da testata, foto d'archivio in bianco e nero.",
    tone: "Autorevole · Culturale · Da leggere",
    swatches: ["#F6F2EA", "#181512", "#B5232B"],
    fontLabel: "Fraunces + Archivo",
    dark: false,
  },
  {
    href: "/preview/b",
    letter: "B",
    name: "Cinematic / Dark",
    concept:
      "Campagna cinematografica: nero profondo, luce dorata, display monumentale, le edizioni storiche raccontate come capitoli di un film.",
    tone: "Emozionale · Drammatico · Da trailer",
    swatches: ["#07080B", "#D5A754", "#EDE8DE"],
    fontLabel: "Bebas Neue + Manrope",
    dark: true,
  },
  {
    href: "/preview/c",
    letter: "C",
    name: "Minimal istituzionale / Luxury",
    concept:
      "Eleganza sobria da istituzione internazionale: tanto spazio bianco, capitale romana, filetti sottili, bronzo misurato.",
    tone: "Istituzionale · Raffinato · Internazionale",
    swatches: ["#FCFBF7", "#17140F", "#8C6D3F"],
    fontLabel: "Marcellus + Jost",
    dark: false,
  },
  {
    href: "/preview/d",
    letter: "D",
    name: "Modern Sport / Dinamico",
    concept:
      "Club sportivo contemporaneo: azzurro Nazionale, tricolore come segno grafico, tagli diagonali, match center e ticker delle città.",
    tone: "Energico · Giovane · Da matchday",
    swatches: ["#0067B1", "#00854A", "#CE2B37"],
    fontLabel: "Kanit + Titillium Web",
    dark: false,
  },
];

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-[#0B1D2E] px-5 py-16 text-[#F5F2EC] sm:py-24">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <Image
            src="/images/logo.png"
            alt="Logo Nazionale Italiana Cantanti"
            width={180}
            height={74}
            className="mx-auto h-14 w-auto"
            priority
          />
          <h1 className="mt-8 font-serif text-3xl sm:text-5xl">
            Quattro direzioni estetiche
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#F5F2EC]/70 sm:text-base">
            Stessi contenuti reali del sito {site.shortName}, quattro linguaggi grafici
            indipendenti. Ogni bozza è una homepage completa: aprile una accanto
            all&rsquo;altra per confrontarle.
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {bozze.map((b) => (
            <Link
              key={b.letter}
              href={b.href}
              className="group cursor-pointer rounded-2xl border border-white/12 bg-white/5 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#E8B23A]/60 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-serif text-5xl text-[#E8B23A]">{b.letter}</span>
                <span className="flex gap-1.5 pt-2" aria-hidden>
                  {b.swatches.map((c) => (
                    <span
                      key={c}
                      className="h-5 w-5 rounded-full border border-white/25"
                      style={{ background: c }}
                    />
                  ))}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{b.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F2EC]/65">{b.concept}</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#E8B23A]/80">
                {b.tone}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#F5F2EC]/40">
                {b.fontLabel}
              </p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F2EC]/50 transition-colors duration-200 group-hover:text-[#E8B23A]">
                Apri la bozza →
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-xs leading-relaxed text-[#F5F2EC]/40">
          Anteprime private, non indicizzate. Tutti i testi, i numeri e le immagini provengono
          dall&rsquo;archivio reale del progetto; dove un materiale manca è indicato come
          &ldquo;[DA COMPLETARE]&rdquo;.
        </p>
      </div>
    </div>
  );
}
