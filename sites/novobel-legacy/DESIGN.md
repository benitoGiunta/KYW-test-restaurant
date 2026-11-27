**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full ; Before : data/restaurants/novobel/site-actuel/ (Wix) ; Keeps : routes /, /services, /projects, /jobs, /blog, `tel:`, `mailto:`, Facebook, textes des services et des projets.
- Files : src/styles/{tokens,base,page}.css, src/data/site.ts, src/layouts/Base.astro, src/components/*, src/pages/*.
- Shape : Feature Stack (draw a6c482, macrostructure d'origine assimilée à 08 multipage Wix : hero poster, services, projets, devis).
- Theme : Atelier (dealt 3/3). Écartés : Vellum (gothique, trop cérémonieux pour un chantier), Squeeze (vert forêt, tuiles rondes, ton fruits). Atelier gagne : limewash, brun d'ombre, signal ardoise, intérieurs en lumière du jour.
- Chrome : nav slab (barre papier, marque à gauche, devis à droite) ; Hero : Poster ; Signature : carte de coton posée sur la photo, filet encre sous chaque tête.
- Sections : à propos, métiers (Rows), photo pleine largeur sans tête, projets (Index), livraison (photo + texte), devis. Échanges avec le draw : « horaires et adresse en section propre » et « carte en Switcher midi/soir » sans objet (pas de carte, pas d'horaires) ; fin sur devis puis mast.
- Material : photographs du site d'origine (stock probable) ; Comp : voir comp.md ; Sweep : phase 3.

## Approche
Même macrostructure (hero poster, services, projets, appel), mêmes routes, posture calme, aucune chorégraphie de scroll. Dérogations : filtre Wix et chat Wix abandonnés ; gabarit hero + cartes recomposé (waive 8). Test miroir : un voisin « rénovation à Namur » aurait un hero sombre jaune ; ici papier clair, carte de coton, filets : changé.

## Thème
Atelier, `tokens.css` (papier oklch 94,5 %, encre brune, accent ardoise). La marque d'origine (anthracite, jaune acide) n'est pas reprise : le jaune acide ne tient pas le contraste sur papier ; l'anthracite devient l'encre (mast sombre).

## Composants
- Hero : Poster, photo en haut de page (`fetchpriority="high"`), carte papier 40 rem.
- Métiers et projets : Rows (numéro, titre, texte, nombre de logements à droite en `tabular-nums`), jamais de tuiles.
- Offres : tableau Timetable sous filet encre, lien mailto par ligne.
- Horaires : sans objet (aucune donnée) ; slot `.fill` dans le mast.
- Pied : mast (nom, phrase, adresse, tél., e-mail, Facebook, navigation, crédit photos) puis KywFooter.
- Photo : `<figure data-slot data-alt>`, `width`/`height`, lazy sauf le hero.
- Nav mobile : `<details>` statique (phase 2 : popover, état courant, focus).

## Sur-utilisation
- [x] 1. Hallmark SKILL.md lu (Floor 16 points) · preuve : src/styles/page.css:1-5
- [x] 2. deal/draw/scaffold via .hallmark/log.json · preuve : .logs/nvb-deal.log, nvb-draw.log, nvb-scaf.log
- [x] 3. Données réelles seulement · preuve : src/data/site.ts (textes du site d'origine, 28 = 4+14+6+4 lus dans les descriptions)
- [x] 4. noindex + mention KYW sur les 6 pages · preuve : grep dist/novobel/legacy (6/6)
- [ ] 5. sloplint --render, audit --before, comps c1/c2 : non faits en phase 1, reportés (raison : budget de réponses)
