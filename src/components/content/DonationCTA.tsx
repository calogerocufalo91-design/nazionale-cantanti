import { MagneticButton } from "@/components/motion/MagneticButton";
import { donationChannels } from "@/data/donation";

// Se non esiste un link di donazione diretto verificato (primaryCtaUrl === null),
// non si inventa un URL: si porta l'utente alla pagina /dona-ora dove sono spiegati
// i canali reali.
export function DonationCTA({
  variant = "oro",
}: {
  variant?: "oro" | "notte" | "azzurro";
}) {
  const hasDirectLink = Boolean(donationChannels.primaryCtaUrl);
  return (
    <MagneticButton
      href={donationChannels.primaryCtaUrl ?? "/dona-ora"}
      variant={variant}
      external={hasDirectLink}
    >
      Dona ora
    </MagneticButton>
  );
}
