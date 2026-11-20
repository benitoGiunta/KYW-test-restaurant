# REVISION-2 · brasserie-edgard · legacy

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1b | corrigé | `src/data/site.ts` `prix()` : tout nombre d'un texte libre passe par `fmt()` | `grep -c '11\.50' dist/.../la-carte/index.html` = 0 ; rendu « 11,50 € / 12,50 € » ; NaN = 0 |
| F2-2b | corrigé | `src/components/Footer.astro` : `<div role="group">` devient `<section class="close" aria-label="Coordonnées et liens">` | axe complet (home, la-carte, menu-groupe, lunch) à 1440 et 390 px : 0 violation |
| F3-1, F3-2..F3-5 | non traités | hors liste F0/F1/F2 de cette passe | |

Hypothèse : l'ordre « avec ou sans glace » des deux prix n'est pas inféré (pas d'invention). Rebuild OK via q.sh. Site estimé publiable.
