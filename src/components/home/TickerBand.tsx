const WORDS = ["Musica", "Sport", "Solidarietà", "Dal 1981"];
const ROW = [...WORDS, ...WORDS, ...WORDS];

// Nastro decorativo che scorre in continuo tra hero e manifesto.
// Testo ripetuto e puramente ornamentale: nascosto agli screen reader,
// con una riga sr-only equivalente.
export function TickerBand() {
  return (
    <div className="border-y border-white/10 bg-notte py-4">
      <p className="sr-only">
        Nazionale Italiana Cantanti: musica, sport e solidarietà dal 1981.
      </p>
      <div className="marquee-row" aria-hidden>
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track marquee-l">
            {ROW.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-5 whitespace-nowrap pr-5 font-cond text-sm font-medium uppercase tracking-[0.35em] text-white/60"
              >
                {word}
                <span aria-hidden className="text-oro">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
