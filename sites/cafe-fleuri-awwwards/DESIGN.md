# DESIGN.md : Café Fleuri, variante awwwards « Le trop-plein »

## Brief
- Sujet : café-brunch de Namur, rue des Fossés Fleuris 38, ouvert en 2020 comme second lieu du Bistro Bisou (info-lux). Brunch salé, sucré, mixte ; gravlax, pancakes, granola, limonades et thé glacé maison ; mardi, boisson offerte aux étudiants.
- Publics : brunch du matin et de midi, étudiants (mardi), touristes du centre historique, habitués. Métier du site : réserver (tel), venir (adresse, plan), lire la carte.
- Ressources : aucune photo (site officiel bloqué, 403), pas d'équipe, pas de prix de plats, horaires contradictoires. Contraintes : statique, `base` /cafe-fleuri/awwwards/.
- Hypothèses : statut « probablement fermé » du dossier ignoré pour la maquette (voir RAPPORT.md) ; horaires 9 h à 14 h 30 (placeholder) ; téléphone 081 65 89 15 ; e-mail à confirmer.

## Trois concepts (trois territoires)
| # | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. |
|---|---|---|---|---|---|---|
| A | « Fossé fleuri » : le site est une plaque de rue en pierre bleue, des fossés plantés | Lieu (rue des Fossés Fleuris) | 3 | 4 | 4 | 3 |
| B | **« Le trop-plein »** : le café est né parce que la salle du Bisou débordait ; tout dépasse un peu de son cadre | Histoire / process | 4 | 5 | 4 | 1 |
| C | « Salé / sucré / mixte » : page coupée en deux encres dont le recouvrement est le mixte | Système formel | 3 | 4 | 5 | 3 |

Ancres : A, adresse et nom de rue ; B, « les brunchs du Bisou étaient trop demandés » (info-lux) ; C, les trois formules. Test de l'échange : B ne tient pas avec un autre restaurant (portabilité 1). Choix : B, meilleure adéquation et portabilité la plus basse. Détails volés : A fournit la 404 (plaque en pierre bleue) ; C fournit la paire de couleurs (aneth salé, framboise sucré) et les assiettes qui se recouvrent.

## Concept Card
```
Idée:        Un café-brunch né parce qu'une salle ne suffisait plus : sur le site, tout dépasse un peu de son cadre.
Métaphore:   La salle trop pleine, l'assiette qui déborde, la rue entre le 38 et le 44-46.
Signature:   Le débordement : une « rue » (trait vertical à 2/3) que chaque section franchit avec un élément (mot, assiette, pastille, « 38 »). Recette motion.md : mot qui glisse par-dessus le trait en spring, plus marquee lent au repos (phase 2).
Émotion:     Gourmande et vive, légèrement trop pleine, en 3 secondes.
Verbe:       Déborder (dépasser le trait, puis se poser).
Capture:     « Café » puis « Fleuri » en framboise, qui franchit la rue, au-dessus de deux assiettes qui se recouvrent.
Ancre:       Ouvert en 2020 parce que les brunchs du Bistro Bisou (44-46) étaient trop demandés (info-lux, à confirmer).
Théâtre:     Loader non (un café, pas d'ouverture de rideau, l'accueil doit répondre en 3 s). GL non (aucune photo à déformer ; aplats et type suffisent). Transition : rideau framboise qui entre par la droite.
```

