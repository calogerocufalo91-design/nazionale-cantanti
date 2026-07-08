# Visual stadi — La Mappa del Cuore

Questa cartella contiene i **visual editoriali** usati dalla card della
**Mappa del Cuore** in home e in `/archivio-partite`.

I file `visual-*.svg` sono **rappresentazioni editoriali originali**
(SVG generativi), **non fotografie reali**. Sono composizioni astratte in stile
"poster sportivo notturno" — bacino stadio in prospettiva, fasci di luce dei
fari, bagliori oro/blu, grana sottile, un tema diverso per ogni città. **Non**
riproducono in modo realistico stadi, monumenti, sponsor, loghi o persone e
**non devono mai essere presentati come foto ufficiali**.

Se in futuro arriveranno **foto reali autorizzate** per una città, il sistema
è già pronto a mostrarle al posto del visual generativo (vedi §4).

---

## ⚠️ Regole copyright (importantissime)

**NON usare mai**:
- foto scaricate da Google, Google Maps, Google Street View;
- foto prese da Instagram, Facebook, Twitter/X, TikTok o altri social;
- foto prese da giornali, siti sportivi, Wikipedia, Football Ground Map,
  Europlan, StadiumDB, o siti terzi senza licenza esplicita compatibile;
- scraping automatico da siti terzi;
- foto con persone riconoscibili senza liberatoria;
- rendering/AI che imitino stadi reali riconoscibili spacciandoli per veri;
- loghi ufficiali di squadre, comuni, stadi o sponsor;
- stemmi comunali o simboli protetti.

**Si possono usare**:
- foto scattate da noi o dai fotografi della Nazionale Cantanti;
- foto **ufficiali** ricevute dalla società/comune/stadio con autorizzazione
  scritta;
- foto con licenza compatibile (es. Wikimedia Commons con CC-BY o CC-BY-SA —
  sempre indicando autore e licenza);
- immagini di dominio pubblico verificato;
- **visual generativi originali** creati da noi (SVG in questa cartella).

Segnare sempre credito e licenza nel dataset (`imageCredit`, `imageLicense`).

---

## 1) Visual generativi (default)

Nomenclatura file:

```
visual-<slug-città>.svg
```

Visual già presenti in questa cartella:

