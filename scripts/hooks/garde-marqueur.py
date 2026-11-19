#!/usr/bin/env python3
"""Hook PreToolUse (Edit|Write) — correction (approche 4) : pendant la correction d'un site (fichier
.logs/identification-<slug>-<variante>, créé par scripts/captures-pages.sh), refuse toute modification de
sites/<slug>-<variante>/ tant que .logs/marqueur-<slug>-<variante> n'existe pas (créé par scripts/marqueur.sh à la fin de
l'identification). Hors correction (développement d'un site), ne bloque rien."""
import json, os, re, sys
try:
    chemin = json.load(sys.stdin).get("tool_input", {}).get("file_path", "") or ""
except Exception:
    sys.exit(0)
r = re.search(r"(.*/)?sites/([a-z0-9-]+)-(portfolio|awwwards|legacy)/", chemin)
if not r:
    sys.exit(0)
racine = os.environ.get("CLAUDE_PROJECT_DIR") or (r.group(1) or "./")
logs = os.path.join(racine, ".logs")
if os.path.exists(os.path.join(logs, f"identification-{r.group(2)}-{r.group(3)}")) and not os.path.exists(os.path.join(logs, f"marqueur-{r.group(2)}-{r.group(3)}")):
    sys.stderr.write(f"Modification refusée : lance d'abord `scripts/marqueur.sh MARQUEUR-RECTIFICATION {r.group(2)} {r.group(3)}` "
                     "(fin de l'identification), puis corrige.\n")
    sys.exit(2)
sys.exit(0)
