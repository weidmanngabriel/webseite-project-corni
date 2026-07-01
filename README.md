# SCS Carport-Konfigurator Studienprojekt

Studienprojekt-Website zur UX-Überarbeitung des SCS Carport-Konfigurators. Der Fokus liegt auf einer verständlichen Konfigurator-Seite mit Auswahl-Logik, Preisübersicht, Warenkorb und simuliertem Checkout-Prozess.


## Live-URL

Die Website ist für GitHub Pages vorbereitet. Nach dem Deployment kann die Live-URL hier ergänzt werden:

```text
https://weidmanngabriel.github.io/webseite-project-corni/home.html
```

## Deliverables

Die Abgabe soll laut Aufgabenstellung enthalten:

1. **Live Platform (URL)**: GitHub-Pages-Link zur Website.
2. **Code + Documentation (ZIP archive)**: dieses Repository als ZIP inklusive kommentiertem Code und README.

## Lokale Nutzung

Ohne Build-Schritt:

1. Repository herunterladen oder ZIP entpacken.
2. `home.html` direkt im Browser öffnen.

## Projektstruktur

```text
/
├── home.html               # Primäre Startseite im Stil des allgemeinen SCS-Holzshops
├── index.html              # Beibehaltene Carport-Einstiegsseite, erreichbar über „Carports“
├── info.html               # Ausführliche Informationen zu Planung, Lieferung und Aufbau
├── konfigurator.html       # Hauptseite mit Carport-Konfigurator
├── warenkorb.html          # Warenkorb mit Konfigurationsvorschau, Entfernen, Gutschein und Checkout-Einstieg
├── checkout.html           # Simulierter Checkout mit Adresse, Versand, Zahlung und Prüfung
├── bestellung.html         # Lokale Bestellbestätigung nach Checkout-Abschluss
├── css/
│   └── styles.css          # Gemeinsames Styling
├── js/
│   ├── cart.js             # LocalStorage-Warenkorb, Checkout-Logik, Bestellbestätigung
│   ├── layout.js           # Wiederverwendbarer Header und Footer
│   ├── main.js             # Tabs, FAQ, PLZ-Check, Scroll-Buttons
│   └── configurator.js     # Auswahl-State, Preisberechnung, Presets, Warenkorb-Übergabe
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

- `home.html` ist der zentrale Einstieg und das Ziel von Logo, Breadcrumbs und Rücklinks.
- `index.html` bleibt als zusätzliche Carport-Einstiegsseite im Projekt und ist über „Carports“ erreichbar.
- SCS-nahe Benefit-Leiste und Header-Struktur.
- Header und Footer sind als wiederverwendbare Web Components ausgelagert.
- Hero-Bereich im gleichen Stil wie die Konfigurator-Seite mit direktem Einstieg in den Konfigurator.
- SCS-nahe Kategorie-, Preset-, Bewertungs-, Liefergebiet-, FAQ- und Kontakt-Sektionen.
- PLZ-Dummycheck und beliebte Carport-Konfigurationen als klare Conversion-Einstiege.
- Service-/Trust-Elemente und gemeinsamer Footer.
- Warenkorb-Badge im Header zeigt gespeicherte Artikel browser-lokal an.

### Konfigurator-Seite

- Auswahl für Carport-Art, Dachform, Maße sowie bildbasierte Varianten für Dacheindeckung und Seitenverkleidung.
- Maßlogik mit unterschiedlichen Breitenbereichen für Einzel- und Doppelcarports sowie Tiefe und Höhe in 0,25-m-Schritten.
- Live-Preview über deckungsgleiche Render-Layer für Konstruktion, Dachbelag und Seitenverkleidung.
- Geführter Stepper-Modus für Tablet und Mobil, damit umfangreiche Auswahlgruppen nicht gleichzeitig sichtbar sind.
- Dynamische Preisberechnung auf Basis einer vereinfachten, fiktiven Logik.
- Live-Zusammenfassung der aktuellen Auswahl.
- Preset-Karten für beliebte Konfigurationen.
- Warenkorb-Übergabe mit gespeicherter Konfiguration, Einzelpreis, Produktdetails und visueller Layer-Vorschau.
- Produktbeschreibung, technische Daten, Datenblätter/Lieferumfang und Video-Platzhalter über Tabs.
- Kundenstimmen, Liefergebiet-Dummycheck, FAQ-Akkordeon und Kontaktbereich.

### Warenkorb und Checkout

- `warenkorb.html` zeigt die aktuelle Carport-Konfiguration, Produktdetails, echte Layer-Vorschau, Entfernen-Funktion, Gutschein-Dummycode `SCS10` und Checkout-Einstieg.
- Der Warenkorb ist bewusst auf einen Carport-Bausatz ausgelegt; eine neue Konfiguration ersetzt die vorherige Warenkorb-Auswahl.
- `checkout.html` enthält Kontaktdaten, Lieferadresse, dynamische PLZ-/Versandkostenlogik, Zahlungsart-Auswahl, optionale Nachricht und finale Bestätigung.
- `bestellung.html` zeigt nach Abschluss eine lokale Bestellbestätigung mit Bestellnummer, Kundendaten, Artikeln und nächstem Beratungs-/Angebotsschritt.
- Der gesamte Flow nutzt `localStorage`; dadurch bleibt er statisch, GitHub-Pages-kompatibel und ohne Backend lauffähig.

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
Die Startseite nutzt bewusst den normalen Header, damit sie gestalterisch näher an der Konfigurator-Seite bleibt.

## UX- und Conversion-Rate-Entscheidungen

- Der Konfigurator steht direkt im sichtbaren Hauptbereich der Produktseite.
- Aktive Optionen werden visuell hervorgehoben.
- Die aktuelle Auswahl und der Preis werden live aktualisiert.
- Beliebte Konfigurationen bieten schnelle Einstiegspunkte für unentschlossene Nutzerinnen und Nutzer.
- FAQ, Liefergebiet und Kontaktbereich reduzieren typische Kaufbarrieren.
- Die Startseite übernimmt zentrale Konfigurator-Patterns, damit Einstieg und Produktseite wie ein zusammenhängender Flow wirken.
- Der Checkout bildet gängige Shop-Schritte ab, bleibt aber transparent als lokaler Studienprototyp ohne echte Bestellung gekennzeichnet.

## Konzept und Abweichungen

- Der Aufbau orientiert sich am bereitgestellten Figma-/PNG-Prototypen und an typischen SCS-Shop-Elementen.
- Alle Produkt-, Service-, Zahlungs- und Lieferzonenbilder werden lokal aus `assets/` eingebunden, damit die ZIP-Abgabe ohne externe Bildquellen funktioniert. Externe Links führen lediglich zu weiterführenden SCS- und Social-Media-Seiten.
- Preise sind fiktiv, aber nachvollziehbar berechnet.
- Die Darstellung ist bewusst reduziert, damit die Website im Rahmen der Abgabe stabil und wartbar bleibt.

## Limitierungen

- Kein produktiver Checkout mit Backend-Anbindung.
- Keine echte Zahlung; Zahlungsarten sind nur auswählbare Prototyp-Optionen.
- Kundendaten werden nicht übertragen, sondern nur lokal im Browser für die Demo-Bestätigung gespeichert.
- Kein Backend und keine CMS-Anbindung.
- Keine echte Lagerbestands- oder Lieferzeitprüfung.
- Keine echte serverseitige Preisberechnung.
- Die Liefergebiet-Karte zeigt statisch die vorhandene lokale Lieferzonen-Grafik; die PLZ-Prüfung bleibt eine Dummy-Funktion.

## AI Use Declaration

Bei der Erstellung dieser Studienprojekt-Website wurde KI-Unterstützung genutzt, um Projektstruktur, HTML/CSS/JavaScript-Code, Dokumentation und UX-Planung schneller zu entwerfen. Die Inhalte sollten vor der finalen Abgabe fachlich, gestalterisch und rechtlich geprüft werden.
