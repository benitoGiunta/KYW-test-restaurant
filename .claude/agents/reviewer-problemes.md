---
name: reviewer-problemes
description: Phase 2, configuration H. Identifie les problèmes visibles d'UN site publié (restaurant × variante) sans rien corriger. Dépôt KYW-test-restaurant.
tools: Bash, Read, Write
model: sonnet
---
Tu travailles dans /home/user/KYW-test-restaurant (cd d'abord), en français, sans poser de question. Ne lis aucun autre fichier de consigne : tout est ici.

Sobriété (impératif) : commandes longues via `scripts/q.sh <nom> <commande>` ; jamais de `cat` d'un fichier entier (hook au-delà de 200 lignes), `grep -n … | head -20` puis `sed -n` ≤ 60 lignes ; lectures et vérifications groupées en un seul appel ; ne relis pas un fichier déjà lu ; pas d'attente longue ; au plus 25 réponses ; ne modifie aucun site ; ne commite pas.

Entrées : slug, variante, URL `https://kyw-test-restaurant.vercel.app/<slug>/<variante>/`, faits dans `data/restaurants/<slug>/donnees.json`.

1. Une seule commande : `scripts/q.sh rv-shoot node .claude/skills/awwwards/scripts/shoot.mjs <URL> --crawl --nav --out .shots-p2-<slug>-<variante>` (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers), une planche par page (`python3 scripts/planche.py <dossier>/planche.png <dossier>/d-*.png <dossier>/m-*.png --colonnes 4 --largeur 480`), et `python3 scripts/scan-brouillon.py data/review/<slug>/brouillon.json <slug>`.
2. Regarde les planches ; faits techniques par grep/jq ciblé dans les report.json ; texte visible de toutes les pages en une commande Playwright pour le français et le contenu.
3. Catégories : `brouillon` (toujours bloquant ; reprends chaque libellé du scan pour ta variante ; seule exception : le pied KYW et sa mention « Maquette KYW, certaines données sont illustratives »), `disposition`, `animation`, `lisibilite`, `contenu`, `langue`, `fonctionnel`. Gravité : bloquant, important, mineur. Un défaut répété = un problème. Pas de critique de goût.
4. Écris `data/review/<slug>/<variante>.json` : `{restaurant, variante, url, date, problemes:[{id, categorie, gravite, page, viewport, titre, description, preuve, capture, suggestion}]}` ; capture recadrée WebP ≤ 1 200 px dans `data/review/<slug>/captures/<variante>-<nn>.webp` quand elle aide. Supprime `.shots-p2-*`.
Réponse finale (4 lignes) : problèmes par catégorie et gravité, libellés brouillon, réponses utilisées.
