# ETAT : le-lodge-wepion · variante awwwards · construction-3 (phase 3 sur 3, terminée)

## Fait (phase 1)
- Concept « Deux rives », Concept Card, système : `DESIGN.md`. Scaffold Astro (engine verbatim, sans GL ni loader), 5 pages statiques, contenu réel (`site.ts`, `carte.ts`, `photos.ts`).

## Fait (phase 2, 20/11/2026)
- Signature « le passage » : `src/components/Berge.astro` (onde SVG ambre, 20 périodes sur 200 %) à l'accueil et à la 404 (verticale au bureau, horizontale au téléphone) et sous l'en-tête des pages intérieures. Pilote `src/motion/berge.ts` : progression du héros = le jour d'Erpent traverse (`--bx`, `.rives__crue`), pointeur ±6 px, repos = l'onde coule (`src/motion/idle.ts`, recette motion.md). Tout sur `gsap.ticker`, pause hors écran, rien en mouvement réduit.
- Intro : h1 et h2 du héros en lignes, trait qui se dessine, photo du héros peinte au premier rendu (data-reveal retiré, échelle 1,08 vers 1). Reveals par lignes sur les h2 de section et le mot du pied ; repères de la carte en `up` ; colonne d'Erpent du tableau en clip depuis la droite.
- Rideau : panneau jour puis nuit à bord ambre, de droite à gauche (0,87 s / 0,9 s).
- Survols (3 traitements, verbe « traverser ») sous `(hover: hover)` + `:focus-visible` + `:active` ; nav courante épaissie au survol ; marque, téléphone du pied, lien KYW dotés d'un retour.
- Finitions : `.split-line` à marge d'accent, insécable « 15 septembre 2026 », favicon PNG 32 px et `apple-touch-icon` 180 px (depuis `favicon.svg`), « Appeler » de l'en-tête à 44 px.
- Mesures Playwright (serveur 4412, arrêté) : `scrollWidth` = viewport sur les 5 pages à 1440 et 390 ; aucun texte caché dans la flottaison après 2,5 s ; aucune erreur console ni requête échouée ; repos : captures différentes à 1,5 s (1440 et 390) ; `--bx` = -4 px (pointeur), -169 px après 450 px de défilement ; transition accueil vers carte OK ; menu 390 : focus piégé, Échap, retour du focus ; réduit : pas de `.motion`, pas de Lenis, 0 caché, rien ne bouge.
- Build OK (`scripts/q.sh build pnpm build:site sites/le-lodge-wepion-awwwards`). Checklist 19 à 47 dans `DESIGN.md`.

## Reste (phase 3)
- Shoot complet (agent captures) puis lecture de `report.json` : `hover.noHoverChange` (35), `idleMotion`/`settledMs` (36 : l'onde coule en continu, vérifier que `settledMs` n'est pas null ; sinon ralentir la vitesse `1.1` dans `berge.ts`), `reduced` (39), contraste axe (45), LCP du héros.
- Image OG (`public/og.png` absente : composer par script Playwright, sans interface), `RAPPORT.md`, sloplint, `pnpm index`, commit final avec `[publier]`.

## Décisions
- Ni loader ni GL ni suiveur de curseur. Pas d'aperçu de plat au curseur (trois photos de plats, aucune liée à une ligne de la carte).
- Le passage ne joue qu'au bureau (au téléphone les rives sont empilées : seule l'onde coule).
- Numéro du relais 0496 92 55 13 à confirmer ; aucun horaire du relais ; JSON-LD sans horaires.

## Pièges
- `.photo img` en `position: absolute` : chaque `.photo` doit avoir une hauteur.
- Le trait de la berge est positionné à 7/12 de `.rives`/`.perdu` (grille 7fr/5fr sans gouttière) : changer la grille du héros oblige à changer `.berge--v { left }` et `.rives__crue { width }`.
- `--bx` s'écrit sur `[data-rives]` (porteur), jamais sur `<html>`.

## Fait (phase 3, 20/11/2026)
- QA-build.md absent : captures propres des 4 pages (.shots/), audit 0 FAIL / 1 WARN faux positif. Corrections : axe (passage), og.png, titre accueil, crédit photos répété. Vérifié : axe 0, audit, accueil. Build OK. Voir RAPPORT.md.
## Reste
- Score jury indépendant (pas d'outil Agent), placeholders client.
