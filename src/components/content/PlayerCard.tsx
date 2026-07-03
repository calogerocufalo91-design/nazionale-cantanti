import Image from "next/image";
import type { Player } from "@/data/team";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <figure className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-notte">
      <Image
        src={player.photo}
        alt={player.name}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-notte/90 via-notte/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3">
        <span className="font-cond text-sm font-medium uppercase tracking-wide text-white">
          {player.name}
        </span>
      </figcaption>
    </figure>
  );
}
