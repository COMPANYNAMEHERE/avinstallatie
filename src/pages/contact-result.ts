import headerButtonSrc from "../../assets/headerbutton-transparent.png";
import "../styles/main.css";
import { localizedContent, resolveInitialLanguage } from "../content";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

// 1. Determine Language
const lang = resolveInitialLanguage();
const content = localizedContent[lang].resultPage;

// 2. Determine Status
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get("status");
const isError = status === "error";

const pageContent = isError ? content.error : content.success;
const redirectTarget = isError ? `${basePath}contact` : basePath;

// 3. Render
document.title = `${pageContent.title} · ${localizedContent[lang].name}`;

app.innerHTML = `
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="${basePath}" aria-label="${localizedContent[lang].aria.returnHome}">
        <img src="${headerButtonSrc}" alt="" />
      </a>
    </header>

    <main class="contact" role="main">
      <section class="contact__card contact__card--center">
        <div class="contact-thankyou contact-thankyou--standalone">
          <div class="contact-thankyou__content">
            <h1>${pageContent.title}</h1>
            <p>${pageContent.message}</p>
            <p class="contact-thankyou__meta">${pageContent.redirect} <span data-countdown>5</span> ${content.seconds}</p>
            <a class="contact-form__submit contact-form__submit--link" href="${redirectTarget}">${pageContent.button}</a>
          </div>
        </div>
      </section>
    </main>
  </div>
`;

// 4. Countdown Logic
const countdownRef = app.querySelector<HTMLElement>("[data-countdown]");

if (countdownRef) {
  let secondsRemaining = 5;
  countdownRef.textContent = secondsRemaining.toString();

  const timer = window.setInterval(() => {
    secondsRemaining -= 1;
    countdownRef.textContent = secondsRemaining.toString();

    if (secondsRemaining <= 0) {
      window.clearInterval(timer);
      window.location.href = redirectTarget;
    }
  }, 1000);
}
