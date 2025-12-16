import{h as Y}from"./style-BX4wqq1o.js";import{r as B,l as G,L as q,b as H,i as U,s as j}from"./content-C_TjAsDG.js";const h="/",y=h.endsWith("/")?h:`${h}/`,z=e=>q.map(t=>`
      <option value="${t.code}" ${t.code===e?"selected":""}>
        ${t.flag}
      </option>
    `).join("");let m=B();const T=e=>G[e];let n=T(m);const i=document.querySelector("#app");if(!i)throw new Error("Root element #app not found");i.innerHTML=`
  <div class="site">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="${n.aria.nav}">
        <a
          class="sidebar__nav-link"
          href="${y}#home"
          data-route="home"
          data-i18n="nav.home"
        >
          ${n.navigation.home}
        </a>
        <a
          class="sidebar__nav-link"
          href="${y}contact.html"
          data-route="contact"
          data-i18n="nav.contact"
        >
          ${n.navigation.contact}
        </a>
      </nav>
      <div class="sidebar__language">
        <label class="sidebar__language-label" for="language-picker" data-i18n="language.label">
          ${n.language.label}
        </label>
        <select
          id="language-picker"
          class="language-picker__select"
          aria-label="${n.language.label}"
        >
          ${z(m)}
        </select>
      </div>
    </aside>
    <button
      class="sidebar__overlay"
      type="button"
      aria-label="${n.aria.closeNavigation}"
    ></button>
    <header class="site__header">
      <button
        class="header-scroll"
        type="button"
        aria-label="${n.aria.headerButton}"
        aria-controls="primary-sidebar"
        aria-expanded="false"
      >
        <img src="${Y}" alt="" />
      </button>
    </header>
    <main class="landing" role="main" aria-labelledby="site-title" id="home">
      <div class="landing__content">
        <figure class="landing__logo-wrapper" aria-hidden="true">
          <img class="landing__logo" src="${H}" alt="" />
        </figure>
        <p class="landing__tagline" data-i18n="landing.tagline">${n.tagline}</p>
        <h1 id="site-title">${n.name}</h1>
        <p class="landing__description" data-i18n="landing.description">${n.description}</p>
      </div>
    </main>
    <div id="about" class="anchor-spacer" aria-hidden="true"></div>
    <div id="contact" class="anchor-spacer" aria-hidden="true"></div>
  </div>
`;const o=i.querySelector(".site"),_=i.querySelector("#primary-sidebar"),a=i.querySelector(".header-scroll"),v=i.querySelector(".sidebar__overlay"),l=i.querySelector(".landing__content"),D=Array.from(i.querySelectorAll(".sidebar__nav a")),L=i.querySelector(".sidebar__nav"),S=i.querySelector('[data-i18n="nav.home"]'),E=i.querySelector('[data-i18n="nav.contact"]'),$=i.querySelector('[data-i18n="landing.tagline"]'),A=i.querySelector('[data-i18n="landing.description"]'),x=i.querySelector('[data-i18n="language.label"]'),s=i.querySelector("#language-picker"),V=e=>{D.forEach(t=>{const r=t.dataset.route===e;t.classList.toggle("sidebar__nav-link--active",r),r?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})},g=e=>{!o||!_||!a||(o.classList.toggle("site--sidebar-open",e),_.setAttribute("aria-hidden",String(!e)),a.setAttribute("aria-expanded",String(e)),document.body.classList.toggle("no-scroll",e))},W=()=>{const e=(o==null?void 0:o.classList.contains("site--sidebar-open"))??!1;g(!e)};let f=!1,c=null;const I=()=>{c&&window.clearTimeout(c),c=window.setTimeout(()=>{f=!1,c=null},300)};a&&a.addEventListener("click",e=>{if(f){e.preventDefault(),e.stopPropagation(),f=!1,c&&(window.clearTimeout(c),c=null);return}W()});const F=90,J=150,C=45;let k=0,w=0,b=null,u=!1,d=0,p=0;const O=(e,t)=>{a&&(a.style.setProperty("--drag-offset-x",`${e}px`),a.style.setProperty("--drag-offset-y",`${t}px`))},X=()=>{if(!a)return;const e=b;d=0,p=0,u=!1,b=null,a.classList.remove("header-scroll--dragging"),typeof e=="number"&&a.hasPointerCapture(e)&&a.releasePointerCapture(e),O(0,0)},P=e=>{if(!a||!u||e.pointerId!==b)return;const t=d>6||Math.abs(p)>6,r=d>=F;X(),t&&(f=!0,I()),r?g(!0):t&&g(!1)};a&&(a.addEventListener("pointerdown",e=>{e.pointerType==="mouse"&&e.button!==0||o!=null&&o.classList.contains("site--sidebar-open")||(u=!0,k=e.clientX,w=e.clientY,b=e.pointerId,d=0,p=0,a.classList.add("header-scroll--dragging"),a.setPointerCapture(e.pointerId),e.pointerType!=="mouse"&&e.preventDefault())}),a.addEventListener("pointermove",e=>{if(!u||e.pointerId!==b)return;const t=Math.max(0,e.clientX-k),r=e.clientY-w;d=Math.min(J,t),p=Math.max(-C,Math.min(C,r)),O(d,p)}),a.addEventListener("pointerup",P),a.addEventListener("pointercancel",P),a.addEventListener("lostpointercapture",()=>{u&&(X(),f=!0,I())}));v&&v.addEventListener("click",()=>g(!1));V("home");D.forEach(e=>{e.addEventListener("click",()=>g(!1))});document.addEventListener("keydown",e=>{e.key==="Escape"&&g(!1)});const K=e=>{n=T(e),L&&L.setAttribute("aria-label",n.aria.nav),v&&v.setAttribute("aria-label",n.aria.closeNavigation),a&&a.setAttribute("aria-label",n.aria.headerButton),S&&(S.textContent=n.navigation.home),E&&(E.textContent=n.navigation.contact),$&&($.textContent=n.tagline),A&&(A.textContent=n.description),x&&(x.textContent=n.language.label),s&&(s.value=e,s.setAttribute("aria-label",n.language.label)),q.forEach((t,r)=>{s!=null&&s.options[r]&&(s.options[r].textContent=t.flag)})};s&&s.addEventListener("change",e=>{const t=e.target.value;U(t)&&(m=t,j(t),K(t))});l&&(l.addEventListener("pointermove",e=>{const t=l.getBoundingClientRect(),r=(e.clientX-t.left)/t.width,M=(e.clientY-t.top)/t.height,R=(r-.5)*60,N=(M-.5)*60;l.style.setProperty("--glow-x",`${R}px`),l.style.setProperty("--glow-y",`${N}px`)}),l.addEventListener("pointerleave",()=>{l.style.setProperty("--glow-x","0px"),l.style.setProperty("--glow-y","0px")}));
