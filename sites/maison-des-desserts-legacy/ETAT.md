# ETAT · maison-des-desserts · variante legacy · construction-1 (phase 1 sur 3)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*` via sloplint `--before --render`), approche conservée, deal (Vellum, Atelier, Garden → Atelier), draw e128aa (Split Studio, Index, nav bords, pied statement), scaffold, stamp, comp c1 et c2 (c1 retenu, `comp.md`), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation points 1 à 9).
- Paquet Astro : `Base.astro`, `Nav`, `Footer` (statement + `hallmarkSlots` + KywFooter), `Photo`, `Schedule`, 6 routes : `/`, `/carte` (13 rubriques, 142 lignes, index sticky), `/galerie` (15 photos en 3 groupes), `/contact`, `/jobs`, `/404`.
- Photos : 15 du client converties en WebP (1400 et 800 px) dans `public/photos/`, dimensions dans `src/data/photos.json` ; carte PDF d'origine copiée dans `public/`.
- Build : `pnpm build:site sites/maison-des-desserts-legacy` OK, 6 pages dans `dist/maison-des-desserts/legacy/`.
- Entrée du journal `.hallmark/log.json` écrite.

## Reste (phases 2 et 3)
- Phase 2 : nav mobile (`popover`), un reveal, Switcher des métiers (accueil, aujourd'hui trois lignes Rows statiques), jour courant dans Schedule, états des contrôles (8), formulaires (messages d'état), `:focus-visible` vérifié, `@media (pointer: coarse)` pour les liens en ligne, lettrine et passe-partout affinés, zoom sur galerie éventuel (CSS seulement).
- Phase 3 : QA en navigateur (fold à 1280 x 800, 375 px, overflow, contraste, axe), `sloplint --render` sur `dist` aplati (la FAIL 34 de `src` est un faux positif), polices réelles (Fontshare et Google Fonts n'étaient pas joignables dans les comps), RAPPORT.md, revue.
- Vérifier : hero à 1280 x 800 (titre 84 px sur cinq colonnes : trois lignes), hauteur du tirage (`max-height: 62dvh`), colonne sticky de la carte à 1440.

## Décisions et hypothèses
- Genre editorial ; Atelier choisi pour la matière (chaux, encre, serif léger) ; couleur de marque non imposée : le doré du logo n'est pas repris (illisible sur papier clair), logo remplacé par le nom en Sentient.
- Pas de réservation de table (aucune dans le dossier) : le job « book » du draw devient « commander et venir » : actions Voir la carte et Commander en ligne (boutique externe conservée).
- Hero : Poster d'origine remplacé par Index (contraste) ; bascule clair/sombre supprimée ; Turnstile et vignettes de banque d'images (16, 17, 18) non repris.
- Dates : « depuis 1993 » dans le hero (ouverture du salon de thé, site) ; 1946 en statement ; 1987 (bandeau d'origine) et 1974 (presse à confirmer) non repris (incohérences du site, listées).
- Commandes de Noël et du Nouvel An, fermetures du 25/12 et 01/01 : lus dans la carte PDF 2026-2027 ; à vérifier avec la maison avant publication.
- Carte : les quatre lignes sans prix (pâtisseries du comptoir, chocolat chaud viennois, galette des rois, biétrumés) restent sans prix ; le dossier signale une lecture incertaine du chocolat chaud viennois et des mignardises.
- Aucun `.fill` ni placeholder : tous les faits viennent du dossier.
- E-mail de contact : `info@mddnam.be` (dossier ; le site affiche une adresse masquée).
