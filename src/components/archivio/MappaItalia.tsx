"use client";

import type { CittaGiocata } from "@/lib/archivio-view";

// Sagoma STILIZZATA dell'Italia (poligono semplificato, non cartografia esatta)
// proiettata da coordinate reali. I punti città usano le stesse coordinate,
// quindi le posizioni relative sono corrette.
const project = (lon: number, lat: number): [number, number] => [
  (lon - 6.5) * 37.15,
  (47.2 - lat) * 50,
];

const MAINLAND: [number, number][] = [
  [7.5, 43.79], [8.2, 44.0], [8.9, 44.4], [9.5, 44.3], [9.85, 44.05],
  [10.25, 43.85], [10.3, 43.5], [10.5, 42.95], [11.1, 42.4], [11.75, 42.1],
  [12.25, 41.7], [13.05, 41.23], [13.6, 41.25], [14.05, 40.8], [14.28, 40.84],
  [14.45, 40.63], [14.95, 40.23], [15.3, 40.03], [15.65, 39.99], [15.8, 39.3],
  [16.05, 38.7], [15.85, 38.3], [15.65, 38.05], [16.05, 37.92], [16.55, 38.45],
  [17.13, 39.08], [16.5, 39.75], [16.8, 40.35], [17.25, 40.47], [18.0, 40.05],
  [18.36, 39.79], [18.49, 40.15], [17.95, 40.65], [16.87, 41.12], [16.28, 41.32],
  [16.18, 41.88], [15.55, 41.92], [15.0, 42.0], [14.21, 42.47], [13.9, 42.95],
  [13.52, 43.62], [12.57, 44.06], [12.28, 44.48], [12.28, 45.22], [12.34, 45.43],
  [13.4, 45.68], [13.77, 45.65], [13.72, 46.05], [13.57, 46.5], [12.7, 46.65],
  [12.22, 46.73], [11.5, 46.99], [10.5, 46.84], [10.15, 46.62], [9.95, 46.38],
  [9.4, 46.3], [9.0, 46.05], [8.6, 46.1], [8.2, 46.25], [7.85, 45.92],
  [7.0, 45.9], [6.8, 45.6], [6.63, 45.1], [6.75, 44.85], [6.95, 44.42],
  [7.4, 44.12],
];

const SICILIA: [number, number][] = [
  [15.65, 38.27], [15.1, 38.13], [14.5, 38.04], [13.7, 38.11], [13.37, 38.22],
  [13.05, 38.15], [12.72, 38.02], [12.44, 37.8], [12.6, 37.56], [13.55, 37.29],
  [14.1, 37.1], [14.35, 37.0], [15.1, 36.68], [15.15, 36.92], [15.3, 37.07],
  [15.1, 37.5], [15.57, 38.05],
];

const SARDEGNA: [number, number][] = [
  [9.22, 41.25], [9.55, 41.12], [9.55, 40.93], [9.8, 40.5], [9.6, 39.2],
  [9.35, 39.13], [9.1, 39.21], [8.85, 38.88], [8.6, 38.95], [8.4, 39.75],
  [8.3, 40.55], [8.2, 41.1],
];

function toPath(points: [number, number][]): string {
  return (
    points
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

export function MappaItalia({
  places,
  selected,
  onSelect,
}: {
  places: CittaGiocata[];
  selected: string | null;
  onSelect: (city: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 460 570"
      role="img"
      aria-label="Mappa stilizzata dell'Italia con le città in cui la Nazionale Cantanti ha giocato"
      className="h-auto w-full max-w-[380px]"
    >
      {[MAINLAND, SICILIA, SARDEGNA].map((shape, i) => (
        <path
          key={i}
          d={toPath(shape)}
          fill="rgba(79,169,224,0.08)"
          stroke="rgba(79,169,224,0.45)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ))}

      {places.map((p) => {
        const [cx, cy] = project(p.lon, p.lat);
        const r = 3.5 + Math.min(p.count, 8) * 0.9;
        const active = selected === p.city;
        return (
          <g key={p.city}>
            <circle
              cx={cx}
              cy={cy}
              r={r + 4}
              fill={active ? "rgba(232,178,58,0.25)" : "rgba(232,178,58,0.12)"}
            />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={active ? "#f0c05a" : "#E8B23A"}
              stroke="#0B1D2E"
              strokeWidth="1"
              tabIndex={0}
              role="button"
              aria-label={`${p.city}: ${p.count} ${p.count === 1 ? "evento" : "eventi"}`}
              onClick={() => onSelect(p.city)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(p.city);
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-125 focus-visible:outline-none"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <title>{`${p.city} — ${p.count} ${p.count === 1 ? "evento" : "eventi"}`}</title>
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
