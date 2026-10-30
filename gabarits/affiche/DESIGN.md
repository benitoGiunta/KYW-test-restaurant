# Gabarit « Affiche » : DESIGN.md

Direction `affiche` de `data/portfolio/directions.json`, construite sur les données réelles des Potes au Feu
(Namur). Méthode : skill `awwwards` (concept, système, build, QA en deux passes, critique).

## Concept Card

```
Idea:        Le site est un mur d'affiches de rue : chaque écran est une affiche d'une seule couleur,
             avec un titre énorme, un bord dentelé, et la suivante est collée par-dessus.
Metaphor:    Le mur d'affiches d'une rue commerçante (colleur d'affiches, couches, bords déchirés).
Signature:   « Ça s'empile » : le plat signature (boeuf confit / carottes / cromesquis) dessiné en 5 couches
             s'empile au scrub pendant que la liste 01-05 s'allume ; au dernier état le prix du menu claque.
             Recette : scène sticky + timeline ScrollTrigger scrub (start top top, invalidateOnRefresh),
             5 <svg> en y / rotate, prix en SplitText chars avec back.out.
Emotion:     L'envie immédiate, comme devant une vitrine : couleurs franches, mots courts, prix lisibles.
Motion verb: claque comme un volet (courts, nets, back.out(1.6) pour les pops, expo.inOut pour les rideaux).
Screenshot:  La section horaires : fond jaune, « HORAIRES » en Archivo 125 / 900, sept cartes rouges avec
             les heures énormes, l'étiquette « AUJOURD'HUI » tournée de -8° sur le jour courant.
```

Anchor (fait propre au sujet) : Les Potes au Feu fonctionnent en **menu unique** servi par les chefs ; le
plat signature photographié sur assiette rouge (boeuf confit) devient la pile de couches, et les horaires
(soir seulement, midi mercredi et vendredi) méritent d'être le titre principal d'une affiche.

Écart assumé avec le cahier : le restaurant ne possède pas de photo de plat détourée en 5 couches. Les
couches sont **dessinées** (SVG, aplats de la palette, ombre dure 8 px), dans l'idiome de l'affiche. Lors de
l'adaptation à un client qui fournit 5 PNG détourés, les `<svg>` se remplacent par 5 `<img>` sans toucher
au driver (`src/motion/empile.ts` ne lit que `[data-couche]`).

## Système

### Palette (5 aplats, rien d'autre)

| rôle | hex | usage |
| --- | --- | --- |
| rouge coquelicot | `#E3352B` | affiches hero, « comment ça marche », cartes horaires, 404 |
| jaune | `#F6C33A` | affiche horaires, étiquette aujourd'hui, pastille ouvert, focus sur fond ink |
| vert gazon | `#1F8A4C` | affiche « ça s'empile », visite |
| crème | `#F4EEDF` | affiches définition, carte, galerie ; texte sur rouge/vert/ink |
| ink | `#15110F` | texte, filets 2 px, ombres dures, footer |

Contrastes mesurés : ink/crème 16,2 ; ink/jaune 11,4 ; crème/ink 16,2 ; ink/rouge 4,30 ; crème/rouge 3,77 ;
ink/vert 4,29 ; crème/vert 3,78. **Règle dure** : sur rouge et sur vert, le texte est toujours « large »
(≥ 24 px, ou ≥ 19 px en graisse 700+) ; les paragraphes de 17 px ne vivent que sur crème, jaune ou ink, ou
dans une puce crème posée sur l'aplat.

### Typographie (une famille, deux personnalités)

- **Archivo variable** (Google, OFL), axe `wdth` 62 à 125 et `wght` 400 à 900, un seul fichier woff2 de
  88 Ko, auto-hébergé (`public/fonts/archivo-400_900-normal.woff2`), préchargé.
- Display : `font-stretch: 125%`, graisse 900, capitales, `letter-spacing: -0.03em`, `line-height: 0.88`,
  `margin-left: -0.04em` (alignement optique). Tailles : `--t-mega` clamp(3.4rem, 1rem + 13vw, 14rem) pour
  le nom et les titres d'affiche, `--t-prix` clamp(5rem, 2rem + 18vw, 13rem) pour le prix qui claque,
  `--t-xl` pour les heures, `--t-l` pour les noms de plats.
- Texte et UI : stretch 100 %, 400 et 600, 17 px (`--t-body`) / 1.5 ; petites capitales d'UI 13 px, 700,
  tracking +0.06em.
- Chiffres : `font-variant-numeric: tabular-nums` partout (prix, heures, numéros 01-08).

### Grille, rythme, forme

- Une colonne pleine largeur, marges **24 px** fixes (`--gutter: 24px`, jamais plus), titres alignés à
  gauche sur la marge ; bento 3 colonnes (2 à 768, 1 à 390) pour les plats ; split 2 colonnes pour la visite.
