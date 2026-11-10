# QA revue 2 : le-felicien / legacy

Passe : revue2 · Rôle : captures · Build : `dist/le-felicien/legacy/` · Serveur local : port 4503 (arrêté après la passe)

## Pages capturées

| Page | Dossier des captures | Planche |
|---|---|---|
| Accueil `/le-felicien/legacy/` | `.shots-le-felicien-legacy-revue2/home/` | `.shots-le-felicien-legacy-revue2/home/planche.png` |
| Carte `/la-carte/` | `.shots-le-felicien-legacy-revue2/le-felicien-item/` | `.shots-le-felicien-legacy-revue2/le-felicien-item/planche.png` |
| Page inexistante (404) | `.shots-le-felicien-legacy-revue2/404/` | `.shots-le-felicien-legacy-revue2/404/planche.png` |

Remarque : la capture « 404 » est la réponse de repli du serveur statique (`<pre>`, sans `<title>` ni `lang`), pas la page `404.astro` du site. L'audit a crawlé 4 pages, la capture en a traité 3.

## Mesures (report.json)

| Indicateur | Accueil | Carte | 404 (repli serveur) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrast à revoir 4) | 0 (contrast à revoir 0) | 2 (`document-title`, `html-has-lang`, serious) |
| LCP desktop (ms) | 560 | 472 | 44 |
| CLS desktop | 0.001 | 0.001 | 0 |
| LCP mobile (ms) | 960 | 788 | 216 |
| CLS mobile | 0.038 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments masqués WebGL | 0 | 0 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 4 | 4 | 0 |
| Clavier : focus bloqué | non | non | non |

Focus invisible (accueil et carte, identiques) : liens « La carte », « Suggestions de la semaine », « Contact et réservation », « Réserver une table ».

## Audit (`audit.mjs`, 4 pages)

- Résultat : 0 FAIL, 29 WARN.
- Exemples de WARN : titre de l'accueil de 78 caractères (limite 70) ; `twitter:card` absent sur l'accueil et sur la carte.
- Poids de la page la plus lourde (`/le-felicien/legacy/`) : environ 709 KB.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Les journaux sont dans `.logs/le-felicien-legacy-revue2-*.log`.
