import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";
import {
  localizedContent,
  resolveInitialLanguage,
  type LanguageCode,
  LANGUAGE_OPTIONS,
  storeLanguagePreference,
  isLanguageCode
} from "./content";
import {
  CONTACT_CATEGORIES,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  hasEmailJsConfig
} from "./config";
import { send as sendEmail } from "@emailjs/browser";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

let currentLanguage: LanguageCode = resolveInitialLanguage();
const getContent = (language: LanguageCode) => localizedContent[language];
let currentContent = getContent(currentLanguage);

const renderLanguageOptions = (selected: LanguageCode) =>
  LANGUAGE_OPTIONS.map(
    (option) => `
      <option value="${option.code}" ${option.code === selected ? "selected" : ""}>
        ${option.flag}
      </option>
    `
  ).join("");

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

const categoryOptions = CONTACT_CATEGORIES.map(
  (category, index) => `<option value="${category}" ${index === 0 ? "selected" : ""}>${category}</option>`
).join("");

app.innerHTML = `
  <div class="site contact-page">
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

    <main class="contact" role="main" aria-labelledby="contact-title">
      <section class="contact__card" aria-live="polite">
        <div class="contact__intro">
          <p class="contact__tagline" data-i18n="contact.tagline">${currentContent.tagline}</p>
          <h1 id="contact-title" data-i18n="contact.heading">${currentContent.contact.heading}</h1>
          <p class="contact__subtext" data-i18n="contact.intro">
            ${currentContent.contact.intro}
          </p>
        </div>

        <form class="contact-form" autocomplete="on" novalidate>
          <label class="field">
            <span class="field__label" data-i18n="form.nameLabel">${currentContent.contact.form.nameLabel}</span>
            <input
              class="field__control"
              type="text"
              name="fullName"
              required
              placeholder="${currentContent.contact.form.namePlaceholder}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.emailLabel">${currentContent.contact.form.emailLabel}</span>
            <input
              class="field__control"
              type="email"
              name="email"
              required
              inputmode="email"
              placeholder="${currentContent.contact.form.emailPlaceholder}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.categoryLabel">${currentContent.contact.form.categoryLabel}</span>
            <select class="field__control" name="category" required>
              ${categoryOptions}
            </select>
          </label>

          <label class="field field--area">
            <span class="field__label" data-i18n="form.messageLabel">${currentContent.contact.form.messageLabel}</span>
            <textarea
              class="field__control field__control--area"
              name="message"
              rows="6"
              required
              placeholder="${currentContent.contact.form.messagePlaceholder}"
            ></textarea>
          </label>

          <button class="contact-form__submit" type="submit" data-i18n="form.submit">
            ${currentContent.contact.form.submit}
          </button>
        </form>

        <p class="contact__status" role="status" aria-live="polite"></p>
      </section>
    </main>
  </div>
`;

const site = app.querySelector<HTMLDivElement>(".site");
const sidebar = app.querySelector<HTMLElement>("#primary-sidebar");
const scrollButton = app.querySelector<HTMLButtonElement>(".header-scroll");
const overlayButton = app.querySelector<HTMLButtonElement>(".sidebar__overlay");
const navElement = app.querySelector<HTMLElement>(".sidebar__nav");
const navLinks = Array.from(app.querySelectorAll<HTMLAnchorElement>(".sidebar__nav a"));
const navHomeLink = app.querySelector<HTMLAnchorElement>('[data-i18n="nav.home"]');
const navContactLink = app.querySelector<HTMLAnchorElement>('[data-i18n="nav.contact"]');
const languageLabel = app.querySelector<HTMLLabelElement>('[data-i18n="language.label"]');
const languageSelect = app.querySelector<HTMLSelectElement>("#language-picker");
const contactTagline = app.querySelector<HTMLParagraphElement>('[data-i18n="contact.tagline"]');
const contactHeading = app.querySelector<HTMLHeadingElement>('[data-i18n="contact.heading"]');
const contactIntro = app.querySelector<HTMLParagraphElement>('[data-i18n="contact.intro"]');
const formNameLabel = app.querySelector<HTMLSpanElement>('[data-i18n="form.nameLabel"]');
const formEmailLabel = app.querySelector<HTMLSpanElement>('[data-i18n="form.emailLabel"]');
const formCategoryLabel = app.querySelector<HTMLSpanElement>('[data-i18n="form.categoryLabel"]');
const formMessageLabel = app.querySelector<HTMLSpanElement>('[data-i18n="form.messageLabel"]');
const formElement = app.querySelector<HTMLFormElement>(".contact-form");
const contactCard = app.querySelector<HTMLDivElement>(".contact__card");
const statusBanner = app.querySelector<HTMLParagraphElement>(".contact__status");
const nameInput = formElement?.querySelector<HTMLInputElement>('input[name="fullName"]');
const emailInput = formElement?.querySelector<HTMLInputElement>('input[name="email"]');
const messageInput = formElement?.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
const submitButton = formElement?.querySelector<HTMLButtonElement>('[data-i18n="form.submit"]');

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
    dragOffsetY = Math.max(-MAX_VERTICAL_DRAG, Math.min(MAX_VERTICAL_DRAG, deltaY));
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

