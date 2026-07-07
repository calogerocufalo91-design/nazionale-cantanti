import { describe, it, expect } from "vitest";
import {
  parseEsito,
  matchItem,
  archivioItems,
  cittaGiocate,
  toItemFromEdition,
} from "@/lib/archivio-view";
import { partitaDelCuoreArchive } from "@/data/archivio";

describe("parseEsito (badge derivati dai risultati reali)", () => {
  it("riconosce la vittoria della Nazionale", () => {
    expect(parseEsito("3-2 per Nazionale Cantanti")).toEqual({
      label: "Vittoria",
      tone: "vittoria",
    });
  });

  it("riconosce la vittoria ai rigori", () => {
    expect(parseEsito("4-3 ai rigori per Nazionale Cantanti").label).toBe(
      "Vittoria ai rigori",
    );
  });

  it("riconosce il pareggio", () => {
    expect(parseEsito("6-6")).toEqual({ label: "Pareggio 6-6", tone: "pareggio" });
  });

  it("riconosce i rigori persi come esito neutro ai rigori", () => {
    expect(parseEsito("1-1, poi vittoria Rai ai rigori").tone).toBe("rigori");
  });

  it("riconosce l'edizione in programma", () => {
    expect(parseEsito("In programma").tone).toBe("programma");
  });

  it("le sconfitte NON sono etichettate 'Sconfitta': badge neutro col punteggio", () => {
    const esito = parseEsito("0-1");
    expect(esito.tone).toBe("neutro");
    expect(esito.label).toBe("0-1");
  });

  it("i formati speciali restano neutri", () => {
    expect(parseEsito("Vince Team Salmo").tone).toBe("neutro");
    expect(
      parseEsito("NIC-Telethon 3-1; Parlamentari-Telethon 1-3; Parlamentari-NIC 1-2")
        .tone,
    ).toBe("neutro");
  });
});

describe("archivio unificato", () => {
  it("contiene tutte le 35 edizioni + gli eventi recenti", () => {
    expect(archivioItems.length).toBeGreaterThanOrEqual(49);
  });

  it("la ricerca trova per città senza accenti/maiuscole", () => {
    const laquila = archivioItems.filter((i) => matchItem(i, "l'aquila"));
    expect(laquila.length).toBeGreaterThanOrEqual(3);
    const forli = archivioItems.filter((i) => matchItem(i, "forli"));
    expect(forli.length).toBeGreaterThanOrEqual(1);
  });

  it("la ricerca trova per avversario e per anno", () => {
    expect(archivioItems.some((i) => matchItem(i, "piloti"))).toBe(true);
    expect(archivioItems.filter((i) => matchItem(i, "1992")).length).toBeGreaterThan(0);
  });

  it("ogni città della mappa ha coordinate e conteggio reale", () => {
    const places = cittaGiocate(archivioItems);
    expect(places.length).toBeGreaterThanOrEqual(20);
    const roma = places.find((p) => p.city === "Roma");
    expect(roma?.count).toBeGreaterThanOrEqual(3);
  });

  it("la 35ª edizione resta 'In programma' anche nella vista", () => {
    const item = toItemFromEdition(partitaDelCuoreArchive[34]);
    expect(item.esito.tone).toBe("programma");
  });
});
