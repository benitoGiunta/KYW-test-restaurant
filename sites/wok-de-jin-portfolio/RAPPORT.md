# RAPPORT — wok-de-jin · portfolio (gabarit Guinguette)

## QA (phase 3)
- Source : QA-build.md (captures et audit de l'agent « captures »), 0 FAIL, 0 erreur console, 0 requête en échec, pas de débordement, focus clavier visible.
- Axe color-contrast relancé en ciblé (1440, défilement à la molette pour déclencher les reveals) sur les 7 pages dont `404.html` : 0 violation. Les violations de la passe build (404 : `#6b787d` sur `#fbfaf8`) viennent de la réponse brute de `serve.mjs` pour une URL inexistante, pas de la vraie page 404 du site ; les violations vues à 2,5 s sans défilement sont des reveals en cours de fondu.
- « À vérifier » axe (16 à 27 par page) : textes sur fonds dégradés ou images, non tranchés par l'outil ; aucun défaut visible sur les planches.
- 404.html réelle : captée (1440), survol du bouton OK (fond corail vers brun), bande KYW et mention présentes.
- Contrôles dist (7 pages) : `noindex, nofollow`, `lang="fr"`, mention « Maquette KYW… », un seul `kyw-signature`, aucun tiret cadratin, pas de « sans espace insécable ».
- Correction faite : apostrophes droites de la 404 remplacées par des apostrophes typographiques (corps de page et description). Build final OK (7 pages).
- WARN audit non corrigés : phrase d'horaires répétée (bloc horaires affiché dans plusieurs sections, voulu), robots.txt et sitemap (faux positifs sous `base`, fichiers présents dans dist).

## Placeholders
- Aucun élément de contenu `placeholder: true` affiché. E-mail : `''` marqué placeholder, jamais affiché. Histoire : `[]` (inconnue au dossier, la page « La maison » décrit la salle).
- Données illustratives couvertes par la mention de pied de page.

## Points ouverts
- Logo rond `public/photos/logo.png` non utilisé.
- `gabarits/UTILISATION.md` (ajouter guinguette | wok-de-jin) et correctif `.table__rail` dans `gabarits/guinguette/` : dossiers protégés, à faire en fin de lot.

## Leçons structurelles
- Axe lancé juste après `load` signale de faux échecs de contraste sur les gabarits à reveals : défiler à la molette et attendre 2,5 s avant `axe.run`.
