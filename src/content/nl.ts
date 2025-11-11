const nlContent = {
  name: "Koert Manni",
  tagline: "AV-installaties op maat",
  description:
    "Maatwerk audio-visuele installaties die naadloos in elke omgeving opgaan.",
  navigation: {
    home: "Home",
    contact: "Contact"
  },
  aria: {
    headerButton: "Navigatie openen of sluiten",
    nav: "Hoofdnavigatie",
    closeNavigation: "Navigatie sluiten",
    returnHome: "Terug naar de homepage"
  },
  language: {
    label: "Taal:"
  },
  contact: {
    heading: "Neem contact op",
    intro: "Deel je projectdoelen en Koert neemt contact op met een passend AV-plan.",
    form: {
      nameLabel: "Volledige naam",
      namePlaceholder: "Naam",
      emailLabel: "E-mailadres",
      emailPlaceholder: "naam@voorbeeld.nl",
      categoryLabel: "Categorie",
      messageLabel: "Projectdetails",
      messagePlaceholder: "Beschrijf de ruimte, planning en specifieke AV-wensen.",
      submit: "Verstuur bericht",
      sending: "Verzenden...",
      success: "Bericht verzonden! Even geduld...",
      errorRequest: "Versturen mislukt. Probeer het opnieuw.",
      errorUnknown: "Er ging iets mis tijdens het versturen. Probeer het opnieuw."
    }
  }
} as const;

export default nlContent;
