# DESIGN.md : La Bergerie de Lives (variante awwwards, phase 1)

## Brief
- **Sujet** : La Bergerie de Lives, Rue de Mosanville 100, 5101 Lives-sur-Meuse (Namur). **Ce n'est pas un restaurant** (dossier.md, 27/11/2026) : maison d'hôtes, salle de mariage, séminaires, piscine chauffée avril à octobre, sauna et jacuzzi. Hypothèse retenue : la maquette est requalifiée en site de domaine. La page « carte » devient `/le-domaine/` ; pages : `/`, `/le-domaine/`, `/histoire/`, `/reservation/`, 404.
- **Publics** : couples qui cherchent un lieu de mariage (cœur de cible), équipes en séminaire, voyageurs en chambre d'hôtes, touristes de la citadelle de Namur.
- **Métier** : organiser une visite (30 min avant un mariage), réserver une chambre, appeler.
- **Ressources** : 25 photos du client (domaine, véranda, cérémonies au jardin, piscine, chambre), logo bélier trop petit (non utilisé). Pas de carte, horaires, tarifs de chambre, avis, réseaux, GPS : tout est `null`, rien n'est inventé. Capacité de salle contradictoire (150 / 250) : non affichée. Seul prix réel : journée piscine 20 € par personne.
- **Contraintes** : statique, Astro, `base` `/bergerie-lives/awwwards/`, noindex, pied KYW. Aucun `placeholder` n'a été nécessaire.