setActiveNav("contact");

const applyLanguageToUI = (language: LanguageCode) => {
  currentContent = getContent(language);

  if (navElement) {
    navElement.setAttribute("aria-label", currentContent.aria.nav);
  }

  if (scrollButton) {
    scrollButton.setAttribute("aria-label", currentContent.aria.headerButton);
  }

  if (overlayButton) {
    overlayButton.setAttribute("aria-label", currentContent.aria.closeNavigation);
  }

  if (navHomeLink) {
    navHomeLink.textContent = currentContent.navigation.home;
  }

  if (navContactLink) {
    navContactLink.textContent = currentContent.navigation.contact;
  }

  if (languageLabel) {
    languageLabel.textContent = currentContent.language.label;
  }

  if (languageSelect) {
    languageSelect.value = language;
    languageSelect.setAttribute("aria-label", currentContent.language.label);
    LANGUAGE_OPTIONS.forEach((option, index) => {
      if (languageSelect.options[index]) {
        languageSelect.options[index].textContent = option.flag;
      }
    });
  }

  if (contactTagline) {
    contactTagline.textContent = currentContent.tagline;
  }

  if (contactHeading) {
    contactHeading.textContent = currentContent.contact.heading;
  }

  if (contactIntro) {
    contactIntro.textContent = currentContent.contact.intro;
  }

  if (formNameLabel) {
    formNameLabel.textContent = currentContent.contact.form.nameLabel;
  }

  if (nameInput) {
    nameInput.placeholder = currentContent.contact.form.namePlaceholder;
  }

  if (formEmailLabel) {
    formEmailLabel.textContent = currentContent.contact.form.emailLabel;
  }

  if (emailInput) {
    emailInput.placeholder = currentContent.contact.form.emailPlaceholder;
  }

  if (formCategoryLabel) {
    formCategoryLabel.textContent = currentContent.contact.form.categoryLabel;
  }

  if (formMessageLabel) {
    formMessageLabel.textContent = currentContent.contact.form.messageLabel;
  }

  if (messageInput) {
    messageInput.placeholder = currentContent.contact.form.messagePlaceholder;
  }

  if (submitButton) {
    submitButton.textContent = currentContent.contact.form.submit;
  }
};

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    const selected = (event.target as HTMLSelectElement).value;

    if (!isLanguageCode(selected)) {
      return;
    }

    currentLanguage = selected;
    storeLanguagePreference(selected);
    applyLanguageToUI(selected);
  });
}

if (contactCard) {
  const handlePointer = (event: PointerEvent) => {
    const rect = contactCard.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const offsetX = (relativeX - 0.5) * 65;
    const offsetY = (relativeY - 0.5) * 65;

    contactCard.style.setProperty("--glow-x", `${offsetX}px`);
    contactCard.style.setProperty("--glow-y", `${offsetY}px`);
  };

  contactCard.addEventListener("pointermove", handlePointer);
  contactCard.addEventListener("pointerleave", () => {
    contactCard.style.setProperty("--glow-x", "0px");
    contactCard.style.setProperty("--glow-y", "0px");
  });
}

if (formElement && statusBanner) {
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const senderName = (formData.get("fullName") as string)?.trim() ?? "";
    const senderEmail = (formData.get("email") as string)?.trim() ?? "";
    const category = (formData.get("category") as string)?.trim() ?? CONTACT_CATEGORIES[0];
    const message = (formData.get("message") as string)?.trim() ?? "";

    if (!senderName || !senderEmail || !message) {
      formElement.reportValidity();
      return;
    }

    statusBanner.textContent = "";
    statusBanner.dataset.state = "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = currentContent.contact.form.sending;
    }

    try {
      if (!hasEmailJsConfig) {
        throw new Error(currentContent.contact.form.errorRequest);
      }

      await sendEmail(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          fullName: senderName,
          replyTo: senderEmail,
          category,
          message,
          subject: `AV enquiry (${category}) from ${senderName}`
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      statusBanner.dataset.state = "success";
      statusBanner.textContent = currentContent.contact.form.success;
      formElement.reset();

      window.setTimeout(() => {
        window.location.href = `${basePath}contact-success.html`;
      }, 600);
    } catch (error) {
      statusBanner.textContent =
        error instanceof Error
          ? error.message
          : currentContent.contact.form.errorUnknown;
      statusBanner.dataset.state = "error";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = currentContent.contact.form.submit;
      }
    }
  });
}
