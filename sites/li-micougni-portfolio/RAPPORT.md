# RAPPORT QA : Li Micougni, portfolio (phase 3)

## Résultat
- Build final OK (`pnpm build:site sites/li-micougni-portfolio`, 6 pages) ; `dist/li-micougni/portfolio/` régénéré.
- QA agent « captures » : 0 erreur console, 0 requête en échec, 0 débordement, 0 FAIL audit (14 WARN : horaires répétés, faux positifs 404/robots/sitemap).
- 404 : `404.html` porte `lang="fr"` et un `<title>` ; les 2 violations axe sont la réponse brute de `serve.mjs` (faux positif connu).

## Corrigé
- Barre de navigation mobile (fixe en bas) : « Contact » était coupé et la barre défilait (390 px : 336 px de contenu pour 366 disponibles requis). Remplacé par un gabarit resserré (`gap: 0`, padding et corps en `clamp`). Vérifié en émulation mobile sur histoire, terrasse, réservation : `scrollWidth == clientWidth`, 5 liens visibles à 320 et 390 px, `innerWidth` égal à la largeur, 0 erreur.

## Vérifié sans correction
- Pages non capturées par le crawl (histoire, terrasse, réservation) : à 1440, clics réels des 5 liens de l'en-tête (5/5 par page), pas de débordement, mention « Maquette KYW, certaines données sont illustratives » et pied KYW visibles en bas de fenêtre, 0 erreur ; `noindex` et `lang="fr"` présents sur les 6 pages.
- Contraste « à revoir » d'axe (28 accueil, 18 carte) : texte « Braise » décoratif (aria-hidden) et incertitudes de fond animé, pas de violation serious.
- Shoot complet des 3 pages non crawlées : non terminé (2,5 à 4 min par page, règle de sobriété), remplacé par les contrôles ciblés ci-dessus.

## Placeholders
- Horaires (`horairesPlaceholder: true`) : heures de fermeture, midi / soir, samedi illustratifs, mention visible, non publiés en JSON-LD.
- GPS `null` (itinéraire par recherche d'adresse) ; menu de la semaine sans prix (rien affiché) ; avis, presse, équipe : vides.
- Objets au trait (parasol, bouteille, frites, verre) : illustrations génériques.

## Points ouverts
- `gabarits/UTILISATION.md` : ajouter « guinguette : li-micougni » (gabarits/ protégé).
- Gabarit guinguette (protégé), défauts à reporter : `data-reveal` sur bloc à formulaire/bouton ; `.grille-photos` mobile sans marge pour tirages inclinés ; marquee d'état en heure locale ; nav mobile à 5 liens plus large que 320 px.

## Leçons structurelles
- Une nav mobile fixe en pilule avec `overflow-x: auto` masque silencieusement le dernier lien (scrollbar cachée) : mesurer `scrollWidth` contre `clientWidth` à 320 et 390 px, pas seulement la capture.
