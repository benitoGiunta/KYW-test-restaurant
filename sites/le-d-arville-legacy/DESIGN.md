**Hallmark · v2.0.0 · variante legacy KYW**
- **Redesign** : full, contenu et wiring gardés, système et composition neufs.
- **Before** : `.hallmark/before.txt` (283 FAIL, 102 REFLEX, 23 WARN sur le HTML Divi) ; `AUDIT.md`.
- **Keeps** : huit routes (accueil, carte, photos, séminaires, chambres, chèque cadeau, réservation, traiteur), lien de réservation Zenchef (page ledarville.be/reservation), `tel:`, `mailto:`, Facebook (deux pages), PDF des vins, hero plein écran, copie du client.
- **Files** : `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Fig,Horaires,Pied}.astro`, `src/data/site.ts`, `src/pages/*.astro`, `public/photos/*.webp`.
- **Shape** : Photographic (08), gardée. Empreinte : `Heading petit sur plaque|Body bandes photo et sections de papier|Divider bord de l’image|Button lien typographique et filet|Image plein cadre|Reveal aucun`.
- **Theme** : Atelier (deal 2/3, seed `restaurant-namur-gastronomic-seasonal-e85e·ef2833fe·2026-11-20·r0`). Écartés : Vellum (lettre gothique, étrangère à une ferme de briques), Hedgerow (vert sombre, exige des photos en basse lumière alors que celles du client sont claires, HDR 2018). Atelier : papier chaux, encre brune, Sentient léger, passe-partout sur carton ; la lumière des photos du client y tient.
- **Chrome** : barre de nav collante (nom, six pages, bouton Réserver) ; barre de réservation fixe sous 60 rem (Réserver, Appeler).
- **Hero** : Poster, photo du bâtiment et de l’étang, plaque de papier à la base (h1, une phrase, un bouton, un lien).
- **Signature** : le portrait du chef posé sur un passe-partout de carton avec son étiquette de mur.
- **Sections** : hero, déclaration (dropcap), menus et carte, bandeau terrasse, villa Barabas (index), horaires et réservation, pied en déclaration.
- **Material** : photos du client (22, WebP 800 et 1600 px) ; aucune photo de bibliothèque. Filtre du thème `warm con=-6 vib=-10` via `base.css`.
- **Comp** : 2 construits, sans clé, c1 retenu (`comp.md`).
- **Draw** : `73cd2c`. Pris : job book, barre de réservation, horaires et adresse en fin de page. Échangés : forme Catalogue contre Photographic (l’original est une table avec photos, pas un inventaire de variantes) ; hero Stage contre Poster (posture gardée).
- **Sweep** : phase 3.

## Approche (conservée)
Macrostructure 08 Photographic. Routes inchangées. Hero Poster. Calme : aucune animation en phase 1, un reveal au plus en phase 2. Dérogations : slider supprimé pour une photographie (18), `vh` remplacé par `dvh` (6a), widget Zenchef remplacé par un lien (la maquette ne branche aucun service). Test miroir : un voisin avec « restaurant gastronomique en ferme » prendrait le vert ou le noir et l’or ; ici le papier chaux et le passe-partout, changement nommé : Hedgerow écarté.

## Thème et tokens
Atelier, tokens dans `src/styles/tokens.css` : papier `oklch(94.5% 0.010 76)`, encre `oklch(19% 0.024 52)`, signal ardoise `oklch(41% 0.075 248)` (moins de 4 % de l’écran : soulignements, lettrine, focus), Sentient 300 (têtes) et 400 (h3, noms de plats, jours), Hanken Grotesk 400. L’orange du site d’origine est abandonné : Atelier interdit un accent chaud et le logo n’existe qu’en favicon.

## Composants
- **Carte** : Rows (nom col. 1 à 5 en Sentient 400, description 6 à 10, prix à droite en `tabular-nums`), filet d’encre en tête, filets fins entre lignes ; desserts sans prix : rien rendu. Menus en deux colonnes, prix au format display. Ni tuile ni carte dans carte. Nom et prix restent visibles à 375 (description sous le nom).
- **Horaires** : Schedule en `<dl>`, jour fermé en `--color-muted` sans barrage, pas d’icône horloge, dits une fois sur l’accueil (le pied n’en donne qu’une phrase sur les autres pages), congés 2027 sur la page réservation. Jour courant : phase 2.
- **Pied** : statement (une phrase en Sentient 300 puis quatre colonnes : adresse, contact, ouvert, suivre), `data-credits`, pas de « Tous droits réservés », puis `KywFooter`.
- **Photo** : `<figure>` avec `data-slot` et `data-alt`, `width`/`height`, `srcset` 800/1600, `object-position`, hero `fetchpriority="high"`, autres lazy, légende = un fait.
- **Index (villa Barabas)** : lignes à filets, numéro au crayon, titre Sentient 300, flèche ardoise.
- **Nav** (phase 2) : forme `edge-aligned bar` (nom à gauche, six pages, « Réserver »), 72 px ; sous 60rem 64 px, bouton Menu (`popovertarget`) et `<nav popover>` en feuille sous la barre (liens Sentient 300, 56 px, « Réserver une table » en bouton), `aria-expanded` tenu par `toggle`, fermeture au clic sur un lien, à Escape et au retour au bureau ; sous 40rem la barre de réservation fixe porte « Réserver ». Skip link, logo `aria-label`, `scroll-padding-top` = nav + 16 px. Sticky : la nav (`--z-sticky-nav`) et la barre du bas (`--z-sticky`) ne se superposent pas.
- **Boutons** : un seul recette (hairline ink, 3 px), jamais rempli ; états repos, hover (`@media (hover: hover)`), `:focus-visible` instantané, `:active` (1 px de chute), `:disabled` (tirets, trois canaux), courant ; `transition` listée (`background-color`, `color`, `transform`).
- **Reveal** : un seul (`[data-reveal]` sous `.js`, 12 px et opacité, 420 ms `--ease-out`, une fois), sur têtes de section, menus (décalage 80 ms), bandeau et passe-partout ; visible sans script, sous mouvement réduit et à l'impression. Caractère de motion : calme. Aucun mouvement au hero.
- **Signature** : le passe-partout est du carton de coton (fibre feTurbulence, cadre intérieur fin, bord éclairé, étiquette en caractères pressés) ; il se pose au mur au reveal (chute de 14 px et −0,6°).
- **Air WebGL d'Atelier** : coupé, décision phase 2 (`neither`) : papier fixe ; la copie ne soutient pas un fond animé et les photos du client portent déjà la lumière.
- **Jour courant** : script de 3 lignes, `aria-current="date"` sur la ligne du jour (fuseau Europe/Brussels), souligné ardoise et « aujourd'hui » ; aucune mention « ouvert maintenant » (heures inconnues).
- **Formulaire** : sans objet. L'original renvoyait vers Zenchef (lien « Réserver en ligne » conservé) : aucun faux envoi, aucun champ.

