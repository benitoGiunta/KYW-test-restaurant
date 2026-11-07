# Révision 1 · incorrect legacy (F2 seulement)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrigé | `src/layouts/Base.astro` : `openingHoursSpecification` (mar-ven 18:30-21:30, sam 12:00-14:00 et 18:30-21:30) ; « à confirmer » reste visible dans la page | `grep -o openingHoursSpecification dist/incorrect/legacy/index.html` : 1 |
| F2-2 | corrigé | `src/data/site.ts` : règle par groupe, deux décimales dès qu'une valeur du groupe en a, sinon aucune | extraction des `plat__p` du dist : suppléments « 3,00 / 2,50 / 2,00 € » alignés |
| F2-3 | corrigé | `src/components/Pate.astro` : carte « 14,50 € la margherita… » retirée ; `page.css` l.101 : bande à 2 colonnes | `grep "plus simple des classiques" dist` : 0 |
| F3-3 | corrigé en passant | `site.ts` : apostrophes courbes dans les lignes de la carte | 0 apostrophe droite entre lettres, « ’Nduja » présent |
| F3-1, F3-2, F3-4, F3-5 | non traités (F3 hors périmètre) | | |

Build : `scripts/q.sh` rev-build, 2 pages, OK. Pas de capture visuelle ni de sloplint (révision ciblée, passe 1) : à contrôler par échantillon (bande « La pâte en chiffres » à 2 colonnes).
