# RAPPORT : makimono-portfolio (phase 3, QA)

## Corrigé
- Accueil, horaires : texte crème sur cartes roses (1,78:1, 20 nœuds axe `color-contrast`) passé en encre ; flèches « → » en encre. Re-capture ciblée de l'accueil : 0 violation axe, 0 erreur.

## Vérifié
- Source du QA-build (captures plus récentes que `src/` avant correction) : console 0, requêtes en échec 0, débordement nul, cibles tactiles et focus OK, FPS mobile 60, audit 0 FAIL / 3 WARN.
- Les 3 WARN et les 2 violations axe du « 404 » sont les faux positifs connus (réponse brute de serve.mjs ; robots/sitemap sous `base`). Le vrai `404.html` porte lang="fr", title, un h1, noindex, mention maquette.
- Clic réel au centre de chaque lien de l'en-tête en 1440 sur 5 pages : aucun écart (elementFromPoint = lien, URL change).
- Capture fenêtre du bas de page en 1440 sur 4 pages : bandeau KYW (logo unique), mention « Maquette KYW, certaines données sont illustratives » visibles.
- 404 : capture ciblée non terminée (délai), contrôle fait par lecture du HTML.

## Placeholders
- Définition du nom ; exemple de roll à 10,10 € ; téléphone +32 483 03 88 47 (site actuel) contre +32 495 90 82 74 (restaurants.json), à confirmer ; Korean Futo « 10,50 à 11,00 € » ; avis (3 extraits Google via Restaurant Guru, note 4,6 sur 532) à confirmer ; pas de réservation en ligne ; logo mascotte non intégré.

## Points ouverts
- Contraste mesuré par axe « à revoir » : 38 nœuds (décoratifs / fonds image), non tranchés.
- CSS mort `.equipe`, `.nav__cta` non retiré. Anneau de focus (encre) non revérifié sur sections vertes (0 focus invisible au rapport).

## Leçons structurelles
- Gabarit `affiche` : `.bento` sans reset de `ul`, hero grid `fr` sans `minmax(0, …)`, cartes `.horaires__jour` crème sur rose : à corriger dans `gabarits/affiche/` (interdit ici).
- Outil : `serve.mjs` est dans `.claude/skills/awwwards/scripts/`, pas `scripts/` ; il meurt si on rebuild pendant qu'il tourne (relancer après build).
