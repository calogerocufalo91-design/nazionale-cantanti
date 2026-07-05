import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("framer-motion", async (orig) => {
  const actual = await orig<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true, useInView: () => true };
});

import { StatsBand } from "./StatsBand";
import { site } from "@/data/site";

describe("StatsBand", () => {
  it("mostra il dato corrente fornito dal cliente (640+ partite benefiche)", () => {
    render(<StatsBand />);
    expect(screen.getByText(/640/)).toBeInTheDocument();
    expect(screen.getByText(/partite benefiche/i)).toBeInTheDocument();
  });

  it("gli anni di attività sono calcolati dalla fondazione (nessun dato stantio)", () => {
    render(<StatsBand />);
    const anni = new Date().getFullYear() - site.foundingYear;
    expect(screen.getByText(new RegExp(String(anni)))).toBeInTheDocument();
    expect(screen.queryByText(/aggiornati al 2023/)).not.toBeInTheDocument();
  });
});
