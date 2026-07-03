// Organigramma: contenuto reale da /organigramma/ (pagina datata 2023-03-27).
// Squadra: elenco reale da /la-squadra/ (pagina datata 2022-02-09).
// TODO_VERIFY: entrambe le pagine sono ferme da anni sul sito attuale, da
// far riconfermare/aggiornare dal cliente prima della pubblicazione.

export type StaffMember = {
  name: string;
  role: string;
};

export const staff: StaffMember[] = [
  { name: "Enrico Ruggeri", role: "Presidente" },
  { name: "Gianluca Pecchini", role: "Direttore Generale" },
  { name: "Nicola Penta", role: "Direttore Organizzativo P.D.C." },
  { name: "Marco Masini", role: "Direttore Tecnico" },
  { name: "Alfredo Tognetti / Sandro Giacobbe", role: "Staff Tecnico" },
  { name: "Marina Erminetti", role: "Segreteria Generale" },
  { name: "Daniela Turchetti", role: "Comunicazione" },
  { name: "Marco Conte", role: "Ticketing" },
  { name: "Giuseppe Capua", role: "Medico Sportivo" },
  { name: "Titti Quaggia", role: "Responsabile Istituzioni" },
  { name: "Paolo Vallesi", role: "Label Manager NIC United" },
  { name: "Gianni Gaudenzi", role: "Creative Video Maker" },
  { name: "Giulia Sacchetti", role: "Video Maker" },
  { name: "Alessandro Rossini", role: "Event, Food & Beverage Specialist" },
  { name: "Alfredo Ronny Ferretti", role: "Responsabile Logistica e Materiale Tecnico" },
  { name: "Flavio Stefanelli", role: "Assistente Responsabile Mezzi NIC" },
  { name: "Renato Moro", role: "Sicurezza" },
  { name: "Luca Lombardi", role: "Fisioterapista" },
  { name: "Ege Eventi", role: "Agenzia Sponsorship" },
];

// Foto reali dei giocatori scaricate dalla pagina /la-squadra/ del sito attuale
// (sono foto già pubbliche dell'associazione stessa). Ogni nome ha la sua foto.
export type Player = {
  name: string;
  photo: string;
};

export const players: Player[] = [
  { name: "Raoul Bova", photo: "/images/players/raoul-bova.jpg" },
  { name: "Gianni Morandi", photo: "/images/players/gianni-morandi.jpg" },
  { name: "Eros Ramazzotti", photo: "/images/players/eros-ramazzotti.jpg" },
  { name: "Paolo Belli", photo: "/images/players/paolo-belli.jpg" },
  { name: "Moreno", photo: "/images/players/moreno.jpg" },
  { name: "Enrico Ruggeri", photo: "/images/players/enrico-ruggeri.jpg" },
  { name: "Niccolò Fabi", photo: "/images/players/niccolo-fabi.jpg" },
  { name: "Luca Barbarossa", photo: "/images/players/luca-barbarossa.jpg" },
  { name: "Marco Masini", photo: "/images/players/marco-masini.jpg" },
  { name: "Mogol", photo: "/images/players/mogol.jpg" },
  { name: "Neffa", photo: "/images/players/neffa.jpg" },
  { name: "Neri Marcorè", photo: "/images/players/neri-marcore.jpg" },
  { name: "Fabrizio Moro", photo: "/images/players/fabrizio-moro.jpg" },
  { name: "Benji", photo: "/images/players/benji.jpg" },
  { name: "Fede", photo: "/images/players/fede.jpg" },
  { name: "Boosta (Subsonica)", photo: "/images/players/boosta.jpg" },
  { name: "Marco Ligabue", photo: "/images/players/marco-ligabue.jpg" },
  { name: "Pupo", photo: "/images/players/pupo.jpg" },
  { name: "Ermal Meta", photo: "/images/players/ermal-meta.jpg" },
  { name: "Clementino", photo: "/images/players/clementino.jpg" },
  { name: "Riccardo Fogli", photo: "/images/players/riccardo-fogli.jpg" },
  { name: "Briga", photo: "/images/players/briga.jpg" },
  { name: "Piero Barone (Il Volo)", photo: "/images/players/piero-barone.jpg" },
  { name: "Ignazio Boschetto (Il Volo)", photo: "/images/players/ignazio-boschetto.jpg" },
  { name: "Gianluca Ginoble (Il Volo)", photo: "/images/players/gianluca-ginoble.jpg" },
  { name: "Paolo Vallesi", photo: "/images/players/paolo-vallesi.jpg" },
  { name: "Tommaso Cerasuolo (Perturbazione)", photo: "/images/players/tommaso-cerasuolo.jpg" },
  { name: "Pierdavide Carone", photo: "/images/players/pierdavide-carone.jpg" },
  { name: "Rocco Hunt", photo: "/images/players/rocco-hunt.jpg" },
  { name: "Antonio Mezzancella", photo: "/images/players/antonio-mezzancella.jpg" },
  { name: "Gigi D'Alessio", photo: "/images/players/gigi-dalessio.jpg" },
  { name: "Antonio Maggio", photo: "/images/players/antonio-maggio.jpg" },
  { name: "Marco Morandi", photo: "/images/players/marco-morandi.jpg" },
  { name: "Marco Filadelfia", photo: "/images/players/marco-filadelfia.jpg" },
  { name: "Francesco Guasti", photo: "/images/players/francesco-guasti.jpg" },
  { name: "Daniele Incicco (La Rua)", photo: "/images/players/daniele-incicco.jpg" },
  { name: "Andrea Maestrelli", photo: "/images/players/andrea-maestrelli.jpg" },
  { name: "Vincenzo Capua", photo: "/images/players/vincenzo-capua.jpg" },
  { name: "Gino Latino", photo: "/images/players/gino-latino.jpg" },
  { name: "Virginio", photo: "/images/players/virginio.jpg" },
];
