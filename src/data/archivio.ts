// Archivio partite fornito direttamente dall'utente/cliente il 2026-07-04.
// Contiene le principali edizioni della Partita del Cuore (1992-2026) e una
// selezione di eventi solidali recenti. NON è l'elenco assoluto di ogni incontro
// disputato (oltre 640 partite benefiche nella storia): la nota obbligatoria da
// mostrare in fondo alla pagina è in `archiveNote`.

export type ArchiveEdition = {
  year: number;
  edition: string;
  date: string;
  city: string;
  stadium: string;
  opponent: string;
  result: string;
  description: string;
};

export type ArchiveEvent = {
  date: string;
  title: string;
  city: string;
  venue: string;
  teams: string;
  result: string;
  purpose: string;
};

export const archiveIntro = {
  title: "Archivio Partite",
  subtitle:
    "Dalla prima Partita del Cuore del 1992 agli eventi solidali più recenti della Nazionale Cantanti.",
  description:
    "Un viaggio nella storia della Nazionale Italiana Cantanti attraverso le principali edizioni della Partita del Cuore e gli eventi solidali più recenti: partite, città, stadi, avversari, risultati e progetti benefici sostenuti.",
};

export const archiveCategories = [
  "Partita del Cuore",
  "Eventi speciali",
  "Partite solidali",
  "Triangolari benefici",
  "Raccolte fondi",
  "Storia della Nazionale Cantanti",
];

export const archiveNote =
  "L'archivio raccoglie le principali edizioni della Partita del Cuore e una selezione di eventi solidali recenti della Nazionale Cantanti. La Nazionale ha disputato nella sua storia oltre 640 partite benefiche; il presente archivio non rappresenta l'elenco assoluto di ogni singolo incontro disputato.";

