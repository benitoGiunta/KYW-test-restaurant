**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 5 pages (/, /les-potes-au-feu, /le-menu-des-potes, /reservation-en-ligne, /contactez-nous)
- **Before** · Floor 140 FAIL · Reflex 129 · un site E-net multipage, blanc et orange, à diptyque des deux chefs, zigzag texte-photo, cookies et widget Zenchef envahissants ; les photos, les textes, la carte, les horaires et Zenchef restent
- **Keeps** · 5/5 routes (slugs gardés, préfixes `/page/`, `/categorie/`, `.html` retirés) · Zenchef rid=379477 · tel:+3281640444 · Facebook · YouTube · bon cadeau · 7/7 champs du formulaire de contact · le logo · la séquence de l'accueil
- **Files** · create: sites/les-potes-au-feu-legacy/** · delete: none
- **Shape** · une carte de bistro en diptyque (kept, empreinte Split Studio) · genre editorial · job: book, l'action dans la nav, dans le hero, sur la carte et à la clôture
- **Theme** · Solstice, dealt 1/3 (crème, encre brune, Yeseva One sur Archivo, filets d'or, ombre dure, un vermillon) · écarte Squeeze (sans géométrique et vert saturé contre le serif du site d'origine) et Vellum (gothique, ton de cave trop solennel pour des Potes)
- **Chrome** · nav: masthead (kept : liens de part et d'autre du logo centré, sticky) · footer: index columns (kept : un vrai plan du site)
- **Hero** · Poster (kept) : les deux portraits plein cadre côte à côte, la rencontre posée bas sur un puits crème ; Banner sur les pages intérieures
- **Signature** · les deux Potes côte à côte, une moitié d'écran chacun, « L'histoire d'une rencontre » posée sous leurs visages
- **Sections** · Hero (Poster diptyque) · Comme des Potes (Split) · Un vrai moment de cuisine (Statement, bande d'encre) · Notre concept en vidéo (Showcase) · Piliers (Rows) · Heures d'ouverture et réservation (Schedule, bande papier) · Footer (index columns)
- **Material** · real : noms, histoire, menu 67 €, formule 52 €, lunch 40 €, suppléments, horaires, adresse, téléphone, Zenchef, Facebook, YouTube, avis Michelin 2026 · pictures : client 18 (dont 3 du Guide MICHELIN), library 0 · absent : avis clients, note Google (non affichée), chiffres, logos tiers
- **Comp** · 2 built, no key · c2 chosen · reproduced (checked at 1280x800)
- **Sweep** · Floor 0 FAIL · Reflex 0 ouvert (waived : 8, 59) · dismissed : 25, 28a, 77 ×2 · kept : comparé à la main (sloplint ne compare pas des URL différentes, voir RAPPORT.md) · hero-review: self · 3 findings · 3 resolved · finish-review: self · 5 findings · 3 resolved 2 unresolved

*Le draw (b9eaa1) proposait shape Letter, nav masthead, footer index columns, hero Poster, une barre de réservation sticky et la carte en Switcher. Gardés : Poster, masthead, index columns, Switcher (sur /le-menu-des-potes), horaires et adresse en section propre, clôture horaires + adresse + réservation. Échangés : Letter → la forme du site d'origine (contrainte KYW) ; barre sticky → « Réserver » dans la nav sticky (le site d'origine avait un widget flottant qui masquait la page). Test miroir : un bistro voisin sur Solstice avec Poster + masthead obtiendrait une photo de salle ; ici le diptyque des deux chefs, propre au site d'origine, fait la différence.*

# Design: Les Potes au Feu, variante legacy

Le système verrouillé. Les cinq pages le lisent et le partagent ; il se change exprès, le fichier fait la règle.

## System
- Genre : editorial
- Shape de la première page : une carte de bistro en diptyque (Split Studio gardé du site d'origine)
- Theme : Solstice, lumière `long-light`
- Axes : light/high-contrast-serif/warm · posture : restrained

## Tokens
`src/styles/tokens.css` fait foi. Les rôles :
```css
:root {
  --color-paper: oklch(94% 0.03 80);  --color-paper-2: oklch(97% 0.02 85);  --color-paper-3: oklch(89% 0.05 80);
  --color-ink: oklch(27% 0.05 50);  --color-ink-2: oklch(36% 0.05 50);  --color-muted: oklch(48% 0.06 55);  --color-rule: oklch(84% 0.06 78);
  --color-accent: oklch(54% 0.20 24);  --color-accent-ink: oklch(97% 0.02 85);  --color-focus: oklch(54% 0.20 24);
  --color-gold: oklch(74% 0.14 75);  --color-gold-2: oklch(84% 0.11 80);
  --font-display: "Yeseva One", ui-serif, Georgia, serif;  --font-body: "Archivo", ui-sans-serif, sans-serif;  --font-outlier: "Archivo Narrow", ui-sans-serif, sans-serif;
  --radius-card: 0;  --radius-pill: 999px;  --rule-hair: 1px;  --rule-bar: 2px;  --shadow-card: 10px 10px 0 var(--color-paper-3);
}
```
L'échelle d'espace, l'échelle de type, les easings et les durées sont celles du scaffold, dans `tokens.css`. Ajouts de page : `--nav-h` (76 px, 64 px sous 60rem), `--well-pad`.

## Controls
- Primaire : pilule vermillon remplie, Archivo Narrow 600, texte `--color-accent-ink`, 48 px (44 px dans la nav) ; une seule recette par page.
- Secondaire : typographique, encre sur soulignement de 2 px, 44 px de cible ; le soulignement passe au vermillon au survol.
- Champs : carrés, `--color-paper-2`, bordure 1 px d'encre constante, anneau en `outline` inset, 48 px.

## Motion
- Caractère : still (Solstice : « no reveal, no counter, no loop »). Aucun reveal ; seuls les survols et l'onglet de la carte bougent, `--dur-short` sur `--ease-out` ; sous reduced motion tout finit d'un coup (`base.css`).

## Exports
`tokens.css` dans ce projet. Aucun export Tailwind/DTCG demandé.

## Approche
- **Macrostructure conservée** : le site d'origine est un Split Studio irrégulier (texte d'un côté, photo de l'autre, en zigzag), multipage. Empreinte gardée et corrigée (`Heading|Body|Divider|Button|Image|Reveal`) : `Overlapping (hero) puis left-margin | Two-column asymmetric | Hairline rule + bande | Solid (une pilule) | Full-bleed (hero) puis cadré à la grille | None`. Nom court : *une carte de bistro en diptyque*.
- **Posture conservée** : multi-pages, mêmes routes utiles (`/`, `/les-potes-au-feu/`, `/le-menu-des-potes/`, `/reservation-en-ligne/`, `/contactez-nous/`) ; hero Poster (diptyque plein cadre) à l'accueil, Banner sur les pages intérieures (photo de 320 px de haut sur le contact, aucune photo sur le menu et la réservation depuis la révision 1, pour que la carte et le module tiennent dans le premier écran) ; calme (aucune animation au scroll à l'origine, aucune ici).
- **Dérogations justifiées** :
  - Zigzag texte-photo → la photo garde son côté, une seule section photo de suite au plus (`layout.md` § 7, 83).
  - « Un vrai moment de cuisine » perd sa photo de dessert et devient une Statement sur bande d'encre (jamais deux sections photo de suite ; le dessert n'est plus nécessaire).
  - Bandeau CTA gris (deux boutons, sans masse, 77) → clôture « Heures d'ouverture » + adresse + réservation + bon cadeau, en fin de page (`anatomy.md` § book, Ends).
  - Vidéo YouTube embarquée → photo large liée à la vidéo (Showcase) : même destination, sans lecteur tiers chargé d'office.
  - Piliers en icônes et capitales (3, 67) → trois rangs typographiques avec une phrase tirée du dossier.
  - Galerie lightslider de 12 photos (83) → rail de 8 photos défilable au toucher et au clavier.
  - Barre supérieure (Namur, téléphone, statut, partage, 63) → supprimée ; téléphone dans le menu mobile, la clôture et le pied de page ; le statut « ouvert/fermé » devient le jour courant marqué dans les horaires.
  - Iframe Zenchef chargée d'office → module Zenchef chargé à la demande dans son cadre (bouton) + lien direct (même URL) : 26a ne peut pas prouver le focus d'une iframe tierce, et le module d'origine levait une erreur WAF.
  - Bannière cookies, widget Zenchef flottant, avis E-net, badges et pages utilitaires de l'agence → retirés (`dropped` dans le stamp).
  - Gate 8 levée sur le registre : séquence d'origine gardée dans une nouvelle composition (`redesign.md` § Build).
- **Test miroir** : un restaurant voisin servi par le même deal et le même draw aurait une photo de salle en Poster ; le diptyque des deux chefs ne vient que de ce site. Décision changée pour le passer : le hero garde les deux portraits plutôt que la photo du passe (19).

## Thème
Solstice, `dealt 1/3, seed restaurant-namur-bistronomy-seasonal-5457·3309c0dd·2026-10-31·r0` (journal partagé `$ROOT/.hallmark/log.json`, vide avant ce site).
- Pourquoi Solstice : crème et encre brune prolongent le blanc et le noir chaud du site d'origine, Yeseva One garde un serif de titre (Cormorant à l'origine), le vermillon remplace l'orange du gabarit sans devenir un second orange, et « photographs in low warm light » est exactement le reportage du restaurant (ampoules, hotte rouge, laiton).
- Pas Squeeze : vert saturé et sans géométrique Gabarito 800, une matière de juice bar qui contredit le serif et le calme du site d'origine.
- Pas Vellum : gothique Grenze et outremer, une voix de cave ancienne ; le dossier dit « décontracté », « Potes ».
- Marque : le logo PNG est gardé (nav, pied de page, favicon SVG) ; l'orange #f38935 est celui du gabarit E-net, pas une charte (`.hallmark/brand-spec.md`).

## Composants
| Composant | Décision | Référence |
| --- | --- | --- |
| Bouton | Primaire vermillon pilule, 48 px, `white-space: nowrap`, huit états (hover mélange 14 % d'encre, active translateY 1 px, focus ring encre 2 px, disabled 0,55 + not-allowed, aria-busy progress) ; transitions listées `background-color, transform` ; secondaire typographique souligné 2 px ; libellés = verbes (« Réserver une table », « Offrir un bon cadeau », « Envoyer le message ») ; `type="button|submit"` sur chaque `<button>` | `interaction-and-states.md` § The eight states, Solstice § Controls |
| Nav | Masthead d'une ligne, 76 px : deux liens à gauche, logo centré lié à l'accueil (`aria-label`), deux liens + « Réserver » à droite ; casse de phrase, non trackés ; page courante soulignée vermillon ; sous 60rem logo + Réserver + bouton « Menu » qui ouvre un Popover natif ; sticky `--z-sticky-nav`, `scroll-padding-top` = nav + 16 px ; lien d'évitement « Aller au contenu » | `layout.md` § 7, `microinteractions.md` § Menu, `patterns.md` § A way past the nav |
| La carte | Switcher « Le soir / Le midi » (`role="tablist"`, flèches gauche/droite, premier panneau visible et tous lisibles sans script) ; soir : titre, prix 67 € au corps display, six services en `<ol>` numéroté par `counter()`, suppléments en rangs à prix `tabular-nums` ; midi : deux formules en rangs (titre, phrase, prix à droite) ; filets du thème, aucune carte-tuile | `patterns.md` § A rail and a switcher, `layout.md` § 5.14 et 5.5 |
| Horaires | Schedule en `<dl>` : jour en Yeseva, créneaux à côté, « Fermé » en `--color-muted` jamais barré, jour courant soulevé (`--color-paper-3` + filet vermillon, `aria-current="date"`) ; dit une fois par page et à la fin | `layout.md` § 5.16, `anatomy.md` § book |
| Formulaire | Contact (le site n'a pas de formulaire de réservation : Zenchef est la réservation, gardé tel quel) : `data-endpoint=""`, `novalidate`, validation au blur puis à l'input, message « Rien n'a été envoyé : ce formulaire n'est pas encore relié » ; labels visibles, `name` d'origine (objet, civilite, nom, prenom, email, telephone, message), `autocomplete`, `type`/`inputmode`, `aria-describedby` + `aria-invalid`, aide `min-height: 1lh` ; bordure constante, anneau `outline` inset ; 48 px comme le bouton ; `<select>` natifs | `patterns.md` § A form that posts nowhere yet, `interaction-and-states.md` |
| Pied de page | Index columns (Menu principal, Nos services en ligne, Nous trouver) sous le logo ; adresse, téléphone, plan, Facebook ; ligne légale (DAMFRA SRL, TVA, RPM, photographies) sans « Tous droits réservés » ; aucune newsletter ; puis `<KywFooter />` | `layout.md` § 7 |
| Photo | `Photo.astro` : `<figure data-slot data-alt>`, `width`/`height`, `srcset` WebP 640/1140/1280/1600, `sizes`, `object-position` ; hero en `fetchpriority="high"` et `loading="eager"`, les autres lazy ; traitement Solstice (`base.css` : sepia 0,28) ; légendes = des faits (le lieu, le plat) | `patterns.md` § A photograph in a slot, `imagery.md` |
| Reveal / motion | Aucun reveal (Solstice : still) ; aucune boucle ; le seul script visible est l'onglet de la carte et le chargement à la demande de Zenchef | `craft.md` § 5, Solstice § Motion |

## Liste de sur-utilisation
**Floor**
- [x] 1. Couleurs et polices par tokens · preuve : `grep -c '#[0-9a-f]{3,6}|rgb(' src/styles/page.css` = 0 ; seules `var(--…)` hors `tokens.css`
- [x] 2. Jamais `transition: all`, rien sur width/height/top/left · preuve : `grep -c 'transition: all'` = 0 ; transitions listées page.css:42, :50, :63
- [x] 3. Aucun mot italique dans un titre · preuve : aucun `<em>`/`<i>` dans `src/` 
- [x] 4. `overflow-x: clip` sur html et body · preuve : page.css:28 et base.css:3 ; `100vw` = 0
- [x] 5. Pistes d'images en `minmax(0, 1fr)`, titres `overflow-wrap` · preuve : page.css:90 (diptyque), base.css (h1-h3 `overflow-wrap: break-word; min-width: 0`)
- [x] 6. `:focus-visible` instantané · preuve : sloplint render « 26a » absent ; page.css:44, :53, :64, :168, :177, :228 ; FAIL 15 corrigé (transition retirée des champs)
- [x] 7. Reduced motion + contenu sans script · preuve : base.css (reduced motion) ; `html:not(.js) .seg { display: none }` et panneaux visibles sans script
- [x] 8. Aucune métrique ni témoignage inventés · preuve : la note Google 4,8/212 (agrégateur, à confirmer) n'est pas affichée ; les avis E-net sont retirés ; seul l'avis Michelin réel est cité
- [x] 9. Aucun eyebrow, aucun label en capitales trackées · preuve : piliers en casse de phrase (reworded), têtes du pied de page en Archivo Narrow casse de phrase
- [x] 10. Aucune chaîne à points médians, flèche collée, point de statut · preuve : barre supérieure retirée ; mention légale réécrite sans « · » (contactez-nous.astro:84)
- [x] 11. Ni dégradé violet-bleu, ni carte dans carte, ni emoji, ni faux navigateur · preuve : sloplint 0 FAIL
- [x] 12. Titre, phrase et action visibles à 1280x800 · preuve : `.hallmark/shots/…-hero-1280x800.png`, « fold: pass »
- [x] 13. ~80 mots par écran · preuve : NOTE 58 seulement (89 à 144 mots : textes du client, mode redesign, consignés au rapport)
- [x] 14. Conteneur plafonné · preuve : `--container: 1440px`, `.container` centré ; capture 1920x1080
- [x] 15. Stamp en première ligne, critique, waivers · preuve : page.css:1-23
- [x] 16. `sloplint --render` : 0 FAIL, 0 REFLEX ouvert, pas de ligne « render tier not run » · preuve : `sweep3` : « 0 FAIL, 2 WARN (kept non comparé), 5 WAIVED, 4 DISMISSED, 4 NOTE »
- [x] 17. Hero en `dvh` · preuve : page.css `.hero { min-height: calc(100dvh - var(--nav-h)) }` ; `grep -c '[0-9]vh'` = 0
- [x] 18. Aucun blanc ou noir pur hors tokens · preuve : 0 littéral
- [x] 19. Un seul sticky, `--z-sticky-nav` · preuve : page.css:58
- [x] 20. Onglets en `<button role="tab">`, pas de radios absolues · preuve : le-menu-des-potes.astro
- [x] 21. Vidéo de fond : sans objet (aucune vidéo) ; LCP jamais lazy · preuve : Photo.astro `priorite`
- [x] 22. Aucun contenu caché au repos dépendant du script · preuve : aucun `data-reveal` ; bouton Zenchef `hidden` révélé par script, le lien reste sans script
- [x] 23. Inputs : bordure constante, ring outline, hauteur du bouton, disabled trois canaux · preuve : page.css:224-229
- [x] 24. Aucun tooltip, aucun contenu auto-rotatif · preuve : rail manuel, pas d'autoplay
- [x] 25. Contraste · preuve : sloplint render 40/41 absents ; texte sur vermillon en `--color-accent-ink`
- [x] 26. Aucune image cassée, aucune photo de bibliothèque à créditer · preuve : FAIL 76 (logo KYW absent en dev) corrigé par `public/kyw/` ; crédit « Photographies : Les Potes au Feu et Guide MICHELIN »
- [x] 27. Aucun libellé qui replie · preuve : 49b corrigé (pied de page `nowrap`, adresse non liée), `.btn` nowrap
- [x] 28. Copie sans mots de la liste 19, sans tiret, sans « Tous droits réservés » · preuve : `grep -rn '—\|–' src/` vide ; « Découvrez » reworded
- [x] 29. Aucun faux envoi · preuve : Base.astro (message « Rien n'a été envoyé »)
- [x] 30. SVG décoratifs `aria-hidden` · preuve : index.astro (triangle de lecture)

**Reflex**
- [x] 31. Display hors polices par défaut : Yeseva One · preuve : tokens.css
- [x] 32. Mesure 45-75ch, 3 familles, 3 graisses (400, 500, 600) · preuve : 25 dismissed pour la citation ; familles Yeseva, Archivo, Archivo Narrow
- [x] 33. Aucune carte-tell · preuve : piliers en rangs, aucune icône en tuile
- [x] 34. Hero : deux éléments au plus centrés, posture stampée Poster · preuve : stamp ligne 2
- [x] 35. Pas le gabarit IA, fingerprint comparé au journal · preuve : `waive 8` (séquence gardée) ; journal vide avant ce site (1 of 20)
- [x] 36. Rythme des coutures (filet barre, bande d'encre, espace, bande papier) ; écarts ≥ 120 px variés · preuve : gaps 144/264/330/307/186 ; `waive 59` pour la couture pied de page / crédit KYW
- [x] 37. Espacement par tokens · preuve : `--space-*` partout ; nudges : 3rem (numéros de service), 7rem/6.5rem (colonne des jours)
- [x] 38. Accent sous 5 %, posture restrained · preuve : vermillon sur primaires, focus, onglet courant
- [x] 39. Aucun halo ; « crème + serif + terracotta » assumé par Solstice (vermillon h24, pas d'argile) · preuve : tokens.css
- [x] 40. Aucun mot accentué dans un titre · preuve : « Comme des Potes » d'une seule couleur (38iii)
- [x] 41. Pas de mono, rien sous 12 px · preuve : `.small` 13 px Archivo Narrow
- [x] 42. Titres de section ≥ 40 px, aucune section mince, aucune bande morte · preuve : `--text-section` (56 px à 1440) ; 78/77/79 absents
- [x] 43. Gouttière 16 px au téléphone · preuve : base.css `--gutter: 16px` sous 40rem
- [x] 44. Ni illustration, ni image vide, ni compteur, photos ≤ tiers · preuve : 80-83 absents du sweep
- [x] 45. Aucun faux produit : Zenchef est le vrai module, chargé dans son cadre · preuve : reservation-en-ligne.astro
- [x] 46. Clôture = horaires, adresse, réservation · preuve : Cloture.astro
- [x] 47. Chrome nommé (masthead, index columns) · preuve : stamp ligne 2
- [x] 48. Hover sur le conteneur, aucun rebond, aucun toast · preuve : `.showcase__link:hover .showcase__cta` ; easings du scaffold
- [x] 49. `:active` et `:disabled` présents, contrôles 44-52 px · preuve : page.css:43-45, :176, :229
- [x] 50. Aucune bibliothèque d'icônes (un seul SVG inline) · preuve : index.astro
- [x] 51. Aucun texte de décoration (scroll cue retiré) · preuve : hero
- [x] 52. Aucun écho : prix une fois par page, horaires une fois par page · preuve : pages ; 0 slot vide
- [x] 53. Aucun cadre d'appareil ni matériau d'imitation · preuve : pages
- [x] 54. Aucun texte en dégradé, aucun swatch Tailwind · preuve : tokens OKLCH

**Finish**
- [x] 55. Guillemets « », apostrophes typographiques, vraie ellipse, `balance`/`pretty` · preuve : base.css h1-h3 `text-wrap: balance`, `p { text-wrap: pretty }` ; « … » dans index.astro
- [x] 56. Une recette de primaire, jamais deux remplis côte à côte · preuve : paires primaire + lien partout
- [x] 57. Chiffres tabulaires · preuve : `answered F6`
- [x] 58. Un conteneur, radius pilule limité aux contrôles, pas de chorégraphie · preuve : `--radius-card: 0`
- [x] 59. Aucun avatar factice, aucune Lottie · preuve : photos du client
- [x] 60. Soulignement 2 px / offset 0,3em sur les liens d'action · preuve : page.css:50
- [x] 61. L'outlier (Archivo Narrow) ne porte que boutons, légendes, petits textes ; aide `min-height: 1lh` · preuve : page.css:231
- [x] 62. Invariants de page · preuve : un primaire, `.container` unique, `--gap-columns`
- [x] 63. Surfaces navigateur thémées · preuve : `answered F16`
- [x] 64. Pas de sliver de texte à 1440 · preuve : F17 corrigé (citation passée en 7 colonnes) ; script `hallmarkSlots` présent (Base.astro)
- [x] 65. Pas d'orphelin, niveaux de titre continus (h1 → h2 → h3 → h4 sur la carte), pas de justifié · preuve : pages
- [x] 66. `lang="fr"`, `<title>` et meta description par page · preuve : Base.astro + props de chaque page
- [x] 67. Le téléphone reçoit tout · preuve : F25 absent ; captures 375 full

**Craft, imagery, responsive, brand, patterns**
- [x] 68. Type : Yeseva One + Archivo (+ Archivo Narrow outlier), display 1,0-1,12, corps 17 px à 1,55, `display=swap`, `font-synthesis: none` · preuve : `tokens.css` (`@font-face` woff2 auto-hébergés depuis la révision 1, préchargés dans Base.astro), base.css
- [x] 69. Couleur : OKLCH, papier/encre/neutres/accent + accent-ink + focus, posture déclarée · preuve : tokens.css, stamp
- [x] 70. Surfaces : axe à gauche, une ombre dure (`--shadow-card`), huit z, radius 0/pilule ; pas de texture (Solstice : « no texture ») · preuve : tokens.css
- [x] 71. Imagery : photos du client seules, hero LCP `fetchpriority="high"`, traitement du thème, texte jamais posé sur la photo sans puits opaque, légendes = faits · preuve : Photo.astro, base.css ; dark-mode non chargé (un seul mode à l'origine)
- [x] 72. Responsive : 60rem et 40rem, `@media (hover: none)`, horaires et formules restackés, `dvh`/`svh`, `width: 100%` ; brand-spec écrite (`.hallmark/brand-spec.md`) ; patterns pris pour leur forme · preuve : page.css:246-284


## Révision 1 (REVUE-1, 31/10/2026)
Décisions changées, et pourquoi (détail : `REVISION-1.md`) :
- **Menu** : la bannière perd sa photo (salage de la viande, toujours dans la galerie de `/les-potes-au-feu/`) ; la section carte suit à `--section-gap-s`. Raison : le menu à 67 € doit être dans le premier écran 1440×900 (C6). Seuls les 4 services sont numérotés ; mises en bouche et mignardise sont des lignes `horsService` sans numéro (C1).
- **Contact** : bannière courte (320 px, 2:1 en mobile), coordonnées et horaires à gauche et en premier dans le DOM, formulaire à droite ; une note en tête du formulaire dit dès l'ouverture qu'il n'est pas relié (C5). Objets : « Question », « Privatisation du samedi », « Autre ».
- **Réservation** : titre « Réserver avec Zenchef », cadre à la hauteur de son contenu ; le module reste chargé à la demande (gate 26a, voir Approche).
- **Accueil** : un filet crème de 4 px (`--space-2xs`) sépare les deux portraits du diptyque (C15) ; la vidéo est titrée « L'aftermovie « Alfonse » » et sa photo plafonnée à 1140 px, sa largeur d'origine (C4) ; la Statement porte une phrase vraie du dossier (les chefs servent et expliquent) (C8).
- **Rythme** : `.section + .section { padding-top: 0 }`, plus de double marge entre deux sections de papier (C10).
- **Polices** : auto-hébergées en woff2 latin (Yeseva One 400, Archivo 400-500 variable, Archivo Narrow 600), plus d'appel à Google Fonts (C13).
- **Tête de page** : canonical, Open Graph (image `og.jpg` = l'image de partage du client, 1200×630), JSON-LD `Restaurant` ; noindex conservé (C2). 404 propre sur le gabarit Banner (C3).
- Stamp : `waive 44c` ajouté (Banner sans photo sur le menu et la réservation).
