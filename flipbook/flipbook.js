/**
 * StalLIFT Flipbook (vanilla JS)
 * Wymaga struktury z flipbook_assets.zip:
 *   /flipbook_assets/portfolio.seed.json
 *   /flipbook_assets/pages_full/*.jpg
 *   /flipbook_assets/pages_thumb/*.jpg
 */

function el(tag, attrs = {}, children = []){
  const n = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (k === "class") n.className = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v === false || v === null || v === undefined) continue;
    else n.setAttribute(k, String(v));
  }
  for (const c of children){
    if (c === null || c === undefined) continue;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return n;
}

export async function initFlipbook({
  mount,
  jsonUrl = "/flipbook_assets/portfolio.seed.json",
  baseUrl = "/flipbook_assets",
  title = "Portfolio",
  previewCount = 6,
  pdfUrl = null,
} = {}){
  if (!mount) throw new Error("initFlipbook: wymagany parametr mount (HTMLElement lub selector).");
  const root = typeof mount === "string" ? document.querySelector(mount) : mount;
  if (!root) throw new Error("initFlipbook: nie znaleziono mount.");

  // Fetch seed json
  const res = await fetch(jsonUrl, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Flipbook: nie można pobrać JSON (${res.status}) z ${jsonUrl}`);
  const seed = await res.json();

  const pages = (seed.assets || []).map(p => ({
    page: p.page,
    fullUrl: `${baseUrl}/pages_full/${p.full}`,
    thumbUrl: `${baseUrl}/pages_thumb/${p.thumb}`,
  }));
  const projects = seed.projects_seed || [];

  // Preview
  root.classList.add("fb-preview");
  const row = el("div", { class: "fb-preview__row" });
  const cnt = Math.min(previewCount, pages.length);

  const openAt = (i) => openModal(Math.max(0, Math.min(i, pages.length - 1)));

  for (let i=0; i<cnt; i++){
    const t = el("div", { class: "fb-thumb", role: "button", tabindex: "0" }, [
      el("img", { src: pages[i].thumbUrl, alt: `Strona ${pages[i].page}` })
    ]);
    t.addEventListener("click", () => openAt(i));
    t.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openAt(i); });
    row.appendChild(t);
  }

  const cta = el("div", { class: "fb-cta" }, [
    el("button", { class: "fb-btn", type: "button", onclick: () => openAt(0) }, ["Otwórz katalog (flipbook)"]),
    pdfUrl ? el("a", { class: "fb-btn", href: pdfUrl, target: "_blank", rel: "noopener noreferrer" }, ["Otwórz PDF"]) : null
  ]);

  root.appendChild(row);
  root.appendChild(cta);

  // Modal
  const modal = el("div", { class: "fb-modal", role: "dialog", "aria-modal": "true", "aria-hidden": "true" });
  const panel = el("div", { class: "fb-panel" });

  const titleEl = el("div", { class: "fb-title" }, [title]);

  const projectSelect = el("select", { class: "fb-select" }, [
    el("option", { value: "" }, ["Skocz do realizacji…"])
  ]);

  if (projects.length){
    for (const p of projects){
      const firstPage = (p.pages && p.pages.length) ? p.pages[0] : null;
      if (!firstPage) continue;
      projectSelect.appendChild(el("option", { value: String(firstPage) }, [p.name]));
    }
  } else {
    projectSelect.classList.add("fb-hidden");
  }

  const closeBtn = el("button", { class: "fb-btn", type: "button" }, ["Zamknij"]);
  const topbar = el("div", { class: "fb-topbar" }, [
    titleEl,
    el("div", { class: "fb-tools" }, [
      projectSelect,
      closeBtn
    ])
  ]);

  const stageImg = el("img", { src: "", alt: "" });
  const stage = el("div", { class: "fb-stage" }, [stageImg]);

  const prevBtn = el("button", { class: "fb-btn", type: "button" }, ["← Poprzednia"]);
  const nextBtn = el("button", { class: "fb-btn", type: "button" }, ["Następna →"]);
  const counter = el("div", { class: "fb-counter" }, ["—"]);
  const hint = el("div", { class: "fb-hint" }, ["ESC zamyka • ←/→ nawigacja"]);

  const bottombar = el("div", { class: "fb-bottombar" }, [
    el("div", { class: "fb-nav" }, [prevBtn, nextBtn]),
    counter,
    hint
  ]);

  panel.appendChild(topbar);
  panel.appendChild(stage);
  panel.appendChild(bottombar);
  modal.appendChild(panel);
  document.body.appendChild(modal);

  let index = 0;

  function render(){
    const p = pages[index];
    stageImg.src = p.fullUrl;
    stageImg.alt = `Strona ${p.page}`;
    counter.textContent = `Strona ${p.page} / ${pages.length}`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= pages.length - 1;
  }

  function openModal(i){
    index = i;
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    render();
    // focus management: focus close for accessibility
    closeBtn.focus();
  }

  function closeModal(){
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  function prev(){ if (index > 0){ index--; render(); } }
  function next(){ if (index < pages.length - 1){ index++; render(); } }

  // Events
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  projectSelect.addEventListener("change", () => {
    const v = projectSelect.value;
    if (!v) return;
    const pageNumber = parseInt(v, 10);
    const idx = pages.findIndex(x => x.page === pageNumber);
    if (idx >= 0){
      index = idx;
      render();
    }
    projectSelect.value = "";
  });

  window.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  return { openAt, close: closeModal, seed };
}
