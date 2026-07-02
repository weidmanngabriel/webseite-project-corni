#!/usr/bin/env bash

set -euo pipefail

SOURCE_DIR=".staticrypt-source"
OUTPUT_DIR="protected"

if [[ -z "${STATICRYPT_PASSWORD:-}" ]]; then
  echo "STATICRYPT_PASSWORD ist nicht gesetzt." >&2
  exit 1
fi

# Nur auslieferungsrelevante Dateien kommen in das Deployment-Artefakt.
rm -rf "$SOURCE_DIR" "$OUTPUT_DIR"
mkdir -p "$SOURCE_DIR"
cp ./*.html "$SOURCE_DIR"/
cp -R assets css js "$SOURCE_DIR"/
find "$SOURCE_DIR" -name '.DS_Store' -delete

# Ein fester, nicht geheimer Salt ermöglicht dieselbe Anmeldung auf allen Seiten.
npx --no-install staticrypt "$SOURCE_DIR"/* \
  --recursive \
  --directory "$OUTPUT_DIR" \
  --config false \
  --salt 7363732d636172706f72742d32303236 \
  --short \
  --remember 1 \
  --template-title "SCS Carport Studienprojekt" \
  --template-instructions "Bitte geben Sie das Passwort ein, um die Website zu öffnen." \
  --template-placeholder "Passwort" \
  --template-button "Website öffnen" \
  --template-error "Das Passwort ist nicht korrekt." \
  --template-remember "Für einen Tag angemeldet bleiben" \
  --template-color-primary "#ffdd00" \
  --template-color-secondary "#f1f1f1"

touch "$OUTPUT_DIR/.nojekyll"
echo "Geschütztes Deployment wurde in $OUTPUT_DIR/ erzeugt."
