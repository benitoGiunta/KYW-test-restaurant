# Sanga · variante awwwards · DESIGN

## Brief

- **Sujet** : Sanga, restaurant de ramen japonais, Rue Saint-Loup 8, 5000 Namur. « Le premier restaurant de ramen à Namur » (baseline du client). Cuisine : ramen (miso, shio, shoyu au choix), udon, soba, six donburi, gyoza. Plats de 12,50 à 18,80 €, sur place, à emporter, en livraison.
- **Publics** : le midi (12 h à 14 h, pause rapide), le soir (18 h à 22 h), les habitués du centre de Namur, les curieux de passage ; tous veulent la carte avec les prix et un numéro à appeler.
- **Métier** : appeler (pas de réservation en ligne), lire la carte, trouver l'adresse et les horaires (fermé le lundi), commander en ligne (lien du client).
- **Ressources** : 4 photos de plats exploitables (smartphone et studio), logo 山河. Pas de salle, de façade, de personnes. Pas d'histoire, d'équipe, d'e-mail, de réseaux : rien d'inventé, les blocs sont absents.
- **Contraintes** : site statique Astro sous `base` /sanga/awwwards/, français, vouvoiement, aucun tiret cadratin, noindex, pied KYW.
- **Hypothèses** : la lecture du nom (山 montagne, 河 rivière) vient des deux caractères du logo, pas d'une déclaration du client ; « depuis au moins 2018 » vient d'un blog d'avril 2018 qui décrit Sanga comme « assez connu pour ses ramen » ; textes de plats nettoyés (doublons, fautes d'usage) sans changer le sens.

## Trois concepts

| # | Territoire | Phrase | Originalité | Adéquation | Faisabilité | Portabilité (bas = mieux) |
|---|---|---|---|---|---|---|
| A | Nom et lieu | **山河, la montagne et la rivière** : Namur entre ses deux rivières sous sa citadelle, le bol comme paysage | 4 | 5 | 5 | 1 |
| B | Matière | **Trois bouillons** : miso, shio, shoyu ; la page prend la teinte du bouillon choisi | 4 | 4 | 4 | 2 |
| C | Service | **Deux services** : midi clair, soir sombre, le lundi à sec | 3 | 4 | 5 | 3 |

- **A** : règle de mise en page = strates découpées en crêtes à trois sommets plus un fleuve vertical ; verbe couler ; voix typo = mincho (serif de calligraphie imprimée) ; palette = indigo du damier, washi, vermillon du sceau ; signature = le fil de l'eau ; ancre = le logo 山河 et le confluent Sambre et Meuse sous la citadelle.
- **B** : règle = une teinte de page par bouillon ; verbe choisir ; signature = le bol qui se remplit ; ancre = « chaque ramen se choisit en bouillon ». Écarté : un changement de thème reste un réglage, pas un lieu ; il ne tient pas à la 404 ni au pied. Fournit un détail : les trois gouttes de bouillon (index de l'accueil, carte, page La maison).
- **C** : règle = deux fonds selon l'heure ; verbe alterner ; ancre = horaires. Écarté : n'importe quel restaurant à deux services le dirait. Fournit un détail : le lundi « Fermé » en vermillon dans les horaires (lit sec du fleuve).
- **Test de l'échange** : « la montagne et la rivière » ne tient avec aucun autre restaurant : le kanji est le logo de Sanga et le confluent est celui de Namur. Choix : A (5, 5, 5, 1).
- **Interdits** : aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique). Le concept tient au pied (le kanji et « À table. » sous une crête), à la carte (biefs), à la réservation et à la 404 (« Rien sur cette rive. », pic vermillon).

## Concept Card

