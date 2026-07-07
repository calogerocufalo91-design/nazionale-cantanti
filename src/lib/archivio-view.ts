// Logica di presentazione dell'Archivio Partite: badge esito, categorie e
// aggregazione città. NON inventa dati: classifica le stringhe reali già
// presenti in src/data/archivio.ts.

import {
  partitaDelCuoreArchive,
  recentSolidarityEvents,
  type ArchiveEdition,
  type ArchiveEvent,
} from "@/data/archivio";

export type Esito = {
  label: string;
  tone: "vittoria" | "pareggio" | "rigori" | "programma" | "neutro";
};

// Deriva il badge esito dalla stringa risultato reale.
export function parseEsito(result: string): Esito {
  const r = result.toLowerCase();

  if (r.includes("in programma")) {
    return { label: "In programma", tone: "programma" };
  }

  const rigori = r.includes("rigori");
  const vittoriaNic = r.includes("per nazionale cantanti");

  if (vittoriaNic) {
    return rigori
      ? { label: "Vittoria ai rigori", tone: "vittoria" }
      : { label: "Vittoria", tone: "vittoria" };
  }

  if (rigori) {
    return { label: "Ai rigori", tone: "rigori" };
  }

  // Formati speciali (triangolari, quattro squadre, eventi senza punteggio NIC).
  if (r.includes(";") || r.startsWith("vince ")) {
    return { label: "Formula speciale", tone: "neutro" };
  }

  const score = result.match(/(\d+)\s*-\s*(\d+)/);
  if (score) {
    const [, a, b] = score;
    if (a === b) return { label: `Pareggio ${a}-${b}`, tone: "pareggio" };
    return { label: `${a}-${b}`, tone: "neutro" };
  }

  return { label: result.length > 24 ? "Evento" : result, tone: "neutro" };
}

export type Categoria = {
  label: string;
  tone: "pdc" | "triangolare" | "raccolta" | "solidale";
};

export function categoriaEvento(event: ArchiveEvent): Categoria {
  const testo = `${event.title} ${event.teams}`.toLowerCase();
  if (testo.includes("triangolare")) {
    return { label: "Triangolare benefico", tone: "triangolare" };
  }
  if (/incass|raccolt|€|offerta libera/i.test(`${event.result} ${event.purpose}`)) {
    return { label: "Raccolta fondi", tone: "raccolta" };
  }
  return { label: "Partita solidale", tone: "solidale" };
}

// Voce unificata per la timeline (edizioni PdC + eventi recenti).
export type ArchivioItem = {
  id: string;
  year: number;
  dateLabel: string;
  title: string;
  subtitle: string;
  city: string;
  stadium: string;
  result: string;
  description: string;
  esito: Esito;
  categoria: Categoria;
};

function yearOf(dateLabel: string): number {
  const m = dateLabel.match(/(19|20)\d{2}/);
  return m ? Number(m[0]) : 0;
}

export function toItemFromEdition(e: ArchiveEdition): ArchivioItem {
  const special = /triangolare|formula/i.test(e.opponent);
  return {
    id: `pdc-${e.year}`,
    year: e.year,
    dateLabel: e.date,
    title: `Partita del Cuore — ${e.edition}`,
    subtitle: special ? e.opponent : `vs ${e.opponent}`,
    city: e.city,
    stadium: e.stadium,
    result: e.result,
    description: e.description,
    esito: parseEsito(e.result),
    categoria: { label: "Partita del Cuore", tone: "pdc" },
  };
}

export function toItemFromEvent(e: ArchiveEvent): ArchivioItem {
  return {
    id: `ev-${e.date}-${e.title}`,
    year: yearOf(e.date),
    dateLabel: e.date,
    title: e.title,
    subtitle: e.teams,
    city: e.city,
    stadium: e.venue,
    result: e.result,
    description: e.purpose,
    esito: parseEsito(e.result),
    categoria: categoriaEvento(e),
  };
}

export const archivioItems: ArchivioItem[] = [
  ...partitaDelCuoreArchive.map(toItemFromEdition),
  ...recentSolidarityEvents.map(toItemFromEvent),
].sort((a, b) => a.year - b.year);

export type Decennio = { id: string; label: string; from: number; to: number };

export const DECENNI: Decennio[] = [
  { id: "90", label: "Anni '90", from: 1992, to: 1999 },
  { id: "2000", label: "2000–2009", from: 2000, to: 2009 },
  { id: "2010", label: "2010–2019", from: 2010, to: 2019 },
  { id: "2020", label: "2020–oggi", from: 2020, to: 2100 },
];

