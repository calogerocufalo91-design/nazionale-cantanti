import type { Player } from "@/data/team";
import { PlayerCard } from "./PlayerCard";

export function PlayerGrid({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {players.map((player) => (
        <PlayerCard key={player.name} player={player} />
      ))}
    </div>
  );
}
