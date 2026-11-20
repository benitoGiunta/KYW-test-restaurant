# QA revue 1 : philfa / legacy (captures)

Build : `sites/philfa-legacy` → `dist/philfa/legacy/` (exit 0). Serveur local port 4503, arrêté après usage.
Pages capturées : 2 (`/philfa/legacy/` et la page 404). Le crawl ne trouve qu'une page HTML.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/philfa/legacy/` | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-revue1/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-revue1/404/planche.png` |

Rapport par page : `report.json` dans chaque dossier. Résumé : `/home/user/KYW-test-restaurant/.shots-philfa-legacy-revue1/summary.json`.

## Chiffres (report.json)

| Indicateur | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 1 / 1 (`color-contrast`, serious, 2 nœuds) |
| Contrastes à vérifier (axe) | 0 | 0 |
| CLS desktop / mobile | 0.002 / 0.001 | 0 / 0 |
| LCP desktop / mobile (ms) | 348 / 1656 | 40 / 240 |
| Load desktop / mobile (ms) | 659 / 1635 | 22 / 412 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 1 / 1 (`la page d'accueil` 128x20) |
| FPS scroll desktop / mobile | 60 / 61 | 61 / 60 |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| Focus clavier sans indicateur visible | 0 | 0 |
| Focus invisible | 0 | 0 |
| Focus bloqué | non | non |
| Lien d'évitement en premier | non | non |
| Arrêts clavier | 12 | 2, puis focus sort de la page |
| Survol sans changement visuel (noHoverChange) | 2 (`button "Menu du moment"`, `a "PhilFa"`) | 2 (`a "la page d'accueil"`, `a "Réalisé par"`) |

Note du rapport : les FPS desktop sont mesurés en headless sur GPU logiciel ; les valeurs mobiles sont en ralentissement CPU 4x.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 9 WARN** (le détail des WARN n'est pas repris ici).
- Page crawlée : `/philfa/legacy/` seule. Poids le plus lourd : ~1008 KB (HTML 6, JS 1 gz, CSS 4 gz, polices 376, images 621).

## Lignes FAIL

Aucune.
