# Les Potes au Feu, variante Portfolio : DESIGN.md

Agent variante-portfolio, 31/10/2026. Sources : `data/restaurants/les-potes-au-feu/` (dossier.md, complément du
31/10 : note Google Rankeat, Le Fooding ; photos/index.json). Gabarit retenu : **Quatre mains** (`gabarits/quatre-mains`).

## Choix du gabarit

Notes sur 5 : positionnement (bistronomie, duo de chefs, menu unique), ambiance (petite salle sombre, murs vert-gris,
coussins moutarde, chêne, ampoules, cuisine ouverte), richesse du contenu disponible (25 photos dont 2 portraits
verticaux, histoire écrite, pas de producteurs nommés, pas d'avis citables hors MICHELIN), type de carte (menu unique
du soir 4 services + 2 formules du midi), réservation (Zenchef réel), signature (le moment mémorable a-t-il un sens ici).

| Gabarit | Position. | Ambiance | Contenu | Carte | Résa | Signature | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| affiche | 1 | 1 | 3 | 2 | 4 | 2 | 13 | street food criarde, à éviter pour une table qui « tend vers le gastronomique » |
| ardoise | 3 | 2 | 4 | 2 | 5 | 3 | 19 | conçu pour une carte longue : la moitié serait des lignes d'exemple |
| braise | 4 | 3 | 4 | 3 | 5 | 3 | 22 | « au feu » est un jeu de mots (pot-au-feu), pas un grill : la température raconte un feu absent |
| cahier | 4 | 3 | 2 | 4 | 5 | 3 | 21 | exige 6 producteurs nommés et un menu du jour daté : inconnus |
| collage | 2 | 2 | 3 | 3 | 5 | 1 | 16 | lieu à plusieurs vies (scène, brunch) : aucune n'existe |
| comptoir | 3 | 3 | 3 | 5 | 5 | 3 | 22 | menu unique parfait, mais blanc clinique contre une salle sombre et décontractée ; dressage sans détourage |
| encre | 1 | 3 | 3 | 2 | 5 | 1 | 15 | table asiatique ; le rouleau de 12 plats serait inventé |
| forno | 2 | 2 | 3 | 3 | 5 | 2 | 17 | four à pizza absent, pages pâtes et fournées illustratives |
| guinguette | 2 | 1 | 3 | 3 | 5 | 2 | 16 | terrasse familiale ; photos de reportage sombres |
| journee | 2 | 3 | 3 | 2 | 5 | 1 | 16 | six moments de la journée pour un lieu ouvert 5 soirs et 2 midis |
| maree | 2 | 1 | 3 | 3 | 5 | 2 | 16 | lumineux et salin ; photos d'eau libres à fournir |
| nocturne | 2 | 4 | 3 | 3 | 5 | 2 | 19 | bon accord avec les photos sombres, mais bar à cocktails sans carte de bar |
| **quatre-mains** | **5** | **5** | **5** | **4** | **5** | **5** | **29** | duo de chefs associés, « cuisine bistronomique à quatre mains » est leur propre phrase ; vert et moutarde sont les couleurs de la salle |
| velours | 4 | 3 | 4 | 5 | 5 | 4 | 25 | les nombres vrais existent (4 services, 67 €, 2 chefs, 2020), mais le feutré gastronomique dément « décontracté qui swingue » |
| verger | 3 | 2 | 2 | 3 | 5 | 2 | 17 | calendrier des produits et producteurs inconnus |

**Décision : Quatre mains.** Le gabarit ne prend tout son sens que pour un duo, et le restaurant se définit lui-même par
« une cuisine bistronomique à quatre mains » ; le diptyque vert bouteille / moutarde reprend le lambris vert-gris et les
coussins moutarde de la salle (photo MICHELIN). Velours (25) est le second ; Quatre mains l'emporte de 4 points, la règle
« gabarit non utilisé » n'a pas eu à départager (aucun gabarit n'avait encore été attribué, `gabarits/UTILISATION.md` mis
à jour).

## Ce qui a changé par rapport au gabarit

Le gabarit avait été construit sur ce restaurant ; l'adaptation a donc surtout consisté à **remplacer le fictif par du
réel** (complément du dossier du 31/10) et à retirer ce qui ne pouvait pas l'être honnêtement.

Sections conservées : toutes les pages (accueil, carte, les deux chefs, histoire, réservation, 404) et leur rythme
diptyque / diptyque / commune.

Sections modifiées :
- Accueil, « Avis » : les deux avis Google inventés (Claire D., Thomas V.) sont **retirés** (témoignages fictifs
  interdits). Colonne verte : l'avis réel du Guide MICHELIN 2026. Colonne moutarde : composant **note** (chiffre
  monumental « 4,8/5 », « 212 avis Google », source Rankeat du 22/08/2025, « à confirmer »), sans extrait.
