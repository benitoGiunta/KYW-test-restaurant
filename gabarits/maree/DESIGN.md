# DESIGN — gabarit « Marée »

## Concept Card
- **Idée** : tout est posé sur une ligne d'horizon. Une houle (path SVG sinusoïdal à 2 ondes) sépare chaque paire de
  sections, ondule avec la vitesse de scroll et découpe le bas de la photo du hero. Le nom du restaurant s'étire d'un
  bord à l'autre de l'écran comme un quai.
- **Métaphore** : la Meuse vue de la terrasse (l'Avenue de la Plante longe réellement la Meuse) : horizon, reflets, marée
  des services.
- **Signature** : la houle, un seul path recalculé au `gsap.ticker` et partagé par toutes les instances (`[data-houle]`) ;
  amplitude 6 px au repos (elle respire), 28 px à vitesse max, pilotée par `onScroll().velocity` via `gsap.quickTo`.
  Mobile : amplitude /2 et 30 fps ; pause hors écran (IntersectionObserver). Reduced motion : path statique.
- **Émotion** : l'appétit d'air frais, un dimanche midi au bord de l'eau. **Verbe** : ondule.
- **Screenshot** : hero photo d'eau et de ciel, nom en Gambetta crème bord à bord posé sur l'horizon, houle crème qui
  découpe le bas de l'image, trois mots-univers en mono (terrasse · écailler · bistronomie), pile de 3 CTA bordés en haut
  à droite.

## Système
- **Palette** (rôles) : `--c-bg` ground #FBFBF8 ; `--c-fg` ink bleu Meuse #17395B ; `--c-ecume` #D8E3EA (sections
  « eau », fond des photos) ; `--c-sable` #D5C4A1 (filets, badges neutres) ; `--c-accent` bouée #D73C2C (badge
  « arrivage », focus, curseur « maintenant » ; rare) ; `--c-muted` #4A6480 (5,6:1 sur ground). Aucune section sombre.
- **Typo** : display Gambetta 500/700 (Fontshare, self-host), -0.02em, line-height 0.95 ; texte et UI General Sans
  400/500 (Fontshare) ; meta Martian Mono 400 (Google), 12 px, +0.04em, capitales. 5 woff2, 2 préchargés (Gambetta 700,
  General Sans 400).
- **Grille** : 12 colonnes, gouttière 40 px desktop (16 px mobile) ; photos au bord (full-bleed), texte sur colonnes 2-7
  (`.col-texte`), listes sur 2-11.
- **Rythme** : respirations longues (`--u` × 14 à 28) ; une houle entre chaque paire de sections ; alternance
  ground (texte, « ciel ») / écume (photos, « eau »).
- **Radius** : 0. Les photos sont découpées par la houle, jamais arrondies. Pas de texture.
- **Motion language** : `ease.out` (expo) pour les entrées, 1,2 s ; la houle respire en sinus lent (période 6 s) ;
  loader « marée montante » 0,00 m → 2,40 m (desktop seulement, plancher 0,6 s, plafond 1,3 s, sortie 0,9 s : < 2,6 s ;
  aucun loader en mobile), panneau écume qui remonte avec une crête de houle ; transition : rideau
  écume à deux crêtes qui monte puis s'enlève ; hero (desktop) : la photo, peinte dès le premier rendu
  sous le loader (LCP), se pose par un léger dézoom 1,08 → 1 ; le nom se pose par transform + opacité ; mots-univers en
  fondu décalé. Mobile : aucune intro, photo, nom et mots-univers peints sans attendre le JS.
- **Hover par rôle** : nav = soulignement qui se dessine ; CTA bordé = fond ink + texte crème ; segment de la ligne de
  temps = épaississement + tooltip ; pastille du plan = grossit + légende ; photo = curseur « Voir » + léger zoom.

