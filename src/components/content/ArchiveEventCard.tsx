import type { ArchiveEvent } from "@/data/archivio";

export function ArchiveEventCard({ event }: { event: ArchiveEvent }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-notte/10 bg-carta p-6 shadow-[0_2px_6px_-3px_rgba(11,29,46,0.08)] transition-[transform,box-shadow,border-color] duration-[220ms] ease-out hover:-translate-y-1 hover:border-notte/15 hover:shadow-[0_20px_45px_-25px_rgba(11,29,46,0.28)]">
      <p className="font-cond text-sm uppercase tracking-wide text-azzurro">
        {event.date} · {event.city}
      </p>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-notte transition-colors group-hover:text-azzurro">
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
