"use client";

import { useState } from "react";
import { site } from "@/data/site";

// Nessun backend: il form compone una email verso l'indirizzo reale
// dell'associazione (mailto). Nessun invio server inventato.
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contatto dal sito — ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="cf-name" className="text-sm font-medium text-notte">
          Nome
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-notte/15 bg-white px-4 py-3 text-notte focus:border-azzurro focus:outline-none focus:ring-2 focus:ring-azzurro/40"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-email" className="text-sm font-medium text-notte">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@email.it"
          className="rounded-xl border border-notte/15 bg-white px-4 py-3 text-notte focus:border-azzurro focus:outline-none focus:ring-2 focus:ring-azzurro/40"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-msg" className="text-sm font-medium text-notte">
          Messaggio
        </label>
        <textarea
          id="cf-msg"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl border border-notte/15 bg-white px-4 py-3 text-notte focus:border-azzurro focus:outline-none focus:ring-2 focus:ring-azzurro/40"
        />
      </div>
      <button
        type="submit"
        className="justify-self-start rounded-full bg-azzurro px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#0090e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro-chiaro"
      >
        Invia messaggio
      </button>
    </form>
  );
}
