**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 1 page (/) + 404
- **Before** · Floor 97 FAIL (WordPress/Enfold, Facebook SDK) · Reflex 28 · l'enseigne et la carte complète restent
- **Keeps** · tel:, mailto, Facebook, Instagram, une seule route · la copie du client (7 j/7, grill, fondues-pierrades-raclettes) · toute la carte et ses prix · la façade et l'enseigne vache
- **Files** · create: tout le paquet · delete: none · dropped: #event (page événements vide)
- **Shape** · Photographic (08, kept, one-page), swap du draw 79bce8 (Bento Grid) : la posture d'origine est une façade plein écran, la carte longue refuse les tuiles
- **Theme** · Atelier, dealt 1/3 (limewash, encre brun, Sentient light, filets, ardoise froide), seed restaurant-namur-grill-steak-c171·e9115b44·2026-11-27·r0. Écartés : Squeeze (vert forêt, étranger à la marque noir et blanc), Vellum (gothique, trop de façade d'abbaye)
- **Chrome** · nav : floating pill (draw) · footer : mast (draw)
- **Hero** · Poster (swap du draw, Index) : la réservation passe par le téléphone, pas par des créneaux ; plaque de papier en bas à gauche
- **Signature** · la façade et son enseigne vache posées comme un tirage sous une plaque de papier
- **Sections** · Hero · Horaires et adresse (draw : première après le hero) · Présentation et terrasse · Carte (onglets par service) · Salle en bande sans titre (draw) · Photos accrochées · Réservation à côté d'une photo (draw) · Mast
- **Material** · real : 7 j/7, horaires, carte de 226 lignes, adresse 581, téléphone · pictures : 17 photos client (smartphone, 2020) · absent : avis, histoire, équipe, presse, événements
- **Comp** · 2 built, no key, c1 chosen (voir comp.md)
- **Sweep** · phase 3

## Approche
Macrostructure 08 Photographic, empreinte Heading plaque | Body bandes photo / Rows | Divider bord d'image et filets | Button lien et contour | Image client plein cadre | Reveal aucun. Posture : mêmes routes (une page), hero Poster, calme, aucun pattern de scroll. Dérogations : slideshow auto supprimé (18), capitales supprimées (54), lien Facebook corrigé vers `restoohlavache`, adresse 581. Test miroir : un voisin avec un grill obtiendrait rarement ce couple Atelier plus enseigne vache en tirage ; décision changée : plaque papier à gauche, pas de tuiles.

## Thème
Atelier, `tokens.css` fait foi (paper oklch 94,5 % 0,010 76, ink brun 19 %, slate accent 41 % 0,075 248). Sentient 300 (têtes), Hanken Grotesk 400 (corps). Le fond WebGL « air » du thème n'est pas repris (legacy sans WebGL).

## Composants
- **Carte** : Switcher `role="tablist"` (Menus, Grill et à partager, Entrées, Plats, Desserts et cafés, Boissons), premier panneau visible sans script, panneaux masqués seulement par la classe `is-on`. Rows : titre de catégorie colonnes 1 à 4, lignes colonnes 5 à 12, prix à droite `tabular-nums`, filets, pas de tuiles, pas de carte dans carte.
- **Horaires** : Schedule en `<dl>` et `<time>`, filet d'encre en tête, aucun jour fermé, jour courant en phase 2.
- **Pied** : mast (nom en grand, adresse, téléphone, réseaux, crédits `data-credits`), puis KywFooter.
- **Photo** : `<div data-slot data-alt>`, WebP `width`/`height`, hero `fetchpriority="high"`, autres lazy.

## Sur-utilisation
- [x] 1. Audit lancé avec sloplint --before · preuve : `.hallmark/before.txt`
- [x] 2. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-9`
- [x] 3. Comp avant build · preuve : `.hallmark/comps/c1`, `c2`, `comp.md`
- [x] 4. sloplint src sans FAIL réel · preuve : `.logs/olv-lint2.log` (FAIL 34 faux positif, base.css porte la règle)
- [ ] 5. sloplint --render sur le build : phase 3
