import { describe, it, expect } from "vitest";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { site } from "@/data/site";
import { donationChannels, fiveXMille } from "@/data/donation";

describe("integrità dei dati reali (niente dati inventati)", () => {
  it("il prossimo evento conserva i campi reali verificati", () => {
    expect(nextEvent.city).toBe("L'Aquila");
    expect(nextEvent.date).toMatch(/13 luglio 2026/);
  });

  it("le statistiche storiche conservano l'anno-fonte (no dato spacciato per l'anno corrente)", () => {
    expect(historyStats.lastVerified.sourceYear).toBe(2023);
  });

  it("nessun numero di telefono inventato", () => {
    expect(site.phone).toBeNull();
  });

  it("nessun link di donazione inventato (canale diretto assente => null)", () => {
    expect(donationChannels.primaryCtaUrl).toBeNull();
  });

  it("il codice fiscale 5x1000 resta attribuito all'ente partner corretto", () => {
    expect(fiveXMille.beneficiaryName).toMatch(/Umanità senza Confini/);
    expect(fiveXMille.beneficiaryCF).toBe("97399940150");
  });
});
