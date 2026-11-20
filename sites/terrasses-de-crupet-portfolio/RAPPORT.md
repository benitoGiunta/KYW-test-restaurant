# RAPPORT QA — terrasses-de-crupet / portfolio (phase 3)

## Résultat
- Build final : OK (7 pages), `dist/terrasses-de-crupet/portfolio/`. Aucune modification de code en phase 3 : aucun défaut réel trouvé.
- Accueil et carte : 0 erreur console, 0 requête en échec, 0 violation axe, 0 débordement, 0 piège clavier, CLS < 0,05. Audit : 0 FAIL, 15 WARN (phrases répétées = horaires, sitemap/robots sous base : faux positifs connus).
- LCP mobile accueil 3788 ms (throttled, image du hero) : acceptable pour une maquette, noté.

## Findings de l'agent captures écartés
- 404 « color-contrast » et « cible tactile 128x20 (la page d'accueil) » : c'est la réponse brute de `serve.mjs` pour une URL inconnue, pas notre `404.html`. Vérifié par capture ciblée de `/terrasses-de-crupet/portfolio/404.html` : 0 violation axe ; le texte « la page d'accueil » est absent de notre 404.

## Points ouverts (non bloquants)
- Badge « attrapez-moi » (table, 1440) recouvre un coin de la photo « Le plat arrive » : décoratif, aria-hidden.
- Nav du bas défile sous 360 px (acceptable).
- `gabarits/UTILISATION.md` : ajouter « guinguette | terrasses-de-crupet » (gabarits/ protégé).
- Sloplint non lancé ; commit final `[publier]` et `pnpm index` à faire par la publication.

## Placeholders
- 4 cartes d'avis « exemple » (`site.ts`, `placeholder: true`, marque visible à l'affichage) ; autres données fictives marquées `placeholder: true` dans `src/data/site.ts` (grep `placeholder`).
- Photos : les 22 photos viennent du dossier restaurant (aucune photo libre).

## Leçons structurelles
- Voir `data/usage/test-1/lecons-proposees/terrasses-de-crupet.md`.
