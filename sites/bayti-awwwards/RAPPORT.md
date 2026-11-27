# Bayti : variante awwwards
**Concept** : « Rue du Pont », un fil qui longe la rue du n° 6 (comptoir, le jour) au n° 15 (restaurant, le soir), fond qui glisse du jour à la nuit. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL : le concept est typographique et photographique). Base `/bayti/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/bayti-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4471`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session, et QA-build.md (agent captures) absent. Aucune note jury produite, pas d'auto-notation. Preuves mesurées ci-dessous.

## Mesures (passe finale, accueil, `.shots/accueil2/report.json`)
LCP mobile 2020 ms, CLS 0,02, loaderMs null, settledMs 2450, FPS desktop 60 (mobile 60, pire image 33 ms), axe sérieux 0 (13 contrastNeedsReview non relus à l'œil), overflow aucun, noHoverChange vide, colorOnly vide, idleMotion true, reduced.hiddenText 0, console et requêtes échouées vides. Audit : 0 FAIL, 2 WARN (voir ci-dessous). Poids : page la plus lourde ~1,8 Mo, JS 60 Ko gz.

## Corrections de la passe
- Axe sérieux `scrollable-region-focusable` : `.strip` (rangée de plats) reçoit `tabindex="0"`.
- `noHoverChange` : logo « Bayti » reçoit un décalage au survol.
- `colorOnly` : « Voir sur le plan » ajoute un décalage de soulignement.
Vérifié par un nouveau shoot de l'accueil.

## Points non résolus
- [couverture] Seul l'accueil a été re-shooté ; carte, histoire et réservation n'ont qu'un audit (0 FAIL), sans capture ni mesure de vitals. Une QA complète par l'agent captures reste à faire.
- [a11y] 13 `contrastNeedsReview` (glissement de ton, `#fil`) non relus à l'œil.
- [audit] WARN « sentence repeated » sur la réservation : horaires identiques à ceux du pied, justifié. WARN « no sitemap » : faux positif sous base (sitemap-index.xml présent).
- [jury] Pas de critique neuf : scores inconnus.
- [checklist] Cases 9 et 15 de la phase 1 non prouvées.

## Placeholders et hypothèses
Aucun complément fictif (`site.ts` : aucun fondateur, année, avis ni plat inventé ; un seul extrait réel d'avis Google). Pas de prix par plat dans les données ; menu du soir 45 € pour 8 services. Hypothèse : port 4400 occupé par un autre agent, QA sur 4471.

## Décisions de théâtre
Pas de loader, pas de GL, repos par pavés du fil (8 px/s). Accessoire retiré : non fait (pas de passe critique).

## Leçons structurelles
Voir data/usage/test-3/lecons-proposees/bayti.md.
