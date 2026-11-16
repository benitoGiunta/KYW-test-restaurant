#!/usr/bin/env bash
# Marqueur de passage identifier -> rectifier (approche 4). À lancer AVANT toute modification de sites/ :
#   scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>
# Affiche le marqueur (compté par usage-phases.py) et crée .logs/marqueur-<slug>-<variante>, sans lequel le hook
# refuse Edit, Write et sed -i sur sites/<slug>-<variante>/.
ROOT="$(git rev-parse --show-toplevel)"; mkdir -p "$ROOT/.logs"
[ "$1" = "MARQUEUR-RECTIFICATION" ] && [ -n "${2:-}" ] && [ -n "${3:-}" ] || { echo "usage : scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>"; exit 1; }
touch "$ROOT/.logs/marqueur-$2-$3"; echo "MARQUEUR-RECTIFICATION $2/$3"
