import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";
import { backgroundImage, siteContent } from "./content";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

app.innerHTML = `
  <div class="site">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="Primary navigation">
        <a href="${basePath}#home">Homepage</a>
        <a href="${basePath}contact.html">Contact</a>
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

navLinks.forEach((link) => {
  link.addEventListener("click", () => setSidebarState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setSidebarState(false);
  }
});

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
