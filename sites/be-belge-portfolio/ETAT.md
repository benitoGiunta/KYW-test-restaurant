# ETAT : be-belge-portfolio (phase 1 sur 3, construction-1)

## Fait
- Gabarit velours copié et adapté ; DESIGN.md (matrice, décisions) ; `src/data/site.ts` entièrement remplacé (données du dossier, aucun placeholder de contenu).
- Pages : accueil, /menu/, /carte/ (menus 57 et 72 €), /maison/ (ex-histoire), /privatisation/, /reservation/, /404.
- Photos converties (WebP, N&B pour la galerie), favicon, OG, tokens aubergine/ocre, pictogramme dans l'en-tête et le pied.
- Build OK : `pnpm build:site sites/be-belge-portfolio` -> dist/be-belge/portfolio/ (7 pages, 2,8 Mo).

## Reste (phases 2 et 3)
- QA navigateur (shoot, audit, clics d'en-tête, bas de page 1440), mobile 390 : le mot le plus long du hero (« D'AILLEURS ») doit tenir, commentaire CSS de base.css cite encore « POTES ».
- Vérifier cible `.menu__groupes` / `.menu__groupe` : classes nouvelles sans style dédié (la grille existante `menu__liste` est reprise) ; ajuster l'espacement.
- Animations : conserver celles du gabarit ; contrôler le compteur 3 / 57 / 34 / 5.
- `pnpm index` non lancé ; pas de publication.

## Décisions et hypothèses
- Baseline rédigée d'après le nom et les listings (à confirmer par le client). Pas de chef, d'histoire ni d'avis.
- Citation = mot d'accueil du site client (« Il n'y a pas de bon repas si le vin n'y coule pas ! »), non un avis. Avis Restaurant Guru non repris (source tierce).
- Menu du Chef 13/08-06/09/2026 présenté comme « composition de l'été 2026, à titre d'exemple ».
- Lien Zenchef déduit du rid 382492 (`bookings.zenchef.com/results?rid=382492`) : à vérifier ; repli possible sur /reservation/ du site client.
- gabarits/UTILISATION.md non mis à jour (interdiction de toucher gabarits/) : ajouter « velours : be-belge ».
- Photos des plats absentes : photos libres non cherchées en phase 1.
