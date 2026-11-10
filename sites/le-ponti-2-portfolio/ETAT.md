# ETAT : le-ponti-2 portfolio (phase 2 sur 3 faite)

## Fait (phase 1)
- Gabarit guinguette adapté, DESIGN.md, `site.ts` + `carte.json` (99 lignes), 6 pages, palette bordeaux/or/canard, objets `pizza` et `pont`, favicon, og.jpg.

## Fait (phase 2, mesuré à 1920/1440/1280/1024/390/360/320, 0 erreur console)
- Bug de section « La table » : `.rail { display: flex }` (ligne tardive) écrasait `.table__rail { display: none }` : le rail s'affichait aussi en desktop (section 1552 px, titre sous les photos). Corrigé par `.table .table__rail` ; le titre « La table du Ponti » est maintenant libre entre deux rangées de 6 tirages (positions `site.ts`), verre/citron/fourchette posés de part et d'autre.
- Marquee : groupe `min-width: 100vw` (plus de trou à 1920) ; état ouvert/fermé lu en heure de Namur (`Intl`, fuseau Europe/Brussels), testé par `page.clock.install` (lundi fermé, midi, entre-deux, soir, dimanche).
- Carte : pastilles de catégories (ancres, `aria-current` par IntersectionObserver, clic via `scrollToTarget` car l'option `anchors` de Lenis ne scrollait pas), ligne de plat survolée, défilement horizontal des pastilles sous 48rem ; prix long (« 12 € par personne ») sans débordement à 320.
- Horaires : espaces insécables dans « 11:30 à 14:30 » (retour à la ligne seulement après la virgule).
- Formulaire : états hover, `:user-invalid` (bordeaux), `:user-valid` (canard).
- Vérifié : hero sans recouvrement objets/titre/CTA (1920 à 320) ; objets visibles et sans marquee animé en reduced-motion (tirages en grille statique, objets masqués) ; clics réels de l'en-tête (elementFromPoint = lien, URL change) ; bas de page 1440 (mention Maquette KYW + « Réalisé par Know Your Website ») ; `scrollWidth` = fenêtre sur 6 pages à 320/360/390.
- Build OK (scripts/q.sh), `dist/le-ponti-2/portfolio/` rebuilt.

## Reste (phase 3)
- Shoot/audit complets par l'agent « captures » ; axe (contraste des pastilles actives, focus), sloplint, Lighthouse.
- `pnpm index`, RAPPORT.md, UTILISATION.md (guinguette : le-ponti-2), logo client non intégré, test tactile du glisser sur mobile non fait (rail sans Draggable).
- Interdit de refaire : table, marquee, pastilles (déjà vérifiés).

## Pièges
- `dist/le-ponti-2/awwwards/` et `sites/le-ponti-2-legacy/` appartiennent à d'autres agents : ne pas les ajouter au commit.
- Faux positifs de mon script de débordement : lien d'évitement `A` hors écran, `.carte` en scale avant reveal.
- « Ouvert, arrivée jusqu'à 14:30 » (libellé du gabarit) à confirmer comme formulation.
- `gabarits/` non modifié (défaut rail/display à reporter : voir leçon).
