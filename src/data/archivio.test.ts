import { describe, it, expect } from "vitest";
import {
  partitaDelCuoreArchive,
  recentSolidarityEvents,
  archiveNote,
} from "@/data/archivio";

describe("archivio partite (dati forniti dal cliente)", () => {
  it("contiene le 35 edizioni della Partita del Cuore, dal 1992 al 2026, senza buchi", () => {
    expect(partitaDelCuoreArchive).toHaveLength(35);
    partitaDelCuoreArchive.forEach((e, i) => {
      expect(e.year).toBe(1992 + i);
    });
  });

  it("la 35ª edizione (2026) è marcata come in programma, non come giocata", () => {
    const last = partitaDelCuoreArchive[partitaDelCuoreArchive.length - 1];
    expect(last.year).toBe(2026);
    expect(last.result).toMatch(/in programma/i);
  });

  it("contiene gli eventi solidali recenti", () => {
    expect(recentSolidarityEvents.length).toBeGreaterThan(10);
  });

  it("la nota obbligatoria chiarisce che NON è l'elenco assoluto degli incontri", () => {
    expect(archiveNote).toMatch(/oltre 640 partite/);
    expect(archiveNote).toMatch(/non rappresenta l'elenco assoluto/);
  });
});
