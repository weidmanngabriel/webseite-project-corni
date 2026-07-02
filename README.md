# SCS Carport-Konfigurator Studienprojekt

Studienprojekt-Website zur UX-Überarbeitung des SCS Carport-Konfigurators. Der Fokus liegt auf einer verständlichen Konfigurator-Seite mit Auswahl-Logik, Preisübersicht, Warenkorb und simuliertem Checkout-Prozess.

## Zielgruppe und Problemstellung

Die primäre Zielgruppe sind private Bauherren, Eigenheimbesitzer und handwerklich interessierte Heimwerker, die einen Carport als Bausatz planen und sich vor einer Bestellung verlässlich orientieren möchten. Sie bringen Interesse am Selberbauen mit, sind aber nicht zwingend mit allen konstruktiven Details, Materialien oder Lieferbedingungen vertraut. Deshalb benötigen sie eine verständliche Auswahlführung, eine sofort sichtbare Vorschau, Kostentransparenz und leicht erreichbare Fachberatung.

Die Überarbeitung adressiert vor allem drei Probleme des ursprünglichen Nutzungserlebnisses: Der Einstieg in die Konfiguration sollte durch einen klaren primären CTA schneller erkennbar werden, die umfangreichen Optionen sollten in einer modernen und konsistenten Oberfläche leichter vergleichbar sein und der aktuelle Stand der Konfiguration sollte durch Live-Vorschau, Auswahlzusammenfassung und Preis jederzeit nachvollziehbar bleiben. Die ausführliche Carport-Landingpage ergänzt diesen direkten Einstieg für Nutzerinnen und Nutzer, die vor der Konfiguration noch Planungsinformationen benötigen.

## Vorgehen und Konzeptgrundlage

Eine saubere Planung war ein zentraler Teil des Projekts. Vor der Umsetzung wurden Informationshierarchie, Seitenstruktur, Nutzerführung, visuelle Zustände und der Weg von der ersten Orientierung bis zum Checkout im Figma-Prototyp festgelegt. Dadurch konnten HTML, CSS und JavaScript anschließend auf einer konsistenten Grundlage umgesetzt werden. Der Figma-Prototyp und die zugrunde liegenden UX-Entscheidungen wurden vom Projektteam selbst erarbeitet.

Aus dieser Planung entstand ein zweistufiger Einstieg: `home.html` bildet den breiten SCS-Shop-Kontext ab, während `index.html` Carport-Interessierte gezielt über Nutzenargumente, Presets, Lieferinformationen, Referenzen und Beratung in den Konfigurator führt. `info.html` ergänzt später eine vertiefende Informationsseite zu Carport-Typen, Material, Genehmigung, Lieferung und Aufbau.


## Live-URL

Die Website ist über GitHub Pages unter folgender URL vorgesehen:

```text
https://weidmanngabriel.github.io/webseite-project-corni/home.html
```

## Abgabeumfang

Die Abgabe soll laut Aufgabenstellung enthalten:

1. **Live Platform (URL)**: veröffentlichte Projektwebsite.
2. **Code + Documentation (ZIP archive)**: Repository als ZIP inklusive Code, lokaler Assets und README.
3. **Video Walkthrough**: 60 Sekunden (±10 Sekunden) mit Fokus auf UX- und Conversion-Entscheidungen.
4. **Präsentation**: 14-minütige Gruppenpräsentation mit Konzept, Technologie und Live-Demo; Abgabe der Folien als PDF.

## Lokale Nutzung

1. Repository herunterladen oder ZIP entpacken.
2. `home.html` direkt im Browser öffnen.

## Projektstruktur

```text
/
├── home.html               # Überarbeitete Startseite im Stil des allgemeinen SCS-Holzshops
├── index.html              # Carport-Landingpage, erreichbar über „Carports“
├── info.html               # Ausführliche Informationen zu Planung, Lieferung und Aufbau
├── konfigurator.html       # Hauptseite mit Carport-Konfigurator
├── warenkorb.html          # Warenkorb mit Konfigurationsvorschau
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
└── README.md               # Dokumentation für Abgabe und Setup
```

