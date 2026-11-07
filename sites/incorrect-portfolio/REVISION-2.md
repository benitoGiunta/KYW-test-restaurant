# REVISION-2 · incorrect portfolio

| id | décision | changé (src/styles/base.css) | preuve |
|---|---|---|---|
| N-1 (F1) étapes home | corrige | `.etapes > div > ol[data-cercles]` en une colonne ; `li` `minmax(0,1fr)` + `container-type`, `strong` `min(var(--t-l), 8cqi)` + `overflow-wrap` | mesure Playwright : 0 `li`/`strong` débordant à 768, 1024, 1280, 1440, 1920 ; capture 1440 : cartes pleines, titres entiers |
| N-2 (F1) « Ça s'empile » 768 | corrige | scène en `minmax(0,1fr)`, `.empile__pile` et `.empile__liste` en conteneur, prix `min(…, 16cqi)`, liste `min(…, 8cqi)` | `getBoundingClientRect().right` du prix 518/600, 732/768, 862/900, 983/1024 ; capture 768 fin de pin : « 14,50 € », plat et légende entiers, liste sans chevauchement |
| N-3 (F2) réservation 1024 | corrige | adresse et titre du plan en `cqi` (10 / 10,5) | « Marcelle » sur 1 ligne (getClientRects) à 768, 1024, 1440 ; texte du plan à 975 pour cadre à 1035 |
| F3-6 (bonus) | corrige | `h3.display--xl` `clamp(1.6rem, 8vw, 2.2rem)` sous 400 px | « Suppléments » finit à 336/360 et 366/390 |
| F3-1 à F3-5 | non traités (F3, hors liste ciblée) | | |

Build `scripts/q.sh` OK. DESIGN.md inchangé.
