# DESIGN : Le Royal Namur, variante awwwards « Face à face »

## Brief
- Sujet : brasserie de la Place du Théâtre 13, Namur, face au Théâtre de Namur ; cuisine de brasserie généreuse (moules jumbo, boulettes, burger, vol-au-vent), vins du patron, bières au fût, terrasse. Cuisine ouverte 7 j/7, 12 h à 14 h 30 et 18 h à 22 h.
- Publics : midi (affaires), soir (amis), avant ou après spectacle, touristes de la place, habitués. Métier du site : réserver (Zenchef ou 081 22 01 33), venir, lire la carte.
- Ressources : 8 photos exploitables (terrasse face au Théâtre, façade en brique, plats, boissons), logo et couronne trop petits (non utilisés, wordmark composé). Contraintes : statique, `base` `/le-royal/awwwards/`.
- Hypothèses : histoire, équipe, chef, année d'ouverture inconnus et non inventés ; n° 13 retenu (une source donne le 2) ; ardoise à 20 € lue sur la photo 04, conditions à confirmer.

## Trois concepts
1. **Face à face** : le Royal est assis en face d'un théâtre. Phrase : « Une brasserie et un théâtre se regardent à travers une place. » Règle : chaque page est un diptyque, deux faces séparées par un axe (ligne fine à la colonne 7). Verbe : faire face. Voix : serif contrasté sec contre grotesque neutre. Palette : pierre claire, ardoise, brique, jaune des chaises. Signature : l'axe, deux moitiés qui se répondent (contre-défilement en phase 2). Ancre : terrasse face au Théâtre, photo 04. Originalité 4, adéquation 5, faisabilité 4, portabilité 2.
2. **L'ardoise** : tout s'affiche comme sur l'ardoise de la terrasse (moules jumbo à 20 € mardi et jeudi). Règle : tout est annoncé en craie. Verbe : afficher. Ancre : l'ardoise. Originalité 3, adéquation 4, faisabilité 5, portabilité 3. Écarté ; ne fournit que la section « ardoise » de l'accueil (fond nuit, prix en jaune).
3. **Deux services** : le jour se joue en deux temps, midi et soir. Règle : un cadran à deux arcs. Verbe : servir. Ancre : 12 h à 14 h 30 / 18 h à 22 h. Originalité 3, adéquation 3, faisabilité 4, portabilité 4. Écarté ; fournit la bande d'horaires.
- Test de l'échange : la phrase du concept 1 échoue avec tout autre restaurant (un théâtre en face, une place, un n° 13). Retenu pour cela.