## Features

### Startseite

- `home.html` ist der zentrale Einstieg und das Ziel von Logo, Breadcrumbs und Rücklinks.
- `index.html` ist die Carport-Einstiegsseite im Projekt und ist über „Carports“ erreichbar.
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
- **Web Components** für den gemeinsamen Header und Footer, damit wiederkehrendes Layout zentral gepflegt wird.
- **Kein Framework, kein Backend, kein Build-Prozess**, weil der Projektumfang keine komplexe Laufzeit-Infrastruktur erfordert und die Website so lokal aus dem ZIP sowie auf GitHub Pages ohne Installation funktioniert.
- **Lokale Assets und `localStorage`** ermöglichen eine eigenständig lauffähige Demonstration von Vorschau, Warenkorb und Bestellbestätigung ohne externe Produkt- oder Bestell-API.

## Wiederverwendbarer Header und Footer

Neue Seiten binden Header und Footer über `js/layout.js` ein:

```html
<site-header current="carport"></site-header>
...
<site-footer></site-footer>

<script src="js/layout.js"></script>
```


## UX- und Conversion-Rate-Entscheidungen

- Der klare Haupt-CTA führt ohne Umweg in den Konfigurator und macht den wichtigsten Conversion-Pfad früh sichtbar.
- Aktive Optionen werden visuell hervorgehoben; Hover- und Fokuszustände geben zusätzliches Interaktionsfeedback.
- Live-Vorschau, Auswahlzusammenfassung und Preis reduzieren Unsicherheit während der Konfiguration.
- Beliebte Konfigurationen bieten schnelle Einstiegspunkte für Nutzerinnen und Nutzer ohne genaue technische Vorauswahl.
- Die Preset-Karten auf `index.html` öffnen den Konfigurator mit der gewählten Variante; Typ, Dachform, Maße, Eindeckung und Seitenverkleidung werden über einen URL-Parameter direkt übernommen.
- FAQ, Liefergebiet, Kundenreferenzen und Kontaktbereich reduzieren typische Kaufbarrieren bei einem erklärungsbedürftigen und hochpreisigen Produkt.
- Die Auswahlmöglichkeiten sind bewusst leicht eingeschränkt; beispielsweise kann nicht für jede Seite ein anderes Verkleidungsmaterial gewählt werden. Das hält die Bedienung im MVP übersichtlich.
- Für Anforderungen außerhalb der Standardauswahl gibt es einen eigenen CTA für Sonderwünsche.
- Die Startseite übernimmt zentrale Konfigurator-Patterns, damit Einstieg und Produktseite wie ein zusammenhängender Flow wirken.
- Warenkorb und Checkout bilden vertraute Shop-Schritte ab und machen den vollständigen Conversion-Pfad im Prototyp erlebbar.

Die zentralen Conversion-Ziele sind der Start des Konfigurators, die vollständige Auswahl einer Variante, die Übernahme in den Warenkorb, der Abschluss des simulierten Checkouts und – bei offenen oder individuellen Anforderungen – die Kontaktaufnahme mit der Fachberatung.

## Konzept und Abweichungen

