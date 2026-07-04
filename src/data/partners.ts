// Sponsor/partner reali individuati in homepage durante l'audit (Givova,
// TrustMeUp) più l'agenzia sponsorship citata in organigramma (Ege Eventi).
// L'utente ha confermato l'autorizzazione a usare i loghi. Per attivarli basta
// mettere i file in public/images/partners/ e valorizzare il campo `logo`:
//   givova.png -> "/images/partners/givova.png", ecc.
// Finché il file non c'è, la card mostra il nome (nessun logo inventato).

export type Partner = {
  name: string;
  role: string;
  logo?: string;
};

export const partners: Partner[] = [
  { name: "Givova", role: "Sponsor tecnico", logo: "/images/partners/givova.png" },
  {
    name: "TrustMeUp",
    role: "Piattaforma di raccolta fondi",
    logo: "/images/partners/trustmeup.png",
  },
  {
    name: "Ege Eventi",
    role: "Agenzia sponsorship",
    logo: "/images/partners/ege-eventi.png",
  },
];
