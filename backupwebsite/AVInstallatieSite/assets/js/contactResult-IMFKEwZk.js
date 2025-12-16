import{r as h,l as s,h as m}from"./index-l0QOWHdp.js";const e="/",o=e.endsWith("/")?e:`${e}/`,r=document.querySelector("#app");if(!r)throw new Error("Root element #app not found");const i=h(),c=s[i].resultPage,p=new URLSearchParams(window.location.search),w=p.get("status"),l=w==="error",t=l?c.error:c.success,d=l?`${o}contact`:o;document.title=`${t.title} · ${s[i].name}`;r.innerHTML=`
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="${o}" aria-label="${s[i].aria.returnHome}">
        <img src="${m}" alt="" />
      </a>
    </header>

    <main class="contact" role="main">
      <section class="contact__card contact__card--center">
        <div class="contact-thankyou contact-thankyou--standalone">
          <div class="contact-thankyou__content">
            <h1>${t.title}</h1>
            <p>${t.message}</p>
            <p class="contact-thankyou__meta">${t.redirect} <span data-countdown>5</span> ${c.seconds}</p>
            <a class="contact-form__submit contact-form__submit--link" href="${d}">${t.button}</a>
          </div>
        </div>
      </section>
    </main>
  </div>
`;const n=r.querySelector("[data-countdown]");if(n){let a=5;n.textContent=a.toString();const u=window.setInterval(()=>{a-=1,n.textContent=a.toString(),a<=0&&(window.clearInterval(u),window.location.href=d)},1e3)}
