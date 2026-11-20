# ETAT : Le Brunchist, variante awwwards, phases 1 à 3 faites (QA)

## Fait
- Phase 1 : DESIGN.md (brief, concepts, Concept Card, système), scaffold Astro, engine verbatim sans GL, contenu `src/data/site.ts`, 5 pages, pied KYW, noindex, JSON-LD.
- Phase 2 (construction-2) :
  - Pilote `src/motion/cadran.ts` : heure du service (9 h 30 à 15 h 30) tirée du scroll vers l'heure de l'en-tête, la règle des heures (fil jaune), le disque du hero ; sol des bandes qui s'étale en cercle (`--etale`, classe `etale`/`is-plein`) ; lettres gommées du mot-valise ; barres de la semaine. Repos : trotteuse (perle griotte) au rythme réel des secondes. 404 épinglée à 15 h 31 (`data-heure-fixe`).
  - Transition de page (setup.ts) : café en cercle depuis le clic, jaune au centre. Pas de loader.
  - Menu mobile `<dialog>` (Header.astro, menu.ts), testé (aria-expanded, focus, Échap, fermeture au clic).
  - Reveals `data-split`/`data-reveal`, intro par page, hovers sous `(hover: hover)` + `:focus-visible` + `:active`, `::selection`, lien KYW souligné au survol, favicon PNG 32 et apple-touch 180.
  - Pied du site passé de `<footer>` à `<section aria-label="Informations pratiques">` (le composant KYW porte le seul `<footer>`).
  - Hero recomposé : tailles plafonnées en `svh` (CTA visibles à 1280×720), disque en grand sous la méta au téléphone ; `.hero { overflow: clip }` (le disque grossi au scroll débordait de 6 px).
  - Build OK. DESIGN.md § Sur-utilisation : points 19 à 47 cochés avec preuve (sauf 35, 36, 41, 45 : phase 3).

## Reste (phase 3)
- Shoot et audit complets (agent captures), lecture de `report.json` : `idleMotion` (perle de 1,6 rem, ~21 px de déplacement en 1,5 s), `settledMs`, contraste, `hover.*`, cibles.
- OG `public/og.png` absent (balise og:image pointe dessus) ; RAPPORT.md ; checklist 42 à 63.
- Vérifier à l'œil les heures `data-split="lines"` contenant des insécables (« 9 h 30 ») sur la carte et l'index.

## Décisions et pièges
- Sol de la bande café (pied) exclu de l'étalement : texte clair sur sol vert pendant le cercle = contraste insuffisant.
- `startIdle()` n'existe pas dans cet engine : repos démarré par `intro.call` à 1,45 s.
- Serveur de test : `serve.mjs dist --port 4421`, lancé en tâche de fond par l'agent, arrêté en fin de phase.

## Phase 3 (QA) : faite
- Corrections : contraste `.gomme` et note du pied, cibles tactiles, survols logo et liens, `og.png`. Build final OK, audit 0 FAIL, axe 0 violation (accueil et 404.html), 0 erreur console.
- Détails et limites dans RAPPORT.md. À faire par le superviseur : critique jury indépendant (pas d'outil Agent), checklist DESIGN.md 42 à 63, `pnpm index` fait, commit sans `[publier]`.
