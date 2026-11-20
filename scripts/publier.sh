#!/usr/bin/env bash
# Publication sur Vercel (20/11/2026) : seule la branche « publication » déploie (vercel.json). Pousse HEAD (branche de
# travail à jour, commit final déjà poussé) sur « publication », UNE fois, et seulement si dist/ a changé depuis la dernière
# publication (jamais de publication vide ni double). Refus : récupère « publication », fusionne, réessaie (3 fois au plus).
# Usage : scripts/publier.sh "<motif, ex. correction de pizzeria-doria>"
ROOT="$(git rev-parse --show-toplevel)"; cd "$ROOT" || exit 1
motif="${1:-publication}"; B=publication
for essai in 1 2 3; do
  git fetch -q origin "$B" || { echo "publier : fetch de $B impossible"; exit 1; }
  if git diff --quiet "origin/$B" HEAD -- dist vercel.json; then
    echo "publier : rien à publier (dist/ identique à origin/$B) — aucune publication"; exit 0
  fi
  if git push -q origin "HEAD:$B" 2>/dev/null; then
    echo "publier : $motif → $B $(git rev-parse --short HEAD) (essai $essai)"; exit 0
  fi
  echo "publier : push refusé (essai $essai), fusion de origin/$B"
  git merge -q --no-edit -m "Fusionne $B avant publication ($motif)" "origin/$B" || { git merge --abort; echo "publier : conflit de fusion, abandon"; exit 1; }
done
echo "publier : échec après 3 essais"; exit 1
