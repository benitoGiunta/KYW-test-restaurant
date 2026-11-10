# Le Félicien : variante awwwards
**Concept** : « L'échelle », la carte posée sur une règle de 0 à 40 € que le visiteur règle à son budget. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL : le concept est une règle, pas une scène). Base `/le-felicien/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-felicien-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session d'agent, et la passe était limitée à la QA et aux corrections. Aucun score inventé. `/jury <url>` avec un critique neuf reste à faire.

## Mesures (passe finale, serveur de QA sur dist/)
- Audit : 0 FAIL, 1 WARN (« no sitemap » sous base, faux positif connu ; sitemap-index.xml présent dans dist). Les 8 WARN de phrases répétées (horaires) sont corrigés.
- Console 0, requêtes en échec 0, overflowX non (desktop et mobile), reduced.hiddenText 0, moving false, axe 0 violation (contrastNeedsReview 7 à 11 à relire à l'œil).
- LCP mobile 1132 à 1180 ms (texte), CLS 0, idleMotion true, settledMs 2504, FPS 60/60 (plancher headless).
- JS 64 Ko gz, page la plus lourde ~293 Ko, polices 80 Ko, images 138 Ko.
- Réservation (jamais photographiée jusque-là) : noHoverChange vide, focus clavier visible, pas de piège.
- 404 réelle (`404.html`) : lang fr, titre, h1 présents ; les 2 violations axe du QA-build venaient de la réponse brute de serve.mjs (faux positif connu).

## Corrections de cette passe
1. Horaires affichés deux fois par page (section + pied) : le pied renvoie à la page sur l'accueil et la réservation (`Footer.astro`). Vérifié : audit sans répétition.
2. Lien du logo sans changement au survol : décalage de 3 px par crans au survol, focus et appui (`site.css`). Vérifié : noHoverChange vide sur accueil et réservation.
3. Curseur de budget : contour de focus posé aussi sur l'`input`. Capture ciblée : contour net autour de la règle.

## Points non résolus
- [a11y] home `report.json` : `keyboard.invisibleFocus` signale encore l'`input` range, car il est à opacité 0 (le curseur est dessiné par la règle). Faux positif : le contour de focus est visible (capture `.shots/focus-budget.png`).
- [qualité] Score jury indépendant et passe « retirer un accessoire » non faits. Accessoire candidat : le décalage du logo.
- [test] Glisser au doigt sur le curseur de budget non testé sur appareil réel.

## Placeholders et hypothèses (à remplacer par le client)
Aucun complément fictif (`placeholder: false`). Photo d'archive de 2020 et illustration de la carte fournies par le restaurant. L'état d'ouverture ignore les veilles de jours fériés.

## Décisions de théâtre
Pas de loader, pas de GL, repos = trait de lecture sur la règle (18 s pour 0 à 40 €).

## Leçons structurelles
Voir agents/lecons/construction.md (horaires dupliqués pied/page).
