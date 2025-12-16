const Q="/assets/img/av-installatie-transparent-BwaKmYVx.png",Z={name:"Koert Manni",tagline:"Tailored AV Installations",description:"Tailored audio-visual installations that blend seamlessly with every environment.",navigation:{home:"Home",contact:"Contact"},aria:{headerButton:"Toggle navigation",nav:"Primary navigation",closeNavigation:"Close navigation",returnHome:"Return to homepage"},language:{label:"Language:"},contact:{heading:"Get in touch with Koert",intro:"Share your project goals and Koert will respond with a tailored AV plan.",form:{nameLabel:"Full name",namePlaceholder:"Your full name",emailLabel:"Email address",emailPlaceholder:"name@example.com",categoryLabel:"Category",messageLabel:"Project details",messagePlaceholder:"Tell Koert about the space, timeline, and AV requirements.",submit:"Send message",sending:"Sending...",success:"Message sent! Redirecting...",errorRequest:"Failed to send message. Please try again.",errorUnknown:"Something went wrong while sending. Please try again."}}},ee={name:"Koert Manni",tagline:"AV-installaties op maat",description:"Maatwerk audio-visuele installaties die naadloos in elke omgeving opgaan.",navigation:{home:"Home",contact:"Contact"},aria:{headerButton:"Navigatie openen of sluiten",nav:"Hoofdnavigatie",closeNavigation:"Navigatie sluiten",returnHome:"Terug naar de homepage"},language:{label:"Taal:"},contact:{heading:"Neem contact op",intro:"Deel je projectdoelen en Koert neemt contact op met een passend AV-plan.",form:{nameLabel:"Volledige naam",namePlaceholder:"Naam",emailLabel:"E-mailadres",emailPlaceholder:"naam@voorbeeld.nl",categoryLabel:"Categorie",messageLabel:"Projectdetails",messagePlaceholder:"Beschrijf de ruimte, planning en specifieke AV-wensen.",submit:"Verstuur bericht",sending:"Verzenden...",success:"Bericht verzonden! Even geduld...",errorRequest:"Versturen mislukt. Probeer het opnieuw.",errorUnknown:"Er ging iets mis tijdens het versturen. Probeer het opnieuw."}}},qe=Q,te={nl:ee,en:Z},ae=Object.keys(te),M="preferred-language",O=[{code:"nl",label:"Nederlands",flag:"🇳🇱"},{code:"en",label:"English",flag:"🇬🇧"}],ne="nl",k=e=>ae.includes(e),B=e=>{if(!e)return null;const t=e.toLowerCase();if(k(t))return t;const n=t.slice(0,2);return k(n)?n:null},re=()=>{var t;if(typeof navigator>"u")return null;const e=(t=navigator.languages)!=null&&t.length?navigator.languages:navigator.language?[navigator.language]:[];for(const n of e){const o=B(n);if(o)return o}return null},se=()=>typeof window>"u"?null:B(window.localStorage.getItem(M)),Ne=e=>{typeof window>"u"||window.localStorage.setItem(M,e)},Ve=()=>se()??re()??ne,oe=e=>O.map(t=>`
      <option value="${t.code}" ${t.code===e?"selected":""}>
        ${t.flag}
      </option>
    `).join(""),je=({basePath:e,currentContent:t,currentLanguage:n,headerButtonSrc:o})=>`
  <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
    <nav class="sidebar__nav" aria-label="${t.aria.nav}">
      <a
        class="sidebar__nav-link"
        href="${e}#home"
        data-route="home"
        data-i18n="nav.home"
      >
        ${t.navigation.home}
      </a>
      <a
        class="sidebar__nav-link"
        href="${e}contact.html"
        data-route="contact"
        data-i18n="nav.contact"
      >
        ${t.navigation.contact}
      </a>
    </nav>
    <div class="sidebar__language">
      <label class="sidebar__language-label" for="language-picker" data-i18n="language.label">
        ${t.language.label}
      </label>
      <select
        id="language-picker"
        class="language-picker__select"
        aria-label="${t.language.label}"
      >
        ${oe(n)}
      </select>
    </div>
  </aside>
  <button
    class="sidebar__overlay"
    type="button"
    aria-label="${t.aria.closeNavigation}"
  ></button>
  <header class="site__header">
    <button
      class="header-scroll"
      type="button"
      aria-label="${t.aria.headerButton}"
      aria-controls="primary-sidebar"
      aria-expanded="false"
    >
      <img src="${o}" alt="" />
    </button>
  </header>
  <main id="page-content"></main>
`,ie=900,D="site--transitioning",De=({site:e,initialContent:t,initialLanguage:n,onLanguageChange:o,onNavLinkClick:r})=>{const i=e.querySelector("#primary-sidebar"),s=e.querySelector(".header-scroll"),c=e.querySelector(".sidebar__overlay"),u=e.querySelector(".sidebar__nav"),f=Array.from(e.querySelectorAll(".sidebar__nav-link")),h=e.querySelector('[data-i18n="nav.home"]'),_=e.querySelector('[data-i18n="nav.contact"]'),w=e.querySelector('[data-i18n="language.label"]'),d=e.querySelector("#language-picker"),g=a=>{!e||!i||!s||(e.classList.toggle("site--sidebar-open",a),i.setAttribute("aria-hidden",String(!a)),s.setAttribute("aria-expanded",String(a)),document.body.classList.toggle("no-scroll",a))},P=()=>{const a=(e==null?void 0:e.classList.contains("site--sidebar-open"))??!1;g(!a)};let p=!1,m=null;const $=()=>{m&&window.clearTimeout(m),m=window.setTimeout(()=>{p=!1,m=null},300)};s&&s.addEventListener("click",a=>{if(p){a.preventDefault(),a.stopPropagation(),p=!1,m&&(window.clearTimeout(m),m=null);return}P()});const X=90,U=150,x=45;let C=0,I=0,L=null,S=!1,y=0,E=0;const R=(a,l)=>{s&&(s.style.setProperty("--drag-offset-x",`${a}px`),s.style.setProperty("--drag-offset-y",`${l}px`))},q=()=>{if(!s)return;const a=L;y=0,E=0,S=!1,L=null,s.classList.remove("header-scroll--dragging"),typeof a=="number"&&s.hasPointerCapture(a)&&s.releasePointerCapture(a),R(0,0)},N=a=>{if(!s||!S||a.pointerId!==L)return;const l=y>6||Math.abs(E)>6,b=y>=X;q(),l&&(p=!0,$()),b?g(!0):l&&g(!1)};s&&(s.addEventListener("pointerdown",a=>{a.pointerType==="mouse"&&a.button!==0||e!=null&&e.classList.contains("site--sidebar-open")||(S=!0,C=a.clientX,I=a.clientY,L=a.pointerId,y=0,E=0,s.classList.add("header-scroll--dragging"),s.setPointerCapture(a.pointerId),a.pointerType!=="mouse"&&a.preventDefault())}),s.addEventListener("pointermove",a=>{if(!S||a.pointerId!==L)return;const l=Math.max(0,a.clientX-C),b=a.clientY-I;y=Math.min(U,l),E=Math.max(-x,Math.min(x,b)),R(y,E)}),s.addEventListener("pointerup",N),s.addEventListener("pointercancel",N),s.addEventListener("lostpointercapture",()=>{S&&(q(),p=!0,$())})),c&&c.addEventListener("click",()=>g(!1)),f.forEach(a=>{a.addEventListener("click",l=>{if(g(!1),typeof r=="function"){const b=a.dataset.route??"home";r(b,a,l)}})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&g(!1)});const F=a=>{f.forEach(l=>{const b=l.dataset.route===a;l.classList.toggle("sidebar__nav-link--active",b),b?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current")})},J=()=>{d&&O.forEach((a,l)=>{d.options[l]&&(d.options[l].textContent=a.flag)})},V=a=>{u&&u.setAttribute("aria-label",a.aria.nav),c&&c.setAttribute("aria-label",a.aria.closeNavigation),s&&s.setAttribute("aria-label",a.aria.headerButton),h&&(h.textContent=a.navigation.home),_&&(_.textContent=a.navigation.contact),w&&(w.textContent=a.language.label),d&&(d.setAttribute("aria-label",a.language.label),J())},j=a=>{d&&(d.value=a)};d&&d.addEventListener("change",a=>{const l=a.target.value;k(l)&&(j(l),typeof o=="function"&&o(l))});let A=null;const z=()=>window.matchMedia(`(min-width: ${ie}px)`).matches,W=()=>{!e||!z()||(e.classList.add(D),A&&window.clearTimeout(A),A=window.setTimeout(()=>{e.classList.remove(D),A=null},320))};return V(t),{setActiveRoute:F,updateContent:V,setLanguage:j,closeSidebar:()=>g(!1),triggerHeaderTransition:W}},le={},{VITE_EMAILJS_SERVICE_ID:ce,VITE_EMAILJS_TEMPLATE_ID:de,VITE_EMAILJS_PUBLIC_KEY:ue}=le,H=ce??"",G=de??"",K=ue??"",Y=["Residential project","Corporate / commercial","Event or venue","System support","General enquiry"],ge=!!H&&!!G&&!!K;class T{constructor(t=0,n="Network Error"){this.status=t,this.text=n}}const me=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},v={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:me()},fe=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},pe=async(e,t,n={})=>{const o=await fetch(v.origin+e,{method:"POST",headers:n,body:t}),r=await o.text(),i=new T(o.status,r);if(o.ok)return i;throw i},be=(e,t,n)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n||typeof n!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},he=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},ye=e=>e.webdriver||!e.languages||e.languages.length===0,ve=()=>new T(451,"Unavailable For Headless Browser"),_e=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},we=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},Le=(e,t)=>e instanceof FormData?e.get(t):e[t],Se=(e,t)=>{if(we(e))return!1;_e(e.list,e.watchVariable);const n=Le(t,e.watchVariable);return typeof n!="string"?!1:e.list.includes(n)},Ee=()=>new T(403,"Forbidden"),Pe=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},Ae=async(e,t,n)=>{const o=Number(await n.get(e)||0);return t-Date.now()+o},Te=async(e,t,n)=>{if(!t.throttle||!n)return!1;Pe(t.throttle,t.id);const o=t.id||e;return await Ae(o,t.throttle,n)>0?!0:(await n.set(o,Date.now().toString()),!1)},ke=()=>new T(429,"Too Many Requests"),$e=async(e,t,n,o)=>{const r=fe(o),i=r.publicKey||v.publicKey,s=r.blockHeadless||v.blockHeadless,c=r.storageProvider||v.storageProvider,u={...v.blockList,...r.blockList},f={...v.limitRate,...r.limitRate};return s&&ye(navigator)?Promise.reject(ve()):(be(i,e,t),he(n),n&&Se(u,n)?Promise.reject(Ee()):await Te(location.pathname,f,c)?Promise.reject(ke()):pe("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:i,service_id:e,template_id:t,template_params:n}),{"Content-type":"application/json"}))},xe=e=>{const t=o=>{const r=e.getBoundingClientRect(),i=(o.clientX-r.left)/r.width,s=(o.clientY-r.top)/r.height,c=(i-.5)*60,u=(s-.5)*60;e.style.setProperty("--glow-x",`${c}px`),e.style.setProperty("--glow-y",`${u}px`)},n=()=>{e.style.setProperty("--glow-x","0px"),e.style.setProperty("--glow-y","0px")};e.addEventListener("pointermove",t),e.addEventListener("pointerleave",n)},Ce=e=>{const t=n=>{const o=e.getBoundingClientRect(),r=(n.clientX-o.left)/o.width,i=(n.clientY-o.top)/o.height,s=(r-.5)*65,c=(i-.5)*65;e.style.setProperty("--glow-x",`${s}px`),e.style.setProperty("--glow-y",`${c}px`)};e.addEventListener("pointermove",t),e.addEventListener("pointerleave",()=>{e.style.setProperty("--glow-x","0px"),e.style.setProperty("--glow-y","0px")})},Me=({container:e,content:t,backgroundImage:n})=>{e.className="landing",e.setAttribute("role","main"),e.setAttribute("aria-labelledby","site-title"),e.setAttribute("id","home"),e.innerHTML=`
    <div class="landing__content">
      <figure class="landing__logo-wrapper" aria-hidden="true">
        <img class="landing__logo" src="${n}" alt="" />
      </figure>
      <p class="landing__tagline" data-i18n="landing.tagline">${t.tagline}</p>
      <h1 id="site-title">${t.name}</h1>
      <p class="landing__description" data-i18n="landing.description">${t.description}</p>
    </div>
  `;const o=e.querySelector(".landing__content");o&&xe(o)},Ie=()=>Y.map((e,t)=>`<option value="${e}" ${t===0?"selected":""}>${e}</option>`).join(""),Re=(e,t,n)=>{e&&(e.disabled=!1,e.textContent=n.contact.form.submit),t&&(t.textContent="",t.dataset.state="")},Oe=({container:e,content:t,basePath:n})=>{e.className="contact",e.setAttribute("role","main"),e.removeAttribute("id"),e.innerHTML=`
    <section class="contact__card" aria-live="polite">
      <div class="contact__intro">
        <h1 id="contact-title" data-i18n="contact.heading">${t.contact.heading}</h1>
        <p class="contact__subtext" data-i18n="contact.intro">
          ${t.contact.intro}
        </p>
      </div>

      <form class="contact-form" autocomplete="on" novalidate>
        <label class="field">
          <span class="field__label" data-i18n="form.nameLabel">${t.contact.form.nameLabel}</span>
          <input
            class="field__control"
            type="text"
            name="fullName"
            required
            placeholder="${t.contact.form.namePlaceholder}"
          />
        </label>

        <label class="field">
          <span class="field__label" data-i18n="form.emailLabel">${t.contact.form.emailLabel}</span>
          <input
            class="field__control"
            type="email"
            name="email"
            required
            inputmode="email"
            placeholder="${t.contact.form.emailPlaceholder}"
          />
        </label>

        <label class="field">
          <span class="field__label" data-i18n="form.categoryLabel">${t.contact.form.categoryLabel}</span>
          <select class="field__control" name="category" required>
            ${Ie()}
          </select>
        </label>

        <label class="field field--area">
          <span class="field__label" data-i18n="form.messageLabel">${t.contact.form.messageLabel}</span>
          <textarea
            class="field__control field__control--area"
            name="message"
            rows="6"
            required
            placeholder="${t.contact.form.messagePlaceholder}"
          ></textarea>
        </label>

        <button class="contact-form__submit" type="submit" data-i18n="form.submit">
          ${t.contact.form.submit}
        </button>
      </form>

      <p class="contact__status" role="status" aria-live="polite"></p>
    </section>
  `;const o=e.querySelector(".contact__card");o&&Ce(o);const r=e.querySelector(".contact-form"),i=e.querySelector(".contact__status"),s=r==null?void 0:r.querySelector('[data-i18n="form.submit"]');r==null||r.querySelector('input[name="fullName"]'),r==null||r.querySelector('input[name="email"]'),r==null||r.querySelector('textarea[name="message"]'),!(!r||!i)&&r.addEventListener("submit",async c=>{var d,g,P,p;c.preventDefault();const u=new FormData(r),f=((d=u.get("fullName"))==null?void 0:d.trim())??"",h=((g=u.get("email"))==null?void 0:g.trim())??"",_=((P=u.get("category"))==null?void 0:P.trim())??Y[0],w=((p=u.get("message"))==null?void 0:p.trim())??"";if(!f||!h||!w){r.reportValidity();return}i.textContent="",i.dataset.state="",s&&(s.disabled=!0,s.textContent=t.contact.form.sending);try{if(!ge)throw new Error(t.contact.form.errorRequest);await $e(H,G,{fullName:f,replyTo:h,category:_,message:w,subject:`AV enquiry (${_}) from ${f}`},{publicKey:K}),i.dataset.state="success",i.textContent=t.contact.form.success,r.reset(),window.setTimeout(()=>{window.location.href=`${n}contact-success.html`},600)}catch(m){i.textContent=m instanceof Error?m.message:t.contact.form.errorUnknown,i.dataset.state="error"}finally{Re(s,i,t)}})};export{te as a,Oe as b,qe as c,De as i,je as l,Me as m,Ve as r,Ne as s};
