# Carré d'herbes : variante awwwards
**Concept** : « Compter les assiettes » : le carré du nom, des ronds d'assiettes posés au défilement, la carte lue en assiettes.
**Stack** : Astro 5 + GSAP + Lenis (OGL non : aucun WebGL, le concept tient en CSS et GSAP). Base `/carre-d-herbes/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/carre-d-herbes-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury
Non réalisés : pas d'outil Agent ni passe jury dans cette passe de test (QA sur preuves mesurées uniquement). Aucun score annoncé ; `/jury <url>` re-note avec un critique neuf.
## Mesures (passe finale)
- Console 0 erreur, 0 requête échouée, aucun débordement horizontal, axe serious 0 (sauf 404 : points non résolus).
- LCP mobile 1508 ms (accueil, img.rond), 1060 ms (réservation), 1132 ms (histoire) ; CLS mobile accueil 0,011, histoire 0,041, carte 0,055 (non remesuré). Pas de loader. FPS mobile 60.
- smallTargets accueil après correction : 0 desktop et mobile (avant 7 et 8). noHoverChange accueil : vide (logo corrigé).
- idleMotion : vrai sur l'accueil, faux sur histoire (page éditoriale, immobile au repos, voulu).
- Audit : 0 FAIL, 1 WARN « no sitemap » (faux positif sous base : sitemap-index.xml présent dans dist). Page la plus lourde ~1826 Ko, JS 60 Ko gz, aucune police ttf/otf. meta robots noindex sur toutes les pages.
## Corrections de cette passe
- Cibles tactiles à 44 px (liens autonomes, nav, pied, logo) ; soulignement du logo au survol et au focus.
## Points non résolus
- [a11y] 404 : `.kyw-footer__note` #6b787d sur #fbfaf8 = 4,36:1 ; composant `packages/kyw-footer`, à corriger dans le paquet.
- [mesure] CLS mobile carte 0,055 (seuil 0,05), non remesuré.
- [score] Pas de passe critique jury ; cases 42 à 63 de DESIGN.md non cochées avec preuve.
## Placeholders et hypothèses (à remplacer par le client)
- Aucun `placeholder: true` dans site.ts. Douteux non corrigé : « Gault&Millau 13,5/20 » du dossier.
## Décisions de théâtre
Pas de loader, pas de GL ; repos : orbite du carré et tournette. Accessoire retiré : non fait.
## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/carre-d-herbes.md.
