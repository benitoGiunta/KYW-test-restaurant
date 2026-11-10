**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /a-propos/, /lacarte/, /reservations/, /galerie/, /contact/) + 404
- **Before** · Floor 4 familles (26a, 34, 40, 58), Reflex 28, 21 FAIL au total (`AUDIT.md`) ; la barre latérale blanche, la salle en noir et blanc et le menu court restent
- **Keeps** · toutes les routes et leurs destinations, les liens `tel:`, `mailto:`, Facebook, Instagram, la carte (lien OpenStreetMap sur les coordonnées du dossier), les quatre champs du formulaire de contact (`nom`, `email`, `telephone`, `message`), la copie du client (hors gates 19, 54, 58, 63, 69), la pastille Gault&Millau en texte, les couleurs du logo
- **Files** · create : tout `sites/le-54-legacy/` · edit : aucun autre site ni `gabarits/` · delete : none
- **Shape** · Photographic (08, gardée) ; le draw `ca0a04` proposait Bento Grid : refusé, la matière est une photographie de salle et un menu court
- **Theme** · Atelier, dealt 1/3, seed `restaurant-namur-gastronomic-fine-7e6f·dc32d3f7·2026-11-10·r0`. Écartés : Spore (sombre, pas de place pour la plaque claire sur des photographies déjà noires) ; Vellum (blackletter, trop historique pour un restaurant de village). L'accent slate d'Atelier (`oklch(41% 0.075 248)`) coïncide avec le bleu du logo mesuré dans `photos/16-logo.png` (`rgb(48 80 112)` environ) : pas de `--brand`
- **Chrome** · nav : barre haute collante (nom, quatre liens, Réserver) ; la barre latérale de 300 px est abandonnée (draw : « banner over a retracting bar », refusé, la retraction demande du JS) · footer : mast (Le 54 en grand, quatre colonnes), puis KywFooter
- **Hero** · Poster (gardé ; le draw proposait Index) : la salle en noir et blanc plein cadre, une plaque de papier au pied à gauche avec le titre, une phrase et deux actions
- **Signature** · la salle en noir et blanc plein cadre avec la plaque de papier posée à son pied
- **Sections** · Hero (Poster) · Statement (une phrase du chef, un chapeau en lettrine) · Rows (le menu du moment) · Showcase (tartare, sans titre) · Schedule en bande (horaires et adresse) · Counter (réservation) · Footer (mast)
- **Material** · real : toute la copie du site, les prix 48 € et 65 €, les suppléments, les téléphones, l'e-mail, les coordonnées · pictures : 14 photographies du client · absent : avis Google, citations, nombre d'abonnés, baseline
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure d'origine : Photographic (08), empreinte `Heading|Body|Divider|Button|Image|Reveal` = `Small|Short|Image edge|Typographic link|Full-bleed|None`. Le site d'origine est une série de pages courtes sous un slider de photographies de salle plein écran. Posture : Poster, calme, un seul pattern de scroll au plus (aucun en phase 1 ; la phase 2 n'en ajoute qu'un).

Dérogations : slider automatique remplacé par une photographie fixe (gate 18) ; `vh` remplacé par `dvh` dans le hero (6a) ; formulaire sans envoi réel : `data-endpoint=""` et un message d'état « Maquette » (70) ; barre latérale remplacée par une barre haute (le menu mobile est un `popover` natif, sans script) ; séquence « hero, texte, menu, horaires » gardée avec composition neuve (`waive 8`). Photographie sous le hero : un showcase sur cinq sections.

Test miroir : un voisin avec « restaurant gastronomique, Namur, photographies de salle » obtiendrait Spore et un hero Index ; ici Atelier, un hero Poster, et une plaque de papier au pied de l'image sombre. Décision changée pour passer le test : le thème clair (Atelier) sur des photographies sombres plutôt que le thème sombre dealé.

## Tokens (depuis `src/styles/tokens.css`)

Papier calcaire `--color-paper oklch(94.5% 0.010 76)`, bandes `--color-paper-2` ; encre `oklch(19% 0.024 52)` ; accent slate `oklch(41% 0.075 248)` (le bleu du logo), jamais plus de 4 % d'un écran (soulignements, lettrine, focus). Sentient 300 pour les titres, Sentient 400 pour les noms de plats et les jours, Hanken Grotesk 400 pour le texte. Rayon : 0 pour les cartes, 3 px pour les boutons ; filets de 1 px, une règle d'encre de 1 px en tête des listes et du tableau. L'or du logo n'est pas un jeton (Atelier refuse un accent chaud) : il reste dans le logo, dans `public/logo.png`.

## Composants

