# Gabarit « Verger »

**Pour qui** : tables de saison, ferme-table, cuisine végétale ou locavore ; tout restaurant dont la carte tourne avec
les produits et qui veut montrer d'où ils viennent.

**Concept** : la page est un calendrier agricole. Une roue des 12 mois tourne au scroll ; le mois courant (horloge du
visiteur, jamais une date en dur) est en haut, son secteur est encré en vert ; les plats de la carte s'y accrochent par
leurs ingrédients. Axe central strict, vignettes carrées, mots empilés en condensée légère, encre vert feuille, rose radis
pour le mois courant.

## Pages et sections
- **Accueil** : hero poster (mots empilés, vignette carrée, étiquette du mois) · citation + paragraphe en escalier · roue
  des saisons (pin 300 % desktop / 200 % mobile, 24 vignettes, 4 plats du mois, 12 boutons de mois) · carte du mois
  (menu réel, pastille mois) · paires asymétriques salle / origine (clip-path « pousse ») · FAQ accordéon · bande réserver
  (bouton pleine largeur vert, horaires) · pied de page finale (branche du mois).
- **Carte** : hero mots empilés, catégories en liste 560, prix, formules, deux vignettes en escalier.
- **Saisons** : archive des 4 saisons, ingrédients en étiquettes et exemple de carte par saison (marqués).
- **Producteurs** : index (nom, village, km, produit) avec bandeau « illustratif » et marque « exemple » par ligne ;
  démonstration de l'étiquette d'origine.
- **Histoire** : paragraphes et portraits en escalier, équipe en vignettes, galerie 6 photos.
- **Réservation** : bouton pleine largeur vers l'outil réel, téléphone, formulaire de démonstration, horaires.
- **404**.

## Composants
`Roue.astro` (SVG 12 secteurs + vignettes HTML, une variable CSS `--rot`), `Mois.astro` (mois courant par CSS depuis
`html[data-mois]`, « de saison » sans JS), `Branche.astro` (12 feuilles, courante en rose ; sert aussi de loader),
étiquette d'origine (`.etiquette`), mots empilés (`.mots`), escalier (`.escalier`), paire asymétrique (`.paire`), FAQ
(`details name="faq"`), bouton pleine largeur (`.btn--plein`), index producteurs (`.index`), vignette typographique.

## Données exigées à l'adaptation
- Carte réelle par catégorie (noms, prix) ; une photo de plat carrée pour le hero.
- Producteurs réels : nom, village, distance, produit (sinon la page reste marquée illustrative).
- Calendrier des produits du restaurant (24 ingrédients avec leurs mois) et, idéalement, macros d'ingrédients pour les
  vignettes (le gabarit les affiche en typographie).
- Réponses aux questions fréquentes (enfants, parking…).

## Limites
- Les vignettes d'ingrédients sont typographiques, pas photographiques (aucune photo libre cohérente identifiée).
- Les 4 cartes de saison sont des exemples ; seule la carte en cours est réelle.
- Le mois courant dépend de l'horloge du visiteur ; sans JS, l'étiquette affiche « de saison » et la roue reste sur janvier.

Aperçu : `apercu.png`.
