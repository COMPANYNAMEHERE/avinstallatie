import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";
import { backgroundImage, siteContent } from "./content";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

app.innerHTML = `
  <div class="site">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="Primary navigation">
        <a href="#home">Homepage</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </aside>
    <button class="sidebar__overlay" type="button" aria-label="Close navigation"></button>
    <header class="site__header">
      <button
        class="header-scroll"
        type="button"
        aria-label="Toggle navigation"
        aria-controls="primary-sidebar"
        aria-expanded="false"
      >
        <img src="${headerButtonSrc}" alt="" />
      </button>
    </header>
    <main class="landing" role="main" aria-labelledby="site-title" id="home">
      <div class="landing__content">
        <figure class="landing__logo-wrapper" aria-hidden="true">
          <img class="landing__logo" src="${backgroundImage}" alt="" />
        </figure>
        <p class="landing__tagline">${siteContent.tagline}</p>
        <h1 id="site-title">${siteContent.name}</h1>
        <p class="landing__description">${siteContent.description}</p>
        <a class="landing__cta" href="${siteContent.cta.href}">${siteContent.cta.label}</a>
      </div>
    </main>
    <div id="about" class="anchor-spacer" aria-hidden="true"></div>
    <div id="contact" class="anchor-spacer" aria-hidden="true"></div>
  </div>
`;

const site = app.querySelector<HTMLDivElement>(".site");
const sidebar = app.querySelector<HTMLElement>("#primary-sidebar");
const scrollButton = app.querySelector<HTMLButtonElement>(".header-scroll");
const overlayButton = app.querySelector<HTMLButtonElement>(".sidebar__overlay");
const navLinks = Array.from(
  app.querySelectorAll<HTMLAnchorElement>(".sidebar__nav a")
);

const setSidebarState = (open: boolean) => {
  if (!site || !sidebar || !scrollButton) {
    return;
  }

  site.classList.toggle("site--sidebar-open", open);
  sidebar.setAttribute("aria-hidden", String(!open));
  scrollButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("no-scroll", open);
};

const toggleSidebar = () => {
  const isOpen = site?.classList.contains("site--sidebar-open") ?? false;
  setSidebarState(!isOpen);
};

if (scrollButton) {
  scrollButton.addEventListener("click", toggleSidebar);
}

if (overlayButton) {
  overlayButton.addEventListener("click", () => setSidebarState(false));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setSidebarState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setSidebarState(false);
  }
});
