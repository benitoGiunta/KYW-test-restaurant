# Révision 1 · Yayami awwwards

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `.display--fit` (`min(var(--t-mega), 15vw)`) sur le h1 de `reservation.astro`, règle dans `site.css` | `scrollWidth - clientWidth` = 0 à 320, 360, 390, 412, 430 px sur reservation, a-propos, carte |
| F2-1 | corrige | `index.astro` : « au 15 rue de Bruxelles » | grep dist : « retirée au 15 rue de Bruxelles. » |
| F2-2 | corrige | « à emporter ou chez vous » | grep « sur place » dans dist index : 0 |
| F2-3 | corrige | intro de /reservation/ reformulée (commande sur le site, téléphone en contact) | grep dist |
| F2-4 | corrige en partie | /a-propos/ : bloc Horaires/Livraison/Paiement supprimé (doublon de /reservation/), renvoi vers Commander, photos côte à côte | capture 1440 px de a-propos : colonne gauche plus vide |
| F3-1, F3-3, F3-4 | corrige (bonus) | NBSP avant « : », canonical 404 en `404.html`, « d’algues » | grep dist canonical 404 |
| F3-2, F3-5, F3-6, F3-7 | non traités | hors liste ciblée | |

Hypothèse : la zone noire de la capture pleine page vient des révélations au scroll non déclenchées, pas d'un défaut. Build via scripts/q.sh : OK. Serveur arrêté.
