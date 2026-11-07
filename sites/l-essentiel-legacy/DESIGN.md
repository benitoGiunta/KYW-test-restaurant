**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes + 404 (/, /les-chambres/, /carte-menus/, /reservation/, /contact/, /recrutement/)
- **Before** · Floor FAIL en masse (thème WordPress sans CSS au rendu), Reflex 24 ; photos de salle et carte complète à garder
- **Keeps** · liens externes (Facebook, Instagram, mentions légales, calendrier d’origine, « réserver une chambre » vers /contact-2/), `tel:`, `mailto:`, six routes, champs du formulaire de réservation (name1, email1, phone1, date_booking1, rangetime1, details1)
- **Files** · tout est neuf dans `sites/l-essentiel-legacy/` ; aucun autre dossier touché
- **Shape** · Bento Grid (draw 109d8c), routes d’origine gardées
- **Theme** · Vellum, dealt 1/3, seed restaurant-namur-creative-seasonal-5457·d708bb1b·2026-11-07·r0, colourway parchment. Écartés : Hedgerow (vert sombre, original clair), Carnival (jaune, display poster, ton faux)
- **Chrome** · nav : bandeau sur barre fine (téléphone, réseaux), action « Réserver » à droite ; pied : colonnes d’index sur fond encre
- **Hero** · Counter (comptoir de réservation sur la photo de salle)
- **Signature** · la salle aux tulipes et le comptoir en gothique, première chose vue
- **Sections** · Hero · Lieu (bento) · Distinctions (bande ultramarine) · Carte (Rows) · Chambres (Split) · Horaires (Schedule) · Réservation (Split) · Pied
- **Material** · real : photos client, carte, prix, horaires, Michelin, Gault&Millau · absent : avis, chef (à confirmer), baseline
- **Comp** · c1 choisi (voir comp.md)
- **Sweep** · phase 3

# DESIGN.md

## Approche
Macrostructure d’origine : multipage de restaurant, hero slider puis blocs courts. Gardé : six routes, ordre place, chambres, carte, réservation. Posture calme. Dérogations : slider supprimé pour une photo (18), `waive 8` (séquence gardée, composition neuve), formulaires avec `data-endpoint=""` (70), `vh` jamais utilisé (`dvh`). Test miroir : un voisin avec le même site n’aurait pas un comptoir gothique sur une photo de brique et de tulipes ; changé par rapport au tirage : comptoir chevauchant la photo.

## Thème
Vellum parchment : tokens dans `src/styles/tokens.css` (papier oklch 94 % 0,024 82, encre 23 %, accent ultramarine 43 % 0,17 268). Polices Grenze Gotisch 600 (h1, h2), Grenze 400 (chiffres des distinctions), Hanken Grotesk 400/500/600. Rayon 2 px, filets 1 px, double filet 4 px, pas d’ombre. Une bande ultramarine par page au plus.

## Composants
- **Carte** : Rows (titre col. 1 à 4, détail 5 à 10, prix tabulaire à droite) ; page carte : Switcher menus/carte (`role="tablist"`, deux panneaux visibles sans script). Plats de la carte en deux colonnes ruled.
- **Horaires** : Schedule `<dl>`, jours fermés en `--color-muted`, jamais barrés ; fermetures annuelles dites une fois, dans le pied.
- **Pied** : index columns (site, contact, horaires, fermetures), `data-credits`, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, hero `fetchpriority="high"`, les autres lazy, légendes factuelles ; photos de plats datées de 2018, dites.
- **Nav** : bandeau sur barre fine ; l’en-tête est `position: sticky; top: -37px`, la barre (téléphone, réseaux) sort au défilement, le bandeau reste à `--z-sticky-nav` ; « Réserver » en bouton outlined (un seul primaire rempli par page) ; liens 44 px, soulignement pigment au survol, encre pour la page courante ; sous 60rem, `<dialog>` modal plein écran (Fermer, Échap, clic sur le fond, retour du focus), sans script la liste reste visible sous le bandeau ; `scroll-padding-top` = bandeau + 16 px.
- **Bouton** : un primaire rempli (ultramarine), un outlined ; états : repos, survol (sous `hover: hover`), `:focus-visible`, `:active`, `:disabled` (pointillé, `--color-paper-3`), pas d’état chargement (rien n’est envoyé) ; transitions listées (couleurs et `transform` en `--dur-micro`).
- **Formulaires** : `data-endpoint=""`, `novalidate`, `Field.astro` (label au-dessus, format en placeholder, aide `min-height: 1lh`, `aria-describedby`, `aria-invalid`), validation au blur puis à l’input, message d’échec « Erreur : … », jours fermés (dimanche à mardi) refusés, aide des couverts (plus de six : menu uniquement) ; envoi valide : « Rien n’a été envoyé : ce formulaire n’est pas encore relié » et le téléphone, jamais « Réservé ».
- **Switcher** : `.seg` masqué sans script, les deux panneaux restent lisibles ; avec script, flèches, premier panneau visible. **Horaires** : le jour courant (fuseau de Namur) reçoit `aria-current="date"`, filet ultramarine et nom en pigment.
- **Motion (thème Vellum : still)** : aucun reveal, aucun parallaxe ; seul mouvement d’entrée : le comptoir se pose sur la photo (24 px, `--dur-long`, une fois, `transform` seul), fallback reduced motion sans animation ; fibre (bruit SVG) sur bandes paper-2, formulaire, comptoir et en-tête. `waive` du reveal : le thème est « still » (`vellum.md` § Motion) et l’original n’avait pas de reveal.

