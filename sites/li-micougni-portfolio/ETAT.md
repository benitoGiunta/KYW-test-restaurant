# ETAT — Li Micougni, portfolio (phase 1 sur 3)

## Fait
- Gabarit guinguette copié (hors `dist/`, `node_modules/`, REVUE/REVISION/RAPPORT/ETAT) ; matrice et décision dans DESIGN.md.
- `src/data/site.ts` réécrit : carte complète tirée de `donnees.json` (10 catégories), formules, histoire sourcée, 16 photos, 12 tirages, faits, terrasse, manifeste.
- Photos WebP (≤ 1800 px) dans `public/photos/` et carrés 640 dans `public/photos/s/` ; logo.png, favicon.svg, og.jpg.
- Pages : accueil, carte, histoire (La maison), terrasse, réservation, 404 ; « emporter » retirée ; en-tête, marquee, pied, Base (JSON-LD sans geo ni horaires fictifs).
- Jetons : corail → orange du logo `#d27635`, texte d'accent `#9a3f1e`. Objets `flamme`, `ardoise` ajoutés.
- Build OK : `pnpm build:site sites/li-micougni-portfolio` → `dist/li-micougni/portfolio/` (6 pages ; noindex, mention Maquette, kyw-signature présents ; aucun reste du gabarit).

## Reste (phases 2 et 3)
- Animations et QA navigateur non faites : tester hero (3 objets en mobile : positions `mx`), table (12 tirages en 1440×900, rail mobile), mot « Braise » à 320 px, horaires ouverts/fermés (`page.clock`), clics réels de l'en-tête, bas de page en fenêtre.
- Contrôler la grille 4 cartes « faits » et les `membre__sans` (4 colonnes) en mobile ; `grep` des srcset ; poids `dist` (5,9 Mo).
- Vérifier que `.avis__cartes` accepte des `<div>` (le gabarit utilisait `blockquote`) et le contraste des cartes.
- `pnpm index` et commit de `dist/` à la publication (non fait en phase 1).

## Décisions / hypothèses
- Gabarit guinguette (27/30) ; cahier écarté (fournisseurs inconnus), journee/maree/nocturne/velours inadaptés.
- Horaires illustratifs marqués ; slogan = mot d'accueil du site actuel (« même les demi-fous »), non fictif.
- Aucun nom de personne (administrateurs BCE non attribués à « deux passionnés »), aucun avis (Infobel/Nonoresto non lisibles).
- `gabarits/UTILISATION.md` NON mis à jour (consigne : ne jamais toucher à `gabarits/`) : à ajouter « guinguette : li-micougni ».
- Collision de scratchpad : `lm-photos.mjs` du scratchpad partagé a été écrasé par l'agent awwwards ; mes scripts sont préfixés `portfolio-`.
