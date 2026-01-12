/* Theme toggle (default: light), persisted via localStorage + cookie Domain=.stallift.com */
(function(){
  const KEY="stallift_theme";
  const COOKIE="stallift_theme";

  function setCookie(value){
    const maxAge=60*60*24*365;
    const base=`${COOKIE}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
    // cross-subdomain
    document.cookie = base + "; Domain=.stallift.com";
    // fallback
    document.cookie = base;
  }

  function apply(theme){
    document.documentElement.dataset.theme = theme;
    try{ localStorage.setItem(KEY, theme); }catch(e){}
    try{ setCookie(theme); }catch(e){}
  }

  function init(){
    let theme="light";
    try{
      const stored=localStorage.getItem(KEY);
      if(stored==="light"||stored==="dark") theme=stored;
    }catch(e){}
    apply(theme);

    const btn=document.getElementById("themeToggle");
    if(btn){
      btn.addEventListener("click", ()=>{
        const cur=document.documentElement.dataset.theme||"light";
        apply(cur==="dark"?"light":"dark");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
