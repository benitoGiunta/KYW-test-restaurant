# DESIGN, Champs Élysées (variante awwwards)

## Brief
- Sujet : brasserie « bistro convivial » de Jambes (Namur), avenue Albert Ier 149, ouverte le 13 juillet 1984 à la place du café Le Sportman. Maurice Druart (Momo) et Teresa la dirigent. Environ 120 couverts, 9 personnes. Carte de 94 lignes (croquettes, boulettes, vol-au-vent, viandes, bières, trappistes). Ouverte lundi au samedi 11 h à 22 h, dimanche 11 h à 16 h (site du client).
- Publics : midi (actifs, hôpital Saint-Camille voisin), soir (familles, groupes, fêtes patronales), terrasse, habitués de quartier. Métier : réserver, venir, lire la carte.
- Ressources : 12 photos du client (salle bleu-vert, plats, bière, spritz, carte), 2 mascottes PNG (serveur orange, logo vert), pas de photo d'équipe ni de chef.
- Contraintes : statique Astro sous `base` /champs-elysees/awwwards/, pas de backend (Zenchef en lien externe, tel:, mailto:).
- Hypothèses : code postal 5100 (restaurants.json) contre 5000 (site client), non corrigé ; horaires du site client (Rankeat dit 10 h à 23 h 30) ; carte du PDF d'octobre à confirmer ; aucun contenu fictif ajouté (aucun `placeholder`).

## Trois concepts (trois territoires)
| | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Le jour sans pause** : la page est une journée de 11 h à 22 h, le sol change d'heure en heure, chaque section porte son heure. | système formel : rythme horaire | 4 | 5 | 4 | 2 |
| B | **149** : l'avenue Albert Ier comme rue qu'on remonte, numéros de maison, façade. | lieu : Namur, avenue | 3 | 4 | 4 | 3 |
| C | **Le plateau** : la mascotte serveuse porte la page, tout est servi à l'épaule. | métier : le service | 3 | 3 | 3 | 3 |
Test de l'échange : A tient parce que la phrase « la maison ne ferme pas entre midi et soir » est un fait propre à ce lieu (service continu 11 h à 22 h, 7 j/7) ; un restaurant à service coupé ne peut pas la dire. B et C tiennent pour d'autres adresses ou d'autres salles. **Choix : A.** Détails récupérés : B donne la 404 (« Ici, ce n'est pas le 149 ») et la plaque de numéro ; C donne la mascotte du pied et de la 404.
Ancre : horaires continus 11 h à 22 h du lundi au samedi, dimanche 11 h à 16 h ; motif d'éventails du décor (mur de la salle, site actuel).

