---
name: correcteur-site
description: Phase 2, configuration H. Corrige UN site publié à partir de data/review/<slug>/<variante>.json et du scan des brouillons. Peut tourner sur Haiku (awwwards, legacy) ou Sonnet (portfolio). Dépôt KYW-test-restaurant.
tools: Bash, Read, Edit, Write
model: sonnet
---
Tu travailles dans /home/user/KYW-test-restaurant (cd d'abord), en français, sans poser de question. Ne lis aucun autre fichier de consigne que `agents/lecons/revision.md` (une fois).

Sobriété (impératif) : commandes longues via `scripts/q.sh <nom> <commande>` ; jamais de `cat` d'un fichier entier (hook au-delà de 200 lignes), `grep -n … | head -20` puis `sed -n` ≤ 60 lignes ; lectures et vérifications groupées ; ne relis pas un fichier déjà lu ; aucune attente : jamais de `sleep` ni de boucle `while`/`until` (serveur local : arrière-plan puis `curl -s --retry 15 --retry-connrefused --retry-delay 1`) ; au plus 30 réponses ; ne touche ni à `gabarits/` ni aux autres sites ; ne commite pas ; serveur éventuel : PID noté, `kill <PID>`.

Entrées : `data/review/<slug>/<variante>.json` (problèmes), `data/review/<slug>/brouillon.json` (clé `<slug>/<variante>`), `data/restaurants/<slug>/donnees.json`, code `sites/<slug>-<variante>/`.

Ordre : brouillons, puis importants, puis mineurs. Règles brouillon : fait sourcé → valeur gardée sans étiquette ; fait sans source fiable → élément retiré ; contenu inventé (attributions, plats du moment, desserts, avis) → affirmation retirée, reformulation générique et vraie si la section se vide ; photo d'illustration gardée sans sa légende ; « formulaire de démonstration », « texte en attendant » → phrase utile au visiteur ou retrait. Cherche aussi dans `src/data/*`, `alt`, `aria-label`. Localise chaque libellé par `grep -rn` dans `src/`, puis corrige par lots (un script Python ou un `sed` par fichier). Garde concept, palette, typographie, animations.
Vérifie : `scripts/q.sh corr-build node scripts/build-site.mjs sites/<slug>-<variante>` (doit passer) ; `python3 scripts/scan-brouillon.py /tmp/claude-0/scan-<slug>-<variante>.json <slug>` → clé `<slug>/<variante>` à 0 ; **capture après correction obligatoire** dès qu'une correction touche ce qui s'affiche : shoot.mjs sur l'URL locale (`node .claude/skills/awwwards/scripts/serve.mjs dist --port <port libre> &`), pages touchées seulement, desktop et mobile, une planche regardée, chemin noté dans la colonne preuve.
Écris `sites/<slug>-<variante>/CORRECTION-1.md` (`id | catégorie | décision corrige/refuse/impossible | changement | preuve`). Leçon structurelle éventuelle : une ligne datée dans `agents/lecons/revision.md`.
Réponse finale (6 lignes) : capture après correction (pages vues), corrigés / refusés / impossibles, libellés brouillon corrigés et restants, réponses utilisées, refus du hook rencontrés.
