import type { LanguageCode, LocalizedContent } from "./content";
import { isLanguageCode, LANGUAGE_OPTIONS } from "./content";

export type LayoutRoute = "home" | "contact";

interface LayoutMarkupProps {
  basePath: string;
  currentContent: LocalizedContent;
  currentLanguage: LanguageCode;
  headerButtonSrc: string;
}

const renderLanguageOptions = (selected: LanguageCode) =>
  LANGUAGE_OPTIONS.map(
    (option) => `
      <option value="${option.code}" ${option.code === selected ? "selected" : ""}>
        ${option.flag}
      </option>
    `
  ).join("");

export const layoutMarkup = ({
  basePath,
  currentContent,
  currentLanguage,
  headerButtonSrc
}: LayoutMarkupProps) => `
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
  <main id="page-content"></main>
`;

const DESKTOP_BREAKPOINT = 900;
const HEADER_TRANSITION_CLASS = "site--transitioning";

interface LayoutInitOptions {
  site: HTMLElement;
  initialContent: LocalizedContent;
  initialLanguage: LanguageCode;
  onLanguageChange?: (language: LanguageCode) => void;
  onNavLinkClick?: (
    route: LayoutRoute,
    link: HTMLAnchorElement,
    event: MouseEvent
  ) => void;
}

export interface LayoutControls {
  setActiveRoute(route: LayoutRoute): void;
  updateContent(content: LocalizedContent): void;
  setLanguage(language: LanguageCode): void;
  closeSidebar(): void;
  triggerHeaderTransition(): void;
}

export const isPageNavigation = (link: HTMLAnchorElement) => {
  try {
    const linkUrl = new URL(link.href);
    return linkUrl.pathname !== window.location.pathname;
  } catch {
    return false;
  }
};

export const initLayout = ({
  site,
  initialContent,
  initialLanguage,
  onLanguageChange,
  onNavLinkClick
}: LayoutInitOptions): LayoutControls => {
  const sidebar = site.querySelector<HTMLElement>("#primary-sidebar");
  const scrollButton = site.querySelector<HTMLButtonElement>(".header-scroll");
  const overlayButton = site.querySelector<HTMLButtonElement>(".sidebar__overlay");
  const navElement = site.querySelector<HTMLElement>(".sidebar__nav");
  const navLinks = Array.from(site.querySelectorAll<HTMLAnchorElement>(".sidebar__nav-link"));
  const navHomeLink = site.querySelector<HTMLAnchorElement>('[data-i18n="nav.home"]');
  const navContactLink = site.querySelector<HTMLAnchorElement>('[data-i18n="nav.contact"]');
  const languageLabel = site.querySelector<HTMLLabelElement>('[data-i18n="language.label"]');
  const languageSelect = site.querySelector<HTMLSelectElement>("#language-picker");

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
    if (!scrollButton || !isDraggingScroll || event.pointerId !== dragPointerId) {
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

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      setSidebarState(false);
      if (typeof onNavLinkClick === "function") {
        const route = (link.dataset.route ?? "home") as LayoutRoute;
        onNavLinkClick(route, link, event);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSidebarState(false);
    }
  });

  const setActiveRoute = (route: LayoutRoute) => {
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

  const updateLanguageSelectFlags = () => {
    if (!languageSelect) {
      return;
    }

    LANGUAGE_OPTIONS.forEach((option, index) => {
      if (languageSelect.options[index]) {
        languageSelect.options[index].textContent = option.flag;
      }
    });
  };

  const updateContent = (content: LocalizedContent) => {
    if (navElement) {
      navElement.setAttribute("aria-label", content.aria.nav);
    }

    if (overlayButton) {
      overlayButton.setAttribute("aria-label", content.aria.closeNavigation);
    }

    if (scrollButton) {
      scrollButton.setAttribute("aria-label", content.aria.headerButton);
    }

    if (navHomeLink) {
      navHomeLink.textContent = content.navigation.home;
    }

    if (navContactLink) {
      navContactLink.textContent = content.navigation.contact;
    }

    if (languageLabel) {
      languageLabel.textContent = content.language.label;
    }

    if (languageSelect) {
      languageSelect.setAttribute("aria-label", content.language.label);
      updateLanguageSelectFlags();
    }
  };

  const setLanguage = (language: LanguageCode) => {
    if (languageSelect) {
      languageSelect.value = language;
    }
  };

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      const nextLanguage = (event.target as HTMLSelectElement).value;

      if (!isLanguageCode(nextLanguage)) {
        return;
      }

      setLanguage(nextLanguage);
      if (typeof onLanguageChange === "function") {
        onLanguageChange(nextLanguage);
      }
    });
  }

  let headerTransitionTimer: ReturnType<typeof setTimeout> | null = null;

  const isDesktopViewport = () =>
    window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches;

  const triggerHeaderTransition = () => {
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

  updateContent(initialContent);

  return {
    setActiveRoute,
    updateContent,
    setLanguage,
    closeSidebar: () => setSidebarState(false),
    triggerHeaderTransition
  };
};
