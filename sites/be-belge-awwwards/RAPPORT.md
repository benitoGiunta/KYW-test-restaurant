# Be Belge… et d'ailleurs : variante awwwards
**Concept** : « les trois points » du nom deviennent un motif vivant (titres, hero, pied, filets de la carte). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL dans le concept). Base `/be-belge/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/be-belge-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury
Non réalisés : aucun outil Agent disponible dans cette passe de test, pas de critique neuf, donc pas de score ni d'estimation jury. Aucune auto-notation inventée.
## Mesures (passe finale, captures ciblées home et 404 + audit complet)
- Audit : 0 FAIL, 10 WARN (12 avant correction). Titre accueil raccourci (« Cuisine belge à Wépion | Be Belge… et d’ailleurs »), meta description de l'histoire ramenée sous 160.
- Console 0, requêtes en échec 0 (home, 404). CLS mobile 0, LCP mobile home 1372 ms (img). Poids page la plus lourde ~942 Ko, JS 61 Ko gz, aucune police ttf/otf.
- Axe : home corrigé (`.strip` focusable, `tabindex="0"` + `aria-label`) ; 404 : 0 violation (le contraste signalé du pied KYW était un état transitoire d'apparition).
- Petites cibles : liens `.lt` passés en inline-block avec padding vertical, `smallTargets` vide sur home et 404.
- Reduced : 0 texte caché. Clavier : pas de focus invisible ni bloqué.
## Points non résolus
- [clavier] `skipLinkFirst` = false : faux positif du script (il teste le texte du premier arrêt contre /skip|#main/, or le premier arrêt est bien « Aller au contenu », lien vers `#main`). Vérifié par `keyboard.stops[0]`.
- [contenu] « sentence repeated » horaires (accueil, réservation) : données réelles affichées dans la section et dans le pied, volontaire.
- [audit] « no robots.txt / no sitemap » : artefact de la racine de QA ; meta noindex partout (grep vide) et `sitemap-index.xml` présent dans la sortie.
- [non fait] Passes de critique jury : non lancées. Planches de l'agent captures non relues en totalité (budget de sobriété).
- [non fait] Relecture visuelle de `/carte/` et `/reservation/` après la correction `.lt` (padding vertical ; aucun débordement mesuré sur la home).
## Placeholders et hypothèses
Aucun fictif (données réelles de donnees.json, photos du restaurant). Hypothèse : horaires et tarifs des menus tels que dans le dossier.
## Décisions de théâtre
Pas de loader, pas de GL, pas de curseur suiveur (Concept Card). Accessoire retiré : non fait (pas de passe jury).
## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/be-belge.md.
