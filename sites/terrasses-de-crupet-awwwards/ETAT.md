# ETAT : relecteur-site, passe 2 (awwwards)
Fait : REVUE-2.md écrite (verdict A_CORRIGER : F0 0, F1 0, F2 1, F3 8). 5 corrections sur 6 vérifiées par axe/Range/captures à 5 largeurs (25 contextes, 0 écart) ; F2-4 (vignettes carte) reporté et toujours présent.
Reste : retirer Desserts, Bières, Boissons chaudes de photoCategorie (src/data/site.ts:43-53) puis build ; F3 facultatifs. Piège : QA-revue2.md est un échec partiel (crawl bloqué), ne pas s en servir ; serveur de la passe arrêté (PID 3201).

# ETAT : relecteur-site, passe 1 (awwwards)
Fait : REVUE-1.md écrite (verdict A_CORRIGER : F0 0, F1 2, F2 4, F3 8). Mesures propres : axe complet 5 pages x 2 largeurs, liens, texte confronté au dossier, 43 prix de carte, menu mobile, reduced-motion, Tab. Serveur 4780 arrêté.
Reste : réviseur traite F1-1, F1-2, F2-1 à F2-4 (puis F3), build, passe 2 de revue. Piège : le QA ne couvre que 3 pages sur 5 et sa 404 est la réponse brute de serve.mjs.
Leçon proposée : data/usage/test-1/lecons-proposees/terrasses-de-crupet.md.

# ETAT : Les Terrasses de Crupet, awwwards, fin de la phase 3 (QA)
Phase 3 faite : corrections axe, cibles, descriptions, répétition, OG ; build OK, audit 0 FAIL / 1 WARN justifié. RAPPORT.md écrit. Reste : jury indépendant (/jury), validation client des hypothèses.

# ETAT : Les Terrasses de Crupet, awwwards, fin de la phase 2 (construction-2)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan de composition) et checklist 1 à 18 dans `DESIGN.md`. Concept retenu : « Les miroirs ronds » (verbe ouvrir).
- Scaffold Astro 5 : engine verbatim (sans lignes GL), `tokens.css`, `engine.css`, `base.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex, skip link, curtain, cursor, KywFooter).
- Contenu : `src/data/site.ts` (coordonnées réelles, horaires, carte convertie de `donnees.json` en `carte.json` avec prix numériques), `photos.ts` (22 photos du client, alt décrits, crédit).
- Pages : `/`, `/carte/`, `/a-propos/` (« Le lieu »), `/reservation/`, `404`. Build OK (`scripts/q.sh tdc-build pnpm build:site sites/terrasses-de-crupet-awwwards`), `dist/terrasses-de-crupet/awwwards/` écrit, 404.html présent.
- Mesures Playwright du hero et des `.display` (4 tailles × 4 pages) : gutter respecté, aucun débordement horizontal en mouvement réduit.
- Polices Young Serif + DM Sans, favicon SVG, og.png provisoire.

## Fait en phase 2
- Pilote `src/motion/miroirs.ts` (ouverture de chaque hublot `data-iris` : scrub au défilement, intro sur hero et 404 ; reflet contre le pointeur ; éclat de lampe en repos sur le grand miroir), `idle.ts`, `passage.ts` (transition iris depuis le point du clic puis trou rond au centre), `menu.ts` (menu plein écran mobile accessible), `setup.ts`.
- `data-reveal="scale"` remplacé par `data-iris` ; `data-intro` ajouté aux h1 des pages intérieures et de la 404 ; `data-reveal` retiré du bloc de CTA du hero (liens).
- Hovers : sous `(hover: hover)`, même état en `:focus-visible`, `:active` ; correction du remplissage des `.btn` (croissant visible au repos, coins non remplis au survol) ; liens texte et du pied soulignés au repos ; hover du lien KYW.
- En-tête mobile (≤ 720 px) : « Réserver » + « Menu » (le bouton Menu était visible au bureau : `.btn` gagnait sur `.menu-btn`, corrigé par `.nav .menu-btn`).
- Favicon PNG 32 et apple-touch-icon 180. Checklist 19 à 47 dans DESIGN.md.
- Build OK (`scripts/q.sh tdc-p2-build pnpm build:site sites/terrasses-de-crupet-awwwards`). Test Playwright (`.logs/tdc-p2-test.log`) : 0 erreur console, iris à 72 % après défilement, menu (aria-expanded, piège, Échap, retour du focus), navigation via menu, `scrollWidth` 1440/390, réduit sans contenu caché ni Lenis.

## Reste (phase 3)
- Shoot complet (agent captures) puis lecture de `report.json` : `idleMotion`/`idleAt` (éclat), `settledMs` non nul, `hover.noHoverChange`, `reduced.*`, `skipLinkFirst` (faux négatif connu « Aller au contenu »), contraste, cibles.
- OG composée (`og.mjs` ou HTML de scratchpad), RAPPORT.md, `pnpm index`, commit de `dist/` final.
- Contrôler en QA : hauteur du bandeau collant de la carte au téléphone, contraste du bouton `btn` sur fond `stone`, éclat assez visible sur la photo claire (sinon augmenter l'opacité, pas la taille).

## Décisions et pièges
- Pas de loader, pas de WebGL (justifié dans la Concept Card). Pas d'aperçu au curseur sur la carte, pas de `data-cursor` ni `data-magnetic` (décisions écrites dans DESIGN.md § Phase 2).
- Adresse de Crupet retenue ; e-mail du site client (`resto@…`), pas celui de `restaurants.json`.
- Aucune histoire, équipe, avis, GPS inventés : page « Le lieu » factuelle ; parking et accès renvoient au téléphone (formulation à valider : le dossier dit « inconnu »).
- Les mesures sous mouvement actif lisent des positions transitoires (scale du reveal) : mesurer avec `reducedMotion: 'reduce'`.
- Rien commité dans `dist/index.html` (pas de `pnpm index` en phase 1). Pas de `[publier]` dans les commits.
