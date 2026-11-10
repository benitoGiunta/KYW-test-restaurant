# ETAT : Le Servais, variante awwwards (fin de la phase 2 sur 3)

## Fait (phase 1)
- Concept « La Ligne », système, 5 pages statiques, contenu réel, build : voir DESIGN.md et l'historique git.

## Fait (phase 2)
- Pilote `src/motion/ligne.ts` + entrée de repos `src/motion/idle.ts` + menu `src/motion/menu.ts`, appelés par `setup.ts`.
- Signature : `src/components/Cabine.astro` dans chaque `.ligne` (5 pages) ; cabine collante sur le câble, pendule (vitesse, pointeur, repos), stations allumées, étiquette de station dans l'en-tête (bureau ≥ 64 rem).
- Reveals déclaratifs : `data-split="lines"` sur les h2 et chapeaux, `data-reveal` sur photos et blocs sans lien, `data-intro` sur le lieu et l'état du hero et sur les chapeaux des pages intérieures (h1 jamais cachés).
- Survols par rôle sous `(hover: hover)`, mêmes états sur `:focus-visible` et `:active` ; lien du pied KYW souligné au survol.
- Menu mobile `<dialog>` (sous 48 rem) ; `cta--petit` à 44 px.
- Build OK (`scripts/q.sh build pnpm build:site sites/le-servais-awwwards`).
- Contrôle Playwright (script hors dépôt) : 0 erreur console ni requête échouée ; `scrollWidth` = largeur à 390 et 320 sur les 5 pages ; menu ouvert, boucle Tab, Échap, focus rendu ; réduit : 0 texte caché, aucune rotation, 5 pages. Captures ciblées : `.shots/aww2/` (non commitées).

## Reste (phase 3)
- OG composée (`public/og.png` toujours manquant, référencé par `Base.astro`).
- QA complète (shoot, audit, axe, `hover.noHoverChange`, `idleAt`, `settledMs`, LCP), RAPPORT.md, sloplint, `pnpm index`, points 35, 36, 45 de DESIGN.md.
- Vérifier le contraste de `.tete__station` (muted sur béton, 7,1:1 attendu) et l'étiquette « 9 h » du menu (carte) si le jury la juge arbitraire.

## Décisions et hypothèses
- Pas de loader, de GL, de follower. Pas d'aperçu au curseur sur la carte (aucune photo par plat).
- Étiquettes du menu : Départ, 9 h (ouverture), Mai 2025 (ouverture du bar, dossier), À quai ; décoratives (`aria-hidden`).
- Téléphone 081 73 65 52 ; photo 05 « illustrative » ; Margarita « à confirmer » (inchangé).

## Pièges
- Une règle de base ajoutée en fin de `site.css` écrase la media query mobile placée plus haut (bouton Menu invisible) : la règle de bureau est écrite en `@media (min-width: 48.01rem)`.
- Le `<dialog>` natif laisse sortir Tab vers l'interface du navigateur : boucle Tab dans `menu.ts`.
- Serveur de test : `node .claude/skills/awwwards/scripts/serve.mjs dist --port 4421` depuis le dépôt (arrêté, PID tué).