## Sur-utilisation
- [x] 1. Audit lancé avec `--before` · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Macrostructure nommée, empreinte écrite · preuve : DESIGN.md § Picks, Shape
- [x] 3. Deal 3 thèmes, choix sur l’image, écartés nommés · preuve : `.logs/legacy-deal.log`, DESIGN.md § Picks
- [x] 4. Draw et seed notés dans le stamp · preuve : `src/styles/page.css:1-3`
- [x] 5. Scaffold depuis le thème, tokens non réécrits · preuve : `src/styles/tokens.css`
- [x] 6. Deux comps, choix écrit · preuve : `comp.md`, `.hallmark/comps/c1.png`, `c2.png`
- [x] 7. Photos du client seulement, alt depuis `sujet` · preuve : `src/data/site.ts`, `public/photos/`
- [x] 8. Aucun tiret cadratin ni demi-cadratin · preuve : balayage Python de `src/` et `dist/` sans résultat
- [x] 9. Noindex et mention KYW sur chaque route · preuve : grep des 9 `index.html`/`404.html` (noindex, `Maquette KYW`, `kyw-signature` à 1)
- [x] 10. Aucun chiffre ou avis inventé · preuve : avis Tripadvisor et notes écartés (`dropped`), Gault&Millau non repris (15/20 contre 16/20)
- [ ] 11. Sloplint de rendu sur `src` · reste en phase 3 (balayage final)
- [x] 12. Animations, nav mobile, jour courant · `src/styles/page.css` § nav, reveal, jour courant ; `src/layouts/Base.astro` (script)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` sans résultat ; `page.css:19-20,47,201` (`opacity`, `transform`, couleurs)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:6`, `page.css:21` ; 12 tabulations mesurées en navigateur, `outline: solid 2px` partout (`--color-focus` 50 % sur papier 94 %, 3:1 tenu)
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `page.css:204`, `base.css:19` ; mesure Playwright : sans JS opacité 1 sur les 6 `[data-reveal]`, avec `reducedMotion` opacité 1 et `transform: none`
- [x] 17. Hero en `svh` (6a) · preuve : `page.css:73` (`min(100svh - var(--nav-h), 920px)`), plus aucun `vh`
- [x] 19. Sticky non superposés (56) · preuve : nav `top: 0` seule ; barre fixe en `bottom` sous 60rem ; `scroll-padding-top: 88px` mesuré
- [x] 20. Radios-onglets gardés (53) · sans objet : aucun switcher de carte (une page `carte/` à sections)
- [x] 21. Vidéo de fond conforme (28a, 28b) · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `page.css:201-203` ; `Base.astro` (observer, repli sans IntersectionObserver)
- [x] 23. États d'input (39a) · sans objet : aucun champ (réservation externe Zenchef, `Réserver en ligne` gardé)
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet : ni tooltip ni boucle
- [x] 29. Aucun faux envoi (70) · sans objet : aucun formulaire, donc aucune confirmation simulée
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : `Nav.astro` (icône Menu `aria-hidden`, bouton labellisé)
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css` boutons (fond), index (flèche glisse de 6 px et titre souligné, sur le lien entier), liens ; `--ease-out` seulement
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `page.css:19-22,30` ; mesure à 375 sur 8 routes : seul `kyw-footer__link` (24 px, paquet) sous 44 px
- [x] 56. Un primaire rempli (F4) · aucun bouton rempli (recette Atelier : hairline ink) ; « courant » seul remplit le bouton de la page active
- [x] 58. Une recette de conteneur (F7) ; un pattern de scroll (F8) · preuve : cartons (passe-partout) et filets seuls ; un reveal, pas de chorégraphie scroll (l'original était statique)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:3-5`
- [x] 72. Responsive (breakpoints rem, capacités, tables restackées, `svh`, safe-area) · preuve : 60rem et 40rem ; `(hover: hover)` et `(pointer: coarse)` ; `env(safe-area-inset-*)` nav et barre ; scrollWidth = largeur à 320, 375, 768, 1000, 1280 sur l'accueil et à 375 sur les 8 routes
- [x] hero review (self, pas d'outil sous-agent) : sloplint `--render --stage hero` : 44d (texte à 104 px du bord à 1920, plate recalée sur le conteneur) et 48 (deux oklch sortis en tokens) et F24 (ombre du popover retirée) résolus ; reste le faux positif 34 et la NOTE 58 (130 mots à 1440 px, section Maison, contenu fixe). Verdict self : `ship`. Stamp : `hero-review: self · ship · 3 findings · 3 resolved`
