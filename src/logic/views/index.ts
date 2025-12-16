import {
  CONTACT_CATEGORIES,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  hasEmailJsConfig
} from "../../config";
import { send as sendEmail } from "@emailjs/browser";
import type { HeroImageSources, LocalizedContent } from "../../content";
import optimizedNotepadPng from "../../../assets/contactsnotepad-optimizedPNG.png";
import optimizedNotepadWebp from "../../../assets/contactsnotepad-optimized.webp";
import optimizedNotepadWebpLight from "../../../assets/contactsnotepad-optimizedlight.webp";

interface MountHomeOptions {
  container: HTMLElement;
  content: LocalizedContent;
  backgroundImage: HeroImageSources;
}

interface MountContactOptions {
  container: HTMLElement;
  content: LocalizedContent;
  basePath: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const setupHomeScene = (panel: HTMLElement) => {
  const handlePointerMove = (event: PointerEvent) => {
    const rect = panel.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const offsetX = (relativeX - 0.5) * 60;
    const offsetY = (relativeY - 0.5) * 60;
    panel.style.setProperty("--glow-x", `${offsetX}px`);
    panel.style.setProperty("--glow-y", `${offsetY}px`);
    const tiltY = clamp((relativeX - 0.5) * 10, -10, 10);
    const tiltX = clamp((0.5 - relativeY) * 8, -8, 8);
    panel.style.setProperty("--tilt-x", `${tiltX}deg`);
    panel.style.setProperty("--tilt-y", `${tiltY}deg`);
    panel.style.setProperty("--spotlight-x", `${relativeX * 100}%`);
    panel.style.setProperty("--spotlight-y", `${relativeY * 100}%`);
    panel.style.setProperty("--shadow-offset-x", `${(relativeX - 0.5) * 28}px`);
    panel.style.setProperty("--shadow-offset-y", `${(relativeY - 0.5) * 18}px`);
  };

  const handlePointerLeave = () => {
    panel.style.setProperty("--glow-x", "0px");
    panel.style.setProperty("--glow-y", "0px");
    panel.style.setProperty("--tilt-x", "0deg");
    panel.style.setProperty("--tilt-y", "0deg");
    panel.style.setProperty("--spotlight-x", "50%");
    panel.style.setProperty("--spotlight-y", "42%");
    panel.style.setProperty("--shadow-offset-x", "0px");
    panel.style.setProperty("--shadow-offset-y", "0px");
  };

  panel.addEventListener("pointermove", handlePointerMove);
  panel.addEventListener("pointerleave", handlePointerLeave);
  handlePointerLeave();
};

const initGyroscope = (stage: HTMLElement) => {
  if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") {
    return;
  }

  let listening = false;
  let touchListener: (() => void) | null = null;

  const updateFromOrientation = (event: DeviceOrientationEvent) => {
    const { beta, gamma } = event;
    if (typeof beta !== "number" || typeof gamma !== "number") {
      return;
    }

    const tiltY = clamp(gamma, -10, 10);
    const tiltX = clamp(-(beta - 25), -9, 9);
    const offsetX = clamp((gamma / 10) * 45, -45, 45);
    const offsetY = clamp((beta - 45) / 2, -40, 40);

    stage.style.setProperty("--tilt-x", `${tiltX}deg`);
    stage.style.setProperty("--tilt-y", `${tiltY}deg`);
    stage.style.setProperty("--glow-x", `${offsetX}px`);
    stage.style.setProperty("--glow-y", `${offsetY}px`);
  };

  const startListening = () => {
    if (listening) {
      return;
    }

    window.addEventListener("deviceorientation", updateFromOrientation);
    listening = true;
  };

  const stopListening = () => {
    if (!listening) {
      return;
    }
    window.removeEventListener("deviceorientation", updateFromOrientation);
    listening = false;
  };

