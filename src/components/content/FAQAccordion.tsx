"use client";

import { useState } from "react";

export type FAQ = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-notte/10 rounded-2xl border border-notte/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-carta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro"
              >
                <span className="font-serif text-lg font-semibold text-notte">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={
                    "shrink-0 text-2xl text-azzurro transition-transform duration-200 " +
                    (isOpen ? "rotate-45" : "")
                  }
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div className="px-6 pb-6 text-notte/70">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
