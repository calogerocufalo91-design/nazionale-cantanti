// Video reali della Nazionale Italiana Cantanti.
// L'unico video effettivamente presente sulla homepage del sito attuale (fetch
// 26/06/2026) è quello con ID YouTube "x6K3_vCbwLc": è quindi l'unico inserito qui.
// La copertina è la miniatura ufficiale del video, scaricata e ospitata in locale
// (niente richiesta a YouTube finché l'utente non clicca: più veloce e più privacy).
//
// TODO_CLIENTE: per arricchire la sezione video bastano altri ID di video reali
// del canale YouTube ufficiale della Nazionale Cantanti. Aggiungere altre voci a
// questo array con lo stesso formato e scaricare la relativa miniatura in
// public/images/video/<id>.jpg. NON inserire ID non verificati.

export type VideoItem = {
  youtubeId: string;
  title: string;
  poster: string;
};

export const videos: VideoItem[] = [
  {
    youtubeId: "x6K3_vCbwLc",
    title: "Nazionale Italiana Cantanti — Il video ufficiale",
    poster: "/images/video/x6K3_vCbwLc.jpg",
  },
];