  const requestPermission = () => {
    if (typeof DeviceOrientationEvent === "undefined") {
      return;
    }

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((result) => {
          if (result === "granted") {
            startListening();
          }
        })
        .catch(() => {
          stopListening();
        });
    } else {
      startListening();
    }
  };

  const handleTouch = () => {
    touchListener && window.removeEventListener("touchstart", touchListener);
    touchListener = null;
    requestPermission();
  };

  touchListener = handleTouch;
  window.addEventListener("touchstart", handleTouch, { once: false, passive: true });

  // attempt to start immediately for browsers that do not require permission
  if (typeof DeviceOrientationEvent.requestPermission !== "function") {
    startListening();
  }
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
    <div class="landing__stage" data-3d-stage>
      <div class="landing__spotlight" aria-hidden="true"></div>
      <div class="landing__ground-shadow" aria-hidden="true"></div>
      <div class="landing__content">
        <figure class="landing__logo-wrapper" aria-hidden="true">
          <picture aria-hidden="true">
            <source
              srcset="${backgroundImage.webpLight}"
              type="image/webp"
              media="(prefers-reduced-data: reduce)"
            />
            <source srcset="${backgroundImage.webp}" type="image/webp" />
            <img
              class="landing__logo"
              src="${backgroundImage.png}"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>
        <p class="landing__tagline" data-i18n="landing.tagline">${content.tagline}</p>
        <h1 id="site-title">${content.name}</h1>
        <p class="landing__description" data-i18n="landing.description">${content.description}</p>
      </div>
    </div>
  `;

  const landingStage = container.querySelector<HTMLElement>(".landing__stage");
  if (landingStage) {
    setupHomeScene(landingStage);
    initGyroscope(landingStage);
  }

  preloadContactAssets();
};

const preloadImage = (href: string, type?: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const head = document.head;
  if (!head || head.querySelector(`link[rel="preload"][href="${href}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  if (type) {
    link.type = type;
  }

  head.appendChild(link);
};

const preloadContactAssets = () => {
  preloadImage(optimizedNotepadWebpLight, "image/webp");
  preloadImage(optimizedNotepadWebp, "image/webp");
  preloadImage(optimizedNotepadPng, "image/png");
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
  preloadContactAssets();
  container.className = "contact contact--notepad";
  container.setAttribute("role", "main");
  container.removeAttribute("id");
  container.innerHTML = `
      <div
        class="contact__notepad"
        aria-live="polite"
        style="
          --notepad-png: url('${optimizedNotepadPng}');
          --notepad-webp: url('${optimizedNotepadWebp}');
          --notepad-webp-light: url('${optimizedNotepadWebpLight}');
        "
      >
        <div class="contact__scroll-container">
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
                  inputmode="email"
                  placeholder="${content.contact.form.emailPlaceholder}"
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

            <p class="contact__status" role="status" aria-live="polite"></p>
          </div>
        </div>
      </div>
  `;

  const notePad = container.querySelector<HTMLElement>(".contact__notepad");
  if (notePad) {
    setupContactGlows(notePad);
  }

  const formElement = container.querySelector<HTMLFormElement>(".contact-form");
  const statusBanner = container.querySelector<HTMLElement>(".contact__status");
  const submitButton = formElement?.querySelector<HTMLButtonElement>('[data-i18n="form.submit"]') ?? null;
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

    if (!senderName || !message) {
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

      // Structure the message for better readability
      const structuredMessage = `
--------------------------------------------------
NEW ENQUIRY
--------------------------------------------------
Sender Name:  ${senderName}
Sender Email: ${senderEmail || "(Not provided)"}
Category:     ${category}
--------------------------------------------------
MESSAGE:

${message}
--------------------------------------------------
      `.trim();

      const emailParams = {
        name: senderName,
        time: new Date().toLocaleString(),
        title: `AV Enquiry: ${category}`,
        message: structuredMessage
      };

      await sendEmail(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      statusBanner.dataset.state = "success";
      statusBanner.textContent = content.contact.form.success;
      formElement.reset();

      window.setTimeout(() => {
        window.location.href = `${basePath}contact-result.html?status=success`;
      }, 600);
    } catch (error) {
      statusBanner.textContent =
        error instanceof Error
          ? error.message
          : content.contact.form.errorUnknown;
      statusBanner.dataset.state = "error";
      
      window.setTimeout(() => {
        window.location.href = `${basePath}contact-result.html?status=error`;
      }, 600);
    } finally {
      resetFormState(submitButton, statusBanner, content);
    }
  });
};
