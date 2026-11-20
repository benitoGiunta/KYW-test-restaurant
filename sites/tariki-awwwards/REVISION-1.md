# Révision 1 · Tariki awwwards

Révision ciblée (F0, F1, F2). Aucun F0 dans la revue. Rebuild via `scripts/q.sh` : exit 0.

| id | décision | changement | preuve |
|---|---|---|---|
| R1-01 (F1) | corrige | `src/data/site.ts` : seconde phrase « Dites-le à la personne… » supprimée | grep `dist/tariki/awwwards/reservation/index.html` : 0 « Dites-le », « fruits à coque, lait, sésame. » présent |
| R1-02 (F2) | corrige | `site.ts` : notes de Bayti et Bayti le Comptoir vidées, « Le feu. » retiré de Tariki ; `histoire.astro` ne rend le `<span>` que si la note existe | grep `histoire/index.html` : 0 légende inventée, « Il prolonge les deux autres sans les remplacer. » conservé |
| R1-03 (F2) | corrige | `site.ts` `credit` : « Visuels d’ambiance du site de Tariki, illustratifs » | grep `index.html` et `histoire/index.html` : 0 « Photos : », nouveau crédit dans le pied |

Non traités (F3, hors périmètre) : R1-04, R1-05, R1-06. Pas de capture : changements purement textuels, aucune mise en page touchée (hypothèse : un `<li>` sans `<span>` reste valide dans la grille). DESIGN.md inchangé.
