# DECISIONS_CURRENT — BLOG StalLIFT

## Design system
- Jeden system UI dla WWW, bloga i kalkulatora.
- Header/footer, typografia, buttony, light/dark i responsive mają być wspólne.
- Niebieski firmowy: #005195 jako akcent; bez agresywnego neonu.
- Dark mode: kierunek czarny/grafitowy, nie granatowo-szary.
- Przyciski headera w light/dark mają tę samą bazową kolorystykę; odbicie pozostaje.
- Aktywna zakładka jest stale wyróżniona.

## Blog start
- duży nagłówek „PUBLIKACJE EKSPERCKIE”; bez duplikatu małym drukiem;
- autor domyślnie „Paweł Strzelecki”, pole edytowalne;
- opcjonalny blok autora: zdjęcie, bio, LinkedIn.

## Cykl
- jedna górna prezentacja wybierana w adminie: carousel / collage / graphical TOC;
- karuzela bez flipu, obracania i trzęsienia; drag/swipe, kilka kart jednocześnie;
- grafiki pokazujemy w całości, bez przypadkowego crop;
- niżej modułowe wiersze artykułów: 2 / 3 / FEATURE / pojedynczy poziomy lewo-prawo.

## Karty
- część + pełny tytuł zawsze widoczne;
- tylko drobny teaser może się ujawniać na hover/focus;
- mobile nie może wymagać hover.

## Admin
- pełny widok przy 100% zoom na PC;
- light/dark także w admin;
- ostrzeżenie przy wyjściu z niezapisanymi zmianami;
- Podgląd jest kontekstowy: ustawienia→home, cykl→cykl, artykuł→artykuł;
- zalogowany admin z ikony konta trafia do admina.

## Komentarze
- konto: komentarz bez dodatkowej weryfikacji;
- gość: komentarz po prostej weryfikacji e-mail;
- osobne komentarze/reakcje dla cyklu i artykułu.

## Publiczne URL
- WWW: https://stallift.com/
- kalkulator: https://stallift.com/konfig/
- blog: https://stallift.com/blog/
