**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 3 pages (/, /carte/, /404)
- **Before** · Floor 5 règles en échec (7a, 10a, 19, 34, 48) · Reflex 24b, 26b · gabarit hero centré + huit cartes ; la carte complète avec prix reste
- **Keeps** · adresse, téléphone `tel:`, lien de commande yayami.be/shop/, liens de rayons, horaires, zone de livraison, paiement, logo, rouge #df0505, toute la carte (47 plats, 9 menus)
- **Files** · create: tout `sites/yayami-legacy/` · edit: aucun autre dossier
- **Shape** · Letter (one-page gardée, ajout de /carte/ pour la carte complète), tirage 76dd77
- **Theme** · Darkroom, deal 2/3 (seed restaurant-namur-japanese-sushi-488c·a4ce100c·2026-11-19·r0), colourway red ; écartés : Squeeze (vert forêt et fruits, étranger à l'ardoise), Spore (grain de café et rose, plus doux que le noir et rouge du client)
- **Chrome** · nav : barre, logo, trois liens, une action (échange du « search-led bar » : le site n'a pas de recherche utile) · footer : colonnes d'index (horaires, adresse, liens, paiement)
- **Hero** · Ledge : titre à gauche, nigiri à droite, bande « adresse, ouvert 7 jours sur 7 » dessous
- **Signature** · Menu Matsu à 19,90 € en chiffre fin de 6 rem
- **Sections** · Hero · Menus · Livraison (figures en édition) · Index des rayons · Pied
- **Material** · real : carte, prix, adresse, horaires, zone, paiement · pictures : photos du client (11 utilisées) · absent : avis, histoire, réseaux, e-mail, photos de salle
- **Comp** · 2 built, no key · c1 chosen
- **Sweep** · phase 3

# Design system

## Thème et tokens
Darkroom : fond noir chaud `--color-paper` oklch(12.5% 0.008 55), encre `--color-ink`, filets `--color-rule`. Rouge de marque lu dans le CSS du client (`--primary-color: #df0505`) : `--color-accent` oklch(56% 0.235 29) en aplat avec texte `--color-accent-ink` ; `--color-accent-text` oklch(70% 0.19 29) pour survol et texte (le rouge pur donne 4,0:1 sur le fond). Polices : Sofia Sans Extra Condensed 200/400 (titres, chiffres), Barlow 300/400 (texte). Rayon 0, pas d'ombre. Écart au thème : photos en couleur (le saumon est le sujet), `mix-blend-mode: lighten` sur les assiettes à fond noir pour qu'elles se posent sur le fond sans rectangle.

## Composants
- **Carte** : Rows (nom en colonne gauche, détail en `--color-muted`, prix à droite en `tabular-nums`), filets 1 px, jamais de tuile ni de carte dans carte ; page /carte/ : un rayon par section, photo à gauche puis à droite en alternance, saut d'ancre en tête ; accueil : index des sept rayons avec « dès » le prix minimum.
- **Horaires** : le site a le même horaire sept jours sur sept ; deux lignes (midi, soir) sous « Ouvert 7 jours sur 7 » dans le pied, `<time>`, dits une fois. Jour courant : phase 2.
- **Pied** : colonnes d'index sur fond `--color-paper-2` (marque et baseline, horaires, adresse et téléphone, liens, paiement), `data-credits`, puis `KywFooter`.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `sizes`, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende seulement quand c'est un fait.
- **Nav** : masthead (liens à gauche, logo au centre, « Commander » à droite, 73 px, sticky `--z-sticky-nav`). Sous 60rem : logo, « Commander » et « Menu » ; le menu est un `<dialog>` modal plein écran (premier lien en `autofocus`, Échap, bouton « Fermer », focus rendu au bouton). Sans script, les liens passent sur une seconde ligne. `aria-current` sur « La carte ». Skip link.
- **Bouton** : une recette de primaire rempli (rouge), contour pour le secondaire, 44 à 52 px, `white-space: nowrap`, huit états (hover sous `(hover: hover)`, `:active` en `translateY(1px)`, `:disabled` en tirets, focus global) ; transitions de couleur et de `transform` seulement.
- **Formulaire** : sans objet, Yayami n'a pas de réservation ; « Commander » et « Appeler » sont des liens conservés (shop yayami.be, `tel:`).
- **Switcher** : sans objet (index de rayons). Rail de rayons sur /carte/ : barre sticky sous la nav (`top: var(--nav-h)`), défilement horizontal au téléphone, rayon courant en `aria-current="location"` (IntersectionObserver).
- **Reveal et motion** : caractère « still » du thème. Un seul reveal : chaque photographie sort du fond une fois, en opacité sur `--dur-long` (`.js [data-reveal]`, visible sans script et sous reduced-motion, filet à 3 s). Rien d'autre ne bouge. Pas de boucle, pas de vidéo, pas de tooltip.
- **États** : ligne d'index au survol : le prix passe au rouge (signal unique, sur le conteneur, lien étiré) ; focus : anneau sur la ligne via `:has(a:focus-visible)`. Statut « Ouvert maintenant » / « Fermé, rouvre à … » et service en cours en `aria-current="time"` dans le pied (heure de Namur, horaires du site).
- **Photo du hero** : mise à l'échelle 1,3 (1,1 sous 60rem) dans son cadre noir pour que l'assiette porte l'écran (écart relevé à la comparaison avec la comp).

## Sur-utilisation
- [x] 1. Hallmark audit et `sloplint --before` lancés · preuve : AUDIT.md, .hallmark/before.txt
- [x] 2. Macrostructure et posture gardées, dérogations écrites · preuve : en-tête de src/styles/page.css, § Picks
- [x] 3. deal, draw, scaffold, stamp, log · preuve : .logs/deal.log, draw.log, scaffold.log, src/styles/page.css:1
- [x] 4. Deux comps, une choisie · preuve : comp.md, .hallmark/comps/c1 et c2
- [x] 5. Aucun tiret cadratin, insécables, prix « 18 € » · preuve : grep sur dist/yayami/legacy (0 occurrence)
- [x] 6. Noindex, KywFooter sur chaque page · preuve : grep dist (index, carte, 404 : kyw-signature 1, noindex 1, mention 1)
- [ ] 7. sloplint --render sur toutes les routes · phase 3
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : page.css (transitions de couleur, opacity, transform seulement ; `.menu` opacity, overlay, display)
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : base.css:7, test Tab (9 arrêts, outline solid 2px), ligne d'index par `:has` (page.css, .row--idx)
- [x] 7. Reduced motion sur chaque animation, contenu visible sans script · preuve : page.css (fin), base.css:23 ; test Playwright : 0 figure masquée sous reduced-motion et sans JS
- [x] 17. Hero sans `vh` · preuve : aucune unité `vh` (hero en hauteur de contenu), menu en `100dvh`
- [x] 19. Sticky non superposés · preuve : nav top 0 (z 300), rail top `--nav-h` = 73 px (z 200), photo Matsu top calc(nav + 24) ; mesure : nav bottom 73, rail top 73
- [x] 20. Radios-onglets : sans objet, aucun switcher
- [x] 21. Vidéo de fond : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement · preuve : page.css `.js [data-reveal]`
- [x] 23. États d'input : sans objet, aucun champ
- [x] 24. Tooltip et auto-rotation : sans objet
- [x] 29. Aucun faux envoi : aucun formulaire ; liens conservés
- [x] 30. SVG décoratifs : aucun `<svg>` dans le DOM (le grain est en `background` CSS)
- [x] 48. Hover : un signal, conteneur, pas de rebond · preuve : page.css (.row--idx:hover .row__p, `@media (hover: hover)`) ; aucun toast
- [x] 49. `:active`, `:disabled`, cibles 44 à 52 px · preuve : page.css (.btn) ; test mobile : seuls le skip link caché et le lien du pied KYW (paquet) sous 44 px
- [x] 56. Un primaire rempli : rouge, jamais deux côte à côte (nav « Commander » à droite du logo, hero en tête de colonne)
- [x] 58. Une recette de conteneur (filets, aucune tuile) ; un seul pattern de scroll : aucun
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : base.css:3-5, page.css (::selection color)
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, safe-area dans `.container`, scrollWidth = largeur à 1440, 1280, 390 et 320
