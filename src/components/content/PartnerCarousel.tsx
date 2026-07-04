import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Partner } from "@/data/partners";

// Componente server: verifica se il file del logo esiste davvero in /public.
// Se c'è lo mostra, altrimenti mostra il nome. Mai un logo inventato o rotto.
function logoExists(logo?: string) {
  return logo ? existsSync(join(process.cwd(), "public", logo)) : false;
}

export function PartnerCarousel({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {partners.map((partner) => {
        const hasLogo = logoExists(partner.logo);
        return (
          <li
            key={partner.name}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-notte/10 bg-white px-6 py-10 text-center"
          >
            {hasLogo && partner.logo ? (
              <div className="relative h-14 w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="font-serif text-2xl font-semibold text-notte">
                {partner.name}
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.2em] text-notte/50">
              {partner.role}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