## Système
- Palette (rôles) : ground `#f6e4e1` lait de limonade framboise ; ink `#2b1022` prune noire (14,3:1) ; muted `#6a4659` (6,5:1) ; line `#ddbfc0` ; accent `#be1240` framboise (5,1:1) ; aneth `#2d5030` (7,4:1) et `#6fa070` aplat ; curtain `#be1240` ; salle : texte `#e7b9c6`, accent `#ff7a98` sur prune. Références : limonade framboise maison, aneth du gravlax, prune de la confiture ; plaque 404 pierre bleue de Namur `#2e4a62`. Défaut n° 1 (crème, serif contrasté, terracotta) évité : fond rosé, framboise froide, vert aneth.
- Typo : Gambarino 400 (display, Fontshare, interlettrage -0,035em, interligne 0,84 à 0,9, `text-wrap: balance`) ; Switzer 400/500/700 (corps 16 à 18 px, UI 13 à 14 px). Échelle fluide `--t-mega` (16vw, max 17rem) à `--t-xs`, sauts x2. Prix `tabular-nums`, insécables « 21,95 € », « 9 h à 14 h 30 », apostrophes courbes.
- Grille : 12 colonnes (une colonne sur téléphone), gutter fluide, ligne forte unique : la rue à 66,667 % (82 % au téléphone). Quatre humeurs d'espace (`--serre`, `--normal`, `--aere`, `--entracte`). Rayon 0, sauf cercles des assiettes.
- Mouvement (à construire en phase 2) : famille `ease.out/inOut/spring` ; hovers : CTA = bloc prune qui déborde de gauche à droite (fait), nav = soulignement qui se trace (fait), lignes d'index = le nom glisse de deux gouttières vers la droite, par-dessus la rue (fait), liens texte = soulignement qui s'épaissit (fait). Repos : défilement lent d'une bande de mots (phase 2) et assiettes qui dérivent de quelques pixels.
- Plan de composition (familles) : accueil = poster (hero), énoncé, index (trois brunchs), mur 2x2 sur prune, bandeau plein cadre framboise (pastille « Mardi » qui déborde), pied (« 38 » géant). Carte = tête, index, paires décalées, bloc de données (tarifs). Histoire = frise, paire décalée, bandeau. Réservation = contact + horaires/infos en paire.
```
Hero 1440:  Café                        | Né en 2020... [Réserver]
                    Fleuri (franchit)   |
            (assiette framboise)(assiette aneth, multiply, de part et d'autre de la rue)
```
- Mobile 390 : titre 90 px, « Fleuri » décalé pour franchir la rue (82 %), lead et CTA sous le titre, assiettes en rang, tout en une colonne, textes limités à 17,5 rem à gauche de la rue.
- Test de généricité : un modèle atterrirait sur hero photo plein cadre + cartes de plats ; changé en poster typo, assiettes recouvertes, pied « 38 ». Un modèle mettrait aussi une grille d'avis : aucun avis cité, seulement une note avec source.

## Sur-utilisation de la skill (phase 1)
1. [x] Trois concepts, trois territoires, notés, ancres, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé (pas de braise, pavage, gril, cadre, solde, phrase unique).
3. [x] Concept Card au format exact, verbe « Déborder » : § Concept Card.
4. [x] Concept au pied (« 38 » franchit la rue : `site.css` `.pied__38`), à la carte (`.idx`, nom qui glisse), à la réservation (CTA et rue), à la 404 (« Complet : cette page n'existe pas », `404.astro`).
5. [x] Moment signature et recette : le débordement de la rue (motion.md, phase 2).
6. [x] Palette 4 à 6 rôles, références réelles : § Système, `tokens.css:14-26`.
7. [x] Défauts évités : crème/terracotta, acide sur noir, dégradés violets, verre dépoli, eyebrow répété, 01/02/03, Inter/Fraunces/Instrument/Playfair : aucun (un seul dégradé dur 50/50 pour « Mixte »).
8. [x] Test de généricité : § Système.
9. [~] Détails 7 à 8 : sélection framboise (`site.css:3`), focus accent (engine.css), favicon (deux assiettes, `public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied composition « 38 », 404 plaque ; reste à vérifier en phase 3.
10. [x] Polices : Gambarino 400, Switzer 400/500/700 (4 fichiers, 2 préchargés : `Base.astro`).
11. [x] Échelle fluide unique `tokens.css:28-34`. 12. [x] Display réglé (`.display`, `site.css:5`). 13. [x] Corps 16 à 18 px, UI 13 à 14 px.
14. [x] Typographie française : insécables, apostrophes courbes, « œ ».
15. [x] Grille 12 colonnes, une ligne forte (la rue), cadre quatre coins remplacé par la rue (justifié par le concept).
16. [x] Familles de section au plus une fois par page.
17. [x] Hero en 3 s : nom, café-brunch, CTA « Réserver une table » au-dessus de la flottaison à 1440x900, 1280x720, 1024x768, 390x844 (mesure Playwright, CTA top 323, 308, 605, 432).
18. [x] Mobile 390 recomposé (capture planche, `site.css` @media 760).
