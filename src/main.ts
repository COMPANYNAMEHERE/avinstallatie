import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";
import {
  backgroundImage,
  LANGUAGE_OPTIONS,
  localizedContent,
  resolveInitialLanguage,
  storeLanguagePreference,
  type LanguageCode,
  isLanguageCode
} from "./content";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

const renderLanguageOptions = (selected: LanguageCode) =>
  LANGUAGE_OPTIONS.map(
    (option) => `
      <option value="${option.code}" ${option.code === selected ? "selected" : ""}>
        ${option.flag}
      </option>
    `
  ).join("");

let currentLanguage: LanguageCode = resolveInitialLanguage();
const getContent = (language: LanguageCode) => localizedContent[language];
let currentContent = getContent(currentLanguage);

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

app.innerHTML = `
  <div class="site">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="${currentContent.aria.nav}">
        <a
          class="sidebar__nav-link"
          href="${basePath}#home"
          data-route="home"
          data-i18n="nav.home"
        >
          ${currentContent.navigation.home}
        </a>
        <a
          class="sidebar__nav-link"
          href="${basePath}contact.html"
          data-route="contact"
          data-i18n="nav.contact"
        >
          ${currentContent.navigation.contact}
        </a>
      </nav>
      <div class="sidebar__language">
        <label class="sidebar__language-label" for="language-picker" data-i18n="language.label">
          ${currentContent.language.label}
        </label>
        <select
          id="language-picker"
          class="language-picker__select"
          aria-label="${currentContent.language.label}"
        >
          ${renderLanguageOptions(currentLanguage)}
        </select>
      </div>
    </aside>
    <button
      class="sidebar__overlay"
      type="button"
      aria-label="${currentContent.aria.closeNavigation}"
    ></button>
    <header class="site__header">
      <button
        class="header-scroll"
        type="button"
        aria-label="${currentContent.aria.headerButton}"
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
        <p class="landing__tagline" data-i18n="landing.tagline">${currentContent.tagline}</p>
        <h1 id="site-title">${currentContent.name}</h1>
        <p class="landing__description" data-i18n="landing.description">${currentContent.description}</p>
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
const landingPanel = app.querySelector<HTMLDivElement>(".landing__content");
const navLinks = Array.from(
  app.querySelectorAll<HTMLAnchorElement>(".sidebar__nav a")
);
const navElement = app.querySelector<HTMLElement>(".sidebar__nav");
const navHomeLink = app.querySelector<HTMLAnchorElement>('[data-i18n="nav.home"]');
const navContactLink = app.querySelector<HTMLAnchorElement>('[data-i18n="nav.contact"]');
const landingTagline = app.querySelector<HTMLParagraphElement>('[data-i18n="landing.tagline"]');
const landingDescription = app.querySelector<HTMLParagraphElement>('[data-i18n="landing.description"]');
const languageLabel = app.querySelector<HTMLLabelElement>('[data-i18n="language.label"]');
const languageSelect = app.querySelector<HTMLSelectElement>("#language-picker");

type RouteKey = "home" | "contact";

const setActiveNav = (route: RouteKey) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle("sidebar__nav-link--active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

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

const DESKTOP_BREAKPOINT = 900;
const HEADER_TRANSITION_CLASS = "site--transitioning";
let headerTransitionTimer: ReturnType<typeof setTimeout> | null = null;

const isDesktopViewport = () => {
  return window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches;
};

const isPageNavigation = (link: HTMLAnchorElement) => {
  try {
    const linkUrl = new URL(link.href);
    return linkUrl.pathname !== window.location.pathname;
  } catch {
    return false;
  }
};

const startHeaderRetraction = () => {
  if (!site || !isDesktopViewport()) {
    return;
  }

  site.classList.add(HEADER_TRANSITION_CLASS);

  if (headerTransitionTimer) {
    window.clearTimeout(headerTransitionTimer);
  }

  headerTransitionTimer = window.setTimeout(() => {
    site.classList.remove(HEADER_TRANSITION_CLASS);
    headerTransitionTimer = null;
  }, 320);
};

let skipNextScrollClick = false;
let skipClickResetTimer: ReturnType<typeof setTimeout> | null = null;

const scheduleSkipClickReset = () => {
  if (skipClickResetTimer) {
    window.clearTimeout(skipClickResetTimer);
  }

  skipClickResetTimer = window.setTimeout(() => {
    skipNextScrollClick = false;
    skipClickResetTimer = null;
  }, 300);
};

if (scrollButton) {
  scrollButton.addEventListener("click", (event) => {
    if (skipNextScrollClick) {
      event.preventDefault();
      event.stopPropagation();
      skipNextScrollClick = false;
      if (skipClickResetTimer) {
        window.clearTimeout(skipClickResetTimer);
        skipClickResetTimer = null;
      }
      return;
    }

    toggleSidebar();
  });
}

const DRAG_OPEN_THRESHOLD = 90;
const MAX_DRAG_DISTANCE = 150;
const MAX_VERTICAL_DRAG = 45;
let dragStartX = 0;
let dragStartY = 0;
let dragPointerId: number | null = null;
let isDraggingScroll = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const setDragOffset = (x: number, y: number) => {
  if (!scrollButton) {
    return;
  }

  scrollButton.style.setProperty("--drag-offset-x", `${x}px`);
  scrollButton.style.setProperty("--drag-offset-y", `${y}px`);
};

const resetDragState = () => {
  if (!scrollButton) {
    return;
  }

  const pointerId = dragPointerId;
  dragOffsetX = 0;
  dragOffsetY = 0;
  isDraggingScroll = false;
  dragPointerId = null;
  scrollButton.classList.remove("header-scroll--dragging");

  if (typeof pointerId === "number" && scrollButton.hasPointerCapture(pointerId)) {
    scrollButton.releasePointerCapture(pointerId);
  }

  setDragOffset(0, 0);
};

const handleDragEnd = (event: PointerEvent) => {
  if (
    !scrollButton ||
    !isDraggingScroll ||
    event.pointerId !== dragPointerId
  ) {
    return;
  }

  const didMove = dragOffsetX > 6 || Math.abs(dragOffsetY) > 6;
  const shouldOpen = dragOffsetX >= DRAG_OPEN_THRESHOLD;

  resetDragState();

  if (didMove) {
    skipNextScrollClick = true;
    scheduleSkipClickReset();
  }

  if (shouldOpen) {
    setSidebarState(true);
  } else if (didMove) {
    setSidebarState(false);
  }
};

if (scrollButton) {
  scrollButton.addEventListener("pointerdown", (event) => {
    if (
      (event.pointerType === "mouse" && event.button !== 0) ||
      site?.classList.contains("site--sidebar-open")
    ) {
      return;
    }

    isDraggingScroll = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragPointerId = event.pointerId;
    dragOffsetX = 0;
    dragOffsetY = 0;
    scrollButton.classList.add("header-scroll--dragging");
    scrollButton.setPointerCapture(event.pointerId);
    if (event.pointerType !== "mouse") {
      event.preventDefault();
    }
  });

  scrollButton.addEventListener("pointermove", (event) => {
    if (!isDraggingScroll || event.pointerId !== dragPointerId) {
      return;
    }

    const deltaX = Math.max(0, event.clientX - dragStartX);
    const deltaY = event.clientY - dragStartY;
    dragOffsetX = Math.min(MAX_DRAG_DISTANCE, deltaX);
    dragOffsetY = Math.max(
      -MAX_VERTICAL_DRAG,
      Math.min(MAX_VERTICAL_DRAG, deltaY)
    );
    setDragOffset(dragOffsetX, dragOffsetY);
  });

  scrollButton.addEventListener("pointerup", handleDragEnd);
  scrollButton.addEventListener("pointercancel", handleDragEnd);
  scrollButton.addEventListener("lostpointercapture", () => {
    if (!isDraggingScroll) {
      return;
    }

    resetDragState();
    skipNextScrollClick = true;
    scheduleSkipClickReset();
  });
}

if (overlayButton) {
  overlayButton.addEventListener("click", () => setSidebarState(false));
}

setActiveNav("home");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setSidebarState(false);
    if (isPageNavigation(link)) {
      startHeaderRetraction();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setSidebarState(false);
  }
});

const applyLanguageToUI = (language: LanguageCode) => {
  currentContent = getContent(language);

  if (navElement) {
    navElement.setAttribute("aria-label", currentContent.aria.nav);
  }

  if (overlayButton) {
    overlayButton.setAttribute("aria-label", currentContent.aria.closeNavigation);
  }

  if (scrollButton) {
    scrollButton.setAttribute("aria-label", currentContent.aria.headerButton);
  }

  if (navHomeLink) {
    navHomeLink.textContent = currentContent.navigation.home;
  }

  if (navContactLink) {
    navContactLink.textContent = currentContent.navigation.contact;
  }

  if (landingTagline) {
    landingTagline.textContent = currentContent.tagline;
  }

  if (landingDescription) {
    landingDescription.textContent = currentContent.description;
  }

  if (languageLabel) {
    languageLabel.textContent = currentContent.language.label;
  }

  if (languageSelect) {
    languageSelect.value = language;
    languageSelect.setAttribute("aria-label", currentContent.language.label);
  }

  LANGUAGE_OPTIONS.forEach((option, index) => {
    if (!languageSelect?.options[index]) {
      return;
    }
    languageSelect.options[index].textContent = option.flag;
  });
};

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    const nextLanguage = (event.target as HTMLSelectElement).value;

    if (!isLanguageCode(nextLanguage)) {
      return;
    }

    currentLanguage = nextLanguage;
    storeLanguagePreference(nextLanguage);
    applyLanguageToUI(nextLanguage);
  });
}

if (landingPanel) {
  landingPanel.addEventListener("pointermove", (event) => {
    const rect = landingPanel.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const offsetX = (relativeX - 0.5) * 60;
    const offsetY = (relativeY - 0.5) * 60;

    landingPanel.style.setProperty("--glow-x", `${offsetX}px`);
    landingPanel.style.setProperty("--glow-y", `${offsetY}px`);
  });

  landingPanel.addEventListener("pointerleave", () => {
    landingPanel.style.setProperty("--glow-x", "0px");
    landingPanel.style.setProperty("--glow-y", "0px");
  });
}