- **Nav** : une ligne de 72 px, nom en Sentient 400 et « Dave » en petit, quatre liens, un bouton Réserver ; page courante soulignée en slate ; sous 52 rem, bouton Menu et `popover`. Réservation dans la nav et le hero (anatomy.md § book).
- **Hero** : Poster, `min-height: max(34rem, calc(100dvh - 72px))`, la photographie en `[data-slot]`, une plaque `--color-card` à 34 rem au pied.
- **Carte** : Rows, nom du plat en Sentient 400 sur les colonnes 1 à 6, ligne sur 7 à 12, supplément à droite en `tabular-nums` ; pas de Switcher midi/soir (la carte du client n'a qu'un menu du moment) ; filets, ni bordure ni ombre ; nom et prix lisibles à 375 px (les colonnes s'empilent sous 40 rem).
- **Horaires** : Schedule en `<table>` (jour, midi, soir), jour fermé en `--color-muted` jamais barré, jour courant marqué par un fond `--color-card` posé par un script de six lignes (`aria-current="date"`), dernières commandes sous le tableau, dits sur l'accueil et sur /reservations seulement.
- **Réservation** : comptoir, deux numéros `tel:` en boutons de 56 px et un lien vers le formulaire de /contact.
- **Pied** : mast (nom en 11 rem au plus), adresse, contact, ouverture résumée, réseaux, `data-credits`, jamais « Tous droits réservés » ni newsletter ; KywFooter dernier élément de chaque page.
- **Photo** : `<figure data-slot data-alt>` avec `width`, `height`, `srcset` 800 et 1600 px (WebP, `sharp`), `alt` du champ `sujet`, étiquette murale en petit sous l'image.

## Sur-utilisation

- [x] 1. Hallmark `SKILL.md`, `redesign.md` et `layout.md` § 5 à 7 lus · preuve : cette session, `AUDIT.md`, `comp.md`
- [x] 2. sloplint `--before` sur les cinq pages d'origine · preuve : `.hallmark/before.txt` (21 FAIL, 28 REFLEX)
- [x] 3. deal, draw, scaffold, stamp · preuve : `.hallmark/log.json` partagé, `src/styles/page.css:1`
- [x] 4. comp avant build, deux comps · preuve : `.hallmark/comps/c1.png`, `c2.png`, `comp.md`
- [x] 5. sloplint statique sur `src` : 0 FAIL, 0 REFLEX · preuve : `.logs/sloplint.log` (le tier de rendu est de la phase 3)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `page.css:20` (`.btn`), `page.css:26` (liens), `page.css:192` (champs, `transition: none`) ; contrôle Tab : anneau solide 2px sur chaque arrêt
- [x] 2. Pas de `transition: all` ni d’animation de géométrie (10a) · preuve : `grep` sur `src/styles` : aucun `transition: all` ; transitions listées (couleur, `transform`, `opacity`)
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `page.css:77` (reveal) et `base.css` (blanket) ; contrôle Playwright : 12 éléments `[data-reveal]`, 12 visibles sans script et sous `reduce`
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css` `.hero { min-height: max(34rem, calc(100dvh - 72px)) }`
- [x] 19. Sticky non superposés (56) · preuve : une seule barre sticky (`.nav`, `--z-sticky-nav`), `scroll-padding-top` 96 px dans `base.css`
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, aucun switcher (menu unique, voir Composants)
- [x] 21. Vidéo de fond (28a, 28b) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `page.css:75` ; `Base.astro` ajoute `.js` en inline puis un `IntersectionObserver` (repli : tout visible sans l’API, avant impression)
- [x] 23. États d’input (39a) · preuve : `page.css:190-198` : bordure constante, anneau en `outline` inset (-2px), disabled par couleur, fond et trait pointillé, `cursor: not-allowed`, aide `min-height: 1lh`
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : sans objet, ni tooltip ni boucle (slider d’origine supprimé en phase 1)
- [x] 29. Aucun faux envoi (70) · preuve : `contact.astro` `data-endpoint=""`, `novalidate`, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié » ; contrôle : champs invalides, focus au premier, puis message honnête
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun `<svg>` ; le seul décor texte (mast du pied) porte `aria-hidden` (`Footer.astro:7`)
- [x] 48. Hover : un signal, sur le conteneur, rien sur un non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css` `@media (hover: hover)` sur boutons, liens, nav, champs ; rangées de menu sans hover
- [x] 49. `:active`, `:disabled`, contrôles de 44 à 52 px (26b, 39b) · preuve : `page.css:21-22`, `.btn--big` à 52 px ; sloplint `--render` : plus de REFLEX 39b ; contrôle de hauteur sur 35 pages x largeurs : aucun bouton hors 44-60 px et aucun retour à la ligne
- [x] 56. Un primaire rempli (F4) · preuve : aucun bouton rempli (Atelier : « no colour-filled control ») ; hairline qui se remplit d’encre au survol seulement
- [x] 58. Une recette de conteneur, un pattern de scroll (F7, F8) · preuve : un seul reveal en CSS et IntersectionObserver ; aucune chorégraphie de scroll (l’original était statique)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:4-6`
- [x] 72. Responsive (breakpoints rem, capacités, tables restackées, `dvh`, safe-area) · preuve : 60rem et 40rem, `(hover: hover)` et `(pointer: coarse)`, horaires restackés sous 40rem (`data-l`), `.container` avec `env(safe-area-inset-*)` ; débordement mesuré : 0 écart sur 7 pages x 5 largeurs (320 à 1920)

## Phase 2

- **Motion** · caractère `calm` (Atelier : fondu, bandes qui se déroulent une fois). Un seul reveal (opacité et `translateY` 12 px, 420 ms, `--ease-out`, décalage 70 ms par rangée de menu) ; signature : la salle se pose (échelle 1,04 vers 1 en 1,6 s) pendant que la plaque de papier se révèle. Aucune chorégraphie de scroll, aucun WebGL (l’« air » d’Atelier n’est pas construit, papier uni).
- **Nav** · forme : edge-aligned bar, sticky (différente des trois derniers logs) ; menu mobile `<nav popover>` avec entrée par `@starting-style`, `aria-expanded` écrit par l’événement `toggle`.
- **Formulaire** · label visible, placeholder = format, `aria-describedby` et `aria-invalid`, validation au blur puis à l’input, focus au premier champ invalide, jamais « Envoyé ».
- **Hero review** · `hero-review: ship · 0 finding · self` (voir ETAT.md : pas de sous-agent disponible, auto-notation) ; `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
