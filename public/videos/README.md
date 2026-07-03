# Cartella video — da completare con file reali del cliente

Il sito è già pronto per usare video di sfondo, ma **non sono stati inseriti
video inventati o presi da terzi**. Finché questi file non esistono, ogni
sezione mostra automaticamente una **foto reale** dell'archivio storico
(fallback elegante, con zoom lento e overlay): il sito è completo e professionale
anche senza i video.

Quando il cliente fornirà i video reali (girati o di proprietà della Nazionale
Italiana Cantanti), basta inserirli qui con **esattamente questi nomi** e si
attiveranno da soli, senza toccare il codice:

| File da inserire                     | Dove appare              | Contenuto consigliato                          |
| ------------------------------------ | ------------------------ | ---------------------------------------------- |
| `hero-nazionale-cantanti.mp4`        | Sfondo della hero        | Montaggio breve: campo, pubblico, musica, gol  |
| `solidarieta.mp4`                    | Sezione "La nostra missione" | Momenti di solidarietà, donazioni, sorrisi |
| `eventi-benefici.mp4`                | Storytelling + CTA finale | Atmosfera da evento: stadio, luci, applausi    |

## Requisiti tecnici dei file (importante per le performance)

- Formato: **MP4 (H.264)**, in più anche `.webm` se possibile (più leggero).
- Durata: **8–15 secondi**, pensati per andare in **loop**.
- Niente audio (vengono riprodotti **muti**): si può rimuovere la traccia audio.
- Risoluzione consigliata: **1920×1080**, peso target **sotto i 3–4 MB** per file
  (comprimere con HandBrake o simili). Più sono leggeri, più il sito resta veloce.
- I video partono solo quando il file è caricato e **mai** se l'utente ha attivato
  "riduci animazioni" nel sistema: in quel caso resta sempre la foto.
