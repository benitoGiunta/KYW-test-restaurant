# INCORЯECT, variante awwwards : « Le demi-tour »

## Brief
- Sujet : INCORЯECT, pizzeria rock-n-roll d'Alex et Estelle, rue Haute Marcelle 35, Namur. Pizza au levain créative, pâte reposée 48 h (Le Fooding), farine Bodson (L'Avenir), bières craft, cuisine très végétale.
- Publics : le soir (cœur de l'activité), samedi midi, curieux venus de la presse (L'Avenir, ELLE, Le Fooding), habitués. Métier : réserver (Barestho), appeler, lire la carte (le PDF du site actuel est le point faible).
- Ressources : 3 photos exploitables (salle, pizza au four, table), logo Я, carte complète. Pas de portraits, pas d'avis, pas d'e-mail public, horaires divergents.
- Contraintes : site statique Astro sous `base` /incorrect/awwwards/, aucun backend, réservation par lien externe et `tel:`.
- Hypothèses : horaires du Fooding affichés « à confirmer » ; aucun contenu fictif (aucun `placeholder`) ; manque de photos compensé par la typographie et par la réutilisation cadrée des trois images.

## Trois concepts
| Concept | Territoire | Phrase | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| **A. Le demi-tour** (retenu) | nom, graphie | Une lettre est fausse, le reste est juste : le Я retourné, comme la pizza qu'on tourne d'un demi-tour au four | 5 | 5 | 4 | 2 |
| B. Quarante-huit heures | matière (levain) | Le site lève comme la pâte : tout se lit en heures de repos | 4 | 4 | 3 | 3 |
| C. Face B | culture (rock) | La carte est une setlist, les plats des morceaux | 3 | 4 | 4 | 4 |

Test de l'échange : B et C tiennent avec une autre pizzeria (levain, musique). A n'existe que pour ce restaurant (le logo à R inversé est son nom). Choix : A. De B on garde un détail (le chiffre « 48 h » en donnée), de C rien. Ancre : le R inversé du logo (fait réel, `photos/06-logo.svg`).

