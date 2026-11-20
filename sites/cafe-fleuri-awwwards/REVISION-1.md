# Révision 1 · Café Fleuri awwwards

| id | décision | changé | preuve |
|---|---|---|---|
| F1-1 | corrige | `site.ts` (gravlax « maison »), `index.astro` (titre « Les mêmes mots que sur la carte : maison. ») | grep dist : 0 « sur place » |
| F1-2 | corrige | « tous les jours » retiré (hero, histoire, reservation), « toujours » retiré de la 404 ; le pied garde « Tous les jours » (horaires placeholder déjà marqués à confirmer) | grep dist : 0 « toujours au », 0 « brunch tous les jours » |
| F2-1 | corrige | reservation : « Horaires à confirmer. » ; carte : « Prix à confirmer. » | grep dist : 0 « Appelez », 0 « appeler le café » |
| F2-2 | corrige | reservation : note « Numéro relevé chez un annuaire tiers, à confirmer. » | présent dans dist |
| F2-3 | corrige | `engine/reveal.ts` : SplitText `aria:'none'` | axe complet 4 pages x 2 largeurs : 0 violation (hors contraste) |
| F2-4 | corrige | `Footer.astro` : `<footer>` du site passé en `<section aria-label>` ; kyw-footer intact | axe : 0 `landmark-no-duplicate-contentinfo` |
| F2-5 | corrige | `site.css` : dès 1024 px notes 15 px, colonnes élargies (60ch, lead 44ch, frise 52ch) | 0 note < 14 px, scrollWidth = largeur (1440, 390) |
| F2-6 | refuse | aucune photo disponible (site client bloqué), création d'un visuel illustré = changement de DA hors révision ciblée | - |

Hypothèse : statut d'activité non tranché (arbitrage orchestrateur) ; formulations neutres. F3 non traités.
Build : exit 0. Décompte : 7 corrigés, 1 refusé, 0 impossible.
