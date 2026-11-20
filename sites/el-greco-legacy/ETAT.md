# ETAT · El Greco · variante legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée, deal/draw/scaffold/stamp (Specimen, seed c9eb51), `comp.md` (2 comps), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation points 1 à 6).
- Contenu : `src/data/site.ts` + `carte.json` (12 catégories, prix de `donnees.json`).
- Pages statiques : `/`, `/our-menu/`, `/carte-des-boissons/`, `/about-us/`, `/contact/`, `404`. Routes d'origine gardées. Noindex, KywFooter et mention vérifiés sur les 6 pages du `dist/`.
- Build : `pnpm build:site sites/el-greco-legacy` passe, `dist/el-greco/legacy/`. `sloplint src` : 1 FAIL (34, faux positif, règle dans base.css) et 0 REFLEX ouvert.

## Reste
- Phase 2 : rendu navigateur (fold 1280 x 800, 375 px, repères du titre à régler à l'œil : positions 76 % et 40 % approximatives), nav mobile (popover), `:active`/états complets, un reveal au plus (Specimen : aucun), `sloplint --render` (REFLEX/WARN de rendu), lisibilité de la légende de photo sous `figcaption` (position absolue, peut chevaucher la section suivante), balance/pretty.
- Phase 3 : reviews, sweep, RAPPORT.md, `pnpm index` et commit final, copie des fichiers `.hallmark` utiles.

## Décisions et hypothèses
- Macrostructure Photographic remplacée par Catalogue, hero Poster par Index : pas de photo du restaurant, la carte porte la page.
- Routes d'origine gardées (`our-menu`, `carte-des-boissons`, `about-us`, `contact`) pour le câblage.
- Logo du client (489 px, 128 px affichés) gardé dans la nav ; photos de stock : 2 seulement, marquées placeholder.
- Avis : trois extraits Trustindex positifs, mot pour mot, à faire vérifier ; les avis critiques non repris ; aucun nombre ni note.
- Horaires : jeudi à dimanche (Trouve Ton Resto, à confirmer) ; lundi à mercredi en `.fill` (« À confirmer »). Un `.fill` sur l'accueil et sur contact.
- Réservation : lien vers `/contact/` et `tel:` ; texte « Par téléphone ou par e-mail » (procédure déduite du téléphone et de l'e-mail du site, à vérifier). Lien Itinéraire = Google Maps sur les coordonnées du dossier (ajout).
- À vérifier : « servis avec frites, pâtes grecques ou pomme au four, salade et trois sauces froides » (dossier.md), changement de propriétaire (non affiché).
- Comp : capture de c1 écrasée par celle de c2 (même nom de sortie) ; c1 choisi sur raisonnement. Pas de `pnpm index` ni de push (laissés à la session de lot).
