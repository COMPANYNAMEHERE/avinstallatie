import headerButtonSrc from "../../assets/headerbutton-transparent.png";
import "../styles/main.css";
import {
  backgroundImage,
  localizedContent,
  resolveInitialLanguage,
  storeLanguagePreference,
  type LanguageCode,
  type LocalizedContent
} from "../content";
import {
  initLayout,
  layoutMarkup,
  type LayoutControls,
  type LayoutRoute
} from "../logic/layout";
import { mountHomePage, mountContactPage } from "../logic/views";

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
  <div class="site">
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

const homeRoute: LayoutRoute = "home";
const contactRoute: LayoutRoute = "contact";

let currentRoute: LayoutRoute = window.location.pathname.endsWith("contact.html") ? contactRoute : homeRoute;
let layoutControls: LayoutControls | null = null;

const renderRoute = (route: LayoutRoute) => {
  if (route === homeRoute) {
    mountHomePage({
      container: pageOutlet,
      content: currentContent,
      backgroundImage
    });
  } else {
    mountContactPage({
      container: pageOutlet,
      content: currentContent,
      basePath
    });
  }
};

const navigateToRoute = (
  route: LayoutRoute,
  options: { push?: boolean; force?: boolean } = { push: true }
) => {
  if (!options.force && route === currentRoute) {
    layoutControls?.setActiveRoute(route);
    return;
  }

  currentRoute = route;
  layoutControls?.triggerHeaderTransition();
  renderRoute(route);
  layoutControls?.setActiveRoute(route);

  if (options.push !== false) {
    const targetUrl = route === homeRoute ? basePath : `${basePath}contact.html`;
    history.pushState({ route }, "", targetUrl);
  }
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
    renderRoute(currentRoute);
  },
  onNavLinkClick: (route, _, event) => {
    event.preventDefault();
    navigateToRoute(route);
  }
});

renderRoute(currentRoute);
layoutControls?.setActiveRoute(currentRoute);
history.replaceState({ route: currentRoute }, "", window.location.pathname);

window.addEventListener("popstate", (event) => {
  const route = (event.state as { route?: LayoutRoute } | null)?.route ?? currentRoute;
  navigateToRoute(route, { push: false, force: true });
});
