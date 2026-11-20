# Révision 1 · legacy · Les Terrasses de Crupet (F2 seulement)
| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 | corrigé | `src/components/Reservation.astro:15` : « Des bons cadeaux sont proposés. » (procédure retirée) | grep dans `dist/.../index.html` : 1 occurrence |
| F2-2 | corrigé | `src/styles/page.css` (fin) : `body` flex colonne `min-height:100dvh`, `main` `flex:1 0 auto` | Playwright 1440×900 sur `404.html` : bas du pied KYW à y = 900 (était 591) |
| F2-3 | corrigé | `src/styles/page.css` : `.foot__cols p a, .foot__credits a` en `inline-block` + `padding-block:.3rem` pour tous les pointeurs | 6 liens, 0 < 24 px à 1440, 390 et 320 ; scrollWidth = largeur de fenêtre |
Les F3 ne sont pas traités (hors périmètre, F2 seulement). Build `pnpm build:site` passé via q.sh. sloplint non relancé (CSS de mise en page seulement) ; DESIGN.md inchangé. Hypothèse : « Des bons cadeaux sont proposés » est neutre vis-à-vis du site client.
