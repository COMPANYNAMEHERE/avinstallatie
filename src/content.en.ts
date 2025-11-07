const enContent = {
  name: "Koert Manni",
  tagline: "Tailored AV Installations",
  description:
    "Tailored audio-visual installations that blend seamlessly with every environment.",
  navigation: {
    home: "Home",
    contact: "Contact"
  },
  aria: {
    headerButton: "Toggle navigation",
    nav: "Primary navigation",
    closeNavigation: "Close navigation",
    returnHome: "Return to homepage"
  },
  language: {
    label: "Language:"
  },
  contact: {
    heading: "Get in touch with Koert",
    intro: "Share your project goals and Koert will respond with a tailored AV plan.",
    form: {
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      emailLabel: "Email address",
      emailPlaceholder: "name@example.com",
      categoryLabel: "Category",
      messageLabel: "Project details",
      messagePlaceholder: "Tell Koert about the space, timeline, and AV requirements.",
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent! Redirecting...",
      errorRequest: "Failed to send message. Please try again.",
      errorUnknown: "Something went wrong while sending. Please try again."
    }
  }
} as const;

export default enContent;
