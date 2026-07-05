"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  handoff?: boolean;
};

const HANDOFF = "[HANDOFF]";

const SUGGESTIONS = [
  "Quando è la prossima partita?",
  "Come posso donare?",
  "Cos'è il 5x1000?",
  "Chi gioca nella Nazionale Cantanti?",
];

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Ciao! Sono l'assistente della Nazionale Italiana Cantanti. Posso raccontarti la storia, gli eventi, come donare e molto altro. Come posso aiutarti?",
};

export function NicChat() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => m !== WELCOME)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const friendly =
          res.status === 503
            ? "L'assistente è in fase di attivazione. Nel frattempo puoi scriverci: ti risponderemo al più presto!"
            : res.status === 429
              ? "Sto ricevendo troppe domande in questo momento. Riprova tra qualche istante."
              : "C'è stato un problema tecnico. Riprova tra poco, oppure scrivici via email.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: friendly, handoff: true },
        ]);
        return;
      }

      const data = (await res.json()) as { reply?: string };
      const raw = data.reply ?? "";
      const handoff = raw.includes(HANDOFF);
      const clean = raw.replace(HANDOFF, "").trim();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            clean ||
            "Non ho una risposta precisa per questo: meglio sentire direttamente l'associazione.",
          handoff,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connessione assente. Controlla la rete e riprova.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* Pulsante flottante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chiudi l'assistente" : "Apri l'assistente"}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-notte text-oro shadow-lg ring-1 ring-white/15 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azzurro-chiaro sm:bottom-7 sm:right-7"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 12a8 8 0 0 1-8 8H5.5L3 22.5V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="9.5" cy="12" r="1.1" fill="currentColor" />
            <circle cx="13" cy="12" r="1.1" fill="currentColor" />
            <circle cx="16.5" cy="12" r="1.1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Pannello */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Assistente della Nazionale Cantanti"
            initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white shadow-2xl sm:inset-x-auto sm:right-7 sm:w-[380px]"
          >
            <div className="flex items-center gap-3 bg-notte px-5 py-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-oro/15 text-oro">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M21 12a8 8 0 0 1-8 8H5.5L3 22.5V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-serif text-lg font-semibold leading-tight">
                  Assistente NIC
                </p>
                <p className="text-xs text-white/60">
                  Risposte basate sui contenuti ufficiali del sito
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto bg-carta px-4 py-4"
            >
              {messages.map((m, i) => (
                <div key={i}>
                  <div
                    className={
                      m.role === "user"
                        ? "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-azzurro px-4 py-2.5 text-sm text-white"
                        : "w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-notte/10 bg-white px-4 py-2.5 text-sm text-notte/85"
                    }
                  >
                    {m.content}
                  </div>
                  {m.handoff && (
                    <a
                      href={`mailto:${site.email}?subject=Richiesta dal sito`}
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-oro px-4 py-2 text-xs font-semibold text-oro-scuro transition-colors hover:bg-[#f0c05a]"
                    >
                      Scrivi a {site.email}
                    </a>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-notte/10 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-notte/40 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-notte/40 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-notte/40 [animation-delay:300ms]" />
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-azzurro/40 bg-white px-3.5 py-1.5 text-xs font-medium text-azzurro transition-colors hover:bg-azzurro hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-notte/10 bg-white p-3"
            >
              <label htmlFor="nic-chat-input" className="sr-only">
                Scrivi la tua domanda
              </label>
              <input
                id="nic-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Fai una domanda…"
                maxLength={2000}
                className="min-w-0 flex-1 rounded-full border border-notte/15 bg-carta px-4 py-2.5 text-sm text-notte placeholder:text-notte/40 focus:border-azzurro focus:outline-none focus:ring-2 focus:ring-azzurro/30"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length === 0}
                aria-label="Invia"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azzurro text-white transition-colors hover:bg-[#0090e6] disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 12h13M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
