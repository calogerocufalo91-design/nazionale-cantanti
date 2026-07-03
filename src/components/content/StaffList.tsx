import type { StaffMember } from "@/data/team";

export function StaffList({ staff }: { staff: StaffMember[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
      {staff.map((member) => (
        <li
          key={member.name}
          className="flex flex-col border-b border-notte/10 pb-4"
        >
          <span className="font-serif text-lg font-semibold text-notte">
            {member.name}
          </span>
          <span className="mt-1 text-sm text-notte/60">{member.role}</span>
        </li>
      ))}
    </ul>
  );
}
