# ETAT · le-54 · variante legacy · phase 1 (construction-1)

## Fait
- AUDIT.md (sloplint `--before` : 21 FAIL, 28 REFLEX d'origine), comp.md (c1 Poster choisi), DESIGN.md (Picks, Approche, Tokens, Composants, Sur-utilisation points 1 à 5), entrée dans `.hallmark/log.json` (12 sur 20).
- Thème Atelier (dealt 1/3) ; scaffold `tokens.css`, `base.css`, stamp et critique en tête de `src/styles/page.css`.
- 7 pages statiques : `/` (accueil), `/a-propos/`, `/lacarte/`, `/reservations/`, `/galerie/`, `/contact/`, `404`. Routes d'origine toutes gardées.
- Composants : Nav (popover mobile), Fig, Horaires, Reserve, Footer (mast) ; données dans `src/data/site.ts` et `src/data/photos.json` (14 photos WebP 800 et 1600 px dans `public/photos/`, logo dans `public/logo.png`).
- Build OK : `scripts/q.sh build pnpm build:site sites/le-54-legacy` → `dist/le-54/legacy/` ; KywFooter, noindex et mention présents sur les 7 pages ; aucun tiret cadratin ; sloplint statique sur `src` : 0 FAIL, 0 REFLEX.

## Reste
- Phase 2 : mouvement (un seul pattern, CSS pur), états de contrôles à vérifier en navigateur, WebGL « air » d'Atelier non fait (air fixe laissé en papier uni), reveal éventuel, mobile 375 et 1920, polices Fontshare/Google à valider (le rendu hors ligne retombe en Georgia / sans-serif).
- Phase 3 : sloplint `--render` sur les 7 URL, jugées gates § 5, finish review (auto-notation `self`), RAPPORT.md, `pnpm index`, push.
- Photos sous le hero : un seul showcase sur l'accueil ; l'accueil peut accueillir un second visuel (portrait `dressage-sauce`) si la revue le réclame. Sur /lacarte le showcase est le velouté.
- WARN statique 25 (mesure 32ch des colonnes du pied) à trancher en phase 3.

## Décisions et hypothèses
- Macrostructure Photographic et hero Poster gardés (le draw proposait Bento et Index) ; nav haute à la place de la barre latérale de 300 px ; slider automatique remplacé par une photo fixe (gate 18).
- Libellé « Réservations » retiré de la nav haute au profit du bouton « Réserver » (même destination `/reservations/`) ; le lien « Réservations » reste dans le menu mobile.
- Accent slate d'Atelier = bleu du logo mesuré (pas de `--brand`) ; l'or du logo n'est pas un jeton.
- Menu : seuls 3 services 48 € et 4 services 65 € (site actuel) ; le menu 2 services à 30 € et le 62 € de Gault&Millau ne sont pas affichés (à confirmer).
- Horaires : plages 12:00 à 14:00 et 18:30 à 21:00 viennent de Trouve Ton Resto (à confirmer) ; lundi ouvert d'après le texte du site (« fermé mardi, mercredi et samedi midi »), marqué « (à confirmer) » car la-carte.be le dit fermé (`data-placeholder="true"`). Date relative « depuis près de dix ans » supprimée (gate 63).
- Gault&Millau écrit en texte (13,5/20 selon le site du restaurant) ; la pastille image du site n'est pas reprise. resto.be 9,2/10 sur 251 avis repris du dossier. Aucun extrait d'avis (tronqués).
- Photo des boîtes de caviar exclue (produit, pas forcément le restaurant) ; légendes et alt tirés du champ `sujet`, mentions « à confirmer » neutralisées.
- Le formulaire de /contact garde ses quatre champs et n'envoie rien : `data-endpoint=""`, message « Maquette ».
- Numéro BCE « BE 437 634 306 » repris tel quel du site.
- Lien « Voir sur la carte » : OpenStreetMap sur les coordonnées du dossier (le site d'origine avait une carte Leaflet).

## Pièges
- `sites/_test-legacy/` n'existe pas : `astro.config.mjs` et `tsconfig.json` copiés de `sites/chez-guillaume-legacy/`.
- `capture.mjs` écrit toujours `screen-home-desktop.png` : un `--out` par capture, sinon écrasement.
- Les images `loading="lazy"` d'une capture pleine page restent vides (fond papier) : ne pas les prendre pour un défaut.
