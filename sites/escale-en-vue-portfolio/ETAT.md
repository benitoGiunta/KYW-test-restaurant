# ETAT — escale-en-vue · portfolio · construction phase 3/3 (QA terminée)

## Fait
- Gabarit guinguette copié, contenu remplacé (`src/data/site.ts`), 6 pages : accueil, carte, histoire (La maison), terrasse, reservation, 404.
- Photos : 8 WebP (plein cadre + carrés `s/`), logo, OG, favicon. DESIGN.md écrit. Build OK (`scripts/q.sh … build-site.mjs`), dist/escale-en-vue/portfolio/.
- Contrôles par grep : aucune trace du contenu de la référence, pas de tiret cadratin, noindex et mention Maquette présents, pas de `photos/s/s`, tous les WebP référencés existent.

## Fait en phase 2 (sondes Playwright ciblées, aucun shoot complet)
- Console propre en 1440, 390 et reduced motion : « GSAP target not found » corrigé (`data-split="words"` sur le manifeste, clé invalide dans le gabarit).
- Table (signature) : scène `clamp(46rem, 125svh, 70rem)`, 2e rangée de tirages à y 62-67 % pour dégager le titre ; objets repositionnés ; glisser souris (248, 304 px) et flèches (+19 px) vérifiés ; rail mobile n'apparaît plus en bureau (`.table__rail.rail`).
- Hero : objets saisissables vérifiés (dépôt hors texte conservé ; dépôt sur une ligne de texte ou un bouton = retour à la place, test par `Range.getClientRects`).
- Reduced motion : tout visible, aucune animation en cours, grille de tirages avec gouttière, pas de rail doublon, scrollWidth = 1440.
- Mobile 320/360/390 : plus de débordement horizontal sur les 6 pages (objets des pages intérieures calés à droite, `html { overflow-x: clip }`) ; 768 sondé aussi avant correctif.
- Clic réel au centre des 5 liens de l'en-tête sur 5 pages : tous des `<a>`, navigation OK ; bas de page 1440 : mention Maquette KYW et pied KYW visibles.
- Loader parasol et marquee « saison terminée » vus ; carte de note (paille, corail 3,2:1 en grand corps) acceptée.

## Reste (phase 3 et captures)
- Shoot/audit complet par l'agent captures (axe, LCP, clavier, hover) ; je n'ai pas relancé de shoot.
- Marquee en mode « ouvert » non testé (aucune date de saison, hors périmètre) ; pas de test d'horloge.
- Pages carte, histoire, terrasse, reservation, 404 : seulement clic + débordement, pas de relecture visuelle fine.
- 2e passe visuelle de la table à 1024×768 et 1280×720 (scène 125svh) ; OG sans texte ; photos 08, 09, 11 non utilisées.
- Gabarit `guinguette` protégé : défauts `data-split="lines,words"` et `.table__rail`/`.rail` à reporter (voir data/usage/test-1/lecons-proposees/escale-en-vue.md).

## Décisions et hypothèses
- Adresse affichée « Dave (Namur) », 5100 ; e-mail `info@escale-en-vue.be` (site actuel) et non olivier@… ; GPS = centre de la carte du site (à confirmer).
- Samedi 11:30 à 21:30 sans coupure. Saison 2026 présentée comme terminée (20/11/2026) ; pas de date 2027 inventée.
- Plats du plat du jour (parmigiana, tagliatelles, poulet) = posts Facebook 2026, sans prix ; carte d'exemple marquée `*` / `placeholder: true` (12 plats fictifs).
- Placeholders : carte d'exemple (tous les plats et prix), parking gratuit (« à confirmer »), géolocalisation. Notes tierces : relevé non vérifié, source affichée.
- `gabarits/` non touché : `gabarits/UTILISATION.md` doit recevoir « guinguette | escale-en-vue » (à faire par l'orchestrateur). `pnpm-lock.yaml` modifié par `pnpm install` (nouveau paquet du workspace), non commité ici.

## Phase 3 (QA)
- Fait : lecture QA-build.md, capture ciblée de la vraie 404 (axe 0), rebuild OK, RAPPORT.md écrit. Aucune correction de code requise (faux positifs).
- Reste : points ouverts de RAPPORT.md ; `gabarits/UTILISATION.md` et `pnpm-lock.yaml` à traiter par l'orchestrateur.
