# QA Report — Nazionale Cantanti "10k"

Data: 2026-07-03

## Verifiche automatiche
- `npm run build`: ✅ compila, TypeScript pulito. 18 route (statiche + SSG per eventi/news).
- `npm run lint`: ✅ zero errori, zero warning.
- `npm test` (Vitest): ✅ 14/14 test passati.

## Disciplina dati (niente dati inventati)
- Marcatori `TODO_CLIENTE`/`TODO_VERIFY`: 14 occorrenze, **tutte in commenti o file dati**, mai renderizzate nel markup (verificato via grep su `src/app` e `src/components`).
- Nessun link di donazione inventato: `donationChannels.primaryCtaUrl === null` → la pagina Dona rimanda all'email verificata invece di un URL finto.
- 5×1000: codice fiscale reale attribuito all'ente partner corretto (Umanità senza Confini Onlus, 97399940150), non alla Nazionale.
- Statistiche storiche: "647 incontri in 42 anni" sempre accompagnato dall'anno-fonte 2023 (mai spacciato per dato corrente).
- Importi economici non dichiarati → resi come "Dato da confermare".
- Immagini: le edizioni storiche / eventi / news senza foto reale mostrano pannelli neutri, mai foto generiche su date precise. Loghi partner assenti → nomi testuali.
- Test di guardia automatico: `src/data/integrity.test.ts`.

## Verifica visiva (preview, porta 3020)
- Home: intro tunnel, smooth-scroll Lenis, hero cinetico con particelle, transizioni tunnel, climax oro, footer. Zero errori console.
- La Squadra: PageHero + rosa (40 foto reali) + organigramma. ✅
- Dona: CTA oro + FAQ accordion (apre/chiude, accessibile). ✅
- Impatto: numeri con nota trasparenza. ✅ (verificato anche mobile 375px)
- Footer: indirizzo reale Milano, email, social reali, legali. Nessun telefono inventato.

## Accessibilità / motion
- `prefers-reduced-motion` rispettato: intro saltata, Lenis disattivato, animazioni ridotte, contatori mostrano il valore finale, particelle disattivate.
- Skip link, focus-visible, aria su menu/FAQ/lightbox, nav da tastiera (ESC su menu e lightbox).

## SEO
- `sitemap.xml` e `robots.txt` generati; JSON-LD `SportsOrganization` con soli dati reali.
- `metadata` per pagina (title/description).

## Ancora da fare (fuori dal controllo del codice)
- **Validazione incrociata con Codex** (richiesta dall'utente): passare il diff/cartella a Codex per una seconda revisione indipendente su (a) dati inventati sfuggiti, (b) accessibilità, (c) fatti vs `src/data`. Da eseguire dall'utente.
- **Lighthouse**: eseguire su build di produzione (`npm run build && npm start`) e annotare i punteggi (target Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95).
- Conferme cliente: link donazione reale, loghi partner, video, testo legale completo, aggiornamento stat post-2023, provider newsletter.
