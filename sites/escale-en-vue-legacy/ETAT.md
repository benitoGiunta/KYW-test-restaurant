# ETAT · escale-en-vue-legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée (one-page), deal/draw/scaffold/stamp (Squeeze, seed `restaurant-namur-seasonal-terrace-028c·65042563·2026-11-20·r0`, draw 99e2b7), entrée au journal partagé `.hallmark/log.json`.
- Deux comps, c1 retenu (`comp.md`). `DESIGN.md` (Picks, tokens, composants, Sur-utilisation points 1 à 8).
- Pages : `/` (Hero Stage, Horaires en tuiles, Carte en Rows, Lieu, Pied) et `404`. Données dans `src/data/site.ts`, polices auto-hébergées (`public/fonts`), photos du client en WebP (`public/photos`).
- Build : `dist/escale-en-vue/legacy/` OK ; sloplint source `--genre playful` : 0 FAIL, 0 WARN ; noindex, KywFooter et mention présents sur `/` et `404` ; aucun tiret cadratin.

## Reste (phases 2 et 3)
- Nav mobile (menu Popover sous 40 rem, aujourd'hui liens masqués), lien actif, jour courant des horaires (surface seule), un reveal au plus, états des boutons vérifiés.
- sloplint `--render` sur `/` et `404` (aucun rendu navigateur fait en phase 1), captures 1920/1280/390/320, fold du héro à 1280x800, axe, contraste du texte `--color-muted` sur `paper-2`.
- Sweep des gates jugées § 5, RAPPORT.md, `.hallmark/preflight.json`, waiver 59 à confirmer par sloplint.
- Logo : `public/photos/logo.webp` (dessin au trait vert sur transparent, 512 px) copié mais non placé ; à tester en masque `currentColor` dans le pied ou sur la fiche blanche.

## Décisions et hypothèses
- Hero Stage au lieu de Poster : meilleure source 1024 px. Aucun prix, aucune carte inventée : la carte reste en quatre offres citées par le client (planchette, plat du jour sur réservation, bières, softs).
- Saison 2026 (19 juin au 6 septembre) affichée telle quelle sous les actions, sans date de réouverture (inconnue). Horaires de l'affiche 2026 repris ; samedi en un créneau 11 h 30 à 21 h 30.
- Photos écartées : 03 (382 px), 08, 09 (possiblement générée), 10, 11 (événement privé), 13 (400 px). Transats (07) disponible en `photos.transats` mais non placée.
- Adresse « Dave (Namur) » ; aucun `.fill` ni placeholder : tout vient du dossier. Pas de widget de réservation : le bouton est un `tel:`.
- Leçon proposée : `data/usage/test-1/lecons-proposees/escale-en-vue.md` (mode figé, `agents/` intact).
