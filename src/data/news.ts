// Titoli e contenuti reali ripresi da /news/ del sito attuale (fetch 26/06/2026),
// normalizzati (niente MAIUSCOLO, lunghezza titolo ridotta) ma senza alterare i
// fatti. Le date esatte non sono verificabili dalla sola pagina elenco: dove il
// testo originale non cita l'anno, è segnato "da confermare" invece di inventarlo.

export type NewsArticle = {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  // Immagine reale dell'articolo dal sito attuale. Una notizia ("Si può fare
  // Band") sul sito non aveva immagine: lì il campo è omesso e la card usa un
  // segnaposto neutro invece di un'immagine inventata.
  image?: string;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "aperte-prevendite-partita-del-cuore-2026",
    title: "Aperte le prevendite per la Partita del Cuore 2026",
    dateLabel: "2026",
    excerpt:
      "La Nazionale Cantanti scende in campo in diretta su Rai 1 lunedì 13 luglio alle 21:00: 35ª edizione della Partita del Cuore, tra sport, musica e solidarietà, a L'Aquila per sostenere la Croce Rossa Italiana.",
    image: "/images/news/aperte-prevendite-partita-del-cuore-2026.jpeg",
  },
  {
    slug: "due-chitarre-donate-si-puo-fare-band",
    title: "Musica e inclusione: due chitarre donate alla \"Si può fare Band\"",
    dateLabel: "Data da confermare",
    excerpt:
      "Al triangolare di Desenzano, con il patrocinio della Regione Lombardia, la Nazionale Cantanti dona due chitarre alla \"Si può fare Band\".",
  },
  {
    slug: "triangolare-mondiale-desenzano",
    title: "Sport e solidarietà a Desenzano del Garda: il Triangolare Mondiale",
    dateLabel: "14 giugno (anno da confermare)",
    excerpt:
      "Nazionale Cantanti, Nazionale Manager e Boom Friends si sono affrontate in un triangolare benefico a Desenzano del Garda.",
    image: "/images/news/triangolare-mondiale-desenzano.jpeg",
  },
  {
    slug: "moreno-donadoni-capocannoniere",
    title: "Moreno Donadoni nella storia della Nazionale Cantanti: nuovo capocannoniere assoluto",
    dateLabel: "Data da confermare",
    excerpt:
      "Un nuovo record per la squadra: Moreno Donadoni diventa il capocannoniere assoluto nella storia della Nazionale Cantanti.",
    image: "/images/news/moreno-donadoni-capocannoniere.jpeg",
  },
  {
    slug: "chitarre-eko-casa-famiglia-lagonegro",
    title: "Chitarre Eko donate alla Casa Famiglia di Lagonegro nel nome di Pino Mango",
    dateLabel: "Data da confermare",
    excerpt:
      "A Lagonegro consegnate le chitarre Eko donate dalla Nazionale Cantanti alla Casa Famiglia, in memoria di Pino Mango.",
    image: "/images/news/chitarre-eko-casa-famiglia-lagonegro.jpeg",
  },
  {
    slug: "oltre-il-campo-donazioni-raccolte",
    title: "Oltre il campo: tutte le donazioni raccolte nelle ultime partite",
    dateLabel: "Data da confermare",
    excerpt:
      "Un riepilogo delle donazioni raccolte dalla Nazionale Cantanti nelle partite più recenti.",
    image: "/images/news/oltre-il-campo-donazioni-raccolte.jpg",
  },
  {
    slug: "due-chitarre-eko-scuola-musica-giacomo-moro",
    title: "Successo a Viadana: due chitarre Eko donate alla Scuola di Musica \"Giacomo Moro\"",
    dateLabel: "Data da confermare",
    excerpt:
      "Due chitarre Eko donate dalla Nazionale Cantanti alla Scuola di Musica \"Giacomo Moro\" di Viadana.",
    image: "/images/news/due-chitarre-eko-scuola-musica-giacomo-moro.jpg",
  },
  {
    slug: "grande-cuore-viadana",
    title: "Il grande cuore di Viadana batte a ritmo di leggenda",
    dateLabel: "Data da confermare",
    excerpt: "Il racconto della giornata benefica a Viadana, tra musica e solidarietà.",
    image: "/images/news/grande-cuore-viadana.jpg",
  },
  {
    slug: "givova-terra-santa-filo-di-pace",
    title: "La Nazionale Cantanti con Givova: un filo di pace che attraversa il tempo",
    dateLabel: "Data da confermare",
    excerpt:
      "Insieme allo sponsor tecnico Givova, un progetto di solidarietà legato alla Terra Santa.",
    image: "/images/news/givova-terra-santa-filo-di-pace.jpg",
  },
  {
    slug: "un-dono-per-la-vita-viadana-2026",
    title: "\"Un Dono per la Vita\": Nazionale Cantanti e Il Grande Cuore di Viadana",
    dateLabel: "6 giugno 2026",
    excerpt:
      "La Partita del Cuore \"Un Dono per la Vita\": Nazionale Cantanti contro U.S.V. Il Grande Cuore di Viadana, sabato 6 giugno 2026.",
    image: "/images/news/un-dono-per-la-vita-viadana-2026.jpg",
  },
  {
    slug: "buon-compleanno-gian-luca",
    title: "Buon compleanno, Gian Luca, da tutta la Nazionale Cantanti!",
    dateLabel: "Data da confermare",
    excerpt: "Gli auguri di tutta l'associazione al direttore generale Gianluca Pecchini.",
    image: "/images/news/buon-compleanno-gian-luca.jpg",
  },
  {
    slug: "ciao-evaristo",
    title: "Ciao Evaristo: il ricordo della Nazionale Cantanti",
    dateLabel: "Data da confermare",
    excerpt: "Il ricordo e il saluto della Nazionale Cantanti.",
    image: "/images/news/ciao-evaristo.jpeg",
  },
];
