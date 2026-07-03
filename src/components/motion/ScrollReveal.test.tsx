import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

describe("ScrollReveal", () => {
  it("mostra i children", () => {
    render(
      <ScrollReveal>
        <p>ciao</p>
      </ScrollReveal>,
    );
    expect(screen.getByText("ciao")).toBeInTheDocument();
  });
});
