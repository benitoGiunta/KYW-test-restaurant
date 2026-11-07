# RAPPORT : incorrect / portfolio (gabarit affiche), phase 3 QA

## QA
- Build : 6 pages, exit 0 (après corrections).
- Défaut corrigé : contraste (axe color-contrast, 19 nœuds sur /, 4 sur /carte/). Crème sur rouge #ff4b2b = 2,82:1. Texte sur aplat rouge passé à l'encre (cartes horaires, CTA de nav) ; rouge de texte sur crème remplacé par `--rouge-texte: #bf2d0e` (4,9:1) pour `.formule__prix`, numéros de galerie, puces de définition, flèche « fermé ».
- Vérifié par shoot ciblé de / : axe 0 violation, 0 erreur console, 0 requête en échec, CLS bureau 0,067 (< 0,1) et mobile 0,003.
- 404 : `dist/incorrect/portfolio/404.html` porte `lang="fr"` et `<title>` ; les échecs axe de l'agent captures viennent de la réponse brute de serve.mjs (faux positif connu).
- Audit : 0 FAIL ; WARN restants = faux positifs (phrase d'horaires répétée par le pied de page, robots/sitemap sous base, 404 sans h1).
- Contrôles de la phase 2 conservés : 0 débordement 320 à 1440, clics d'en-tête, bas de page, reduced-motion.

## Placeholders
Définition du mot, étapes de la vente à emporter (« illustratif »), plat signature dessiné (illustration), mentions illustratives affichées ; tout le reste vient du dossier. Liste exacte : `grep -n "placeholder: true" src/data/site.ts`.

## Points ouverts
- 47 contrôles de contraste « à revoir » (texte sur dégradés/images) non tranchés par axe.
- Pages histoire, à emporter, réservation : audit sans capture visuelle dédiée ; mesures de débordement OK en phase 2.
- `gabarits/UTILISATION.md` (ligne `affiche | incorrect`) et défaut `.hero` sans `minmax(0, 1fr)` du gabarit affiche : protégés, à reporter par l'orchestrateur.

## Leçons structurelles
- affiche : `--rouge` #ff4b2b ne porte ni texte crème ni texte rouge sur crème (2,82:1) : prévoir `--rouge-texte` et encre sur rouge dès le scaffold.
