# Pizzeria Doria, variante awwwards : « Casiers »

## Brief
- **Sujet** : Pizzeria Doria, pizzeria-trattoria familiale de quartier, Rue Fond de Malonne 66, 5020 Malonne (Namur). Ouverte en octobre 2017, gérée par Rocco et Luigi, installée depuis mai 2023 dans une ancienne banque restaurée : on mange dans la « salle des coffres ».
- **Publics** : le midi (écoles, travailleurs, cornets de pâtes et paninis), le soir (familles, couples, pizza et pâtes), les habitués de Malonne, les visiteurs de Namur qui cherchent « la pizzeria dans l'ancienne banque ».
- **Métier du site** : réserver (téléphone, e-mail), venir (adresse, heures), lire la carte (181 lignes). Tout en trois secondes.
- **Ressources** : 4 photos du client (salle des coffres, friture, assiette de roquette, cadre de bouchons), logo noir et blanc à filet tricolore, carte complète avec prix. Pas de photo de pizza du client : 3 photos libres Unsplash marquées illustratives.
- **Contraintes** : statique (Astro), servi sous `base` `/pizzeria-doria/awwwards/`, pas de backend de réservation, pas d'avis ni de notes (non affichés par le client).
- **Hypothèses** : adresse du site client (Tripadvisor dit 95, non retenu) ; le lien pizzy.be est la commande à emporter, pas une réservation ; « cuisine fermée dès 21 h » du site est contradictoire avec les heures d'ouverture, non affiché ; aucun fait inventé, voir RAPPORT (phase 3).

## Trois concepts
| | A. Casiers (lieu, matière) | B. Filet (nom, identité) | C. Deux services (formel) |
|---|---|---|---|
| Phrase | Doria est restée une banque : la carte est un mur de tiroirs numérotés, on tire un tiroir et la carte sort. | Le filet vert, blanc, rouge du logo est la règle du site : chaque section commence sur le filet. | La page se coupe en deux services, midi clair et soir sombre, comme les deux plages d'ouverture. |
| Règle de mise en page | Rangées pleine largeur, plaque numérotée à gauche, poignée à droite | Bandes horizontales de trois couleurs | Deux demi-pages alternées |
| Verbe | coulisser | tracer | basculer |
| Voix typo | condensée gravée, plaques | script du logo + grotesque | grotesque neutre |
| Palette | acier, noir du logo, rouge du filet | tricolore | jour / nuit |
| Signature | le tiroir coulisse (hauteur + poignée) et la carte apparaît dedans | le filet se trace à chaque transition | la page bascule de clair à sombre au scroll |
| Ancre | la salle des coffres, ancienne banque (mai 2023) | le logo à filet tricolore | les horaires midi et soir |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 1 | 3 / 4 / 4 / 3 | 3 / 3 / 4 / 4 |

**Choix : A.** Test de l'échange : « la carte est un mur de tiroirs de coffre » ne tient avec aucun autre restaurant namurois, parce qu'elle dépend d'une salle des coffres réelle. Emprunt à B pour le pied (filet tricolore au-dessus du pied) ; C est écarté (basculer jour/nuit tient dans un hero, pas dans la carte). Aucun exemple travaillé de concepts.md n'est repris : la carte n'est pas un pavage (rangées pleine largeur à tiroir ouvrant), il n'y a pas de braise, de cadre ni de solde.

## Concept Card
- **Idée** : la carte de la Doria est rangée dans des casiers numérotés de salle des coffres : chaque catégorie est un tiroir que l'on tire.
- **Métaphore** : la banque restaurée de Malonne, ses casiers à plaque de numéro et à poignée.
- **Signature (et recette)** : le tiroir qui coulisse, `<details>` natif, ouverture animée en hauteur et poignée qui s'allonge (motion.md, accordéon), reprise en transition de page par deux volets de coffre. Phase 2.
- **Émotion (3 premières secondes)** : un lieu inattendu et précis, froid comme l'acier, chauffé par un seul rouge ; on lit « Pizzeria Doria, Malonne » puis la salle des coffres.
- **Verbe** : coulisser, puis verrouiller d'un cran.
- **Capture** : la rangée « 01 PIZZAS » ouverte, plaque noire et poignée rouge, les prix alignés en colonne.
- **Ancre** : la salle des coffres, ancienne banque, mai 2023 (donnees.json, histoire).
- **Théâtre** : loader non (un restaurant se lit en 3 secondes, le loader retarderait l'appel et la carte) ; GL non (le concept est de l'acier et du texte, une mise en page suffit ; un shader ne servirait que de décor).

