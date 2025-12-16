import{L as W,i as fe,r as me,l as he,h as ye,b as be,s as ve}from"./index-l0QOWHdp.js";const _e=e=>W.map(t=>`
      <option value="${t.code}" ${t.code===e?"selected":""}>
        ${t.flag}
      </option>
    `).join(""),we=({basePath:e,currentContent:t,currentLanguage:a,headerButtonSrc:r})=>`
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
        href="${e}contact"
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
        ${_e(a)}
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
      <img src="${r}" alt="" />
    </button>
  </header>
  <main id="page-content"></main>
`,Le=900,F="site--transitioning",Ee=({site:e,initialContent:t,initialLanguage:a,onLanguageChange:r,onNavLinkClick:i})=>{const n=e.querySelector("#primary-sidebar"),o=e.querySelector(".header-scroll"),d=e.querySelector(".sidebar__overlay"),u=e.querySelector(".sidebar__nav"),p=Array.from(e.querySelectorAll(".sidebar__nav-link")),h=e.querySelector('[data-i18n="nav.home"]'),v=e.querySelector('[data-i18n="nav.contact"]'),_=e.querySelector('[data-i18n="language.label"]'),g=e.querySelector("#language-picker"),f=s=>{!e||!n||!o||(e.classList.toggle("site--sidebar-open",s),n.setAttribute("aria-hidden",String(!s)),o.setAttribute("aria-expanded",String(s)),document.body.classList.toggle("no-scroll",s))},I=()=>{const s=(e==null?void 0:e.classList.contains("site--sidebar-open"))??!1;f(!s)};let y=!1,m=null;const k=()=>{m&&window.clearTimeout(m),m=window.setTimeout(()=>{y=!1,m=null},300)};o&&o.addEventListener("click",s=>{if(y){s.preventDefault(),s.stopPropagation(),y=!1,m&&(window.clearTimeout(m),m=null);return}I()});const le=90,ce=150,H=45;let j=0,X=0,$=null,T=!1,L=0,A=0;const J=(s,l)=>{o&&(o.style.setProperty("--drag-offset-x",`${s}px`),o.style.setProperty("--drag-offset-y",`${l}px`))},G=()=>{if(!o)return;const s=$;L=0,A=0,T=!1,$=null,o.classList.remove("header-scroll--dragging"),typeof s=="number"&&o.hasPointerCapture(s)&&o.releasePointerCapture(s),J(0,0)},z=s=>{if(!o||!T||s.pointerId!==$)return;const l=L>6||Math.abs(A)>6,b=L>=le;G(),l&&(y=!0,k()),b?f(!0):l&&f(!1)};o&&(o.addEventListener("pointerdown",s=>{s.pointerType==="mouse"&&s.button!==0||e!=null&&e.classList.contains("site--sidebar-open")||(T=!0,j=s.clientX,X=s.clientY,$=s.pointerId,L=0,A=0,o.classList.add("header-scroll--dragging"),o.setPointerCapture(s.pointerId),s.pointerType!=="mouse"&&s.preventDefault())}),o.addEventListener("pointermove",s=>{if(!T||s.pointerId!==$)return;const l=Math.max(0,s.clientX-j),b=s.clientY-X;L=Math.min(ce,l),A=Math.max(-H,Math.min(H,b)),J(L,A)}),o.addEventListener("pointerup",z),o.addEventListener("pointercancel",z),o.addEventListener("lostpointercapture",()=>{T&&(G(),y=!0,k())})),d&&d.addEventListener("click",()=>f(!1)),p.forEach(s=>{s.addEventListener("click",l=>{if(f(!1),typeof i=="function"){const b=s.dataset.route??"home";i(b,s,l)}})}),document.addEventListener("keydown",s=>{s.key==="Escape"&&f(!1)});const de=s=>{p.forEach(l=>{const b=l.dataset.route===s;l.classList.toggle("sidebar__nav-link--active",b),b?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current")})},ue=()=>{g&&W.forEach((s,l)=>{g.options[l]&&(g.options[l].textContent=s.flag)})},K=s=>{u&&u.setAttribute("aria-label",s.aria.nav),d&&d.setAttribute("aria-label",s.aria.closeNavigation),o&&o.setAttribute("aria-label",s.aria.headerButton),h&&(h.textContent=s.navigation.home),v&&(v.textContent=s.navigation.contact),_&&(_.textContent=s.language.label),g&&(g.setAttribute("aria-label",s.language.label),ue())},U=s=>{g&&(g.value=s)};g&&g.addEventListener("change",s=>{const l=s.target.value;fe(l)&&(U(l),typeof r=="function"&&r(l))});let R=null;const pe=()=>window.matchMedia(`(min-width: ${Le}px)`).matches,ge=()=>{!e||!pe()||(e.classList.add(F),R&&window.clearTimeout(R),R=window.setTimeout(()=>{e.classList.remove(F),R=null},320))};return K(t),{setActiveRoute:de,updateContent:K,setLanguage:U,closeSidebar:()=>f(!1),triggerHeaderTransition:ge}},Se={VITE_EMAILJS_PUBLIC_KEY:"3wk3SCYpeeYYd9zBr",VITE_EMAILJS_SERVICE_ID:"service_hpauzln",VITE_EMAILJS_TEMPLATE_ID:"template_owg0q9e"},{VITE_EMAILJS_SERVICE_ID:Pe,VITE_EMAILJS_TEMPLATE_ID:$e,VITE_EMAILJS_PUBLIC_KEY:Te}=Se,Q=Pe,Z=$e,ee=Te,te=["Residential project","Corporate / commercial","Event or venue","System support","General enquiry"],Ae=!!Q&&!!Z&&!!ee;class D{constructor(t=0,a="Network Error"){this.status=t,this.text=a}}const xe=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},E={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:xe()},Ie=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},ke=async(e,t,a={})=>{const r=await fetch(E.origin+e,{method:"POST",headers:a,body:t}),i=await r.text(),n=new D(r.status,i);if(r.ok)return n;throw n},Re=(e,t,a)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!a||typeof a!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},qe=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},Ce=e=>e.webdriver||!e.languages||e.languages.length===0,De=()=>new D(451,"Unavailable For Headless Browser"),Me=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},Ne=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},Oe=(e,t)=>e instanceof FormData?e.get(t):e[t],Ve=(e,t)=>{if(Ne(e))return!1;Me(e.list,e.watchVariable);const a=Oe(t,e.watchVariable);return typeof a!="string"?!1:e.list.includes(a)},Ye=()=>new D(403,"Forbidden"),Be=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},He=async(e,t,a)=>{const r=Number(await a.get(e)||0);return t-Date.now()+r},je=async(e,t,a)=>{if(!t.throttle||!a)return!1;Be(t.throttle,t.id);const r=t.id||e;return await He(r,t.throttle,a)>0?!0:(await a.set(r,Date.now().toString()),!1)},Xe=()=>new D(429,"Too Many Requests"),Je=async(e,t,a,r)=>{const i=Ie(r),n=i.publicKey||E.publicKey,o=i.blockHeadless||E.blockHeadless,d=i.storageProvider||E.storageProvider,u={...E.blockList,...i.blockList},p={...E.limitRate,...i.limitRate};return o&&Ce(navigator)?Promise.reject(De()):(Re(n,e,t),qe(a),a&&Ve(u,a)?Promise.reject(Ye()):await je(location.pathname,p,d)?Promise.reject(Xe()):ke("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:n,service_id:e,template_id:t,template_params:a}),{"Content-type":"application/json"}))},ae="/assets/img/contactsnotepad-optimizedPNG-Dni8Hkd3.png",se="/assets/img/contactsnotepad-optimized-CSH-lU0t.webp",ie="/assets/img/contactsnotepad-optimizedlight-BIR_6sYn.webp",S=(e,t,a)=>Math.min(Math.max(e,t),a),Ge=e=>{const t=r=>{const i=e.getBoundingClientRect(),n=(r.clientX-i.left)/i.width,o=(r.clientY-i.top)/i.height,d=(n-.5)*60,u=(o-.5)*60;e.style.setProperty("--glow-x",`${d}px`),e.style.setProperty("--glow-y",`${u}px`);const p=S((n-.5)*10,-10,10),h=S((.5-o)*8,-8,8);e.style.setProperty("--tilt-x",`${h}deg`),e.style.setProperty("--tilt-y",`${p}deg`),e.style.setProperty("--spotlight-x",`${n*100}%`),e.style.setProperty("--spotlight-y",`${o*100}%`),e.style.setProperty("--shadow-offset-x",`${(n-.5)*28}px`),e.style.setProperty("--shadow-offset-y",`${(o-.5)*18}px`)},a=()=>{e.style.setProperty("--glow-x","0px"),e.style.setProperty("--glow-y","0px"),e.style.setProperty("--tilt-x","0deg"),e.style.setProperty("--tilt-y","0deg"),e.style.setProperty("--spotlight-x","50%"),e.style.setProperty("--spotlight-y","42%"),e.style.setProperty("--shadow-offset-x","0px"),e.style.setProperty("--shadow-offset-y","0px")};e.addEventListener("pointermove",t),e.addEventListener("pointerleave",a),a()},ze=e=>{if(typeof window>"u"||typeof DeviceOrientationEvent>"u")return;let t=!1,a=null;const r=u=>{const{beta:p,gamma:h}=u;if(typeof p!="number"||typeof h!="number")return;const v=S(h,-10,10),_=S(-(p-25),-9,9),g=S(h/10*45,-45,45),f=S((p-45)/2,-40,40);e.style.setProperty("--tilt-x",`${_}deg`),e.style.setProperty("--tilt-y",`${v}deg`),e.style.setProperty("--glow-x",`${g}px`),e.style.setProperty("--glow-y",`${f}px`)},i=()=>{t||(window.addEventListener("deviceorientation",r),t=!0)},n=()=>{t&&(window.removeEventListener("deviceorientation",r),t=!1)},o=()=>{typeof DeviceOrientationEvent>"u"||(typeof DeviceOrientationEvent.requestPermission=="function"?DeviceOrientationEvent.requestPermission().then(u=>{u==="granted"&&i()}).catch(()=>{n()}):i())},d=()=>{a&&window.removeEventListener("touchstart",a),a=null,o()};a=d,window.addEventListener("touchstart",d,{once:!1,passive:!0}),typeof DeviceOrientationEvent.requestPermission!="function"&&i()},Ke=e=>{const t=a=>{const r=e.getBoundingClientRect(),i=(a.clientX-r.left)/r.width,n=(a.clientY-r.top)/r.height,o=(i-.5)*65,d=(n-.5)*65;e.style.setProperty("--glow-x",`${o}px`),e.style.setProperty("--glow-y",`${d}px`)};e.addEventListener("pointermove",t),e.addEventListener("pointerleave",()=>{e.style.setProperty("--glow-x","0px"),e.style.setProperty("--glow-y","0px")})},Ue=({container:e,content:t,backgroundImage:a})=>{e.className="landing",e.setAttribute("role","main"),e.setAttribute("aria-labelledby","site-title"),e.setAttribute("id","home"),e.innerHTML=`
    <div class="landing__stage" data-3d-stage>
      <div class="landing__spotlight" aria-hidden="true"></div>
      <div class="landing__ground-shadow" aria-hidden="true"></div>
      <div class="landing__content">
        <figure class="landing__logo-wrapper" aria-hidden="true">
          <picture aria-hidden="true">
            <source
              srcset="${a.webpLight}"
              type="image/webp"
              media="(prefers-reduced-data: reduce)"
            />
            <source srcset="${a.webp}" type="image/webp" />
            <img
              class="landing__logo"
              src="${a.png}"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>
        <p class="landing__tagline" data-i18n="landing.tagline">${t.tagline}</p>
        <h1 id="site-title">${t.name}</h1>
        <p class="landing__description" data-i18n="landing.description">${t.description}</p>
      </div>
    </div>
  `;const r=e.querySelector(".landing__stage");r&&(Ge(r),ze(r)),re()},M=(e,t)=>{if(typeof document>"u")return;const a=document.head;if(!a||a.querySelector(`link[rel="preload"][href="${e}"]`))return;const r=document.createElement("link");r.rel="preload",r.as="image",r.href=e,t&&(r.type=t),a.appendChild(r)},re=()=>{M(ie,"image/webp"),M(se,"image/webp"),M(ae,"image/png")},Fe=()=>te.map((e,t)=>`<option value="${e}" ${t===0?"selected":""}>${e}</option>`).join(""),We=(e,t,a)=>{e&&(e.disabled=!1,e.textContent=a.contact.form.submit),t&&(t.textContent="",t.dataset.state="")},Qe=({container:e,content:t,basePath:a})=>{re(),e.className="contact contact--notepad",e.setAttribute("role","main"),e.removeAttribute("id"),e.innerHTML=`
      <div
        class="contact__notepad"
        aria-live="polite"
        style="
          --notepad-png: url('${ae}');
          --notepad-webp: url('${se}');
          --notepad-webp-light: url('${ie}');
        "
      >
        <div class="contact__scroll-container">
          <div class="contact__note-content">
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
                  inputmode="email"
                  placeholder="${t.contact.form.emailPlaceholder}"
                />
              </label>

              <label class="field">
                <span class="field__label" data-i18n="form.categoryLabel">${t.contact.form.categoryLabel}</span>
                <select class="field__control" name="category" required>
                  ${Fe()}
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
          </div>
        </div>
      </div>
  `;const r=e.querySelector(".contact__notepad");r&&Ke(r);const i=e.querySelector(".contact-form"),n=e.querySelector(".contact__status"),o=(i==null?void 0:i.querySelector('[data-i18n="form.submit"]'))??null;i==null||i.querySelector('input[name="fullName"]'),i==null||i.querySelector('input[name="email"]'),i==null||i.querySelector('textarea[name="message"]'),!(!i||!n)&&i.addEventListener("submit",async d=>{var g,f,I,y;d.preventDefault();const u=new FormData(i),p=((g=u.get("fullName"))==null?void 0:g.trim())??"",h=((f=u.get("email"))==null?void 0:f.trim())??"",v=((I=u.get("category"))==null?void 0:I.trim())??te[0],_=((y=u.get("message"))==null?void 0:y.trim())??"";if(!p||!_){i.reportValidity();return}n.textContent="",n.dataset.state="",o&&(o.disabled=!0,o.textContent=t.contact.form.sending);try{if(!Ae)throw new Error(t.contact.form.errorRequest);const m=`
--------------------------------------------------
NEW ENQUIRY
--------------------------------------------------
Sender Name:  ${p}
Sender Email: ${h||"(Not provided)"}
Category:     ${v}
--------------------------------------------------
MESSAGE:

${_}
--------------------------------------------------
      `.trim(),k={name:p,time:new Date().toLocaleString(),title:`AV Enquiry: ${v}`,message:m};await Je(Q,Z,k,{publicKey:ee}),n.dataset.state="success",n.textContent=t.contact.form.success,i.reset(),window.setTimeout(()=>{window.location.href=`${a}contact-result.html?status=success`},600)}catch(m){n.textContent=m instanceof Error?m.message:t.contact.form.errorUnknown,n.dataset.state="error",window.setTimeout(()=>{window.location.href=`${a}contact-result.html?status=error`},600)}finally{We(o,n,t)}})},N="/",q=N.endsWith("/")?N:`${N}/`;let C=me();const oe=e=>he[e];let P=oe(C);const V=document.querySelector("#app");if(!V)throw new Error("Root element #app not found");V.innerHTML=`
  <div class="site">
    ${we({basePath:q,currentContent:P,currentLanguage:C,headerButtonSrc:ye})}
  </div>
`;const x=V.querySelector(".site"),O=x==null?void 0:x.querySelector("#page-content");if(!x||!O)throw new Error("Site structure incomplete");const Y="home",Ze="contact";let w=window.location.pathname.endsWith("/contact")?Ze:Y,c=null;const B=e=>{e===Y?Ue({container:O,content:P,backgroundImage:be}):Qe({container:O,content:P,basePath:q})},ne=(e,t={push:!0})=>{if(!t.force&&e===w){c==null||c.setActiveRoute(e);return}if(w=e,c==null||c.triggerHeaderTransition(),B(e),c==null||c.setActiveRoute(e),t.push!==!1){const a=e===Y?q:`${q}contact`;history.pushState({route:e},"",a)}};c=Ee({site:x,initialContent:P,initialLanguage:C,onLanguageChange:e=>{C=e,P=oe(e),ve(e),c==null||c.updateContent(P),B(w)},onNavLinkClick:(e,t,a)=>{a.preventDefault(),ne(e)}});B(w);c==null||c.setActiveRoute(w);history.replaceState({route:w},"",window.location.pathname);window.addEventListener("popstate",e=>{var a;const t=((a=e.state)==null?void 0:a.route)??w;ne(t,{push:!1,force:!0})});
