# STATUS_CURRENT — BLOG StalLIFT
Data: 2026-09-23

STATUS = ACTIVE_DEVELOPMENT
BASELINE = StalLIFT_BLOG_v1.3_REFINED_FULL_2026-09-10
PRODUCTION_BRANCH = main
WORK_BRANCH = work/blog-v1.3-refined-preview
PUBLIC_ROUTE_TARGET = /blog/
CALCULATOR_ROUTE_TARGET = /konfig/

## Stan
- obecny blog v1.3 powstał poza repo i nie był dotąd kompletnie utrwalony na GitHub;
- utworzono dedykowaną gałąź roboczą do dalszego rozwoju;
- podgląd online ma być od teraz podstawową metodą kontroli UI;
- `main` nie jest modyfikowany bez akceptacji Ownera;
- dane/algorytmy know-how nie są publikowane w repo publicznym.

## Baseline funkcjonalny
- publiczny blog + widok cyklu + artykuły;
- light/dark;
- panel admina;
- komentarze/reakcje — implementacja serwerowa w baseline lokalnym;
- układy artykułów 2/3/feature i pojedynczy poziomy;
- prezentacja cyklu: carousel/collage/TOC;
- SEO/GEO: robots, sitemap, structured data — do spięcia z produkcyjnym WWW przed merge.