## Trois concepts (trois territoires)
| | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Le Clos** : un domaine clos, ouvert à un seul groupe à la fois | lieu et métier (la privatisation d'un weekend) | 4 | 5 | 5 | 2 |
| B | **Le tonneau** : la cérémonie se célèbre sur un tonneau, autel de bois | matière et culture (vin, cave, 5 photos de cérémonies avec le tonneau) | 4 | 4 | 4 | 3 |
| C | **Le weekend** : le site s'écrit comme les heures du vendredi au dimanche | rythme horaire | 3 | 4 | 4 | 4 |
- **Choix : A.** Seul à porter l'offre commerciale (privatisation), la cible (mariages) et la métaphore du nom (bergerie = enclos), et à tenir jusqu'au pied et à la 404.
- **Test de l'échange** : « un domaine clos, ouvert à un seul groupe à la fois, dont la barrière s'ouvre devant vous » ne tient avec aucun autre lieu namurois : la privatisation par weekend et la bergerie sont propres à ce domaine.
- **Ancre** : « Le domaine est privatisé le temps d'un weekend complet pour les mariés » (site actuel) et le nom « Bergerie ».
- **Écartés** : B fournit un détail (le cercle de bois de la photo 08 inspire la forme des bords d'images en phase 2 si besoin) ; C fournit l'idée d'un rythme de sections courtes. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre générique, solde, phrase unique) n'est repris : le cadre ici est une clôture (quatre piquets d'angle) et sert la métaphore, pas la décoration.

## Concept Card
- **Idée** : un domaine clos, ouvert à un seul groupe à la fois.
- **Métaphore** : la bergerie, l'enclos. Ce qui est dedans est gardé ; la barrière s'ouvre pour vous.
- **Signature (et recette)** : la barrière à deux battants : le rideau de transition et le hero s'ouvrent en deux moitiés (clip-path, `motion.md` « curtain / clip wipe », engine `data-reveal="clip"`). En phase 1 : cadres à quatre piquets d'angle et bouton à battant (fond qui s'ouvre de haut en bas).
- **Émotion (3 premières secondes)** : on arrive devant un grand portail, le nom géant, la façade en pierre ; calme, privé, protégé.
- **Verbe** : enclore (puis ouvrir).
- **Capture** : hero « La Bergerie de Lives » géant sur vert nuit avec la façade encadrée par quatre piquets laiton, ou le pied « Le domaine se ferme derrière vous. ».
- **Ancre** : privatisation d'un weekend complet ; nom « Bergerie ».
- **Théâtre** : loader non (le site est court, le premier cadre doit être le hero ; la barrière sert de rideau de page) ; GL non (les photos du client portent l'émotion, aucune matière à shader).

## Système
- **Palette** (rôles) : `ground` #17201a (vert nuit du feuillage, proche de Studio Green de Farrow & Ball), `ink` #eee8d8 (pierre claire), `muted` #aeb39f (mousse), `line` pierre à 20 %, `accent` #d9a04e (laiton du tonneau et du saxophone), `curtain` #0e1510. Humeur claire : `pierre` #e4dcc7 (proche de Hay, Farrow & Ball) avec encre #17201a et accent #7a4a12 (AA). Tuile #b4532f en réserve.
- **Typo** : Young Serif 400 (display, chaleureuse, vieux style, ni Fraunces ni Playfair) + Hanken Grotesk 400 à 700 (corps, UI). 2 fichiers woff2 (61 Ko), les deux préchargés. Échelle fluide `--t-mega` 3,4 à 14 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 12 px. Display : interlettrage -0,02 à -0,035 em, interligne 0,88 à 1, `text-wrap: balance`. Corps interligne 1,55, mesure 62 car. Prix `tabular-nums`. Insécables et apostrophes typographiques dans les textes.
- **Grille** : 12 colonnes, gouttière fluide, lignes fortes à la colonne 5 (hero) et 7 (index, offres), 3 humeurs d'espacement (hero dense, sections 9 u, pied 4 u). Rayon 0 partout (piquets, pas d'arrondi).
- **Mouvement (planifié, phase 2)** : easing `ease.inOut` pour les battants, `ease.out` pour les révélations, durées 0,45 s (petit) à 1,1 s (hero). Rôles de hover : CTA = battant (déjà en CSS), nav = soulignement qui s'étire, images d'index = vignette qui suit la ligne, liens texte = soulignement qui épaissit. Repos : immobilité décidée (domaine calme) ; seul le défilement de la galerie bouge.
- **Plan de composition** : accueil = poster (nom + photo encadrée) ; statement + paire asymétrique ; index de trois offres avec vignette ; mur horizontal (bande scroll-snap) ; données (services + 20 €) ; média plein cadre (piscine) ; pied final. Le domaine : offres alternées gauche/droite, données, proximité (liste). Histoire : récit + photos décalées. Réservation : CTA + dl + photo.
- **Mobile 390** : titre à 17 vw, hero en une colonne avec photo carrée, paire superposée, index sur deux rangées, bande scroll-snap à 72 vw, services en colonne, pied en une colonne.
- **Test de généricité** : un modèle générique mettrait crème + serif + terracotta (non : vert nuit et laiton), un hero plein écran avec voile (non : poster typographique avec cadre), trois cartes d'offres (non : index lignes), 01/02/03 (non). Quatre « oui » corrigés.

## Sur-utilisation de la skill
1. Trois concepts de trois territoires, notés, ancre, test de l'échange : tableau et lignes ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md : section « Écartés ». [x]
3. Concept Card exacte, verbe « enclore » : ci-dessus. [x]
4. Concept au pied, à la carte (le domaine), réservation, 404 : `Footer.astro` (« Le domaine se ferme derrière vous. »), `le-domaine.astro` (offres en enclos), `reservation.astro` (cadre photo), `404.astro` (« Cette barrière ne s'ouvre sur rien. »). [x]
5. Moment signature et recette : barrière à deux battants (clip-path), phase 2 ; piquets d'angle déjà en CSS (`site.css` `.enclos`). [x]
6. Palette de 6 rôles, références Farrow & Ball nommées : `tokens.css:2-17`. [x]
7. Huit « defaults to avoid » : crème/serif/terracotta évité, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow sur chaque titre (`.titre-section` seulement sur 4 sections), pas de 01/02/03, pas d'Inter/Fraunces/Instrument/Playfair. [x]
8. Test de généricité : section Système. [x]
9. Détails 7 vers 8 : sélection laiton (`site.css:2`), focus laiton (`site.css:3`), favicon portail (`public/favicon.svg`), OG composée (`public/og.png`, hero), pied en composition (`.pied__cadre`), 404 dans le concept. [x]
10. Polices : `public/fonts/` 2 fichiers, `tokens.css:3-4`, préchargées dans `Base.astro`. [x]
11. Échelle fluide unique : `tokens.css` `--t-*`. [x]
12. Display réglé : `site.css` `.display`, `.hero__titre`. [x]
13. Corps et UI : 16 à 18 px, UI 12 à 14 px, `site.css:6`. [x]
14. Typographie française : « » et apostrophes ’ dans les textes (Python n'a pas été nécessaire : saisie directe). [x]
15. Grille, lignes fortes, cadre quatre coins (piquets, justifiés par la clôture) : `site.css` `.enclos`. [x]
16. Chaque famille de section au plus une fois par page : accueil poster, statement, index, mur, données, plein cadre, final. [x]
17. Hero en 3 s : mesure Playwright 1440x900 : h1 et photo visibles, CTA à l'écran après correction (voir ETAT.md). [x]
18. Mobile 390 recomposé : bloc `@media (max-width: 860px)` de `site.css` ; mesure 390 sans débordement (`over` = 0). [x]
