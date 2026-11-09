# ETAT : ferme-blanche-d-asie awwwards, fin de la phase 2 (construction-2)

## Fait (phase 1)
- DESIGN.md, scaffold Astro 5, engine, contenu réel, 5 pages, polices, favicon, og.png (voir DESIGN.md).

## Fait (phase 2)
- Pilote `src/motion/plateau.ts` (`--rot` : repos 3 degrés/s + défilement par crans + pointeur + intro), porteurs `[data-rot]` visibles seulement.
- Intro par page (plateau, anneau, disque), `data-split="lines"` sur les h2, `data-reveal="clip"` sur les photos, `up` sur les avis.
- Transition : disque rouge depuis le point de clic + anneau d'or qui tourne d'un quart, 0,6 s par sens (`src/motion/setup.ts`).
- Hovers : CTA quart de tour (`conic-gradient` + `@property --a`), liens soulignés au repos avec trait d'accent, ronds remplis en un tour ; focus et `:active`.
- Menu mobile `<dialog>` (`src/motion/menu.ts`, classe `.panneau`), « Réserver » 44 px conservé.
- Débordement corrigé : le carré de l'anneau tourné élargissait la page (1489 px à 1440) : `overflow: clip` sur `.plateau` et `.orbite`.
- Mesures (serveur 4427, arrêté) : 0 erreur console ni requête échouée ; `scrollWidth` = largeur à 320, 360, 390, 1440 ; 0 texte caché après défilement et en réduit ; menu (focus, Échap, retour) OK.
- Build : `scripts/q.sh build pnpm build:site sites/ferme-blanche-d-asie-awwwards` passe.

## Reste (phase 3)
- Shoot complet (agent captures) : vérifier `idleMotion` true et `settledMs` non null (repos ramené à 3 degrés/s), `noHoverChange`, contraste axe, cibles.
- RAPPORT.md, checklist 35, 36, 45, `pnpm index`, leçons.
- Déjà notés en phase 1 : `enonce__photo` hors flottaison ; CTA du hero à 1024×768 sous la flottaison ; données douteuses (plat n° 2, fourchettes de prix).

## Décisions et pièges
- Ni loader, ni GL, ni curseur suiveur (écrit dans DESIGN.md).
- La propriété `rotate` (pas `transform`) porte `--rot` ; GSAP n'anime que l'opacité du `<text>` de l'anneau et le `scale` du disque.
- `.menu` existe déjà sur la carte (menus à prix fixe) : le dialog s'appelle `.panneau`.
