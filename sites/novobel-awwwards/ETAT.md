# ETAT · novobel-awwwards · construction-2 (phase 2 sur 3)

## Fait (phase 1)
- Brief, concept « La cote », système, scaffold Astro, engine verbatim, pages `/`, `/projets/`, `/a-propos/`, `/contact/`, 404 ; voir DESIGN.md.

## Fait (phase 2)
- Module pilote `src/motion/cote.ts` : `startIdle()` (pointeur, vitesse au toucher, gsap.ticker) et `startCote()` : lignes de cote tracées depuis leurs repères (variable `--trace`), chiffres des projets qui comptent (`.mesure__val`, `.fiche__val`), mètre ruban du hero au repos (14 px/s, inflexion pointeur 90 px, en pause hors écran).
- `setup.ts` : rideau coffrage + trait de cote jaune (`.curtain__trait` dans `Base.astro`), appel unique de `startIdle`/`startCote`/`menuMobile`.
- Intro : `data-intro` sur chaque h1 (404 comprise, `data-split` ajouté) ; photo du hero sans `data-reveal` (LCP).
- Hero : mètre ruban (`.metre`) en rangée 2, texte et photo en rangée 3, texte aligné en haut (CTA à 674 px à 1440×900, 638 à 1280×720, 579 à 1024×768, 460 à 390×844).
- Survols (2 traitements, tracés) sous `(hover: hover)` + `:focus-visible`, `:active` ; focus anthracite + halo jaune ; `::selection` jaune ; lien KYW souligné au survol ; `.pied__tel` souligné.
- Favicon PNG 32 px et `apple-touch-icon` 180 px (sharp depuis `favicon.svg`) ; Barlow Condensed 600 retirée (inutilisée).
- `.split-line` à marge haute (capitales accentuées).
- Mesures Playwright : 0 erreur console ni requête en échec ; `scrollWidth` = fenêtre à 1440/1280/1024/390 et 390/360 sur toutes les pages ; mouvement réduit : 0 élément caché, pas de Lenis, chiffres réels ; menu mobile conforme (aria-expanded, Tab bouclé, Échap, focus rendu).
- Build OK, `pnpm index` relancé. DESIGN.md : Mouvement mis à jour, checklist 19 à 47.

## Reste (phase 3)
- Shoot complet (agent captures), lire `report.json` : `hover.noHoverChange`, `idleMotion`/`idleAt`, `settledMs`, `reduced.*`, contraste, cibles, axe.
- Jury (auto-notation `self`), Lighthouse, RAPPORT.md final ; vérifier `og.png` (police Pillow par défaut, à recomposer avec Barlow Condensed).

## Décisions
- Pas de loader, pas de GL, pas de follower de curseur, pas d'épinglage (aucune séquence réelle à épingler).
- Repos : le mètre ruban (objet du concept) et rien d'autre.

## Pièges
- Ajouter une rangée au hero repousse le CTA hors flottaison à 1280×720 si le texte est aligné en bas de la photo : texte en `align-self: start`.
- `.motion .cote` part à `--trace: 0` : toute nouvelle `.cote` hors du premier écran dépend de son ScrollTrigger (`top 90%`).
