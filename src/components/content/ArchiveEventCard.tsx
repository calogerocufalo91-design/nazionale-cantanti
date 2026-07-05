import type { ArchiveEvent } from "@/data/archivio";

export function ArchiveEventCard({ event }: { event: ArchiveEvent }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-notte/10 bg-carta p-6">
      <p className="font-cond text-sm uppercase tracking-wide text-azzurro">
        {event.date} · {event.city}
      </p>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-notte">
        {event.title}
      </h3>
      <p className="mt-1 text-sm text-notte/60">{event.venue}</p>
      <p className="mt-3 text-sm text-notte/70">{event.teams}</p>
      <span className="mt-3 inline-block w-fit rounded-full bg-notte/5 px-3 py-1 text-xs font-medium text-notte/80">
        {event.result}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-notte/70">
        {event.purpose}
      </p>
    </div>
  );
}
