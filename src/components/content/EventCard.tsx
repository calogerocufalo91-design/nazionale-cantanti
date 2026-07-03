import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/data/events";

// Gli eventi senza locandina reale mostrano un pannello neutro con il titolo,
// mai un'immagine inventata.
export function EventCard({ event }: { event: EventItem }) {
  const isNext = event.status === "prossimo";
  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-notte/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 bg-notte">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <span className="font-serif text-xl text-white/80">
              {event.title}
            </span>
          </div>
        )}
        <span
          className={
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium " +
            (isNext ? "bg-oro text-oro-scuro" : "bg-white/85 text-notte")
          }
        >
          {isNext ? "Prossimo evento" : "Archivio"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-cond text-sm uppercase tracking-wide text-azzurro">
          {event.date}
          {event.time ? ` · ${event.time}` : ""}
        </p>
        <h3 className="mt-1 font-serif text-xl font-semibold text-notte">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-notte/60">
          {event.stadium} — {event.city}
        </p>
        <p className="mt-3 line-clamp-3 text-sm text-notte/70">{event.summary}</p>
      </div>
    </Link>
  );
}
