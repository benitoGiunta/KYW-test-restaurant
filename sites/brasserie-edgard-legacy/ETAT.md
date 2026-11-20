# ETAT · Brasserie Edgard · variante legacy · construction-2 (2026-11-20)

## Fait (phase 1, voir DESIGN.md) 
Audit, deal/draw, tokens, 7 pages, données réelles, 29 photos du client, build.

## Fait en phase 2
- Hero : plaque en bande basse sur la chaussée (la façade et l'enseigne ne sont plus couvertes) ; sous 60 rem, photo puis plaque qui la chevauche de 64 px. `sloplint --render --stage hero` : plus de FAIL 48 ni WARN F24 (scrim en token `--color-scrim`, popover sans bordure en plus de l'ombre). Hero review en auto-notation `self` (pas d'outil Agent) : 3 findings (plaque contre l'enseigne, barre de nav mobile sur 2 lignes, façade cachée sous la plaque à 375), 3 résolus.
- Comp : trois questions de reproduction et plus grand écart écrits dans `comp.md` ; capture 1280x800 côte à côte lue.
- Nav : une ligne à 375 (grid-row 1), `aria-expanded` et libellé Ouvrir/Fermer suivis par script, Échap ferme (mesuré).
- Horaires : « aujourd'hui » passé sous le jour (il chevauchait les heures à 375).
- Formulaires : `min` de la date = jour de Bruxelles ; soumission vide mesurée (7 erreurs, focus sur le 1er champ, aucun faux envoi).
- Finitions : gaps de colonnes unifiés sur `--gap-columns` (F15), safe-area dans `.container`, `viewport-fit=cover`.
- Mesures Playwright (375 et 1440, 6 pages) : `scrollWidth` = `clientWidth` (preuve du 34), aucun contrôle sous 40 px hors « Réalisé par » (24 px, paquet footer), reveal visible en reduced motion et sans JS.
- Build passe ; noindex, mention KYW et `kyw-signature` vérifiés sur `/`, `/contact/`, `/menu-groupe/`. DESIGN.md : points 2, 6, 7, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72 cochés avec preuves.

## Reste (phase 3 et captures)
- `sloplint --render` en `--stage page`, contrastes mesurés (point 9), gates jugées, revue de fin, RAPPORT.md, `.hallmark/` committé en force si besoin.
- `pnpm index` non lancé (dist/index.html partagé) : à faire en fin de phase 3.
- Ligne `dropped` pour la « Carte réduite pour les groupes » à confirmer (voir phase 1).
- Agent « captures » : shoot complet à faire ; les captures `.hallmark/shots/p2-*` sont des essais de phase 1, à ignorer.

## Pièges
- `sloplint src` garde FAIL 34 sur `Base.astro` : faux positif, la règle est dans `base.css:2` (prouvé par `scrollWidth`).
- La barre sombre en bas des captures dev est la toolbar Astro, pas le site.
- Les dist/ des autres variantes sont modifiés dans l'arbre par d'autres sessions : ne committer que `sites/brasserie-edgard-legacy/` et `dist/brasserie-edgard/legacy/`.
