// Foto storiche reali, scaricate dal sito attuale (wp-content/uploads, marzo 2020)
// e riospitate qui. Didascalie reali riprese dagli "alt" già presenti sul sito,
// con correzione dei soli errori di battitura (es. "Jacson" -> "Jackson").
// Le foto dell'archivio che sul sito attuale hanno alt="" (vuoto) NON sono state
// riprodotte qui: non essendo identificabile con certezza il soggetto, è stato
// preferito ometterle piuttosto che inventare una didascalia. Vanno integrate
// dal cliente con didascalie reali.

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/morandi-perez-arafat.png", alt: "Gianni Morandi con Shimon Peres e Yasser Arafat (2000)" },
  { src: "/images/gallery/ramazzotti-pele-schumacher.jpg", alt: "Eros Ramazzotti con Pelé e Michael Schumacher" },
  { src: "/images/gallery/morandi-arafat-ciampi-perez-schumacher.png", alt: "Gianni Morandi con Yasser Arafat, il Presidente Ciampi, Peres e Schumacher" },
  { src: "/images/gallery/ramazzotti-ligabue.jpg", alt: "Eros Ramazzotti con Luciano Ligabue" },
  { src: "/images/gallery/morandi-lippi.jpg", alt: "Gianni Morandi con Marcello Lippi" },
  { src: "/images/gallery/morandi-zico.jpg", alt: "Gianni Morandi con Zico" },
  { src: "/images/gallery/ruggeri-pavarotti.jpg", alt: "Enrico Ruggeri con Luciano Pavarotti" },
  { src: "/images/gallery/zucchero-cremonini.jpg", alt: "Zucchero con Cesare Cremonini" },
  { src: "/images/gallery/ligabue-liza-minnelli.png", alt: "Luciano Ligabue con Liza Minnelli" },
  { src: "/images/gallery/sting-maglia-nic.png", alt: "Sting con la maglia della Nazionale Italiana Cantanti" },
  { src: "/images/gallery/dalla-mengoli.png", alt: "Lucio Dalla con Paolo Mengoli" },
  { src: "/images/gallery/ramazzotti-belli-pantani.png", alt: "Eros Ramazzotti e Paolo Belli con Marco Pantani" },
  { src: "/images/gallery/platini-totti.jpg", alt: "Michel Platini e Francesco Totti" },
];
