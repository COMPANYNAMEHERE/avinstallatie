import{h as s}from"./style-kumpCsGf.js";const a="/",e=a.endsWith("/")?a:`${a}/`,o=document.querySelector("#app");if(!o)throw new Error("Root element #app not found");o.innerHTML=`
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="${e}" aria-label="Return to homepage">
        <img src="${s}" alt="" />
      </a>
    </header>

    <main class="contact" role="main">
      <section class="contact__card contact__card--center">
        <div class="contact-thankyou contact-thankyou--standalone">
          <div class="contact-thankyou__content">
            <h1>Message sent</h1>
            <p>Thanks for reaching out. Koert will get back to you shortly.</p>
            <p class="contact-thankyou__meta">Returning to the contact form in <span data-countdown>5</span> seconds…</p>
            <a class="contact-form__submit contact-form__submit--link" href="${e}contact.html">Back to contact</a>
          </div>
        </div>
      </section>
    </main>
  </div>
`;const n=o.querySelector("[data-countdown]");if(n){let t=5;n.textContent=t.toString();const c=window.setInterval(()=>{t-=1,n.textContent=t.toString(),t<=0&&(window.clearInterval(c),window.location.href="./contact.html")},1e3)}
