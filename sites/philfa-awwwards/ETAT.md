# ETAT : philfa-awwwards, construction-2 (phase 2 sur 3)

## Fait
- Phase 1 : voir DESIGN.md (concept « Phil | Fa », pages, données, build).
- Phase 2 : pilote `src/motion/couture.ts` (couture `--couture-x` au pointeur, fil `--point` au repos, pause hors écran, intro du hero, double choix à bascule), `src/motion/volet.ts` (menu plein écran du téléphone), `setup.ts` les appelle. Reveals `data-split`/`data-reveal`/`data-parallax` sur toutes les pages, titres intérieurs en `chars` + `data-intro`. Hovers réécrits sous `(hover: hover)` + `:focus-visible`, `:active`. Lien KYW avec retour au survol. Checklist 19 à 47 dans DESIGN.md.
- Vérifié par Playwright (port 4417, 1440 / 390 / réduit) : 0 erreur console, 0 requête échouée, `scrollWidth` = largeur sur 5 pages (carte 390 : strip du sommaire, voulu), aucun texte caché dans le cadre après l'intro, repos visible en 1,5 s, menu du téléphone conforme, navigation accueil vers carte OK, CTA du hero dans le cadre à 1440x900 (818) et 1280x720 (656).
- Build OK (`dist/philfa/awwwards/`), commit a962a81.

## Reste (phase 3)
- Shoot complet (agent captures), puis lire `report.json` : `hover.noHoverChange` (marque sur sa page, liens `aria-current`), `desktop.idleMotion`/`idleAt`/`settledMs` (intro ~2,2 s), `reduced.*`, contraste, cibles.
- Audit, jury (self), OG raffinée (Archivo), `RAPPORT.md`, points 42 à 63.
- Vérifier à l'œil : volet du téléphone (fond posé pour masquer un liseré entre les deux moitiés), pied (couture qui suit le pointeur), 404.

## Décisions et pièges
- Pas de loader, pas de GL, pas de curseur suiveur (natif seul).
- Intro du hero : état de départ en CSS sous `html.motion` (`--ouvre: 0`, mots cachés) ; `@property` donne 1 par défaut, donc repli réduit complet sans JS.
- Piège corrigé : `margin-block` négatif de l'enfant parallaxe dans `.bande__cadre { overflow: clip }` fusionnait avec la marge du parent et faisait remonter la photo de 86 px sur le hero (CTA coupé) : `display: flow-root`.
- Piège corrigé : `.choix` en `<button>` avec `color: inherit` prenait la crème de la section sur la moitié moutarde : couleur laissée aux classes `t-phil`/`t-fa`.
- Piège corrigé : « Réserver » en `--t-mega` débordait à 1440 en mouvement réduit (1452 px, mot non découpé) : `.titre-page h1` plafonné à `(100vw - 2 gutter) / 5.2`.
