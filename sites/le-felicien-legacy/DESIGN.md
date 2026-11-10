**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et routes restent, système et composition changent.
- **Before** · `.hallmark/before.txt`, `before.json` (15 liens, 0 champ).
- **Keeps** · routes `/`, `/la-carte/`, `/suggestions-de-la-semaine/`, `/contact/`, réservation Tablebooker, vert de marque, texte de réouverture (reformulé), carte complète, horaires de cuisine.
- **Files** · `src/styles/{tokens,base,page}.css`, `src/data/{site.ts,carte.json}`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Fig}.astro`, `src/pages/*`.
- **Shape** · Letter (lettre de la maison) + Index (la carte), tirage c61636 : Conversational FAQ refusé car le site n'a pas de questions ; genre editorial.
- **Theme** · Solstice, dealt 1/3 (seed `restaurant-namur-classic-brasserie-d971·2ced0d12·2026-11-10·r0`) : papier crème, encre brune, Yeseva One, filets or. Écartés : Squeeze (tuiles arrondies et fruits, plutôt marché) ; Ink (catalogue froid, aucune chaleur de brasserie). Accent : le vermillon est remplacé par le vert du client (#2d5735, `oklch(41% 0.075 152)`).
- **Chrome** · nav : masthead (logo large au centre, deux liens à gauche, un lien et « Réserver une table » à droite) · pied : statement « Une brasserie pour tous. » (mot de la maison, PDF de la carte), adresse, téléphone, liens, crédits, puis KywFooter.
- **Hero** · Ledge (tirage) : photo de l'assiette en champ plein, titre « La grande tradition de la brasserie. » à la base sur voile brun, réserver + voir la carte.
- **Signature** · l'assiette sous le titre ; la bande « Entrée et plat, 25 € » au milieu de l'accueil.
- **Sections** · Hero (Ledge) · Split (lettre + illustration de carte) · Rows (six classiques et prix) · Band ink (statement du midi) · Split mirroré (événements, well) · Band paper (horaires Schedule + salle + réserver) · Footer.
- **Material** · réel : texte du client, carte (68 lignes), prix, horaires, équipe citée par le site et L'Avenir · images : 1 photo client (2020), 1 illustration, 1 photo libre Unsplash légendée · absent : avis, note Google, couverts, photos de salle et d'équipe.
- **Comp** · c1 (image-led) choisi ; voir `comp.md`.
- **Sweep** · phase 3.

## Approche

Macrostructure **Letter** pour l'accueil (le texte de réouverture est une lettre de la maison) et **Index** pour la carte ; empreinte `Heading serif display|Body prose étroite|Divider filets|Button pastille + lien|Image une photo par section|Reveal aucun (phase 2 : un)`. Posture calme, aucune chorégraphie de scroll. Dérogations : carrousel de deux logos supprimé (18), 5 paragraphes réduits à une lettre (58), vh en dvh (6a), réservation = lien Tablebooker (pas de faux envoi). Test miroir : un voisin n'aurait pas la combinaison Ledge photo + masthead logo + statement vert ; décision changée : accent vert de marque au lieu du vermillon.

## Thème

Solstice, tokens lus dans `src/styles/tokens.css` : papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, accent vert, or `oklch(74% 0.14 75)` pour les filets seulement, police d'affichage Yeseva One, texte Archivo, petits textes Archivo Narrow 600.

## Composants

- **Carte** : Rows (nom en 1re colonne, prix à droite, description en dessous), une section par groupe, liste de sauts en tête ; Switcher et filtres : phase 2. Jamais de tuiles ni de carte dans carte.
- **Horaires** : Schedule en tableau (`th scope`), jour courant par fond `paper-3` posé par script, dits une fois sur l'accueil (le pied les omet) ; fermeture sans objet (7 j/7).
- **Pied** : statement + colonnes adresse, téléphone, liens ; crédits en `data-credits`.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, légende = un fait (illustration, photo libre).
- Nav, boutons animés, reveal : phase 2.

## Sur-utilisation (phase 2)

- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `page.css:40` (transitions listées : couleurs, `transform`), `:71` (opacity, translate), `:105` (scale)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css` (anneau 2 px vert), `page.css:52` (or sur fonds sombres)
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : `page.css:233`, test Playwright `reducedMotion` (animation none, reveal opacité 1), `javaScriptEnabled: false` (7 sections de carte visibles, reveal opacité 1)
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css:91`, mesuré 375x812 (boutons à 788 px), 320x568 (544 px)
- [x] 19. Sticky non superposés (56) · preuve : en-tête `top: 0` à `--z-sticky-nav` (`:57`), liste d'onglets `top: var(--bar-h)` à `--z-sticky` (`:141`), `scroll-padding-top` ajusté
- [x] 20. Onglets gardés (53) · preuve : `la-carte.astro` (liens ancre sans script, rôles `tablist/tab/tabpanel` ajoutés par script, flèches, Home, Fin, hash)
- [x] 21. Vidéo de fond : sans objet (aucune vidéo)
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `page.css:221`, un seul `data-reveal` (bande du midi)
- [x] 23. États d'input (39a) : sans objet, aucun champ (la réservation est le lien Tablebooker du site d'origine, conservé)
- [x] 24. Tooltip et auto-rotation (17, 18) : aucun tooltip ni boucle
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire, réservation = `https://reservations.lefelicien.be/`
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun svg en ligne, logo `<img alt="">` dans un lien nommé
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `@media (hover: hover)` partout, lignes de carte sans hover (le thème les allume, la gate 11 l'interdit sur un non-interactif : gate retenue), aucune courbe à rebond
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `page.css:40` à `:47` (48 px, bascule `--line` 44 px), `:active` sur boutons, liens, onglets, liens du pied
- [x] 56. Un primaire rempli (F4) · preuve : « Réserver » de la nav est un bouton contour (`.btn--line`), le primaire plein est celui du contenu ; sur le héros, même pastille en couleurs inversées
- [x] 58. Une recette de conteneur, pilule limitée aux contrôles (F7) ; un pattern de scroll (F8) : aucun scroll lié
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:5, 8, 9`
- [x] 72. Responsive · preuve : nav en Popover sous 72rem (les 5 éléments ne tiennent pas avant 1152 px : mesuré), 60rem et 40rem, horaires restackés sous 40rem avec `data-label`, safe-area dans `--gutter` (`page.css:14`), `overflow-x: clip` html et body

**Motion** : calme. Signature : l'assiette se pose une fois (scale 1,04 à 1, 1,6 s, transform seulement). Un reveal (la bande du midi). Un onglet de carte change de panneau en `--dur-short`. Menu mobile : fondu et glissement de 8 px.
**Nav** : masthead (logo centré, deux liens à gauche, un lien et « Réserver une table » en contour à droite), 80 px au bureau, 64 px au téléphone (Menu à gauche, Réserver à droite), sticky.
**Hero review** : `self` (pas d'outil Agent), quatre captures lues, sloplint hero 0 FAIL, 0 WARN, 1 NOTE (58, 90 mots à 1440 sous le héros) : ship · 0 findings. Stamp : `hero-review: ship · 0 findings · 0 resolved (self)`.
**Reproduction de la comp (c1, vérifié à 1280x800)** : Masse : photo en champ plein, titre sur le tiers bas, voile brun, identique. Intervalle : titre, phrase, boutons à 24 px (16 px au téléphone), comme la comp. Entrée : le titre repose à gauche sur la base, la photo se pose en 1,6 s. Plus grand écart : la comp n'avait ni barre collante (80 px) ni lien « Voir la carte » : le héros est plus bas de 80 px et porte un second lien. Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
