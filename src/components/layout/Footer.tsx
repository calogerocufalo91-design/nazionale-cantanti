import Link from "next/link";
import { nav, site, footerLegalLinks } from "@/data/site";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/content/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative bg-notte text-white">
      {/* Filo oro superiore: coerenza col resto del sito che usa lo stesso
          separatore fra sezioni chiare/scure. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/40 to-transparent"
      />
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="font-cond text-xs font-semibold uppercase tracking-[0.32em] text-azzurro-chiaro">
              dal {site.foundingYear}
            </p>
            <p className="mt-4 font-serif text-2xl leading-snug">
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Musica, sport e solidarietà: dal 1981 i cantanti italiani in campo
              per gli altri.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram della Nazionale Cantanti"
                className="group/social rounded-full border border-white/25 bg-white/10 p-3 text-white transition-[color,background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-oro hover:bg-oro hover:text-oro-scuro"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z" />
                </svg>
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook della Nazionale Cantanti"
                className="group/social rounded-full border border-white/25 bg-white/10 p-3 text-white transition-[color,background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-oro hover:bg-oro hover:text-oro-scuro"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="font-cond text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Naviga
            </p>
            <nav
              aria-label="Mappa del sito"
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm"
            >
            {nav.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/nav inline-flex items-center gap-1 text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                  <span aria-hidden className="ml-1 text-oro/70">
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/nav inline-flex items-center gap-1 text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
            </nav>
          </div>

          <div>
            <p className="font-cond text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Newsletter
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Ricevi gli aggiornamenti sulle prossime partite e iniziative.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <address className="mt-8 not-italic text-sm leading-relaxed text-white/60">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block text-azzurro-chiaro transition-colors duration-300 hover:text-oro"
              >
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
