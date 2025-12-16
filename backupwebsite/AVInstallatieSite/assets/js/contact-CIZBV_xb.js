import{h as b}from"./style-kumpCsGf.js";import{s as w}from"./content-Dthkt3jC.js";const u="koert@avinstallatie.nl",x=`https://formsubmit.co/ajax/${encodeURIComponent(u)}`,h=["Residential project","Corporate / commercial","Event or venue","System support","General enquiry"],p="/",v=p.endsWith("/")?p:`${p}/`,r=document.querySelector("#app");if(!r)throw new Error("Root element #app not found");const C=h.map((e,o)=>`<option value="${e}" ${o===0?"selected":""}>${e}</option>`).join("");r.innerHTML=`
  <div class="site contact-page">
    <header class="site__header">
      <a class="header-scroll header-scroll--link" href="${v}" aria-label="Return to homepage">
        <img src="${b}" alt="" />
      </a>
    </header>

    <main class="contact" role="main" aria-labelledby="contact-title">
      <section class="contact__card" aria-live="polite">
        <div class="contact__intro">
          <p class="contact__tagline">${w.tagline}</p>
          <h1 id="contact-title">Get in touch with Koert</h1>
          <p class="contact__subtext">
            Share your project goals and Koert will reach out with a tailored AV installation plan.
          </p>
          <p class="contact__subtext contact__subtext--alt">
            Prefer email? <a href="mailto:${u}">${u}</a>
          </p>
        </div>

        <form class="contact-form" autocomplete="on" novalidate>
          <label class="field">
            <span class="field__label">Full name</span>
            <input class="field__control" type="text" name="fullName" required placeholder="Your full name" />
          </label>

          <label class="field">
            <span class="field__label">Email address</span>
            <input
              class="field__control"
              type="email"
              name="email"
              required
              inputmode="email"
              placeholder="name@example.com"
            />
          </label>

          <label class="field">
            <span class="field__label">Category</span>
            <select class="field__control" name="category" required>
              ${C}
            </select>
          </label>

          <label class="field field--area">
            <span class="field__label">Project details</span>
            <textarea
              class="field__control field__control--area"
              name="message"
              rows="6"
              required
              placeholder="Tell Koert about your space, timeline, and any specific AV needs."
            ></textarea>
          </label>

          <button class="contact-form__submit" type="submit">Send message</button>
        </form>

        <p class="contact__status" role="status" aria-live="polite"></p>
      </section>
    </main>
  </div>
`;const n=r.querySelector(".contact-form"),a=r.querySelector(".contact__card"),s=r.querySelector(".contact__status");if(a){const e=o=>{const t=a.getBoundingClientRect(),l=(o.clientX-t.left)/t.width,c=(o.clientY-t.top)/t.height,i=(l-.5)*65,d=(c-.5)*65;a.style.setProperty("--glow-x",`${i}px`),a.style.setProperty("--glow-y",`${d}px`)};a.addEventListener("pointermove",e),a.addEventListener("pointerleave",()=>{a.style.setProperty("--glow-x","0px"),a.style.setProperty("--glow-y","0px")})}if(n&&s){const e=n.querySelector(".contact-form__submit");n.addEventListener("submit",async o=>{var f,_,y,g;o.preventDefault();const t=new FormData(n),l=((f=t.get("fullName"))==null?void 0:f.trim())??"",c=((_=t.get("email"))==null?void 0:_.trim())??"",i=((y=t.get("category"))==null?void 0:y.trim())??h[0],d=((g=t.get("message"))==null?void 0:g.trim())??"";if(!l||!c||!d){n.reportValidity();return}s.textContent="",s.dataset.state="",e&&(e.disabled=!0,e.textContent="Sending...");try{if(!(await fetch(x,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:l,email:c,message:d,category:i,_subject:`AV enquiry (${i}) from ${l}`,_template:"table"})})).ok)throw new Error("Failed to send message. Please try again.");s.dataset.state="success",s.textContent="Message sent! Redirecting...",n.reset(),window.setTimeout(()=>{window.location.href="./contact-success.html"},600)}catch(m){s.textContent=m instanceof Error?m.message:"Something went wrong while sending your message. Please retry.",s.dataset.state="error"}finally{e&&(e.disabled=!1,e.textContent="Send message")}})}
