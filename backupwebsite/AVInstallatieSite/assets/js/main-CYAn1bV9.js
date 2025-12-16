import{h as k}from"./style-kumpCsGf.js";import{b as $,s as f}from"./content-Dthkt3jC.js";const g="/",h=g.endsWith("/")?g:`${g}/`,n=document.querySelector("#app");if(!n)throw new Error("Root element #app not found");n.innerHTML=`
  <div class="site">
    <aside id="primary-sidebar" class="sidebar" aria-hidden="true">
      <nav class="sidebar__nav" aria-label="Primary navigation">
        <a href="${h}#home">Homepage</a>
        <a href="${h}#projects">Projects</a>
        <a href="${h}contact.html">Contact</a>
      </nav>
    </aside>
    <button class="sidebar__overlay" type="button" aria-label="Close navigation"></button>
    <header class="site__header">
      <button
        class="header-scroll"
        type="button"
        aria-label="Toggle navigation"
        aria-controls="primary-sidebar"
        aria-expanded="false"
      >
        <img src="${k}" alt="" />
      </button>
    </header>
    <main class="landing" role="main" aria-labelledby="site-title" id="home">
      <div class="landing__content">
        <figure class="landing__logo-wrapper" aria-hidden="true">
          <img class="landing__logo" src="${$}" alt="" />
        </figure>
        <p class="landing__tagline">${f.tagline}</p>
        <h1 id="site-title">${f.name}</h1>
        <p class="landing__description">${f.description}</p>
      </div>
    </main>
    <div id="about" class="anchor-spacer" aria-hidden="true"></div>
    <div id="contact" class="anchor-spacer" aria-hidden="true"></div>
  </div>
`;const i=n.querySelector(".site"),m=n.querySelector("#primary-sidebar"),t=n.querySelector(".header-scroll"),y=n.querySelector(".sidebar__overlay"),r=n.querySelector(".landing__content"),x=Array.from(n.querySelectorAll(".sidebar__nav a")),l=e=>{!i||!m||!t||(i.classList.toggle("site--sidebar-open",e),m.setAttribute("aria-hidden",String(!e)),t.setAttribute("aria-expanded",String(e)),document.body.classList.toggle("no-scroll",e))},C=()=>{const e=(i==null?void 0:i.classList.contains("site--sidebar-open"))??!1;l(!e)};let c=!1,s=null;const _=()=>{s&&window.clearTimeout(s),s=window.setTimeout(()=>{c=!1,s=null},300)};t&&t.addEventListener("click",e=>{if(c){e.preventDefault(),e.stopPropagation(),c=!1,s&&(window.clearTimeout(s),s=null);return}C()});const D=90,T=150;let b=0,p=null,d=!1,o=0;const L=e=>{t&&t.style.setProperty("--drag-offset",`${e}px`)},S=()=>{if(!t)return;const e=p;o=0,d=!1,p=null,t.classList.remove("header-scroll--dragging"),typeof e=="number"&&t.hasPointerCapture(e)&&t.releasePointerCapture(e),L(0)},v=e=>{if(!t||!d||e.pointerId!==p)return;const a=o>6,u=o>=D;S(),a&&(c=!0,_()),u?l(!0):a&&l(!1)};t&&(t.addEventListener("pointerdown",e=>{e.pointerType==="mouse"&&e.button!==0||i!=null&&i.classList.contains("site--sidebar-open")||(d=!0,b=e.clientX,p=e.pointerId,o=0,t.classList.add("header-scroll--dragging"),t.setPointerCapture(e.pointerId),e.pointerType!=="mouse"&&e.preventDefault())}),t.addEventListener("pointermove",e=>{if(!d||e.pointerId!==p)return;const a=Math.max(0,e.clientX-b);o=Math.min(T,a),L(o)}),t.addEventListener("pointerup",v),t.addEventListener("pointercancel",v),t.addEventListener("lostpointercapture",()=>{d&&(S(),c=!0,_())}));y&&y.addEventListener("click",()=>l(!1));x.forEach(e=>{e.addEventListener("click",()=>l(!1))});document.addEventListener("keydown",e=>{e.key==="Escape"&&l(!1)});r&&(r.addEventListener("pointermove",e=>{const a=r.getBoundingClientRect(),u=(e.clientX-a.left)/a.width,E=(e.clientY-a.top)/a.height,w=(u-.5)*60,P=(E-.5)*60;r.style.setProperty("--glow-x",`${w}px`),r.style.setProperty("--glow-y",`${P}px`)}),r.addEventListener("pointerleave",()=>{r.style.setProperty("--glow-x","0px"),r.style.setProperty("--glow-y","0px")}));
