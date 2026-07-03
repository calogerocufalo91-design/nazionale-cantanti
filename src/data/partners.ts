// Sponsor/partner reali individuati in homepage durante l'audit (Givova,
// TrustMeUp) più l'agenzia sponsorship citata in organigramma (Ege Eventi).
// TODO_VERIFY: nessun loro logo è stato riportato qui (non scaricabile con
// certezza di licenza d'uso aggiornata): da far fornire dal cliente in SVG/PNG.

export type Partner = {
  name: string;
  role: string;
};

export const partners: Partner[] = [
  { name: "Givova", role: "Sponsor tecnico" },
  { name: "TrustMeUp", role: "Piattaforma di raccolta fondi" },
  { name: "Ege Eventi", role: "Agenzia sponsorship" },
];
