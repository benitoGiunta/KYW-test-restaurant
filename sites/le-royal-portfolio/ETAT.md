# ETAT, le-royal, portfolio, phase 3 (QA) terminée

- Fait : QA ciblée 7 pages x 1440/390/360/320, 3 corrections (404 mobile, en-tête et horaires sous 380 px), build final OK, RAPPORT.md écrit, leçon ajoutée.
- Reste : `gabarits/UTILISATION.md` (ligne `ardoise | le-royal`, protégé), LCP/loader non mesurés, `pnpm index`, push.
- Piège : n'ajouter au commit que `sites/le-royal-portfolio/` et `dist/le-royal/portfolio/`.

---

# ETAT, le-royal, portfolio, phase 2 (motion, signature, états) terminée

## Phase 2 : fait
- Signature : trait de craie jaune sous le nom (SVG `pathLength`, se trace après le loader, visible d'emblée sans JS / reduced motion) ; petit trait de craie sous chaque titre de catégorie, tracé quand la liste s'écrit ; filet jaune qui se trace au survol / focus d'une ligne.
- Marquee d'état : le défilement de 50 % laissait un trou à droite (texte de 894 px, fenêtre 1440) : `etat()` clone le texte pour que chaque moitié couvre la fenêtre (4 copies à 1440, mesuré à 4 instants) ; pause au survol / focus ; reste statique en reduced motion.
- Onglets TABLE | BAR : les listes du panneau masqué n'étaient jamais écrites (`once` consommé pendant `hidden`) : triggers sans `once`, `ecrirePanneau()` écrit à l'ouverture de l'onglet ce qui est déjà à l'écran ; vérifié (4 listes BAR `est-ecrit` après défilement).
- Mots géants mobile : « BRASSERIE » dépassait (436 > 390) : `font-size: 16vw` sous 768 px, dérives réduites (0/40, 0/-30, 15/0) ; mesuré 311 ≤ 320 et 374 ≤ 390 sur tout le défilement.
- Galerie terrasse (7 figures) sans trou : 1 grande (2×2), 4 à côté, 2 bandeaux ; mobile 1 bandeau, 2×2, 2 bandeaux (aire des figures = aire de la grille moins les gouttières, 1440 et 390).
- Formulaire : états `:user-invalid` (brique + liseré), survol, zone `role=status` « Zenchef s'ouvre dans un nouvel onglet… » ; tableau d'horaires : en-têtes MIDI / SOIR alignés sur les colonnes, mention « · aujourd'hui » (repère sans couleur).
- États tactiles `:active` (barre basse, boutons, flèches, lignes), `tap-highlight` neutre ; barre basse déplacée après le pied dans le DOM (`Barre.astro`) : l'ordre de tabulation suit la lecture (vérifié : saut > en-tête > contenu > barre) ; `.footer, .kyw-footer` en `z-index: var(--z-content)`.
- Contrôles (scripts du scratchpad `lr-p2-*.mjs`, totaux seulement) : 0 erreur console, 0 `scrollWidth` > fenêtre à 1440 / 390 / 360 / 320 sur 6 pages, 0 contenu resté `visibility: hidden` après défilement, clics réels des liens d'en-tête OK sur 6 pages (elementFromPoint = le lien), reduced motion : 0 élément caché, 0 ligne clippée, marquee statique, trait de craie tracé, bas d'accueil (1440) : mention Maquette KYW + logo KYW visibles, états mobiles de la suggestion (157 à 185 px, pas de débordement).
- sloplint (atmospheric, lancé depuis le dossier du site avec le script de `.claude/skills/hallmark/scripts/`) : 24 FAIL / 18 WARN, quasi tous hérités du gabarit (stamp Hallmark, `.petite-cap` uppercase tracké, littéraux `rgb()` du gabarit, `transition: width` du trait d'onglet) ; ceux ajoutés par la phase 2 (48 sur `--c-voile`, 39a `:disabled`) sont corrigés.

## Phase 2 : reste pour la phase 3 (captures puis revue)
- Shoot / audit complets (agent « captures »), LCP et loader (non mesurés ici), planche mobile des 6 pages.
- Non fait : `RAPPORT.md`, ligne `ardoise | le-royal` dans `gabarits/UTILISATION.md` (protégé : à ajouter à la main), `pnpm index`, push. `dist/le-royal/portfolio/` est reconstruit (build OK).
- Piège : un agent legacy travaille en parallèle (`dist/le-royal/legacy/` modifié) : n'ajouter au commit que `sites/le-royal-portfolio/` et `dist/le-royal/portfolio/`.

---

# ETAT, le-royal, portfolio, phase 1 (construction)

## Fait
- Gabarit Ardoise copié dans `sites/le-royal-portfolio/` (sans ETAT/RAPPORT/REVUE du gabarit), `pnpm install` et `pnpm build:site` OK (7 pages : /, /carte/, /formules/, /terrasse/, /histoire/, /reservation/, 404) ; `dist/le-royal/portfolio/` écrit.
- `src/data/site.ts` + `src/data/carte.json` (carte PDF d'août 2026 par script, 63 lignes, prix en « 18,90 € »), horaires 12h-14h30 / 18h-22h x 7, adresse, tél., e-mail, Zenchef, réseaux, menus fêtes patronales, note Google.
- Contrôle statique du dist : noindex, « Maquette KYW », un seul `kyw-signature`, un h1, aucun tiret cadratin, aucune trace des Potes au Feu sur les 7 pages.
- DESIGN.md (matrice, sections, art direction, adéquation 82 %). Photos WebP, OG, favicon.

## Reste (phases 2 et 3)
- Phase 2 : animations / motion à vérifier avec le contenu réel (suggestion « à l'ardoise » : le texte est plus long que dans le gabarit, vérifier la hauteur de la ligne ; onglets TABLE | BAR ; prix géants ; mots géants TERRASSE / THÉÂTRE / BRASSERIE à 390 px), loader (nom « Le Royal Namur » en trois mots, vérifier le débordement mobile).
- QA navigateur : shoot, audit, clics réels de l'en-tête, bas de page, `scrollWidth` 320/360/390, galerie terrasse (7 figures, `nth-child(3n)` en rangée double : vérifier les trous en 4 colonnes), aperçus au survol, LCP.
- Mesurer : `.mots` à 13 vw, `.ardoise__nom` avec « Le Royal / Namur », barre d'état statique longue.
- RAPPORT.md (placeholders, shoot/audit), UTILISATION.md (gabarits/ protégé : ligne `ardoise | le-royal` à ajouter à la main), sloplint.
- Index : `pnpm index`, commit, push.

## Décisions et hypothèses
- Onglets MIDI | SOIR remplacés par TABLE | BAR : la carte est identique midi et soir. `setup.ts` ouvre sur TABLE.
- Aucun placeholder `true` dans les données : tout vient de donnees.json. Marques visibles : « conditions à confirmer » (moules à 20 €, mardi et jeudi, d'après la photo de l'ardoise) ; la ligne « à l'ardoise » des autres jours est une spécialité de la carte (« à la carte tous les jours »), pas une suggestion quotidienne.
- Avis : l'extrait daté du 29/05/2026 (1,5/5) n'est pas repris ; note Google 4,0 / 577 (Rankeat) affichée. TripAdvisor écarté (fiche de l'ancienne adresse).
- Adresse : n° 13 (une source donne le n° 2, non retenue). Ouverture « 11h à 23h » de la carte signalée dans l'accès, cuisine 12h-14h30 / 18h-22h dans les horaires.
- Bon cadeau, privatisation, équipe, histoire : retirés (inconnus). Pas de desserts dans le PDF : aucune catégorie desserts.
- Aperçus 4:5 seulement sur 5 lignes (Moules marinières, Chouffe, Apéritif maison, Portion mixte, Le verre) : une photo non appariée n'est pas attribuée à un plat. Moins que les 8 recommandés par le gabarit ; l'aperçu vit moins.
- `gabarits/` non touché (protégé). Défaut à reporter dans le gabarit : `Categorie.service` et onglets midi / soir supposent deux cartes distinctes ; `telHref` ne convertit pas les numéros belges.
