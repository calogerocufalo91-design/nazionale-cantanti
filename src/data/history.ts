// Contenuto reale estratto da /la-storia/ (pagina datata 2023 sul sito attuale).
// I numeri cumulativi (incontri totali, anni di attività) sono "ultimo dato
// disponibile pubblicato dal sito", NON un dato 2026 aggiornato: vanno
// riconfermati col cliente. Le singole edizioni storiche sono fatti verificati.

export const historyStats = {
  // ultimo dato pubblicato (pagina Storia, 2023): 647 incontri in 42 anni di attività
  lastVerified: {
    incontri: 647,
    anniAttivita: 42,
    sourceYear: 2023,
  },
  note: "TODO_VERIFY: dato non aggiornato dal cliente dal 2023. Da richiedere il numero corrente di incontri/anni prima della pubblicazione.",
};

export type PartitaDelCuoreEdition = {
  edition: number;
  year: number;
  date: string;
  stadium: string;
  city: string;
  opponent: string;
  summary: string;
  // TODO_CLIENTE: foto reale della singola edizione. NON inserita finché il
  // cliente non fornisce lo scatto autentico di QUELLA partita: mettere una foto
  // generica accanto a una data precisa sarebbe fuorviante. Finché è assente, la
  // timeline mostra un pannello elegante con l'anno. Percorso atteso es.:
  // "/images/storia/partita-del-cuore-1992.jpg".
  image?: string;
};

export const partitaDelCuoreEditions: PartitaDelCuoreEdition[] = [
  {
    edition: 1,
    year: 1992,
    date: "3 giugno 1992",
    stadium: "Stadio Olimpico",
    city: "Roma",
    opponent: "Nazionale RadioTelecronisti Rai",
    summary:
      "Prima edizione ufficiale. 83.000 spettatori, incasso di 900 milioni di lire a sostegno della lotta contro la leucemia. Vittoria ai rigori della Nazionale RadioTelecronisti.",
  },
  {
    edition: 2,
    year: 1993,
    date: "2 giugno 1993",
    stadium: "Stadio La Favorita",
    city: "Palermo",
    opponent: "Nazionale Piloti",
    summary:
      "Tutto esaurito al Barbera (40.000 spettatori), incasso oltre 750 milioni di lire per i trapianti di midollo osseo. Vittoria della Nazionale Piloti.",
  },
  {
    edition: 3,
    year: 1994,
    date: "5 giugno 1994",
    stadium: "Stadio San Paolo",
    city: "Napoli",
    opponent: "Campioni Olimpici dello Sport",
    summary:
      "60.000 spettatori, incontro dedicato alla memoria di Massimo Troisi e a favore della popolazione bosniaca. Prima vittoria della Nazionale Cantanti (3-2).",
  },
  {
    edition: 4,
    year: 1995,
    date: "2 giugno 1995",
    stadium: "Stadio Meazza",
    city: "Milano",
    opponent: "Nazionale Italiana Magistrati",
    summary:
      "Debutto a San Siro davanti a 72.000 persone, raccolta fondi per la ricerca oltre il miliardo di lire. Omaggio a Mia Martini.",
  },
  {
    edition: 5,
    year: 1996,
    date: "7 giugno 1996",
    stadium: "Stadio Bentegodi",
    city: "Verona",
    opponent: "Nazionale Italiana Parlamentari",
    summary:
      "Record di incassi storico: 1 miliardo 625 milioni di lire, devoluti a progetti sociali e di recupero giovanile.",
  },
];

export const historyIntro = {
  title: "La storia della Partita del Cuore",
  body: "L'evento calcistico con finalità benefiche più conosciuto a livello internazionale, legato all'idea fondante della Nazionale Italiana Cantanti, nata nel 1981. Il primo incontro in assoluto si tenne all'Arena di Milano, ancora prima della nascita ufficiale dell'associazione, con due padrini d'eccezione: Mogol e Lucio Battisti. La Partita del Cuore è stata istituita ufficialmente nel 1992 e da allora si ripete con cadenza annuale.",
};
