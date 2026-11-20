# DESIGN, Le Panorama (variante awwwards, « Le tour d'horizon »)

## Brief
- Sujet : Le Panorama, brasserie au sommet de la Citadelle de Namur (Route Merveilleuse 82), pavillon vitré, terrasse sur plusieurs niveaux, carte d'automne 2026 signée Yves Mattagne, four à bois, bière Pano. Ouvert tous les jours, 8 h à 23 h (site client, à confirmer).
- Publics : petit-déjeuner (8 h à 10 h 30), midi et soir de brasserie, touristes montés par le téléphérique, groupes dès 7 personnes, habitués de la terrasse.
- Métier : réserver (tel, formulaire du client), venir (plan, téléphérique), lire la carte (44 plats, de 12 à 98 euros).
- Ressources : 20 photos pro du client (16 retenues), aucun logo vectoriel, données complètes sauf avis, desserts, horaires précis (RAPPORT.md).
- Contraintes : statique (Astro 5), `base` /panorama-citadelle/awwwards/, noindex, pas de backend.

## Trois concepts (test de l'échange, notes sur 5 : originalité / adéquation / faisabilité / portabilité, bas = mieux)
1. **Le tour d'horizon** (territoire : lieu, 360 degrés, la journée de 8 h à 23 h). Règle de mise en page : une règle graduée de 8 h à 23 h traverse chaque page. Verbe : balayer. Typo : grotesque large serrée. Palette : gravier, ardoise, vert Meuse. Signature : la règle et son soleil qui avance (motion.md, scrub sur l'horloge). Frame : le titre et la règle sur la vue de la Meuse. Ancre : « Ouvert tous les jours de 8 h à 23 h » et « vue à 360° ». Notes 4 / 5 / 4 / 2. Échange : avec un autre restaurant la phrase ne tient pas (le soleil sur la règle des heures d'ouverture, au rebord d'un rocher).
2. **Le four ouvert** (territoire : matière, feu). Chaque page se lit comme une tarte flambée qui cuit, du pâle au charbon. Notes 3 / 3 / 3 / 3. Écarté : proche de l'exemple « braise » interdit, et le four n'est qu'un des piliers du lieu. Fournit un détail : l'état « charbon » de la section nuit.
3. **La cave en coupe** (territoire : pierre, étages du rocher). Le site est une coupe verticale, du ciel à la cave. Notes 4 / 3 / 2 / 3. Écarté : cotes d'altitude non prouvées (aucun chiffre vrai dans le dossier), et la carte n'y tient pas. Fournit un détail : l'index « De la terrasse à la cave » de l'accueil.
Choix : le 1, seul concept qui tient du hero au pied, à la carte (grille des heures), à la réservation (horaires) et à la 404.

