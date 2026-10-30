# DESIGN — gabarit « Verger »

## Concept Card
- **Idée** : la page est un calendrier agricole. Une roue des 12 mois tourne au scroll (pin, scrub) ; le mois courant,
  lu sur l'horloge du visiteur, est en haut et son secteur est vert. Autour de la roue, les 4 services du menu réel
  (menu unique de saison) sont posés comme « menu actuel », sans attribution à un mois (révision 1).
- **Métaphore** : le verger derrière la cuisine : ce qui est mûr, ce qui vient.
- **Verbe de motion** : *pousse* (tout entre depuis la ligne de base ou depuis le bas, par clip-path ou translation).
- **Émotion** : la patience, savoir d'où ça vient.
- **Cible** : table de saison, ferme-table, végétal.
- **Signature** : la roue des saisons (SVG 12 secteurs + 24 vignettes HTML contre-rotées par une seule variable CSS `--rot`).

## Système
- **Palette** (cahier) : ground `#F8F6F0`, encre vert feuille `#2E5B3A`, texte `#262420`, accent rose radis `#DD7A8E`,
  terre `#5A4634`, ligne pierre `#CFCAC0`. Le vert est l'encre (titres, boutons, secteur du mois), jamais un décor ; pas
  d'illustration de feuille, pas de kraft. Rose radis : une seule fonction, la marque du mois courant et le survol.
- **Typo** : Newsreader (Google, opsz) 400/400i/500 pour le display éditorial et le texte, tracking -0.01em ;
  Sofia Sans Condensed (Google) 300/600 pour les mots empilés, étiquettes et meta, capitales +0.04em.
  Fichiers woff2 locaux `public/fonts/`, préchargés dans Base.astro.
- **Grille** : axe central strict. `.col` = 560 px centrés pour le texte ; vignettes 280 px centrées ; `.escalier` =
  deux colonnes décalées gauche / droite. Pas de grille 12 colonnes : trois largeurs (560, 880, pleine).
- **Rythme** : 300 px de silence entre les blocs en desktop (`--silence`), 160 px en mobile ; la roue est la seule
  section pleine hauteur (pin 300 % desktop, 200 % mobile).
- **Radius** : 0 pour les vignettes et boutons, 2 px pour les étiquettes.
- **Motion language** : ease `expo.out` (entrées), `expo.inOut` (rideau) ; durées 0,9 à 1,3 s ; révélations par
  `clip-path inset(100% 0 0 0)` (pousse) et translation depuis la ligne de base ; idle unique : la roue dérive 0,2°/s.
- **Loader** : branche verte dont les 12 feuilles se remplissent avec la progression (plancher 1,1 s, sortie 0,8 s) ;
  compteur remplacé par le nom du mois. Pas de compteur en mobile (feuilles seulement).
- **Rideau** : panneau vert qui pousse depuis le bas (`scaleY` origine bas) puis se replie vers le haut.

## Wireframes
```
HERO (≥ 1024 px : deux colonnes, titre 2 lignes à gauche, photo carrée à droite ; < 1024 px : poster centré)            CITATION (statement)         ROUE (sticky stage, 300 %)
   [ Les Potes au Feu ]            « Légumes cultivés            ┌ mois courant ┐
        UNE                          localement… »   (ital.)     ╭───────────╮
        TABLE                      ¶ escalier gauche             │  12 sect. │ vignettes 24
        DE                           ¶ escalier droite           │   ●  ●    │ contre-rotées
        SAISON                                                   ╰───────────╯
   [vignette 280 carrée]                                         [boutons des 12 mois]
   [ étiquette : menu unique ]                                     menu actuel en escalier (4)
   
MENU ACTUEL (liste 560)         POTAGER / SALLE (asym. pair)  QUESTIONS (FAQ)       RÉSERVER (bande)
   ○ menu unique  4 services        [photo 560]      texte          ▸ Allergies ?          [■■ bouton pleine largeur vert ■■]
   plat ………………  (6 lignes)             texte  [photo 280]          ▸ Végétarien ?         horaires en 2 colonnes
   67 €  ·  lien carte                                            (6 lignes, 1 ouverte)
FOOTER : branche du mois (12 feuilles, la courante rose) · colonnes adresse / horaires / suivre · KywFooter
```

