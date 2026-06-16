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
- Die Startseite (`index.html`) dient als SCS-nahe Shop-Einstiegsseite mit Hero, Kategorien, beliebten Konfigurationen, Bewertungen, Liefergebiet, FAQ, Kontakt und klarer Weiterleitung zum Konfigurator.
- Die Konfigurator-Seite (`konfigurator.html`) ist der Hauptfokus und enthält eine bedienbare Auswahl-Logik für Carport-Art, Dachform, Maße, Dacheindeckung, Seitenverkleidung und Menge.
- Warenkorb und Checkout sind Teil des MVP als lokaler, statischer Prototyp: Artikel speichern, Mengen ändern, Gutschein testen, Lieferdaten erfassen, Zahlungsart wählen und Bestellbestätigung anzeigen.
- Echte Zahlung, Login, CMS, Backend und serverseitige Datenübertragung sind weiterhin nicht Teil des MVP.
- Die README dokumentiert Projektbeschreibung, Setup, Technologieentscheidung, UX-Konzept, Limitierungen, Future Work und AI Use Declaration.


### Architektonische Entscheidungen

- Es werden ausschließlich HTML, CSS und Vanilla JavaScript verwendet.
- Die Seite bleibt ohne Build-Schritt direkt auslieferbar und GitHub-Pages-kompatibel.
- Gemeinsames Styling liegt in `css/styles.css`.
- Allgemeine UI-Interaktionen liegen in `js/main.js`.
- Die Konfigurator-Logik liegt in `js/configurator.js`.
- Warenkorb-, Checkout- und Bestellbestätigungslogik liegt in `js/cart.js` und nutzt `localStorage`.
- Wiederverwendbarer Header und Footer liegen in `js/layout.js`; Startseite und Konfiguratorseite nutzen den normalen Header, damit beide Seiten visuell zusammengehören.
- Die Startseite orientiert sich gestalterisch an der Konfiguratorseite und verwendet deren vorhandene Komponenten-Patterns für Presets, Reviews, Liefergebiet, FAQ und Kontakt.
- Checkout-Seiten sind `warenkorb.html`, `checkout.html` und `bestellung.html`; sie bleiben statisch und GitHub-Pages-kompatibel.
- Bilder können direkt von der öffentlichen SCS-Holzshop-Seite eingebunden werden, wenn keine lokalen Bilddateien verfügbar sind; lokale Hilfsgrafiken liegen in `assets/images/`.
- Preisberechnungen dürfen fiktiv sein, müssen aber im Code nachvollziehbar bleiben.