- Rythme : chaque affiche fait au moins `100svh`, couleur alternée R / C / V / C / J / R / C / V / ink (jamais
  deux fois la même d'affilée), reliée par un bord dentelé SVG de 18 px en haut de chaque affiche.
- Radius `0` pour tout bloc ; `999px` seulement pour la pastille d'état, les badges et le disque rotatif.
- Imagerie : photos reportage du client encadrées d'un filet ink 2 px avec ombre dure (8 px, 0 flou) ;
  couches du plat en SVG aplats ; aucune texture.

### Motion language (« claque comme un volet »)

| moment | mouvement | durée / ease |
| --- | --- | --- |
| rideau d'entrée (loader) | 4 bandes verticales (R J V C) avec le nom centré et une barre réelle ; se lèvent en stagger | 0,6 s `expo.inOut`, stagger 0,05 (révision 1 : plancher 0,7 s, total ≤ 2,6 s) |
| intro hero | lettres du nom en stagger (SplitText chars), pastille et plat en `up` | moteur, 0,9 s |
| transition de page | une affiche (rouge) **descend** par clip-path sur la page, puis se décolle vers le haut | 0,8 s / 0,9 s `expo.inOut` |
| cartes (bento, horaires) | claquent : scale 1,06 → 1, y 24 → 0, 0,35 s, stagger 0,06 | `back.out(1.6)` |
| signature | scrub : chaque couche tombe (y -60 %, rotate ±8°) à son tour, l'item 0n s'allume, le prix claque en chars | scrub 0,6 |
| hover primaire (boutons, nav, cartes) | fond qui monte depuis le bas (flood), texte inversé ; cartes : translate -4/-4 + ombre 12 px | 0,25 s `power3.out` |
| actif | décalage 2 px (translate 2px 2px, ombre 6 px) | 0,1 s |
| idle | le plat du hero lévite ±6 px (un seul objet), le disque CTA tourne (×3 au survol) | ticker GSAP, pause hors écran, 0 en reduced |
| marquee | la carte défile, vitesse liée à la vélocité de scroll | 28 s, un par page |

Reduced motion : rideau remplacé par un fondu 0,2 s (moteur), pile affichée complète et liste allumée
(CSS par défaut), cartes et badges statiques, disque immobile, galerie en scroll natif.

## Composition (une famille de layout par section, page d'accueil)

```
HERO AFFICHE (rouge, 100svh)                        poster
┌──────────────────────────────────────────────────────┐
│ [Les Potes au Feu]   ● ouvert jusqu'à 21:00  [nav] ▣ │  en-tête crème 56 px, filet ink 2 px
│                                                      │
│ LES POTES  (contour)              ╭────────╮          │
│ AU FEU     (plein, 125 wdth)      │ plat   │          │  plat SVG assemblé, lévitation ±6 px
│ Bistronomie à quatre mains, Namur │ 5 couch│          │
│ [RÉSERVER]  [LA CARTE]            ╰────────╯          │
│ ⟵ MENU 4 SERVICES 67 € · SAINT-JACQUES · BOEUF … ⟵   │  marquee de la carte
└──────────────────────────────────────────────────────┘
DÉFINITION (crème)                                  statement
│ les potes au feu [le pɔt o fø] n. m. pl.             │
│ 1. Deux copains …  2. Par ext. …                     │  lignes par masque
ÇA S'EMPILE (vert, 350svh, scène sticky)            sticky stage
│ 01 ASSIETTE ●      ┌─────────────┐                   │
│ 02 CAROTTES        │  couches    │   67 €            │  liste à gauche, pile à droite, prix sous la pile
│ 03 BOEUF CONFIT    │  tombent    │   le menu, 4 serv.│
│ 04 CROMESQUIS      └─────────────┘                   │
│ 05 JUS ET HERBES                                     │
CARTE BENTO (crème)                                 grille
│ LA CARTE                                             │
│ ┌rouge──┐ ┌jaune──┐ ┌vert───┐                        │  nom caps / prix énorme / description / badges
│ ┌jaune──┐ ┌vert───┐ ┌rouge──┐   [TOUTE LA CARTE]     │
HORAIRES (jaune)                                    bande
│ HORAIRES                                             │
│ [LUN 19:00→21:00] [MAR …] [MER 12→14 · 19→21 ★AUJ.]  │  7 cartes rouges, aujourd'hui en premier sur mobile
COMMENT ÇA MARCHE (rouge)                           liste 3 étapes
│ SUR PLACE            À EMPORTER (illustratif)        │
│ ① réservez  ② …      ① commandez ② …                 │  numéros cerclés qui se remplissent
GALERIE INCLINÉE (crème, pan horizontal épinglé)    filmstrip
│ 01 ▱  02 ▱  03 ▱  04 ▱ … 08 ▱  ◯ RÉSERVER            │  cartes tournées ±4°, disque rotatif en fin de bande
VISITE (vert)                                       split
│ AVENUE DE LA PLANTE 4     ┌ plan schématique ┐       │
│ +32 81 64 04 44           │ Meuse, citadelle │       │
│ Facebook · YouTube        └──────────────────┘       │
FOOTER (ink)                                        finale
│ À TABLE !                                            │  mot d'adieu géant
│ adresse · tél · réseaux · KYW                        │
```

Pages intérieures : `carte` (affiche jaune + bento complet + 3 formules + menu du jour), `histoire`
(affiche verte « DEUX POTES » + récit en statement + équipe en cartes + coulisses encadrées), `reservation`
(affiche rouge + boutons + formulaire + horaires + visite), `a-emporter` (affiche jaune, 3 étapes, bento à
emporter, page entière illustrative), `404` (affiche rouge « affiche arrachée »). Mobile 390 : affiches
100svh, hero empilé (nom puis plat), bento 1 colonne, horaires en liste (aujourd'hui en premier), galerie en
scroll-snap natif, signature en pin vertical (pile puis liste dessous).

## Test de généricité

Un modèle produirait : hero rouge + photo de pizza + trois cartes de formules. Ici :
- les **horaires** sont traités comme le titre principal d'une affiche (cartes typographiques), parce que
  l'information « ouvert le soir, midi mer. et ven. » est la première question d'un client ;
- la **pile de couches** est tirée du vrai plat signature du menu unique et liée au prix réel du menu ;
- le **rythme d'affiches collées** (bords dentelés, transition clip-path qui descend) tient toute la
  navigation ; aucune section n'est un « bloc de template » (chaque famille de layout n'apparaît qu'une fois).
Changé après le test : la galerie n'est pas « l'idée » (elle est une bande secondaire), les boutons ne sont pas
des pilules (rectangles 2 px), pas de dégradé, pas d'eyebrow systématique (un seul « chapeau » : la
prononciation dans la définition).

## Décisions

- Pas de WebGL (canvas: false). Pas de curseur personnalisé (le natif suffit ; `data-cursor` non utilisé).
- Idle : un seul objet en lévitation (le plat du hero) + le disque CTA de la galerie. Rien d'autre ne bouge au
  repos.
- Le loader est gardé (le cahier l'exige : rideau de 4 bandes avec barre réelle). Révision 1 : plancher 0,7 s,
  sortie 0,35 + 0,6 s ; l'accroche du hero (`.hero__baseline`) n'est plus révélée à l'intro, elle est peinte dès
  le premier rendu sous le rideau pour que le LCP ne l'attende pas.
- Révision 1 : en mobile (≤ 767 px) les titres `--t-mega` et le nom du hero sont plafonnés à 9,5vw pour que le mot
  le plus long (COMMANDER, LES POTES) tienne sans césure ; SplitText découpe `chars` dans des mots insécables.
  Sur rouge et vert, l'étiquette « exemple » devient une puce crème (règle dure des contrastes). Le pied n'a plus
  de colophon : une seule mention « Maquette KYW », portée par le pied KYW. Sara n'a pas de photo (aucune au
  dossier) : cadre à initiale, comme Jordan.
- Les données fictives (bento, menu du jour, à emporter, avis Google, définition, équipe Sara/Jordan) sont
  marquées `placeholder: true` dans `site.ts` et signalées à l'écran par « (exemple) » ou « illustratif ».

## Checklist des règles dures de la skill (preuves après QA)

- [x] Grille et alignement optique : marges 24 px, `margin-left: -0.04em` sur le display, tracking -0.03em
  par taille (tokens.css).
- [x] Corps 17 px / 1.5 ; UI 13 px 700 AA (ink sur crème / jaune uniquement).
- [x] Hover / focus / actif sur tout interactif, dans le verbe (flood depuis le bas, claque) ; `hover.noHoverChange`
  vide et `colorOnly` vide dans `.shots/*/report.json` (passe 2).
- [x] Idle : `desktop.idleMotion: true` (plat du hero sur le ticker).
- [x] Une famille d'ease (`ease` du moteur + `back.out(1.6)` déclaré dans setup.ts comme « clap »).
- [x] Transform / opacity / clip-path seulement ; un seul clock (ticker GSAP ; rotation du disque via gsap, pas de CSS keyframes).
- [x] Tout code de page dans `onPage()` avec cleanup.
- [x] Sections scrubées : `start: 'top top'`, `invalidateOnRefresh: true` (empile.ts, galerie.ts), galerie `pin: true`.
- [x] Reduced motion : pile complète, liste allumée, galerie native, rideau en fondu (`r-*` : `hiddenText` 0).
- [x] Première image : hero rouge complet (nom, pastille, plat, marquee).
- [x] Encre globale : chaque affiche porte `data-tone` et redéfinit `--c-bg/--c-fg/--c-focus` ; en-tête crème fixe
  toujours lisible, qui s'efface au scroll vers le bas et revient vers le haut.
- [x] Curseur natif visible ; rien ne dépend du hover sur tactile (`@media (hover: hover)`).
- [x] Loader ≤ 2,6 s, LCP = texte réel (h1).
- [x] 390 px composé (voir `m-*`), cibles ≥ 24 px, pas de débordement.
- [x] Un h1 par page, titres ordonnés, landmarks, lang, alt, skip link, JSON-LD, OG, canonical, 404.
- [x] Copies décoratives (marquee, contour) hors des titres et liens, `aria-hidden`.
- [x] Copy : pas de tiret cadratin, pas de filler, phrases jamais répétées entre sections, vouvoiement.
