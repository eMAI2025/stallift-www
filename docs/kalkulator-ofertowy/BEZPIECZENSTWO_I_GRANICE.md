# Bezpieczeństwo i granice publikacji

## 1. Repozytorium publiczne

Repozytorium `stallift-www` jest publiczne.

Dokumentacja kalkulatora musi więc być utrzymywana na poziomie architektury i kontraktów, bez ujawniania know-how.

## 2. Bezwzględnie poza repozytorium

Nie publikujemy:

- pliku kalkulatora,
- pełnych arkuszy roboczych,
- formuł,
- wzorów masy i powierzchni,
- cen,
- marż,
- współczynników,
- tabel doborowych,
- progów zależnych od udźwigu,
- dokładnych zasad doboru profili,
- parametrów handlowych,
- szczegółowych reguł wyceny,
- danych klientów,
- rzeczywistych ofert.

## 3. Co może być opisane

Można publikować:

- nazwy komponentów,
- odpowiedzialności komponentów,
- kierunek przepływu danych,
- klasy danych,
- zasady wersjonowania,
- format identyfikatorów,
- ogólny kontrakt API,
- semantykę statusów,
- wymogi walidacji,
- granice między formularzem, backendem, Excelem i generatorem dokumentów.

## 4. Granica formularza

Frontend nie może zawierać:

- cen,
- wzorów,
- ukrytych współczynników handlowych,
- szczegółowych tabel doborowych.

Może natomiast:

- walidować pola,
- ukrywać niedopuszczalne kombinacje,
- kierować użytkownika do danych, które rzeczywiście zna,
- przekazywać kontekst potrzebny do późniejszego doboru technicznego.

## 5. Granica backendu

Backend może:

- walidować,
- mapować,
- wersjonować,
- kopiować dane,
- zarządzać plikami,
- uruchamiać proces kalkulacji,
- zapisywać wynik.

Backend nie powinien być drugim niezależnym silnikiem obliczeniowym.

## 6. Granica Excela

Excel jest chronionym silnikiem obliczeniowym.

Publiczna dokumentacja może stwierdzać, jakie klasy danych przyjmuje i jakie klasy danych zwraca, ale nie opisuje sposobu wyliczenia wyniku.

## 7. Logi

Logi publicznego frontend/backend nie powinny zawierać:

- cen wejściowych,
- pełnych danych kalkulacyjnych,
- formuł,
- poufnych współczynników,
- pełnych danych klienta.

Do diagnostyki powinny wystarczyć:

- identyfikatory,
- wersje,
- statusy,
- kody błędów,
- hashe,
- czasy wykonania.

## 8. Zasada source of truth

- dane klienta: oryginalny payload / załączniki,
- numer sprawy i status procesu: ERPNext,
- dokumenty i snapshoty: NAS,
- obliczenia: chroniony kalkulator Excel,
- dokument końcowy: generator oferty + zatwierdzona rewizja.

Żaden publiczny komponent WWW nie jest źródłem prawdy dla cen ani logiki kalkulatora.
