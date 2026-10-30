# ETAT — gabarit « encre »

Reprise possible par un agent neuf : lire ce fichier puis DESIGN.md.

## Étape 1 (faite) : socle copié (`gabarit-encre`), `pnpm install`, polices Shippori Mincho B1 (500, 700) et Spectral
(300, 400, italiques) dans `public/fonts/`, cahier lu, références regardées en planche.

## Étape 2 (faite) : DESIGN.md, site.ts étendu (rouleau, accès, sceau, emporter), tokens.css.

## Reste à faire
- base.css, Header/Loader/Footer,
  setup.ts (rouleau épinglé, allumage des titres verticaux, sceau), pages index / carte / histoire / reservation /
  emporter / 404.
- Build `node scripts/build-site.mjs gabarits/encre`, shoot port 4411 (`.shots-encre/<page>`), audit, corrections
  mécaniques, apercu.png, FICHE.md, RAPPORT.md.

## Étape 3 (faite) : Base.astro (polices, preloads), Header (difference, horloge), Loader, Footer (diptyque + sceau),
composants Rouleau / TitreV / Sceau / Plan / HeroPage, base.css complet, setup.ts (loader, rideau horizontal, hero,
vapeur, tracés, allumage, rouleau épinglé + libre, sceaux, horloge, date min), pages index / carte / histoire /
reservation / emporter / 404, photos de hero en 960 px, favicon. Reste : build, QA (port 4411), apercu, FICHE, RAPPORT.

## Étape 4 (en cours) : build OK ; pré-contrôle Playwright 6 pages × 2 viewports : 0 erreur console, 0 débordement,
0 élément caché, h1 vertical une colonne (max-height 78svh / 54svh). Serveur :4411 lancé (PID dans le scratchpad),
shoot en série dans `.shots-encre/<page>` + `audit-encre.txt` (journal `.shots-encre/journal.txt`, ligne DONE à la fin).
FICHE.md écrite. Reste : lire planches, corrections mécaniques, apercu.png, RAPPORT.md, arrêt du serveur par PID.

## Étape 5 (faite) : QA passée (0 FAIL, 0 violation axe après correction, 0 erreur console, 0 débordement), corrections
mécaniques appliquées et rebuild, serveur :4411 arrêté par PID, `apercu.png`, FICHE.md, RAPPORT.md écrits.
Gabarit TERMINÉ pour cet agent. Suite : revue par l'agent critique (jury) puis corrections par l'agent réviseur.
Captures dans `.shots-encre/` (planche-<page>.png, report.json par page, audit-encre.txt) ; le dernier build
(photos du rouleau à 46 svh) est postérieur aux captures : recapturer avant de citer un défaut.
