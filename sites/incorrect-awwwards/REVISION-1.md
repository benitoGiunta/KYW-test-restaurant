# Révision 1 · incorrect · awwwards (F2 seulement, ciblée)
| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | `index.astro` : « du kimchi maison, de la porchetta, du potimarron » | grep dist : betterave absente du manifeste (reste dans les plats de la carte, légitime) |
| F2-2 | corrige | `index.astro` : « Des moulins belges. » | grep dist « bords bien colorés » : 0 |
| F2-3 | corrige | `carte.astro` : « Relevée sur la carte du restaurant (PDF du site actuel). » | grep dist « carte papier » : 0 |
| F2-4 | corrige | `site.ts` : « Les animaux sont acceptés. » ; « Terrasse. » | grep dist chiens / beaux jours : 0 |
| F2-5 | corrige | `404.astro` : « Erreur » dans `.nowrap` (+ règle `site.css`) | Playwright 1440 et 390 : le mot reste entier, retour à la ligne seulement avant « 404 » |
| F2-6 | corrige | `index.astro` : « Du mardi au samedi » retiré du hero ; JSON-LD conservé (accepté par la revue) | grep dist : 0 |
| F2-7 | corrige | `site.css` : `.lien, .lien-nav` en inline-block, padding-block 0.4rem, min-height 24 px | getBoundingClientRect : liens 34 à 67 px (390 et 1440), aucun sous 24 px |
| F3-1 | corrige | `Base.astro` : pas de canonical sur la 404 | grep 404.html canonical : 0 |
| F3-2 | corrige | `carte.astro` : puce « Les classiques » | build |
| F3-3 | corrige | `histoire.astro` : « Ancien boulanger, il fait sa pâte au levain » | grep dist « gardé le levain » : 0 |
| F3-4 | non traité | JSON-LD `name` et og.png laissés | hors périmètre F2 |

Décision de design inchangée. Bilan : 7 F2 corrigés, 3 F3 corrigés, 0 refusé, 0 impossible. Hypothèse : « potimarron » figure à la carte (proposé par la revue).
