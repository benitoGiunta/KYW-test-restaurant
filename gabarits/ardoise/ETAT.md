# ETAT — gabarit « ardoise »

Reprise possible par un agent neuf : lire ce fichier puis DESIGN.md.

## Fait
- Étape 0 : cahier lu, références regardées (planche), socle copié (`gabarits/ardoise`, name = gabarit-ardoise), `pnpm install` fait.
- Polices : `public/fonts/cabinet-grotesk-800-normal.woff2`, `schibsted-grotesk-400/700-normal.woff2`.
- Photos : aperçus 4:5 `public/photos/apercu-*.webp` (560×700), `salle-banquette-960`, `salle-clients-bar-960`, `equipe-trio-800`.

## Reste à faire
- DESIGN.md, site.ts (carte longue = menu réel + lignes d'exemple marquées, 7 suggestions illustratives sans date, formules),
  tokens.css, base.css, Header/Loader/Footer, setup.ts, pages index / carte / salle / histoire / formules / reservation / 404.
- Build, shoot (port 4414, `.shots-ardoise/<page>`), audit, corrections mécaniques, apercu.png, FICHE.md, RAPPORT.md.

## Étape 1 (faite) : sources écrites et build OK
DESIGN.md, site.ts (type étendu : Categorie.service/exemple, suggestions, acces, cadeau, privatisation, Membre.rolePlaceholder),
tokens.css, base.css, Base.astro (font-face, preloadImage), Loader/Header (barre d'état + barre basse)/Footer,
composants Ardoise.astro et Lignes.astro, motion/setup.ts (etat, suggestion, onglets, lignesEcrites, apercu, prixEcrits,
motsGeants, aujourdhui, formulaire), pages index, carte, formules, salle, histoire, reservation, 404.
Build : `node scripts/build-site.mjs gabarits/ardoise` OK. Contrôle Playwright rapide (scratchpad) : 0 erreur console,
0 débordement 1440/390, 0 élément caché après défilement. Serveur 4414 lancé (PID dans le scratchpad serve.pid).
Reste : regard sur les captures rapides, shoot 7 pages + audit (`.shots-ardoise/<page>`), corrections, apercu.png, FICHE, RAPPORT.

## Étape 2 (en cours) : QA
Captures rapides lues ; corrections : nom plafonné à 9rem (2 lignes à 1440), nav mobile nowrap (Formules et La salle cachés
en mobile), aperçu qui se met à jour / se cache au défilement (écouteur `scroll` natif + onScroll), ligne du jour sur page
claire en fond jaune (plus de texte jaune sur clair). Rebuild fait. Shoot 7 pages + audit + apercu lancé en fond
(`.shots-ardoise/journal.txt` finit par DONE ; serveur 4414 PID 579 dans le scratchpad serve.pid). FICHE.md écrite.
Reste : lire les report.json et planches, corriger, RAPPORT.md, apercu.png, arrêter le serveur (kill 579).

## Étape 2b : passe 1 lue (index, carte, formules) : 0 failed, 0 erreur console, CLS 0, LCP mobile 1,1 / 1,2 / 2,3 s ; 1 violation axe
(`.ardoise__lien` craie sur fond clair) corrigée dans base.css ; l'aperçu restait visible pendant le défilement (pointeur
au centre) → réécrit : tout défilement cache l'aperçu, le pointermove sur une ligne le montre. Sources corrigées, rebuild
APRÈS la fin du shoot en cours (sinon dist/ vidé pendant les captures), puis passe 2 sur index et carte.

## Étape 3 (faite, 31/10) : passe 2 lue, finitions, livraison
Passe 2 (index2, carte2, reservation2) : 0 failed, 0 erreur, 0 axe, CLS 0, LCP mobile 1,2 / 1,2 / 1,3 s ; planches lues, rien
à corriger visuellement. Corrections : `.ex[hidden] { display: none }` (pastille « suggestion illustrative » visible les jours
fermés), e-mail illustratif retiré du Footer (FICHE.md mise à jour). Rebuild fait (`dist/gabarits/ardoise/` à jour),
`apercu.png` recapturé, serveurs 4414 arrêtés (PID 1617 puis 2374, `kill`), RAPPORT.md écrit. Rien ne reste côté constructeur :
relecture jury par un agent distinct.

## Révision 1 (faite, 31/10) : REVUE-1 traitée
F1-1 et F2-1 à F2-5 corrigés, F3-1 et F3-2 corrigés, F3-3 sans action. Détail et preuves : `REVISION-1.md`
(captures `.shots-ardoise-rev/`). Rebuild OK, `apercu.png` recapturé et recopié dans `dist/gabarits/ardoise/`,
serveur 4437 arrêté (`kill`). Non commité ; `pnpm index` à relancer à la publication.
