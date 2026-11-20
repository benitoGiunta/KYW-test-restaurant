# DESIGN.md : Le Lodge Wépion, variante awwwards « Deux rives »

## Brief
- **Sujet** : Le Lodge, brasserie, restaurant et tea-room au bord de la Meuse, Chaussée de Dinant 931, Wépion (Namur). Gérant : Grégory Jorion. Dossier du 20/11/2026.
- **Situation décisive** : le lieu est fermé depuis l'incendie du 21/05/2026. L'équipe sert à Erpent, au Wine & More (Chaussée de Marche 496), depuis le 15/09/2026 ; retour à Wépion envisagé fin 2026 ou début 2027, sans date. La maquette le dit, sans faux horaire ni fausse date.
- **Publics** : habitués de Wépion qui cherchent où est passée l'équipe ; familles du dimanche et du midi ; touristes de la Meuse ; clients du tea-room l'après-midi.
- **Métier du site** : réserver (téléphone, Barestho), savoir où aller aujourd'hui, consulter la carte (88 lignes), comprendre que le Lodge revient.
- **Ressources** : 12 photos d'avant l'incendie (photo 11 écartée : enseigne « Le Beau Rivage » et personne non identifiée), logo blanc SVG, carte complète, presse (L'Avenir, La DH).
- **Contraintes** : statique Astro, `base` /le-lodge-wepion/awwwards/, pas de backend, noindex, français, aucun tiret cadratin.
- **Hypothèses** (détail dans `site.ts` et RAPPORT.md) : numéro du relais 0496 92 55 13 repris de la fenêtre du site client, à confirmer ; horaires du relais inconnus donc absents ; ouverture 2008 d'une source tierce, à confirmer ; aucun avis, aucune note, aucune distinction.

## Trois concepts
| | Concept | Phrase | Règle de mise en page | Verbe | Ancre | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|---|---|---|
| A | **Deux rives** (lieu, culture : la Meuse) | Le Lodge est une berge qu'on ne peut plus aborder et une table qui continue de l'autre côté. | Un trait vertical, la berge, coupe chaque page : nuit de Wépion à gauche (mémoire), jour d'Erpent à droite (action). | traverser | Incendie du 21/05/2026, repli au Wine & More d'Erpent, GPS de Wépion | 5 | 5 | 4 | 1 |
| B | **Deux services** (matière : le service, rythme horaire) | Le Lodge change de lumière : brasserie le soir, tea-room l'après-midi. | Le fond passe du clair au sombre selon l'heure du plat. | virer | Tea-room l'après-midi, photos de jour et de nuit | 3 | 4 | 5 | 3 |
| C | **La saison de Wépion** (saison, lieu : fraises) | La carte est un calendrier : asperges au printemps, fraises de Wépion en juin. | La carte comme frise de mois. | mûrir | Fraises de Wépion, sirop de sureau, carte saisonnière | 3 | 4 | 4 | 2 |

**Choix : A**, parce que c'est le seul qui ne tient qu'avec ce restaurant (test de l'échange : avec un autre restaurant la phrase s'effondre, il faudrait un autre incendie, une autre berge) et qu'il porte l'information la plus utile au visiteur. B fournit un détail (la façade de jour et de nuit, appariée sur la page Histoire). C fournit un détail (la coupe de fraises de Wépion et la mention de saison de la carte).

## Concept Card
- **Idée** : Le Lodge est une rive que l'on ne peut plus aborder, Wépion, et une table qui continue de l'autre côté, Erpent ; chaque page est coupée par la berge.
- **Métaphore** : la Meuse et ses deux rives. À gauche ce qui est resté sur la berge (le lieu, les photos, le nom), à droite ce que l'on peut faire aujourd'hui (réserver, appeler, venir).
- **Signature (et recette)** : « le passage » (phase 2) : un pilote unique, la progression du défilement, déplace la berge (`clip-path` du panneau jour, recette motion.md « clip reveal driven by scroll ») ; au repos, la berge ondule de quelques pixels (idle) ; le rideau de page est une berge qui traverse l'écran.
- **Émotion (3 premières secondes)** : on comprend en un regard que le lieu est fermé, que l'équipe est ailleurs et qu'elle revient ; une pudeur chaleureuse, pas un bandeau d'alerte.
- **Verbe** : traverser.
- **Capture** : le héros, nuit de Wépion avec la terrasse sur la Meuse à gauche, jour d'Erpent avec « À table à Erpent, en attendant la berge. » à droite.
- **Ancre** : l'incendie du 21/05/2026, le Wine & More d'Erpent (Chaussée de Marche 496), le 931 Chaussée de Dinant (GPS 50.4234855, 4.8742231), le retour envisagé fin 2026.
- **Théâtre** : loader non (le site doit afficher l'état du lieu immédiatement, un loader retarderait l'information vitale) ; GL non (la berge est une ligne, pas un volume ; les photos du client portent la matière).

## Système
### Palette (rôles)
| Rôle | Hex | Source / usage | Contraste |
|---|---|---|---|
| ground | `#0e1519` | la nuit sur l'eau de la photo 08, rive de Wépion | ink 14,8:1 |
| ink | `#ece6d8` | la nappe et les assiettes blanches des photos 04 et 07 | |
| muted | `#a7b2ac` | les rochers pâlis de la photo 03 | 8,4:1 sur ground |
| line | `#2d3a3f` | décoratif | |
| accent | `#e3a857` | la lampe de la façade (photo 08), le bois noyer de la table (photo 09) | 8,8:1 sur ground |
| jour (rive d'Erpent) | `#d9ded5` / ink `#0e1519` / muted `#46524b` / accent `#7a4a12` | le calcaire et la salle claire des photos 02 et 03 | 13,5 ; 6,0 ; 5,5 |
| curtain | `#070b0d` | rideau de page | |

Références : photos du client (08, 03, 09, 02). Défaut n° 1 (crème, serif contrasté, terracotta) évité : la crème n'est qu'un blanc de nappe sur nuit, la rive claire est un gris-vert de pierre, l'accent est un ambre de lampe cuit sur le clair.

### Typographie
- **Display** : Gambetta 500 (Fontshare), romain et italique ; interlettrage -0,035 em, interligne 0,96, `text-wrap: balance`. **Corps/UI** : Host Grotesk 400 à 700 (Google, variable). Trois fichiers, deux préchargés.
- Échelle fluide unique (`tokens.css`) : `--t-mega` 3,6 à 12 rem, `--t-xl` 2,6 à 7, `--t-l` 1,9 à 3,9, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 13 px.
- Prix en `tabular-nums` ; insécables « 24 € », « 11 h 30 », « : » ; apostrophes courbes.

### Grille et rythme
- 12 colonnes, gouttière fluide ; lignes verticales fortes : la berge (colonne 7/8) et la marge gauche. Mobile : la berge devient une ligne horizontale entre deux panneaux.
- Humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Une règle de forme : angles vifs, un seul trait, la berge.

### Mouvement (planifié, phase 2)
- Famille d'easing : `ease.out` pour les entrées, `ease.inOut` pour la berge et le rideau ; durées 0,6 à 0,9 s ; le verbe « traverser » : tout entre par la droite et sort par la gauche, comme un bac.
- Hovers : CTA = remplissage inversé (nuit/jour), nav et liens = trait ambre qui se trace, plats et images = légère translation de la berge intérieure. Trois traitements.
- Repos : la berge ondule (déplacement horizontal de 4 à 6 px, 8 s) ; immobilité décidée sous `prefers-reduced-motion`.

### Plan de composition (accueil)
```
HÉROS poster      [ NUIT 7/12 : mention, H1 "Le Lodge Wépion", photo terrasse | JOUR 5/12 : H2, texte, CTA, adresse relais ]
STATEMENT         [        phrase display cols 2 à 11, note en dessous                                           ]
DONNÉES           [ Adresse / État / Réserver : Wépion (nuit) | Erpent (jour) ]
INDEX             [ six repères de la carte, cols 1-7 | photo plat cols 9-12 ]
MÉDIA PLEIN CADRE [ salle voûtée 21:9 ]
PAIRE ASYMÉTRIQUE [ tea-room texte cols 1-5 | dessert carré + dessert portrait décalés ]
PIED FINAL        [ "Deux rives, une table." / Erpent / Wépion / Ailleurs ]
```
Carte : liste index par catégorie (titre sticky à gauche, plats à droite) et un mur de trois photos après les tartares ; au téléphone, le mur devient une bande à `scroll-snap`. Mobile 390 : panneaux empilés, photo 2:1, CTA dans la flottaison (y = 711).

### Test de généricité
« Un modèle générique atterrirait-il ici ? » Oui sur : crème et terracotta, héros photo plein écran avec titre centré, bandeau d'alerte rouge pour la fermeture, 01/02/03. Changé : la fermeture devient la composition (deux rives), pas un bandeau ; fond nuit et pierre claire ; aucun eyebrow décoratif (les « mentions » portent des faits : adresse, état) ; l'accueil n'a pas de photo plein écran en héros.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (pas de braise, pavage, mise en place sur gril, cadre, solde, phrase unique) : § Trois concepts. [x]
3. Concept Card au format exact, verbe « traverser » compris (bac, passage) : § Concept Card. [x]
4. Concept présent au pied, à la carte, à la réservation, à la 404 : `Footer.astro:11` (« Deux rives, une table. », deux adresses), `carte.astro` (mention « côté berge »), `reservation.astro` (h1 « côté relais »), `404.astro` (« Cette rive n'existe pas », deux panneaux nuit/jour). [x]
5. Moment signature et recette : « le passage », § Concept Card (réalisé en phase 2). [x] (plan)
6. Palette 4 à 6 rôles, références réelles : § Palette (photos 08, 03, 09, 02). [x]
7. Huit « defaults to avoid » : § Palette (crème justifiée), aucun acide sur noir, aucun dégradé violet, aucun verre dépoli, pas d'eyebrow sur chaque titre, pas de 01/02/03, ni Inter, ni Fraunces, ni Instrument Serif, ni Playfair (Gambetta et Host Grotesk). [x]
8. Test de généricité : § Test de généricité. [x]
9. Détails 7 à 8 : sélection `::selection` (engine.css) ; focus dans l'accent (`:focus-visible` accent) ; favicon de l'identité (`public/favicon.svg` : L du logo sur deux rives) ; pied en composition finale (`Footer.astro`) ; 404 dans le concept (`404.astro`). OG composée : à faire (phase 3). [x partiel]
10. Polices : `public/fonts/` 3 fichiers, `tokens.css:5-7`, préchargements `Base.astro`. [x]
11. Échelle fluide unique, grands sauts : `tokens.css` (`--t-mega` 3,6 à 12 rem). [x]
12. Display réglé : `.display` (`site.css`, interlettrage, interligne, balance). [x]
13. Corps et UI : 16 à 18 px, UI 13 à 14 px, contrastes calculés (tableau). [x]
14. Typographie française : insécables insérés par script (« 24 € », « 11 h 30 », « : »), apostrophes courbes, aucun tiret cadratin (grep vide). [x]
15. Grille 12 colonnes et lignes fortes : `site.css` (`.grille`, `.rives`) ; cadre quatre coins non retenu (la berge verticale tient lieu de structure). [x]
16. Une famille de section au plus une fois par page : accueil = poster, énoncé, données, index, média, paire, pied. [x]
17. Héros en 3 s : mesures Playwright, CTA dans la flottaison à 1440x900 (y 425), 1280x720 (404), 1024x768 (445), 390x844 (711). [x]
18. Mobile 390 recomposé : panneaux empilés, berge horizontale, photo 2:1, mur de la carte en bande `scroll-snap`, `scrollWidth` = 390 sur les 4 pages. [x]
