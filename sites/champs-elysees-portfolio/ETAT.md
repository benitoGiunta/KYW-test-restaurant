# ETAT champs-elysees-portfolio, passe construction-1 (phase 1 sur 3), 20/11/2026

## Fait
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
