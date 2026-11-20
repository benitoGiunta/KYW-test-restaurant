# Révision 1 · Tariki portfolio (ciblée F0, F1, F2)

| id | décision | changé | preuve |
|---|---|---|---|
| T-1 | corrige | `site.ts` chemin : légendes Liban/Turquie/Grèce/Syrie supprimées, Belgique gardée ; `histoire.astro` n'affiche pas un texte vide | grep `Premier détour` = 0 dans dist |
| A-1 | corrige | `base.css` : mots éteints en `color-mix(fg 55%, bg)` (~5:1) | axe color-contrast, accueil 1440 et 390 : 0 violation |
| A-2 | corrige | `braise.ts` : SplitText `aria: 'none'` | axe aria-prohibited-attr : 0 |
| C-1 | corrige | `404.astro` : « Retour à l'accueil » | grep dist/404.html |
| C-2 | corrige | notes de production retirées de `carte.astro` et `site.ts` (« à confirmer », « à remplacer », « site actuel ») | grep = 0 sur 4 pages |
| C-3 | corrige | accueil : pied compact (horaires une seule fois) ; réservation l'était déjà | `footer .horaires` = 0 à l'accueil |
| C-4 | corrige | citation reformulée sur le titre vérifié : « 14 adresses namuroises recommandées par Éric Boschman, dont Tariki. » | grep dist |
| D-1 | corrige en partie | eyebrows « Table » (carte, histoire) et « Nuit » (accueil, réservation) supprimés ; autres gardés | grep |
| D-2 | corrige | trois valeurs fondues en une ligne sous la route (aucun texte inventé) | build |
| D-3 | impossible | pas de nouvelle photo sans invention ; affiche client à confirmer côté droits | - |
| A-3 | impossible | contraste du paquet `packages/kyw-footer` : hors site, à signaler au mainteneur | - |

Hypothèse : F3 non traités (hors périmètre). Build final via `scripts/q.sh` : OK. Serveur arrêté.
Publiable : oui.
