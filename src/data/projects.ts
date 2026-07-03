// NIC United è una voce di menu reale del sito attuale ("diamo campo a chi fa
// musica"). I progetti elencati sotto sono iniziative reali documentate negli
// articoli News (chitarre donate a scuole di musica e case famiglia), non
// progetti inventati. Descrizioni e importi non dichiarati sul sito sono
// omessi piuttosto che stimati.

export const nicUnited = {
  tagline: "NIC United: diamo campo a chi fa musica.",
  description:
    "L'iniziativa della Nazionale Italiana Cantanti dedicata a chi fa musica, con il coordinamento del Label Manager Paolo Vallesi.",
};

export type Project = {
  title: string;
  description: string;
};

export const projects: Project[] = [
  {
    title: "Chitarre Eko per le scuole di musica",
    description:
      "Donazione di chitarre Eko a scuole di musica e realtà locali, tra cui la Scuola di Musica \"Giacomo Moro\" di Viadana.",
  },
  {
    title: "Sostegno alle case famiglia",
    description:
      "Chitarre donate alla Casa Famiglia di Lagonegro, nel nome di Pino Mango.",
  },
  {
    title: "Inclusione attraverso la musica",
    description:
      "Sostegno a realtà come la \"Si può fare Band\", con il patrocinio della Regione Lombardia.",
  },
];