- Der Aufbau des Configurators orientiert sich am zuvor entwickelten Figma-/PNG-Prototypen und an typischen SCS-Shop-Elementen.
- Die wesentliche Informationsarchitektur und der geplante Funktionsumfang konnten umgesetzt werden. Einzelne UI-Details wie stärker hervorgehobene Auswahl-, Hover- und Zustandsdarstellungen wurden während der Implementierung weiterentwickelt, um Interaktionen eindeutiger zu machen.
- `info.html` kam im Projektverlauf als vertiefende Informationsseite hinzu. `index.html` wurde später als fokussierte Carport-Landingpage ergänzt, damit Personen mit konkretem Carport-Interesse einen klareren Funnel erhalten.
- Alle Produkt-, Service-, Zahlungs- und Lieferzonenbilder werden lokal aus `assets/` eingebunden, damit die ZIP-Abgabe ohne externe Bildquellen funktioniert. Externe Links führen lediglich zu weiterführenden SCS- und Social-Media-Seiten.
- Der Prototyp nutzt fiktive, im Code nachvollziehbare Preisregeln.
- Die Vorschau kombiniert ausgeschnittene, deckungsgleiche PNG-Ebenen für Konstruktion, Dach und Seiten.
- Lieferprüfung, Warenkorb, Checkout und Bestellbestätigung werden lokal simuliert.

## Limitierungen

- Kein produktiver Checkout mit Backend-Anbindung.
- Keine echte Zahlung; Zahlungsarten sind nur auswählbare Prototyp-Optionen.
- Kundendaten werden nicht übertragen, sondern nur lokal im Browser für die Demo-Bestätigung gespeichert.
- Kein Backend und keine CMS-Anbindung.
- Keine echte Lagerbestands- oder Lieferzeitprüfung.
- Keine echte serverseitige Preisberechnung.
- Die Liefergebiet-Karte zeigt statisch die vorhandene lokale Lieferzonen-Grafik; die PLZ-Prüfung bleibt eine Dummy-Funktion.

## Future Work

- Produktive Produkt-, Preis-, Verfügbarkeits- und Liefergebiets-APIs anbinden.
- Backend, echte Zahlung, Bestellübertragung und optionales Kundenkonto ergänzen.
- Unterschiedliche Verkleidungsmaterialien pro Carport-Seite ermöglichen.
- Konfigurationen dauerhaft speichern, teilen, exportieren und erneut laden.
- Inhalte und Produktdaten über ein CMS pflegbar machen.
- Automatisierte End-to-End-Tests und eine vollständige Accessibility-Prüfung ergänzen.
- Optional Analytics mit Einwilligungsmanagement und Events für Konfiguratorstart, Preset-Auswahl, Warenkorb und Checkout integrieren.

## Projektteam und Beiträge

Die Aufgaben wurden nach Verantwortungsbereichen aufgeteilt. „Lead“ bezeichnet die federführende Verantwortung, „Input“ eine unterstützende Mitarbeit und „Joint“ eine gemeinsam getragene Umsetzung.

| Bereich | Cornelius Weidmann | Peter Hollmann |
| --- | --- | --- |
| Landingpage und Funnel | Input | Lead |
| Architektur und Technologie-Stack | Input | Lead |
| Visuelle UI-Umsetzung | Lead | Input |
| Testing und Dokumentation | Lead | Input |
| Konfigurator und Checkout | Joint | Joint |
| Figma-Konzept und UI-Begründung | Joint | Joint |

Peter Hollmann übernahm federführend die übergreifende Seitenarchitektur, die Auswahl des Technologieansatzes sowie die Umsetzung der fokussierten Carport-Landingpage und ihres Conversion-Funnels. Cornelius Weidmann verantwortete hauptsächlich die visuelle Überführung des Konzepts in die Website, die Qualitätssicherung und die Projektdokumentation.

Die Konfigurator-Seite und der Checkout-Prozess wurden gemeinsam umgesetzt. Cornelius konzentrierte sich dabei auf die funktionale Entwicklung des Konfigurators, insbesondere auf Auswahl- und Preislogik sowie die PNG-Layer-Vorschau. Peters Schwerpunkt lag auf der Umsetzung der ergänzenden Seitenbereiche sowie des Warenkorb- und Bestellablaufs. Der Figma-Prototyp, die zentralen UI-Entscheidungen und deren UX-Begründung entstanden ebenfalls in gemeinsamer Arbeit.

## AI Use Declaration

