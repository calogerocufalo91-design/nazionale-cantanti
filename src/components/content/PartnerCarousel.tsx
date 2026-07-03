import type { Partner } from "@/data/partners";

// Loghi reali non ancora forniti dal cliente (TODO_CLIENTE): mai un logo
// inventato. Finché non arrivano, i partner sono presentati con nome e ruolo.
export function PartnerCarousel({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="flex flex-col items-center justify-center rounded-2xl border border-notte/10 bg-white px-6 py-10 text-center"
        >
          <span className="font-serif text-2xl font-semibold text-notte">
            {partner.name}
          </span>
          <span className="mt-2 text-xs uppercase tracking-[0.2em] text-notte/50">
            {partner.role}
          </span>
        </li>
      ))}
    </ul>
  );
}
