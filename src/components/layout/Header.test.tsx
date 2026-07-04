import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("espone il pulsante per aprire il menu a tendina", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /apri il menu/i }),
    ).toBeInTheDocument();
  });

  it("espone la CTA Dona ora verso /dona-ora", () => {
    render(<Header />);
    const dona = screen.getAllByRole("link", { name: /dona ora/i })[0];
    expect(dona).toHaveAttribute("href", "/dona-ora");
  });
});
