# RAPPORT : pizzeria-doria / portfolio (phase 3, QA)

## Résultat de la QA
- Build : `scripts/build-site.mjs` exit 0, 7 pages, `dist/pizzeria-doria/portfolio/`.
- QA-build.md (agent captures) : 0 erreur console, 0 requête en échec, 0 débordement, 0 focus invisible, audit FAIL 0 (WARN 20), CLS <= 0,022, LCP mobile 1120 ms.
- Vérifications ciblées de cette passe (1440, serveur local, 7 pages dont 404.html) :
  - axe (color-contrast, link-name, button-name, image-alt) : 0 violation sur les 7 pages. Les 27 et 18 « contrastes à revoir » du shoot sont des cas indéterminés d'axe (fonds dégradés, images), non des échecs.
  - Clics d'en-tête : 8 liens par page, elementFromPoint renvoie toujours un lien (aucun lien masqué).
  - Bas de page en fenêtre : bande KYW, « Maquette KYW, certaines données sont illustratives » et logo « Know Your Website » visibles, un seul `<footer>`, un seul `kyw-signature`.
- Aucune correction de code nécessaire : rien de cassé n'a été trouvé.

## Faux positifs écartés (leçons communes)
- 404 : l'échec axe (1 violation, cible tactile 128x20) concerne la réponse brute de `serve.mjs`, pas `404.html` (0 violation).
- `skipLinkFirst: false` (1er arrêt « Aller au contenu »), WARN robots/sitemap sous base (robots.txt et sitemap-index.xml existent dans dist).
- WARN « sentence repeated » : horaires répétés en pied de page et dans la page, voulu.

## Points ouverts (mineurs)
- Grand vide vert (~250 px) au-dessus du pied de page de /carte/ en 1440.
- Titre géant « Bon appétit » coupé en bas du pied de page : effet décoratif du gabarit, lisible partiellement.
- En-tête sticky (80 px) masque la première rangée de tirages de la table quand la section est calée en haut.
- Sloplint : auto-notation `self` non refaite ; logo vectoriel réel absent.
- Défauts du gabarit guinguette à reporter (gabarits/ protégé) : voir ETAT.md.

## Placeholders
- Photos libres illustratives (`placeholder: true`) : pizza-coupe, pizza-basilic, pate, burrata (alt « photo libre, illustrative »).
- Contenu marqué illustratif ou `null` selon `src/data/site.ts` et `carte.json` (carte de 181 lignes issue du dossier ; aucun avis, récompense ni chiffre inventé).
- Mention « Maquette KYW, certaines données sont illustratives » sur chaque page.

## Leçons structurelles
- Aucune nouvelle (voir data/usage/test-1/lecons-proposees/pizzeria-doria.md).
