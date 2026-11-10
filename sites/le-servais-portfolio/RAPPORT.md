# RAPPORT QA : le-servais portfolio (phase 3)

## Corrections
- Pied de page KYW : le site repeignait le bandeau en sombre (`.kyw-footer` dans base.css), d'où axe color-contrast (#55646a sur #081c1f, 2,85:1) sur toutes les pages. Surcharge retirée : bandeau clair du paquet, contraste correct.
- Même pied de page masqué sous le calque fixe `#ciel` (z-index 0) une fois le fond clair : `.kyw-footer { position: relative; z-index: var(--z-content) }`. Vérifié par capture fenêtre du bas de la carte en 1440 : mention « Maquette KYW, certaines données sont illustratives » et logo KYW visibles, un seul logo.
- Après correction : carte, 0 erreur console, 0 violation axe.

## Faux positifs écartés
- 404 « document-title » : la capture est la réponse brute de serve.mjs ; `404.html` porte `<title>Page introuvable | Le Servais</title>`.
- skipLinkFirst false, WARN robots/sitemap/404 sans h1.

## Placeholders
- Photo de la Verrière (`placeholder: true`, origine à confirmer).
- Téléphone 081 73 65 52 affiché « à confirmer » (restaurants.json donne un autre numéro).
- Pas d'avis cité ; résumé Tripadvisor sans guillemets ; itinéraire par recherche d'adresse (pas de GPS).

## Points ouverts
- Mobile : image de l'astre (149 Ko) téléchargée mais masquée (display: none).
- `gabarits/UTILISATION.md` (ligne `journee | le-servais`) et correctif fermeture après minuit dans gabarits/journee : non faits (gabarits/ protégé).

## Leçons structurelles
- Un site qui repeint `.kyw-footer` casse le contraste du paquet ; ne pas surcharger ses couleurs.
- Gabarit à calques fixes (#ciel, #gl, z 0) : `.kyw-footer` doit être en position relative, z-index content.
