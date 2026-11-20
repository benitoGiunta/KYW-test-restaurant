# ETAT · Brasserie Edgard · variante legacy · construction-1 (2026-11-20)

## Fait
- Audit `sloplint --before` sur les 6 pages d'origine : `AUDIT.md`, `.hallmark/before.txt`.
- Approche conservée, deal (Atelier 2/3), draw 3e29b6, scaffold, stamp dans `src/styles/page.css`, `DESIGN.md` (Picks, thème, composants, checklist), `comp.md` (c1 et c2 construites, c1 choisie), entrée de `.hallmark/log.json` (racine du dépôt).
- 7 pages statiques : `/`, `/la-carte/`, `/lunch-et-suggestions/`, `/menu-groupe/`, `/galerie/`, `/contact/`, `404`. Données dans `src/data/site.ts` et `carte.json` (71 plats, copie de `donnees.json`). 29 photos du client en WebP et le logo SVG dans `public/photos/`.
- Build passe (`scripts/q.sh build pnpm build:site sites/brasserie-edgard-legacy` → `dist/brasserie-edgard/legacy/`). Noindex, mention KYW et `KywFooter` vérifiés par grep sur les 7 pages.
- `sloplint src` sans rendu : 0 FAIL réel (le FAIL 34 de `Base.astro` est le faux positif connu, la règle est dans `base.css`).

## Reste
- Phase 2 : nav sous 60 rem (popover), un reveal, jour courant du Schedule (`data-day`), états des boutons et du formulaire (erreur, succès simulé, focus), reprise de la plaque du hero qui touche le bord du bâtiment (comp.md), fond « air » facultatif, réponses aux trois questions de reproduction du comp.
- Phase 3 : `sloplint --render`, QA 375 et 1440, contrastes, `scrollWidth` (preuve du 34), gates jugées, revue de fin, RAPPORT.md, `.hallmark/` committé en force si nécessaire.
- `pnpm index` non lancé (dist/index.html partagé avec les autres sessions) : à faire en fin de phase 3.

## Décisions et hypothèses
- Shape Photographic gardée (l'original s'ouvrait sur la façade) au lieu du tirage Letter ; nav edge-aligned au lieu de « search-led bar » ; hero Poster au lieu de Stage.
- Aucune donnée inventée : pas d'avis (le 4,3 sur 461 de TripAligner n'est pas repris), pas d'histoire, pas d'équipe. « chef Titi » apparaît seulement dans l'intitulé du cassolet, repris du site d'origine. Aucun `data-placeholder` ni slot `.fill` nécessaire.
- « Carte réduite pour les groupes » (liste de plats du site d'origine, page menu groupe) : non reprise, renvoyée à la carte ; menu groupe et formulaire (11 champs, mêmes `name`) conservés. À signaler au réviseur (ligne `dropped` à ajouter au stamp si confirmée).
- Newsletter gardée en petit formulaire sur Contact (`data-endpoint=""`), plus de fermeture sur un champ e-mail (85). Les deux formulaires n'envoient rien (gate 70), mention « Maquette » sous chacun.
- Texte de l'adresse « Chaussée de Waterloo 473, 5002 Saint-Servais (Namur) » : le site d'origine écrit « 473 Ch. de Waterloo 5002 Namur » ; version complète de `donnees.json`.
- Photos : la façade `01-facade.jpg` (nuit grise) diffère de celle du slider d'origine (ciel bleu) ; seul fichier disponible dans `photos/`.
- Pièges : `hallmarkSlots` est défini dans `Footer.astro` avant `KywFooter` ; les `figcaption` sont hors de `[data-slot]` car `base.css` masque les enfants non image d'un slot.
