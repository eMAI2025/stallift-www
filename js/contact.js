/* Contact form: /api/contact + Turnstile (form[data-contact-form]) */
(function(){
  async function submitForm(form){
    const statusEl=form.querySelector(".js-status");
    const consent=form.querySelector(".js-consent");
    if(consent && !consent.checked){
      if(statusEl) statusEl.textContent="Zaznacz zgodę na przetwarzanie danych, aby wysłać formularz.";
      return;
    }

    if(statusEl) statusEl.textContent="Wysyłanie…";
    const fd=new FormData(form);
    const payload=Object.fromEntries(fd.entries());

    try{
      const r=await fetch("/api/contact",{
        method:"POST",
        headers:{ "content-type":"application/json" },
        body:JSON.stringify(payload)
      });

      const out=await r.json().catch(()=>({}));
      if(!r.ok || !out.ok){
        if(statusEl) statusEl.textContent="Błąd wysyłki. Spróbuj ponownie lub napisz na kontakt@stallift.com.";
        return;
      }

      if(statusEl) statusEl.textContent="Wysłano. Dziękujemy.";
      form.reset();

      if(window.turnstile && typeof window.turnstile.reset==="function"){
        try{ window.turnstile.reset(); }catch(e){}
      }
    }catch(e){
      if(statusEl) statusEl.textContent="Błąd sieci. Spróbuj ponownie.";
    }
  }

  document.addEventListener("submit",(e)=>{
    const form=e.target;
    if(!(form instanceof HTMLFormElement)) return;
    if(!form.matches("form[data-contact-form]")) return;
    e.preventDefault();
    submitForm(form);
  });
})();
