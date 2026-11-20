# DESIGN.md : Brasserie Edgard, variante awwwards « Le cadran »

## Brief
- **Sujet** : Brasserie Edgard (« Mr Edgard »), brasserie belge à Saint-Servais (Namur), Chaussée de Waterloo 473. Ouverte tous les jours de 10 h à 22 h 30, cuisine fermée de 15 h à 18 h sauf week-end et jours fériés. 71 plats, lunch 14,50 € / 21,50 €, menus de groupe 34 à 49 €.
- **Publics** : le midi (affaires, lunch en semaine), le soir (famille, grande faim), les groupes (plus de 10, 16 au maximum), les habitués. Métier : réserver (Barestho ou téléphone), venir, lire la carte.
- **Ressources** : 30 photos du client (salle, bois sculpté, terrasse, façade, 6 plats), logo SVG foncé et blanc, données de carte complètes. Pas d'avis, d'histoire ni de presse.
- **Contraintes** : statique (Astro), `base` `/brasserie-edgard/awwwards/`, réservation sans backend.
- **Hypothèses** (aussi en tête de `site.ts`) : la salle reste ouverte pendant la pause de cuisine (ouverture 10 h à 22 h 30 sans coupure) ; e-mail repris de restaurants.json avec réserve ; groupes « plus de 10, 16 au maximum » repris tel quel ; aucun plat ni donnée fictif.