Für die Entwicklung dieses Studienprojekts wurden **OpenAI Codex** und **Anthropic Claude** als generative Entwicklungsassistenten eingesetzt. Der Einsatz war umfangreich und umfasste insbesondere Vorschläge für HTML-, CSS- und JavaScript-Strukturen, die Formulierung und Überarbeitung einzelner Texte, die Fehlersuche, Hinweise zur Barrierefreiheit, die Dokumentation sowie die Diskussion möglicher UX- und Architekturentscheidungen. KI-generierte Vorschläge wurden dabei nicht ungeprüft als fertige Lösung übernommen, sondern als Entwürfe, technische Hilfestellung und Grundlage für weitere Überarbeitungen verwendet.

Die für das Projekt maßgeblichen Arbeiten und Entscheidungen wurden von uns selbst durchgeführt. Dazu zählen vor allem die Auswahl und Eingrenzung des Projektthemas, die Analyse des bestehenden SCS-Carport-Konfigurators, die Definition der Anforderungen und des MVP, die Bewertung der Nutzerführung, die Auswahl und Priorisierung der Funktionen, die gestalterische Ausrichtung, die Zusammenstellung der Inhalte und Medien sowie die Entscheidung, welche KI-Vorschläge tatsächlich zum Projekt passen. Auch die Bedienabläufe, Konfigurationsmöglichkeiten, Preset-Varianten und der statische Warenkorb- und Checkout-Prozess wurden von uns inhaltlich beurteilt, angepasst und in den Gesamtkontext des Studienprojekts eingeordnet.

Zu den konkreten KI-Beiträgen gehörten Codeentwürfe für wiederkehrende Seitenstrukturen, Zustands- und Warenkorblogik, responsive CSS-Regeln, Accessibility-Ergänzungen sowie Formulierungsvorschläge für README und Seitentexte. Diese Ergebnisse wurden an den selbst erstellten Figma-Prototyp, die SCS-nahe Gestaltung und den definierten MVP angepasst. Beispielsweise wurden Navigation und Seitenrollen mehrfach korrigiert, Presets an den tatsächlichen Konfigurationszustand angebunden, externe Bildpfade durch lokale Assets ersetzt und widersprüchliche Checkout-Texte überarbeitet. Vorschläge, die unnötige Komplexität erzeugt oder nicht zum statischen Projektumfang gepasst hätten, wurden nicht übernommen.

Die KI hat keine eigenständigen Projektentscheidungen getroffen und war nicht für die finale Qualitätskontrolle verantwortlich. Generierter oder vorgeschlagener Code wurde von uns im Projektkontext geprüft, ausgeführt und bei Bedarf verändert. Dazu gehörten unter anderem Kontrollen der Navigation, lokaler Dateipfade, responsiver Darstellung, Preis- und Auswahlzustände, JavaScript-Syntax sowie des Zusammenspiels zwischen Konfigurator, Warenkorb und Checkout. Technische und inhaltliche Fehler in KI-Ausgaben mussten teilweise manuell erkannt und korrigiert werden. Verantwortung für Auswahl, Integration und Funktionsfähigkeit aller übernommenen Ergebnisse lag beim Projektteam.

Verwendete Produktbilder, Logos und Markenbezüge stammen aus den öffentlich verfügbaren SCS-Materialien und wurden für den lokalen Studienprototyp bearbeitet und eingeordnet. Ebenso stellen Preisberechnung, Lieferprüfung, Kundenbewertungen, Bestellung und Zahlung ausschließlich Bestandteile eines nicht produktiven Prototyps dar.

Zusammengefasst war KI ein deutlich genutztes Entwicklungs- und Reflexionswerkzeug, das die Umsetzung beschleunigt und bei technischen sowie textlichen Aufgaben unterstützt hat. Konzeption, Auswahl, Bewertung, Anpassung und Verantwortung für das abgegebene Ergebnis lagen jedoch bei uns als Projektverfassenden.