## Système
- **Palette** (références : l'acier brossé des casiers de la photo « salle des coffres », le noir et le filet du logo) : ground `#d6d8d3` acier (ink 13:1) ; ink `#111312` ; muted `#474d4a` (5,6:1) ; line `#9ca19d` ; accent `#b3261e` rouge du filet (4,9:1 sur ground) ; curtain `#111312`. Intérieur de coffre : fond `#111312`, texte `#e4e5e0`, accent éclairci `#ee6a5c` (6,3:1). Vert `#1f6b3a` seulement dans le filet du pied. Pas de crème ni de terracotta : l'acier n'est pas le défaut n° 1.
- **Typo** : Barlow Condensed 700 (display, capitales, interlettrage -0,012em, interligne 0,84 à 0,94) et Barlow 400 et 600 (texte et UI), Google Fonts, auto-hébergées (`public/fonts`, 3 fichiers, 2 préchargés). Le script du logo ne sert que dans le logo (image). Échelle fluide `--t-mega` à `--t-xs` (tokens.css), corps 17 à 19 px, interligne 1,5, mesure 34 à 60 car., UI 13 à 15 px, prix `tabular-nums`, insécables dans « 9,50 € », « 12 h 00 » et le téléphone, apostrophes typographiques.
- **Grille** : 12 colonnes, gouttière fluide, deux lignes fortes (bord gauche et colonne 7 ou 9), 3 humeurs d'espacement (`--serre`, `--normal`, `--aere`). Rayon unique 2 px (plaques, photos), le reste à angle droit comme l'acier.
- **Mouvement (à implémenter en phase 2)** : easing `ease.out` pour l'ouverture, `ease.inOut` pour les volets ; durées 0,5 à 0,7 s ; hovers en 3 rôles : CTA (inversion pleine du bouton), rangées et plaques (fond plaque + poignée qui s'allonge), liens texte (soulignement et accent) ; état de repos : un cran de poignée qui respire sur la rangée du tiroir ouvert, ou immobilité motivée (une carte se lit).
- **Composition** : accueil = poster (titre mega + photo portrait) / index (mur de six rangées) / statement (phrase pleine largeur) / paire sombre (suggestions) / données (heures + midis) / média plein cadre (vins) / pied. Carte = en-tête + plaques d'index / liste de tiroirs / paire. Histoire = récit + équipe / paire. Réservation = deux colonnes (appel, e-mail, heures, venir). 404 = « Ce casier est vide. » Mobile 390 : titre re-réglé (22 vw), rangées sur deux lignes (nom puis méta), bandes en colonne, boutons pleine largeur.
- **Test de généricité** : un modèle générique atterrirait sur crème, serif, terracotta et photo de pizza en hero ; ici l'acier, la condensée gravée, le tiroir et la salle des coffres en hero. Changé : le hero ne montre pas de pizza mais le lieu (la seule photo propre au client qui ne ressemble à aucune autre).

## Sur-utilisation de la skill (phase 1)
1. [x] Trois concepts de trois territoires, notés, ancres, test de l'échange (tableau ci-dessus).
2. [x] Aucun exemple travaillé repris (§ Choix).
3. [x] Concept Card au format exact, verbe « coulisser ».
4. [x] Concept au pied (filet tricolore et « À table dans le coffre. », `Footer.astro`), à la carte (`carte.astro`, `.tiroir`), à la réservation (« Par téléphone / Par e-mail », rangs `heures__liste`), à la 404 (`404.astro`, « Ce casier est vide. »).
5. [x] Un moment signature et sa recette (tiroir qui coulisse, accordéon motion.md) : structure posée (`<details class="tiroir">`), animation en phase 2.
6. [x] Palette 4 à 6 rôles, références nommées (§ Système).
7. [x] Aucun des 8 défauts (crème, acide sur noir, dégradé violet, verre dépoli, eyebrow, 01/02/03 décoratifs, polices réflexes) : les numéros de plaque sont fonctionnels (numéro de casier lié à l'ancre `#pizzas`) ; pas d'eyebrow ; polices Barlow.
8. [x] Test de généricité fait (§ Système).
9. [ ] « Détails 7 à 8 » : sélection `::selection` rouge et focus dans l'accent (`site.css` l.7-8), favicon de l'identité (`public/favicon.svg`, plaque D et filet), OG composée depuis le hero (`public/og.png`), pied composition finale, 404 dans le concept : faits ; reste à vérifier par QA en phase 3.
10. [x] Polices : 3 fichiers `public/fonts/`, 2 préchargés dans `Base.astro`.
11. [x] Échelle fluide unique `tokens.css` (`--t-mega` 20 rem à `--t-xs`), grands sauts titre/corps.
12. [x] Display réglé : `.display` (interlettrage négatif, interligne 0,92, `text-wrap: balance`, capitales).
13. [x] Corps 17 à 19 px, UI 13 à 15 px, AA par calcul (muted 5,6:1, accent 4,9:1).
14. [x] Typographie française : insécables dans `eur()` et `heure()` de `site.ts`, apostrophes ’, aucune ligne avec tiret long.
15. [x] Grille 12 colonnes, bords gauche et colonnes 7 ou 9 comme lignes fortes ; cadre quatre coins non retenu (le concept est l'alignement en rangées pleines largeur, ligne noire de 2 px en haut et en bas du mur).
16. [x] Une famille de section au plus une fois par page (accueil : poster, index, statement, paire sombre, données, plein cadre).
17. [x] Hero en 3 secondes : mesure Playwright, h1 bas à y 465 et CTA à y 727 à 1440×900, y 676 à 1280×720 (`.logs/doria-mesure.log`).
18. [x] Mobile 390 recomposé : titre 22 vw, rangées empilées, boutons pleins, `scrollWidth` 390 sur les 4 pages (`.logs/doria-mesure.log`).
