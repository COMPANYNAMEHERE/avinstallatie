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
      emailLabel: "Je e-mailadres (optioneel)",
      emailPlaceholder: "Je eigen e-mailadres",
      categoryLabel: "Categorie",
      messageLabel: "Projectdetails",
      messagePlaceholder: "Beschrijf de ruimte, planning en specifieke AV-wensen.",
      submit: "Verstuur bericht",
      sending: "Verzenden...",
      success: "Bericht verzonden! Even geduld...",
      errorRequest: "Versturen mislukt. Probeer het opnieuw.",
      errorUnknown: "Er ging iets mis tijdens het versturen. Probeer het opnieuw."
    }
  },
  resultPage: {
    success: {
      title: "Bericht verzonden",
      message: "Bedankt voor je bericht. Koert neemt zo snel mogelijk contact op.",
      redirect: "Terug naar de homepage in",
      button: "Terug naar home"
    },
    error: {
      title: "Verzenden mislukt",
      message: "Er ging iets mis bij het versturen van je bericht. Probeer het opnieuw.",
      redirect: "Terug naar het contactformulier in",
      button: "Terug naar contact"
    },
    seconds: "seconden..."
  }
} as const;

export default nlContent;
