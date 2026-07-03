import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("framer-motion", async (orig) => {
  const actual = await orig<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true, useInView: () => true };
});

import { AnimatedCounter } from "./AnimatedCounter";

describe("AnimatedCounter", () => {
  it("con reduced-motion mostra subito il valore finale", () => {
    render(<AnimatedCounter to={647} />);
    expect(screen.getByText(/647/)).toBeInTheDocument();
  });
});
