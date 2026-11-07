# QA revue 2 : le-royal / portfolio (faits)

Build : `dist/le-royal/portfolio/` (7 pages, rc 0). Serveur local 127.0.0.1:4501, arrêté après usage.
Journaux : `.logs/le-royal-portfolio-revue2-{build,shoot,audit}.log`.

Note : `shoot.mjs --crawl --nav` n'a produit que 3 dossiers de pages (`home`, `le-royal-item`, `404`). L'audit a crawlé 6 pages. Les pages `formules`, `histoire`, `reservation`, `terrasse` n'ont pas de dossier de captures.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/home/planche.png` |
| /carte/ | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/le-royal-item/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/le-royal-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue2/404/planche.png` |

## Chiffres (report.json)

| Mesure | home | carte (le-royal-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, serious) |
| Contrast à revoir (axe) | 55 | 94 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms, élément) | 164 (span) | 52 (p.lead) | 36 (pre) |
| LCP mobile (ms, élément) | 1104 (span) | 1092 (p.lead) | 224 (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (texte masqué) | 0 | 0 | 0 |
| Petites cibles desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Offenders desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piégé | non | non | non |
| H1 | « LE ROYAL NAMUR » | « LA CARTE » | aucun |

Hover (home et carte) : cibles testées, changements de style observés, pas de curseur suiveur signalé. 404 : pas de lien cliquable (`--nav`), donc pas de test de transition.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 11
  - Phrase répétée 2 fois (6 pages) : « Cuisine ouverte 7 jours sur 7, de 12h à 14h30 et de 18h à 22h » (/, /carte/, /formules/, /terrasse/, /histoire/, /reservation/).
  - Phrase répétée 2 fois (2 pages) : « Extraits de la carte des boissons. » (/, /carte/).
  - Page 404 sans `<h1>`.
  - Pas de robots.txt.
  - Pas de sitemap (audit, alors que le build annonce `sitemap-index.xml`, à vérifier).
- Page la plus lourde : /terrasse/, environ 1367 KB (images 1185 KB, fonts 111 KB, JS 62 KB gz, CSS 6 KB gz).
