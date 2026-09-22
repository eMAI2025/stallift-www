# Kalkulator ofertowy StalLIFT — opis integracyjny

## Cel dokumentacji

Ten katalog opisuje **logikę integracji, strukturę danych i proces operacyjny** kalkulatora ofertowego StalLIFT w zakresie potrzebnym do utrzymania formularza WWW i jego integracji z ERPNext/NAS.

Nie jest to repozytorium samego kalkulatora.

## Granica poufności

Repozytorium `stallift-www` jest publiczne. Dlatego w tej dokumentacji **nie wolno umieszczać**:

- formuł kalkulatora,
- cen jednostkowych,
- współczynników,
- tabel doborowych i progów,
- algorytmów wyceny,
- pełnego skoroszytu kalkulatora,
- szczegółów pozwalających odtworzyć know-how StalLIFT.

Dokumentacja opisuje wyłącznie kontrakty, role komponentów i przepływ danych.

## Główny przepływ

```text
formularz WWW
  -> dane zapytania + załączniki
  -> rejestracja sprawy w ERPNext
  -> nadanie numeru YY-SL-NNN
  -> folder sprawy na NAS
  -> przygotowanie danych wejściowych
  -> lokalny dobór parametrów technicznych
  -> chroniony kalkulator Excel
  -> wynik kalkulacji
  -> automatyczny draft oferty
  -> kontrola Ownera
  -> wysyłka
```

## Dokumenty

- [ARCHITEKTURA_I_PRZEPLYW.md](ARCHITEKTURA_I_PRZEPLYW.md) — komponenty i przepływ danych.
- [KONTRAKT_DANYCH.md](KONTRAKT_DANYCH.md) — podział danych formularza, danych systemowych i danych lokalnych.
- [PROCES_OPERACYJNY.md](PROCES_OPERACYJNY.md) — pełny przebieg sprawy ofertowej.
- [BEZPIECZENSTWO_I_GRANICE.md](BEZPIECZENSTWO_I_GRANICE.md) — czego nie wolno publikować i gdzie przebiega granica odpowiedzialności.

## Zasady nadrzędne

1. Formularz zbiera fakty i wymagania klienta, a nie zmusza klienta do podejmowania specjalistycznych decyzji technicznych.
2. Część parametrów jest dobierana lokalnie przez Ownera lub w przyszłości przez zatwierdzonego agenta.
3. Excel pozostaje jedynym silnikiem obliczeniowym.
4. Backend nie odtwarza formuł kalkulatora.
5. Każda zarejestrowana sprawa otrzymuje jeden trwały numer `YY-SL-NNN`.
6. Ten sam numer identyfikuje sprawę ofertową, dokumenty i późniejszy projekt, jeśli dojdzie do realizacji.
7. Każda rewizja oferty posiada własny zamrożony komplet danych użytych do kalkulacji.

## Status

Dokumentacja jest roboczym opisem architektury integracyjnej. Implementacja backendu i stan wdrożenia ERPNext są prowadzone poza tym repozytorium, w repozytorium operacyjnym ERPNext.