- Accueil, bande « salle » : le badge disait « Ce soir 19:00 à 21:00 » en dur, faux le samedi et le dimanche ; il dit
  « Le soir, du lundi au vendredi ».
- Parcours des chefs (accueil, histoire, les deux chefs) : les années 2012 à 2017 et leurs anecdotes inventées (wok à
  Shanghai, marchés de Jean-Talon, « Bruxelles ») sont remplacées par les seules étapes prouvées, repérées par des
  jalons sans date (« Débuts », « Ensuite », « Ailleurs », « Puis ») ; 2019 et 2020 restent datées. Plus aucune étape
  illustrative.
- « Il y a quatorze ans » (date relative du site, piège noté dans lecons.md) : remplacé par « adolescents » (Le Fooding :
  « amis d'adolescence ») ; la Plage d'Amée est située à Jambes (Le Fooding).
- Citations des chefs : les deux phrases inventées et attribuées à Damien et François sont remplacées par deux phrases
  réelles du site du restaurant, sourcées « Le concept, site des Potes au Feu » (champ `citation.source`).
- Carte, boissons : la liste fictive (accord 32 €, bière namuroise…) est remplacée par les trois références relevées par
  Le Fooding (amaretto sour maison 13 €, Anjou Domaine Olivier 9 € le verre, Syrah Stéphane Ogier 50 € la bouteille).
- Carte, encadré du soir : l'« accord mets et vins » fictif devient « Vu par le Guide MICHELIN 2026 » (cerises noires et
  griottes, crumble de cacao, glace vanille au lait cru) + menu végétarien sur demande et allergies (réels).
- E-mail : `bonjour@lespotesaufeu.be` (fictif, affiché sans marque dans le pied de page et la réservation) est retiré ;
  `site.email` vaut `null` et n'affiche rien. La réservation propose Zenchef et le téléphone.
- Équipe : Jordan n'a aucune photo prouvée (la photo « planche » était au nom de Sara dans les fichiers) : **tuile
  typographique** à l'initiale (nouveau composant `.tuile`, aplats vert ou moutarde des deux voix). Sara : photo du
  service avec alt neutre (identité « à confirmer » dans photos/index.json) ; rôles « illustratifs ».
- Histoire, coulisses : la phrase méta « les photos de la colonne verte reprennent leurs couleurs au survol » devient une
  description réelle de la salle.

Sections ajoutées :
- Histoire, **« Guides et presse »** (commune) : avis MICHELIN daté avec lien vers la fiche, résumé Le Fooding (jamais
  entre guillemets, `citation: false`), note Google à confirmer.
- Histoire, **« En vidéo »** : façade légère (photo du passe + bouton lecture moutarde) qui ouvre l'aftermovie YouTube
  du restaurant dans un nouvel onglet ; pas d'iframe (ni requête tierce ni erreur console au chargement).

Composants créés : `.note` (chiffre monumental), `.tuile` (membre sans photo), `.presse` (liste sourcée), `.video`
(façade vidéo). Tous dans les jetons du gabarit : Switzer 700 en `--t-mega`, tracking -0.04em, Fragment Mono pour les
sources, radius 0 sauf le bouton lecture (seul cercle, comme une pastille), survol en 0,45 s.

Données : `site.ts` gagne `noteGoogle`, `presse`, `video`, `prixGamme` ; JSON-LD `priceRange: €€` et
`paymentAccepted: Mastercard, Visa` (fiche MICHELIN). La note Google n'est **pas** mise en `aggregateRating` (à confirmer).

## Décisions d'art direction

- Palette conservée telle quelle : vert bouteille `#1E4A3E` et moutarde `#E6B13A` sont déjà les couleurs de la salle.
  L'orange du site actuel (`#f38935`, CTA E-net) n'est pas repris : il n'est pas dans le logo (le O orange de
  « BISTRONOMIE » est un détail) et il échoue en contraste sur moutarde.
- Typographie conservée (Switzer + Fragment Mono) : le logo manuscrit n'existe qu'en PNG 425 px, inutilisable en titrage.
- Favicon : le pictogramme navet du logo (SVG officiel du site) en moutarde sur carré vert, à la place du rond générique
  du socle.
- Photos : celles du gabarit (déjà les 22 photos client en WebP ≤ 1800 px) ; aucune photo libre.

## Taux d'adéquation estimé : 88 %

1. Le concept est le restaurant : deux chefs associés, une cuisine « à quatre mains » (leur phrase), servie par eux.
2. Tout le contenu affiché est réel ou marqué : menu 67 / 52 / 40 €, horaires, Zenchef, MICHELIN, boissons Le Fooding,
   récit du site ; plus aucun témoignage, chiffre ou étape inventés.
3. Les couleurs et les photos sont celles de la salle (vert-gris, moutarde, chêne, ampoules).

Ce qui limite encore : la composition des formules du midi et l'exemple de lunch sont illustratifs (aucune source) ;
l'attribution des plats à l'un ou l'autre chef (ressort D / F du diptyque) n'est pas prouvée ; les rôles de Sara et
Jordan sont inconnus ; pas de portrait détouré ; aucun extrait d'avis client autorisé ; pas d'e-mail.