## Wireframes (desktop)
```
HERO    [brand]                           [Réserver][Terrasse][Bon cadeau]
        ====================== photo eau et ciel ======================
        L E S  P O T E S  A U  F E U   (bord à bord, crème, sur horizon)
        ~~~~~~~~ houle crème découpe le bas ~~~~~~~~
        terrasse · écailler · bistronomie      accroche (col 2-7)
MARÉE   LUN  |----|   |====|          badge « ouvert / prochain service »
        ...  08h --------------------- 23h  curseur rouge « maintenant »
~houle~
ÉCAILLER [photo plateau, bord gauche]   L'écailler (Gambetta)
                                        Huître Zélande 00 · origine (mono) …
~houle~
CARTE   Menu dégustation 67 €   plat ............. (prix seulement s'il existe)
~houle~
TERRASSE ===== photo plein cadre teintée bleu (multiply) =====
         « citation en mono espacée, lettre à lettre »
~houle~
RÈGLES  [terrasse sans réservation] [chiens bienvenus] [menu enfant] [végé sur demande]
~houle~
PLAN    plan au trait : Meuse, Avenue de la Plante, pont de Jambes ; pastilles 1-4 ; légende
~houle~
RÉSERVER [ bouton large bleu ]   téléphone   privatisation
FOOTER  nom bord à bord sur écume · adresse · horaires · KywFooter
```
Mobile 390 : nom sur deux lignes (chaque ligne bord à bord), houle conservée (amplitude /2), ligne de temps défilable,
plan pleine largeur avec légende en liste, barre basse fixe Réserver / Appeler.

## Test de généricité
Un modèle ferait un hero photo + titre centré + grille de cartes. Ici l'horizon dicte la place de chaque chose (nom posé
sur la ligne d'eau, houle qui remplace les bordures de section), la houle répond au visiteur, et le plan du quai est une
information locale réelle (Meuse, Avenue de la Plante, pont de Jambes).

## Règles dures de la skill (preuve)
- [x] Un seul `<h1>` par page, landmarks, listes, boutons/liens : pages `src/pages/*.astro`.
- [x] Titre/description uniques, canonical, OG, JSON-LD, noindex : `layouts/Base.astro` (socle).
- [x] `width`/`height` sur chaque `<img>`, lazy sous la ligne, hero `fetchpriority="high"` + `data-critical`.
- [x] Polices self-host woff2 ≤ 5 fichiers, 2 préchargées : `public/fonts/`, `Base.astro`.
- [x] Reduced motion : houle statique, pas de ticker, plan tracé, nom sans étirement : `motion/houle.ts`, `engine`.
- [x] Focus visible contour bouée partout : `base.css` `:focus-visible`.
- [x] Cibles ≥ 24 px (liens `.link` paddés), CTA 44 px.
- [x] Idle motion : houle qui respire (décision : oui, sinus lent, pausé hors écran).
- [x] Pas de récompense ni chiffre inventé ; données fictives `placeholder: true` + mention visible « illustratif ».
- [x] LCP = accroche texte du hero (pas de data-reveal/data-intro dessus) ; image hero `data-critical`.

## Révision 1 (30/10/2026, REVISION-1.md)
- Nom bord à bord : `fitNom` mesure le premier ancêtre qui n'est pas `display: contents` et plafonne un mot à 30 vw en
  mobile (20 vw en desktop) ; vérifié à 390 et 360 px (h1 de 190 et 175 px).
- Hero de l'accueil : photo d'eau turquoise (libre-124) au lieu du ciel gris ; le CTA « La terrasse » porte « illustratif ».
- Marée des services en mobile : la piste 08h-23h tient dans l'écran (plus de défilement), midis et soirs visibles.
- Nav : sous-libellés « section illustrative » pour l'écailler et la terrasse, « Damien et François » pour Les potes.
- Aucune affirmation hors dossier dans les pages : plus de « offert », de badge « arrivage » sur la carte, de « face à
  l'eau » hors de la page terrasse illustrative, de promesse de privatisation au-delà du dossier (« mariage, événement,
  chef à domicile »). Photos de la carte et de l'encart écailler : plats du restaurant (Saint-Jacques, bœuf confit).