## Concept Card
- **Idée** : le Panorama est une vue ; le site est un tour d'horizon réglé sur les heures d'ouverture, de 8 h à 23 h.
- **Métaphore** : une règle d'horizon graduée à l'heure, sur laquelle avance un soleil, comme le jour avance sur la Meuse.
- **Signature (et recette)** : la règle de l'horizon, présente en hero, journée, réservation, pied et 404 ; le soleil se déplace avec le défilement (recette motion.md « scrub lié au scroll », transform seulement, phase 2).
- **Émotion (3 premières secondes)** : on est en hauteur, au bord, tout est dégagé et large.
- **Verbe** : balayer (le regard, la règle, la journée).
- **Capture** : titre « Le Panorama » en très grand sur gravier, la Meuse en pleine largeur dessous.
- **Ancre** : horaires 8 h à 23 h tous les jours et vue à 360° sur la Meuse (dossier.md, matière à site 1, 2).
- **Théâtre** : loader non (le hero est le contenu, l'image porte la vue) ; GL non (les photos du client suffisent et le soleil se fait en DOM).

## Système
- **Palette** : ground #e3e4df (gravier clair, photos 03 et 04), ink #11171b (ardoise du pavillon, photo 07), muted #55606a, line #b4b9b6, accent #1d5c58 (vert Meuse, photo 02), curtain #11171b ; nuit : #a9bd78 (vert des tabourets du bar, photo 09), #a4b0ab. Contrastes calculés dans tokens.css.
- **Typo** : Clash Grotesk 500 et 600 (display, Fontshare), Switzer 400 et 600 (corps, Fontshare), 4 fichiers, 2 préchargés. Échelle fluide `--t-mega` (3,4 à 14 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body` (16 à 18 px), `--t-s` 14 px, `--t-xs` 13 px ; display interlettrage -0,045 em (mega), -0,035 (xl), -0,025 (l), interligne 0,88 à 1 ; prix `tabular-nums` ; insécables dans « 8 h », « 19 € », « ».
- **Grille** : 12 colonnes (une seule colonne au téléphone), lignes fortes à gauche (gutter) et à la colonne 8 (actions et texte secondaire) ; quatre humeurs `--serre`, `--normal`, `--aere`, `--entracte`. Rayon 0 partout, le soleil seul est rond.
- **Mouvement (à planifier, phase 2)** : easing `expo.out` (entrées), `expo.inOut` (rideau) ; verbe « balayer » : révélations latérales par clip-path, soleil de la règle lié au scroll ; rideau ardoise horizontal. Hovers : CTA, fond qui s'inverse (fait en CSS) puis balayage en phase 2 ; nav, soulignement qui se trace (fait) ; plats et images, aperçu image sur l'index (phase 2) ; liens texte, épaisseur du soulignement ; utilitaires, couleur. Repos : le soleil dérive de quelques pixels sur la règle du hero (horloge GSAP, off sous reduced motion).
- **Plan de composition (accueil)** : poster (titre, baseline, actions) ; média plein cadre (Meuse + règle) ; paire asymétrique (façade + texte, vue aérienne décalée) ; index sombre « De la terrasse à la cave » avec vignettes ; narration en paire (four, Pano) ; données (journée sur la règle) ; pied final (appel, mur de trois photos, mot « Le Panorama » en géant, règle à 23 h). Carte : index sticky à gauche, catégories en liste (patron index, aperçu curseur en phase 2). Histoire : récit en paire, équipe en liste sombre, photos. Mobile 390 : titre sur une ligne (3,4 rem), actions pleine largeur, index de la carte en bande défilante, mur final en strip `scroll-snap`, règle une heure sur deux.
- **Test de généricité** : un modèle générique poserait un hero avec vue en fond, centré, flou ; ici le titre occupe la largeur sur fond gravier, la photo reste nette en dessous, la règle des heures porte l'ancre. Corrigé : pas de hero centré, pas de verre dépoli, pas d'eyebrow.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique) : le concept 2 proche de la braise est écarté. [x]
3. Concept Card au format exact, verbe « balayer ». [x]
4. Concept au pied (`Footer.astro` : `Regle` à 23 h), carte (index et `Regle` absente mais heures 8 h à 10 h 30 et prix), réservation (`reservation.astro` : règle et horaires), 404 (`404.astro` : soleil au-delà du rebord). [x]
5. Moment signature et recette : le soleil sur la règle (motion.md scrub), phase 2. [x]
6. Palette 6 rôles, références photos 02, 03, 07, 09. tokens.css:15 à 26. [x]
7. Défauts évités : fond gravier froid (pas crème), pas de terracotta, pas d'acide sur noir (vert sauge #a9bd78 tiré des tabourets, justifié), pas de dégradé violet, pas de verre dépoli, pas d'eyebrow, pas de 01/02/03, pas d'Inter ni de serif de réflexe. Seul dégradé : scrim ardoise sous la règle du hero (lisibilité). [x]
8. Test de généricité : § Système. [x]
9. Détails 7 vs 8 : sélection (engine.css, ink), focus dans l'accent (engine.css `:focus-visible`), favicon de l'identité (`public/favicon.svg`, soleil sur règle), OG composée (`public/og.png`, capture du hero), pied composé (`Footer.astro`), 404 dans le concept. Focus en phase 3 pour la vérification navigateur. [x partiel]
10. Polices : 4 fichiers dans `public/fonts/`, 2 préchargés dans `Base.astro`. [x]
11. Échelle fluide unique : tokens.css:31 à 38, sauts × 2. [x]
12. Display réglé : site.css `.display`, `.hero__titre` (-0,045 em, interligne 0,88), `text-wrap: balance`. [x]
13. Corps 16 à 18 px interligne 1,5, UI 13 à 14 px, mesure 68ch. [x]
14. Typographie française : insécables, apostrophes courbes, guillemets (plats.ts généré avec insécables). [x]
15. Grille 12 col, lignes fortes (gutter, colonne 8), cadre quatre coins non retenu : le soleil et la règle structurent (justifié, pas de cadre). [x]
16. Familles de section : poster, média, paire, index, paire, données, pied, une fois chacune sur l'accueil. [x]
17. Hero en 3 s : nom, cuisine, horaires, CTA dans le premier écran (mesure : h1 top 107 px, CTA 454 px à 1440x900). [x]
18. Mobile 390 recomposé : titre une ligne, `scrollW` = 390 sur 4 pages mesurées, bande défilante, strip snap, règle une heure sur deux. [x]
