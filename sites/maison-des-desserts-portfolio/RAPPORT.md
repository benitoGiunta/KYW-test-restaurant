# RAPPORT QA (phase 3/3) : portfolio, La Maison des Desserts

## Contexte
`QA-build.md` (agent captures) absent : QA ciblée faite ici (audit.mjs, script Playwright maison, planche des bas de page).

## Résultats
- Build : OK (6 pages). Audit : 0 FAIL, 2 WARN restants (robots.txt / sitemap sous `base`, faux positifs connus). Le WARN « title 72 caractères » est corrigé (62).
- 5 pages x 1440 et 390 : `scrollWidth` = largeur de fenêtre, 0 image cassée, 0 erreur console, 1 h1, `noindex, nofollow`, pied KYW et mention « Maquette KYW… » visibles en bas de page (capture fenêtre après molette).
- Clics réels sur les liens d'en-tête en 1440 : 0 écart sur 5 pages. Pendant le loader (environ 2 s sur les pages internes, 5,5 s sur l'accueil), l'en-tête est recouvert : attendu.
- Correction : post-it « À confirmer » de la page Histoire (note de chantier) reformulé en « Dates illustratives » ; vérifié dans `dist/…/histoire/index.html`.

## Placeholders
- Photo `chocolat-epices.webp` (illustrative, probablement banque d'images).
- Dates de fondation (1946, 1987, 1993) incohérentes dans le dossier : repères à valider avec la maison (mentionné sur la page).
- Aucun autre ajout fictif (pas d'avis, pas de récompense, pas de réservation de table).

## Points ouverts
- Ligne `collage | maison-des-desserts` à ajouter dans `gabarits/UTILISATION.md` (dossier protégé).
- Pas de passe jury ni de shoot complet (non fournis par l'agent captures).
