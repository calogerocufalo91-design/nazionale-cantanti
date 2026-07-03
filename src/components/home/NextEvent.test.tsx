import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NextEvent } from "./NextEvent";

describe("NextEvent", () => {
  it("mostra i dati reali del prossimo evento", () => {
    render(<NextEvent />);
    expect(screen.getByText(/Partita del Cuore 2026/)).toBeInTheDocument();
    expect(screen.getAllByText(/L'Aquila/).length).toBeGreaterThan(0);
  });
});
