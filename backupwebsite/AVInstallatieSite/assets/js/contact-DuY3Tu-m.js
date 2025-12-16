import{h as p}from"./main-DC6pCcXu.js";import{r as g,l as d,a as m,i as h,s as C,b as f}from"./index-CQGvPJ6U.js";const r="/",i=r.endsWith("/")?r:`${r}/`;let a=g();const s=t=>m[t];let n=s(a);const c=document.querySelector("#app");if(!c)throw new Error("Root element #app not found");c.innerHTML=`
  <div class="site contact-page">
    ${d({basePath:i,currentContent:n,currentLanguage:a,headerButtonSrc:p})}
  </div>
`;const o=c.querySelector(".site"),u=o==null?void 0:o.querySelector("#page-content");if(!o||!u)throw new Error("Site structure incomplete");let e=null;const l=()=>{f({container:u,content:n,basePath:i})};e=h({site:o,initialContent:n,initialLanguage:a,onLanguageChange:t=>{a=t,n=s(t),C(t),e==null||e.updateContent(n),l()}});e.setActiveRoute("contact");l();
