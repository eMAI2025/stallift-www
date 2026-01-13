import { initFlipbook } from "/flipbook/flipbook.js";

document.addEventListener("DOMContentLoaded", () => {
  initFlipbook({
    mount: "#flipbookMount",
    jsonUrl: "/flipbook_assets/portfolio.seed.json",
    // IMPORTANT: keep assets local (stallift.com) to avoid cross-domain/CORS/CSP issues
    baseUrl: "/flipbook_assets",
    title: "StalLIFT — Portfolio",
    previewCount: 6,
    pdfUrl: null
  });
});
