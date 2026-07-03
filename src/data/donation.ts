// ATTENZIONE - dato sensibile, verificato il 26/06/2026 leggendo l'HTML
// reale di /5-x-1000/: il codice fiscale pubblicato sul sito è quello di
// "Umanità senza Confini Onlus", l'ente partner che riceve materialmente il
// 5x1000 per conto delle iniziative sociali della Nazionale Cantanti — NON
// il codice fiscale dell'associazione Nazionale Italiana Cantanti stessa.
// Questa distinzione va mantenuta identica anche nel nuovo sito: scriverlo
// in modo diverso (es. attribuendolo direttamente alla Nazionale Cantanti)
// sarebbe un errore concreto su un dato fiscale, non un dettaglio di stile.

export const fiveXMille = {
  beneficiaryName: "Umanità senza Confini Onlus",
  beneficiaryCF: "97399940150",
  context:
    "Dona il tuo 5x1000 a Umanità senza Confini Onlus: ci aiuterai a sostenere le nostre iniziative per il sociale.",
  // TODO_VERIFY: il sito attuale mostra ancora scadenze fiscali del 2018.
  // Le scadenze 5x1000 cambiano ogni anno fiscale: da aggiornare con quelle
  // dell'anno corrente al momento della pubblicazione, non lasciare una data fissa.
};

export const donationChannels = {
  // TODO_VERIFY: nessun bottone "Dona ora" con link di pagamento diretto e
  // funzionante è stato individuato sul sito attuale durante l'audit.
  // L'unico canale terzo di raccolta fondi citato in homepage è TrustMeUp,
  // ma senza un link diretto verificabile alla campagna attiva.
  primaryCtaUrl: null as string | null,
  fallbackContactEmail: "info@nazionalecantanti.it",
};
