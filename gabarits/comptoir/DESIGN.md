# DESIGN — gabarit « Comptoir »

## Concept Card

- **Idée** : le site est un passe. Une surface blanche sur laquelle les assiettes arrivent une à une. Aucun décor : la
  hiérarchie vient de la graisse (200 contre 400) et de l'espace.
- **Métaphore** : le passe d'une cuisine ouverte, à midi, en silence.
- **Signature** : le dressage. Une assiette blanche vide au centre ; au scrub, cinq composants du boeuf confit (médaillons
  détourés de la vraie photo) se posent à la pince, chacun relié par un trait fin à son nom en Sentient italique.
- **Émotion** : le respect du produit. **Verbe de motion** : respire (rien ne bouge sans raison ; aucun idle, décision
  écrite : site calme).
- **Capture qui résume** : le dressage à mi-course, trois composants posés, deux légendes reliées, le reste blanc.

## Système

- **Palette** : ground `#FFFFFF`, ink `#161616`, muted `#8C8780`, line `#E6E3DD`, accent céladon rare `#9FB8A8`
  (traits d'angle, focus, barre du loader), curtain `#FFFFFF` bordé d'un filet céladon.
- **Typo** : Hanken Grotesk (Google, variable 200-400, `public/fonts/hanken-grotesk-200_400-normal.woff2`) : titres en
  capitales 200 avec tracking +0.08em, texte en 400 tracking 0. Sentient (Fontshare, 400 italique,
  `public/fonts/sentient-400-italic.woff2`) : légendes du dressage, mots d'accent, liens sur filet, citations.
- **Grille** : 12 colonnes, marge 110 px desktop (`--marge`), voie de 72 px à gauche réservée au logo vertical (`--lane`),
  images collées au bord de la voie, textes sur 4 colonnes centrés verticalement. Mobile : marge 16 px, voie 0.
- **Rythme** : très aéré (28u et plus), au plus une image par écran, jamais deux textes côte à côte.
- **Radius** : 0. **Textures** : aucune.
- **Motion language** : ease out `power3`, durées 0,6 à 1,4 s, fondus et masques de lignes ; filets dessinés par
  `scaleX` ; le dressage est le seul geste scrubbé (pin 220 %, scrub 0,8). Loader blanc : nom en 200 et barre céladon de
  1 px, sortie en fondu 0,6 s. Transition : panneau blanc bordé céladon qui monte (0,7 s) puis repart.

## Wireframes

```
HERO (asymmetric pair)                 PHRASE (statement)
|lane| [photo collée  ]   LES         |      Une phrase en 200,              |
|LOGO| [ au bord      ]   POTES       |      un mot en *Sentient*            |
| ⟂  | [              ]   AU FEU      |                                      |
                          sous-titre
DRESSAGE (sticky stage, 220 %)         LE MENU (liste)
|   carottes —  (  o   )  — cromesquis| I   Mises en bouche                  |
|               ( ( O ) ) — boeuf     | II  Légumes racines / Champignons    |
|   pousses  —  (  o   )  — jus       | …   67 € · allergies à signaler       |
|   liste texte des composants        |
LE CHEF (split 50/50)                  LA SALLE (quinconce)
| portrait N&B | gris clair : petite  | [grande photo]                       |
|              | capitale, texte,     |               [petite photo]  ⟋ ⟍   |
|              | lien sur filet ——→   |
DISTINCTIONS (bande)   RÉSERVER (formulaire soulignés)   FOOTER FINALE (nom géant 200 + KywFooter)
```

## Test de généricité

Un modèle ferait un site blanc avec de grandes photos et un serif de titre. Ici : pas de serif de titre (grotesque 200),
la seule animation est le dressage du vrai plat du restaurant, la mise en page vient du passe (image au bord, texte en
face) et le logo vertical fixe tient la page.

## Règles dures de la skill (preuves)

- [x] Loader, transition et intro personnalisés (`src/motion/setup.ts`).
- [x] Pas de récompense, chiffre ni citation inventés : la seule distinction affichée est la sélection Guide MICHELIN 2026
  (dossier.md) ; chaque donnée non prouvée porte son propre drapeau (`site.ts`) et une mention visible.
- [x] Animation sur `transform`, `opacity`, `clip-path`, `stroke-dashoffset` seulement.
- [x] UI fixe sans collision : logo vertical dans la voie `--lane`, pastille bas droite avec `padding-bottom` du body.
- [x] Reduced motion : dressage complet et légendes visibles, filets dessinés (`html:not(.motion)`).
- [x] Mobile : titres 200 à 28 px minimum, images avec marge 16 px, dressage en pin vertical 80 vw, légendes empilées.
- [x] Idle : aucun, décision écrite (site calme, cahier).
