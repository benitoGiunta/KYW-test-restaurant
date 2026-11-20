# DESIGN — Le D'Arville, variante portfolio (gabarit « Velours »)

## Choix du gabarit
Matrice (note sur 5) : positionnement gastronomique / ambiance / matière disponible / type de carte / réservation / signature. Gabarits déjà attribués écartés par la règle de répartition (`gabarits/UTILISATION.md`) quand un gabarit libre fait aussi bien.

| Gabarit | Position. | Ambiance | Matière | Carte | Résa | Signature | Total /30 | Remarque |
|---|---|---|---|---|---|---|---|---|
| velours | 5 | 4 | 4 | 4 | 5 | 5 | 27 | table gastronomique, nombres vrais, rideau |
| nocturne | 3 | 3 | 3 | 3 | 4 | 3 | 19 | déjà attribué (pepite), ambiance bar de nuit |
| ardoise | 4 | 3 | 4 | 5 | 4 | 3 | 23 | déjà attribué trois fois, bistrot |
| journee | 2 | 3 | 2 | 3 | 4 | 3 | 17 | brasserie 7 jours, faux ici |
| cahier | 2 | 3 | 3 | 3 | 4 | 4 | 19 | ferme-table à produits locaux, la maison n'a pas de producteurs documentés |
| quatre-mains | 4 | 3 | 3 | 3 | 4 | 3 | 20 | duo de chefs, ici couple d'hôtes |
| verger | 3 | 4 | 3 | 3 | 4 | 3 | 20 | déjà attribué |
| guinguette, collage, forno, braise, affiche, encre, maree, comptoir | 1 à 3 | 1 à 3 | 2 à 3 | 2 à 4 | 4 | 2 à 3 | 15 à 19 | registres incompatibles (italien, asiatique, grill, festif) |

Décision : **Velours**, libre dans `UTILISATION.md`. G&M 15/20, deux menus à prix fixe, chiffres vrais (2 menus, 73 €, 2 hôtes, 20 ans, 200 m, plus de 5 hectares). Le vert sapin rappelle la vigne qui couvre la façade, le cuivre devient l'orange brique de l'enseigne. Les photos sont de 2018, style HDR : le scrim sapin et les portraits en noir et blanc les calment.
(Mise à jour de `gabarits/UTILISATION.md` non faite : consigne d'exécution « ne touche jamais à gabarits/ », à reporter par l'orchestrateur : `| velours | le-d-arville |`.)

## Concept
La maison se raconte par ses nombres vrais, chaque chapitre est un rideau qui se lève sur un chiffre monumental (signature du gabarit conservée).
Ici : 2 menus, 73 euros, 2 hôtes, 200 mètres (Barabas), 20 ans en clôture, 5 hectares sur la page « La maison ».
Aucun nombre inventé (chaque `Chiffre` porte sa preuve dans `site.ts`). Pas de citation d'avis : le bloc citation cite la carte (le homard du vivier).

## Direction artistique
- Palette : sapin `#1b3730`, profond `#0e1512`, ivoire `#eee6d8`, accent orange brique `#d98b4a` (4,7:1 sur sapin), orange pâle `#ecc29a` pour le texte secondaire. Radius 0.
- Typo : Boska (titres, chiffres, capitales) et Source Serif 4 (corps 17 px), inchangées.
- Photos : hero = terrasse et bâtiment en briques au bord du bassin (07, note 5). Galerie et portraits en noir et blanc (grayscale sharp ou CSS). Pas de photo de personne nommée sans preuve : le portrait du chef reste anonyme dans l'alt.
- Favicon : D cerclé orange sur sapin (pas de logo vectoriel disponible). OG : hero recadré 1200x630.

## Sections
- Conservées : hero, bande des guides (G&M 15/20, Tripadvisor 4,5/5 environ 545 avis), chapitres à chiffre, bloc citation (reformulé en « plat de la maison »), onglets, galerie N&B, carte de clôture, pages carte, menus, maison, réservation, 404.
- Retirées : équipe de salle (inconnue), avis cités (aucun littéral), chapitre « 2 chefs » remplacé par « 2 hôtes ».
- Ajoutées : chapitre Barabas (200 m) et page `/barabas/` (suites, piscine, petit-déjeuner 18 €), page `/evenements/` (séminaires, traiteur de fêtes, chèque cadeau) en remplacement de « Le samedi », carte complète à la carte avec prix (`menu__ligne--prix`), mention du menu « Bon Plan » sans contenu inventé, congés 2027 en réservation.

## Routes
`/`, `/menu/` (la carte), `/carte/` (les menus), `/histoire/` (la maison), `/barabas/`, `/evenements/`, `/reservation/`, `404`.

## Placeholders
Heures d'ouverture (12:00-14:30, 19:00-21:30 : jours du site officiel, heures illustratives), texte des onglets Séminaires et Traiteur (illustratifs), nom « Chambre rouge ». E-mail, téléphone, adresse, prix, carte : prouvés par le dossier.

## Adéquation estimée : 82 %
1. Gastronomie, G&M, deux menus à prix fixe : cœur de cible du gabarit.
2. Chiffres vrais et rideau valorisent un lieu de patrimoine (ferme, domaine).
3. Hébergement et terrasse ont leur chapitre et leurs pages.
Limites : photos de 2018 (HDR), pas d'avis cités, pas de logo, heures inconnues, page Barabas mince en contenu.

## À faire (phases 2 et 3)
Motion (rideau, compteurs, onglets, curseur : déjà fournis par le gabarit, à vérifier), QA navigateur, contrôles de l'en-tête à 5 liens en 1440 et en mobile, clics réels, bas de page.
