import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("framer-motion", async (orig) => {
  const actual = await orig<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true, useInView: () => true };
});

import { StatsBand } from "./StatsBand";
import { historyStats } from "@/data/history";

describe("StatsBand", () => {
  it("mostra il numero reale di incontri (dato 2023)", () => {
    render(<StatsBand />);
    expect(
      screen.getByText(new RegExp(String(historyStats.lastVerified.incontri))),
    ).toBeInTheDocument();
  });

  it("dichiara l'anno-fonte 2023 (niente dato spacciato per oggi)", () => {
    render(<StatsBand />);
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });
});
