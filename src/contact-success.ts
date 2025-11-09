import headerButtonSrc from "../assets/headerbutton-transparent.png";
import "./style.css";

const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app not found");
}

app.innerHTML = `
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="${basePath}" aria-label="Return to homepage">
        <img src="${headerButtonSrc}" alt="" />
      </a>
    </header>

    <main class="contact" role="main">
      <section class="contact__card contact__card--center">
        <div class="contact-thankyou contact-thankyou--standalone">
          <div class="contact-thankyou__content">
            <h1>Message sent</h1>
            <p>Thanks for reaching out. Koert will get back to you shortly.</p>
            <p class="contact-thankyou__meta">Returning to the contact form in <span data-countdown>5</span> seconds…</p>
            <a class="contact-form__submit contact-form__submit--link" href="${basePath}contact.html">Back to contact</a>
          </div>
        </div>
      </section>
    </main>
  </div>
`;

const countdownRef = app.querySelector<HTMLElement>("[data-countdown]");

if (countdownRef) {
  let secondsRemaining = 5;
  countdownRef.textContent = secondsRemaining.toString();

  const timer = window.setInterval(() => {
    secondsRemaining -= 1;
    countdownRef.textContent = secondsRemaining.toString();

    if (secondsRemaining <= 0) {
      window.clearInterval(timer);
      window.location.href = `${basePath}contact.html`;
    }
  }, 1000);
}
