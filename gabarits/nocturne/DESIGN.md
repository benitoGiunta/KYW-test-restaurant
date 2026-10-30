# DESIGN — gabarit « Nocturne »

## Concept Card
- **Idée** : le site est éclairé à la lampe. Tout est noir ; une tache de lumière ambrée (un canvas 2D fixe, dégradé radial
  lissé au `gsap.ticker`) suit le pointeur et révèle, à sa portée, les photos de la mosaïque posées à 38 % de luminosité.
  Les titres sont des tubes : contour ambré, qui s'allume (plein) au survol et au focus.
- **Métaphore** : le comptoir à la fin du service, une lampe, des verres. Chez les Potes au Feu : le bar vert sombre, les
  ampoules à filament, les deux cocktails rouges de la photo du dossier.
- **Signature** : la lampe. Un seul canvas (`#lampe`, `mix-blend-mode: screen`, z sous l'en-tête), rayon 260 px, ambre à
  55 %, grain 0,05 composé `source-atop` sur le halo seulement ; position lissée (inertie 0,12 × deltaRatio) dans le
  ticker unique du moteur ; `--lx/--ly` sur `:root` ; chaque photo de mosaïque porte un calque dupliqué masqué par
  `mask-image: radial-gradient(circle 260px at var(--mx) var(--my))`, variables écrites par le ticker pour les seules
  figures visibles (IntersectionObserver). Désactivée sous reduced-motion et sur tactile : photos à 100 %, classe
  `lampe-on` absente, calques dupliqués en `display: none`. Pause quand l'onglet est caché ou que le pointeur sort.
- **Émotion** : le secret, l'envie d'entrer. **Verbe** : vibre (scintillement du tube au survol : 0,9 → 1 en trois crans).
- **Screenshot** : la mosaïque bord à bord, six photos sombres, l'une révélée en pleine lumière par le halo ; « LE FEU,
  LA NUIT » en contour ambré en haut, le nom « Les Potes au Feu » en petites capitales crème.

## Système
- **Palette** (rôles) : `--c-bg` ground #0A0A0C ; `--c-fg` ink crème #EDE8DF (15,5:1) ; `--c-accent` ambre tube #F0A63B
  (9,4:1 sur ground, texte et contours) ; `--c-rouge` #9E1B28 (bandes de famille, jamais pour du texte < 1,25 rem) ;
  `--c-line` fumée #3A383B ; `--c-muted` #A9A39A (7,2:1). Pas d'autre couleur : le néon est un ambre chaud, pas un rose.
- **Typo** : display Panchang 700 (Fontshare, self-host, 20 Ko), capitales, +0.02em, line-height 0.95, contour
  1,5 px desktop ; texte, carte et UI Supreme 400/500 (Fontshare) ; meta en petites capitales Supreme 500, +0.08em,
  0,75 rem. 3 woff2, 2 préchargés (Panchang 700, Supreme 400).
- **Grille** : mosaïque sans marge extérieure, 3 colonnes à gouttière noire de 20 px, motif 2/3 + 1/3 inversé toutes les
  deux rangées (2 colonnes en mobile) ; textes sur une colonne de 640 px centrée (`.col`) ; listes sur 880 px.
- **Rythme** : mosaïque de 12 photos coupée après chaque bloc de 3 rangs par une bande de texte (règle ou phrase) ;
  sections longues et noires, sans filets sauf la carte (ligne fumée).
- **Radius** : 0. Texture : grain 0,05 sur le halo uniquement.
- **Motion language** : `ease.out` (expo) 1,1 s pour les entrées ; les lignes « s'allument » (opacité 0 → 1 avec une
  lueur ambrée qui s'éteint) ; loader « horloge de service » (19:00 → 21:00, calculé depuis `site.horaires`), sortie :
  les chiffres s'éteignent, le rideau noir glisse vers le haut avec un filet ambré ; transition : panneau noir à filet
  ambré ; hero : deux volets photo fermés sur le titre qui s'écartent (`xPercent`), la lampe s'allume (alpha 0 → 1) ;
  mobile : volets empilés qui s'ouvrent en fondu seulement, titre peint au premier rendu.
- **Hover par rôle** : nav = soulignement ambré qui se dessine ; tube = contour → plein + scintillement ; bouton de coin
  = inversion + flèche qui avance ; ligne de cocktail = barre de famille qui s'élargit + nom en plein ; photo de
  mosaïque = lampe (pas de curseur étiquette) ; lien texte = décalage du soulignement.
- **Idle** : le halo suit le pointeur ; au repos, il respire (rayon ± 6 px, période 5 s).

## Wireframes (desktop)
```
HERO    Les Potes au Feu (petites caps)         Carte · Cocktails · Histoire · Soirées · Réserver
        [volet photo gauche] LE FEU,  [volet photo droit]
                             LA NUIT   (contour ambré, h1)
                   ● Ouvert ce soir jusqu'à 21h (calculé)   bistronomie, Namur
RÈGLES  01 Dernier service à 21h  ·  02 Plus de six : on appelle  ·  03 Menu unique  ·  04 Allergies  ·  05 Samedi privé
MOSAÏQUE [=========== 2/3 ===========][== 1/3 ==]
         [== 1/3 ==][=========== 2/3 ===========]
         [=========== 2/3 ===========][== 1/3 ==]
         ---- bande : « Le plaisir déborde de l'assiette » (Michelin) ----
         [== 1/3 ==][=========== 2/3 ===========] … (12 photos)
CARTE   LE MENU (contour)   01 Mises en bouche ……………   02 Légumes racines / Champignons / Noix …
BAR     COCKTAILS* ▌Nom contour  ingrédients  prix   (barre de famille)      * carte illustrative
ORIGIN  [photo N&B sticky]  phrase 1 → 2 → 3 → 4 en crossfade au scroll
SOIRÉES Privatisation du samedi · Chef à domicile · Soirée au bar*
VENIR   adresse  |  horaires de nuit     [Suivre ◣]                      [◢ Réserver]  (coins fixes)
FOOTER  LES POTES AU FEU (incliné, contour)  contact / horaires / suivre   KywFooter
```
Mobile 390 : mosaïque 2 colonnes bord à bord, titres pleins (pas de contour), volets empilés, barre basse Suivre / Réserver,
pas de halo.

## Test de généricité
Un modèle ferait un site noir avec un titre rose néon. Ici la lampe est une mécanique de lecture (elle révèle ce qui est
sous la main, le reste dort), les règles de la maison sont celles du dossier (dernier service 21h, six couverts, menu
unique, allergies, samedi privatisé), le loader est l'horloge réelle du service et la carte de bar est marquée
illustrative à la ligne, parce que le restaurant n'en publie pas.

## Règles dures de la skill (preuve)
- [x] Un `<h1>` par page, landmarks, `lang="fr"`, noindex, canonical, OG, JSON-LD : `Base.astro` du socle.
- [x] Contenu en HTML serveur, rien dans le canvas seul : le canvas ne dessine qu'une lumière.
- [x] Reduced motion complet : pas de lampe, volets ouverts, titres pleins, origin story empilée (`html:not(.motion)`).
- [x] Curseur natif visible ; cibles ≥ 24 px ; focus visible ambré ; lien d'évitement du socle.
- [x] Polices self-host, `font-display: swap`, 2 préchargées ; images WebP ≤ 1800 px avec `width`/`height`, lazy sous
  la ligne de flottaison, hero `fetchpriority="high"`.
- [x] Un seul canvas, rayon fixe, pause hors pointeur et onglet caché ; tout au `gsap.ticker`.
- [x] Texte jamais dépendant du halo (contraste mesuré sur le fond noir, sans lumière).
- [x] Hover par rôle (ci-dessus), idle motion (halo qui respire).
- [x] Copy en français, vouvoiement, sans tiret cadratin ; données fictives marquées à l'endroit où elles s'affichent.
