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
