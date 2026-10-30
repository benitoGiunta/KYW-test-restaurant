# ETAT — gabarit « comptoir »

Reprise possible par un agent neuf : lire ce fichier puis DESIGN.md.

## Fait
- Dossier copié du socle, `name` = gabarit-comptoir, node_modules présents.
- Assets préparés (par une passe précédente) : `public/fonts/` (Hanken Grotesk 200-400 variable, Sentient 400 italique et
  normal), `public/photos/composant-*.webp` (5 médaillons détourés en rond du boeuf confit), `assiette-*.webp`,
  `chef-*-nb.webp` (portraits N&B).
- Étape 1 (en cours) : cahier lu, 3 captures de référence regardées, ETAT.md + DESIGN.md écrits.

## Reste à faire
- site.ts étendu (dressage, distinctions, drapeaux par donnée), tokens.css, base.css, Header/Loader/Footer, setup.ts,
  pages index / carte / menu / histoire / reservation / 404.
- Build, shoot (port 4407, `.shots-comptoir/<page>`), audit, corrections mécaniques, apercu.png, FICHE.md, RAPPORT.md.

## Étape 2 (faite) : sources écrites
site.ts, tokens.css, base.css, Base.astro (font-face + preload), Header/Loader/Footer, motion/setup.ts, pages index, menu,
carte, histoire, reservation, 404. Reste : build, QA.

## Étape 3 (faite) : build + QA passe 1 (6 pages, port 4407, `.shots-comptoir/<page>`) et corrections mécaniques
Voir RAPPORT.md. Passe 2 (index2, histoire2, carte2 + audit + apercu) lancée en arrière-plan ; FICHE.md, RAPPORT.md écrits,
leçon ajoutée à agents/lecons.md. Reste : lire les rapports de la passe 2, copier apercu/desktop-haut.png → apercu.png,
supprimer apercu/, arrêter le serveur (PID dans .shots-comptoir/serve.pid, jamais pkill -f).

## Étape 4 (faite) : passe 2 lue, débordement histoire corrigé (`.angle { position: relative }`), apercu.png posé,
serveur 4407 arrêté par son PID. Gabarit livré ; reste pour les agents suivants : jury / revue, LCP mobile chefs (2,65 s).

## Révision 1 (30/10/2026, agent reviseur-site) : REVUE-1 traitée
Corrections dans `src/data/site.ts`, pages, Header/Footer/Base, `base.css` (bloc « Révision 1 »). Build OK
(`node scripts/build-site.mjs gabarits/comptoir`), captures `.shots-comptoir-rev/<page>` (port 4428), détail dans
`REVISION-1.md`. Reste pour les agents suivants : revue passe 2 (relecteur) puis adaptation client.
