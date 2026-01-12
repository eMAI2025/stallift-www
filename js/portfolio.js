import { initFlipbook } from "/flipbook/flipbook.js";

document.addEventListener("DOMContentLoaded", () => {
  initFlipbook({
    mount: "#flipbookMount",
    jsonUrl: "/flipbook_assets/portfolio.seed.json",
    baseUrl: "https://assets.stallift.com/flipbook_assets",
    title: "StalLIFT — Portfolio",
    previewCount: 6,
    pdfUrl: null
  });
});
