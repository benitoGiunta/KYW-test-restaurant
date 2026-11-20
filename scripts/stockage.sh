#!/usr/bin/env bash
# Contrôle du stockage Vercel (20/11/2026, saturation des 10 Go gratuits) : chaque déploiement conservé garde une copie
# complète de dist/. Mesure dist/ et estime le stockage occupé par les déploiements conservés, comparé au budget.
# Usage : scripts/stockage.sh [budget_go=5] [seuil_pct=70] [deploiements_conserves]
#   deploiements_conserves : nombre de déploiements à l'état READY sur Vercel (list_deployments) ; absent = « non vérifié ».
# Sortie : une ligne par mesure ; code 2 si l'estimation dépasse le seuil d'alerte (ne rien lancer, prévenir le porteur).
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"; cd "$ROOT" || exit 1
budget_go="${1:-5}"; seuil="${2:-70}"; dep="${3:-}"
octets=$(du -sb dist 2>/dev/null | cut -f1); fichiers=$(find dist -type f 2>/dev/null | wc -l)
mo=$(( octets / 1048576 )); budget_mo=$(( budget_go * 1024 ))
echo "dist : ${mo} Mo, ${fichiers} fichiers (une publication = une copie de dist/)"
echo "budget : ${budget_go} Go, seuil d'alerte ${seuil} % ($(( budget_mo * seuil / 100 )) Mo)"
if [ -z "$dep" ]; then
  echo "déploiements conservés : non vérifié ; estimation pour 1 copie : $(( mo * 100 / budget_mo )) % du budget"
  echo "publications possibles avant le seuil : $(( budget_mo * seuil / 100 / (mo > 0 ? mo : 1) ))"
  exit 0
fi
est=$(( dep * mo )); pct=$(( est * 100 / budget_mo ))
echo "déploiements conservés : ${dep} → environ ${est} Mo, ${pct} % du budget"
echo "publications encore possibles avant le seuil : $(( (budget_mo * seuil / 100 - est) / (mo > 0 ? mo : 1) ))"
if [ "$pct" -ge "$seuil" ]; then echo "ALERTE : seuil de stockage atteint, ne rien publier ni lancer, prévenir le porteur"; exit 2; fi
