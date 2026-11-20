#!/usr/bin/env bash
# Marqueur de passage identifier -> rectifier (approches 4 et 5). À lancer AVANT toute modification de sites/ :
#   scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>
# Approche 5 : refuse (code 1) tant que la planche de chaque page cible capturée n'a pas été lue avec l'outil Read
# (journal .logs/lectures-<slug>-<variante>, tenu par scripts/hooks/journal-lecture.py ; pages cibles :
# data/review/<slug>/couverture-<variante>.json). Sinon affiche le marqueur (compté par usage-phases.py) et crée
# .logs/marqueur-<slug>-<variante>, sans lequel les hooks refusent Edit, Write et sed -i sur sites/<slug>-<variante>/.
ROOT="$(git rev-parse --show-toplevel)"; mkdir -p "$ROOT/.logs"
[ "$1" = "MARQUEUR-RECTIFICATION" ] && [ -n "${2:-}" ] && [ -n "${3:-}" ] || { echo "usage : scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>"; exit 1; }
slug="$2"; v="$3"; cov="$ROOT/data/review/$slug/couverture-$v.json"
if [ -f "$cov" ]; then
  manque=$(python3 - "$cov" "$ROOT/.logs/lectures-$slug-$v" "$ROOT/.shots-a4-$slug-$v" <<'PY'
import json, os, sys
cov, journal, shots = sys.argv[1:]
cibles = [p for p in json.load(open(cov)).get("pages_cibles", []) if os.path.exists(os.path.join(shots, p, "planche.png"))]
lues = set(open(journal).read().split()) if os.path.exists(journal) else set()
print(" ".join(p for p in cibles if p not in lues))
PY
)
  if [ -n "$manque" ]; then
    echo "Marqueur refusé : planches non lues pour $slug/$v : $manque"
    echo "Lis chacune avec l'outil Read (.shots-a4-$slug-$v/<page>/planche.png), relève ses problèmes, puis relance le marqueur."
    exit 1
  fi
fi
touch "$ROOT/.logs/marqueur-$slug-$v"; echo "MARQUEUR-RECTIFICATION $slug/$v"
