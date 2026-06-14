# Projektanweisungen für Agents

Diese Datei hält projektspezifische Arbeitsregeln sowie den aktuellen Projektstand fest. Sie gilt für das gesamte Repository.

## Arbeitsregeln

- Es sind keine Playwright-Screenshots notwendig.
- Wenn sich Anforderungen, der Projektumfang, die Abgabeanforderungen oder architektonische Entscheidungen ändern, muss der Abschnitt „Projektstand“ entsprechend ergänzt oder angepasst werden.
- Die `README.md` soll bei relevanten Änderungen an Setup, Features, Live-URL, Limitierungen oder Abgabehinweisen aktualisiert werden.
- Änderungen sollen einfach verständlich und wartbar bleiben.


## Projektstand

### High-Level Requirements

- Das Projekt ist eine statische, deutschsprachige Studienprojekt-Website zur UX-Überarbeitung des SCS-Carport-Konfigurators.
- Die Website soll über GitHub Pages live erreichbar sein und am Ende als ZIP mit Code und Dokumentation eingereicht werden können.
- Die Startseite (`index.html`) dient als SCS-nahe Shop-Einstiegsseite mit Hero, Kategorien, Bewertungen, Inspiration, Ratgeber, Logistik, Kontakt, News und klarer Weiterleitung zum Konfigurator.
- Die Konfigurator-Seite (`konfigurator.html`) ist der Hauptfokus und enthält eine bedienbare Auswahl-Logik für Carport-Art, Dachform, Maße, Dacheindeckung, Seitenverkleidung und Menge.
- Ein echter Checkout, echte Zahlung, Login, CMS und Backend sind nicht Teil des MVP; der Warenkorb-/Anfrage-Prozess wird nur als Zusammenfassung angedeutet.
- Die README dokumentiert Projektbeschreibung, Setup, Technologieentscheidung, UX-Konzept, Limitierungen, Future Work und AI Use Declaration.


### Architektonische Entscheidungen

- Es werden ausschließlich HTML, CSS und Vanilla JavaScript verwendet.
- Die Seite bleibt ohne Build-Schritt direkt auslieferbar und GitHub-Pages-kompatibel.
- Gemeinsames Styling liegt in `css/styles.css`.
- Allgemeine UI-Interaktionen liegen in `js/main.js`.
- Die Konfigurator-Logik liegt in `js/configurator.js`.
- Wiederverwendbarer Header und Footer liegen in `js/layout.js`; die Startseite nutzt einen Hero-Header-Variant, die Konfiguratorseite den normalen Header.
- Bilder können direkt von der öffentlichen SCS-Holzshop-Seite eingebunden werden, wenn keine lokalen Bilddateien verfügbar sind; lokale Hilfsgrafiken liegen in `assets/images/`.
- Preisberechnungen dürfen fiktiv sein, müssen aber im Code nachvollziehbar bleiben.
