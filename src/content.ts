import heroImageUrl from "../assets/av-installatie-transparent.png";
import enContent from "./content.en";
import nlContent from "./content.nl";

export const backgroundImage = heroImageUrl;

export const localizedContent = {
  nl: nlContent,
  en: enContent
} as const;

export const SUPPORTED_LANGUAGES = Object.keys(localizedContent) as Array<
  keyof typeof localizedContent
>;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_STORAGE_KEY = "preferred-language";

export const LANGUAGE_OPTIONS: Array<{
  code: LanguageCode;
  label: string;
  flag: string;
}> = [
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "en", label: "English", flag: "🇬🇧" }
];

export const FALLBACK_LANGUAGE: LanguageCode = "nl";

export const isLanguageCode = (value: string): value is LanguageCode =>
  SUPPORTED_LANGUAGES.includes(value as LanguageCode);

export const normalizeLanguageCode = (
  value: string | null | undefined
): LanguageCode | null => {
  if (!value) {
    return null;
  }

  const lowered = value.toLowerCase();

  if (isLanguageCode(lowered)) {
    return lowered;
  }

  const shortened = lowered.slice(0, 2);
  return isLanguageCode(shortened) ? shortened : null;
};

export const detectBrowserLanguage = (): LanguageCode | null => {
  if (typeof navigator === "undefined") {
    return null;
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : navigator.language
      ? [navigator.language]
      : [];

  for (const candidate of candidates) {
    const normalized = normalizeLanguageCode(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return null;
};

export const getStoredLanguage = (): LanguageCode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return normalizeLanguageCode(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
};

export const storeLanguagePreference = (language: LanguageCode) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const resolveInitialLanguage = (): LanguageCode =>
  getStoredLanguage() ?? detectBrowserLanguage() ?? FALLBACK_LANGUAGE;
