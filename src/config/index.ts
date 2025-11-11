const {
  VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY
} = import.meta.env;

export const EMAILJS_SERVICE_ID = VITE_EMAILJS_SERVICE_ID ?? "";
export const EMAILJS_TEMPLATE_ID = VITE_EMAILJS_TEMPLATE_ID ?? "";
export const EMAILJS_PUBLIC_KEY = VITE_EMAILJS_PUBLIC_KEY ?? "";

export const CONTACT_CATEGORIES = [
  "Residential project",
  "Corporate / commercial",
  "Event or venue",
  "System support",
  "General enquiry"
];

export const hasEmailJsConfig =
  Boolean(EMAILJS_SERVICE_ID) &&
  Boolean(EMAILJS_TEMPLATE_ID) &&
  Boolean(EMAILJS_PUBLIC_KEY);

export const CONTACT_EMAIL = {
  localPart: import.meta.env.VITE_CONTACT_EMAIL_LOCAL ?? "",
  domain: import.meta.env.VITE_CONTACT_EMAIL_DOMAIN ?? "",
  tld: import.meta.env.VITE_CONTACT_EMAIL_TLD ?? ""
};

const hasContactEmail = Boolean(
  CONTACT_EMAIL.localPart &&
    CONTACT_EMAIL.domain &&
    CONTACT_EMAIL.tld
);

export const getContactEmail = () =>
  hasContactEmail
    ? `${CONTACT_EMAIL.localPart}@${CONTACT_EMAIL.domain}${CONTACT_EMAIL.tld}`
    : "";

export const getObfuscatedContactEmail = () =>
  hasContactEmail
    ? `${CONTACT_EMAIL.localPart}[at]${CONTACT_EMAIL.domain}[dot]${CONTACT_EMAIL.tld.replace(".", "")}`
    : "contact[at]example[dot]com";
