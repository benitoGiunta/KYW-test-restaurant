# Gabarit « Forno »

**Pour qui** : pizzeria napolitaine, trattoria, table à pâtes fraîches et four à bois, boulangerie-restaurant ; tout
restaurant dont le cœur est un four et dont la carte se dit en grands noms simples.

**Concept** : le site est une fournée. Il commence dans le noir du four (brun), la pâte lève (une photo passe de la
vignette au plein écran au défilement pendant que le nom se réduit dans le coin), le marquee crie les noms des services
en capitales géantes, puis la farine (crème) prend tout l'écran pour la carte. Un compte à rebours du prochain service,
calculé depuis les horaires réels, bat dans l'en-tête et devient « c'est ouvert » pendant le service.

## Pages et sections
- **Accueil** : hero poster brun (nom géant, accroche, photo collée en bas, tout peint au premier rendu) · manifeste
  (phrase du restaurant, deux mots-liens soulignés épais) · la levée (scène collante 350 svh, photo 320 px → plein
  écran, titre 20 vw → 4 vw, marquee à deux lignes en sens inverse lié à la vélocité) · le menu (catalogue des services
  réels : vignette ronde ou disque chiffré, nom gras, description italique, prix) · en cuisine (mur de 5 photos en
  asymétrie, parallaxe différenciée) · les gens (carrousel qui déborde à droite, flèches rondes) · bande de service
  tomate (horaires regroupés, réserver, téléphone) · avis (un réel, deux exemples marqués) · pied de page en couches.
- **Carte** : hero court, trois catégories en fiches avec en-tête à compteur, formules sur fond brun.
- **Pâtes fraîches** (page d'exemple) : bandeau d'exemple peint sans JS, 3 catégories × 4 produits en disques
  typographiques, aucun CTA de réservation.
- **Histoire** : quatre paragraphes réels, portraits en escalier, carrousel de l'équipe, valeurs et galerie sur brun.
- **À emporter** (page d'exemple) : bandeau d'exemple, horaires de fournées illustratifs, téléphone réel, aucun CTA.
- **Réservation** : bouton vers l'outil réel, téléphone, formulaire de démonstration (récapitule la saisie, puis renvoie vers l'outil réel ou le téléphone ; à remplacer par le widget de l'outil ou à supprimer à l'adaptation), horaires, itinéraire.
- **404** : « Four éteint ».

## Composants
`Header.astro` (en-tête fixe opaque qui prend la couleur de la zone sous lui, compte à rebours `.compte`),
`Loader.astro` (four tracé par `stroke-dashoffset`), `Fiche.astro` (fiche catalogue : photo ronde ou disque, nom,
description, prix, étiquette, drapeau), `Footer.astro` (nom géant farine sur brun, photo qui glisse par-dessous,
colonnes, `KywFooter`), sections `.levee` (variable CSS `--p` scrubée), `.marquee`, `.mur`, `.gens`, `.bande`,
`.bandeau` (page d'exemple), `.cat`/`.cat__head` (en-tête à compteur), `.souligne` (mot-lien épais).

## Jetons
Brun four `#2B1E19`, farine `#F3EDE2`, tomate `#C6362A` (seule couleur chaude), croûte `#B98558`, cendre `#8E8A84`.
Big Shoulders Display 800 (titres, marquee, chiffres) et Erode 400/500 + italiques (texte). Radius 0, sauf la carte
du compte à rebours (12 px). Texture unique : poudre de farine sur le brun.

## Données exigées à l'adaptation
- Nom en deux lignes (`nomLignes`), accroche, horaires par jour (ils pilotent le compte à rebours et la bande de service).
- Carte réelle par catégorie avec prix ; une photo carrée par plat vedette (vignettes rondes), une photo de pâte, de
  four ou de mains pour la levée, une photo de plat pour le bas du hero (960 px).
- Catalogue de pizzas ou de pâtes (12 produits, prix, description) pour la page catalogue ; sinon elle reste marquée.
- Horaires de fournées ou de retrait pour la page « à emporter » ; sinon elle reste marquée.
- 4 personnes (prénom, rôle, photo 3:4) ; 5 photos de cuisine pour le mur ; une phrase de manifeste à deux mots-liens.

## Limites
- Le restaurant de référence n'a pas de four à pizza : la levée montre ses mains dans la pâte, le marquee ses services ;
  pâtes fraîches et fournées sont illustratives et marquées à l'endroit où elles s'affichent.
- Le compte à rebours dépend de l'horloge et du fuseau du visiteur et de `site.horaires` : pas de jours fériés ni de
  fermetures exceptionnelles, et un visiteur hors Belgique voit une heure décalée. Sans JS, la carte affiche « Réserver
  une table » (chiffres masqués par `hidden`) et renvoie vers la réservation.
- Compteurs du menu : `services` de la catégorie (4) ; mises en bouche, mignardise et suppléments portent `horsService`
  (pas de numéro, pas de disque). Les formules ne comptent pas le bon cadeau (`horsFormule`).
- Un seul marquee par site (accueil) ; en mobile il passe à une ligne, la levée va de 70 vw à 100 vw.
- Le loader est masqué en mobile (l'accroche est peinte au premier rendu).
