# QA revue 1 — novobel / legacy (captures)

Build : `dist/novobel/legacy/` (build OK, 6 pages). Serveur local `dist/` port 4503, arrêté après usage.
Captures : `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/` (`summary.json` à la racine du dossier).

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/novobel/legacy/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/home/planche.png` |
| Services `/novobel/legacy/services/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/novobel-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue1/404/planche.png` |

Note : `shoot.mjs --crawl --nav` a capturé 3 dossiers (accueil, services, 404). L'audit a crawlé 5 pages (accueil, services, projets, jobs, blog) ; projets, jobs et blog n'ont pas de dossier de captures.
Note planche : `scripts/planche.py` lit ses arguments de façon positionnelle ; `--colonnes 4 --largeur 480` ont été pris pour des fichiers (« ignoré », sans effet). Les planches sont sorties à 1920 × 5280 px, 19 images chacune.

## Chiffres (report.json)

| Indicateur | Accueil | Services | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0 ; contrast à revoir : 6) | 0 (serious 0 ; contrast à revoir : 6) | 1 (`color-contrast`, serious) |
| LCP desktop | 432 ms (img) | 432 ms (img) | 36 ms (p) |
| LCP mobile | 948 ms (img) | 1788 ms (img) | 248 ms (p) |
| CLS desktop | 0.001 | 0.017 | 0 |
| CLS mobile | 0.03 | 0.056 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| WebGL actif | non | non | non |
| Clavier : arrêt de focus | 12 arrêts | 12 arrêts (bloqué sur les champs `input`, `stuck: true`) | 3 arrêts, dont « (body: focus left the page) » |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 2 (`h-05`, `h-06`) | 1 (`h-03`) | 2 (`h-01`, `h-02`) |
| Survol couleur seule | 4 | 3 | 0 |
| Survol éléments masqués | 0 | 0 | 0 |

Mouvement réduit : voir `reduced` dans chaque report.json (non résumé ici).

Clavier, services : la séquence de tabulation se termine sur trois `input` puis `stuck: true` (le focus ne sort plus de la séquence mesurée).
Clavier, 404 : `(body: focus left the page)` après le lien « Réalisé par ».

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 22 WARN**.
- Pages auditées : `/novobel/legacy/`, `services/`, `projects/`, `jobs/`, `blog/`.
- WARN, par type :
  - Pas de lien canonique : projects, jobs, blog (3).
  - Pas d'og:image : projects, jobs, blog (3).
  - Pas de twitter:card : projects, jobs, blog (3).
  - Site : pas de robots.txt ; pas de sitemap (2).
  - Police TTF/OTF livrée (`ieVq2YZ…Ncs2Za4Q.ttf`, à passer en woff2) : accueil, services, projects, jobs, blog (5).
- Poids : page la plus lourde `/novobel/legacy/` ~675 KB ; HTML 5, JS 1 (gz), CSS 6 (gz), polices 103, images 560.

## Ligne FAIL

Aucune (0 FAIL).
