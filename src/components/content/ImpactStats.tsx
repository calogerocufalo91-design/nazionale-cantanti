// I numeri economici reali (fondi raccolti, beneficiari) NON sono dichiarati nei
// dati verificati: qui sono resi come "Dato da confermare" invece di importi
// inventati. Restano solo i fatti realmente documentati.
type Tile = { value: string; label: string; pending?: boolean };

export function ImpactStats({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-2xl border border-notte/10 bg-white p-7"
        >
          <p
            className={
              "font-cond text-4xl font-semibold " +
              (tile.pending ? "text-notte/40" : "text-oro")
            }
          >
            {tile.value}
          </p>
          <p className="mt-2 text-sm text-notte/60">{tile.label}</p>
        </div>
      ))}
    </div>
  );
}
