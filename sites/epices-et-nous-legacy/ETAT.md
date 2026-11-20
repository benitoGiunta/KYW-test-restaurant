# ETAT · Épices & Nous · variante legacy · construction-1 (phase 1 sur 3)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*`), deal/draw/scaffold --brand, stamp et critique en tête de `src/styles/page.css`, deux comps (c1 retenue, `comp.md`), `DESIGN.md` (Picks, Approche, Thème, Tokens, Composants, Sur-utilisation points 1 à 6).
- Contenu réel dans `src/data/site.ts` (carte, menu, horaires, actualités, photos et alts depuis `photos/index.json`).
- 7 pages statiques : `/`, `/carte/`, `/menu/`, `/reservation/`, `/a-propos/`, `/actualites/`, `404`. Nav sticky, hero Ledge, Split, Rows, Schedule, énoncé, pied letter close + KywFooter. Build OK (`pnpm build:site`), `dist/epices-et-nous/legacy/` généré ; noindex, KywFooter et mention vérifiés sur les 7 pages.
- Photos du client en WebP (srcset 2 largeurs) dans `public/photos/`, logo brun en WebP sans perte.

## Reste (phases 2 et 3)
- Aucun QA navigateur fait : mesurer le fold à 1280×800 et 375×667 (CTA du hero visible), débordement horizontal, nav mobile (liens sur deux lignes, à remplacer par un menu Popover), contrastes, cibles 44 px.
- Photo du hero (`table`) bleutée sur palette chaude : comparer avec `salle-avant` ou `verriere`.
- Jour courant dans le Schedule, un reveal, états des contrôles, `sloplint --render` (FAIL/REFLEX à zéro), hero review `self`, trois questions de reproduction, index `pnpm index`, RAPPORT.md.
- Polices : Sentient (Fontshare) et Hanken Grotesk chargées par lien externe ; hors ligne le repli est Georgia.

## Décisions et hypothèses
- Routes de l'original gardées (accueil, carte, menu, réservation, on parle de nous, actualités) ; `/cuisine`, `/salle`, `/terrasse`, `/chef` (galeries Wix) fondues dans l'accueil. Le bouton « Réserver » mène au module Wix (https://www.epicesetnous.com/reservations), la page `/reservation/` donne téléphone, adresse et horaires.
- Abandonnés : « Se connecter », onglet Saint-Valentin (contenu non relevé, ♥ retirés de la carte), pied ByCM, polaroïd, badges Michelin et Gault&Millau (marques tierces, remplacés par des liens texte).
- Mots changés : h1 « Depuis 1999, Sophie et Denis vous accueillent » (original : 43 mots, gate 58) ; « Heures d'ouverture » devient « Horaires et adresse » ; texte des actualités abrégé depuis la liste du blog ; année de l'article « Nouveau site » (27 août 2025) tirée du dossier. Mention Michelin 2024 (visuel du site) et « plus de 20 ans » repris tels quels. Rien de fictif : aucun `data-placeholder`, aucun slot `.fill`.
- Données à vérifier : prix et plats de la carte (relevé du 20/11/2026 sur le site, carte non datée), 13,5/20 Gault&Millau, 69 € à la carte cité par G&M (non repris).
