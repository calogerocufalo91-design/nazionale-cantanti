"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
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

const VIEW_W = 460;
const VIEW_H = 570;

type MappaCuoreProps = {
  places: CittaGiocata[];
  /** Città attiva (hover o selezionata) controllata dal parent. */
  activeCity?: string | null;
  /** Emesso su hover marker, focus, o click. Passa null quando l'utente esce. */
  onActivate?: (city: string | null) => void;
  /** Emesso su click/enter — utile per navigazione o filtro persistente. */
  onSelect?: (city: string) => void;
  /** Mostra una piccola etichetta con il nome della città sopra il marker attivo. */
  showMarkerLabel?: boolean;
  className?: string;
};

/**
 * Mappa stilizzata dell'Italia con i marker delle città. NON contiene la card
 * dettagli: il parent deve renderizzare un pannello separato (StadioPanel) in
 * una zona dedicata del layout. Questo evita sovrapposizioni con pillole/testi.
 */
export function MappaCuore({
  places,
  activeCity = null,
  onActivate,
  onSelect,
  showMarkerLabel = true,
  className,
}: MappaCuoreProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [labelBox, setLabelBox] = useState<{ w: number; h: number } | null>(
    null,
  );
  const labelTextRef = useRef<SVGTextElement>(null);

  const active = places.find((p) => p.city === activeCity) ?? null;

  // Misura il testo per dimensionare il rettangolo del mini-tooltip.
  useEffect(() => {
    if (!showMarkerLabel || !active || !labelTextRef.current) {
      setLabelBox(null);
      return;
    }
    const bbox = labelTextRef.current.getBBox();
    setLabelBox({ w: bbox.width + 16, h: bbox.height + 8 });
  }, [active, showMarkerLabel]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ""}`}
      onMouseLeave={() => onActivate?.(null)}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Mappa stilizzata dell'Italia con le città in cui la Nazionale Cantanti ha giocato"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id="italia-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feOffset dy="4" result="off" />
            <feFlood floodColor="#0072BB" floodOpacity="0.5" />
            <feComposite in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="italia-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4fa9e0" stopOpacity="0.18" />
            <stop offset="1" stopColor="#4fa9e0" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="italia-halo" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#4fa9e0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#4fa9e0" stopOpacity="0" />
          </radialGradient>
          <filter id="marker-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Alone di luce dietro la penisola */}
        <ellipse
          cx={VIEW_W / 2}
          cy={VIEW_H / 2}
          rx={VIEW_W * 0.55}
          ry={VIEW_H * 0.45}
          fill="url(#italia-halo)"
        />

        <g filter="url(#italia-shadow)">
          {[MAINLAND, SICILIA, SARDEGNA].map((shape, i) => (
            <path
              key={i}
              d={toPath(shape)}
              fill="url(#italia-fill)"
              stroke="rgba(79,169,224,0.7)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Ordine di disegno invertito: `places` è ordinato per numero di
            eventi DECRESCENTE, quindi disegnando dall'ultimo al primo le città
            più importanti (marker più grande) finiscono SOPRA nei cluster fitti
            e vincono il tap. Le poche città minori sovrapposte restano
            raggiungibili dalle pillole sotto la mappa. Il marker attivo è sempre
            l'ultimo disegnato → sopra a tutti. */}
        {places
          .map((p, i) => ({ p, i }))
          .sort((a, b) => {
            if (activeCity === a.p.city) return 1;
            if (activeCity === b.p.city) return -1;
            return b.i - a.i; // count crescente = più importante sopra
          })
          .map(({ p, i }) => {
            const [cx, cy] = project(p.lon, p.lat);
            // Raggio visuale generoso: puntino ben visibile (≈10px) anche con la
            // mappa rimpicciolita su mobile.
            const r = 6.5 + Math.min(p.count, 8) * 1.0;
            return (
              <Marker
                key={p.city}
                city={p.city}
                count={p.count}
                cx={cx}
                cy={cy}
                r={r}
                index={i}
                isActive={activeCity === p.city}
                reduce={!!reduce}
                onActivate={onActivate}
                onSelect={onSelect}
              />
            );
          })}

        {/* Mini etichetta nome città sopra il marker attivo.
            Solo desktop e a discrezione del parent (showMarkerLabel). */}
        {showMarkerLabel && active && (() => {
          const [cx, cy] = project(active.lon, active.lat);
          const w = labelBox?.w ?? 90;
          const h = labelBox?.h ?? 22;
          const flipY = cy < 50;
          const ry = flipY ? cy + 22 : cy - 22 - h;
          // Centro dell'etichetta agganciato al marker ma vincolato dentro il
          // viewBox: così "Torino" o le città di bordo non escono mai dalla card.
          const lx = Math.min(Math.max(cx, w / 2 + 4), VIEW_W - w / 2 - 4);
          return (
            <g pointerEvents="none">
              {/* Linea di collegamento marker → etichetta */}
              <line
                x1={cx}
                y1={cy}
                x2={lx}
                y2={flipY ? ry - 4 : ry + h + 4}
                stroke="#E8B23A"
                strokeOpacity="0.55"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <rect
                x={lx - w / 2}
                y={ry}
                width={w}
                height={h}
                rx="6"
                fill="#0B1D2E"
                fillOpacity="0.92"
                stroke="#E8B23A"
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              <text
                ref={labelTextRef}
                x={lx}
                y={ry + h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#f4cd6b"
                fontSize="11"
                fontWeight="600"
                style={{ letterSpacing: "0.04em" }}
              >
                {active.city.toUpperCase()}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

type MarkerProps = {
  city: string;
  count: number;
  cx: number;
  cy: number;
  r: number;
  index: number;
  isActive: boolean;
  reduce: boolean;
  onActivate?: (city: string | null) => void;
  onSelect?: (city: string) => void;
};

// Marker memoizzato: con activeCity che cambia, solo i due marker interessati
// (quello che si attiva e quello che si disattiva) si ri-renderizzano, non tutti.
// Solo il marker attivo pulsa: gli altri restano aloni statici — niente più 18
// animazioni infinite che ridipingono l'SVG in continuazione.
const Marker = memo(function Marker({
  city,
  count,
  cx,
  cy,
  r,
  index,
  isActive,
  reduce,
  onActivate,
  onSelect,
}: MarkerProps) {
  const evLabel = count === 1 ? "evento" : "eventi";
  // Area tappabile trasparente più ampia del puntino visibile: porta TUTTA
  // l'interazione (tap, focus, tastiera). Bilanciata: abbastanza grande da dare
  // un buon target alle città isolate, non così grande da occludere i vicini nei
  // cluster fitti (Milano/Monza, Emilia) — quelli restano tappabili dalle pillole.
  const hitR = Math.max(r + 10, 20);
  const select = () => {
    onSelect?.(city);
    onActivate?.(city);
  };
  return (
    <motion.g
      // Ingresso su mount (non whileInView): i marker sono SEMPRE visibili su
      // mobile anche se l'IntersectionObserver non scatta. transform-box:
      // fill-box + origin center rende lo scale corretto anche su iOS Safari
      // (prima l'origin in px rompeva la posizione dei puntini).
      initial={reduce ? false : { opacity: 0, scale: 0.5 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{
        delay: reduce ? 0 : Math.min(index * 0.035, 0.9),
        type: "spring",
        stiffness: 240,
        damping: 20,
      }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      className="cursor-pointer"
    >
      {/* Ring esterno morbido — pulsa solo quando attivo (solo visuale) */}
      <circle
        cx={cx}
        cy={cy}
        r={r + (isActive ? 10 : 6)}
        fill={isActive ? "rgba(232,178,58,0.35)" : "rgba(232,178,58,0.15)"}
        className={isActive ? "pin-pulse-strong" : undefined}
        pointerEvents="none"
      />
      {/* Marker interno (solo visuale) */}
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? r + 1.5 : r}
        fill={isActive ? "#f4cd6b" : "#E8B23A"}
        stroke="#0B1D2E"
        strokeWidth="1.4"
        filter={isActive ? "url(#marker-glow)" : undefined}
        pointerEvents="none"
        className="transition-transform duration-200"
      />
      {/* Bersaglio tappabile trasparente — sopra tutto, gestisce l'interazione.
          Su mobile è il tap a selezionare (non l'hover). onFocus/onMouseEnter
          restano per desktop e tastiera. */}
      <circle
        cx={cx}
        cy={cy}
        r={hitR}
        fill="transparent"
        tabIndex={0}
        role="button"
        aria-label={`${city}: ${count} ${evLabel}`}
        aria-pressed={isActive}
        onClick={select}
        onMouseEnter={() => onActivate?.(city)}
        onFocus={() => onActivate?.(city)}
        onBlur={() => onActivate?.(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select();
          }
        }}
        style={{ touchAction: "manipulation", outline: "none" }}
        className="focus-visible:outline-none"
      >
        <title>{`${city} — ${count} ${evLabel}`}</title>
      </circle>
    </motion.g>
  );
});
