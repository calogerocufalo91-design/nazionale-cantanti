// Dati reali verificati il 26/06/2026 via fetch diretto di nazionalecantanti.it
// (homepage, /contatti/, /organigramma/, /la-storia/, /5-x-1000/).
// Dove un dato non era verificabile sul sito live è segnato con TODO_VERIFY:
// non va pubblicato senza conferma del cliente.

export const site = {
  name: "Nazionale Italiana Cantanti",
  shortName: "Nazionale Cantanti",
  foundingYear: 1981,
  url: "https://www.nazionalecantanti.it",
  mission:
    "L'associazione nasce nel 1981, da un gruppo di cantanti e dal D.G. Gianluca Pecchini, con lo scopo di promuovere progetti di solidarietà.",
  address: {
    line1: "Viale Regina Margherita 5",
    line2: "20122 Milano",
  },
  email: "info@nazionalecantanti.it",
  social: {
    instagram: "https://www.instagram.com/nazionale_cantanti/",
    facebook: "https://www.facebook.com/NazCantanti/",
    // TODO_VERIFY: nessun link Twitter/X funzionante trovato in homepage durante l'audit.
  },
  // TODO_VERIFY: numero di telefono non presente in nessuna pagina del sito attuale.
  phone: null as string | null,
};

export const nav = [
  { label: "La Storia", href: "/la-storia" },
  { label: "La Squadra", href: "/la-squadra" },
  { label: "Eventi", href: "/eventi" },
  { label: "Archivio Partite", href: "/archivio-partite" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Progetti", href: "/progetti" },
  { label: "Partner", href: "/partner" },
  { label: "Stampa", href: "/stampa" },
  { label: "Contatti", href: "/contatti" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contributi ed erogazioni pubbliche", href: "/contributi-pubblici" },
];

export const donationHighlight = {
  // TODO_VERIFY: il sito attuale non ha un link di donazione diretto funzionante
  // e dichiarato come tale. L'unico canale di raccolta fondi terzo individuato
  // in homepage durante l'audit è TrustMeUp. Da confermare col cliente prima
  // di pubblicare qualsiasi bottone "Dona ora" con link esterno.
  trustMeUpUrl: null as string | null,
};
