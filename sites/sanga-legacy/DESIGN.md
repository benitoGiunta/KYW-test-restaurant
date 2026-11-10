**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** : full, Sanga (ramen japonais, Rue Saint-Loup 8, Namur) ; contenu et liens gardés, système et composition changés.
- **Before** : `.hallmark/before.txt` (138 FAIL, 82 REFLEX, 7 WARN), `AUDIT.md`.
- **Keeps** : one-page ; carte en six rubriques ; téléphone `tel:081241038` ; lien Commander (Order & Eat) ; lien Google Maps ; liens de catégories vers sanganamur.be ; conditions générales et confidentialité ; baseline « le premier restaurant de ramen à Namur ».
- **Files** : `src/pages/{index,404}.astro`, `src/layouts/Base.astro`, `src/components/{Nav,Hero,Ramen,Rubrique,Plein,Nouilles,Complements,Livraison,Horaires,Pied}.astro`, `src/data/site.ts`, `src/styles/{tokens,base,page}.css`.
- **Shape** : Catalogue (kept, empreinte Heading serif|Body sans|Divider hairline et ink bar|Button pill|Image photo client|Reveal none) ; draw 1c8dc9 (Marquee Hero) non retenu comme forme : l'original est un catalogue de rubriques, la forme gardée est celle du site d'origine. Du draw sont pris : hero Counter, footer mast.
- **Theme** : Solstice, dealt 1/3, seed `restaurant-namur-japanese-ramen-b876·839c6a6f·2026-11-10·r0`. Écartés : Squeeze (vert forêt, tuiles arrondies, fruits : lit « jus de fruits », pas un bol fumant) ; Atelier (limewash et cartes de coton, galerie : trop silencieux pour un ramen de quartier). Solstice : crème, encre brune (le texte brun de l'original), un vermillon (la laque des bols), filets dorés.
- **Chrome** : nav : edge-aligned, wordmark « Sanga 山河 », trois ancres, une action (« search-led bar » du draw écarté : pas de recherche sur une carte de 33 lignes) · footer : mast (le nom à 11 rem sur bande d'encre, liens, légal).
- **Hero** : Counter. Le titre de sept mots, la phrase du client, un puits (filet d'encre, ombre dure) qui porte le téléphone en Yeseva et le bouton Commander ; photo verticale du ramen au chashu à droite.
- **Signature** : le puits de commande, le numéro de téléphone posé comme un prix de comptoir.
- **Sections** : Hero (Counter) · Ramen (Rows, tête 4 colonnes, trio de bouillons) · Plein (Showcase 21:9, deux bols vus de dessus) · Udon, soba et donburi (Rows sur deux colonnes) · Compléments (Band encre, Index sur trois colonnes) · Livraison (Figures : deux paliers 25 € et 35 €) · Horaires (Schedule + adresse) · Pied (mast).
- **Material** : real : tout le dossier (carte, prix, horaires, zones, paiement, adresse, téléphone) · pictures : 3 photos du client sur 7 (hero ramen, deux bols de dessus, aucune photo de salle) · absent : avis et note (non vérifiés), histoire, équipe, réseaux, e-mail (Gmail personnel non repris), photo de salle ou de façade.
- **Comp** : 2 built, no key · c1 chosen (`comp.md`).
- **Sweep** : phase 3.

## Approche conservée

- **Macrostructure** : Catalogue (kept).
- **Posture** : une seule page (aucune route supprimée : les routes d'origine hors accueil sont la boutique Order & Eat, lien Commander conservé) ; hero Counter (le site d'origine ouvrait par une photo, l'action est la commande) ; calme ; aucun scroll animé.
- **Dérogations** : tuiles de catégories identiques (24b) remplacées par des Rows ; `vh` du hero remplacé par `dvh` si utilisé ; gabarit hero, carte, livraison, horaires gardé en séquence (`waive 8`) ; aucune image de stock (un tiers de photos sous le hero au plus).
- **Test miroir** : un voisin avec le même site (ramen, une rue, carte et livraison) obtiendrait crème, brun et vermillon avec le puits téléphone en hero ? Seulement s'il tire Solstice et Counter ; décision propre à cette version : le trio de bouillons (miso, shio, shoyu) devient le fil de la carte, et le téléphone est le chiffre le plus gros de la page.

## Thème et tokens

Source : `src/styles/tokens.css` (Solstice). Papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, vermillon `oklch(54% 0.20 24)`, or `oklch(74% 0.14 75)` (filets et chiffres sur bande d'encre seulement). Polices : Yeseva One (titres, prix des plats en nom), Archivo (corps), Archivo Narrow (petits textes). Lumière `long-light`. Boutons : pilule vermillon 48 px, secondaire souligné or.

## Composants

- **Carte** : Rows (nom en Yeseva à gauche, prix `tabular-nums` à droite, description en dessous, filet de 1 px) ; jamais de tuiles icône ni de carte dans une carte ; une rubrique par colonne ; lien « Commander : <rubrique> » vers la catégorie de sanganamur.be ; nom et prix visibles à 375. Le trio de bouillons est un `<ul>` de pilules. Rubrique Compléments sur la bande d'encre (une seule bande sombre).
- **Horaires** : Schedule en `<table>` à `<time>` : lundi « Fermé » en `--color-muted`, jamais barré ; dits une fois, en fin de page ; jour courant : phase 2 (étape de surface, sans icône d'horloge).
- **Pied** : forme mast (le nom en grand sur encre, accueil « Irashaimase ! Bienvenue ! » repris du site, cinq liens, mention légale et crédit des photos), puis `<KywFooter />` ; ni « Tous droits réservés » ni newsletter.
- **Photo** : `<figure><div data-slot data-alt><img></div><figcaption></figcaption></figure>`, `width` et `height`, hero `fetchpriority="high"`, la photo large en `lazy`, légende = le sujet réel du fichier (`photos/index.json`).
- **Nav** : edge-aligned, 72 px, sticky à `--z-sticky-nav`, trois ancres en casse de phrase non trackées, « Commander » en action (`page.css`, bloc Nav) ; sous 60 rem les ancres passent dans un menu Popover API (`<button popovertarget="menu">Menu</button>` + `<nav popover>`), panneau sous la barre, ouverture 220 ms `--ease-out`, fermeture à 68 % en `--ease-in`, Échap et clic extérieur natifs, un lien d'ancre referme le panneau (script de `Nav.astro`) ; skip link `.skip` ; `scroll-padding-top` = 72 px + 24 px.
- **Bouton** : une recette de primaire rempli (pilule vermillon 48 px, nav 44 px) ; secondaire = lien souligné or (`.lien`) ou bouton Menu outlined ; états : repos, hover (sous `(hover: hover)` seulement), focus-visible (anneau encre 3 px, instantané), `:active` (1 px de descente), `:disabled` et `aria-disabled` par trois canaux (fond, bordure pointillée, curseur) ; `transition` listée (couleurs, `transform`) ; `(pointer: coarse)` : cibles de 44 px.
- **Formulaire et switcher de carte** : aucun. Pas d'outil de réservation (Commander mène à Order & Eat, `tel:` conservé) et la carte est une page de rubriques en séquence, pas un switcher : rien à inventer.
- **Horaires** : jour courant (`aria-current="date"`, fuseau de Namur, script de `Horaires.astro`) : fond `paper-3`, repère vermillon de 4 px et mot « aujourd’hui » ; pas de « ouvert maintenant » (statut non prouvé) ; sans script le tableau reste complet.
- **Motion** : caractère *quiet* de Solstice (`calm`, échelle 1,0) : aucun reveal, aucun compteur, aucune boucle ; seuls mouvements : le menu, les couleurs au survol, la descente de 1 px à l'appui ; `prefers-reduced-motion` (`base.css`) ramène tout à 0,01 ms et coupe `scroll-behavior: smooth`. Raison : le thème dit « No reveal » et la page est une carte à lire.

## Sur-utilisation

- [x] 1. Hallmark lu : SKILL.md, redesign.md, layout.md, gates.md (Floor), anatomy.md, comp.md, design-md.md, theme solstice.md · preuve : `.hallmark/log.json`, stamp de `src/styles/page.css:1`
- [x] 2. Audit avant refonte · preuve : `AUDIT.md`, `.hallmark/before.txt`
- [x] 3. Deal, draw et scaffold tracés · preuve : `page.css:1-3`, `src/styles/tokens.css`
- [x] 4. Comp avant build, deux variantes sur un axe · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 5. Floor sans FAIL sur le CSS aplati et la page · preuve : sloplint, 0 FAIL, 1 WARN (écarts de gouttière, corrigé ensuite) ; les FAIL restants du build concernent `packages/kyw-footer`, jamais modifié
- [x] 6. Aucun tiret cadratin, apostrophes typographiques, insécables avant « : ; ! ? € » · preuve : `src/data/site.ts`, contrôle ci-dessous
- [x] 7. Hero review et rendu (`--render --stage hero --url`) · preuve : `.logs/c2-sloplint-hero4.log` (0 FAIL, 0 REFLEX, 1 WARN faux positif sur `Plein.astro`, image sous le pli, 1 NOTE 58 reportée en phase 3) ; hero-review : self · ship · 2 findings · 2 resolved (REFLEX 44c écart texte/photo et dépassement du pli, REFLEX 79 vide sous le hero, corrigés : `figure` à marge 0, photo en `svh`, hero centré) ; pas de sous-agent possible en session d'agent, auto-notation marquée `self`
- [x] 8. Motion, menu mobile, états des contrôles · preuve : `page.css` blocs Controls, Nav, Menu mobile ; mesure Playwright (menu ouvert au toucher et au clavier, fermé par Échap et par clic sur un lien, 0 débordement à 375, 768, 1280)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` vide ; `page.css` (couleurs, `transform`, `opacity`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:11`, `page.css` `.btn:focus-visible`, `.pied :focus-visible`
- [x] 17. Hero en `svh` (6a) · preuve : `page.css` `.hero` (`min-height: calc(100svh - 72px)`), aucun `vh` ni `100vw`
- [x] 7b. Fallback reduced motion et contenu visible sans script (27, 62) · preuve : `base.css` (bloc `prefers-reduced-motion`), mesure sans JavaScript : h1 et photo visibles, aucun contenu caché au repos
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `--z-sticky-nav`)
- [x] 20, 21, 22, 24. Radios-onglets, vidéo de fond, reveal, tooltip et auto-rotation : sans objet (aucun) · preuve : grep
- [x] 23, 29. États d'input, aucun faux envoi : sans objet, aucun formulaire
- [x] 30. SVG décoratifs : aucun `<svg>` · preuve : grep
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : hover seulement sur liens et boutons, sous `(hover: hover)` ; la ligne de carte ne réagit pas (conflit avec « a row lights on hover » du thème, la gate 11 gagne)
- [x] 49. `:active`, `:disabled`, contrôles de 44 à 52 px (26b, 39b) · preuve : `page.css` `.btn`, `.nav__menu` (44 px)
- [x] 56. Un primaire rempli (F4) · preuve : une recette (`.btn`), jamais deux remplis côte à côte
- [x] 58. Une recette de conteneur, un pattern de scroll (F7, F8) · preuve : `.well` seul ; aucun scroll animé
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` (F16) · preuve : `base.css:10-12`
- [x] 72. Responsive : breakpoints 60 rem et 40 rem, `(hover: hover)`, `(pointer: coarse)`, safe-area dans `--gutter`, 16 px au téléphone, `overflow-x: clip` html et body · preuve : `tokens.css:10`, `base.css:2`, `page.css` fin de fichier
