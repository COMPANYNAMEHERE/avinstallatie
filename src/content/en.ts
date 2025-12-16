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
      emailLabel: "Your Email (optional)",
      emailPlaceholder: "Your email address",
      categoryLabel: "Category",
      messageLabel: "Project details",
      messagePlaceholder: "Tell Koert about the space, timeline, and AV requirements.",
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent! Redirecting...",
      errorRequest: "Failed to send message. Please try again.",
      errorUnknown: "Something went wrong while sending. Please try again."
    }
  },
  resultPage: {
    success: {
      title: "Message sent",
      message: "Thanks for reaching out. Koert will get back to you shortly.",
      redirect: "Returning to the homepage in",
      button: "Back to home"
    },
    error: {
      title: "Message failed",
      message: "Something went wrong while sending your message. Please try again.",
      redirect: "Returning to the contact form in",
      button: "Back to contact"
    },
    seconds: "seconds..."
  }
} as const;

export default enContent;
