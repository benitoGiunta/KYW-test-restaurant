# Gabarit « Cahier »

**Pour qui** : ferme-table et produits locaux, néo-bistrots, traiteurs, boulangeries-restaurants : toute maison qui
peut dire d'où vient chaque produit et change sa carte souvent. Référence construite : Les Potes au Feu (Namur).

**Concept** : le site est le cahier de la cuisine. Couverture kraft avec étiquette collée, pages quadrillées (CSS,
24 px), textes tapés en mono, titres en slab, annotations d'origine en bille bleue (Caveat, uniquement pour de
l'information), photos collées en timbres dentelés ou en polaroids, chaque section est une page numérotée (folio).
Signature : le menu du jour s'écrit sous les yeux (tracés SVG générés au build depuis Caveat, animés par
`stroke-dashoffset`), puis la date est tamponnée.

## Pages et sections

| Page | Sections |
|---|---|
| Accueil (couverture) | Couverture kraft (étiquette, photo collée), Menu du jour tracé + tampon, Sommaire du menu (lignes pointillées, origines), Fournisseurs (mur de 6 timbres), Carte postale des chefs (se retourne), Équipe (4 fiches inclinées), Avis en marge, Pratique (horaires, plan au trait, boutons), Dos du cahier |
| La carte | Sommaire complet 01-18 en 3 catégories avec origines, tampon « menu unique », 3 timbres, Menu du jour, Formules |
| Producteurs | Mur des 6 timbres avec notes manuscrites, « La règle du cahier », photo collée |
| Les potes (histoire) | Récit en 4 paragraphes avec lettrine, 2 portraits polaroid, tampon « depuis 2020 », équipe, valeurs en liste numérotée |
| Réserver | Boutons Zenchef / téléphone / e-mail, formulaire sans backend, horaires, plan au trait, photo |
| Commander | 3 formules traiteur et événements (illustratives), « Comment ça se passe », tampon |
| 404 | « Page arrachée », tampon « introuvable », trois retours |

## Composants

- `Header.astro` : en-tête en cellules (adresse et téléphone | nom | navigation | Réserver | Commander), fixe ;
  cellule qui s'inverse en bille au survol, cellule noire pour la page active ; mobile : nom + bouton Menu, cellules
  empilées dans un panneau (Escape ferme).
- `MenuDuJour.astro` + `Manuscrit.astro` + `lib/manuscrit.ts` : texte → tracés SVG Caveat au build (fontkitten),
  tracés à l'entrée dans l'écran (`motion/cahier.ts`), `aria-label` porte le texte.
- `Tampon.astro` : mention en capitales mono cerclées, rouge ou bille, posée avec un claquement.
- `Timbre.astro` : photo carrée à bord dentelé (`mask-image` radial répété), tournée, se redresse au survol.
- `Polaroid.astro` : photo collée à cadre blanc, légèrement tournée, légende manuscrite.
- `Sommaire.astro` : lignes `01 Plat ........ prix` avec annotation d'origine en bille ; surlignage marqueur au
  survol et au focus ; numéro cerclé quand la ligne est ciblée (`:target`).
- `Plan.astro` : plan au trait schématique (SVG), lien OpenStreetMap.
- `Footer.astro` : dos du cahier (kraft, nom en slab, contact, horaires, pages) puis `KywFooter`.
- Folios automatiques par compteur CSS (`.page-cahier` / `.folio`).

## Adapter à un autre restaurant

1. `src/data/site.ts` : les données communes (`site`) et le bloc `cahier` : numéro et saison du cahier, menu du jour
   (3 lignes, date, prix), sommaire par catégories avec `origine`, 6 producteurs (prénom, produit, village, photo,
   note), carte postale (texte à la première personne, signataire), formules traiteur, phrases d'équipe.
   Retirer les `placeholder: true` au fur et à mesure.
2. `public/photos/` : WebP ≤ 1800 px ; les timbres sont carrés (recadrage `object-fit`), les polaroids 4/3 ou 3/4.
3. `tokens.css` : palette (papier, quadrillage, bille, rouge, mine, kraft) et pas du quadrillage (`--quad`).
4. Les rotations des timbres et fiches sont dans les tableaux `rots` des pages ; les folios se numérotent seuls.

## Données exigées

Menu du jour (ou de la semaine) daté ; carte complète avec l'origine des produits principaux ; liste des producteurs
(prénom ou nom, produit, village, une photo chacun, de préférence du produit) ; portraits de l'équipe ; 6 à 10 photos
de plats et de salle ; horaires ; outil de réservation ; e-mail ; conditions traiteur et privatisation si la page
« Commander » est conservée.

## Limites

- Les tracés manuscrits n'ont pas de crénage (fontkitten n'expose que les glyphes) : lisible, un peu plus espacé que
  la police rendue par le navigateur ; les lignes très longues sont réduites (`max-height`), prévoir moins de 45 caractères.
- Le plan est un SVG schématique, pas une carte réelle.
- Pas d'animation idle : décision (un cahier posé ne bouge pas).
- Page « Commander » : formules illustratives, sans panier ni paiement (téléphone et e-mail).
