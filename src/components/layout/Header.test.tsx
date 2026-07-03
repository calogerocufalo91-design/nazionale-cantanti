import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";
import { nav } from "@/data/site";

describe("Header", () => {
  it("mostra tutte le voci di navigazione", () => {
    render(<Header />);
    nav.forEach((item) => {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0);
    });
  });

  it("espone la CTA Dona ora verso /dona-ora", () => {
    render(<Header />);
    const dona = screen.getAllByRole("link", { name: /dona ora/i })[0];
    expect(dona).toHaveAttribute("href", "/dona-ora");
  });
});