- **Idée** : Sanga s'écrit 山河, la montagne et la rivière ; Namur est bâtie au confluent de la Sambre et de la Meuse sous l'éperon de sa citadelle. Le site est ce paysage lu de haut en bas.
- **Métaphore** : le bol est un paysage : les garnitures sont les reliefs, le bouillon est le fleuve. Chaque page est une succession de strates, du plus haut (la crête) au plus bas (l'eau).
- **Signature (et recette)** : « le fil de l'eau » : un filet vertical continu à gauche de la page, que rejoint un sceau vermillon à chaque strate ; en phase 2 il se dessine avec la lecture (recette `motion.md` scroll-linked progress, `scaleY` piloté par ScrollTrigger scrub) et le sceau glisse jusqu'à la strate courante. Les crêtes sont des `clip-path` (photos et séparations de strates).
- **Émotion (3 premières secondes)** : un calme nocturne et un bol chaud : un monument de deux caractères blancs sur l'indigo, un ramen découpé en montagne, un nom vermillon.
- **Verbe** : couler (aller vers le bas sans à-coup, ralentir, se poser à niveau ; courbes `ease.soft` et `ease.out`, jamais de rebond ; les boutons se remplissent de gauche à droite comme un niveau qui monte).
- **Capture** : le hero : 山河 en pile à gauche, « Sanga » en vermillon, la photo du ramen découpée en trois sommets à droite.
- **Ancre** : le logo 山河 (deux caractères) ; Namur au confluent de la Sambre et de la Meuse ; « le premier restaurant de ramen à Namur » (client).
- **Théâtre** : loader non (le visiteur veut appeler ou lire la carte, aucune attente ne se justifie) ; GL non (photos de plats de 720 à 1024 px, un shader n'ajouterait que du bruit ; les crêtes se font en CSS).

## Système

- **Palette** (tokens.css) : ground `#101b33` indigo nuit (le damier du bol, photo 01) ; ink `#ece6d8` washi (13,8:1) ; muted `#aab3c5` brume (8,1:1) ; line `#2a3a5c` (filet, décoratif) ; accent `#e8512f` vermillon du sceau hanko (4,6:1 sur ground) ; curtain `#1b2c50`. Sections papier : fond `#ece6d8`, texte `#101b33`, muted `#4b5468` (6,1:1), accent `#b3301a` (5,0:1). Références réelles : le bol à damier bleu de la photo 01, le roux de la table des photos 02 à 04, le sceau rouge des gravures japonaises. Le défaut n° 1 (crème, serif contrasté, terracotta) est évité : le fond dominant est indigo et le rouge est un vermillon de sceau, pas une terre cuite ; le washi n'apparaît qu'en strates alternées.
- **Typographie** : Shippori Mincho 800 (titres, prix, kanji ; sous-ensemble du logo de 1 Ko) et Hanken Grotesk 400 à 700 (texte, interface). Échelle fluide : `--t-kanji` 6 à 19 rem, `--t-mega` 3,4 à 13 rem, `--t-xl` 2,6 à 7 rem, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 13 px. Display : interlettrage -0,03 à -0,045 em, interligne 0,92 à 1,05, `text-wrap: balance`, `padding-bottom` pour les descendantes. Corps : interligne 1,5, mesure 62 ch. Prix en `tabular-nums`. Insécables : « 6,00 € », « 12 h à 14 h » ; apostrophes courbes et « » dans les textes.
- **Grille** : 12 colonnes (une seule sur téléphone), gutter fluide. Deux lignes verticales fortes : le fleuve (à x = gutter) et la colonne 8 (photos). Trois humeurs d'espacement : `--serre`, `--normal`, `--aere`/`--entracte`. Règle de forme : angles vifs, crêtes à trois sommets, boutons rectangulaires.
- **Mouvement (planifié, phase 2)** : easing `ease.soft` pour les révélations, `ease.inOut` pour la transition (deux volets indigo qui montent comme une crue puis descendent, déjà en place). Hover : (1) CTA : remplissage de gauche à droite ; (2) nav : filet d'accent qui s'étend ; (3) plats de l'index : aperçu photo au curseur (phase 2). Repos : immobilité décidée, le fleuve et le sceau ne bougent qu'avec la lecture.
- **Plan de composition** : accueil = poster (hero) / énoncé (papier) / index (cinq ramen + bouillons) / paire asymétrique (papier : udon et teriyaki) / données (horaires, adresse, livraison) / pied final. Carte = titre, sommaire collant + biefs (liste index par catégorie, photo en crête), papier de fin. Mobile 390 : kanji en ligne, photo en crête à 82 %, sommaire de la carte en bande horizontale `scroll-snap`, un seul rang de colonnes.
- **Test de généricité** : un modèle générique atterrirait-il ici ? Oui sur le hero à deux colonnes (changé : kanji en pile + photo en montagne), oui sur les listes de prix (changé : prix en mincho 500, filets, bouillons en gouttes), oui sur l'accroche (changé : énoncé sur Namur et ses rivières).

## Sur-utilisation de la skill

1. [x] Trois concepts, trois territoires (nom et lieu, matière, service), notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md : voir « Interdits ».
3. [x] Concept Card exacte, verbe « couler » compris : `.cta` (remplissage de gauche à droite), `.nl` (filet), `site.css` lignes de transitions.
4. [x] Concept au pied, carte, réservation, 404 : `Footer.astro` (kanji + « À table. » sous une crête), `.bief` (carte), `.strate` (réservation), `404.astro` (« Rien sur cette rive. », `.perdu__pic`).
5. [~] Un moment signature et sa recette : « le fil de l'eau », scroll-linked progress ; le fleuve statique existe (`.strate` background-image, `.strate::after`), l'animation est planifiée en phase 2 (non livrée).
6. [x] Palette 4 à 6 rôles, références réelles : `tokens.css` lignes 18 à 30.
7. [x] Aucun des 8 « defaults to avoid » : pas de crème + terracotta, acide sur noir, dégradé violet, verre dépoli, eyebrow sur chaque titre, 01/02/03 décoratifs, Inter, Fraunces, Instrument Serif ni Playfair (Shippori Mincho, Hanken Grotesk).
8. [x] Test de généricité : ci-dessus.
9. [~] « Details that separate 7 from 8 » : sélection en accent (`::selection` site.css), focus dans l'accent (engine.css `:focus-visible`, papier : `.strate--papier a:focus-visible`), favicon de l'identité (`public/favicon.svg` : crêtes vermillon et eau), OG composée (`public/og.png`, 1200 x 630 : 山河, nom, photo en montagne), pied comme composition finale, 404 dans le concept. Survol à vérifier en navigateur (phase 3).
10. [x] Polices : `public/fonts/` 4 fichiers (shippori 500 et 800 latin, kanji 1 Ko, hanken variable), 2 préchargés (`Base.astro` : shippori 800 et hanken).
11. [x] Échelle fluide unique : `tokens.css` `--t-kanji` à `--t-xs`, grands sauts (mega 13 rem contre corps 1 rem).
12. [x] Display réglé : `.display` (interligne 0,98, -0,03 em, balance, `padding-bottom`).
13. [x] Corps et UI : corps 16 à 18 px, UI 13 à 14 px, mesure 62 ch (`.texte`).
14. [x] Typographie française : `eur()` et insécables dans `site.ts`, « » et apostrophes courbes dans les pages.
15. [x] Grille, lignes fortes : fleuve à gauche et colonne 8 ; cadre quatre coins non utilisé, justifié : le fleuve et les crêtes structurent à sa place.
16. [x] Famille de section au plus une fois par page : accueil = poster, énoncé, index, paire, données, pied.
17. [x] Hero en 3 s : nom, cuisine, ville et « Appeler le 081 24 10 38 » visibles sans défiler (mesure 1440 x 900 : h1 à y 626, CTA dans l'écran).
18. [x] Mobile 390 recomposé : kanji en ligne, photo à 82 %, sommaire en bande `scroll-snap`, aucune colonne côte à côte ; `scrollWidth` = 390 sur les 4 pages.
