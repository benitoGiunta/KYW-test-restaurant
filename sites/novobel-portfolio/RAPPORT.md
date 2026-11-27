# RAPPORT novobel-portfolio (phase 3, QA)

## QA
- Build final OK (`scripts/q.sh nb-qa-build`), 7 pages, `dist/novobel/portfolio/`.
- Report de l'agent captures (accueil) : 0 erreur console, 0 requête échouée, axe 0 violation (17 contrastes « à revoir », décoratifs), pas de débordement, CLS 0, LCP 72 ms desktop / 1184 ms mobile throttlé.
- Contrôle ciblé maison, 7 pages x 2 profils (1440, 390 tactile) : HTTP 200, 0 erreur console, 0 débordement horizontal, 1 h1, lang fr, `noindex, nofollow`, mention « Maquette KYW » et logo KYW présents, 0 texte à opacité nulle, aucune image déformée.
- Captures de bas de page (molette) sur les 6 pages hors accueil + 404 : footer KYW, mention et barre basse visibles, rien ne passe devant.
- Planches de l'accueil (desktop et mobile) lues : mise en page propre, étapes, projets, maison, pied de page corrects.
- Défaut cassé trouvé : aucun, aucune correction de code nécessaire.
- Non refait (déjà couvert en phase 2) : clics réels de l'en-tête, formulaire de devis.

## Placeholders / données illustratives
- Projets (Astrid, Bellevue, Joseph, Citadelle) : badge « image illustrative » sur les visuels.
- Équipe : portraits et années d'activité non fournis (texte d'attente « seront ajoutés »).
- Logo client (`02-site.png`) non intégré.
- Formulaire de devis : démonstration, ouvre la messagerie (mailto).
- Mention « Maquette KYW, certaines données sont illustratives » sur chaque page.

## Points ouverts
- `<img>` de l'aperçu au survol sans `src` tant qu'aucun projet n'est survolé (voulu, `aria-hidden`).
- `pnpm index`, publication et `gabarits/UTILISATION.md` : session mère.
- Étapes de la page Services non capturées en milieu de page (même composant que l'accueil, vu OK).

## Leçons structurelles
Voir `data/usage/test-3/lecons-proposees/novobel.md`.
