// Configurazione dei media usati come sfondo/storytelling in homepage.
//
// IMPORTANTE (integrità dei contenuti): non esistono ancora video reali di
// stadio/concerti/backstage forniti dal cliente, e non ne sono stati inventati
// né scaricati da terzi. Per ogni blocco è quindi indicato:
//   - poster: una FOTO REALE già presente nel progetto (archivio storico ufficiale),
//     che funge sia da immagine di fallback sia da sfondo animato finché non c'è video;
//   - video: il percorso del file .mp4 che il cliente potrà aggiungere in
//     /public/videos/. Finché il file non esiste, il componente mostra solo il poster.
//
// Quando il cliente fornirà i video reali, basterà metterli in /public/videos/
// con questi nomi: si attiveranno automaticamente, senza toccare il codice.

export type MediaSource = {
  poster: string; // immagine reale (fallback + sfondo finché non c'è il video)
  video?: string; // percorso .mp4 (placeholder: da fornire dal cliente)
  alt: string;
};

// Slideshow della hero: SOLO foto reali in alta risoluzione (≥1280px), così a
// tutto schermo non risultano sgranate. Le foto storiche della gallery sono
// volutamente escluse qui perché esistono solo in versione piccola (max ~640px).
// Ogni slide può in futuro diventare un video reale: basta aggiungere il campo
// "video" con il file in /public/videos/ (vedi public/videos/README.md).
export const heroSlides: MediaSource[] = [
  {
    poster: "/images/video/x6K3_vCbwLc.jpg",
    video: "/videos/hero-nazionale-cantanti.mp4",
    alt: "La Nazionale Italiana Cantanti in campo",
  },
  {
    poster: "/images/news/chitarre-eko-casa-famiglia-lagonegro.jpeg",
    alt: "Chitarre Eko donate dalla Nazionale Cantanti alla Casa Famiglia di Lagonegro",
  },
  {
    poster: "/images/news/triangolare-mondiale-desenzano.jpeg",
    alt: "Triangolare benefico della Nazionale Cantanti a Desenzano del Garda",
  },
  {
    poster: "/images/news/moreno-donadoni-capocannoniere.jpeg",
    alt: "Moreno Donadoni, capocannoniere della Nazionale Italiana Cantanti",
  },
];

export const heroMedia: MediaSource = heroSlides[0];

export const missionMedia: MediaSource = {
  poster: "/images/news/givova-terra-santa-filo-di-pace.jpg",
  video: "/videos/solidarieta.mp4",
  alt: "La Nazionale Cantanti con Givova: un progetto di solidarietà legato alla Terra Santa",
};

export const storytellingMedia: MediaSource = {
  poster: "/images/news/due-chitarre-eko-scuola-musica-giacomo-moro.jpg",
  video: "/videos/eventi-benefici.mp4",
  alt: "Chitarre Eko donate dalla Nazionale Cantanti alla Scuola di Musica di Viadana",
};

export const ctaMedia: MediaSource = {
  poster: "/images/news/chitarre-eko-casa-famiglia-lagonegro.jpeg",
  video: "/videos/eventi-benefici.mp4",
  alt: "La solidarietà della Nazionale Italiana Cantanti sul territorio",
};

// Immagini reali usate come intestazione cinematografica (PageHero) delle pagine
// interne. Sono sfocate sotto l'overlay blu: non vengono presentate come prova di
// un fatto specifico, ma solo come sfondo atmosferico dell'archivio reale.
export const pageHeroes = {
  squadra: {
    poster: "/images/gallery/ramazzotti-pele-schumacher.jpg",
    alt: "Eros Ramazzotti con Pelé e Michael Schumacher",
  },
  eventi: {
    poster: "/images/events/partita-del-cuore-2026.jpeg",
    alt: "Partita del Cuore 2026",
  },
  news: {
    poster: "/images/news/triangolare-mondiale-desenzano.jpeg",
    alt: "Triangolare benefico della Nazionale Cantanti a Desenzano del Garda",
  },
  gallery: {
    poster: "/images/gallery/morandi-perez-arafat.png",
    alt: "Gianni Morandi con Shimon Peres e Yasser Arafat",
  },
  progetti: {
    poster: "/images/news/chitarre-eko-casa-famiglia-lagonegro.jpeg",
    alt: "Chitarre Eko donate dalla Nazionale Cantanti",
  },
  partner: {
    poster: "/images/news/givova-terra-santa-filo-di-pace.jpg",
    alt: "La Nazionale Cantanti con lo sponsor tecnico Givova",
  },
  stampa: {
    poster: "/images/news/moreno-donadoni-capocannoniere.jpeg",
    alt: "La Nazionale Italiana Cantanti in campo",
  },
  contatti: {
    poster: "/images/gallery/ruggeri-pavarotti.jpg",
    alt: "Enrico Ruggeri con Luciano Pavarotti",
  },
  donaOra: {
    poster: "/images/news/un-dono-per-la-vita-viadana-2026.jpg",
    alt: "La Partita del Cuore della Nazionale Italiana Cantanti",
  },
  cinquePerMille: {
    poster: "/images/news/due-chitarre-eko-scuola-musica-giacomo-moro.jpg",
    alt: "Chitarre donate dalla Nazionale Cantanti a una scuola di musica",
  },
  legal: {
    poster: "/images/gallery/morandi-lippi.jpg",
    alt: "Gianni Morandi con Marcello Lippi",
  },
} satisfies Record<string, MediaSource>;