## Révision 1 (31/10/2026, REVUE-1)

Décisions de design changées par la révision (détail dans `REVISION-1.md`) :
- **En-tête coupé** : l'écho (ink, moitié moutarde) porte désormais de vrais liens (`tabindex="-1"`, `aria-hidden`) ; les
  clip-path de la face et de l'écho sont complémentaires, chaque point de l'en-tête a un seul lien cliquable. Au focus
  clavier (bureau), l'en-tête passe sur papier et la face n'est plus coupée (même traitement que sur une section commune).
- **Pied de page** : `.footer` et `.kyw-footer` en `position: relative; z-index: var(--z-content)` au-dessus du fond fixe ;
  la mention « Maquette KYW » n'est portée qu'une fois (composant KywFooter), la bande du site dit « Les Potes au Feu, Namur ».
- **Carte, soir puis midi** : ces deux sections (`.dip--plein`) portent leur propre couleur en bureau ; la frontière y est
  le bord des sections et non le fond fixe, pour que la fin du menu du soir ne soit jamais en papier sur moutarde.
  Les autres pages gardent la bascule du fond (le concept n'y produit pas de texte sur la mauvaise couleur).
- **Liste à stage de l'accueil** : uniquement le menu du soir réel (6 lignes, numérotées par service 01 à 04, mises en
  bouche et mignardise sans numéro) ; la légende du stage dit « le plat » ou « photo prise en cuisine, pas le plat ».
- **Parcours** : étapes sans ordre inventé (« Débuts », « Parcours », 2019, 2020) ; la frise détaillée (avec textes) n'est
  que sur la page histoire, l'accueil et les deux chefs montrent les lieux seuls.
- **Citations** : plus aucune phrase du site placée dans la colonne d'un chef ; la phrase du concept est citée une seule
  fois (les deux chefs, section commune « Ensemble »), signée « Le concept, sur le site du restaurant ».
- **Réservation** : le formulaire de démonstration est remplacé par « Avant de venir » (menus, régimes, paiement) et un
  lien Zenchef ; la photo du bar passe en 3:2 (source 1140 × 642).
- **Loader** : plancher 0,6 s, plafond 0,9 s, sortie ≈ 0,8 s (≈ 2 s mesurés jusqu'à `is-loaded` en 1440, contre 3,1 s).
- Typographie : espaces insécables (`nbsp()` appliqué à tout le contenu de `site.ts`), ligatures œ.

## Annexe : système du gabarit « Quatre mains » (repris tel quel)

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
| `--c-vert` (ground gauche) | `#1E4A3E` | colonne de Damien (Belgique, Shanghai), le soir de la carte |
| `--c-moutarde` (ground droite) | `#E6B13A` | colonne de François (États-Unis, Montréal), le midi de la carte |
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
│ chef, Belgique→Shanghai  │ chef, États-Unis→Montréal│         │                          │                          │
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
- [x] Loader ≤ 1.8 s (0.9 s + sortie raccourcie sur mobile), une fois par session ; LCP = le nom (texte HTML).
- [x] 390 px composé (bandes), cibles ≥ 24 px (44 px pour réserver).
- [x] Un h1 par page, titres ordonnés, landmarks, alt descriptifs, skip link, title/description uniques, OG, canonical, sitemap, robots, JSON-LD, 404.
- [x] Copies décoratives du nom hors du h1, `aria-hidden`.
- [x] Copy : pas de tiret cadratin, pas de filler, vouvoiement, une phrase jamais répétée.

## Révision 1 (30/10/2026, après REVUE-1)

- Registre des colonnes : « le soir, le salé » / « le midi, le sucré » attribuait aux chefs une répartition du travail
  que le dossier ne prouve pas (F1-01). Chaque colonne porte désormais le parcours prouvé du chef (« de la Belgique à
  Shanghai », « des États-Unis à Montréal ») ; l'attribution des plats (tags D / F, plats fétiches) reste comme ressort
  du diptyque mais est marquée `voixPlaceholder` / `platsFetichesPlaceholder` et affichée « attribution illustrative ».
- Descriptions de plats : uniquement ce que le dossier prouve (photos, carte HTML) ; sinon le nom seul.
- En-tête : sur bureau, fond plein dès 24 px de défilement, qui suit la frontière (vert | moutarde) ou papier sur les
  sections communes ; sur mobile, texte papier en permanence sur l'en-tête vert (F1-02, F2-01).
- Loader : plafond 1.8 s (0.9 s sur petit écran / tactile, sortie à 60 %), joué une fois par session (F2-02).
- `les-deux-chefs` : la figure « ensemble » passe de `scale` à `clip` (débordement) ; le portrait de Damien (LCP mobile)
  n'a plus de révélation et reçoit `fetchpriority="high"` (F1-03).

