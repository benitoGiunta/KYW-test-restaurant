# DESIGN : Partage (variante portfolio)

Restaurant : Partage, rue des Fossés Fleuris 18, Namur. Bistro à plats à partager de Charles Jeandrain (Attablez-vous).
Gabarit : **Ardoise** (`gabarits/ardoise`), adapté. Sources : `data/restaurants/partage/{dossier.md,donnees.json,photos/}`.

## Choix du gabarit

Notes sur 5 : positionnement (bistro de centre-ville, chef étoilé, carte à partager) · ambiance (salle claire, chêne,
briques crème ; identité noir / crème / ocre) · matière (19 photos, dont 8 de salle en 600 px, 4 d'assiettes ; carte
complète transcrite ; histoire courte ; aucun avis client) · type de carte (carte longue à prix, lunch du midi, longue
carte de bar) · réservation (lien vers le site actuel, outil inconnu) · signature (le moment fort a-t-il un sens ici ?).

| Gabarit | Posit. | Ambiance | Matière | Carte | Résa | Signature | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **ardoise** | 5 | 4 | 5 | 5 | 4 | 5 | **28** | la carte d'abord, onglets MIDI / SOIR = lunch du midi / carte du soir ; non utilisé |
| comptoir | 3 | 4 | 3 | 2 | 4 | 2 | 18 | menu unique d'auteur, Partage est l'inverse (moins guindé) |
| velours | 3 | 3 | 3 | 2 | 4 | 2 | 17 | gastronomie feutrée, chiffres monumentaux sans matière |
| nocturne | 3 | 2 | 3 | 4 | 4 | 2 | 18 | carte de bar riche, mais salle claire et photos de jour |
| cahier | 3 | 3 | 2 | 3 | 4 | 2 | 17 | exige producteurs et menu du jour écrit |
| verger | 2 | 3 | 2 | 2 | 4 | 1 | 14 | roue des saisons sans matière, déjà utilisé (atelier-de-bossime) |
| quatre-mains | 2 | 2 | 2 | 3 | 4 | 1 | 14 | exige deux voix ; déjà utilisé |
| maree, encre, forno, braise | 1-2 | 1-2 | 3 | 3 | 4 | 1 | ≤ 14 | fruits de mer, asiatique, four, feu : hors sujet |
| affiche, guinguette, collage, journee | 2 | 1-2 | 3 | 3 | 4 | 1-2 | ≤ 15 | registre populaire ou multi-activités |

Décision : **Ardoise**. Partage publie aujourd'hui sa carte en cinq GIF illisibles sur mobile ; l'ardoise en fait
l'accueil, en texte, avec les prix alignés. Les onglets MIDI | SOIR correspondent exactement à l'offre (lunch 38 € le
midi, carte à partager le soir) ; la suggestion du jour devient « à partager ce soir ».

## Adaptation

- **Sections conservées** : barre d'état (horaires réels), ardoise (nom, accroche, suggestion du jour, onglets), formules
  (renommées « Trois façons de partager » : lunch 38 €, carte dès 11 €, salle pour 20 à 30), salle claire et mots géants,
  la maison, horaires et accès ; pages carte, salle, maison, réservation, 404.
- **Retirées** : toutes les lignes « exemple » (la carte de Partage est réelle et complète), les avis d'exemple, la
  privatisation du samedi, les montants de bon cadeau (inconnus), Zenchef.
- **Ajoutées** : rubrique **Le bar** sur la page carte (13 catégories de boissons du GIF, service `bar`, hors onglets) ;
  vins au verre en service `tous` (dans les deux onglets, prix verre puis bouteille) ; note « à confirmer » sous chaque
  tableau d'horaires (`horairesNote`) ; signature « Charles Jeandrain » sous le nom (`.ardoise__signature`, reprend le logo) ;
  section presse et note Google à la place des avis.
- **Pages** : la page « Formules » devient « Lunch et groupes » (même route `/formules/`, libellés de nav adaptés).
- **Composants modifiés** : `Ardoise.astro` (libellé de plage de jours « mer. au sam. »), `site.ts` (`Rubrique`,
  `horairesNote`, `cadeau` sans montants, `servicesTexte()` en plages).

## Art direction

