import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TunnelReveal } from "@/components/motion/TunnelReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { nextEvent } from "@/data/events";

// Pattern sottilissimo (cuore + pallone stilizzati) in oro tenue, ripetuto sullo
// sfondo caldo della sezione. Asset inline originale, nessuna immagine esterna.
const HEART_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23E8B23A' stroke-opacity='0.16' stroke-width='1'%3E%3Cpath d='M16 20c-3-4-9-2-9 3 0 4 5 7 9 10 4-3 9-6 9-10 0-5-6-7-9-3z'/%3E%3Ccircle cx='46' cy='46' r='7'/%3E%3Cpath d='M39 46h14M46 39v14'/%3E%3C/g%3E%3C/svg%3E\")";

export function NextEvent() {
  const e = nextEvent;
  return (
    <section className="relative overflow-hidden bg-carta py-24 sm:py-28">
      {/* Sfondo caldo: gradienti morbidi + pattern sottile + fili decorativi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(232,178,58,0.10), transparent 60%), radial-gradient(50% 45% at 100% 100%, rgba(0,114,187,0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: HEART_PATTERN, backgroundSize: "64px 64px" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro/40 to-transparent"
      />

      <Container className="relative">
        {/* Intestazione sezione */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="font-cond text-sm font-medium uppercase tracking-[0.3em] text-azzurro">
            Prossimo evento
          </p>
          <h2 className="mt-3 font-serif text-heading font-semibold text-notte">
            L&apos;appuntamento che aspettiamo tutto l&apos;anno
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-5 block h-px w-16 bg-oro"
          />
        </div>

        <TunnelReveal>
          <div className="group relative grid overflow-hidden rounded-[28px] bg-notte text-white shadow-[0_50px_120px_-40px_rgba(11,29,46,0.7)] ring-1 ring-notte/10 lg:grid-cols-[1.05fr_1fr]">
            {/* Glow navy morbido attorno alla card */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[28px] ring-1 ring-inset ring-white/10"
            />

            {/* Immagine evento */}
            {e.image && (
              <div className="relative min-h-[300px] overflow-hidden lg:min-h-[520px]">
                <Image
                  src={e.image}
                  alt={`Locandina ufficiale — ${e.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={false}
                />
                {/* Overlay leggero per fondere immagine e box navy */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-notte/70 lg:to-notte"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-notte/60 via-transparent to-transparent lg:from-transparent"
                />
                {/* Badge edizione */}
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-oro px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-oro-scuro shadow-[0_8px_24px_-8px_rgba(232,178,58,0.8)]">
                  <span aria-hidden>★</span> 35ª edizione
                </span>
              </div>
            )}

            {/* Box testo */}
            <div className="relative flex flex-col justify-center p-8 sm:p-11 lg:p-12">
              <h3 className="font-serif text-heading font-semibold">
                {e.title}
              </h3>

              <span
                aria-hidden
                className="mt-6 block h-px w-full bg-gradient-to-r from-oro/50 via-white/10 to-transparent"
              />

              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <EventRow label="Data" value={`${e.date}${e.time ? ` · ore ${e.time}` : ""}`} />
                <EventRow label="Dove" value={`${e.stadium}, ${e.city}`} />
                {e.broadcast && <EventRow label="In diretta" value={e.broadcast} />}
                <EventRow label="A favore di" value={e.cause} />
              </dl>

              <span
                aria-hidden
                className="mt-6 block h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75">
                {e.summary}
              </p>

              <div className="mt-9">
                <MagneticButton href={`/eventi/${e.slug}`} variant="oro">
                  Dettagli e prevendite
                </MagneticButton>
              </div>
            </div>
          </div>
        </TunnelReveal>
      </Container>
    </section>
  );
}

function EventRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-oro/40 pl-4">
      <dt className="font-cond text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] font-medium leading-snug text-white">
        {value}
      </dd>
    </div>
  );
}
