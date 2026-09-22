# Kontrakt danych

## 1. Trzy klasy danych

### A. Dane od klienta

Są to informacje, które klient może wiarygodnie podać, np.:

- nazwa i lokalizacja inwestycji,
- numer projektu klienta,
- planowany termin,
- udźwig,
- liczba przystanków,
- wymiary szybu,
- nadszybie i podszybie,
- lokalizacja konstrukcji: wewnętrzna / zewnętrzna,
- typ zabudowy na poziomie ogólnym,
- strony konstrukcji i zabudowy,
- wejścia i kierunki drzwi,
- wymagania jawnie wskazane w zapytaniu,
- załączniki.

### B. Dane systemowe

Są wyprowadzane z formularza bez wykonywania obliczeń ofertowych, np.:

- liczba aktywnych ścian w określonych kierunkach,
- liczba aktywnych słupów,
- identyfikator submission,
- numer sprawy po rejestracji,
- rewizja,
- wersja formularza,
- status kompletności,
- klasyfikacja, czy dane mogą przejść do dalszego etapu.

### C. Dane lokalnego przygotowania oferty

To parametry, których klient często nie zna i nie powinien wybierać samodzielnie.

Przykładowe kategorie:

- wariant konstrukcji,
- wariant techniczny zabudowy,
- parametry dodatkowe wynikające z dokumentacji projektowej,
- odciągi,
- korekty rozstawu elementów,
- dodatkowe elementy i prace,
- dodatkowe masy i powierzchnie,
- koszty dodatkowe.

Te dane uzupełnia Owner albo w przyszłości zatwierdzony agent.

## 2. Zasada formularza

Formularz powinien:

- pytać o fakty,
- ukrywać kombinacje niemożliwe,
- ograniczać wybór do sensownego zakresu,
- nie wymagać od klienta znajomości technologii StalLIFT.

Formularz nie powinien próbować zastąpić przygotowania technicznego oferty.

## 3. Dobór wariantu zabudowy

Formularz przekazuje **kontekst**, a nie pełne know-how doborowe.

Kontekst obejmuje przede wszystkim:

- lokalizację konstrukcji,
- ogólny typ zabudowy,
- charakter położenia względem budynku,
- aktywne ściany,
- konfigurację mieszaną.

Na tej podstawie system może:

1. zawęzić zbiór dopuszczalnych wariantów,
2. ustawić wariant domyślny,
3. albo oznaczyć sprawę jako wymagającą lokalnej decyzji.

Dokładne reguły doborowe, nazwy handlowe wariantów, parametry techniczne i wartości cenowe nie są publikowane w tym repozytorium.

## 4. Zabudowa mieszana

Zabudowa mieszana jest traktowana jako osobny przypadek.

Formularz powinien zachować informację o typie każdej aktywnej ściany, ale końcowy sposób kalkulacji pozostaje po stronie chronionego kalkulatora i lokalnego przygotowania oferty.

Do czasu zatwierdzenia pełnej logiki mieszanej system powinien oznaczać taki przypadek jako wymagający kontroli lokalnej.

## 5. Dane ppoż.

Jeżeli klient jawnie wymaga zabezpieczenia przeciwpożarowego konstrukcji, formularz powinien to zapisać jako osobne pole strukturalne.

Pole musi być jednoznacznie opisane jako dotyczące **konstrukcji stalowej**, a nie zabudowy przeciwpożarowej szybu.

Informacja wpisana jedynie w uwagach powinna być traktowana jako potencjalny konflikt wymagający weryfikacji, a nie jako automatyczna zmiana parametru technicznego.

## 6. Payload formularza

Minimalny logiczny układ:

```json
{
  "schema_version": "...",
  "form_version": "...",
  "submission_id": "...",
  "generated_at": "...",
  "investment": {},
  "shaft": {},
  "cladding": {}
}
```

Szczegółowy JSON Schema może być rozwijany niezależnie, ale musi zachować kompatybilność semantyczną z tym podziałem.

## 7. Załączniki

Payload zawiera metadane załączników, natomiast same pliki są przesyłane osobno.

Backend odpowiada za:

- sprawdzenie rzeczywistego rozmiaru,
- kontrolę typu pliku,
- zapis oryginalnej nazwy,
- utworzenie bezpiecznej nazwy technicznej,
- hash,
- powiązanie z submission i późniejszą sprawą.

## 8. Identyfikacja

Przed rejestracją podstawowym identyfikatorem jest `submission_id`.

Po rejestracji podstawowym identyfikatorem biznesowym staje się:

```text
YY-SL-NNN
```

Każdy późniejszy artefakt powinien być jednoznacznie powiązany z:

- numerem sprawy,
- rewizją,
- identyfikatorem kalkulacji.
