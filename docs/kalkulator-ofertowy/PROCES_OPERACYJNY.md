# Proces operacyjny ofertowania

## 1. Otrzymanie zapytania

Zapytanie może pochodzić z formularza WWW albo innego kanału.

Na tym etapie nie każde zapytanie musi stać się pełną sprawą ofertową.

## 2. Decyzja o rejestracji

Owner decyduje, czy zapytanie zostaje zarejestrowane.

Po decyzji system:

- nadaje numer `YY-SL-NNN`,
- tworzy sprawę ofertową,
- tworzy pełny folder NAS ze wzorca,
- zapisuje oryginalne zapytanie i załączniki.

Numer pozostaje zajęty niezależnie od późniejszego wyniku.

## 3. Przygotowanie danych

Dane formularza są przekształcane do wewnętrznego kontraktu wejściowego.

Następnie uzupełniane są dane techniczne, których klient nie podaje albo których nie powinien sam wybierać.

To jest świadomy etap inżynierski.

## 4. Kalkulacja

Do chronionego kalkulatora trafia kompletny wsad.

Kalkulator:

1. odczytuje dane wejściowe,
2. wykorzystuje lokalny snapshot cennika,
3. wykonuje obliczenia,
4. wystawia kontrolowany wynik.

Niepublikowane formuły i ceny pozostają poza repozytorium WWW.

## 5. Draft oferty

Poprawny wynik inicjuje automatyczne utworzenie draftu oferty.

Draft może zawierać dane techniczne, opis zakresu oraz wynik handlowy zgodnie z aktualnym szablonem.

## 6. Kontrola Ownera

Owner:

- sprawdza dane wejściowe w zakresie wymagającym decyzji,
- sprawdza wynik,
- może zmienić parametry lokalne i wygenerować kolejną rewizję,
- zatwierdza finalny draft.

Nie zakłada się pełnej bezobsługowości procesu.

## 7. Wysyłka

Wysyłka jest osobnym krokiem.

System przechowuje informację:

- kto wysłał,
- kiedy wysłał,
- którą rewizję,
- do kogo,
- z jakim wynikiem transportowym.

## 8. Wynik sprawy

Sprawa może zakończyć się m.in. jako:

- wysłana i oczekująca,
- bez odpowiedzi,
- niedostarczona,
- odrzucona,
- anulowana,
- zaakceptowana.

## 9. Przejście do projektu

Dopiero po akceptacji handlowej powstaje właściwy rekord realizacyjny `Project`.

Project otrzymuje ten sam numer `YY-SL-NNN`, który został nadany przy rejestracji zapytania.

## 10. Folder NAS

Folder sprawy nie jest przenoszony między globalnymi katalogami statusowymi.

Status sprawy wynika z ERPNext i z zawartości właściwych sekcji wzorca folderu.

Kluczowe obszary:

```text
10_OFERTA_RYSUNKI_OFERTOWE_WIZUALIZACJE/
  10.1_OFERTY/
    10.1.1_OBLICZENIA/
    10.1.2_DO_POTWIEDZENIA/

70_KORESPONDENCJA/
  70.0_ZAPYTANIA/
  70.1_OFERTY/
    70.1.1_WYSŁANE/
    70.1.2_NIEDOSTARCZONE/
    70.1.3_ODRZUCONE/
  70.2_UMOWA/
    70.2.1_AKCEPTACJA/
```

## 11. Rewizje

Każda zmiana wpływająca na ofertę tworzy kolejną rewizję:

```text
R0 -> R1 -> R2 -> ...
```

Historia nie jest nadpisywana.

## 12. Ewidencja w ERPNext

ERPNext ma służyć nie tylko do obsługi realizowanych projektów, ale również do analityki procesu ofertowego, w tym:

- liczby zapytań,
- liczby kalkulacji,
- liczby przygotowanych ofert,
- liczby wysłanych ofert,
- czasu przejścia między etapami,
- osób wykonujących poszczególne czynności,
- statusów i powodów zamknięcia,
- skuteczności procesu ofertowego.

Szczegółowy model ERPNext jest utrzymywany w repozytorium operacyjnym ERPNext.
