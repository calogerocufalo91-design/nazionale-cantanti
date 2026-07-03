import { site } from "@/data/site";

// JSON-LD con SOLI dati reali verificati (nome, fondazione 1981, indirizzo,
// social). Nessun campo inventato (es. telefono, assente nei dati).
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: site.name,
    alternateName: site.shortName,
    foundingDate: String(site.foundingYear),
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Milano",
      postalCode: "20122",
      addressCountry: "IT",
    },
    sameAs: [site.social.instagram, site.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
