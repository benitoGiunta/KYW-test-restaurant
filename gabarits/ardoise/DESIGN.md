# DESIGN — gabarit « Ardoise »

## Concept Card

- **Idée** : la page d'accueil est l'ardoise. Pas de hero photo : le nom en deux lignes, la suggestion du jour, deux
  onglets MIDI | SOIR et la carte en liste typographique, prix tabulaires à droite, sur fond anthracite. Les photos
  n'arrivent qu'au survol (aperçu 4:5 qui suit le pointeur) et sur la page salle (fond clair).
- **Métaphore** : l'ardoise posée à l'entrée d'une brasserie, lue en passant.
- **Signature** : la ligne « Aujourd'hui : … » s'efface de gauche à droite (`clip-path`, 0,5 s) puis se réécrit mot à mot
  (stagger 0,08) quand on change de jour avec les flèches ; le reste de l'ardoise ne bouge pas. La ligne ouvre sur le jour
  réel (calculé côté client, aucune date en dur).
- **Émotion** : la simplicité, on sait tout de suite ce qu'on mange et combien ça coûte. **Verbe** : s'efface et se réécrit.
- **Capture qui résume** : l'ardoise, onglets MIDI | SOIR, vingt lignes en Cabinet Grotesk, un aperçu photo flottant
  incliné sur la ligne survolée.

## Système

- **Palette** : ground ardoise `#2A2E2D`, ink craie `#F3F1EA`, accent craie jaune `#E9D064` (survol, onglet actif, barre du
  loader, prix du jour), muted `#9A9D9B` (4,9:1 sur ardoise), filet craie 15 %, ground clair `#EDEBE4` (salle, contact,
  formulaires) avec muted sombre `#5E615F` (5:1). Le jaune ne porte jamais de texte sur fond clair.
- **Typo** : Cabinet Grotesk 800 (Fontshare, `public/fonts/cabinet-grotesk-800-normal.woff2`) en capitales, tracking
  -0.03em : nom, catégories, onglets, mots géants, prix des formules. Schibsted Grotesk 400/700 (Google) : lignes de carte,
  UI, texte ; `font-variant-numeric: tabular-nums` partout où il y a un prix.
- **Grille** : accueil : colonne de carte sur 8 colonnes (3 à 10) de 12 ; aperçu flottant hors grille (`position: fixed`,
  22 vw, 4:5) ; pages secondaires 12 colonnes. Mobile : 16 px de gouttière, vignettes inline 56 px.
- **Rythme** : dense et régulier : lignes 56 px, filets 1 px craie à 15 %, 48 px entre catégories ; une seule section pleine
  hauteur (l'ardoise). **Radius** : 0 ; prix cerclés à 999 px sur la version claire seulement. **Textures** : aucune.
- **Motion language** : `expo.out`, 0,4 à 1,2 s ; lignes qui « s'écrivent » (clip-path gauche → droite, stagger 0,04) ;
  prix des formules en chars ; mots géants en parallaxe à vitesses différentes ; marquee d'état lent (idle unique).
  Loader : ardoise, nom en Cabinet, trait jaune qui se trace ; sortie : le panneau glisse vers la droite comme un coup
  d'éponge. Transition : panneau ardoise qui balaie de gauche à droite.

## Wireframes

```
BARRE D'ÉTAT (marquee, 32 px)   « OUVERT JUSQU'À 21:00 · … »
EN-TÊTE  LES POTES AU FEU                     La carte  La salle  La maison  Formules  Réserver
ARDOISE (100 svh)                                      │ col 3-10
   LES POTES                                            │
   AU FEU                                               │
   ‹ Aujourd'hui, mercredi : Saint-Jacques … (exemple) ›│  aria-live
   MIDI · mer. et ven.  |  SOIR · lun. au ven.          │  soulignement jaune qui glisse
   ─────────────────────────────────────────────────────│
   MENU DÉGUSTATION 4 SERVICES                     67 € │
   Mises en bouche ............................          │   [aperçu 4:5
   Légumes racines / Champignons / Noix ........          │    flottant]
   POUR COMMENCER · lignes d'exemple                     │
   Croquettes de crevettes grises  végé  exemple    14 € │
FORMULES (3 colonnes)   67 €        52 €        40 €      prix qui s'écrivent ; bon cadeau en ligne
LA SALLE (full-bleed clair)  [photo salle]  phrase courte   SALLE / BAR / CUISINE (mots géants, parallaxe)
LA MAISON (asymmetric pair)  [photo trio]   histoire courte, lien
HORAIRES ET ACCÈS (tableau 7 lignes jour / midi / soir)   adresse, bord de Meuse, plan
FOOTER minimal + KywFooter
BARRE BASSE FIXE (64 px, craie)  RÉSERVER | APPELER | BON CADEAU
```

## Test de généricité

Un modèle ferait un hero photo « Bienvenue » et un bouton « Voir la carte ». Ici la carte EST l'accueil, les prix sont
alignés comme sur une ardoise, la suggestion du jour se réécrit et l'état d'ouverture défile : seule une table lue
« en passant » justifie cette structure.

## Règles dures de la skill (preuves)

- [x] Loader, transition, intro écrits pour le gabarit (`src/motion/setup.ts`), jamais les défauts du moteur.
- [x] Hero peint au premier rendu : nom et accroche sans `data-intro` ; les lignes de carte se révèlent par `clip-path` sous
  `html.motion` seulement, le texte reste visible sans JS et en reduced motion.
- [x] Aucune date en dur : jour réel et état d'ouverture calculés côté client à partir de `site.horaires` ; repli statique.
- [x] Aucune récompense, chiffre ni avis inventé ; une donnée illustrative = un drapeau dans `site.ts` + une marque visible.
- [x] Animations sur `transform`, `opacity`, `clip-path` uniquement ; aucun défilement automatique.
- [x] Survol et focus par rôle : ligne en craie jaune + aperçu (aussi au focus) ; actions de la barre basse inversées.
- [x] Idle : le marquee d'état (statique en reduced motion).
- [x] `width`/`height` sur chaque `<img>`, liens par `u()`/`asset()`, KywFooter sur chaque page, noindex, `lang="fr"`.
