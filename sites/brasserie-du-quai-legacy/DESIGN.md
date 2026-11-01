**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 pages + 404 (/, /reservation/, /cheque-cadeau/, /la-carte/, /lecailler/, /galerie/) : les routes du site d'origine, aucune supprimée
- **Before** · audit sloplint `--before` à faire en phase 2 (rendu navigateur) ; lecture des captures du client : WordPress + Elementor (Link-Eat), fond bleu nuit et or, hero plein écran au logo BQ, pages Bon cadeau et Galerie sans texte ; ce qui reste : les photos de la salle et de la terrasse, la carte en texte, le logo doré
- **Keeps** · le lien Zenchef (rid 379458), le module bons cadeaux Brydge, l'itinéraire Google Maps, `tel:`, `mailto:`, Facebook, Instagram ; 24/24 photos du client ; la séquence hero, lieu, restauration, réseaux, pied
- **Files** · create: sites/brasserie-du-quai-legacy/** · delete: none
- **Shape** · « une brasserie au bord de l'eau en cinq pièces » (kept, empreinte Photographic) · genre atmospheric · job: book, l'action dans la nav, dans le hero, à la fin de l'accueil et dans la barre collante au téléphone
- **Theme** · Spore, dealt 1/3, colourway head-torch (noir café, Young Serif, ocre) · écarte Darkroom (photos noir et blanc : tuerait les assiettes et l'or du logo) et Midnight (grotesque froide, voix de logiciel)
- **Chrome** · nav: banner-over-bar · footer: statement
- **Hero** · Poster (kept) : la salle et ses baies sur la Meuse en plein cadre, logo BQ et titre bas à gauche sur un voile
- **Signature** · le prix de six huîtres (15 €) posé comme une section, en ocre, sur un puits grainé
- **Sections** · Hero · Lieu (Split) · Chiffre écailler (One figure) · Cuisine (Rows) · Salle pleine largeur sans titre · Réseaux (Statement) · Venir (Schedule + adresse) · Footer
- **Material** · real : adresse, téléphone, courriel, horaires saisonniers, 49 lignes de carte, jours du banc d'écailler, textes du site · pictures : client 24, library 0 · absent : avis, notes, chiffres de fréquentation, desserts et vins
- **Comp** · à faire en phase 2 (2 comps HTML du premier écran, no key)
- **Sweep** · à faire en phase 3

## Approche

- **Macrostructure conservée** : multi-pages, accueil long avec hero plein écran puis sections, pages de contenu (carte, écailler) et pages de service (réservation, bon cadeau, galerie). Empreinte à six axes : `Heading: serif display · Body: sans 16 px · Divider: filets 1 px · Button: pilule · Image: photo du lieu, plein cadre et en encart · Reveal: aucun` (le site d'origine animait au Lottie/Swiper sans chorégraphie de scroll : la refonte reste calme).
- **Posture conservée** : multi-pages, mêmes routes ; hero Poster (le site ouvrait sur une photo plein écran au logo) ; atmosphère sombre (fond bleu nuit d'origine → noir café chaud du thème).
- **Draw 333a6d** (Marquee Hero · hero Index · nav search-led bar · footer statement · barre de réservation collante) : pris le footer statement, la barre collante au téléphone, la salle en pleine largeur sans titre, les horaires et l'adresse en section propre avant la fin. Échangés : Marquee Hero → forme d'origine conservée (contrainte KYW) ; hero Index → Poster (le site ouvrait sur la photo) ; nav search-led → banner-over-bar (rien à chercher sur six pages ; le bandeau garde l'adresse et le téléphone que la barre d'origine portait à gauche et à droite).
- **Dérogations** : flux Instagram (module tiers à 8 vignettes) → liens vers les comptes (dropped, stamp) ; carte Google intégrée → lien d'itinéraire (même destination) ; carrousel Swiper de la galerie → planche légendée (gate 18) ; Zenchef en bouton flottant permanent → lien direct + module chargé à la demande sur /reservation/ (leçon les-potes-au-feu : iframe et gate 26a) ; « Restauration » et « Chèque cadeau » (labels plats) → titres qui disent quelque chose (gate 54, reworded au stamp).
- **Test miroir** : un voisin namurois avec un site identique n'aurait pas « 15 € » en ocre comme section, ni la semaine du banc d'écailler en Schedule ; la combinaison Spore + Poster + banner-over-bar n'est pas dans le journal (Vellum/edge-aligned, Solstice/masthead).

## Thème

Spore, `dealt 1/3, seed restaurant-namur-brasserie-seafood-a026·4879f0a6·2026-11-01·r0`, genre atmospheric (le site d'origine est sombre, bleu nuit et or).
- Pourquoi Spore : sa matière (photos à la lampe, Young Serif, prix en couleur, puits grainés) porte une brasserie du soir au bord de l'eau et une carte longue ; sa colourway head-torch met un ocre là où le logo BQ a son or (#B3813B), sans importer une couleur de mémoire.
- Pourquoi pas Darkroom : impose des photos noir et blanc, or les assiettes et la terrasse sont la matière du client.
- Pourquoi pas Midnight : bleu nuit proche du site d'origine, mais Mona Sans élargie et la voix d'un logiciel ; pas de serif pour porter la carte.

## Système (depuis `src/styles/tokens.css` + surcharge head-torch dans `page.css`)

| Rôle | Valeur |
| --- | --- |
| Fond | `--color-paper` oklch(12% 0.008 60) · puits `--color-paper-2` 19 % · bande `--color-paper-3` 24 % |
| Encre | `--color-ink` oklch(93% 0.03 85) · `--color-ink-2` 84 % · `--color-muted` 67 % · filets `--color-rule` 31 % |
| Accent | `--color-accent` oklch(74% 0.13 80) ocre · survol `--color-accent-2` 83 % · texte sur accent `--color-accent-ink` |
| Type | Young Serif 400 (titres, prix, jours, noms de plats) · Instrument Sans 400/500/600 (corps, labels), italique pour le second nom |
| Échelle | `--text-display` clamp(2.75 → 5.25 rem) · `--text-section` · `--text-title` · `--text-lead` · `--text-md` 1 rem |
| Espace | `--space-*` 2 → 144 px · `--section-gap-s` 120 / 80 / 56 px · gouttière 64 / 24 / 16 px |
| Surfaces | filets 1 px ; pilules sur contrôles ; `--radius-card` 14 px sur puits et photos ; grain seulement sur puits et bandes |
| Motion | caractère calme, état seulement, une frame (Spore § Motion : « nothing reveals, nothing grows, nothing loops ») ; **aucun reveal** (décidé en phase 2 : le site d'origine n'avait pas de chorégraphie au scroll) ; durées `--dur-micro` 120 ms (contrôles) et `--dur-short` 220 ms (menu) ; défilement doux seulement sur /la-carte/ et seulement sans `prefers-reduced-motion` ; en reduced-motion toutes les transitions tombent à 0,01 ms (`base.css`) |

## Composants

| Composant | Décision | Référence |
| --- | --- | --- |
| Bouton | une recette de primaire (pilule ocre pleine, 48 px), secondaire cerclé 1,5 px ; labels = verbes (« Réserver une table », « Lire la carte », « Commander un bon cadeau ») ; transitions sur couleur, ombre, opacité | spore.md § Controls, gates 19, 39b, F4 |
| Nav | banner-over-bar : bandeau 32 px (adresse, téléphone) qui sort au défilement (`top: -32px`), barre collante 72 px (logo + nom, 5 routes en casse de phrase, « Réserver ») ; menu Popover sous 60rem ; lien d'évitement | layout.md § 7, microinteractions.md § Menu |
| La carte | Rows : nom en Young Serif colonnes larges, prix à droite en ocre `tabular-nums`, « Prix du jour » en toutes lettres en muted, détail en italique ; sommaire en pilules ; photo collante à gauche | F6, F25, spore.md § Range |
| L'écailler | huîtres en table 6 / 12 pièces (`data-label` pour le téléphone), produits de la mer en Rows à côté de la photo, plateaux en deux groupes sur bande grainée ; la semaine du banc en Schedule, mardi et mercredi en muted | layout.md § 5.16, leçon atelier-de-bossime (table restackée) |
| Horaires | Schedule à deux saisons (`<dl>`, `<time>`), la saison en cours soulevée d'un cran avec une pastille « en ce moment » ; jour de fermeture en slot `.fill` | craft.md § 9, patterns.md § A fact the prompt did not give |
| Réservation | lien Zenchef direct (câblage) ; module chargé dans son cadre à la demande ; pas de formulaire maison (le service existe déjà) | redesign.md § What a redesign keeps |
| Pied de page | statement : l'adresse en Young Serif (« 9 rue du Quai, 5000 Namur » ; la devise « Au pied du pont du Luxembourg… » répétait le hero et le h2 de l'accueil, REVUE-1 F2-3), téléphone, courriel, itinéraire, réseaux, bon cadeau, TVA ; puis le pied KYW hérité | anatomy.md § book |
| Photo | `<figure data-slot data-alt>` avec `srcset` WebP 640/1140/1600/max, `width`/`height`, hero `fetchpriority="high"`, autres lazy ; traitement chaud de `base.css` | patterns.md § A photograph in a slot |
| États (phase 2) | survols sous `@media (hover: hover)` ; appui = descente de 1 px (`transform`) ; désactivé = opacité 0,55 + `not-allowed` + `disabled` ; chargement des modules Zenchef/Brydge : `aria-busy`, ligne `role="status"` « Chargement du module… », message de lenteur à 10 s, lien direct gardé sous le cadre (`data-repli`) ; succès = le module lui-même | interaction-and-states.md § The eight states |
| Menu mobile | `<nav popover>` (Popover natif : Échap, clic extérieur, état étendu exposé), entrée opacité + 8 px en 220 ms par `@starting-style`, fond bloqué (`html:has(:popover-open)`), lien courant en ocre | microinteractions.md |
| Signature (finition) | « 15 » en Young Serif ocre, « € » en exposant à 0,4 em, texte lisible par les lecteurs d'écran en `.visually-hidden` | Picks · Signature |
| Barre collante | sous 40rem : « Réserver une table » + « Appeler », le primaire du hero masqué (leçon atelier-de-bossime : deux primaires empilés) | draw 333a6d |

## Liste de sur-utilisation

À cocher en phases 2 et 3 (audit `--before`, comps, sloplint `--stage hero`, sweep `--kept`, log).


## Révision 1 (01/11/2026)
- Polices auto-hébergées : sous-ensemble latin de Google Fonts (OFL) copié dans `src/assets/fonts/` (woff2, Instrument Sans variable 400-600 + italique, Young Serif), `@font-face` inline dans `Base.astro`, `font-display: swap`, préchargement de Young Serif. Plus aucune requête vers Google (REVUE-1 F2-2).
- Pied de page : la phrase statement devient l'adresse (voir tableau) ; la phrase « Au bord de la Meuse, au pied du pont du Luxembourg. » du bloc Venir de l'accueil est retirée (F2-3).