export const partitaDelCuoreArchive: ArchiveEdition[] = [
  {
    year: 1992,
    edition: "1ª edizione",
    date: "3 giugno 1992",
    city: "Roma",
    stadium: "Stadio Olimpico",
    opponent: "Nazionale Radiotelecronisti Rai",
    result: "1-1, poi vittoria Rai ai rigori",
    description:
      "Prima edizione ufficiale della Partita del Cuore. Oltre 83.000 spettatori e incasso destinato alla lotta contro la leucemia.",
  },
  {
    year: 1993,
    edition: "2ª edizione",
    date: "2 giugno 1993",
    city: "Palermo",
    stadium: "Stadio La Favorita / Renzo Barbera",
    opponent: "Nazionale Piloti",
    result: "0-1",
    description:
      "Edizione disputata a Palermo, con tutto esaurito e fondi destinati ai trapianti di midollo osseo.",
  },
  {
    year: 1994,
    edition: "3ª edizione",
    date: "5 giugno 1994",
    city: "Napoli",
    stadium: "Stadio San Paolo",
    opponent: "Campioni Olimpici dello Sport",
    result: "3-2 per Nazionale Cantanti",
    description:
      "Incontro dedicato alla memoria di Massimo Troisi e a favore della popolazione bosniaca.",
  },
  {
    year: 1995,
    edition: "4ª edizione",
    date: "2 giugno 1995",
    city: "Milano",
    stadium: "San Siro / Giuseppe Meazza",
    opponent: "Nazionale Magistrati",
    result: "1-3",
    description:
      "Prima Partita del Cuore a San Siro, con fondi destinati alla ricerca.",
  },
  {
    year: 1996,
    edition: "5ª edizione",
    date: "7 giugno 1996",
    city: "Verona",
    stadium: "Stadio Marcantonio Bentegodi",
    opponent: "Nazionale Parlamentari",
    result: "2-2",
    description:
      "Edizione da record di incasso, disputata davanti a circa 45.000 spettatori.",
  },
  {
    year: 1997,
    edition: "6ª edizione",
    date: "6 giugno 1997",
    city: "Bologna",
    stadium: "Stadio Renato Dall'Ara",
    opponent: "Nazionale Parlamentari",
    result: "6-5 per Nazionale Cantanti",
    description:
      "Partita benefica a sostegno di associazioni contro tumori ed epilessia.",
  },
  {
    year: 1998,
    edition: "7ª edizione",
    date: "5 giugno 1998",
    city: "Cagliari",
    stadium: "Stadio Sant'Elia",
    opponent: "Nazionale Arbitri",
    result: "1-2 per Nazionale Arbitri",
    description:
      "Edizione sarda con raccolta fondi per adozioni a distanza e finalità sociali.",
  },
  {
    year: 1999,
    edition: "8ª edizione",
    date: "24 maggio 1999",
    city: "Firenze",
    stadium: "Stadio Artemio Franchi",
    opponent: "Nazionale Piloti",
    result: "1-1",
    description:
      "Edizione dedicata anche ai bambini vittime del conflitto in Kosovo.",
  },
  {
    year: 2000,
    edition: "9ª edizione",
    date: "25 maggio 2000",
    city: "Roma",
    stadium: "Stadio Olimpico",
    opponent: "All Stars for Peace",
    result: "5-6",
    description: "Edizione nell'anno del Giubileo, dedicata alla pace.",
  },
  {
    year: 2001,
    edition: "10ª edizione",
    date: "18 giugno 2001",
    city: "Genova",
    stadium: "Stadio Luigi Ferraris",
    opponent: "Nazionale Piloti",
    result: "1-1",
    description:
      "Decima edizione, con fondi destinati a progetti umanitari in Africa.",
  },
  {
    year: 2002,
    edition: "11ª edizione",
    date: "21 maggio 2002",
    city: "Reggio Calabria",
    stadium: "Stadio Oreste Granillo",
    opponent: "Inviati della Solidarietà",
    result: "4-3 ai rigori per Nazionale Cantanti",
    description:
      "Edizione dedicata anche al ricordo di Alex Baroni, con fondi destinati a progetti in Guatemala.",
  },
  {
    year: 2003,
    edition: "12ª edizione",
    date: "20 giugno 2003",
    city: "Reggio Emilia",
    stadium: "Stadio Giglio / Città del Tricolore",
    opponent: "Team Ferrari",
    result: "1-4",
    description:
      "Partita contro il Team Ferrari, con la partecipazione di grandi nomi della Formula 1.",
  },
  {
    year: 2004,
    edition: "13ª edizione",
    date: "28 maggio 2004",
    city: "Firenze",
    stadium: "Stadio Artemio Franchi",
    opponent: "UK Cup Stars",
    result: "6-6",
    description:
      "Edizione internazionale con artisti e sportivi britannici, ospite Michail Gorbačëv.",
  },
  {
    year: 2005,
    edition: "14ª edizione",
    date: "31 maggio 2005",
    city: "Milano",
    stadium: "San Siro / Giuseppe Meazza",
    opponent: "Golden Team for Children",
    result: "6-5 per Nazionale Cantanti",
    description:
      "Edizione benefica a favore di progetti per bambini e donatori di midollo.",
  },
  {
    year: 2006,
    edition: "15ª edizione",
    date: "22 maggio 2006",
    city: "Verona",
    stadium: "Stadio Marcantonio Bentegodi",
    opponent: "Italia Mondiale",
    result: "6-2 per Nazionale Cantanti",
    description:
      "Edizione del 25º anniversario della Nazionale Italiana Cantanti.",
  },
  {
    year: 2007,
    edition: "16ª edizione",
    date: "28 maggio 2007",
    city: "Napoli",
    stadium: "Stadio San Paolo",
    opponent: "Napoli Mondiale",
    result: "7-3 per Nazionale Cantanti",
    description: "Ritorno a Napoli con fondi destinati a fondazioni benefiche.",
  },
  {
    year: 2008,
    edition: "17ª edizione",
    date: "12 maggio 2008",
    city: "Roma",
    stadium: "Stadio Olimpico",
    opponent: "Unica",
    result: "6-6",
    description:
      "Partita contro una selezione mista di sportivi, ex sportivi e artisti.",
  },
  {
    year: 2009,
    edition: "18ª edizione",
    date: "18 maggio 2009",
    city: "Torino",
    stadium: "Stadio Olimpico",
    opponent: "Ale 10+",
    result: "6-6",
    description:
      "Edizione torinese con selezione guidata da Alessandro Del Piero.",
  },
  {
    year: 2010,
    edition: "19ª edizione",
    date: "25 maggio 2010",
    city: "Modena",
    stadium: "Stadio Alberto Braglia",
    opponent: "Telethon Team / Piloti Ferrari",
    result: "8-8",
    description:
      "Partita ad alto punteggio, con raccolta fondi per Telethon e Parco della Mistica.",
  },
  {
    year: 2011,
    edition: "20ª edizione",
    date: "30 maggio 2011",
    city: "Parma",
    stadium: "Stadio Ennio Tardini",
    opponent: "Triangolare: Nazionale Cantanti, Telethon Team, Nazionale Parlamentari",
    result: "NIC-Telethon 3-1; Parlamentari-Telethon 1-3; Parlamentari-NIC 1-2",
    description: "Edizione speciale in formato triangolare.",
  },
  {
    year: 2012,
    edition: "21ª edizione",
    date: "23 maggio 2012",
    city: "Palermo",
    stadium: "Stadio Renzo Barbera",
    opponent: "Nazionale Magistrati",
    result: "0-2",
    description:
      "Edizione nel ventennale della Strage di Capaci, a sostegno della Fondazione Falcone.",
  },
  {
    year: 2013,
    edition: "22ª edizione",
    date: "28 maggio 2013",
    city: "Torino",
    stadium: "Juventus Stadium",
    opponent: "Team Campioni per la Ricerca",
    result: "9-9",
    description:
      "Edizione a sostegno di Telethon, con grande partecipazione di sportivi e personaggi pubblici.",
  },
  {
    year: 2014,
    edition: "23ª edizione",
    date: "19 maggio 2014",
    city: "Firenze",
    stadium: "Stadio Artemio Franchi",
    opponent: "Team Emergency",
    result: "4-4",
    description: "Edizione benefica a sostegno di Emergency.",
  },
  {
    year: 2015,
    edition: "24ª edizione",
    date: "2 giugno 2015",
    city: "Torino",
    stadium: "Juventus Stadium",
    opponent: "Campioni per la Ricerca",
    result: "4-4",
    description:
      "Edizione con beneficiari Telethon e Fondazione per la ricerca sul cancro dell'Istituto di Candiolo.",
  },
  {
    year: 2016,
    edition: "25ª edizione",
    date: "18 maggio 2016",
    city: "Roma",
    stadium: "Stadio Olimpico",
    opponent: "Cinema Stars",
    result: "5-4 per Nazionale Cantanti",
    description: "Venticinquesima edizione della Partita del Cuore.",
  },
  {
    year: 2017,
    edition: "26ª edizione",
    date: "30 maggio 2017",
    city: "Torino",
    stadium: "Juventus Stadium",
    opponent: "Campioni per la Ricerca",
    result: "5-5",
    description:
      "Edizione a favore di Telethon e Fondazione Piemontese per la Ricerca sul Cancro.",
  },
  {
    year: 2018,
    edition: "27ª edizione",
    date: "30 maggio 2018",
    city: "Genova",
    stadium: "Stadio Luigi Ferraris",
    opponent: "Campioni del Sorriso",
    result: "6-3 per Nazionale Cantanti",
    description:
      "Edizione dedicata alla memoria di Fabrizio Frizzi, con fondi per Gaslini e AIRC.",
  },
  {
    year: 2019,
    edition: "28ª edizione",
    date: "28 maggio 2019",
    city: "Torino",
    stadium: "Juventus Stadium",
    opponent: "Team Campioni per la Ricerca",
    result: "2-3",
    description: "Edizione torinese a favore di ricerca oncologica e Telethon.",
  },
  {
    year: 2020,
    edition: "29ª edizione",
    date: "3 settembre 2020",
    city: "Verona",
    stadium: "Stadio Marcantonio Bentegodi",
    opponent: "Formula speciale a quattro squadre",
    result: "Vince Team Salmo",
    description:
      "Edizione dedicata ai lavoratori dello spettacolo durante la pandemia.",
  },
  {
    year: 2021,
    edition: "30ª edizione",
    date: "25 maggio 2021",
    city: "Torino",
    stadium: "Allianz Stadium",
    opponent: "Team Campioni per la Ricerca",
    result: "7-5 per Nazionale Cantanti",
    description:
      "Trentesima edizione, trasmessa per la prima volta su Canale 5.",
  },
  {
    year: 2022,
    edition: "31ª edizione",
    date: "7 settembre 2022",
    city: "Monza",
    stadium: "U-Power Stadium",
    opponent: "Charity Team 45527",
    result: "3-3",
    description:
      "Edizione a sostegno di persone affette da Alzheimer e bambini con leucemia.",
  },
  {
    year: 2023,
    edition: "32ª edizione",
    date: "20 luglio 2023",
    city: "Rimini",
    stadium: "Stadio Romeo Neri",
    opponent: "Golden Team per la Romagna",
    result: "11-4 per Nazionale Cantanti",
    description:
      "\"La Partita del Cuore per la Romagna\", a sostegno delle realtà colpite dall'alluvione.",
  },
  {
    year: 2024,
    edition: "33ª edizione",
    date: "16 luglio 2024",
    city: "L'Aquila",
    stadium: "Stadio Gran Sasso d'Italia - Italo Acconcia",
    opponent: "Nazionale della Politica",
    result: "7-7, poi vittoria della Nazionale della Politica ai rigori",
    description:
      "Edizione a favore dell'Ospedale Pediatrico Bambino Gesù e dell'Ospedale San Salvatore dell'Aquila.",
  },
  {
    year: 2025,
    edition: "34ª edizione",
    date: "15 luglio 2025",
    city: "L'Aquila",
    stadium: "Stadio Gran Sasso d'Italia - Italo Acconcia",
    opponent: "Nazionale della Politica",
    result: "8-6 per Nazionale Cantanti",
    description:
      "\"La Rivincita\", edizione a sostegno del Progetto Accoglienza promosso da Fondazione Bambino Gesù e Caritas Italiana.",
  },
  {
    year: 2026,
    edition: "35ª edizione",
    date: "13 luglio 2026",
    city: "L'Aquila",
    stadium: "Stadio Gran Sasso d'Italia - Italo Acconcia",
    opponent: "Nazionale della Politica",
    result: "In programma",
    description:
      "Trentacinquesima edizione della Partita del Cuore, in diretta su Rai 1.",
  },
];

