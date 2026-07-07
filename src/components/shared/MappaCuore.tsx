"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  stadioInfo,
  type CittaGiocata,
  type StadioInfo,
} from "@/lib/archivio-view";

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
const PLACEHOLDER_URL = "/images/stadi/placeholder-stadio.svg";

type MappaCuoreProps = {
  places: CittaGiocata[];
  selected?: string | null;
  onSelect?: (city: string) => void;
  hoveredCity?: string | null;
  onHover?: (city: string | null) => void;
  className?: string;
};

export function MappaCuore({
  places,
  selected = null,
  onSelect,
  hoveredCity = null,
  onHover,
  className,
}: MappaCuoreProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoverInternal, setHoverInternal] = useState<string | null>(null);
  // Città "aperta" tramite tap (mobile) o click esplicito
  const [openCity, setOpenCity] = useState<string | null>(null);

  const activeCity = hoveredCity ?? hoverInternal ?? openCity ?? selected;

  useEffect(() => {
    if (!openCity) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenCity(null);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [openCity]);

  const setHover = (city: string | null) => {
    setHoverInternal(city);
    onHover?.(city);
  };

  const activePlace = places.find((p) => p.city === activeCity) ?? null;
  const activeInfo = activePlace ? stadioInfo(activePlace.city) : null;

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Mappa stilizzata dell'Italia con le città in cui la Nazionale Cantanti ha giocato"
        className="h-auto w-full"
      >
        <defs>
          <filter
            id="italia-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feOffset dy="2" result="off" />
            <feFlood floodColor="#0072BB" floodOpacity="0.45" />
            <feComposite in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="italia-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4fa9e0" stopOpacity="0.14" />
            <stop offset="1" stopColor="#4fa9e0" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <g filter="url(#italia-shadow)">
          {[MAINLAND, SICILIA, SARDEGNA].map((shape, i) => (
            <path
              key={i}
              d={toPath(shape)}
              fill="url(#italia-fill)"
              stroke="rgba(79,169,224,0.65)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </g>

        {places.map((p, i) => {
          const [cx, cy] = project(p.lon, p.lat);
          const r = 3.5 + Math.min(p.count, 8) * 0.9;
          const active = activeCity === p.city;

          return (
            <motion.g
              key={p.city}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: reduce ? 0 : Math.min(i * 0.035, 0.9),
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={r + 5}
                fill={
                  active ? "rgba(232,178,58,0.45)" : "rgba(232,178,58,0.18)"
                }
                className={active ? "pin-pulse-strong" : "pin-pulse"}
                pointerEvents="none"
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
                onClick={() => {
                  onSelect?.(p.city);
                  setOpenCity((c) => (c === p.city ? null : p.city));
                }}
                onMouseEnter={() => setHover(p.city)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.city)}
                onBlur={() => setHover(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect?.(p.city);
                    setOpenCity((c) => (c === p.city ? null : p.city));
                  }
                }}
                className="cursor-pointer transition-transform duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <title>{`${p.city} — ${p.count} ${p.count === 1 ? "evento" : "eventi"}`}</title>
              </circle>
            </motion.g>
          );
        })}
      </svg>

      {activePlace && activeInfo && (
        <StadioCard
          key={activeInfo.city}
          place={activePlace}
          info={activeInfo}
        />
      )}
    </div>
  );
}

function StadioCard({
  place,
  info,
}: {
  place: CittaGiocata;
  info: StadioInfo;
}) {
  const [cx, cy] = project(place.lon, place.lat);
  const flipX = cx / VIEW_W > 0.55;
  const flipY = cy / VIEW_H > 0.72;
  // Fallback chain silenzioso: foto reale → visual generativo → placeholder.
  // Lo state si resetta da solo grazie al key={info.city} sul parent.
  const [photoFailed, setPhotoFailed] = useState(false);
  const [visualFailed, setVisualFailed] = useState(false);
  const showRealPhoto =
    info.visualStatus === "licensed" && !!info.imageUrl && !photoFailed;
  const visualSrc = visualFailed ? PLACEHOLDER_URL : info.visualUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      className="pointer-events-none absolute z-30 w-60 overflow-hidden rounded-2xl border border-white/12 bg-notte/95 text-left shadow-[0_22px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-oro/15 backdrop-blur-md sm:w-64"
      style={{
        left: `${(cx / VIEW_W) * 100}%`,
        top: `${(cy / VIEW_H) * 100}%`,
        transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${flipY ? "calc(-100% - 10px)" : "-22%"})`,
      }}
      aria-hidden
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-notte-800">
        {showRealPhoto ? (
          <Image
            src={info.imageUrl!}
            alt={info.imageAlt}
            fill
            sizes="(max-width: 640px) 90vw, 260px"
            className="object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          // Visual istituzionale (SVG generativo originale) — non è una fotografia.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visualSrc}
            alt={info.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setVisualFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-notte/80 via-notte/10 to-transparent" />
        <div className="absolute left-2 top-2">
          {showRealPhoto ? (
            <span className="rounded-full bg-oro px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-oro-scuro shadow-sm">
              Foto ufficiale
            </span>
          ) : (
            <span className="rounded-full bg-azzurro-chiaro/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-azzurro-chiaro ring-1 ring-azzurro-chiaro/40">
              Visual istituzionale
            </span>
          )}
        </div>
      </div>

      <div className="p-3.5">
        <p className="font-serif text-[15px] font-semibold leading-tight text-white">
          {info.stadiumName}
        </p>
        <p className="mt-0.5 text-xs text-white/70">{info.city}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium">
          <span className="text-oro">
            {info.matchesCount}{" "}
            {info.matchesCount === 1 ? "partita" : "partite"}
          </span>
          {info.latestYear ? (
            <>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <span className="text-white/70">
                ultima {info.latestYear}
              </span>
            </>
          ) : null}
        </div>

        {info.events.length > 0 && (
          <ul className="mt-2.5 space-y-1 border-t border-white/8 pt-2 text-[11px] leading-snug text-white/70">
            {info.events.slice(0, 2).map((e) => (
              <li key={`${e.year}-${e.title}`} className="truncate">
                <span className="font-cond text-white/50">
                  {e.year || "—"}
                </span>{" "}
                <span className="text-white/85">{e.title}</span>
              </li>
            ))}
          </ul>
        )}

        {!showRealPhoto ? (
          <p className="mt-2.5 text-[10px] italic leading-snug text-white/45">
            Illustrazione istituzionale · rappresentazione non fotografica.
          </p>
        ) : info.imageCredit || info.imageLicense ? (
          <p className="mt-2.5 text-[10px] leading-snug text-white/50">
            {info.imageCredit}
            {info.imageCredit && info.imageLicense ? " · " : ""}
            {info.imageLicense}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
