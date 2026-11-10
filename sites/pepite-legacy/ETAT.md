# ETAT · pepite-legacy · construction-1 (phase 1 sur 3)

## Fait
- Audit (AUDIT.md, `.hallmark/before.txt`), deal/draw/scaffold Spore cellar, stamp et critique en tête de `src/styles/page.css`, comps c1/c2 (c2 choisi, comp.md), DESIGN.md (Picks, Approche, Composants, Sur-utilisation).
- Pages statiques : `/` (Hero Poster, Carte, Vins, Lieu, Presse, Horaires et réservation, Pied colophon) et `/404`. Données dans `src/data/site.ts`. Build OK (`dist/pepite/legacy/`), noindex, mention KYW et KywFooter présents sur les deux pages. `sloplint src` : 0 FAIL, 2 WARN (28a dismissed : l'image de Lieu n'est pas le LCP ; 49 corrigé).
- Photos : bouteilles (hero), cave voûtée (Lieu) en WebP dans `public/photos/` (couvert, vitrine préparés, non utilisés).

## Reste (phases 2 et 3)
- Phase 2 : menu mobile (nav sur deux lignes en attendant), jour courant des horaires par script, un reveal CSS au plus, grain `--grain` sur les bandes (texture.md § 1), états des boutons, `sloplint --render --url` (0 FAIL, 0 REFLEX), captures 375/768/1440, contraste du texte sur le dégradé du hero.
- Phase 3 : sweep, `--kept` contre `before.json`, hero-review et finish-review `self`, RAPPORT.md, `pnpm index`, push. Entrée du journal sans `fingerprint` (à compléter).
- Option : une photo (couvert ou vitrine) si la page paraît trop typographique ; au plus un tiers sous le hero.

## Décisions et hypothèses
- Hero Poster (swap du Ledge du draw) ; comp c2 (texte nu à droite) pour garder les étiquettes lisibles.
- Menu 58 € du 12 au 14 novembre repris tel quel (date réelle du site d'origine, fréquence de renouvellement non affichée) ; aucun prix par plat inventé.
- Réservation : lien Tablebooker (restaurantId 50470946) à la place de l'iframe ; le site cite aussi Zenchef (non repris, à confirmer). Téléphone 0476/620182 (celui du site) ; 081/22 91 81 non repris.
- Fondation : « ouvert en 2017 » (presse) ; la version Mapstr 2023 est ignorée. Aucun avis ni note chiffrée affichés. Aucun `.fill` ni placeholder.
- Extraits de presse repris mot pour mot, à faire valider. Events 2018, News 2017-2022 et scans de presse dropped.
- Cuivre d'origine remplacé par le rose huître du thème ; le logo capturé n'est pas utilisé (à redessiner).
