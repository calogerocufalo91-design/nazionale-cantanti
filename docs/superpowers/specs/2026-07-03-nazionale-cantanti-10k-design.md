# Nazionale Italiana Cantanti — Nuovo sito "da 10k" — Design

Data: 2026-07-03
Stato: in attesa di approvazione utente

## 1. Obiettivo

Ricostruire da zero il sito di **nazionalecantanti.it** con un livello di design e cura
"premium" (valore percepito ~10.000 €). Il committente è un'associazione importante
(cantanti noti), quindi la priorità assoluta non è la quantità ma **l'affidabilità dei
contenuti** e un'identità visiva forte e coerente.

### Gerarchia degli obiettivi (bilanciati, in quest'ordine di incontro visivo)
1. **Emozione / storia** — l'anima che tiene insieme tutto (la home cattura).
2. **Donazioni / 5×1000** — il gesto da far compiere, sempre a portata di clic.
3. **Eventi / partite** — ciò che tiene il sito vivo e aggiornato.
4. **Partner / sponsor** — spazio curato per fare colpo sulle aziende.

## 2. Regola d'oro: niente dati inventati

Disciplina non negoziabile (confermata dall'utente e già applicata nel progetto originale):
- Ogni numero, data, immagine, logo o link **o** proviene dai file dati reali **o** è
  marcato `TODO_VERIFY` / `TODO_CLIENTE` e **non viene pubblicato** finché il cliente non
  conferma.
- Nessuna foto generica accostata a una data precisa (fuorviante).
- Due claim dell'audit originale sono stati SMENTITI dall'utente e NON vanno reintrodotti:
  "bottone Dona ora rotto" e "titoli duplicati".

## 3. Stack e collocazione

- **Nuovo progetto** in `C:\Users\kalos\.claude\sessions\nazionale-cantanti`
  (cartella pulita, sibling agli altri progetti di sessione).
- Stack: **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Framer Motion**
  (stesso stack collaudato degli altri progetti dell'utente).
- Font via `next/font/google` (self-hosted, zero layout shift).
- **Riuso dei contenuti reali** dal progetto originale
  `C:\Users\kalos\Desktop\nazionale-cantanti-nuovo-sito`:
  - `src/data/*.ts` (site, team, history, projects, events, news, partners, gallery,
    videos, donation, media) — già verificati e documentati.
  - `public/images/{players(40), news(11), events, gallery, logo}` — foto reali.
  - Si riparte da zero SOLO su design, struttura componenti e layout; i dati/asset reali
    si copiano così come sono.

## 4. Design system — "Cinema + Azzurro"

Pattern (da UI/UX skill): **Scroll-Triggered Storytelling** — la home è un racconto a
capitoli che si rivelano allo scroll, ciascuno con una micro-CTA; climax finale = donazione.

### Colori (token CSS)
| Token | Hex | Uso |
|-------|-----|-----|
| `--notte` | `#0B1D2E` | base scura cinematografica (hero, sezioni immersive) |
| `--azzurro` | `#0072BB` | identità primaria (accenti, link, dettagli) |
| `--azzurro-chiaro` | `#4FA9E0` | kicker/etichette su fondo scuro |
| `--oro` | `#E8B23A` | **riservato al "Dona"** e ai CTA di donazione |
| `--carta` | `#F5F2EC` | sezioni chiare/di lettura |
| `--nebbia` | `#D8DCE0` | superfici neutre chiare, bordi |
| testo su scuro | `#FFFFFF` / `#DCE6EE` | titoli / testo secondario |

Regola: l'**oro** compare solo dove si dona, così la donazione salta sempre all'occhio.
Contrasto testo ≥ 4.5:1 ovunque.

### Tipografia
- **Libre Bodoni** (serif) — titoli emozionali (cinema).
- **Public Sans** (sans) — corpo del testo (leggibilità).
- **Barlow Condensed** — numeri e statistiche giganti, kicker (sport).

### Movimento
- Ken Burns lento sulle foto hero.
- Reveal allo scroll: **max 1–2 elementi per schermata** (no "tutto si muove").
- Parallax leggero, `scroll-behavior: smooth`, indicatore di avanzamento del racconto.
- **`prefers-reduced-motion: reduce` rispettato**: niente scroll-jacking, animazioni
  disattivate/ridotte. (La skill lo marca come criticità ad alta severità.)

## 5. Mappa del sito

Tutte le 16 pagine attuali + 1 nuova (Impatto), con Partner e Dona potenziate.

**Menu principale:** Home · La Storia · La Squadra · Eventi · News · Progetti · Partner · Contatti
**Conversione:** Dona ora · 5×1000 · Impatto (nuova)
**Altre:** Gallery · Stampa
**Footer legale:** Privacy Policy · Contributi ed erogazioni pubbliche
**Route dinamiche:** `/eventi/[slug]`, `/news/[slug]`

Miglioramenti mirati:
- **Impatto/Trasparenza** (nuova): dove vanno i fondi + numeri reali (`TODO_CLIENTE`).
  Arma principale per la fiducia → donazioni.
- **Partner** potenziata: da semplice elenco loghi a vera vetrina che "vende" la
  partnership (pubblico, visibilità, valori).
- **FAQ / Come aiutare**: sezione dentro la pagina Dona (dubbi su donazione e 5×1000).
- **Newsletter**: blocco d'iscrizione nel footer; strumento email da collegare dopo
  (`TODO_CLIENTE`: scelta del servizio). Nessuna dipendenza esterna attiva ora.

## 6. Struttura della Home (10 capitoli)

1. **Hero** — foto reale full-screen + Ken Burns; kicker "dal 1981"; titolo serif;
   CTA `Dona ora` (oro) + `Scopri la storia` (ghost). Fallback: se manca il video, foto reale.
2. **Manifesto** — 1–2 frasi sulla missione (dal `site.mission` reale), grande, emozionale.
3. **I numeri** — Barlow Condensed giganti: anni, incontri (647/42 anni, dato 2023 →
   `TODO_VERIFY`), artisti, raccolto (`TODO_CLIENTE`). Contatore animato.
4. **La storia in breve** — timeline che scorre → `/la-storia`.
5. **La squadra** — anteprima volti (40 foto reali) → `/la-squadra`.
6. **Prossimo evento** — Partita del Cuore 2026 (13/07, L'Aquila, Rai 1, Croce Rossa) → `/eventi`.
7. **Progetti / Impatto** — dove va l'aiuto (NIC United, chitarre Eko…) → `/impatto`.
8. **Partner** — carosello loghi (loghi reali `TODO_CLIENTE`; finché assenti, nome testuale).
9. **Climax: Dona** — sezione finale forte in oro che chiude il racconto → `/dona-ora`.
10. **Footer** — newsletter, social reali (IG `nazionale_cantanti`, FB `NazCantanti`),
    contatti (Milano, `info@nazionalecantanti.it`; telefono assente → nessun numero inventato),
    link legali.

## 7. Architettura componenti (unità piccole e isolate)

Ogni componente ha uno scopo unico, interfaccia chiara, testabile da solo:
- **Layout:** `Header` (nav + menu mobile), `Footer`, `Container`, `SkipLink`,
  `ScrollProgress`.
- **Primitive di movimento:** `ScrollReveal`, `KenBurnsImage`, `ParallaxBlock`,
  `AnimatedCounter`, `MagneticButton` — tutte con guardia `prefers-reduced-motion`.
- **Contenuto:** `Hero`, `SectionTitle`, `Timeline`, `PlayerGrid`/`PlayerCard`,
  `EventCard`, `NewsCard`, `PartnerCarousel`, `ImpactStats`, `DonationCTA`, `FAQAccordion`,
  `NewsletterForm`, `GalleryLightbox`.
- **Dati:** un file per dominio in `src/data/` (riuso dall'originale). I componenti non
  inventano dati: leggono solo da qui. I campi immagine opzionali assenti → segnaposto neutro.

## 8. SEO, accessibilità, performance

- `metadata` per pagina, `sitemap.ts`, `robots.ts`, dati strutturati JSON-LD
  (Organization / SportsTeam) solo con dati reali.
- Immagini via `next/image` (WebP, lazy, `sizes`), spazio riservato (no layout shift).
- Alt text descrittivi; focus states visibili; nav da tastiera; label sui form; contrasto ≥4.5:1.
- Target responsive: 375 / 768 / 1024 / 1440 px.

## 9. Criteri di validazione (definiti PRIMA di costruire)

Il lavoro è "fatto" solo se, con prove alla mano:
1. `next build` e `eslint` **puliti** (zero errori, zero warning).
2. **Lighthouse (mobile):** Performance ≥ 90, Accessibilità ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
3. **Zero dati inventati:** ogni numero/immagine/link è nei dati reali oppure marcato
   `TODO_CLIENTE`/`TODO_VERIFY` e non pubblicato. Verifica con grep dei marcatori.
4. **Responsive** verificato a 375/768/1024/1440 (screenshot di prova).
5. **`prefers-reduced-motion`** rispettato (nessuna animazione forzata).
6. **Validazione incrociata (build complessa):** l'output finale viene fatto rivedere da
   **Codex**; eventuali discrepanze tra i due sistemi vengono risolte prima della consegna.
7. **Ancoraggio a fonte esterna reale:** i fatti chiave (fondazione 1981, organigramma,
   prossimo evento, statistiche) restano ancorati ai dati estratti dal sito live /
   documentati nei file `src/data`, non a memoria del modello.

## 10. Fuori scope (rimandato)

- Collegamento reale del servizio newsletter (UI pronta, integrazione dopo).
- Link donazione esterno definitivo (TrustMeUp o altro) → attende conferma cliente.
- Loghi partner in SVG/PNG con licenza → attende fornitura cliente.
- Video di sfondo reali → placeholder documentati, fallback foto reale.
- Deploy (Vercel + dominio) → fase separata dopo l'approvazione dei contenuti.
