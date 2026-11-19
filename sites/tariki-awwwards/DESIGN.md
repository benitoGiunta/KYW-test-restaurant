# DESIGN, Tariki (variante awwwards)

## Brief
Sujet : Tariki, cuisine levantine au feu de bois, Rue de l'Ouvrage 2, Namur. Publics : midi du mercredi au samedi (sandwich 9 €, formule 17 €), soir du lundi au samedi, habitués de Bayti, curieux de la carte. Métier : réserver, venir, lire la carte. Ressources : trois visuels d'ambiance du client (braises, feu, arcades illustrées), aucun plat ni salle, aucun avis. Contraintes : statique, `base` /tariki/awwwards/, noindex. Hypothèses : voir `src/data/site.ts` (tête) et ETAT.md.

## Trois concepts
| Concept | Territoire | Phrase | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A. La route | étymologie (« mon chemin ») + récit migratoire | Le site est un chemin à cinq étapes qui finit à votre table. | 4 | 5 | 5 | 1 |
| B. La calligraphie | écriture arabe du logo, sens de lecture | Le mot s'écrit de droite à gauche, la carte se lit dans les deux sens. | 4 | 3 | 3 | 2 |
| C. Les trois portes | trilogie Bayti, Comptoir, Tariki | Trois adresses, trois seuils, un même foyer. | 3 | 3 | 4 | 1 |
Test de l'échange : A ne tient avec aucun autre restaurant (les cinq pays, la baseline et le nom sont à Tariki). Retenu : A. B fournit le mot arabe (en-tête, héros). C fournit la section « Trois adresses » de l'histoire.

## Concept Card
- Idée : Tariki signifie « mon chemin » ; chaque page est un tronçon de la même route, de la Syrie à Namur.
- Métaphore : le voyage. La carte est parcourue étape par étape, l'arrivée est la table.
- Signature (et recette) : le fil de la route, tracé au scroll (stroke-dashoffset piloté par ScrollTrigger, motion.md « draw »), étapes qui s'allument ; en phase 1 le fil est statique et complet.
- Émotion (3 premières secondes) : on lit « Tariki », le mot arabe, la baseline, et on voit déjà où mène le chemin.
- Verbe : cheminer.
- Capture : le héros (nom, mot arabe, fil à cinq étapes sur charbon) et le « Votre table. » final.
- Ancre : Syrie, Liban, Turquie, Grèce, puis la Belgique (récit du client) ; baseline « De notre route… jusqu'à votre table. ».
- Théâtre : loader non (le site est court, le fil du héros est l'ouverture) ; GL non (aucune photo de plat à déformer, le tracé SVG suffit).

## Système
Palette (rôles) : ground #15110d (charbon éteint), ink #efe5cf (lin), muted #b8a98f, line #3e3329, accent #e0a030 (ocre du logo), curtain #0a0705 ; sections « papier » #e7dcc4 / #1b140d (pierre d'arcade). Références : logo noir, crème et ocre du client, charbon de bois refroidi, enduit ocre des arcades. Le défaut n° 1 (crème, serif contrasté, terracotta) est évité : fond sombre, accent doré, serif massif.
Typo : Young Serif 400 (display, noms de plats, prix en lining nums), Schibsted Grotesk 400..900 (corps, UI), Amiri 700 réduit au mot طريقي (4 Ko). Échelle fluide `--t-mega` à `--t-xs` (tokens.css). Display : interlettrage -0,02 à -0,04 em, interligne 0,9 à 1, `text-wrap: balance`, `padding-bottom: 0.08em`. Corps 16 à 18 px, UI 13 à 14 px. Insécables : « 17 € », « 11 h 30 », « : ».
Grille : 12 colonnes (1 au téléphone), lignes fortes : le fil horizontal (accueil, pied) et le fil vertical (carte, histoire). Une règle de forme : angles vifs, seules les étapes sont des disques.
Mouvement (phase 2) : ease.out/inOut de l'engine ; rideau latéral (déjà en place) ; fil qui se trace ; hover : CTA remplissage, liens soulignement, lignes d'index décalage ; repos : immobilité décidée (le fil ne bouge que sous le doigt de l'utilisateur).
Plan de composition : accueil = poster (héros), énoncé, index des étapes, affiche de prix sur papier (midi), paire asymétrique (arcades, horaires), pied final ; carte = fil vertical collant + listes ; histoire = narration (texte + fil vertical), trois colonnes, média plein cadre ; réservation = deux colonnes d'actions et de données ; 404 = fil interrompu. Mobile 390 : titres recalés par mot (`--mot`), fil horizontal conservé, fil de la carte en bande défilante `scroll-snap`.
Test de généricité : un modèle générique mettrait une photo de plat plein cadre et un menu en cartes ; ici aucune photo de plat n'existe, le fil, le mot arabe et les prix en affiche portent la page (oui corrigé).

## Sur-utilisation de la skill
1. Trois concepts notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (ni braise qui refroidit, ni pavage, ni solde, ni phrase unique). [x]
3. Concept Card au format exact, verbe « cheminer ». [x]
4. Concept au pied (`Footer.astro`, fil + « Votre table. »), à la carte (fil vertical, étapes), à la réservation, à la 404 (`pages/404.astro`, fil cassé). [x]
5. Moment signature : le fil qui se trace (recette draw), à livrer en phase 2. [ ] (statique prêt : `Route.astro`)
6. Palette de 6 rôles + papier, références nommées. [x]
7. Défauts évités (crème+terracotta, acide sur noir, dégradé violet, verre, eyebrow, 01/02/03 décoratifs, polices réflexes). L'index numérote 1 à 5 car c'est l'ordre des étapes. [x]
8. Test de généricité. [x]
9. Détails 7 vers 8 : sélection inversée (engine.css), focus ocre (`:focus-visible`), favicon `public/favicon.svg` (le fil et son point), OG composée `public/og.png`, pied en composition finale, 404 dans le concept. [x]
10. Polices : 3 fichiers, 2 préchargés. [x]
11. Échelle fluide unique. [x]
12. Display réglé. [x]
13. Corps et UI. [x]
14. Typographie française. [x]
15. Grille et lignes fortes (cadre quatre coins non retenu : le fil remplace le cadre). [x]
16. Une famille de section au plus une fois par page. [x]
17. Hero en 3 s : mesuré, CTA y ≤ 656 à 1440×900, ≤ 604 à 1280×720, ≤ 556 à 1024×768, 513 à 390×844. [x]
18. Mobile 390 recomposé, aucun débordement horizontal sur 5 pages. [x]
