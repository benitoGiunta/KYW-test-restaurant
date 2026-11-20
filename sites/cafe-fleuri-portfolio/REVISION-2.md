# Révision 2 · Café Fleuri (portfolio)
Aucun F0. Hypothèse : le statut de fermeture est affiché (arbitrage laissé à la revue).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 statut | corrige | `src/pages/reservation.astro` : note « statut à confirmer » (fermeture signalée par des sources, horaires et numéro peut-être caduques) | grep dist : 1 occurrence dans reservation |
| F2-1 flèches 768 | corrige | `src/styles/base.css` : `.horo__fleche` `flex: none; min-width: 44px` | Playwright : 44x44 à 390, 768, 1024, accueil et réservation |
| F2-2 chapeau 12h | corrige | `src/data/site.ts` : « Plats cités par un annuaire en ligne, à titre d'exemple : … » | grep dist carte : « se prend aussi à midi » = 0 |
| F2-3 doublons carte | corrige | `src/pages/carte.astro` : bloc « Boissons » supprimé, liste des plats filtrée sur les noms déjà présents dans les moments | grep dist carte : Limonade 1, Café et boissons chaudes 1, Pancakes 1 |

Build `pnpm build:site` OK (6 pages). F3 non traités (hors périmètre). DESIGN.md inchangé.
