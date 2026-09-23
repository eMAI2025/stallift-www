# CHECKPOINT — StalLIFT Blog v1.3

DATE = 2026-09-10  
PACKAGE = StalLIFT_BLOG_v1.3_REFINED_FULL_2026-09-10.zip  
SIZE = 7 020 868 B  
SHA256 = b274b0b6330fe1d9f2288ffb9e029f36034e4b18623c1c35cbc05a2e1b412542  
ZIP_INTEGRITY = PASS

## Zawartość baseline
- Node runtime: server.mjs
- package.json
- Dockerfile / docker-compose.yml
- START_LOCAL_DEMO.cmd / START_LOCAL_DEMO.ps1
- public/: home, cycle, article, account
- admin/: UI + logika admin
- data/: content, interactions, users
- public/js/: common, home, cycle, article, account
- public/assets/: blog.css, logo/wordmark, cover assets, social/account assets
- CURRENT_STATE / DECISIONS / DESIGN_SYSTEM / VALIDATION / RELEASE_NOTES

## Ważne poprawki v1.3
- zapis presentationMode po stronie backendu;
- zachowanie wariantów one-left / one-right;
- grafiki kart bez agresywnego crop;
- część + tytuł stale widoczne;
- uproszczona prezentacja carousel bez flip/shake;
- ciemny motyw przesunięty w stronę czerni;
- wspólna stylistyka przycisków z odbiciem;
- stalowe ikony social/login;
- admin zagęszczony pod 100% zoom;
- kontekstowy Podgląd z edycji.

## Migracja workflow
Od 2026-09-23 ten ZIP jest checkpointem historycznym. Dalszy rozwój odbywa się na GitHub branch:
`work/blog-v1.3-refined-preview`

Podgląd online jest wskazany w PREVIEW_CURRENT.md. ZIP/local nie są już podstawową ścieżką kontroli wizualnej.
