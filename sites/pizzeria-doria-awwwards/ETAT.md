# ETAT pizzeria-doria-awwwards, phases 1 et 2 (construction-1, construction-2)

## Fait
- DESIGN.md : brief, 3 concepts notés (choix A « Casiers »), Concept Card, système (palette, typo, grille, mouvement planifié, composition), points 1 à 18 de la checklist.
- Site Astro complet en statique : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404. Build OK (`scripts/q.sh build pnpm build:site sites/pizzeria-doria-awwwards` -> `dist/pizzeria-doria/awwwards/`).
- Contenu réel : `src/data/site.ts` + `carte.json` (181 lignes de donnees.json, 12 casiers), heures, coordonnées, suggestions de novembre 2026, midis d'école, équipe (prénoms seuls).
- Engine copié de le-royal-awwwards (`src/engine/*`, `engine.css`, `url.ts`, `Photo.astro`), sans GL ni loader. Transition de base à deux volets (`motion/setup.ts`).
- Polices Barlow Condensed 700, Barlow 400 et 600 ; favicon, apple-touch-icon, OG (`public/og.png`, capture du hero).
- Mesures : aucun débordement horizontal (1440, 1280, 1024, 390), `.display` à gauche = gouttière, 0 image vide, 0 requête échouée hors 404 volontaire.

## Fait en phase 2 (construction-2, 19/11/2026)
- Pilote `src/motion/casiers.ts` : variable `--tire-js` par façade (rangées du mur, tiroirs de la carte), nourrie par la vitesse Lenis, la proximité du pointeur et `startIdle()` (un tiroir après l'autre s'entrouvre après 2,6 s sans geste) ; `gsap.ticker` seul ; entrée des rangées par `ScrollTrigger.batch` (opacité seule, restent focalisables).
- Signature : le tiroir coulisse (hauteur du fond + plats en stagger 20 ms), fermeture animée ; ouverture du tiroir ciblé par ancre (chargement, `hashchange`, plaques d'index). Réduit : `<details>` natif.
- Hovers en 3 rôles dans le verbe (`site.css`, bloc « Phase 2 ») : CTA à plein qui glisse, façades/plaques qui se tirent (`@property --tire-h`), liens soulignés qui s'épaississent ; `(hover: hover)`, `:focus-visible`, `:active`.
- Menu téléphone `<dialog>` plein écran (`Header.astro`, `motion/menu.ts`) sous 48 rem ; « Réserver » reste dans l'en-tête.
- État « Ouvert / Fermé en ce moment, prochain service … » (Europe/Brussels) sur l'accueil et la réservation, ligne du jour marquée.
- Reveals : h1 `data-split="lines" data-intro`, h2 `data-split="lines"`, photos secondaires `data-reveal="clip"` (jamais la première photo d'une page).
- Contrôles (`.logs/doria-p2-check.log`) : 0 erreur console ni requête échouée, `scrollWidth` 390 sur 5 pages, menu (aria-expanded, focus piégé, Échap, retour du focus, fermé à la navigation), réduit sans texte caché. Build OK.

## Reste (phase 3)
- QA navigateur complète (shoot, audit, axe, clavier, reduced motion), RAPPORT.md, points 35, 36, 45, 47 par `report.json`, points 42 à 63.
- LCP : le h1 de l'accueil est caché jusqu'au découpage SplitText (`data-intro`) ; si le LCP mobile dépasse la cible, retirer `data-split` du h1 et garder l'intro sur l'accroche.
- `idleMotion` : vérifier que le shoot voit le repos (rangée qui glisse de 0,9 rem + poignée) ; sinon raccourcir `IDLE_DELAI` (2,6 s) dans `casiers.ts`.
- Téléphone : « Réserver » de l'en-tête + « Réserver une table » du hero au premier écran, à juger en QA (doublon assumé : l'en-tête est sticky).
- Hero 1440×900 (colonne droite) et index du mur (01 à 05 puis 10) : à juger en QA (phase 1).

## Décisions
- Hero = le lieu (salle des coffres), pas une pizza : le client n'a pas de photo de pizza.
- `<details>` natif pour les tiroirs : carte lisible sans JS, mais fermée sauf les pizzas ; l'impression et le SEO voient le contenu.
- Le logo (blanc sur transparent) est posé sur une plaque noire dans l'en-tête.
- Lien pizzy.be étiqueté « Commander à emporter », jamais « réserver ».
- Aucun loader, aucun GL (justifiés dans la Concept Card).
- Pièges : un `widths={480, 800}` sans crochets compile en JS mais casse le rendu ; `scripts/planche.py` doit passer par q.sh.
- Phase 2 : pas de follower de curseur, pas d'épinglage, pas de loader (une carte se lit) ; `.etat` placé par `.heures > .etat` (dans `.resa__infos`, une colonne explicite créerait des pistes implicites).

## Phase 3 (construction-3, 19/11/2026)
- QA relue sur preuves, 404 re-mesurée sur la vraie page (QA-build avait mesuré la 404 générique de serve.mjs) : rien à corriger. Build final OK (dist inchangé). RAPPORT.md écrit.
- Reste : score jury indépendant (`/jury`), captures de /reservation/, lecture noHoverChange/colorOnly/idleMotion dans report.json, accessoire à retirer, photos et données client.

Révision 1 : F1-1 et F2-1 à F2-4 corrigés, rebuild OK (voir REVISION-1.md).

## Revue 2 (relecteur-site, 20/11/2026)
REVUE-2.md écrit : A_CORRIGER (0 F0, 0 F1, 2 F2, 7 F3). F1-1 et F2-1 à F2-4 vérifiés corrigés. Reste : F2-1bis (règle des jours fériés déduite), F2-2bis (crédit en légende de photo client), F3. LCP/CLS et horloges non remesurés.
