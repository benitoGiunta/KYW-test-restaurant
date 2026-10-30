# Fiche gabarit « Quatre mains »

Aperçu : `apercu.png` (hero desktop). Démo : `dist/gabarits/quatre-mains/`.

## Pour qui

Un duo de chefs ou d'associés, une bistronomie, ou un lieu à deux activités (restaurant + bar, cave + table,
restaurant + scène). Le site a besoin de **deux voix** : sans duo, le diptyque n'a pas de raison d'être.

## Concept

La page est un diptyque : colonne gauche vert bouteille (première voix), colonne droite moutarde (seconde voix). La
frontière verticale est pilotée par chapitre (`data-voix="deux|gauche|droite|commune|finale"`) : elle glisse pour
« donner la parole » à l'un ou à l'autre et se cache sous le papier des sections communes. Le nom du restaurant est
coupé net par la frontière ; au repos, elle respire et suit le pointeur.

## Pages et sections

| Page | Sections |
| --- | --- |
| Accueil | hero (nom coupé, deux portraits) ; parcours de la voix 1 (gauche) ; parcours de la voix 2 (droite) ; la rencontre (commune) ; carte à quatre mains (liste 01-08 + stage) ; salle et bar (full-bleed) ; avis (diptyque) ; réserver (bande commune) ; footer finale |
| La carte | hero diptyque soir / midi ; menu du soir (gauche) ; formules du midi (droite) ; formules, boissons, bon cadeau (commune) |
| Les deux chefs | hero deux portraits ; voix 1 (bio, citation, chronologie, photo) ; voix 2 ; ensemble (commune) |
| Notre histoire | hero ; la rencontre (statement) ; deux chronologies ; équipe (4) ; coulisses (galerie N&B / couleur) |
| Réservation | bande commune (bouton large, téléphone, horaires) ; formulaire de démonstration + privatisation |
| 404 | nom coupé + diptyque |

## Composants

- `NomCoupe` : deux copies clipées par `--split` ; mobile : deux lignes bicolores (`site.nomCoupe`).
- `Header` : coupé par la frontière (copie + écho inert) ; burger sous 768 px.
- Frontière : `#fond` fixe (vert / moutarde / ligne), pilotée par `motion/diptyque.ts` (`--split`, `--split-dx`).
- Liste à stage : `[data-stage-for]` + `[data-stage]` (crossfade 0,4 s, tag chef, focus clavier).
- Boutons à label roulant (`.roll`), liens soulignés depuis le centre (`.lien`), photos N&B qui reprennent leurs
  couleurs au survol (`.photo--nb`).
- Loader « la ligne puis les deux couleurs », rideau en deux panneaux qui se rejoignent.

## Données exigées

Dans `src/data/site.ts` : `nomCoupe` (nom en deux lignes), `chefs` (deux voix : prénom, registre, portrait 4:5,
bio, parcours de 5 étapes, citation, plats fétiches), `carteQuatreMains` (8 plats taggés D/F avec photo),
`carte` (soir / midi / commun), `menus`, `menuDuJour`, `equipe` (3 à 4), `avis` (2 minimum), `galerie` (8 à 12).
Toute donnée fictive est marquée `placeholder: true` et affichée avec la mention « illustratif ».

## Limites

- Les deux colonnes s'adressent à un duo : pour un chef seul, choisir un autre gabarit.
- Les sections « gauche » / « droite » ne doivent contenir du texte que dans la colonne de la voix qui parle
  (l'autre colonne porte une photo) : un paragraphe coupé par la frontière deviendrait illisible.
- Pas de WebGL ; le site tient en CSS + GSAP. Formulaire sans backend (renvoie vers l'outil de réservation réel).