## Concept Card
- **Idée** : le restaurant et le théâtre se font face ; le site joue ce vis-à-vis.
- **Métaphore** : la place entre deux façades, l'axe entre deux moitiés.
- **Signature (et recette)** : l'axe vertical à la colonne 7 ; phase 2 : contre-défilement des deux faces (motion.md, parallaxe opposée), repli sans JS = diptyque statique.
- **Émotion (3 premières secondes)** : on est déjà sur la place, la terrasse devant le Théâtre, l'action est « Réserver une table ».
- **Verbe** : faire face (répondre : le remplissage des CTA vient du côté opposé, le prix répond au nom).
- **Capture** : accueil, titre « Le Royal Namur » en serif à gauche, photo de la terrasse à droite.
- **Ancre** : terrasse en face du Théâtre de Namur ; Place du Théâtre n° 13 ; ardoise mardi et jeudi.
- **Théâtre** : loader non (site de service, LCP prioritaire, le rideau de transition suffit) ; GL non (la photo de la place est le sujet, aucun effet n'apporte).

## Système
- **Palette** : ground `#e3e6e4` pierre claire de la place ; ink `#14181d` ardoise du Théâtre la nuit ; muted `#4a545c` pierre bleue mouillée ; line `#b7bec0` joints des pavés ; accent `#a2301e` brique de la façade (photo 08) ; curtain `#7a2417` brique sombre ; sections nuit : fond ink, texte ground, muted `#aab4ba`, jaune `#f0c232` des chaises de terrasse. Contrastes mesurés : ink/ground 14,2, muted/ground 6,2, accent/ground 5,6, blanc/accent 7,1, jaune/ink 10,6.
- **Défauts écartés** : pas de crème + terracotta (fond gris froid, brique de la façade du client, justifiée par la photo), pas d'eyebrow sur chaque titre, pas de 01/02/03, pas d'Inter/Fraunces/Playfair.
- **Typo** : Melodrama 500 et 700 (Fontshare, serif contrasté de brasserie, écho de la serif condensée du site actuel) pour le display ; Host Grotesk variable 400 à 700 (Google) pour le corps et l'UI. 3 fichiers, 2 préchargés (Melodrama 700, Host Grotesk). Échelle fluide `--t-mega` 68 à 248 px, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 17 px, `--t-s` 14, `--t-xs` 13. Display : interlettrage -0,025em, interligne 0,95, `text-wrap: balance`. Prix `tabular-nums`, insécables (« 24 € », « 12 h 30 »).
- **Grille** : 12 colonnes (une seule en dessous de 48 rem). Lignes fortes : le gutter gauche et l'axe à la colonne 7. Espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Rayon 0.
- **Mouvement (à réaliser en phase 2)** : easing `ease.out|inOut|soft` de l'engine ; rideau de transition brique qui traverse de gauche à droite (déjà en place) ; hover : CTA = remplissage depuis le côté opposé, nav = soulignement qui se dessine, plats = décalage de la ligne, images = zoom 1,03 ; repos : l'axe respire (phase 2), immobilité sinon.
- **Plan de composition** : accueil = poster (titre + photo) / bande horaires / énoncé + diptyque asymétrique / nuit (ardoise + photo) / index de plats / diptyque menu des fêtes / pied final. Carte = index nom face au prix, rubriques en paires alternées (tête à gauche puis à droite). À propos = diptyque + données (Repères). Réservation = diptyque actions / lieu. 404 = énoncé seul. Mobile 390 : une colonne, l'axe devient un filet horizontal entre les deux faces, photo de hero sous le titre, titre recalé à 21 vw.
- **Test de généricité** : un modèle générique mettrait un hero plein cadre sombre avec bouton centré. Remplacé : hero à deux moitiés écrit à l'échelle de la place, prix en face du nom, section nuit pour l'ardoise.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires (lieu, matière, temps), notés, ancre, test de l'échange : § Trois concepts.
2. Aucun exemple travaillé de concepts.md utilisé (ni braise, pavage, gril, cadre, solde, phrase unique).
3. Concept Card au format exact, verbe compris : § Concept Card.
4. Concept au pied (« Face à face. », `Footer.astro`), à la carte (`.rubrique` alternées, nom face au prix), à la réservation (diptyque `reservation.astro`), à la 404 (« Hors de la place. »).
5. Moment signature : l'axe et sa recette de contre-défilement, en phase 2 (planifié, non prouvé).
6. Palette 6 rôles + nuit, références réelles (photos 04 et 08) : § Système.
7. Défauts à éviter : § Système, écartés ou justifiés.
8. Test de généricité : § Système.
9. Détails 7 vs 8 : sélection brique (`site.css` ::selection), focus dans l'accent (`:focus-visible`), favicon de l'identité (`public/favicon.svg`, deux faces brique et jaune), OG composée (`public/og.png`, capture du hero, à refaire phase 3), pied en composition finale, 404 dans le concept.
10. Polices : Melodrama + Host Grotesk, `public/fonts/`, 3 fichiers.
11. Échelle fluide unique `tokens.css`, sauts d'environ ×2.
12. Display réglé : `.display` dans `site.css`.
13. Corps 16 à 17 px, interligne 1,55, UI 13 à 14 px en AA.
14. Typographie française : insécables dans `prix()` et les données, apostrophes ’, « » ; zéro tiret cadratin (contrôle Python, 0 occurrence).
15. Grille 12 colonnes, ligne forte à la colonne 7 ; pas de cadre quatre coins, axe central justifié par le concept.
16. Famille de section au plus une fois par page : diptyque sur accueil (2 usages : face et fêtes, familles distinctes : énoncé + paire / tarifs), à revoir en phase 2.
17. Hero en 3 s : mesuré à 1440×900 (CTA bottom 880), 1280×720 (715), 1024×768 (654), `lr-mesure.log`.
18. Mobile 390 recomposé : mesuré 390, 360, 320, `scrollWidth` = largeur, aucun débordement.