- `visual-roma.svg`
- `visual-torino.svg`
- `visual-verona.svg`
- `visual-firenze.svg`
- `visual-palermo.svg`
- `visual-napoli.svg`
- `visual-milano.svg`
- `visual-genova.svg`
- `visual-bologna.svg`
- `visual-cagliari.svg`
- `visual-laquila.svg` (per **L'Aquila**)
- `visual-pontremoli.svg`

Per le città non elencate qui, la card mostra automaticamente
`placeholder-stadio.svg` come visual istituzionale generico.

Badge mostrato sulla card: **"Visual editoriale"**.
Testo: *"Rappresentazione editoriale non fotografica."*

Non chiamare mai questi visual "foto ufficiale", "foto reale" o "fotografia
dello stadio". Usare solo: *visual editoriale*, *rappresentazione editoriale*,
*rappresentazione non fotografica*, *visual originale*.

## 2) Aggiungere un nuovo visual generativo

1. Crea un SVG originale coerente con lo stile (blueprint navy, accento oro,
   niente persone/loghi/sponsor). Vedi come base i visual già presenti.
2. Salvalo qui come `visual-<slug>.svg`.
3. In `src/lib/archivio-view.ts` aggiungi il nome città alla costante
   `VISUAL_DEDICATI`. Da quel momento la card userà il tuo visual.

## 3) Foto reali autorizzate (opzionale, futuro)

Cartella: **`public/images/stadi/`**

Convenzione nome file: **`stadio-<slug-città>.jpg`** (o `.webp`).

Slug: minuscolo, senza accenti/apostrofi, spazi come trattini.

| Città              | Nome file                        |
|--------------------|----------------------------------|
| Roma               | `stadio-roma.jpg`                |
| Torino             | `stadio-torino.jpg`              |
| Verona             | `stadio-verona.jpg`              |
| Firenze            | `stadio-firenze.jpg`             |
| Palermo            | `stadio-palermo.jpg`             |
| Napoli             | `stadio-napoli.jpg`              |
| Milano             | `stadio-milano.jpg`              |
| Genova             | `stadio-genova.jpg`              |
| Bologna            | `stadio-bologna.jpg`             |
| Cagliari           | `stadio-cagliari.jpg`            |
| L'Aquila           | `stadio-laquila.jpg`             |
| Pontremoli         | `stadio-pontremoli.jpg`          |
| Reggio Calabria    | `stadio-reggio-calabria.jpg`     |
| Reggio Emilia      | `stadio-reggio-emilia.jpg`       |
| Desenzano del Garda| `stadio-desenzano-del-garda.jpg` |

Formato tecnico consigliato:
- **Ratio**: 16:10 (la card ha ritaglio 16:10)
- **Dimensioni**: `1600×1000` px o `1200×750` px
- **Formato**: `.jpg` o `.webp`
- **Peso**: **300–500 KB** (idealmente ≤ 300 KB)
- **Contenuto**: veduta panoramica dello stadio, senza persone riconoscibili
  e senza loghi sponsor invadenti; mood cinematografico, meglio con luci.

## 4) Attivare la foto reale nel codice

Aperto **`src/lib/archivio-view.ts`**, trova `STADIO_IMMAGINI` e aggiungi
la voce per la città:

```ts
export const STADIO_IMMAGINI: Record<
  string,
  { status: "licensed"; credit?: string; license?: string }
> = {
  "Roma":   { status: "licensed", credit: "© Mario Rossi",    license: "Uso concesso NIC 2026" },
  "Torino": { status: "licensed", credit: "© Foto Autore",    license: "CC BY-SA 4.0" },
};
```

Dal riavvio la card mostrerà:
- la **foto reale** via `next/image`;
- il badge **"Foto ufficiale"** in oro;
- credito e licenza in piccolo sotto la card.

Se il file dovesse mancare o non caricare, la card **torna automaticamente**
al visual generativo (e a `placeholder-stadio.svg` come ultima rete di
sicurezza) senza icona rotta e senza errori console.

## 4-bis) Struttura dati della card (per città)

La card della Mappa legge, per ogni città, un record con questa forma
(prodotto da `stadioInfo()` in `src/lib/archivio-view.ts`):

```ts
{
  city: "Torino",
  slug: "torino",
  stadiumName: "Stadio Olimpico",
  matchesCount: 6,
  latestYear: 2021,
  events: [/* … */],
  imageUrl: "",                                  // valorizzato SOLO se licensed
  visualUrl: "/images/stadi/visual-torino.svg",  // sempre presente (fallback)
  imageAlt: "Visual editoriale originale ispirato all'atmosfera di uno stadio a Torino",
  visualStatus: "generated",                     // "generated" | "licensed"
  visualLabel: "Visual editoriale",              // "Foto ufficiale" se licensed
  imageCredit: "",
  imageLicense: "",
}
```

Regole applicate:

- `visualStatus: "generated"` → visual editoriale originale. Badge
  **"Visual editoriale"**, nota **"Rappresentazione editoriale non fotografica."**
- `visualStatus: "licensed"` → foto reale autorizzata. Badge **"Foto ufficiale"**,
  mostra **credito** e **licenza**.
- Catena di fallback anti-immagine-rotta: foto `licensed` → se non carica usa
  `visualUrl` → se non carica usa `placeholder-stadio.svg`. Mai icona rotta,
  mai errore in console.

Esempio del passaggio da `generated` a `licensed`:

```ts
{
  imageUrl: "/images/stadi/stadio-roma.jpg",
  visualStatus: "licensed",
  visualLabel: "Foto ufficiale",
  imageCredit: "© Nome fotografo / Ente",
  imageLicense: "Usata con autorizzazione",
}
```

## 5) Esempi di credito ben scritto

- `© 2026 Mario Rossi — Nazionale Italiana Cantanti`
- `Foto: Comune di L'Aquila, uso concesso NIC 2026`
- `Wikimedia Commons — autore: XYZ — CC BY-SA 4.0`

---

## File in questa cartella

- `placeholder-stadio.svg` — visual istituzionale generico di fallback
  (blueprint stadio navy/oro). **Non cancellare.**
- `visual-*.svg` — visual generativi originali per le città principali.
- `README.md` — questo file.
- `stadio-<slug>.jpg` — le foto reali autorizzate che aggiungerai tu (opzionale).
