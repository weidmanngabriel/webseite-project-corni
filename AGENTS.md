# Projektanweisungen für Agents

Diese Datei hält projektspezifische Arbeitsregeln sowie den aktuellen Projektstand fest. Sie gilt für das gesamte Repository.

## Arbeitsregeln

- Es sind keine Playwright-Screenshots notwendig.
- Wenn sich Anforderungen, der Projektumfang oder architektonische Entscheidungen ändern, muss der Abschnitt „Projektstand“ entsprechend ergänzt oder angepasst werden.
- Änderungen sollen einfach verständlich und wartbar bleiben.
- Neue Abstraktionen, Frameworks oder Build-Schritte sollen nur eingeführt werden, wenn sie wirklich notwendig sind.

## Projektstand

### High-Level Requirements

- Das Projekt stellt eine einfache statische Webseite bereit.
- Die Startseite liegt in `index.html` im Repository-Root.
- Die Webseite soll ohne Build-Schritt direkt auslieferbar sein.
- Die Seite dient aktuell vor allem dazu, die Deployment-Pipeline sichtbar zu prüfen.

### Architektonische Entscheidungen

- Es wird bewusst eine einzelne statische HTML-Datei verwendet.
- CSS ist aktuell direkt in `index.html` eingebettet, damit der Projektstand minimal und leicht nachvollziehbar bleibt.
- Es gibt derzeit keine JavaScript-Abhängigkeiten, kein Frontend-Framework und keinen Paketmanager-Workflow.
- Zusätzliche Dateien oder Tools sollen erst ergänzt werden, wenn ein konkreter Bedarf besteht.
