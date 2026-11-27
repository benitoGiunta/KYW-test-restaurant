# Novobel : variante awwwards (QA, phase 3)
**Concept** : « La cote », une entreprise de rénovation namuroise présentée comme un plan coté (lignes de cote, mètre ruban, chiffres qui se mesurent). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucune scène réelle à rendre). Base `/novobel/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/novobel-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
Note : Novobel n'est pas un restaurant (construction et rénovation) ; pages `/projets/` et `/contact/` à la place de carte et réservation.

## Scores du critique jury
Non réalisé : pas d'outil Agent en session d'agent et budget de réponses restreint ; aucun score inventé. À lancer : `/jury` sur le site avec un critique neuf.

## Mesures (passe finale, captures ciblées)
- Audit : 0 FAIL, 1 WARN (« no sitemap » : faux positif sous `base`, `sitemap-index.xml` présent).
- Accueil : LCP mobile 1116 ms, CLS 0, settledMs 2565, scroll 60 fps desktop et mobile bridé, idleMotion true (mètre ruban), loader aucun, 0 erreur console, 0 requête en échec, pas de débordement, reduced.hiddenText 0, noHoverChange vide, colorOnly vide, covered vide, smallTargets vide.
- À propos : LCP mobile 1048, CLS 0,005 ; Contact : LCP 1148, CLS 0 ; Projets : 0 erreur, 0 débordement, smallTargets vide. Axe : 0 violation sérieuse sur les 4 pages.
- Poids : page la plus lourde ~442 Ko, JS 60 Ko gz, CSS 6 Ko gz, polices woff2 48 Ko, image max sous 500 Ko.

## Corrections de cette passe
- Cibles tactiles trop petites (liens en ligne 16 à 20 px, pied de page) : `min-height: 24px` en `inline-flex` ; vérifié, `smallTargets` vide à l'accueil et sur projets.
- « Image d'illustration, non liée à ce projet » répétée 4 fois : légende retirée des fiches, mention unique dans le chapo de `/projets/` (WARN « phrase répétée » supprimé).
- `og.png` recomposée (Barlow Condensed, nom + « Construction et rénovation Namur » + photo du chantier) : l'ancienne avait des glyphes manquants (é, tiret) et une police par défaut.

## Points non résolus
- [Jury] aucun critique neuf : score à obtenir.
- [A11y] `contrastNeedsReview` (32 accueil, 15 projets, 16 à propos) non relus un à un ; texte gris sur fond clair et texte clair sur anthracite à contrôler à l'œil.
- [Captures] page 404 vue via `serve.mjs` (réponse brute) : faux positif connu ; `404.html` non recapturée.
- [Hover] pas de capture h-NN refaite après la correction des cibles (layout inchangé, 0 débordement).

## Placeholders et hypothèses (à remplacer par le client)
- `lots[].texte` (5 phrases génériques, `placeholder: true` dans `site.ts`) ; accroches écrites pour la maquette.
- Photos : images du site actuel, légendées « Image d'illustration », non liées aux projets nommés ; à remplacer par les vraies photos de chantier.
- Horaires, effectifs, zone d'intervention, avis : inconnus, non affichés. « 25 ans d'activité » non repris (BCE : début 2019).

## Décisions de théâtre
Pas de loader, pas de GL, repos = mètre ruban. Accessoire retiré : aucun effet décoratif à couper (pas de suiveur de curseur, pas d'épinglage).

## Leçons structurelles
Voir data/usage/test-3/lecons-proposees/novobel.md.
