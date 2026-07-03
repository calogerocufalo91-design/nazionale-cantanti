"use client";

import { useState } from "react";

// NOTA: raccolta email solo lato UI. Nessun invio a servizi esterni: il provider
// (Mailchimp/Brevo/…) va collegato dal cliente. TODO_CLIENTE: integrare l'endpoint
// reale prima della pubblicazione. Finché non c'è, il form conferma localmente
// senza promettere un'iscrizione che non avviene.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-sm text-white/70">
        Grazie, ti terremo aggiornato. (Attivazione newsletter in arrivo.)
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Il tuo indirizzo email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="nome@email.it"
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 focus:border-azzurro-chiaro focus:outline-none focus:ring-2 focus:ring-azzurro-chiaro/50"
      />
      <button
        type="submit"
        className="rounded-full bg-azzurro px-6 py-3 font-medium text-white transition-colors hover:bg-[#0090e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro-chiaro"
      >
        Iscriviti
      </button>
    </form>
  );
}
