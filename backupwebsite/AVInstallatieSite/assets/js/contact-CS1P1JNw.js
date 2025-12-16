import{h as X}from"./style-BX4wqq1o.js";import{r as Y,l as V,L as G,i as z,s as F}from"./content-C_TjAsDG.js";const J="koert@avinstallatie.nl",K=`https://formsubmit.co/ajax/${encodeURIComponent(J)}`,U=["Residential project","Corporate / commercial","Event or venue","System support","General enquiry"],v="/",C=v.endsWith("/")?v:`${v}/`;let h=Y();const H=t=>V[t];let e=H(h);const W=t=>G.map(a=>`
      <option value="${a.code}" ${a.code===t?"selected":""}>
        ${a.flag}
      </option>
    `).join(""),n=document.querySelector("#app");if(!n)throw new Error("Root element #app not found");const Q=U.map((t,a)=>`<option value="${t}" ${a===0?"selected":""}>${t}</option>`).join("");n.innerHTML=`
  <div class="site contact-page">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="${e.aria.nav}">
        <a
          class="sidebar__nav-link"
          href="${C}#home"
          data-route="home"
          data-i18n="nav.home"
        >
          ${e.navigation.home}
        </a>
        <a
          class="sidebar__nav-link"
          href="${C}contact.html"
          data-route="contact"
          data-i18n="nav.contact"
        >
          ${e.navigation.contact}
        </a>
      </nav>
      <div class="sidebar__language">
        <label class="sidebar__language-label" for="language-picker" data-i18n="language.label">
          ${e.language.label}
        </label>
        <select
          id="language-picker"
          class="language-picker__select"
          aria-label="${e.language.label}"
        >
          ${W(h)}
        </select>
      </div>
    </aside>
    <button
      class="sidebar__overlay"
      type="button"
      aria-label="${e.aria.closeNavigation}"
    ></button>
    <header class="site__header">
      <button
        class="header-scroll"
        type="button"
        aria-label="${e.aria.headerButton}"
        aria-controls="primary-sidebar"
        aria-expanded="false"
      >
        <img src="${X}" alt="" />
      </button>
    </header>

    <main class="contact" role="main" aria-labelledby="contact-title">
      <section class="contact__card" aria-live="polite">
        <div class="contact__intro">
          <p class="contact__tagline" data-i18n="contact.tagline">${e.tagline}</p>
          <h1 id="contact-title" data-i18n="contact.heading">${e.contact.heading}</h1>
          <p class="contact__subtext" data-i18n="contact.intro">
            ${e.contact.intro}
          </p>
        </div>

        <form class="contact-form" autocomplete="on" novalidate>
          <label class="field">
            <span class="field__label" data-i18n="form.nameLabel">${e.contact.form.nameLabel}</span>
            <input
              class="field__control"
              type="text"
              name="fullName"
              required
              placeholder="${e.contact.form.namePlaceholder}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.emailLabel">${e.contact.form.emailLabel}</span>
            <input
              class="field__control"
              type="email"
              name="email"
              required
              inputmode="email"
              placeholder="${e.contact.form.emailPlaceholder}"
            />
          </label>

          <label class="field">
            <span class="field__label" data-i18n="form.categoryLabel">${e.contact.form.categoryLabel}</span>
            <select class="field__control" name="category" required>
              ${Q}
            </select>
          </label>

          <label class="field field--area">
            <span class="field__label" data-i18n="form.messageLabel">${e.contact.form.messageLabel}</span>
            <textarea
              class="field__control field__control--area"
              name="message"
              rows="6"
              required
              placeholder="${e.contact.form.messagePlaceholder}"
            ></textarea>
          </label>

          <button class="contact-form__submit" type="submit" data-i18n="form.submit">
            ${e.contact.form.submit}
          </button>
        </form>

        <p class="contact__status" role="status" aria-live="polite"></p>
      </section>
    </main>
  </div>
`;const m=n.querySelector(".site"),q=n.querySelector("#primary-sidebar"),d=n.querySelector(".header-scroll"),p=n.querySelector(".sidebar__overlay"),x=n.querySelector(".sidebar__nav"),M=Array.from(n.querySelectorAll(".sidebar__nav a")),A=n.querySelector('[data-i18n="nav.home"]'),w=n.querySelector('[data-i18n="nav.contact"]'),E=n.querySelector('[data-i18n="language.label"]'),i=n.querySelector("#language-picker"),P=n.querySelector('[data-i18n="contact.tagline"]'),k=n.querySelector('[data-i18n="contact.heading"]'),N=n.querySelector('[data-i18n="contact.intro"]'),T=n.querySelector('[data-i18n="form.nameLabel"]'),O=n.querySelector('[data-i18n="form.emailLabel"]'),I=n.querySelector('[data-i18n="form.categoryLabel"]'),B=n.querySelector('[data-i18n="form.messageLabel"]'),o=n.querySelector(".contact-form"),c=n.querySelector(".contact__card"),s=n.querySelector(".contact__status"),j=o==null?void 0:o.querySelector('input[name="fullName"]'),R=o==null?void 0:o.querySelector('input[name="email"]'),D=o==null?void 0:o.querySelector('textarea[name="message"]'),l=o==null?void 0:o.querySelector('[data-i18n="form.submit"]'),Z=t=>{M.forEach(a=>{const r=a.dataset.route===t;a.classList.toggle("sidebar__nav-link--active",r),r?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current")})},y=t=>{!m||!q||!d||(m.classList.toggle("site--sidebar-open",t),q.setAttribute("aria-hidden",String(!t)),d.setAttribute("aria-expanded",String(t)),document.body.classList.toggle("no-scroll",t))},ee=()=>{const t=(m==null?void 0:m.classList.contains("site--sidebar-open"))??!1;y(!t)};d&&d.addEventListener("click",ee);p&&p.addEventListener("click",()=>y(!1));M.forEach(t=>{t.addEventListener("click",()=>y(!1))});document.addEventListener("keydown",t=>{t.key==="Escape"&&y(!1)});Z("contact");const te=t=>{e=H(t),x&&x.setAttribute("aria-label",e.aria.nav),d&&d.setAttribute("aria-label",e.aria.headerButton),p&&p.setAttribute("aria-label",e.aria.closeNavigation),A&&(A.textContent=e.navigation.home),w&&(w.textContent=e.navigation.contact),E&&(E.textContent=e.language.label),i&&(i.value=t,i.setAttribute("aria-label",e.language.label),G.forEach((a,r)=>{i.options[r]&&(i.options[r].textContent=a.flag)})),P&&(P.textContent=e.tagline),k&&(k.textContent=e.contact.heading),N&&(N.textContent=e.contact.intro),T&&(T.textContent=e.contact.form.nameLabel),j&&(j.placeholder=e.contact.form.namePlaceholder),O&&(O.textContent=e.contact.form.emailLabel),R&&(R.placeholder=e.contact.form.emailPlaceholder),I&&(I.textContent=e.contact.form.categoryLabel),B&&(B.textContent=e.contact.form.messageLabel),D&&(D.placeholder=e.contact.form.messagePlaceholder),l&&(l.textContent=e.contact.form.submit)};i&&i.addEventListener("change",t=>{const a=t.target.value;z(a)&&(h=a,F(a),te(a))});if(c){const t=a=>{const r=c.getBoundingClientRect(),u=(a.clientX-r.left)/r.width,f=(a.clientY-r.top)/r.height,g=(u-.5)*65,b=(f-.5)*65;c.style.setProperty("--glow-x",`${g}px`),c.style.setProperty("--glow-y",`${b}px`)};c.addEventListener("pointermove",t),c.addEventListener("pointerleave",()=>{c.style.setProperty("--glow-x","0px"),c.style.setProperty("--glow-y","0px")})}o&&s&&o.addEventListener("submit",async t=>{var b,L,S,$;t.preventDefault();const a=new FormData(o),r=((b=a.get("fullName"))==null?void 0:b.trim())??"",u=((L=a.get("email"))==null?void 0:L.trim())??"",f=((S=a.get("category"))==null?void 0:S.trim())??U[0],g=(($=a.get("message"))==null?void 0:$.trim())??"";if(!r||!u||!g){o.reportValidity();return}s.textContent="",s.dataset.state="",l&&(l.disabled=!0,l.textContent=e.contact.form.sending);try{if(!(await fetch(K,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:r,email:u,message:g,category:f,_subject:`AV enquiry (${f}) from ${r}`,_template:"table"})})).ok)throw new Error(e.contact.form.errorRequest);s.dataset.state="success",s.textContent=e.contact.form.success,o.reset(),window.setTimeout(()=>{window.location.href="./contact-success.html"},600)}catch(_){s.textContent=_ instanceof Error?_.message:e.contact.form.errorUnknown,s.dataset.state="error"}finally{l&&(l.disabled=!1,l.textContent=e.contact.form.submit)}});