## Test de généricité
Un modèle ferait un site crème, une photo de légumes et le mot « local ». Ici la saison est une donnée (mois réel de
l'horloge sur la roue et la branche du pied de page, jamais sur le menu) ; les ingrédients sont des vignettes accrochées à un calendrier ; la seule
photo de hero est carrée et petite ; les mots empilés en condensée 300 ne ressemblent à aucun autre gabarit de la
collection (Affiche = gras serré, Marée = bord à bord).

## Décisions de contenu (une donnée, un drapeau)
- Producteurs : inconnus dans le dossier → page `/producteurs/` entièrement illustrative, bandeau en tête, « exemple » sur
  chaque fiche ; aucune étiquette avec un kilométrage sur l'accueil (seule origine affichée : « producteurs du coin,
  légumes cultivés localement », citations du site et du Guide MICHELIN).
- Calendrier des 24 ingrédients : savoir général, pas une donnée client → `placeholder: true`, mention « calendrier
  indicatif » visible sous la roue.
- Cartes de saison : le restaurant sert un **menu unique de saison** (dossier) ; son rythme de changement est inconnu.
  Seul le menu actuel est réel (`/carte/`). `/saisons/` (h1 « Au fil des saisons », chapeau marqué `*`) montre le
  calendrier indicatif et 4 exemples de composition marqués un par un ; aucun chiffre de cartes par an.
- Mois courant : il coiffe la roue (« nous sommes en … »), la légende et la branche du pied de page, **jamais** le menu
  réel (pas de « carte du mois », pas de « carte en cours »). Les plats autour de la roue sont étiquetés « Service n ·
  menu actuel » ; le lien plat → ingrédient → mois de `platsDuMois` porte `liaisonPlaceholder: true` et n'est pas affiché.
- Calendrier : un seul tableau `ingredients` (`mois` trié = présence, `pic` = position de la vignette sur la roue) ;
  la légende de la roue et la page saisons lisent le même `mois`.
- E-mail : `null` dans le dossier → adresse illustrative affichée en texte marqué, jamais en `mailto:` ni en bouton actif.
- Vignettes d'ingrédients : typographiques (nom + mois sur carré teinté), pas de photos libres non identifiées ; les
  photos réelles (plats, salle, cuisine) portent les vignettes de plats. À l'adaptation : macros du client.
- Rien de daté : le mois vient de `Date` côté client ; sans JS, l'étiquette affiche « de saison ».

## Révision 1 (30/10/2026)
- Hero de l'accueil en deux colonnes ≥ 1024 px (`.hero--duo`, largeur 1240 px, h1 `clamp(5.5rem, 9.6vw, 10rem)` en
  2 lignes) : la revue mesurait un h1 de 388 px et une photo hors de la fenêtre 1440×900 ; l'axe central reste la règle
  des autres pages et du mobile.

## Checklist des règles dures (preuve après QA dans RAPPORT.md)
- [x] Hero peint au premier rendu : photo `fetchpriority=high` préchargée, mots sans `data-reveal`, entrée par transform/opacité.
- [x] Texte reste texte (mots empilés = `<h1>` texte, roue = SVG + HTML).
- [x] `prefers-reduced-motion` : roue fixe sur le mois courant, clip-paths ouverts, accordéon natif.
- [x] Un seul idle (dérive de la roue), coupé hors champ et en reduced motion.
- [x] Hover par rôle : liens (soulignement qui pousse), boutons (fond encre → terre), vignettes (étiquette se soulève 2 px), mois (secteur vert).
- [x] Aucun `visibility: hidden` sur le hero ; `clip-path` seulement pour les libellés décoratifs.
- [x] `lang="fr"`, noindex, JSON-LD, canonical, OG, KywFooter, mention maquette unique.

## Révision 1, vérification (30/10/2026, second réviseur)
- Aucune décision de design nouvelle : toutes les corrections décrites plus haut (menu actuel sans mois, h1 de /saisons/,
  `liaisonPlaceholder`, calendrier unique trié, e-mail inerte marqué, hero `.hero--duo`) sont vérifiées sur le build 21:34
  et par `page.clock` ; détail et preuves dans `REVISION-1.md`.
- La légende de la roue suit le mois placé en haut pendant le scrub ou au clic (« ce qui vient ») ; le secteur vert, le
  centre « nous sommes en … » et la branche du pied de page restent sur le mois réel.