## Trois concepts (trois territoires)
| | A. Le cadran | B. Le sillon | C. L'ardoise du jour |
|---|---|---|---|
| Territoire | Rythme horaire, lieu (l'horloge en mosaïque de la salle) | Matière du lieu (bois sculpté en sillons du comptoir et des murs) | Service (suggestions, plat du jour) |
| Phrase | « La brasserie se lit comme un cadran : ouverte de 10 h à 22 h 30, cuisine en pause de 15 h à 18 h. » | « Chaque rubrique est un sillon creusé dans le bois. » | « La carte change au gré de l'ardoise. » |
| Règle de mise en page | Le temps découpe les sections ; l'anneau de 24 h revient du hero au pied | Courbes de niveau en fond, lignes sinueuses entre rubriques | Une colonne, une ardoise noire |
| Verbe | tourner | creuser | écrire |
| Voix typo | Serif contrasté Gambarino + grotesque Hanken | Gras condensé | Manuscrite |
| Palette | Mur crème, noyer, cuir caramel, verres prune | Bruns | Noir et craie |
| Signature | Aiguille qui prend l'heure de Namur et un anneau qui s'allume (motion.md, rotation scrubbée) | Dessin SVG animé en trait (webgl.md non nécessaire) | Écriture à la craie |
| Ancre réelle | Horaires exacts, pause de cuisine 15 h à 18 h, horloge murale en mosaïque (photo 19) | Bois sculpté (photos 03, 05, 08) | Suggestions du moment du site |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 5 / 2 | 3 / 4 / 3 / 3 | 2 / 3 / 4 / 4 |
- **Test de l'échange** : la phrase A tient seulement avec une maison qui a une coupure de cuisine de 15 h à 18 h et une horloge dans la salle. B tiendrait chez tout restaurant à décor sculpté, C chez n'importe quel bistrot. **A retenu** (la plus forte, et l'usage réel : savoir si la cuisine est ouverte).
- Détails repris des écartés : le bois sculpté devient la couleur des sections sombres, la terrasse et le pied (B) ; l'ardoise reste une idée de phase 3 pour les suggestions (C).
- Exemples travaillés de concepts.md évités : ni braise qui refroidit, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique. Le cadran ne rend pas une « heure » abstraite : il porte une information métier.

## Concept Card
- **Idée** : la brasserie est lue comme un cadran de 24 h, midi en haut, minuit en bas. Un arc cuir pour la salle (10 h à 22 h 30), un arc prune pour la cuisine, un trou pointillé de 15 h à 18 h en semaine.
- **Métaphore** : le service d'une brasserie qui ne ferme pas, l'horloge en mosaïque de la salle.
- **Signature (et recette)** : l'aiguille du cadran du hero pointe l'heure de Namur et se déplace au chargement, l'arc de la plage courante s'allume (motion.md, rotation GSAP, `ease.out`).
- **Émotion (3 premières secondes)** : « C'est ouvert, je sais quand, je réserve. »
- **Verbe** : tourner (aiguille, transition de page par rideau de bois qui monte, sections qui s'enchaînent comme des plages horaires).
- **Capture** : le hero avec le cadran et la façade de nuit en bandeau.
- **Ancre** : horaires réels du client (10 h à 22 h 30, cuisine fermée 15 h à 18 h sauf week-end et fériés).
- **Théâtre** : loader non (une brasserie ouverte toute la journée ne fait pas attendre ; le rideau de transition suffit) ; GL non (le cadran est un SVG, aucun besoin de plan GL).

## Système
- **Palette** (rôles) : `ground` #f1e7cf (mur crème de la salle, photos 07 et 13), `ink` #231710 (noyer presque noir), `muted` #6b5645, `line` #d6c5a0, `accent` #a3214b (verres prune des tables, photos 06 et 14), `curtain` #2b1b12 (bois sculpté sombre du mur). Compléments : cuir caramel #c27a38 (chaises, décoratif), `bois-muted` #d6bd98 et `bois-accent` #e69a56 pour les sections sombres. Références : mur de la salle, cuir des chaises, verres de table, logo (#233D4D) du client.
- **Typo** : Gambarino (Fontshare, serif contrasté à large œil) pour les titres, Hanken Grotesk (Google, variable 100 à 900) pour le corps et l'UI. Échelle `--t-mega` 3,75 à 13 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Display : interlettrage -0,02 em, interligne 0,88 à 0,95, `text-wrap: balance`. Prix `tabular-nums`, insécables.
- **Grille** : 12 colonnes (une seule au téléphone), lignes fortes : filet noir sous la journée, bord gauche des titres, section sombre pleine largeur. Quatre humeurs d'espacement `serre`, `normal`, `aere`, `entracte`. Rayon : 0 sauf pastilles et boutons (formes rondes de l'horloge).
- **Mouvement (à planifier en phase 2)** : easing `ease.out` pour les révélations, `ease.inOut` pour le rideau ; durées 0,8 à 0,9 s. Hovers : (1) soulignement qui se redessine pour liens et nav, (2) plaque qui se remplit pour CTA. Repos : l'aiguille avance en temps réel (une minute de rotation), pas d'autre mouvement.
- **Plan de composition** : Accueil = affiche (hero texte + cadran), média plein cadre (façade), index horaire (journée), mur asymétrique sur noyer (plats), paire texte/horloge + filmstrip (salle), données (14,50 €, groupes, 7 j / 7), pied final avec cadran. Carte = liste index à titre collant et vignette, filet pointillé entre lignes. Maison = média plein cadre, texte, paire décalée, section sombre de terrasse. Réservation = deux CTA et photo, puis blocs pratiques.
- **Mobile 390** : titres 19 vw, une colonne, cadran 24 rem centré, mur de plats décalé à 70 % de largeur, filmstrip en `overflow-x` + `scroll-snap`, menu plein écran.
- **Test de généricité** : un modèle générique mettrait une photo plein écran avec bouton rose. Ici le hero est un cadran qui dit l'ouverture ; la carte reste une carte lisible. Oui à « crème + serif » : justifié, la crème est celle du mur de la salle et l'accent est le prune des verres, pas la terracotta.

## Sur-utilisation de la skill (cochés avec preuve)
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé : § Trois concepts, dernière ligne.
3. [x] Concept Card exacte, verbe « tourner » : § Concept Card.
4. [x] Concept au pied (`Footer.astro` : cadran et « Dix heures, vingt-deux heures trente. »), à la carte (rubriques, horaires du lunch), à la réservation (horaires), à la 404 (`404.astro` : cadran vide, « Cette page n'est pas à l'heure. »).
5. [x] Moment signature : aiguille à l'heure de Namur, recette motion.md rotation (phase 2) ; le cadran statique est en place (`Dial.astro`, `[data-dial-aiguille]`).
6. [x] Palette 6 rôles dérivés des photos : § Système, `tokens.css:21-33`.
7. [x] Défauts évités : pas de terracotta (prune), pas d'acide sur noir, pas de dégradé, pas de verre dépoli, pas d'eyebrow sur chaque titre (un seul, hero), pas de 01/02/03, polices ni Inter ni Fraunces ni Instrument ni Playfair. Crème + serif justifié plus haut.
8. [x] Test de généricité : § Système.
9. [~] Détails 7 vers 8 : sélection prune (`site.css` `::selection`), focus prune (caramel clair sur noyer), favicon cadran (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale, 404 dans le concept. À vérifier en phase 3.
10. [x] Polices : Gambarino 400 (16 Ko), Hanken variable (34 Ko), 2 préchargées (`Base.astro`).
11. [x] Échelle fluide unique `tokens.css:39-46`, sauts d'environ ×2.
12. [x] Display réglé : `site.css` `.display` (interlettrage -0,02 em, interligne 0,95, balance).
13. [x] Corps 16 à 17 px, interligne 1,5 (`engine.css`), UI 13 à 14 px.
14. [x] Typographie française : insécables dans les heures et prix, « » et ’ ; aucun tiret cadratin (grep 0 dans `src/` et `dist/*.html`).
15. [x] Grille 12 colonnes, lignes fortes (filet de la journée, titres alignés), cadre équivalent : bords des sections pleine largeur noyer / crème.
16. [x] Une famille de section au plus une fois par page (accueil : affiche, plein cadre, index, mur, paire + filmstrip, données, pied).
17. [x] Hero en 3 s : nom, « brasserie belge », 10 h à 22 h 30, Réserver et Appeler au-dessus de la flottaison (mesure ci-dessous).
18. [x] Mobile 390 recomposé (`site.css`, bloc `max-width: 900px`).

### Mesures de grille (Playwright, 4 viewports, 5 pages)
Aucun débordement horizontal (`scrollWidth` = largeur). Hero : h1 et cadran sur colonnes disjointes (1440 : h1 26 à 821, cadran 854 à 1407 ; 1024 : h1 21 à 582, cadran 608 à 998). Aucune requête échouée. `left` des `.display` : 13 px à 390 pour une marge de 16 avant retrait de l'alignement optique négatif ; contrôlé de nouveau en phase 3.
