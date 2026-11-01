# ETAT · dolce-vita-wepion-awwwards · fin de phase 3 (construction-3), 01/11/2026

## Fait (phases 1 et 2)
- Concept « Il neon », 5 pages, pilote néon, menu, transition, états : voir DESIGN.md (points 1 à 47).

## Fait (phase 3, QA)
- Lu QA-build.md et les planches accueil/carte ; shoots ciblés `.shots/reservation`, `.shots/carte`, `.shots/home` après corrections ; audit final 0 FAIL, 1 WARN (sitemap, faux positif sous base).
- Corrigé : nom accessible de la marque (axe `label-content-name-mismatch`), survol de « Wépion », cibles tactiles du pied et de la réservation (44 px), sommaire mobile de la carte collé au bord (`scroll-padding-inline`), horaires en double sur la réservation (WARN x6), reveal de la galerie de l'accueil retiré (accessoire, trous au défilement).
- DESIGN.md : points 35, 36, 45 cochés, checklist 42 à 63 ; RAPPORT.md complet (auto-notation, mesures, placeholders : aucun) ; leçon ajoutée à `agents/lecons/construction.md`.
- Build final OK, `pnpm index`, commit.

## Reste
- Critique jury indépendant (aucun outil Agent ici) : `/jury` sur la racine de QA.
- FPS desktop de l'accueil 54 (cible 55).
- `idleMotion` false assumé (DESIGN.md point 36).

## Décisions / pièges
- Les JPG originaux émis dans `_astro/` ne sont référencés par aucune page.
- `gabarits/` non touché.

## Passe de revue 1 (relecteur-site, 01/11/2026)
- Fait : REVUE-1.md (A_CORRIGER : F0 0, F1 2, F2 5, F3 5). Captures de l'agent captures en échec (`shootFailed`) : mesures par script maison, planches dans `.shots-dolce-vita-wepion-awwwards-revue1/self/`.
- Reste (réviseur) : F1-1 aria-label du SplitText sur `.devise__it`, F1-2 bandes défilantes mobiles focalisables, puis F2.
