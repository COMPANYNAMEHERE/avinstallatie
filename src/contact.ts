import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";
import { siteContent } from "./content";
import { CONTACT_CATEGORIES, CONTACT_ENDPOINT, KOERT_EMAIL } from "./config";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

const categoryOptions = CONTACT_CATEGORIES.map(
  (category, index) => `<option value="${category}" ${index === 0 ? "selected" : ""}>${category}</option>`
).join("");

app.innerHTML = `
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="./" aria-label="Return to homepage">
        <img src="${headerButtonSrc}" alt="" />
      </a>
    </header>

    <main class="contact" role="main" aria-labelledby="contact-title">
      <section class="contact__card" aria-live="polite">
        <div class="contact__intro">
          <p class="contact__tagline">${siteContent.tagline}</p>
          <h1 id="contact-title">Get in touch with Koert</h1>
          <p class="contact__subtext">
            Share your project goals and Koert will reach out with a tailored AV installation plan.
          </p>
          <p class="contact__subtext contact__subtext--alt">
            Prefer email? <a href="mailto:${KOERT_EMAIL}">${KOERT_EMAIL}</a>
          </p>
        </div>

        <form class="contact-form" autocomplete="on" novalidate>
          <label class="field">
            <span class="field__label">Full name</span>
            <input class="field__control" type="text" name="fullName" required placeholder="Your full name" />
          </label>

          <label class="field">
            <span class="field__label">Email address</span>
            <input
              class="field__control"
              type="email"
              name="email"
              required
              inputmode="email"
              placeholder="name@example.com"
            />
          </label>

          <label class="field">
            <span class="field__label">Category</span>
            <select class="field__control" name="category" required>
              ${categoryOptions}
            </select>
          </label>

          <label class="field field--area">
            <span class="field__label">Project details</span>
            <textarea
              class="field__control field__control--area"
              name="message"
              rows="6"
              required
              placeholder="Tell Koert about your space, timeline, and any specific AV needs."
            ></textarea>
          </label>

          <button class="contact-form__submit" type="submit">Send message</button>
        </form>

        <p class="contact__status" role="status" aria-live="polite"></p>
      </section>
    </main>
  </div>
`;

const form = app.querySelector<HTMLFormElement>(".contact-form");
const contactCard = app.querySelector<HTMLDivElement>(".contact__card");
const statusBanner = app.querySelector<HTMLParagraphElement>(".contact__status");

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

if (form && statusBanner) {
  const submitButton = form.querySelector<HTMLButtonElement>(".contact-form__submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const senderName = (formData.get("fullName") as string)?.trim() ?? "";
    const senderEmail = (formData.get("email") as string)?.trim() ?? "";
    const category = (formData.get("category") as string)?.trim() ?? CONTACT_CATEGORIES[0];
    const message = (formData.get("message") as string)?.trim() ?? "";

    if (!senderName || !senderEmail || !message) {
      form.reportValidity();
      return;
    }

    statusBanner.textContent = "";
    statusBanner.dataset.state = "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          message,
          category,
          _subject: `AV enquiry (${category}) from ${senderName}`,
          _template: "table"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      statusBanner.dataset.state = "success";
      statusBanner.textContent = "Message sent! Redirecting...";
      form.reset();

      window.setTimeout(() => {
        window.location.href = "./contact-success.html";
      }, 600);
    } catch (error) {
      statusBanner.textContent =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message. Please retry.";
      statusBanner.dataset.state = "error";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
    }
  });
}