- Accent ocre `#D99A1E` relevé sur la nav du site actuel ; fond noir chaud `#1D1C1A` (le noir de la façade) ; crème
  `#F0EBE1` des briques peintes pour les pages claires (salle, réservation). Typographies du gabarit conservées
  (Cabinet Grotesk 800, Schibsted Grotesk) : le logo de Partage est une capitale linéaire espacée, proche de l'esprit.
- Photos : 19 WebP (sharp, q 80, sans agrandissement : sources de 600 à 1200 px) ; 3 aperçus 4:5 (jambon ibérique sur les
  croquettes, fritures au citron sur les calamars, verres sur les vins au verre). La page carte dit que les photos au
  survol sont des photos de la maison, pas toujours du plat exact. OG : chef en cuisine recadré 1200×630. Favicon : P ocre.

## Système

- **Palette** : ground noir chaud `#1D1C1A`, ink craie `#F3F1EA`, accent ocre `#D99A1E` (7:1) (survol, onglet actif, barre du
  loader, prix du jour), muted `#A3A09A` (6,6:1), filet craie 15 %, ground crème `#F0EBE1` (salle, contact,
  formulaires) avec muted sombre `#5D5A54` (6:1). L'ocre ne porte jamais de texte sur fond clair.
- **Typo** : Cabinet Grotesk 800 (Fontshare, `public/fonts/cabinet-grotesk-800-normal.woff2`) en capitales, tracking
  -0.03em : nom, catégories, onglets, mots géants, prix des formules. Schibsted Grotesk 400/700 (Google) : lignes de carte,
  UI, texte ; `font-variant-numeric: tabular-nums` partout où il y a un prix.
- **Grille** : accueil : colonne de carte sur 8 colonnes (3 à 10) de 12 ; aperçu flottant hors grille (`position: fixed`,
  22 vw, 4:5) ; pages secondaires 12 colonnes. Mobile : 16 px de gouttière, vignettes inline 56 px.
- **Rythme** : dense et régulier : lignes 56 px, filets 1 px craie à 15 %, 48 px entre catégories ; une seule section pleine
  hauteur (l'ardoise). **Radius** : 0 ; prix cerclés à 999 px sur la version claire seulement. **Textures** : aucune.
- **Motion language** : `expo.out`, 0,4 à 1,2 s ; lignes qui « s'écrivent » (clip-path gauche → droite, stagger 0,04) ;
  prix des formules en chars ; mots géants en parallaxe à vitesses différentes ; marquee d'état lent (idle unique).
  Signature (phase 2) : sous le nom, « Charles Jeandrain » s'écrit de gauche à droite à l'intro, puis un trait ocre
  (celui du loader) se trace à sa suite. Loader : ardoise, nom en Cabinet, trait jaune qui se trace ; sortie : le panneau glisse vers la droite comme un coup
  d'éponge. Transition : panneau ardoise qui balaie de gauche à droite.

## Taux d'adéquation estimé : 85 %

1. La carte réelle et complète (cuisine, lunch, vins, bar) devient lisible et indexable, ce qui corrige le premier défaut
   du site actuel.
2. L'offre colle aux onglets du gabarit (midi = lunch, soir = carte à partager) et à l'identité noir / crème / ocre.
3. Aucune donnée inventée affichée : presse et note Google réelles, suggestions = plats réels (jour illustratif marqué).

Ce qui limite : peu de photos d'assiettes (3 aperçus au lieu des 8 attendus par le gabarit), heures de service non
confirmées, outil de réservation inconnu (lien vers le site actuel), l'ardoise sombre contraste avec une salle très claire.

## Révision 1 (REVUE-1, 01/11/2026)

- Barre basse « Réserver / Appeler / Bon cadeau » : mobile et tablette seulement (< 1024 px). En desktop, l'en-tête porte
  « Réserver » ; la barre faisait ~17 % de la hauteur et triplait « Réserver » (F2-6). `--barre: 0px` à partir de 1024 px.
- Navigation mobile (< 768 px) : les cinq entrées deviennent quatre libellés courts (Carte, Lunch, Salle, Maison) sur
  une seule ligne ; « Réserver » est porté par la barre basse (F2-5). En-tête inchangé en hauteur (57 px), donc les
  onglets sticky gardent leur décalage.
- Accueil : vins au verre rendus une seule fois sous les deux panneaux ; formules sans leur description (lien vers
  `/formules/`) ; légende « Photos de la maison, pas toujours du plat exact » sous les onglets (F2-1, F2-4).