// Ricerca senza accenti/maiuscole su anno, città, stadio, avversario, titolo.
export function normalizza(testo: string): string {
  return testo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function matchItem(item: ArchivioItem, query: string): boolean {
  const q = normalizza(query.trim());
  if (!q) return true;
  const haystack = normalizza(
    `${item.year} ${item.city} ${item.stadium} ${item.subtitle} ${item.title} ${item.description}`,
  );
  return q.split(/\s+/).every((parte) => haystack.includes(parte));
}

// Coordinate reali (approssimate) delle città in cui la Nazionale ha giocato,
// usate per la mappa. Le città non mappate semplicemente non mostrano il punto.
export const CITTA_COORDS: Record<string, { lat: number; lon: number }> = {
  Roma: { lat: 41.9, lon: 12.49 },
  Palermo: { lat: 38.12, lon: 13.36 },
  Napoli: { lat: 40.85, lon: 14.27 },
  Milano: { lat: 45.46, lon: 9.19 },
  Verona: { lat: 45.44, lon: 10.99 },
  Bologna: { lat: 44.49, lon: 11.34 },
  Cagliari: { lat: 39.22, lon: 9.12 },
  Firenze: { lat: 43.77, lon: 11.26 },
  Genova: { lat: 44.41, lon: 8.93 },
  "Reggio Calabria": { lat: 38.11, lon: 15.65 },
  "Reggio Emilia": { lat: 44.7, lon: 10.63 },
  Torino: { lat: 45.07, lon: 7.69 },
  Modena: { lat: 44.65, lon: 10.93 },
  Parma: { lat: 44.8, lon: 10.33 },
  Rimini: { lat: 44.06, lon: 12.57 },
  Monza: { lat: 45.58, lon: 9.27 },
  "L'Aquila": { lat: 42.35, lon: 13.4 },
  Empoli: { lat: 43.72, lon: 10.95 },
  Pontremoli: { lat: 44.37, lon: 9.88 },
  Pisa: { lat: 43.72, lon: 10.4 },
  "Gatteo Mare": { lat: 44.17, lon: 12.45 },
  "Castel San Giovanni": { lat: 45.06, lon: 9.43 },
  Chioggia: { lat: 45.22, lon: 12.28 },
  Limbiate: { lat: 45.6, lon: 9.13 },
  Forlì: { lat: 44.22, lon: 12.04 },
  Lagonegro: { lat: 40.12, lon: 15.76 },
  Formigine: { lat: 44.57, lon: 10.85 },
  Viadana: { lat: 44.93, lon: 10.52 },
  "Desenzano del Garda": { lat: 45.47, lon: 10.54 },
};

export type CittaGiocata = {
  city: string;
  count: number;
  lat: number;
  lon: number;
};

export function cittaGiocate(items: ArchivioItem[]): CittaGiocata[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.city, (counts.get(item.city) ?? 0) + 1);
  }
  const out: CittaGiocata[] = [];
  for (const [city, count] of counts) {
    const coords = CITTA_COORDS[city];
    if (coords) out.push({ city, count, ...coords });
  }
  return out.sort((a, b) => b.count - a.count);
}

// Foto realmente presenti nel progetto, legate a un evento in quella città.
// Città non elencate qui semplicemente non mostrano una foto (nessuna invenzione).
export const CITTA_FOTO: Record<string, { src: string; alt: string }> = {
  "L'Aquila": {
    src: "/images/events/partita-del-cuore-2026.jpeg",
    alt: "Locandina Partita del Cuore 2026 — Stadio Gran Sasso, L'Aquila",
  },
  "Desenzano del Garda": {
    src: "/images/news/triangolare-mondiale-desenzano.jpeg",
    alt: "Triangolare mondiale a Desenzano del Garda",
  },
  Viadana: {
    src: "/images/news/grande-cuore-viadana.jpg",
    alt: "Grande Cuore Viadana",
  },
  Lagonegro: {
    src: "/images/news/chitarre-eko-casa-famiglia-lagonegro.jpeg",
    alt: "Consegna chitarre Eko alla Casa Famiglia di Lagonegro",
  },
  Formigine: {
    src: "/images/news/moreno-donadoni-capocannoniere.jpeg",
    alt: "Moreno Donadoni capocannoniere a Formigine",
  },
};

export type DettagliCitta = {
  city: string;
  count: number;
  firstYear: number;
  lastYear: number;
  stadiums: string[];
  ultimoEvento: {
    title: string;
    year: number;
    dateLabel: string;
    result: string;
  } | null;
  foto: { src: string; alt: string } | null;
};

