import {
  CONTACT_CATEGORIES,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  getObfuscatedContactEmail,
  hasEmailJsConfig
} from "../../config";
import { send as sendEmail } from "@emailjs/browser";
import type { LocalizedContent } from "../../content";
import notepadGraphic from "../../../assets/contactsnotepad.png";

interface MountHomeOptions {
  container: HTMLElement;
  content: LocalizedContent;
  backgroundImage: string;
}

interface MountContactOptions {
  container: HTMLElement;
  content: LocalizedContent;
  basePath: string;
}

const setupHomeGlows = (panel: HTMLElement) => {
  const handlePointerMove = (event: PointerEvent) => {
    const rect = panel.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const offsetX = (relativeX - 0.5) * 60;
    const offsetY = (relativeY - 0.5) * 60;
    panel.style.setProperty("--glow-x", `${offsetX}px`);
    panel.style.setProperty("--glow-y", `${offsetY}px`);
  };

  const handlePointerLeave = () => {
    panel.style.setProperty("--glow-x", "0px");
    panel.style.setProperty("--glow-y", "0px");
  };

  panel.addEventListener("pointermove", handlePointerMove);
  panel.addEventListener("pointerleave", handlePointerLeave);
};

const setupContactGlows = (card: HTMLElement) => {
  const handlePointer = (event: PointerEvent) => {
    const rect = card.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const offsetX = (relativeX - 0.5) * 65;
    const offsetY = (relativeY - 0.5) * 65;
    card.style.setProperty("--glow-x", `${offsetX}px`);
    card.style.setProperty("--glow-y", `${offsetY}px`);
  };

  card.addEventListener("pointermove", handlePointer);
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--glow-x", "0px");
    card.style.setProperty("--glow-y", "0px");
  });
};

export const mountHomePage = ({ container, content, backgroundImage }: MountHomeOptions) => {
  container.className = "landing";
  container.setAttribute("role", "main");
  container.setAttribute("aria-labelledby", "site-title");
  container.setAttribute("id", "home");
  container.innerHTML = `
    <div class="landing__content">
      <figure class="landing__logo-wrapper" aria-hidden="true">
        <img class="landing__logo" src="${backgroundImage}" alt="" />
      </figure>
      <p class="landing__tagline" data-i18n="landing.tagline">${content.tagline}</p>
      <h1 id="site-title">${content.name}</h1>
      <p class="landing__description" data-i18n="landing.description">${content.description}</p>
    </div>
  `;

  const landingPanel = container.querySelector<HTMLElement>(".landing__content");
  if (landingPanel) {
    setupHomeGlows(landingPanel);
  }
};

const renderCategoryOptions = () =>
  CONTACT_CATEGORIES.map(
    (category, index) => `<option value="${category}" ${index === 0 ? "selected" : ""}>${category}</option>`
  ).join("");

const resetFormState = (submitButton: HTMLButtonElement | null, statusBanner: HTMLElement | null, content: LocalizedContent) => {
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = content.contact.form.submit;
  }
  if (statusBanner) {
    statusBanner.textContent = "";
    statusBanner.dataset.state = "";
  }
};

export const mountContactPage = ({ container, content, basePath }: MountContactOptions) => {
  const obfuscatedEmail = getObfuscatedContactEmail();
  container.className = "contact contact--notepad";
  container.setAttribute("role", "main");
  container.removeAttribute("id");
  container.innerHTML = `
    <div class="contact__notepad" aria-live="polite" style="--notepad-bg: url('${notepadGraphic}');">
      <div class="contact__note-content">
        <div class="contact__intro">
          <h1 id="contact-title" data-i18n="contact.heading">${content.contact.heading}</h1>
          <p class="contact__subtext" data-i18n="contact.intro">
            ${content.contact.intro}
          </p>
        </div>

        <form class="contact-form" autocomplete="on" novalidate>
          <label class="field">
            <span class="field__label" data-i18n="form.nameLabel">${content.contact.form.nameLabel}</span>
            <input
              class="field__control"
              type="text"
              name="fullName"
              required
              placeholder="${content.contact.form.namePlaceholder}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.emailLabel">${content.contact.form.emailLabel}</span>
            <input
              class="field__control"
              type="email"
              name="email"
              required
              inputmode="email"
              placeholder="${obfuscatedEmail}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.categoryLabel">${content.contact.form.categoryLabel}</span>
            <select class="field__control" name="category" required>
              ${renderCategoryOptions()}
            </select>
          </label>

          <label class="field field--area">
            <span class="field__label" data-i18n="form.messageLabel">${content.contact.form.messageLabel}</span>
            <textarea
              class="field__control field__control--area"
              name="message"
              rows="6"
              required
              placeholder="${content.contact.form.messagePlaceholder}"
            ></textarea>
          </label>

          <button class="contact-form__submit" type="submit" data-i18n="form.submit">
            ${content.contact.form.submit}
          </button>
        </form>

        <p class="contact__note-footnote">Prefer to email? Use <span>${obfuscatedEmail}</span></p>
        <p class="contact__status" role="status" aria-live="polite"></p>
      </div>
    </div>
  `;

  const notePad = container.querySelector<HTMLElement>(".contact__notepad");
  if (notePad) {
    setupContactGlows(notePad);
  }

  const formElement = container.querySelector<HTMLFormElement>(".contact-form");
  const statusBanner = container.querySelector<HTMLElement>(".contact__status");
  const submitButton = formElement?.querySelector<HTMLButtonElement>('[data-i18n="form.submit"]');
  const nameInput = formElement?.querySelector<HTMLInputElement>('input[name="fullName"]');
  const emailInput = formElement?.querySelector<HTMLInputElement>('input[name="email"]');
  const messageInput = formElement?.querySelector<HTMLTextAreaElement>('textarea[name="message"]');

  if (!formElement || !statusBanner) {
    return;
  }

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const senderName = (formData.get("fullName") as string)?.trim() ?? "";
    const senderEmail = (formData.get("email") as string)?.trim() ?? "";
    const category =
      (formData.get("category") as string)?.trim() ?? CONTACT_CATEGORIES[0];
    const message = (formData.get("message") as string)?.trim() ?? "";

    if (!senderName || !senderEmail || !message) {
      formElement.reportValidity();
      return;
    }

    statusBanner.textContent = "";
    statusBanner.dataset.state = "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = content.contact.form.sending;
    }

    try {
      if (!hasEmailJsConfig) {
        throw new Error(content.contact.form.errorRequest);
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
      statusBanner.textContent = content.contact.form.success;
      formElement.reset();

      window.setTimeout(() => {
        window.location.href = `${basePath}contact-success.html`;
      }, 600);
    } catch (error) {
      statusBanner.textContent =
        error instanceof Error
          ? error.message
          : content.contact.form.errorUnknown;
      statusBanner.dataset.state = "error";
    } finally {
      resetFormState(submitButton, statusBanner, content);
    }
  });
};
