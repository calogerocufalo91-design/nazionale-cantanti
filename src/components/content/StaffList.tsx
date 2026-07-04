import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { StaffMember } from "@/data/team";

// Niente foto dello staff nei materiali reali: al loro posto monogrammi
// tipografici (mai volti inventati). La dirigenza apre la sezione in evidenza.
const LEAD_ROLES = ["Presidente", "Direttore Generale", "Direttore Tecnico"];

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
        {lead.map((member, i) => (
          <ScrollReveal key={member.name} delay={i * 0.08}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-notte p-7 text-white">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(90%_90%_at_100%_0%,rgba(0,114,187,0.28),transparent_65%)]"
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-oro/50 bg-oro/10 font-cond text-xl font-semibold text-oro">
                {initials(member.name)}
              </span>
              <p className="relative mt-6 font-serif text-2xl font-semibold">
                {member.name}
              </p>
              <p className="relative mt-2 font-cond text-sm font-medium uppercase tracking-[0.22em] text-azzurro-chiaro">
                {member.role}
              </p>
            </div>
          </ScrollReveal>
        ))}
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
