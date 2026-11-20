# ETAT champs-elysees-portfolio, passe construction-3 (phase 3 sur 3, QA), 20/11/2026

## Phase 3 : fait
- Lu QA-build.md et les captures (accueil desktop 1440 et mobile 390, current vs dist).
- Corrigé : noms de plats écrasés à une lettre par ligne sur mobile (prix longs) ; parapluie du manifeste sur le titre mobile. Vérifié par captures ciblées 390 (accueil #menu, #manifeste, /carte/) : scrollWidth 390, 0 erreur console.
- Build final OK, 6 pages. RAPPORT.md écrit. Serveur arrêté.

## Reste
- Session mère : `gabarits/UTILISATION.md` (ligne guinguette | champs-elysees), `pnpm index`, publication.
- Anciens blocs ci-dessous : phases 2 et 1.

# Phase 2 (construction-2)

(Phase 1 : voir plus bas, inchangée.)

## Phase 2 (construction-2) : fait
- Build OK (`pnpm build:site`), 6 pages. Contrôles Playwright maison (1440 et 390, 5 pages) : zéro erreur console, aucun débordement horizontal (`scrollWidth` = largeur), mention Maquette KYW et pied KYW visibles en bas de page, clics réels sur les 7 liens d'en-tête : tous bien ciblés.
- **La table (signature)** : le titre « La table du bistro » était caché sous les 12 tirages ; il est maintenant au-dessus de la scène (statique, z-index 3), scène `max(100svh, 46rem)`.
- **États ajoutés** : dès le premier geste (souris, tactile ou flèches) le badge « attrapez-moi » s'efface et un bouton « Remettre la table » apparaît (retour de tous les tirages et objets à leur place, `back.out`, durée 0 en reduced motion ; mesuré : transform ramené à 0,0). Classes `.table__reset`, `.badge.is-vu`.
- **Mobile** : débordement de viewport en émulation (396 à 404 px sur carte, histoire, terrasse) corrigé : `.grille-photos` en `overflow-x: clip` + `padding-inline: 1.25rem` ; `min-width: 0` sur la grille de carte et `overflow-wrap: anywhere` sur `.plat__nom` ; objets du hero bornés à la largeur (`min(…, 100% - taille)`).
- Marquee d'état : jour et heure calculés en `Europe/Brussels` (`Intl`), plus l'heure locale du visiteur.
- Lien d'évitement : complètement hors écran au repos (une bande de 5 px dépassait en 1440).
- Reduced motion (émulé) : objets posés, tirages saisissables, aucun texte caché hors badge effacé, aucune erreur ; clavier : flèches déplacent un tirage.
- Contrastes calculés : encre sur orange 6,9:1 ; orange encre sur lin 4,96:1 et sur blanc 5,73:1 ; lin sur canard 8,5:1 ; paille sur canard 7,3:1 ; lin ou blanc sur orange 2,1 à 2,5:1 (jamais utilisé : les bandes orange portent du texte encre).

## Reste (phase 3)
- Orange encre sur paille = 4,23:1 : vérifier qu'aucun texte courant n'est posé ainsi (seulement badges grands corps) ; orange pur sur canard = 4,0:1 (grands corps seulement).
- Shoot complet et audit par l'agent captures, puis relecture de la planche : table (1440) après drag, bas de page, mobile rail.
- Wording : relire libellés d'objets du hero, vérifier U+00A0 dans « », pas de tiret cadratin.
- Recadrage éventuel des carrés 640 (façade, menu) ; RAPPORT.md ; `gabarits/UTILISATION.md` (ligne `guinguette | champs-elysees`, à faire par la session mère).
- `kyw-signature` : le sélecteur `.kyw-signature` ne trouve rien dans le DOM (l'image s'appelle `kyw-signature-720.webp`) : faux négatif de mon script, le logo est bien visible dans la capture du bas de page.

## Pièges (phase 2)
- Le viewport mobile s'élargit sans qu'aucun élément non clippé ne dépasse : bisecter par `<style>` injecté via `page.route` (cf. leçon li-micougni) ; ici la cause était la grille de photos inclinées.
- Ne pas cliquer le bouton reset avec Playwright pour mesurer une position : il fait défiler la page ; lire le `transform`.

## Phase 1 : fait
- Gabarit Guinguette choisi (matrice dans DESIGN.md), copié, renommé `champs-elysees-portfolio`, build OK (6 pages : accueil, carte, histoire, terrasse, reservation, 404), dist dans `dist/champs-elysees/portfolio/`.
- `src/data/site.ts` réécrit depuis `donnees.json` : carte complète (15 catégories, 94 lignes), horaires 7/7, e-mail et téléphone, Zenchef, histoire 1984, Maurice et Teresa, presse La DH, menu des fêtes patronales. Aucun contenu inventé : avis, équipe illustrative, emporter, privatisation, carte d'exemple retirés.
- Photos : 12 photos + 2 mascottes en WebP dans `public/photos/`, carrés 640 px dans `public/photos/v/` (anciennes `s/` supprimées), og.jpg (mascotte), favicon SVG.
- Palette du site actuel (crème, orange abricot, vert forêt) dans `tokens.css` ; noms de jetons inchangés.
- Pages adaptées : accueil (hero « Plaisir et partage », maison 1984, table de 12 tirages, extrait de carte, presse, manifeste, horaires), carte (À manger / À boire / groupes), histoire, terrasse et fêtes, réservation (+ e-mail, groupes > 10 par téléphone). Page « À emporter » supprimée, nav mise à jour.
- Contrôle : noindex, mention Maquette KYW, un seul `kyw-signature`, aucune img sans alt sur les 5 pages.

## Reste (phases 2 et 3)
- Mesurer les contrastes de la palette (texte blanc ou crème sur orange `#F08A3C`, `--c-corail-ink`) ; ajuster si < 4,5:1 (3:1 grands corps).
- Motion : `setup.ts` et textes de l'engine inchangés ; vérifier hero, table, badge « attrapez-moi », loader (titre, libellés) ; QA navigateur, mobile, clics réels sur l'en-tête, bas de page en 1440 (leçon intégrée du prompt).
- Wording : libellés d'objets du hero, section manifeste, vérifier typographie française (U+00A0 dans « »), pas de tiret cadratin.
- Éventuel recadrage des carrés 640 (position 'attention') sur façade et menu ; la photo `salle-tables` (paysage 1800 px) n'est utilisée que dans la galerie histoire.
- RAPPORT.md (placeholders : aucun `placeholder: true` posé, tout est prouvé ou retiré), shoot/audit par l'agent captures.
- `gabarits/UTILISATION.md` : ajouter la ligne `guinguette | champs-elysees` (non fait : consigne « ne touche jamais à gabarits/ »).

## Décisions et hypothèses
- Code postal 5100 Jambes (restaurants.json, cohérent avec Jambes) ; dossier signale 5000/5100 à confirmer. Commune affichée « Jambes (Namur) ».
- Instagram non affiché (URL non vérifiée) ; Facebook de la page « Brasserie Les Champs Élysées ». Note Google 4/5 non reprise (tiers).
- « Viandard » de la carte renommé « Viandes » ; « (extrait) » retiré du titre des bières en bouteille ; millésime de carte (PDF 2024) signalé en bas de /carte/.
- Terrasse affirmée seulement comme « donne sur l'avenue » (photos et dossier) ; nombre de places non communiqué.
- Le mot de passe wifi du PDF n'est pas repris. Les moules (photo 08) ne sont pas nommées en dehors de l'alt (sujet de l'index).
- Route `/terrasse/` conservée pour « Terrasse et fêtes patronales ».