## Concept Card
- **Idée** : une journée de service continu : la page avance de 11 h à 22 h et la lumière du lieu, claire à midi, bleu nuit le soir, la suit.
- **Métaphore** : la salle qui change de lumière du déjeuner au dîner, sans jamais fermer.
- **Signature (et recette)** : la colonne des heures (trait vertical fort, heure collante en marge de chaque section) et le sol qui passe de midi à nuit ; phase 2 : `setBackground` piloté par la section visible (motion.md, fond par chapitre), le trait des heures qui se prolonge au scroll.
- **Émotion (3 premières secondes)** : on lit « Champs Élysées » en grand, orange sur blanc vert, avec la façade ; une grande salle simple et vive, ouverte maintenant.
- **Verbe** : prolonger (les traits, les barres, les fonds se prolongent sans coupure).
- **Capture** : l'accueil à la nuit tombante : grande phrase « La maison ne ferme pas entre midi et soir. », mascotte orange sur bleu nuit à éventails.
- **Ancre** : service continu 11 h à 22 h (site du client), motif d'éventails du décor.
- **Théâtre** : loader non (carte et réservation d'abord, la page se charge vite) ; GL non (les photos du client portent l'image, aucun effet n'apporte à une brasserie de quartier).

## Système
- **Palette** (références : boiseries blanches à médaillons verts, banquettes bleu-vert, façade bleu nuit, mascotte orange du client) : `ground` midi #EEF0E8, après-midi #DCE7DD, soir #1E4A40, nuit #0F2D27 ; `ink` #12302A (vert forêt du logo) ; `muted` #476259 (4,9:1 sur midi) ; `line` ink 20 % ; `accent` #D9481C (#FF7D4A sur les sols sombres) ; `curtain` #12362F. Défaut n° 1 évité : ce n'est ni crème, ni serif, ni terracotta : le fond est un blanc verdi du lieu, la typo un grotesque rond, l'accent l'orange vif de la mascotte.
- **Typo** : Bricolage Grotesque variable 200 à 800 (display, expressive comme le logo du client) et Hanken Grotesk 400 à 700 (corps). 2 fichiers woff2 (75 Ko), les 2 préchargés. Échelle fluide `--t-mega` 3,5 à 13 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 12 px. Display : 800, interlettrage -0,04 à -0,05 em, interligne 0,88 à 0,95, `padding-block` pour les descendantes, `text-wrap: balance`. Corps interligne 1,5, mesure 62 car. Prix `tabular-nums`, insécables « 24 € », « 12 h 30 » (U+00A0), « » et apostrophes typographiques.
- **Grille** : 12 colonnes, colonne 1 = colonne des heures séparée du corps par un trait vertical fort ; second trait fort : le filet de 2 px sous chaque titre de rubrique de la carte. Gutter fluide. Rayon : 0 (cadres droits). Humeurs d'espacement : hero compact, sections amples, bandes serrées, pied large.
- **Mouvement (phase 2)** : easing `ease.out` / `ease.inOut`, durées du tableau Timing, verbe prolonger. Hovers : CTA = fond qui monte (clip de bas en haut) ; nav et liens = trait orange qui se prolonge depuis la gauche ; lignes de carte et d'index = la ligne s'indente. Repos : le trait des heures respire très légèrement, immobile sous reduced motion.
- **Plan de composition** : accueil = poster (hero 11 h) / données (barres de la semaine, 15 h) / paire asymétrique (salle, 18 h) / index + liste de signatures (carte, 19 h) / filmstrip de 4 photos (20 h) / statement (21 h) / pied 22 h. Carte = rail sticky de rubriques + listes à filets (patron « index »). Histoire = poster, paire, citation en statement, chiffres, filmstrip. Réservation = deux grands CTA, informations pratiques, paire. 404 = plaque et mascotte.
```
Hero  [11h|  Champs      |  façade ]     Carte [rail|  RUBRIQUE ______ ]
      [   |     Élysées  |  2:3    ]           [    |  plat ..... prix ]
Mobile 390 : une colonne, heure en tête de section, strips en scroll-snap.
```
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur le premier jet (hero centré, trois cartes). Changé : hero poster asymétrique, heures en marge, carte en rail et filets, pied-phrase au lieu d'un pied de liens.

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : le concept ne correspond à aucun d'eux.
3. [x] Concept Card au format exact, verbe « prolonger » ci-dessus.
4. [x] Concept au pied (`Pied.astro` : sol nuit, phrase d'heures), à la carte (rail, filets, heure 19 h), à la réservation (sols midi puis soir) et à la 404 (plaque 149, sol nuit) : `src/components/Pied.astro`, `src/pages/404.astro`.
5. [x] Moment signature et recette : colonne des heures + sol qui suit l'heure (`.sec__hour`, `.ground-*` dans `src/styles/site.css`) ; animation en phase 2.
6. [x] Palette en 6 rôles, références réelles : `src/styles/tokens.css` lignes 18 à 28.
7. [x] Huit « defaults to avoid » : aucun (hero asymétrique, pas de gradient, pas de glass, pas d'eyebrow systématique, pas de 01/02/03 : les chiffres sont des heures) ; crème + terracotta écartés (voir palette).
8. [x] Test de généricité : section Système.
9. [ ] « Details that separate 7 from 8 » : sélection (`::selection` du socle), focus orange (`:focus-visible` du socle, `--c-accent`), favicon aux éventails (`public/favicon.svg`), OG par capture du hero (`public/og.png`), pied en composition finale et 404 dans le concept : faits ; sélection et focus à vérifier en phase 3.
10. [x] Polices : Bricolage et Hanken par `font.mjs` (`public/fonts/`, `tokens.css`), 2 fichiers préchargés dans `Base.astro`.
11. [x] Échelle fluide unique, grands sauts (`--t-mega` 56 à 208 px contre 16 à 18 px de corps) : `tokens.css`.
12. [x] Display réglé : `.display` (`site.css`) interlettrage négatif, interligne 0,9, balance, descendantes.
13. [x] Corps 16 à 18 px, interligne 1,5, mesure 62 car. ; UI 12 à 14 px, `muted` AA.
14. [x] Typographie française : insécables dans `site.ts` et pages, « » et ’, aucun tiret long (`grep` à 0).
15. [x] Grille 12 colonnes, trait vertical des heures, filet 2 px de rubrique ; pas de cadre quatre coins (justifié : le trait des heures remplit ce rôle).
16. [x] Une famille de section au plus une fois par page : accueil poster, données, paire, index, strip, statement ; chaque page en varie les familles.
17. [x] Hero en 3 s : nom, cuisine, CTA Réserver et Appeler sans défiler (mesuré 1440×900, 1280×720, 1024×768, 390×844 : CTA au-dessus de la ligne de flottaison, aucun débordement horizontal).
18. [x] Mobile 390 recomposé : une colonne, heure en tête de section, strips `overflow-x` + `scroll-snap`, nav sur deuxième ligne, type re-réglé par `clamp`.
