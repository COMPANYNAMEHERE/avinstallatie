import headerButtonSrc from "../../assets/headerbutton-transparent.png";
import "../styles/main.css";
import "../styles/contact.css";
import {
  localizedContent,
  resolveInitialLanguage,
  storeLanguagePreference,
  type LanguageCode,
  type LocalizedContent
} from "../content";
import { layoutMarkup, initLayout, type LayoutControls } from "../logic/layout";
import { mountContactPage } from "../logic/views";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

let currentLanguage: LanguageCode = resolveInitialLanguage();
const getContent = (language: LanguageCode) => localizedContent[language];
let currentContent: LocalizedContent = getContent(currentLanguage);

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

app.innerHTML = `
  <div class="site contact-page">
    ${layoutMarkup({
      basePath,
      currentContent,
      currentLanguage,
      headerButtonSrc
    })}
  </div>
`;

const site = app.querySelector<HTMLDivElement>(".site");
const pageOutlet = site?.querySelector<HTMLElement>('#page-content');

if (!site || !pageOutlet) {
  throw new Error("Site structure incomplete");
}

let layoutControls: LayoutControls | null = null;

const renderContact = () => {
  mountContactPage({
    container: pageOutlet,
    content: currentContent,
    basePath
  });
};

layoutControls = initLayout({
  site,
  initialContent: currentContent,
  initialLanguage: currentLanguage,
  onLanguageChange: (nextLanguage) => {
    currentLanguage = nextLanguage;
    currentContent = getContent(nextLanguage);
    storeLanguagePreference(nextLanguage);
    layoutControls?.updateContent(currentContent);
    renderContact();
  }
});

layoutControls.setActiveRoute("contact");
renderContact();
