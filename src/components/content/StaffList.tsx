import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { StaffMember } from "@/data/team";

// La dirigenza apre la sezione con FOTO REALI dell'archivio (Ruggeri e Masini
// dalla rosa, Pecchini dalla news di auguri, verificata come suo ritratto).
// Per il resto dello staff non esistono foto nei materiali reali: monogrammi
// tipografici, mai volti inventati.
const LEAD_ROLES = ["Presidente", "Direttore Generale", "Direttore Tecnico"];

const LEAD_PHOTOS: Record<string, string> = {
  "Enrico Ruggeri": "/images/players/enrico-ruggeri.jpg",
  "Gianluca Pecchini": "/images/news/buon-compleanno-gian-luca.jpg",
  "Marco Masini": "/images/players/marco-masini.jpg",
};

function initials(name: string) {
  return name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function StaffList({ staff }: { staff: StaffMember[] }) {
  const lead = staff.filter((m) => LEAD_ROLES.includes(m.role));
  const rest = staff.filter((m) => !LEAD_ROLES.includes(m.role));

  return (
    <div className="space-y-12">
      <div className="grid gap-5 sm:grid-cols-3">
        {lead.map((member, i) => {
          const photo = LEAD_PHOTOS[member.name];
          return (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <div className="group h-full overflow-hidden rounded-2xl bg-notte text-white transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden sm:h-72">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 380px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-oro/50 bg-oro/10 font-cond text-2xl font-semibold text-oro">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-notte via-notte/15 to-transparent"
                  />
                </div>
                <div className="p-6">
                  <p className="font-serif text-2xl font-semibold">
                    {member.name}
                  </p>
                  <p className="mt-2 font-cond text-sm font-medium uppercase tracking-[0.22em] text-azzurro-chiaro">
                    {member.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((member, i) => (
          <ScrollReveal key={member.name} as="li" delay={(i % 6) * 0.05}>
            <div className="flex items-center gap-4 border-b border-notte/10 pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-notte/5 font-cond text-sm font-semibold text-notte/70">
                {initials(member.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-serif text-lg font-semibold text-notte">
                  {member.name}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-notte/50">
                  {member.role}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </ul>
    </div>
  );
}