## Concept Card
- **Idée** : un nom écrit « incorrect » avec une seule lettre à l'envers ; tout le site est correct, sauf un r par mot de titre.
- **Métaphore** : on tourne la pizza d'un demi-tour sur la pelle à mi-cuisson ; le Я fait son demi-tour de la même façon.
- **Signature (et recette)** : le Я du mot INCORЯECT pivote de 180° (rotateY) à l'entrée et au survol, puis revient ; recette `motion.md` (transform individuel, `ease.inOut`), phase 2.
- **Émotion (3 premières secondes)** : un sourire complice, « ils osent », avec un nom énorme et un four.
- **Verbe** : retourner.
- **Capture** : le hero : INCORЯECT pleine largeur, la pizza sortant du four à côté.
- **Ancre** : logo à R inversé (INCORЯECT, graphie du site actuel).
- **Théâtre** : loader non (un site de restaurant doit montrer l'action en 3 s, la transition de page suffit) ; GL non (3 photos, aucune matière qui l'exige ; la typographie fait l'image).

Le concept vit partout : titres de page (`LA CAЯTE`, `HISTOIЯE`), pied (`À L'ENDЯOIT ?` répond à la 404), carte (titres de catégories), réservation, 404 (« Cette page est incorrecte », bouton « Revenir à l'endroit »). Règle : dans chaque mot d'un titre d'affichage, le dernier r est retourné (`src/lib/retourne.ts`).

## Système
- **Palette** : ground #0d1a13 (vert bouteille du site actuel), ink #ece9e1 (blanc du mur de la salle), muted #a3b1a8, line #2b3e33, accent #ff5b35 (croûte léopard), curtain #ff5b35. Sections « mur » : fond #ece9e1, encre #0d1a13, accent brique #b8341a (façade et briques de la salle). Références : le fond vert du site incorrect.pizza, les photos 01 et 02.
- **Typo** : Archivo variable (wdth 62 à 125, wght 100 à 900) : affichage 900 condensé 62 % en capitales, texte 400 largeur normale, intertitres 700 à 800 largeur 72 à 80 % ; Martian Mono 400 pour les métadonnées, prix, légendes. Échelle fluide `--t-mega` (poster, 22,4 vw) `--t-xl` `--t-l` `--t-m` `--t-body` `--t-s` `--t-xs`. Display : interligne 0,82 à 0,9, interlettrage -0,012 à -0,02 em, `text-wrap: balance`. Prix `tabular-nums`, insécables « 14,50 € », « 18 h 30 ».
- **Grille** : 12 colonnes (une colonne au téléphone), lignes fortes à la colonne 5 (carte) et 7 (accueil, réservation), 4 humeurs d'espacement (serre, normal, aéré, entracte). Rayon 0 partout.
- **Mouvement (planifié)** : famille `ease.out|inOut` de l'engine ; verbe retourner : le Я pivote ; CTA : la croûte monte (fait en CSS) ; nav et liens : soulignement qui se dessine ; utilitaires : couleur. Repos : le Я du hero se balance d'un quart de tour toutes les quelques secondes (phase 2) ; transition de page : volets de croûte.
- **Composition** : accueil = poster (hero), statement (mur), média plein cadre, données (3 chiffres), paire asymétrique (photo collante + index). Carte = en-tête, index sticky (titre à gauche, liste à droite), photo, mur de colonnes (« Autour des pizzas »). Histoire = statement, deux fiches, plein cadre, mur (levain), liste de presse. Réservation = deux colonnes (agir, horaires), mur (avant de venir). Mobile 390 : une colonne, mot-poster à 22 vw, listes à une colonne, mur en une colonne.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur le hero (grand mot + photo) : le mot est le logo retourné, la photo est choisie pour le geste du four. Oui sur les listes d'index : titres de catégorie collants à gauche, prix en mono accent. Pas de carte en grille de cartes, pas d'eyebrow sur chaque titre.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique). [x]
3. Concept Card au format, verbe « retourner ». [x]
4. Concept au pied (`Footer.astro`, `À L'ENDЯOIT ?`), carte (`carte.astro` h2), réservation, 404 (`404.astro`). [x]
5. Moment signature et recette : le Я pivote (rotateY 180°), phase 2. [x planifié]
6. Palette 6 rôles, références nommées. [x]
7. Défauts à éviter : crème + serif + terracotta écarté (grotesque condensé, vert bouteille) ; pas d'acide sur noir (orange croûte, 5,3:1) ; ni dégradé violet, ni verre dépoli ; eyebrow absent des titres ; chiffres décoratifs absents ; polices hors liste de réflexes. [x]
8. Test de généricité : ci-dessus. [x]
9. Détails 7 vers 8 : sélection aux couleurs du système (engine.css), focus dans l'accent (`:focus-visible`), favicon Я (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale, 404 dans le concept. [x, à vérifier en phase 3]
10. Polices : Archivo (variable) + Martian Mono, 2 fichiers, 1 préchargé (`Base.astro`). [x]
11. Échelle fluide unique `tokens.css`, sauts mega 22 vw à body 1 rem. [x]
12. Display réglé (interligne, interlettrage, balance). [x]
13. Corps 16 à 19 px, UI 12 à 14 px. [x, contrastes à mesurer en phase 3]
14. Typographie française : insécables, apostrophes courbes, « » absents (aucune citation). [x]
15. Grille 12 colonnes, lignes fortes ; cadre quatre coins non retenu (le poster plein cadre fait office). [x]
16. Une famille de section au plus une fois par page. [x]
17. Hero en 3 s : nom, cuisine, réserver, appeler. [x]
18. Mobile 390 recomposé : mesuré sans débordement (scrollWidth 390), `.display` à gauche ≥ 16 px. [x]
