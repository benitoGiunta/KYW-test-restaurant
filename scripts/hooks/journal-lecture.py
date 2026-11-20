#!/usr/bin/env python3
"""Hook PostToolUse (Read) — correction, approche 5 : journalise chaque planche de capture lue.
Une lecture de `.shots-a4-<slug>-<variante>/<page>/planche.png` ajoute `<page>` à `.logs/lectures-<slug>-<variante>`.
`scripts/marqueur.sh` refuse ensuite de passer à la correction tant que toutes les pages cibles n'ont pas été lues :
la couverture n'est plus déclarée par l'agent, elle est constatée. Ne bloque jamais rien (code 0)."""
import json, os, re, sys
try:
    entree = json.load(sys.stdin)
except Exception:
    sys.exit(0)
chemin = (entree.get("tool_input") or {}).get("file_path", "") or ""
m = re.search(r"(.*/)?\.shots-a4-([a-z0-9-]+?)-(portfolio|awwwards|legacy)/([^/]+)/planche\.png$", chemin)
if m:
    racine = os.environ.get("CLAUDE_PROJECT_DIR") or (m.group(1) or ".")
    logs = os.path.join(racine, ".logs"); os.makedirs(logs, exist_ok=True)
    with open(os.path.join(logs, f"lectures-{m.group(2)}-{m.group(3)}"), "a") as f:
        f.write(m.group(4) + "\n")
sys.exit(0)
