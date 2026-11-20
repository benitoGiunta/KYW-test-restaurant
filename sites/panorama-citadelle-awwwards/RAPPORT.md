# Le Panorama : variante awwwards
**Concept** : « Le tour d'horizon », une règle d'heures de 8 h à 23 h et un soleil qui suit le défilement. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de GL). Base `/panorama-citadelle/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/panorama-citadelle-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : aucun outil Agent en session d'agent et budget de réponses limité. Self-score, non indépendant : aucune note chiffrée. Une seule passe de QA sur preuves (captures de l'agent captures, puis ciblées) ; critères 61 à 63 non prouvés.

## Mesures (passe finale, captures ciblées accueil et 404)
- Accueil : LCP mobile 2244 ms (img), CLS 0, 0 erreur console, 0 requête échouée, overflowX non (desktop et mobile), axe 0 violation, `smallTargets` vide (desktop et mobile).
- 404 : axe 0 violation (le 4,36:1 du pied KYW vu à la capture build n'a pas été reproduit), `smallTargets` vide.
- audit.mjs : 0 FAIL, 2 WARN. JS 61 Ko gz, page la plus lourde 1937 Ko, polices 74 Ko.
- Non revérifiés après correction : carte (même correctif CSS), `idleMotion`, `settledMs`, FPS, `noHoverChange` (shoot avec `--hovers 0`).

## Corrections
- `.lien` : `display: inline-block; padding-block: .25rem; min-height: 24px` (cibles tactiles de 18 à 21 px sur accueil, carte, réservation, pied).

## Points non résolus
- [jury] aucun critique indépendant, scores absents ; à relancer avec un outil Agent.
- [audit] WARN « phrase répétée » : « Réserver une table / Appeler le 081 84 11 34 » en hero et en fin de page, voulu (CTA répété). WARN « no sitemap » : `sitemap-index.xml` est produit par le build, l'audit cherche `sitemap.xml`.
- [clavier] `skipLinkFirst: false` : faux positif connu, `keyboard.stops[0]` non relu.
- [contraste] `contrastNeedsReview` (32 accueil, 23 carte) non relus à l'œil.
- [ship] image OG depuis le hero et « retirer un accessoire » non faits.

## Placeholders et hypothèses
Aucun `placeholder: true`. Horaires 8 h à 23 h marqués « à confirmer » dans le pied ; autres données douteuses ci-dessous.

## Décisions de théâtre
Pas de loader, pas de GL, pas de menu hamburger, pas de curseur suiveur ; repos : soleil et étiquette seuls. Accessoire retiré : non fait.

## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/panorama-citadelle.md.

## Notes de la phase 1 (conservées)
- Données réelles : nom, adresse, téléphone, 44 plats et prix (PDF carte d'automne 2026), 4 formules de petit-déjeuner, menu des fêtes, chef, gérants, formateur tarte flambée, bière Pano, réseaux.
- Aucun contenu fictif, avis, note, distinction ni logo de presse.
- Données douteuses non corrigées : horaires (8 h à 23 h à l'accueil, brasserie 11 h à 23 h à la page contact), date d'ouverture 2022 (mai ou juin), identité du portrait 18 (non nommée). Pas de desserts ni de carte des vins au dossier.
- Prix « Prix du jour » (sole) tel quel ; homard 39 / 75 euros. « 400 places annoncées » et « 120 places » viennent de la RTBF (dossier.md).
- Photos : 16 sur 20, crédit « photos : Le Panorama ». Réservation : tel:, mailto groupes, lien externe du client ; pas de fetch.