export function slugCitta(city: string): string {
  return normalizza(city).replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Path atteso della foto stadio per una città reale/autorizzata.
// Convenzione: /images/stadi/stadio-<slug>.jpg
export function stadioFotoUrl(city: string): string {
  return `/images/stadi/stadio-${slugCitta(city)}.jpg`;
}

// COPYRIGHT — Non scaricare mai foto da Google, Instagram, giornali, siti
// sportivi, mappe o siti terzi senza licenza. Usare solo: foto proprie,
// foto ufficiali autorizzate, foto con licenza compatibile e credito corretto,
// oppure visual generativi originali (SVG) prodotti da noi.
//
// Per attivare una foto reale autorizzata su una città:
//   1) Salva il file in public/images/stadi/stadio-<slug>.jpg (o .webp)
//   2) Aggiungi qui una voce con status "licensed" e, se serve, credit + license.
//
// Ogni città ha di default un "visual istituzionale" (SVG generativo originale,
// non fotografico), non una foto reale — la card userà quello finché non
// arriva una foto autorizzata.
export type VisualStatus = "generated" | "licensed" | "missing";

// Elenco città per cui esiste un visual generativo dedicato in
// public/images/stadi/visual-<slug>.svg. Le città non elencate qui ricevono
// automaticamente placeholder-stadio.svg come visual istituzionale generico.
const VISUAL_DEDICATI = new Set<string>([
  "Roma",
  "Torino",
  "Verona",
  "Firenze",
  "Palermo",
  "Napoli",
  "Milano",
  "Genova",
  "Bologna",
  "Cagliari",
  "L'Aquila",
  "Pontremoli",
]);

export const STADIO_IMMAGINI: Record<
  string,
  { status: "licensed"; credit?: string; license?: string }
> = {
  // esempio (tenere commentato finché il file non è caricato):
  // "Roma": { status: "licensed", credit: "© Foto Autore", license: "Uso concesso NIC 2026" },
};

export function visualStadioUrl(city: string): string {
  if (VISUAL_DEDICATI.has(city)) {
    return `/images/stadi/visual-${slugCitta(city)}.svg`;
  }
  return "/images/stadi/placeholder-stadio.svg";
}

export type StadioEvento = {
  year: number;
  title: string;
  dateLabel: string;
  result: string;
};

export type StadioInfo = {
  city: string;
  slug: string;
  stadiumName: string;
  matchesCount: number;
  latestYear: number | null;
  events: StadioEvento[];
  // Foto reale autorizzata (solo se visualStatus === "licensed").
  imageUrl: string | null;
  // Visual istituzionale/generativo di fallback: sempre valorizzato.
  visualUrl: string;
  imageAlt: string;
  visualStatus: VisualStatus;
  // Etichetta del badge sulla card ("Foto ufficiale", "Visual istituzionale", …).
  visualLabel: string;
  imageCredit: string;
  imageLicense: string;
};

export function stadioInfo(city: string): StadioInfo {
  const d = dettagliCitta(city);
  const slug = slugCitta(city);
  const stadiumName =
    d.stadiums.find((s) => s.trim().length > 0) ?? `Stadio di ${city}`;
  const events: StadioEvento[] = archivioItems
    .filter((i) => i.city === city)
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 3)
    .map((i) => ({
      year: i.year,
      title: i.title,
      dateLabel: i.dateLabel,
      result: i.result,
    }));
  const override = STADIO_IMMAGINI[city];
  const visualStatus: VisualStatus = override ? "licensed" : "generated";
  const imageUrl = visualStatus === "licensed" ? stadioFotoUrl(city) : null;
  const visualUrl = visualStadioUrl(city);
  const visualLabel =
    visualStatus === "licensed"
      ? "Foto ufficiale"
      : "Visual istituzionale";
  const imageAlt =
    visualStatus === "licensed"
      ? `${stadiumName} — ${city}`
      : `Visual istituzionale ispirato a ${city}`;
  return {
    city,
    slug,
    stadiumName,
    matchesCount: d.count,
    latestYear: d.lastYear || null,
    events,
    imageUrl,
    visualUrl,
    imageAlt,
    visualStatus,
    visualLabel,
    imageCredit: override?.credit ?? "",
    imageLicense: override?.license ?? "",
  };
}

export function dettagliCitta(city: string): DettagliCitta {
  const items = archivioItems
    .filter((i) => i.city === city)
    .sort((a, b) => a.year - b.year);
  const years = items.map((i) => i.year).filter((y) => y > 0);
  const stadiums = Array.from(new Set(items.map((i) => i.stadium)));
  const ultimo = items[items.length - 1] ?? null;
  return {
    city,
    count: items.length,
    firstYear: years.length ? Math.min(...years) : 0,
    lastYear: years.length ? Math.max(...years) : 0,
    stadiums,
    ultimoEvento: ultimo
      ? {
          title: ultimo.title,
          year: ultimo.year,
          dateLabel: ultimo.dateLabel,
          result: ultimo.result,
        }
      : null,
    foto: CITTA_FOTO[city] ?? null,
  };
}
