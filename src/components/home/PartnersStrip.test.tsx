import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PartnerCarousel } from "@/components/content/PartnerCarousel";
import { partners } from "@/data/partners";

describe("PartnerCarousel", () => {
  it("mostra i nomi dei partner reali", () => {
    render(<PartnerCarousel partners={partners} />);
    expect(screen.getByText("Givova")).toBeInTheDocument();
  });

  it("non usa loghi inventati (nessuna immagine finché il cliente non li fornisce)", () => {
    const { container } = render(<PartnerCarousel partners={partners} />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });
});
