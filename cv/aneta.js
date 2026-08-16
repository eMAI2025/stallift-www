(function(){
 const root=document.documentElement; const saved=localStorage.getItem('aneta-theme'); if(saved) root.dataset.theme=saved;
 document.getElementById('themeToggle').addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('aneta-theme',next);});
 const links=[...document.querySelectorAll('.navRow a')]; const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}})},{rootMargin:'-30% 0px -60% 0px',threshold:0}); sections.forEach(s=>obs.observe(s));
})();