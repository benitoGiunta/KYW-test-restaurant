# Quatre mains : DESIGN.md

Gabarit de la collection KYW, direction `quatre-mains` (cahier : `data/portfolio/directions.json`). Restaurant de
référence : Les Potes au Feu, Namur (deux chefs associés, Damien Gorjanec et François Schepens).

Stack : Astro 5 (socle `gabarits/_socle`), moteur de la skill awwwards (GSAP + SplitText + ScrollTrigger, Lenis),
CSS natif avec jetons. Pas de WebGL (le cahier ne l'exige pas ; le concept est entièrement CSS + un driver GSAP).

## Concept Card

```
Idea:        La page est un diptyque : vert bouteille à gauche (Damien), moutarde à droite (François) ; les deux
             colonnes ne se rejoignent que là où les deux chefs cuisinent ensemble (sections communes, sur papier).
Metaphor:    Deux parcours qui se croisent : la rencontre, puis la cuisine à quatre mains.
Signature:   Le nom du restaurant sur toute la largeur, coupé net par la frontière (deux copies clipées par --split,
             paper sur vert / ink sur moutarde). La frontière est pilotée par chapitre (driver `motion/diptyque.ts`,
             gsap.to sur --split : 50 → 100 « Damien parle », 0 « François parle », 50 ensemble) et respire au repos.
Emotion:     La complicité : on sent qu'il y a deux personnes, et qu'elles s'entendent.
Motion verb: « se rejoint » : tout ce qui bouge va vers la frontière ou s'en écarte. Les sections communes s'ouvrent
             depuis la ligne centrale (clip-path inset 50 % → 0), le rideau de transition est fait de deux panneaux
             (vert, moutarde) qui se rejoignent au centre, le soulignement des liens se trace depuis le milieu, les
             photos noir et blanc de la colonne verte prennent leurs couleurs au survol (les deux voix se rejoignent).
Screenshot:  Le hero : nom géant coupé au milieu, portrait de chaque chef dans sa colonne (le gauche en monochrome
             fondu dans le vert, le droit en couleur sur moutarde), la frontière verticale à 50 %.
```

Anchor (le fait qui porte le concept) : le restaurant est tenu par deux chefs amis qui ont des parcours distincts
(États-Unis et Montréal pour François, Belgique et Shanghai pour Damien) et ne cuisinent qu'« à quatre mains ». Un
restaurant à un seul chef n'aurait aucune raison d'avoir deux colonnes.

## Système

### Palette (du cahier ; roles)

| Rôle | Valeur | Usage |
| --- | --- | --- |
| `--c-vert` (ground gauche) | `#1E4A3E` | colonne de Damien, le soir, le salé |
| `--c-moutarde` (ground droite) | `#E6B13A` | colonne de François, le midi, le sucré |
| `--c-ink` | `#111311` | texte sur moutarde et sur papier |
| `--c-papier` | `#F7F5EE` | sections communes, texte sur vert |
| `--c-line` | `#2C2C2A` | frontière, filets |
| `--c-papier-muted` / `--c-ink-muted` | `rgb(247 245 238 / .72)` / `rgb(17 19 17 / .62)` | texte secondaire (AA : 7.6:1 sur vert, 5.9:1 sur moutarde) |

Contrastes mesurés : papier sur vert 9.2:1 ; ink sur moutarde 9.6:1 ; ink sur papier 17:1. Pas d'accent : les deux
grounds sont l'identité. Le rideau est vert + moutarde (deux panneaux).

### Typo

- Switzer 300 et 700 (Fontshare, `public/fonts/switzer-*.woff2`) : display, texte, nav. Display en 700,
  tracking -0.04em, leading 0.86 ; texte en 300, 17 px, leading 1.5.
- Fragment Mono 400 (Google, `public/fonts/fragment-mono-400-normal.woff2`) : meta, numéros 01-08, années, prix.
  12 à 13 px, tracking +0.02em, chiffres tabulaires.
- Échelle : `--t-nom` (nom coupé) en `cqi` pour remplir la largeur ; `--t-mega` 11vw max 15rem ; `--t-xl`, `--t-l`,
  `--t-m`, `--t-body`, `--t-s`, `--t-xs` (fluides).

### Grille et rythme

- Deux colonnes de 50 vw (`.dip`), chacune sur 6 colonnes avec le gutter commun ; les sections communes (`.commune`)
  repassent sur 12 colonnes pleine largeur dans un `wrap` de 88rem max.
- Lignes d'accroche : gutter gauche, frontière (50 %), gutter droit. Le texte des colonnes gauche commence au gutter,
  celui des colonnes droites commence à `50 % + gutter`.
- Rythme : diptyque / diptyque / commune. Sections diptyque en 28u ou 100svh, communes plus courtes (16u).
- Radius 0 partout ; photos à bords vifs ; aucune texture.

### Motion language

- Easing : `ease.out` (expo.out) pour les entrées, `ease.inOut` (expo.inOut) pour la frontière, le rideau, le loader.
- Durées : frontière 1.1 s ; rideau 0.8 s / 0.9 s ; sections communes qui s'ouvrent 1.3 s ; survols 0.45 s.
- Driver unique (`src/motion/diptyque.ts`) : expose `--split` (0 à 100) et `--split-dx` (px) sur `<html>` ; chaque
  section déclare `data-voix="deux|gauche|droite|commune|finale"` ; un ScrollTrigger par section ('top 55%') donne la
  cible ; idle = oscillation ±6 px au pointeur (quickTo) + respiration ±3 px (ticker). Touch : respiration seule.
  Reduced motion : frontière fixe à 50 %, rien ne bouge.
- Scroll différencié (sections `[data-decale]`) : la colonne droite reçoit un `y` scrubbé égal à 15 % de la distance
  parcourue (vitesse 0.85×, plafond du cahier), désactivé sous 768 px et en reduced motion.
- Loader : papier, hairline verticale centrale, compteur mono ; sortie = les deux couleurs se répandent depuis la ligne
  vers les bords (scaleX depuis le centre) puis le loader disparaît sur un hero identique (handoff continu). Le cahier
  demandait une entrée « par les côtés » ; l'entrée depuis la frontière raconte mieux « se rejoint » et évite un hard
  cut entre le loader et le hero.
- Transition de page : deux panneaux (vert depuis la gauche, moutarde depuis la droite) se rejoignent au centre
  (leave), puis se séparent (enter).
- Hovers (un traitement par rôle) : nav → soulignement tracé depuis le centre ; bouton principal → label roll +
  inversion au focus ; lignes de la carte → la photo du stage change (crossfade 0.4 s), la ligne se souligne depuis le
  centre, le tag chef s'allume ; images galerie en N&B (colonne verte) → reprennent leurs couleurs ; liens utilitaires
  → couleur / soulignement.

## Wireframes (desktop 1440, par section ; une famille par section)

Accueil :

```
HERO (split frame, 100svh, data-voix=deux)                      PARCOURS (sticky narrative 2 colonnes, data-decale)
┌──────────────────────────┬──────────────────────────┐         ┌──────────────────────────┬──────────────────────────┐
│ Les Potes au Feu  (brand)│ La carte  Les deux chefs │         │ 2012 Plage d'Amée        │ 2012 Plage d'Amée        │
│                          │ Notre histoire [Réserver]│         │ ─────                    │ ─────                    │
│  LES POTES AU FEU (nom coupé, papier | ink)         │         │ 2015 Belgique            │  2014 New York   (↓0.85×)│
│                          │                          │         │ ─────   [photo N&B]      │ ─────    [photo couleur] │
│ [portrait Damien mono]   │   [portrait François]    │         │ 2017 Shanghai            │  2016 Montréal           │
│ Damien Gorjanec          │ François Schepens        │         │ ...                      │  ...                     │
│ chef, le soir, le salé   │ chef, le midi, le sucré  │         │                          │                          │
└──────────────────────────┴──────────────────────────┘         └──────────────────────────┴──────────────────────────┘

RENCONTRE (statement, commune, s'ouvre depuis le centre)         CARTE À QUATRE MANIS (index list + stage, deux)
┌─────────────────────────────────────────────────────┐         ┌──────────────────────────┬──────────────────────────┐
│       Début de l'hiver 2019, installés par hasard   │         │ 01 Mises en bouche    D  │                          │
│       à une table de ce lieu... (t-l, 9 colonnes)   │         │ 02 Légumes racines    F  │     [stage photo]        │
│                                 [Notre histoire]    │         │ 03 Saint-Jacques      D  │      change au survol    │
└─────────────────────────────────────────────────────┘         │ ... 08                   │  menu 4 services 67 €    │
                                                                └──────────────────────────┴──────────────────────────┘
SALLE ET BAR (full-bleed, clip depuis le centre)                 AVIS (diptyque, 2 citations)
┌─────────────────────────────────────────────────────┐         ┌──────────────────────────┬──────────────────────────┐
│ [photo salle plein cadre]                           │         │ « Un restaurant décon-   │ « Les chefs viennent     │
│                       ┌ Ce soir 19:00 à 21:00 ┐     │         │ tracté qui swingue... »  │ eux-mêmes... »           │
│                       └───────────────────────┘     │         │ GUIDE MICHELIN 2026      │ AVIS GOOGLE (illustratif)│
└─────────────────────────────────────────────────────┘         └──────────────────────────┴──────────────────────────┘
RÉSERVER (bande commune)                                         FOOTER (finale, split revient à 50)
┌─────────────────────────────────────────────────────┐         ┌──────────────────────────┬──────────────────────────┐
│ [ Réserver une table (bouton large) ]  +32 81 64.. │         │ LES POTES AU FEU (nom coupé)                        │
│ lun 19-21 · mar 19-21 · mer 12-14 19-21 ...        │         │ adresse  horaires   │  liens   réseaux   [KYW]      │
└─────────────────────────────────────────────────────┘         └──────────────────────────┴──────────────────────────┘
```

Pages intérieures : carte (le soir à gauche / le midi à droite, puis boissons et bon cadeau en commune), les deux
chefs (deux colonnes complètes et décalées, puis « ensemble » en commune), histoire (rencontre en commune, deux
chronologies, équipe de quatre, coulisses), réservation (bande commune + formulaire), 404 (nom coupé, frontière à 50).

Mobile 390 : `.fond` masqué ; chaque `.dip` empile ses deux colonnes en deux bandes (vert puis moutarde) ; le nom
coupé devient deux lignes : « Les Potes » sur vert, « au Feu » sur moutarde ; le scroll différencié est remplacé par
le parallaxe léger des photos (`data-parallax`) ; la liste de la carte affiche sa vignette inline ; le bouton réserver
devient une barre basse fixe (page d'accueil).

## Test de généricité

Un modèle générique ferait un hero avec deux portraits côte à côte et une carte sous forme de cartes. Ici : la
structure entière (deux fonds qui ne se rejoignent qu'aux sections communes) découle du duo ; le nom n'a de sens coupé
que pour un lieu à deux têtes ; la carte oppose le soir et le midi parce que le restaurant fonctionne ainsi (menu unique
du soir, formules du midi) ; le survol des photos « rejoint » les couleurs. Changé après le test : le loader (compteur
000 par défaut → ligne qui s'ouvre), la transition (wipe par défaut → deux panneaux qui se rejoignent), le hover des
boutons (inversion → roll).

Idle : la frontière respire (±3 px) et suit le pointeur (±6 px) ; décision écrite ici, le concept bouge au repos.

## Checklist des règles dures (preuves en fin de QA dans RAPPORT.md)

- [x] Tout aligné sur la grille : gutter, frontière à 50 %, wrap 88rem ; display optiquement aligné (`margin-left: -0.04em`).
- [x] Display tracking négatif par taille (-0.04em nom, -0.03em t-xl, -0.02em t-l) ; corps 17 px / 1.5.
- [x] UI 12 à 13 px mono, contraste AA mesuré par axe (shoot.mjs).
- [x] Hover + focus-visible + active pour chaque cible, un traitement par rôle (liste ci-dessus) ; liens dans le texte soulignés au repos.
- [x] Idle : driver respirant (ticker) ; reduced motion : zéro.
- [x] Un seul vocabulaire d'easing (`ease` du moteur).
- [x] Transform / opacity / clip-path seulement ; `--split` écrit via gsap sur `<html>` (clip-path et width du fond fixe ; le fond ne contient aucun texte).
- [x] Une horloge (gsap.ticker) ; aucun `addEventListener('scroll')` ni rAF maison.
- [x] Pas de `transform` CSS sur les éléments animés par GSAP (`translate` individuel pour les hovers).
- [x] Tout le code de page dans `onPage()` ; ScrollTriggers scrubbés avec `invalidateOnRefresh`.
- [x] Reduced motion : pas de Lenis, pas de scrub, frontière fixe, contenu visible.
- [x] Premier frame = hero (nom coupé, deux portraits), pas un échauffement.
- [x] Couleur de texte liée au fond par colonne (`.dip__g` papier, `.dip__d` ink, `.commune` ink) ; vérifié aux fins de page.
- [x] En-tête fixe : coupé par la frontière (deux copies, l'écho `inert` et `aria-hidden`), jamais sur le contenu (padding-top des sections).
- [x] Navigation visible partout, page courante marquée (`aria-current`).
- [x] Curseur natif conservé, aucun suiveur.
- [x] Loader ≤ 2.6 s, LCP = le nom (texte HTML).
- [x] 390 px composé (bandes), cibles ≥ 24 px (44 px pour réserver).
- [x] Un h1 par page, titres ordonnés, landmarks, alt descriptifs, skip link, title/description uniques, OG, canonical, sitemap, robots, JSON-LD, 404.
- [x] Copies décoratives du nom hors du h1, `aria-hidden`.
- [x] Copy : pas de tiret cadratin, pas de filler, vouvoiement, une phrase jamais répétée.
