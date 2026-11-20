# ETAT : Le D’Arville, variante awwwards (fin de phase 2 sur 3)

## Fait
- Phase 1 : brief, concepts, Concept Card « La balade », système, pages statiques, build (voir DESIGN.md).
- Phase 2 (20/11/2026) :
  - Pilote `src/motion/balade.ts` + repos `src/motion/idle.ts` : borne de sentier fixe 0 m → 200 m (scroll), pointeur, respiration au repos, « 200 m, arrivée » en fin de page, 404 « Hors sentier » (`<Base borne="hors">`).
  - Reveals déclaratifs sur toutes les pages (h1 en intro, h2 `lines`, photos `clip`, parallaxe du domaine), haltes et lignes de carte qui glissent (verbe cheminer).
  - Rideau de brique + borne « Halte suivante » (`setup.ts`).
  - Hovers : CTA remplissage gauche → droite + flèche, nav trait tracé, liens texte épaissis ; tout sous `(hover: hover)` + `:focus-visible` ; `:active`.
  - Menu mobile accessible (`Header.astro`, `motion/menu.ts`), cibles 44 px.
  - Finitions : `::selection` accent, `favicon-32.png`, `apple-touch-icon.png`, hover du lien KYW, correction du `<picture>` qui ne remplissait pas le cadre (bande grise sous la photo du hero mobile).
  - Styles de la phase dans `src/styles/motion.css`.
  - Build OK (`scripts/q.sh build pnpm build:site sites/le-d-arville-awwwards`).
  - Contrôle Playwright ciblé (script scratchpad, pas de shoot complet) : 0 erreur console ni requête échouée, 0 débordement horizontal à 390 (4 pages), menu (ouverture, focus, piège, Échap), mouvement réduit (0 texte caché, sentier masqué), repos actif. Captures `.shots/p2/` (non commitées).

## Reste (phase 3)
- Shoot complet et `report.json` (agent captures) : points 35, 36, 39, 45 de DESIGN.md à prouver ; LCP/CLS ; axe ; clavier ; 404 réelle (`/le-d-arville/awwwards/404.html`).
- `og.png` à recomposer (provisoire) ; RAPPORT.md à compléter ; `pnpm index` et commit `[publier]` en fin de restaurant seulement.
- À regarder : l'étiquette du sentier desktop chevauche le bord droit du contenu (photo du hero, colonne « Suivre » du pied) ; acceptable pour une UI fixe, à juger sur captures.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur. Pas d'aperçu photo au curseur sur la carte (aucune photo attribuable à un plat).
- Mobile : le sentier tient dans la gouttière droite (point seul) ; la balise du hero compte les mètres.
- Heures non publiées jamais écrites ; aucun contenu fictif.
