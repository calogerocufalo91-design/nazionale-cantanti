// L'evento corrente è verificato dagli articoli News reali del sito (raccolti
// il 26/06/2026). Lo storico "rinviata a data da destinarsi" è quello che oggi
// appare ERRONEAMENTE come sezione "Eventi" live sul sito attuale (alert Covid-19
// del 2020): qui viene spostato in un archivio etichettato come storico, non
// più presentato come evento corrente.

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  stadium: string;
  city: string;
  broadcast?: string;
  cause: string;
  status: "prossimo" | "archiviato";
  summary: string;
  // Locandina reale solo per il prossimo evento. Gli eventi archiviati del 2020
  // non hanno una locandina dedicata: il campo resta omesso e la card mostra un
  // segnaposto neutro invece di un'immagine inventata.
  image?: string;
};

export const nextEvent: EventItem = {
  slug: "partita-del-cuore-2026",
  title: "Partita del Cuore 2026",
  date: "13 luglio 2026",
  time: "21:00",
  stadium: "Stadio Gran Sasso d'Italia \"Italo Acconcia\"",
  city: "L'Aquila",
  broadcast: "Diretta Rai 1",
  cause: "Croce Rossa Italiana",
  status: "prossimo",
  summary:
    "35ª edizione della Partita del Cuore: sport, musica e solidarietà a L'Aquila per sostenere la Croce Rossa Italiana. Aperte le prevendite.",
  image: "/images/events/partita-del-cuore-2026.jpeg",
};

// Eventi rinviati nel 2020 per l'emergenza Covid-19, mai aggiornati sul sito
// attuale. Conservati qui solo come archivio storico, con stato esplicito.
export const archivedEvents: EventItem[] = [
  {
    slug: "in-soccorso-della-vita-2020",
    title: "In Soccorso della Vita",
    date: "Rinviata nel 2020 (emergenza Covid-19)",
    stadium: "Stadio Comunale",
    city: "Cesenatico",
    cause: "Acquisto di un'autoambulanza per la Croce Rossa locale",
    status: "archiviato",
    summary:
      "Partita organizzata con i Comuni di Cesenatico e Gatteo, rinviata a data da destinarsi per i decreti anti-Covid del maggio 2020. TODO_VERIFY: chiedere al cliente se l'evento è stato poi recuperato o annullato definitivamente.",
  },
  {
    slug: "giornata-del-papa-2020",
    title: "Giornata del Papà",
    date: "Rinviata nel 2020 (emergenza Covid-19)",
    stadium: "Stadio Garilli",
    city: "Piacenza",
    cause: "Beneficenza locale",
    status: "archiviato",
    summary: "Partita contro la Nazionale Calcio TV, rinviata a data da destinarsi.",
  },
  {
    slug: "in-campo-per-la-prevenzione-2020",
    title: "In Campo per la Prevenzione",
    date: "Rinviata nel 2020 (emergenza Covid-19)",
    stadium: "Stadio R. Menti",
    city: "Castellammare di Stabia",
    cause: "Prevenzione sanitaria",
    status: "archiviato",
    summary: "Partita contro la Solidarity Soccer Team, rinviata a data da destinarsi.",
  },
  {
    slug: "partita-del-cuore-2020",
    title: "La Partita del Cuore 2020",
    date: "Rinviata nel 2020 (emergenza Covid-19)",
    stadium: "Stadio Meazza",
    city: "Milano",
    cause: "Solidarietà",
    status: "archiviato",
    summary: "Edizione 2020 della Partita del Cuore, rinviata a data da destinarsi.",
  },
];
