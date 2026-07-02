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
- `home.html` ist die primäre Startseite im Stil der allgemeinen SCS-Holzshop-Startseite. Sie ist breiter als eine reine Carport-Landingpage angelegt, hebt Carports und den Konfigurator aber klar hervor.
- `index.html` bleibt als zusätzliche Carport-Einstiegsseite im Projekt erhalten und ist über den Navigationspunkt „Carports“ erreichbar; Logo, Breadcrumbs und allgemeine Startseitenlinks führen auf `home.html`.
- Die Carport-Landingpage (`info.html`) ist eine eigene Informationsseite für Nutzerinnen und Nutzer mit konkretem Carport-Interesse und erklärt Typen, Material, Planung, Baugenehmigung, Lieferung und Aufbau.
- Die Konfigurator-Seite (`konfigurator.html`) ist der Hauptfokus und enthält eine bedienbare Auswahl-Logik für Carport-Art, Dachform, Maße, Dacheindeckung und Seitenverkleidung.
- Warenkorb und Checkout sind Teil des MVP als lokaler, statischer Prototyp: eine aktuelle Carport-Konfiguration speichern, visuell als Layer-Vorschau anzeigen, Gutschein testen, Lieferdaten erfassen, Zahlungsart wählen und Bestellbestätigung anzeigen.
- Echte Zahlung, Login, CMS, Backend und serverseitige Datenübertragung sind weiterhin nicht Teil des MVP.
- Die README dokumentiert Projektbeschreibung, Setup, Technologieentscheidung, UX-Konzept, Limitierungen, Future Work und AI Use Declaration.
- Das Projekt ist eine Gruppenarbeit: Cornelius Weidmann verantwortet schwerpunktmäßig Konfigurator, PNG-Layer-Vorschau und technische Umsetzung des Figma-Prototyps; Peter Hollmann verantwortet schwerpunktmäßig die Carport-Landingpage und deren Funnel. Startseite, Checkout und zentrale Konzeptentscheidungen sind Gemeinschaftsarbeit.
- Die primäre Zielgruppe sind private Bauherren, Eigenheimbesitzer und handwerklich interessierte Heimwerker mit Bedarf an verständlicher Auswahlführung, Preis- und Planungstransparenz sowie Fachberatung.


### Architektonische Entscheidungen

- Es werden ausschließlich HTML, CSS und Vanilla JavaScript verwendet.
- Die Seite bleibt ohne Build-Schritt direkt auslieferbar und GitHub-Pages-kompatibel.
- Gemeinsames Styling liegt in `css/styles.css`.
- Allgemeine UI-Interaktionen liegen in `js/main.js`.
- Die Konfigurator-Logik liegt in `js/configurator.js`.
- Warenkorb-, Checkout- und Bestellbestätigungslogik liegt in `js/cart.js` und nutzt `localStorage`.
- Wiederverwendbarer Header und Footer liegen in `js/layout.js`; Startseite und Konfiguratorseite nutzen den normalen Header, damit beide Seiten visuell zusammengehören.
- Die Startseite und der Konfigurator verwenden gemeinsame Komponenten-Patterns für Reviews, Liefergebiet und Kontakt.
- Die Hauptnavigation führt mit „Carports“ auf `index.html`, mit „Konfigurator“ direkt auf `konfigurator.html` und mit „Holzbau“, „Fassade“ und „Terrasse“ auf die entsprechenden Kategorien des öffentlichen SCS-Holzshops.
- Die drei Preset-Karten auf `index.html` übergeben ihre Variante per `preset`-URL-Parameter an `konfigurator.html`, wo die zugehörige Auswahl direkt angewendet wird.
- Checkout-Seiten sind `warenkorb.html`, `checkout.html` und `bestellung.html`; sie bleiben statisch und GitHub-Pages-kompatibel.
- Alle im Projekt dargestellten Bilder werden lokal aus `assets/` eingebunden; externe SCS- und Social-Media-Seiten werden nur verlinkt.
- Preisberechnungen dürfen fiktiv sein, müssen aber im Code nachvollziehbar bleiben.
- GitHub Pages wird über `.github/workflows/deploy-protected-pages.yml` aus GitHub Actions veröffentlicht. `scripts/build-protected-site.sh` verschlüsselt dabei alle HTML-Seiten mit StatiCrypt; das Passwort liegt ausschließlich im Repository Secret `STATICRYPT_PASSWORD`.
