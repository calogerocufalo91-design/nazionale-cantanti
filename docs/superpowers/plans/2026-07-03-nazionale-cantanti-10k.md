# Nazionale Cantanti "10k" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ricostruire da zero il sito della Nazionale Italiana Cantanti con design premium "Cinema + Azzurro", riusando solo contenuti/foto reali.

**Architecture:** Next.js 16 App Router, componenti piccoli e isolati. Un file dati per dominio (riuso), letti da componenti "presentazionali" che non inventano mai dati. Home a capitoli con reveal allo scroll; primitive di movimento tutte protette da `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, next/font/google, Vitest + Testing Library (unit/smoke), Playwright opzionale (non richiesto).

## Global Constraints

- Progetto in `C:\Users\kalos\.claude\sessions\nazionale-cantanti`. Tutti i path sotto sono relativi a questa root.
- Node/Next: Next.js `16.x`, React `19.x`, Tailwind `v4`, Framer Motion `12.x`.
- **Zero dati inventati.** Ogni numero/data/immagine/logo/link o proviene da `src/data/*` oppure è marcato `TODO_VERIFY`/`TODO_CLIENTE` e NON reso come dato pubblicato. Nessuna foto generica accostata a data precisa.
- **Non reintrodurre** i due falsi bug smentiti: "bottone Dona ora rotto", "titoli duplicati".
- Palette token (CSS vars in `globals.css`): `--notte #0B1D2E`, `--azzurro #0072BB`, `--azzurro-chiaro #4FA9E0`, `--oro #E8B23A`, `--carta #F5F2EC`, `--nebbia #D8DCE0`. **Oro solo per CTA di donazione.**
- Font: `Libre Bodoni` (serif/titoli), `Public Sans` (sans/corpo), `Barlow Condensed` (numeri/kicker).
- Movimento: max 1–2 elementi animati per schermata; ogni animazione rispetta `prefers-reduced-motion: reduce`; `scroll-behavior: smooth`.
- Copy in italiano. Contrasto testo ≥ 4.5:1. Responsive target: 375 / 768 / 1024 / 1440 px.
- Commit frequenti, uno per task. Messaggi in italiano, prefisso convenzionale (`feat:`, `chore:`, `docs:`, `test:`).

---

## File Structure

```
nazionale-cantanti/
├── package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs
├── vitest.config.ts, vitest.setup.ts
├── public/images/{players,news,events,gallery,video}, logo.png, logo-icon.png   (copiati dal vecchio)
├── public/videos/README.md                                                       (placeholder documentati)
├── src/data/*.ts            (11 file, copiati verbatim dal vecchio progetto)
├── src/lib/
│   ├── utils.ts             (cn: clsx + tailwind-merge)
│   └── motion.ts            (variants + hook useReducedMotion wrapper)
├── src/app/
│   ├── layout.tsx           (font, header, footer, skip link, metadata base)
│   ├── globals.css          (token, base, utilities)
│   ├── template.tsx         (transizione pagina)
│   ├── page.tsx             (Home)
│   ├── robots.ts, sitemap.ts
│   ├── la-storia/, la-squadra/, eventi/, eventi/[slug]/, news/, news/[slug]/,
│   │   progetti/, impatto/, partner/, gallery/, stampa/, contatti/,
│   │   dona-ora/, 5x1000/, contributi-pubblici/, privacy-policy/
├── src/components/
│   ├── layout/   Header, MobileMenu, Footer, Container, SkipLink, ScrollProgress
│   ├── motion/   ScrollReveal, KenBurnsImage, ParallaxBlock, AnimatedCounter, MagneticButton
│   ├── ui/       SectionTitle, Kicker, Button
│   ├── home/     Hero, Manifesto, StatsBand, HistoryPreview, SquadPreview,
│   │             NextEvent, ImpactPreview, PartnersStrip, DonateClimax
│   └── content/  Timeline, PlayerGrid, PlayerCard, EventCard, NewsCard,
│                 PartnerCarousel, ImpactStats, DonationCTA, FAQAccordion,
│                 NewsletterForm, GalleryLightbox, StaffList, Breadcrumbs, PageHero
```

---

## Phase 0 — Scaffolding & foundation

### Task 0.1: Inizializza il progetto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: progetto Next.js 16 che builda e serve una home vuota.

- [ ] **Step 1: Scaffolding**

Nella root del progetto (già esiste con `docs/` e `.git`), eseguire:
```bash
cd "C:/Users/kalos/.claude/sessions/nazionale-cantanti"
npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir --no-import-alias --use-npm --turbopack
```
Rispondere "No" a sovrascrivere se chiede (la cartella ha già `docs/`/`.git`; mantenerli).

- [ ] **Step 2: Aggiungi le dipendenze**

```bash
npm install framer-motion clsx tailwind-merge
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Verifica build**

Run: `npm run build`
Expected: build completa senza errori.

- [ ] **Step 4: Configura `next.config.ts`** (turbopack root, niente remote images: sono locali)

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffolding Next.js 16 + dipendenze"
```

### Task 0.2: Setup test runner (Vitest)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `src/lib/__tests__/smoke.test.ts`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: comando `npm test` funzionante, usato da tutti i task successivi.

- [ ] **Step 1: `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
});
```

- [ ] **Step 2: `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: aggiungi script** in `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: test di fumo** `src/lib/__tests__/smoke.test.ts`

```ts
import { describe, it, expect } from "vitest";
describe("setup", () => { it("runs", () => { expect(1 + 1).toBe(2); }); });
```

- [ ] **Step 5: Run** `npm test` → Expected: 1 passed. **Commit** `chore: setup Vitest`.

---

## Phase 1 — Design system

### Task 1.1: Token, font e globals

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Produces: variabili CSS `--notte/--azzurro/--azzurro-chiaro/--oro/--carta/--nebbia`, classi font `font-serif/font-sans/font-cond`, util `cn()`.

- [ ] **Step 1: `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

- [ ] **Step 2: font in `layout.tsx`** (next/font/google)

```tsx
import { Libre_Bodoni, Public_Sans, Barlow_Condensed } from "next/font/google";
const serif = Libre_Bodoni({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-serif" });
const sans = Public_Sans({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-sans" });
const cond = Barlow_Condensed({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-cond" });
// applicare className={`${serif.variable} ${sans.variable} ${cond.variable}`} su <html>
```

- [ ] **Step 3: `globals.css`** — token + theme Tailwind v4

```css
@import "tailwindcss";
@theme {
  --color-notte: #0B1D2E;
  --color-azzurro: #0072BB;
  --color-azzurro-chiaro: #4FA9E0;
  --color-oro: #E8B23A;
  --color-carta: #F5F2EC;
  --color-nebbia: #D8DCE0;
  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-cond: var(--font-cond);
}
html { scroll-behavior: smooth; }
body { background: var(--color-carta); color: var(--color-notte); font-family: var(--font-sans); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 4: verifica** `npm run build` → OK. **Commit** `feat: design system (token, font, globals)`.

### Task 1.2: Primitive di movimento + guardia reduced-motion

**Files:**
- Create: `src/lib/motion.ts`, `src/components/motion/ScrollReveal.tsx`, `src/components/motion/__tests__/ScrollReveal.test.tsx`

**Interfaces:**
- Produces: `ScrollReveal` (wrapper reveal on-scroll), `fadeUp`/`stagger` variants. Consumato da tutte le sezioni.

- [ ] **Step 1: test** `ScrollReveal.test.tsx` — renderizza i children.

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollReveal } from "../ScrollReveal";
describe("ScrollReveal", () => {
  it("mostra i children", () => {
    render(<ScrollReveal><p>ciao</p></ScrollReveal>);
    expect(screen.getByText("ciao")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run** → FAIL (modulo assente).

- [ ] **Step 3: `src/lib/motion.ts`**

```ts
import type { Variants } from "framer-motion";
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } };
```

- [ ] **Step 4: `ScrollReveal.tsx`** (client component; `useReducedMotion` di framer-motion salta l'animazione)

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
export function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden"
      whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Run** `npm test` → PASS. **Commit** `feat: ScrollReveal + variants motion`.

### Task 1.3: KenBurnsImage, ParallaxBlock, AnimatedCounter, MagneticButton

**Files:**
- Create: `src/components/motion/KenBurnsImage.tsx`, `ParallaxBlock.tsx`, `AnimatedCounter.tsx`, `MagneticButton.tsx`
- Test: `src/components/motion/__tests__/AnimatedCounter.test.tsx`

**Interfaces:**
- Produces:
  - `KenBurnsImage({ src, alt, priority? })` — `next/image` fill + zoom lento (disattivo se reduced-motion).
  - `ParallaxBlock({ children, offset? })` — traslazione su scroll (identità se reduced-motion).
  - `AnimatedCounter({ to, suffix?, durationMs? })` — conta da 0 a `to`; se reduced-motion mostra `to` diretto.
  - `MagneticButton({ children, href, variant: "oro"|"ghost" })` — bottone con leggero magnetismo hover.

- [ ] **Step 1: test AnimatedCounter** — con reduced-motion mostra subito il numero finale.

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
vi.mock("framer-motion", async (o) => ({ ...(await o()), useReducedMotion: () => true }));
import { AnimatedCounter } from "../AnimatedCounter";
describe("AnimatedCounter", () => {
  it("con reduced-motion mostra il valore finale", () => {
    render(<AnimatedCounter to={647} />);
    expect(screen.getByText(/647/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: implementa i 4 componenti.** `AnimatedCounter` (esempio completo):

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useInView } from "framer-motion";
export function AnimatedCounter({ to, suffix = "", durationMs = 1500 }:
  { to: number; suffix?: string; durationMs?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, durationMs]);
  return <span ref={ref} className="font-cond tabular-nums">{n.toLocaleString("it-IT")}{suffix}</span>;
}
```

`KenBurnsImage`, `ParallaxBlock`, `MagneticButton`: stessa disciplina (client, guardia `useReducedMotion`, `next/image` con `fill` + `sizes` per KenBurns).

- [ ] **Step 4: Run** `npm test` → PASS. **Commit** `feat: primitive di movimento (KenBurns, Parallax, Counter, Magnetic)`.

---

## Phase 2 — Dati e asset reali

### Task 2.1: Copia dati e immagini reali dal progetto originale

**Files:**
- Create: `src/data/*.ts` (11 file), `public/images/**`, `public/videos/README.md`

**Interfaces:**
- Produces: tutti gli export dati (`site`, `nav`, `staff`, `players`, `historyStats`, `nextEvent`, `newsArticles`, `projects`, `partners`, `gallery`, `videos`, `donation`) disponibili con `@/data/...`.

- [ ] **Step 1: copia** (Git Bash)

```bash
SRC="C:/Users/kalos/Desktop/nazionale-cantanti-nuovo-sito"
DST="C:/Users/kalos/.claude/sessions/nazionale-cantanti"
cp "$SRC"/src/data/*.ts "$DST"/src/data/
mkdir -p "$DST"/public/images
cp -r "$SRC"/public/images/* "$DST"/public/images/
cp -r "$SRC"/public/videos "$DST"/public/ 2>/dev/null || true
```

- [ ] **Step 2: verifica import path** — i file dati usano import relativi/assoluti coerenti con `@/`. Correggere eventuali import interni.

- [ ] **Step 3: verifica** `npm run build` → OK (i dati non rompono nulla). **Commit** `chore: importa dati e immagini reali`.

### Task 2.2: Guardia "niente dati inventati" (test automatico)

**Files:**
- Create: `src/data/__tests__/integrity.test.ts`

**Interfaces:**
- Consumes: tutti i moduli dati.
- Produces: test che fallisce se un dato "pubblicabile" perde il suo marcatore o se compaiono valori palesemente placeholder non marcati.

- [ ] **Step 1: test** — verifica invarianti reali documentate.

```ts
import { describe, it, expect } from "vitest";
import { nextEvent } from "@/data/events";
import { historyStats } from "@/data/history";
import { site } from "@/data/site";
describe("integrità dati reali", () => {
  it("il prossimo evento ha i campi reali verificati", () => {
    expect(nextEvent.city).toBe("L'Aquila");
    expect(nextEvent.date).toMatch(/13 luglio 2026/);
  });
  it("le stat storiche conservano l'anno-fonte (no dato spacciato per 2026)", () => {
    expect(historyStats.lastVerified.sourceYear).toBe(2023);
  });
  it("nessun telefono inventato", () => { expect(site.phone).toBeNull(); });
});
```

- [ ] **Step 2: Run** `npm test` → PASS. **Commit** `test: guardia integrità dati reali`.

---

## Phase 3 — Layout shell

### Task 3.1: Container, SkipLink, ScrollProgress

**Files:**
- Create: `src/components/layout/Container.tsx`, `SkipLink.tsx`, `ScrollProgress.tsx`
- Test: `src/components/layout/__tests__/Container.test.tsx`

**Interfaces:**
- Produces: `Container({ children, className })` (max-w-6xl centrato, padding responsive), `SkipLink` (link "Salta al contenuto"), `ScrollProgress` (barra azzurra in alto, disattiva su reduced-motion).

- [ ] **Step 1: test Container** renderizza children con classe max-width.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: implementa** i 3 componenti.
- [ ] **Step 4: Run** `npm test` → PASS. **Commit** `feat: Container, SkipLink, ScrollProgress`.

### Task 3.2: Header + MobileMenu

**Files:**
- Create: `src/components/layout/Header.tsx`, `MobileMenu.tsx`
- Test: `src/components/layout/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `nav` da `@/data/site`.
- Produces: `Header` sticky trasparente→notte allo scroll, logo reale, nav desktop, CTA `Dona ora` (oro), hamburger→`MobileMenu` (drawer accessibile, focus trap, chiude su ESC).

- [ ] **Step 1: test** — Header mostra tutte le voci di `nav` e un link "Dona ora" con `href="/dona-ora"`.

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";
import { nav } from "@/data/site";
describe("Header", () => {
  it("mostra la nav e la CTA Dona", () => {
    render(<Header />);
    nav.forEach(i => expect(screen.getAllByText(i.label).length).toBeGreaterThan(0));
    expect(screen.getByRole("link", { name: /dona ora/i })).toHaveAttribute("href", "/dona-ora");
  });
});
```

- [ ] **Step 2: Run** → FAIL. **Step 3: implementa.** **Step 4: Run** → PASS. **Commit** `feat: Header + MobileMenu accessibile`.

### Task 3.3: Footer (con NewsletterForm) + wiring in layout

**Files:**
- Create: `src/components/layout/Footer.tsx`, `src/components/content/NewsletterForm.tsx`
- Modify: `src/app/layout.tsx` (montare SkipLink, Header, main, Footer, ScrollProgress; metadata base)
- Test: `src/components/layout/__tests__/Footer.test.tsx`

**Interfaces:**
- Consumes: `site` (address, email, social).
- Produces: `Footer` con contatti reali (Milano, `info@nazionalecantanti.it`, IG/FB reali; nessun telefono perché `site.phone === null`), link legali, `NewsletterForm` (UI only: submit mostra "Ti sei iscritto" ma **non** invia a nessun servizio — `TODO_CLIENTE` provider, commentato nel codice).

- [ ] **Step 1: test Footer** mostra email reale e NON mostra un numero di telefono inventato.
- [ ] **Step 2–4: TDD.** **Commit** `feat: Footer + newsletter (UI, provider TODO)`.

---

## Phase 4 — Home a capitoli

> Ogni sezione è un componente in `src/components/home/`, avvolto in `ScrollReveal`, montato in `src/app/page.tsx`. Ogni task: test di smoke (renderizza dati reali attesi) → implementa → verifica visiva con preview tool → commit.

### Task 4.1: Hero

**Files:** Create `src/components/home/Hero.tsx`; Test `.../__tests__/Hero.test.tsx`.
**Interfaces:** Consumes `site`, prima foto reale hero. Produces sezione full-screen: `KenBurnsImage` (foto reale, overlay notte), `Kicker` "dal 1981", titolo serif, `MagneticButton` `Dona ora` (oro→/dona-ora) + `Scopri la storia` (ghost→/la-storia).

- [ ] **Step 1: test** — Hero contiene il kicker "dal 1981" e il link Dona.
- [ ] **Step 2–4: TDD** + verifica preview (screenshot). **Commit** `feat(home): Hero`.

### Task 4.2: Manifesto
**Files:** Create `src/components/home/Manifesto.tsx` (+test).
**Interfaces:** Consumes `site.mission` (reale). Produces sezione carta, frase grande serif, `ScrollReveal`.
- [ ] TDD (test: rende il testo di `site.mission`) → **Commit** `feat(home): Manifesto`.

### Task 4.3: StatsBand
**Files:** Create `src/components/home/StatsBand.tsx` (+test).
**Interfaces:** Consumes `historyStats`. Produces banda notte con `AnimatedCounter` per: 42 anni, 647 incontri (con nota "dato 2023" visibile/`title`), N artisti (`TODO_CLIENTE` se non reale → non mostrare numero finto, mostrare etichetta), raccolto (`TODO_CLIENTE`).
- [ ] **Step 1: test** — mostra `647` e riporta l'anno-fonte 2023 (niente numero spacciato per 2026).
- [ ] TDD → **Commit** `feat(home): StatsBand con dato-fonte 2023`.

### Task 4.4: HistoryPreview (+ Timeline)
**Files:** Create `src/components/content/Timeline.tsx`, `src/components/home/HistoryPreview.tsx` (+test).
**Interfaces:** Consumes edizioni storiche reali da `@/data/history`. Produces timeline orizzontale scorrevole; edizioni senza foto reale → pannello elegante con l'anno (mai foto generica). CTA → `/la-storia`.
- [ ] TDD (test: una edizione senza `image` NON renderizza `<img>`) → **Commit** `feat(home): HistoryPreview + Timeline`.

### Task 4.5: SquadPreview
**Files:** Create `src/components/content/PlayerCard.tsx`, `PlayerGrid.tsx`, `src/components/home/SquadPreview.tsx` (+test).
**Interfaces:** Consumes `players` (40 foto reali). Produces griglia anteprima (8–12 volti) con hover, CTA → `/la-squadra`.
- [ ] TDD → **Commit** `feat(home): SquadPreview`.

### Task 4.6: NextEvent
**Files:** Create `src/components/content/EventCard.tsx`, `src/components/home/NextEvent.tsx` (+test).
**Interfaces:** Consumes `nextEvent`. Produces card evento in evidenza: Partita del Cuore 2026, 13/07 21:00, Stadio Gran Sasso (L'Aquila), Rai 1, Croce Rossa; CTA → `/eventi/partita-del-cuore-2026`.
- [ ] TDD (test: mostra "L'Aquila" e "13 luglio 2026") → **Commit** `feat(home): NextEvent`.

### Task 4.7: ImpactPreview
**Files:** Create `src/components/home/ImpactPreview.tsx` (+test).
**Interfaces:** Consumes `projects`/`nicUnited` (reali). Produces sezione "dove va l'aiuto" (NIC United, chitarre Eko…), CTA → `/impatto`.
- [ ] TDD → **Commit** `feat(home): ImpactPreview`.

### Task 4.8: PartnersStrip
**Files:** Create `src/components/content/PartnerCarousel.tsx`, `src/components/home/PartnersStrip.tsx` (+test).
**Interfaces:** Consumes `partners`. Produces striscia partner; **loghi reali assenti** → nome testuale elegante (mai logo inventato), CTA → `/partner`.
- [ ] TDD (test: rende i nomi Givova/TrustMeUp/Ege senza `<img>` di logo) → **Commit** `feat(home): PartnersStrip`.

### Task 4.9: DonateClimax + montaggio Home
**Files:** Create `src/components/content/DonationCTA.tsx`, `src/components/home/DonateClimax.tsx`; Modify `src/app/page.tsx` (montare tutte le 9 sezioni in ordine + metadata home).
**Interfaces:** Consumes `donation`. Produces sezione finale oro; link donazione = `donation.trustMeUpUrl` se presente, altrimenti CTA verso `/dona-ora` (mai link esterno inventato). Home completa.
- [ ] **Step 1: test page** — la Home monta le sezioni chiave (Hero, StatsBand, DonateClimax) senza errori.
- [ ] TDD + **verifica preview**: avvio dev server, screenshot desktop+mobile, console senza errori. **Commit** `feat(home): DonateClimax + montaggio Home`.

---

## Phase 5 — Pagine contenuto

> Ogni pagina: `PageHero` (titolo + breadcrumb) + sezioni che leggono dati reali. Task per pagina, ciascuno con test di smoke (render + presenza di un dato reale atteso) e verifica preview.

### Task 5.1: PageHero + Breadcrumbs (condivisi)
**Files:** Create `src/components/content/PageHero.tsx`, `Breadcrumbs.tsx`, `src/components/ui/SectionTitle.tsx`, `Kicker.tsx` (+test).
**Interfaces:** Produces intestazioni di pagina riusabili. Usati da tutte le pagine di Fase 5–6.
- [ ] TDD → **Commit** `feat: PageHero, Breadcrumbs, SectionTitle`.

### Task 5.2: La Storia (`/la-storia`)
**Files:** Create `src/app/la-storia/page.tsx` (+test).
**Interfaces:** Consumes `historyStats`, edizioni storiche, `StaffList` opzionale. Produces timeline completa + nota dato-2023.
- [ ] TDD → **Commit** `feat(page): la-storia`.

### Task 5.3: La Squadra (`/la-squadra`)
**Files:** Create `src/components/content/StaffList.tsx`, `src/app/la-squadra/page.tsx` (+test).
**Interfaces:** Consumes `players` (40) + `staff` (organigramma reale: Ruggeri presidente, Masini D.T., Pecchini D.G., …). Produces griglia giocatori + sezione organigramma.
- [ ] TDD (test: mostra "Enrico Ruggeri" e "Presidente") → **Commit** `feat(page): la-squadra + organigramma`.

### Task 5.4: Eventi (`/eventi`) + dettaglio (`/eventi/[slug]`)
**Files:** Create `src/app/eventi/page.tsx`, `src/app/eventi/[slug]/page.tsx` (+test).
**Interfaces:** Consumes `nextEvent` + archivio. Produces elenco (prossimo in evidenza, storici in archivio etichettato) e pagina dettaglio con `generateStaticParams`/`generateMetadata`. Evento 2020 "rinviato" resta in archivio storico, non come evento corrente.
- [ ] TDD (test: `/eventi` mostra il prossimo evento; slug inesistente → `notFound()`) → **Commit** `feat(page): eventi + dettaglio`.

### Task 5.5: News (`/news`) + dettaglio (`/news/[slug]`)
**Files:** Create `src/components/content/NewsCard.tsx`, `src/app/news/page.tsx`, `src/app/news/[slug]/page.tsx` (+test).
**Interfaces:** Consumes `newsArticles`. Produces elenco + dettaglio; articoli senza `image` → segnaposto neutro (no immagine inventata); date "da confermare" mostrate come tali.
- [ ] TDD → **Commit** `feat(page): news + dettaglio`.

### Task 5.6: Progetti (`/progetti`)
**Files:** Create `src/app/progetti/page.tsx` (+test).
**Interfaces:** Consumes `nicUnited`, `projects`. Produces pagina progetti reali.
- [ ] TDD → **Commit** `feat(page): progetti`.

### Task 5.7: Impatto (`/impatto`) — NUOVA
**Files:** Create `src/components/content/ImpactStats.tsx`, `src/app/impatto/page.tsx` (+test).
**Interfaces:** Consumes `projects` + numeri `TODO_CLIENTE`. Produces pagina trasparenza: "dove vanno i fondi". I numeri economici NON presenti nei dati reali sono resi come blocchi etichettati `Dato da confermare` (mai importi inventati).
- [ ] TDD (test: nessun importo numerico inventato; i placeholder mostrano "Dato da confermare") → **Commit** `feat(page): impatto/trasparenza`.

### Task 5.8: Partner (`/partner`) — POTENZIATA
**Files:** Create `src/app/partner/page.tsx` (+test).
**Interfaces:** Consumes `partners`. Produces vetrina che "vende" la partnership (pubblico, visibilità, valori) + elenco partner reali (nomi, loghi `TODO_CLIENTE`) + CTA contatto commerciale (mailto reale).
- [ ] TDD → **Commit** `feat(page): partner (pitch)`.

### Task 5.9: Gallery (`/gallery`) + Stampa (`/stampa`)
**Files:** Create `src/components/content/GalleryLightbox.tsx`, `src/app/gallery/page.tsx`, `src/app/stampa/page.tsx` (+test).
**Interfaces:** Consumes `gallery` (13 foto reali), `media`. Produces galleria con lightbox accessibile (tastiera, ESC) e area stampa reale.
- [ ] TDD → **Commit** `feat(page): gallery + stampa`.

### Task 5.10: Contatti (`/contatti`)
**Files:** Create `src/components/content/ContactForm.tsx`, `src/app/contatti/page.tsx` (+test).
**Interfaces:** Consumes `site`. Produces indirizzo reale Milano, email reale, mappa/box; form contatti che apre `mailto:info@nazionalecantanti.it` (nessun backend inventato) — validazione client-side, stati errore vicino al campo.
- [ ] TDD → **Commit** `feat(page): contatti`.

---

## Phase 6 — Conversione e legale

### Task 6.1: Dona ora (`/dona-ora`) + FAQ
**Files:** Create `src/components/content/FAQAccordion.tsx`, `src/app/dona-ora/page.tsx` (+test).
**Interfaces:** Consumes `donation`. Produces pagina donazione oro: spiegazione, canali reali (TrustMeUp solo se `donation.trustMeUpUrl` presente, altrimenti messaggio "canale in aggiornamento" — mai link inventato) + `FAQAccordion` (donazione/5×1000, accessibile: `aria-expanded`, tastiera).
- [ ] **Step 1: test** — se `trustMeUpUrl` è `null`, NON esiste un link esterno di donazione (niente placeholder cliccabile). FAQ apre/chiude.
- [ ] TDD → **Commit** `feat(page): dona-ora + FAQ`.

### Task 6.2: 5×1000 (`/5x1000`)
**Files:** Create `src/app/5x1000/page.tsx` (+test).
**Interfaces:** Consumes dati 5×1000 reali (codice fiscale se presente in `site`/`donation`, altrimenti `TODO_CLIENTE`). Produces pagina istruzioni; **codice fiscale mostrato solo se reale**.
- [ ] TDD (test: se il CF non è nei dati, mostra "Codice fiscale da confermare", non un numero) → **Commit** `feat(page): 5x1000`.

### Task 6.3: Contributi pubblici (`/contributi-pubblici`) + Privacy (`/privacy-policy`)
**Files:** Create `src/app/contributi-pubblici/page.tsx`, `src/app/privacy-policy/page.tsx` (+test).
**Interfaces:** Produces testo legale (contenuto reale/di template chiaramente marcato `TODO_CLIENTE` dove serve testo giuridico ufficiale).
- [ ] TDD → **Commit** `feat(page): contributi-pubblici + privacy`.

---

## Phase 7 — SEO & rifinitura

### Task 7.1: Metadata per pagina + template transizione
**Files:** Modify tutte le `page.tsx` (export `metadata`/`generateMetadata`); Create `src/app/template.tsx`.
**Interfaces:** Produces title/description reali per pagina, Open Graph con foto reali, transizione pagina soft (reduced-motion-safe).
- [ ] Verifica build + **Commit** `feat: metadata SEO per pagina + template`.

### Task 7.2: sitemap.ts, robots.ts, JSON-LD
**Files:** Create `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/StructuredData.tsx`.
**Interfaces:** Consumes route + `site`. Produces sitemap con tutte le route (incl. slug via dati), robots, JSON-LD `SportsOrganization`/`Organization` con **soli dati reali** (nome, fondazione 1981, indirizzo, social; niente campi inventati).
- [ ] Test (sitemap include `/impatto` e gli slug reali) → **Commit** `feat: sitemap, robots, JSON-LD`.

---

## Phase 8 — Verifica finale (criteri di "fatto bene")

### Task 8.1: QA build/lint/test
- [ ] `npm run build` → zero errori. `npm run lint` → zero warning. `npm test` → tutti verdi.
- [ ] `grep -rn "TODO_CLIENTE\|TODO_VERIFY" src/` → tutti i marcatori sono su dati NON pubblicati come veri (verifica manuale della lista).
- [ ] **Commit** `chore: QA build/lint/test puliti`.

### Task 8.2: Verifica visiva e accessibilità
- [ ] Avvia dev server (preview tool). Screenshot a 375/768/1024/1440. Console senza errori. Network senza 404 su immagini.
- [ ] Test manuale tastiera: skip link, nav, MobileMenu (ESC), FAQ, lightbox.
- [ ] Lighthouse mobile: Performance ≥90, Accessibilità ≥95, Best Practices ≥95, SEO ≥95. Annotare i punteggi.
- [ ] Toggle `prefers-reduced-motion`: nessuna animazione forzata, contatori mostrano il valore finale.
- [ ] **Commit** `chore: report QA visivo/a11y/lighthouse` (salvare i numeri in `docs/superpowers/qa-report.md`).

### Task 8.3: Validazione incrociata con Codex
- [ ] Passare a Codex il diff finale / la cartella. Chiedere revisione su: (a) dati inventati sfuggiti, (b) accessibilità, (c) correttezza fatti vs `src/data`.
- [ ] Riconciliare le discrepanze: dove Codex e questa build divergono, verificare contro `src/data`/sito live e correggere. Registrare l'esito in `docs/superpowers/qa-report.md`.
- [ ] **Commit** `chore: riconciliazione review Codex`.

---

## Self-Review (copertura spec)

- Obiettivi bilanciati (emozione→dona→eventi→partner) → Home Fase 4 nell'ordine. ✔
- Regola "niente dati inventati" → Task 2.2 (guardia), 4.3/4.4/4.8/6.1/6.2/5.7 (rendering condizionale), 8.1 (grep). ✔
- Design "Cinema + Azzurro" (token, font, movimento reduced-motion) → Fase 1. ✔
- Tutte le 16 pagine + Impatto → Fasi 5–6 (elenco completo). ✔
- Partner potenziata, FAQ in Dona, newsletter footer → 5.8, 6.1, 3.3. ✔
- SEO/A11y/perf, responsive → Fase 7 + 8.2. ✔
- Criteri di validazione (build/lint, Lighthouse, grep, Codex, ancoraggio dati reali) → Fase 8. ✔
- Riuso dati/asset reali → Task 2.1. ✔
- Fuori scope (newsletter provider, link donazione, loghi, video, deploy) → resi come `TODO_CLIENTE`/segnaposto, non implementati. ✔
