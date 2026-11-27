# Bienvenue chez vous : variante awwwards (QA phase 3, test)
**Concept** : « Escales », fil rouge et assiettes rondes sur fond sombre. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL). Base `/bienvenue-chez-vous/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/bienvenue-chez-vous-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent, budget de réponses limité, passe QA seule. Aucun score déclaré (self-score non fait).

## QA (preuves : QA-build.md de l'agent captures, shoots ciblés .shots/p3-home et p3-404)
- Audit : 0 FAIL, 0 erreur console, 0 requête échouée, 0 débordement, 0 texte caché, 0 violation axe sur home et carte.
- Corrigé : cibles tactiles < 24 px (8 desktop et 8 mobile sur home et carte) : `.lien` en inline-block, min-height 24 px ; shoot home : smallTargets vide desktop et mobile.
- Corrigé : meta description d'/histoire/ 172 -> 157 caractères.
- 404 : la violation axe venait de la réponse brute de serve.mjs ; 404.html directe : 0 violation, 0 cible.
- Mesures (agent captures) : LCP mobile home 1096 ms, carte 2408 ms ; CLS <= 0,01 ; pas de loader ; poids home ~1046 Ko.

## Points non résolus
- [a11y] `contrastNeedsReview` 28 (home) et 40 (carte) non revus à l'œil un par un ; planche home lue, texte lisible.
- [audit] WARN « phrase répétée 5 fois » sur /reservation/ : tableau d'horaires identiques du mardi au samedi, donnée réelle, justifié.
- [audit] WARN robots.txt/sitemap : faux positifs sous base (sitemap-index.xml présent, robots dans le dépôt).
- [couverture] histoire et reservation non capturées par l'agent captures ; pas de jury, OG non recomposée, `idleMotion`/hover non relus.
- [clavier] `skipLinkFirst` false = faux positif connu (non vérifié sur keyboard.stops[0]).

## Placeholders et hypothèses (à remplacer par le client)
Phrases d'ambiance de l'Histoire (« ouvre lui-même les bouteilles », « Sonnez, puis montez »), « le chef répond entre deux services », « Dernières arrivées au début de chaque service », descriptions des deux boxes, Box Tapas 199 € et Box 109 € (à confirmer), tarif du mercredi (« communiqué à la réservation »), téléphone, horaires, e-mail (sources tierces).

## Décisions de théâtre
Ni loader ni GL ; repos : assiette du hero qui tourne. Accessoire retiré : non fait.

## Leçons structurelles
Voir data/usage/test-3/lecons-proposees/bienvenue-chez-vous.md.