## Sur-utilisation
- [x] 1. Hallmark lu : SKILL.md, redesign.md, layout.md, anatomy § book, thème Vellum et image · preuve : cette session
- [x] 2. Audit et before enregistrés · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 3. deal / draw / scaffold / stamp · preuve : `src/styles/page.css:1-5`, log partagé
- [x] 4. Deux comps, un choix écrit · preuve : `comp.md`
- [x] 5. Entrée du journal `.hallmark/log.json` · preuve : voir ETAT.md (à compléter phase 3 par `theme.mjs log`)
- [ ] 6. sloplint --render complet : phase 3 (stage hero fait en phase 2 : 0 FAIL, 0 REFLEX, 0 WARN, 2 NOTE)
- [x] 2b. Pas de `transition: all` ni d’animation de géométrie (10a) · preuve : `grep "transition: all" src/styles` vide ; `page.css:19`, `:91`
- [x] 6b. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:6`, `page.css:185-186` (anneau inset sur les champs, papier sur fond ink et bande)
- [x] 7. Fallback reduced motion ; contenu visible sans script (27, 62) · preuve : `base.css` (bloc global) et `page.css:255` ; contrôle Playwright `reducedMotion: reduce` → animation-duration 1e-05s ; sans JS : panneaux `block,block`, nav visible
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css:89` (`min(700px, calc(100dvh - 200px))`), aucune unité `vh`
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky, `.top` (`page.css:34`), mesuré top = -37 px au défilement
- [x] 20. Radios-onglets gardés (53) · preuve : onglets ARIA et pas de radios CSS (`carte-menus.astro`)
- [x] 21. Vidéo de fond (28a, 28b) · n/a : aucune vidéo
- [~] 22. Reveal sous `.js` seulement (62) · n/a, `waive` : thème still, aucun reveal ; aucun contenu caché au repos
- [x] 23. États d’input (39a) · preuve : `page.css:176-196` (repos, survol, focus, invalide, désactivé par fond hachuré, pointillé et curseur)
- [x] 24. Tooltip et auto-rotation (17, 18) · n/a : ni tooltip ni rotation (slider d’origine remplacé par une photo)
- [x] 29. Aucun faux envoi (70) · preuve : `scripts/ui.ts` (message « Rien n’a été envoyé »), contrôle Playwright : statut valide = ce message
- [x] 30. SVG décoratifs `aria-hidden` (33) · n/a : le seul SVG est le bruit de fond en CSS
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : survol sous `(hover: hover)` uniquement, lignes et photos sans survol
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `page.css:19-24`, `.btn--nav` 44, champs 48
- [x] 56. Un primaire rempli (F4) · preuve : sloplint 0 WARN F4 (le « Réserver » de la nav est outlined, la page courante est soulignée, l’onglet choisi est en paper-3 souligné)
- [x] 58. Une recette de conteneur ; un pattern de scroll (F8) · preuve : filets simples/doubles, rayon 2 px ; aucun scroll piloté
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:3-5`
- [x] 72. Responsive (breakpoints rem 60/40, `hover`/`pointer: coarse`, tables restackées, `dvh`, safe-area) · preuve : aucun débordement à 375, 768, 1024 sur 6 pages (contrôle Playwright) ; tarifs de chambres lisibles à 375 ; `.menu__in` safe-area
- [x] 76. Hero review : `hero-review: self · ship · 3 findings · 3 resolved` (pas de sous-agent disponible : auto-notation marquée `self`). Findings : photo qui débordait la gouttière à 375 (résolu, `width: 100%`, `min-height: 0`), hero plus haut que le premier écran à 1440 x 900 (résolu, 941 → fin à 880 px), vide de 183 px sous le hero (résolu) · preuve : `.hallmark/shots/*hero*`
- [x] 77. Comp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)` · preuve : `comp.md`
