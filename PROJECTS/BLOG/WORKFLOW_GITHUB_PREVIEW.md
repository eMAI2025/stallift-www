# GitHub-first preview workflow

## Cel
Eliminujemy konieczność pobierania ZIP i uruchamiania localhost do zwykłej kontroli wyglądu.

## Przepływ
1. Zmiana jest wykonywana na `work/blog-v1.3-refined-preview`.
2. Commit trafia do GitHub.
3. Otwarty draft PR do `main` uruchamia Cloudflare Pages Preview.
4. Owner otwiera URL preview i ocenia publiczny blog/cykl/admin-preview.
5. Poprawki trafiają do tej samej gałęzi i automatycznie aktualizują preview.
6. Dopiero zaakceptowany stan może zostać scalony do `main`.

## Bezpieczeństwo
- preview panelu admin jest read-only;
- preview ma `noindex,nofollow`;
- sekrety i hasła nigdy nie trafiają do repo;
- produkcyjny `main` pozostaje nienaruszony do momentu akceptacji.

## Recovery
ZIP może być przechowywany jako checkpoint poza podstawową ścieżką pracy, ale repo + preview są źródłem roboczym.
