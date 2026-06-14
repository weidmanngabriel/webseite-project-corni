# SCS Carport-Konfigurator Studienprojekt

Dieses Repository enthält eine statische, deutschsprachige Studienprojekt-Website zur UX-Überarbeitung des SCS Carport-Konfigurators. Der Fokus liegt auf einer verständlichen Konfigurator-Seite mit Auswahl-Logik, Preisübersicht und Anfrage-Zusammenfassung.

> Hinweis: Dies ist ein Studienprojekt und kein offizieller SCS-Holzshop.

## Live-URL

Die Website ist für GitHub Pages vorbereitet. Nach dem Deployment kann die Live-URL hier ergänzt werden:

```text
https://weidmanngabriel.github.io/webseite-project-corni/konfigurator.html
```

## Deliverables

Die Abgabe soll laut Aufgabenstellung enthalten:

1. **Live Platform (URL)**: GitHub-Pages-Link zur Website.
2. **Code + Documentation (ZIP archive)**: dieses Repository als ZIP inklusive kommentiertem Code und README.
3. **Video Walkthrough**: kurzer Screen-Record mit Fokus auf UX- und Conversion-Rate-Entscheidungen.
4. **Presentation (PDF)**: Präsentation mit Konzept-Walkthrough, technischen Entscheidungen und Live-Demo.

## Lokale Nutzung

Ohne Build-Schritt:

1. Repository herunterladen oder ZIP entpacken.
2. `index.html` direkt im Browser öffnen.
3. Alternativ einen lokalen Server starten, z. B.:

```bash
python3 -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000/
```

## Projektstruktur

```text
/
├── index.html              # Startseite mit Shop-Einstieg
├── konfigurator.html       # Hauptseite mit Carport-Konfigurator
├── css/
│   └── styles.css          # Gemeinsames Styling
├── js/
│   ├── layout.js           # Wiederverwendbarer Header und Footer
│   ├── main.js             # Tabs, FAQ, PLZ-Check, Scroll-Buttons
│   └── configurator.js     # Auswahl-State, Preisberechnung, Presets, Modal
├── assets/
│   ├── icons/              # Lokale Service-, Kontakt- und Social-Icons
│   ├── images/             # Lokale Produkt-, Hero-, Payment- und Lieferzonenbilder
│   ├── logos/              # SCS-Logos
│   └── trust/              # Trust- und Zertifizierungslogos
├── AGENTS.md               # Projektregeln und aktueller Projektstand
└── README.md               # Dokumentation für Abgabe und Setup
```

## Features

### Startseite

- SCS-nahe Benefit-Leiste und Header-Struktur.
- Header und Footer sind als wiederverwendbare Web Components ausgelagert.
- Hero-Bereich mit direktem Einstieg in den Konfigurator.
- Kategorie-Karten und kurzer Konzeptbereich.
- Service-/Trust-Elemente und Footer.

### Konfigurator-Seite

- Auswahl für Carport-Art, Dachform, Maße sowie bildbasierte Varianten für Dacheindeckung und Seitenverkleidung.
- Maßlogik mit unterschiedlichen Breitenbereichen für Einzel- und Doppelcarports sowie Tiefe und Höhe in 0,25-m-Schritten.
- Live-Preview über deckungsgleiche Render-Layer für Konstruktion, Dachbelag und Seitenverkleidung.
- Geführter Stepper-Modus für Tablet und Mobil, damit umfangreiche Auswahlgruppen nicht gleichzeitig sichtbar sind.
- Dynamische Preisberechnung auf Basis einer vereinfachten, fiktiven Logik.
- Live-Zusammenfassung der aktuellen Auswahl.
- Preset-Karten für beliebte Konfigurationen.
- Zusammenfassungsmodal als angedeuteter Anfrage-/Warenkorb-Prozess.
- Produktinfos, technische Daten, Vorteile und Video-Platzhalter über Tabs.
- Kundenstimmen, Liefergebiet-Dummycheck, FAQ-Akkordeon und Kontaktbereich.

## Technologieentscheidung

- **HTML** für die statische Seitenstruktur.
- **CSS** für Layout, Responsive Design und SCS-nahe Gestaltung.
- **Vanilla JavaScript** für Interaktionen und Konfigurator-Logik.
- **Kein Framework, kein Backend, kein Build-Prozess**, damit die Website leicht verständlich, wartbar und GitHub-Pages-kompatibel bleibt.

## Wiederverwendbarer Header und Footer

Neue Seiten binden Header und Footer über `js/layout.js` ein:

```html
<site-header current="carport"></site-header>
...
<site-footer></site-footer>

<script src="js/layout.js"></script>
```

Für die Startseite kann `current="home"` verwendet werden; für die Konfigurator-Seite `current="carport"`.

## UX- und Conversion-Rate-Entscheidungen

- Der Konfigurator steht direkt im sichtbaren Hauptbereich der Produktseite.
- Aktive Optionen werden visuell hervorgehoben.
- Die aktuelle Auswahl und der Preis werden live aktualisiert.
- Beliebte Konfigurationen bieten schnelle Einstiegspunkte für unentschlossene Nutzerinnen und Nutzer.
- FAQ, Liefergebiet und Kontaktbereich reduzieren typische Kaufbarrieren.
- Statt echtem Checkout wird eine Anfrage-Zusammenfassung gezeigt, damit der MVP realistisch bleibt.

## Konzept und Abweichungen

- Der Aufbau orientiert sich am bereitgestellten Figma-/PNG-Prototypen und an typischen SCS-Shop-Elementen.
- Produkt-, Service-, Zahlungs- und Lieferzonenbilder werden lokal aus `assets/` eingebunden, damit die ZIP-Abgabe ohne externe Bildquellen funktioniert.
- Preise sind fiktiv, aber nachvollziehbar berechnet.
- Die Darstellung ist bewusst reduziert, damit die Website im Rahmen der Abgabe stabil und wartbar bleibt.

## Bekannte Limitierungen

- Kein echter Checkout.
- Keine echte Zahlung.
- Keine Kundendaten-Erfassung.
- Kein Backend und keine CMS-Anbindung.
- Keine echte Lagerbestands- oder Lieferzeitprüfung.
- Keine echte serverseitige Preisberechnung.
- Die Liefergebiet-Karte zeigt statisch die vorhandene lokale Lieferzonen-Grafik; die PLZ-Prüfung bleibt eine Dummy-Funktion.

## Future Work

- Lizenz-/Nutzungsrechte der lokal eingebundenen SCS-nahen Bild- und Logoassets vor der finalen Veröffentlichung prüfen.
- Konfigurator in klarere mobile Schritte aufteilen.
- Preislogik mit echten Produktdaten ersetzen.
- Anfrageformular mit Validierung ergänzen.
- Barrierefreiheit und Tastaturbedienung weiter prüfen.
- Optional: Vergleich mehrerer Konfigurationen oder PDF-Export der Zusammenfassung.

## AI Use Declaration

Bei der Erstellung dieser Studienprojekt-Website wurde KI-Unterstützung genutzt, um Projektstruktur, HTML/CSS/JavaScript-Code, Dokumentation und UX-Planung schneller zu entwerfen. Die Inhalte sollten vor der finalen Abgabe fachlich, gestalterisch und rechtlich geprüft werden.
