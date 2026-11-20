# Révision 1 · Café Fleuri legacy

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | rien à faire | aucun bloquant | build OK |
| F1-1 | corrigé | ligne « statut à confirmer » sur accueil et Venir (`site.ts`, pages) ; consigné dans RAPPORT.md | grep « Statut » dans dist accueil et venir |
| F1-2 | corrigé | 3 cadres vides retirés, 1 gardé sur Venir ; héros sur deux colonnes | capture ciblée accueil 1440 |
| F2-1 | corrigé | pied du site en `div role=group` (`Footer.astro`) | 1 seul `<footer>` par page dans dist |
| F2-2 | corrigé | « Gravlax, granola et limonades maison » (texte, méta, lead) | 0 « tout est fait » dans dist |
| F2-3 | corrigé | note « relevés sur une ancienne fiche, à confirmer » (carte) | lecture du code |
| F2-4 | corrigé | légende héros alignée sur « illustratif » | lecture du code |
| F2-5 | corrigé | « illustratif » sur les deux numéros | grep dans dist venir |
| F2-6 | partiel | openingHours ajouté au JSON-LD ; og:image non faite (omission assumée), telephone JSON-LD inchangé (donnée) | grep dist |

Hypothèse : statut non arbitré, site laissé ouvert avec réserve visible. Rebuild via q.sh OK.