export const recentSolidarityEvents: ArchiveEvent[] = [
  {
    date: "18 novembre 2023",
    title: "Metti in campo il cuore per la Toscana",
    city: "Empoli",
    venue: "Stadio Carlo Castellani",
    teams: "Nazionale Cantanti vs Shalom Campioni del Cuore",
    result: "10-6 per Nazionale Cantanti",
    purpose: "Evento a sostegno degli alluvionati in Toscana.",
  },
  {
    date: "20 agosto 2024",
    title: "Partita del Cuore Soul Edition",
    city: "Pontremoli",
    venue: "Stadio Lunezia",
    teams: "Nazionale Cantanti vs Lunisiana Soul",
    result: "Evento benefico",
    purpose: "Evento con musica, sport e solidarietà.",
  },
  {
    date: "16 novembre 2024",
    title: "Nazionale Cantanti vs Shalom Campioni del Cuore",
    city: "Pisa",
    venue: "Arena Garibaldi",
    teams: "Nazionale Cantanti vs Shalom Campioni del Cuore",
    result: "Evento benefico",
    purpose: "Evento per i 50 anni di Shalom.",
  },
  {
    date: "17 aprile 2025",
    title: "Veneto Cup — andata",
    city: "Verona",
    venue: "Stadio Gavagnin-Nocini",
    teams: "Nazionale Cantanti vs Nazionale Sindaci",
    result: "Evento benefico",
    purpose: "Prima tappa della Veneto Cup.",
  },
  {
    date: "21-22 maggio 2025",
    title: "Gatteo Mare, casa della Nazionale Cantanti",
    city: "Gatteo Mare",
    venue: "Stadio Comunale",
    teams: "Due giornate di sport e solidarietà",
    result: "Evento a offerta libera",
    purpose: "Ricavato destinato all'associazione Telemaco.",
  },
  {
    date: "7 giugno 2025",
    title: "Nazionale Cantanti vs Nazionale Manager",
    city: "Castel San Giovanni",
    venue: "Stadio Pinetto Soressi",
    teams: "Nazionale Cantanti vs Nazionale Manager",
    result: "Evento solidale",
    purpose: "Sostegno alla Pubblica Assistenza Val Tidone e Val Luretta.",
  },
  {
    date: "11 agosto 2025",
    title: "Partita del Cuore Soul Edition 2025",
    city: "Pontremoli",
    venue: "Stadio Lunezia",
    teams: "Nazionale Cantanti vs Lunisiana Soul",
    result: "Evento benefico",
    purpose: "Ricavato per A.L.DI e Fondazione Il Domani dell'Autismo.",
  },
  {
    date: "9 ottobre 2025",
    title: "Veneto Cup — ritorno",
    city: "Chioggia",
    venue: "Stadio Aldo e Dino Ballarin",
    teams: "Nazionale Cantanti vs Nazionale Sindaci",
    result: "10-2 per Nazionale Cantanti",
    purpose: "Oltre 10.000 € raccolti per \"La Bottega dei Talenti\".",
  },
  {
    date: "21 marzo 2026",
    title: "Luca con Noi",
    city: "Limbiate",
    venue: "Centro Sportivo Comunale",
    teams: "Triangolare: Nazionale Cantanti, Nazionale Magistrati, Amici di Luca",
    result: "Evento commemorativo",
    purpose: "In memoria dell'ambasciatore Luca Attanasio.",
  },
  {
    date: "9 aprile 2026",
    title: "Partita del Dono",
    city: "Forlì",
    venue: "Stadio Tullo Morgagni",
    teams: "Nazionale Cantanti vs Team Silver 1974",
    result: "Incasso 12.000 €",
    purpose: "Fondi destinati ad AVIS, ADMO e AIDO.",
  },
  {
    date: "27 maggio 2026",
    title: "Partita del Cuore \"Nella Mia Città\"",
    city: "Lagonegro",
    venue: "Stadio G. Rossi",
    teams: "Nazionale Cantanti vs rappresentativa locale \"Nella Mia Città\"",
    result: "Incasso 11.400 €",
    purpose: "Evento in memoria di Pino Mango, con fondi a realtà locali.",
  },
  {
    date: "5 giugno 2026",
    title: "Formigine Batti Cuore",
    city: "Formigine",
    venue: "Stadio Franco Pincelli",
    teams: "Nazionale Cantanti vs Formigine Batti Cuore",
    result: "Raccolta fondi oltre 8.000 / 10.000 €",
    purpose:
      "Evento benefico per AVAP Formigine; Moreno Donadoni diventa capocannoniere assoluto NIC.",
  },
  {
    date: "6 giugno 2026",
    title: "Un Dono per la Vita",
    city: "Viadana",
    venue: "Stadio Luigi Zaffanella",
    teams: "Nazionale Cantanti vs U.S.V. Il Grande Cuore di Viadana",
    result: "Circa 3.300 spettatori",
    purpose: "Incasso destinato ad A.O.T. AVIS Viadana.",
  },
  {
    date: "14 giugno 2026",
    title: "Triangolare Mondiale",
    city: "Desenzano del Garda",
    venue: "Stadio Tre Stelle - Francesco Ghizzi",
    teams: "Nazionale Cantanti, Nazionale Manager, Boom Friends",
    result: "Evento solidale",
    purpose:
      "Sostegno all'assistenza trasfusionale domiciliare per pazienti fragili oncoematologici.",
  },
];
