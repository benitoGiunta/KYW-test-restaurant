# QA build : yayami-legacy (phase test, passe build)

Build : `scripts/build-site.mjs sites/yayami-legacy` → `dist/yayami/legacy/`, exit 0 (3 pages).
Serveur de contrôle : `serve.mjs dist --port 4503`, arrêté après les captures.
Captures : `shoot.mjs --crawl --nav`, 3 dossiers de pages. Audit : `audit.mjs`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/yayami/legacy/`) | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/home/planche.png` |
| yayami-item (`/yayami/legacy/carte/`) | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/yayami-item/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/yayami-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/404/planche.png` |

Résumé global : `/home/user/KYW-test-restaurant/.shots-yayami-legacy-build/summary.json`.

## Chiffres par page (source : report.json, summary.json)

| Mesure | home | yayami-item (carte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 : color-contrast x2 |
| Contraste à vérifier (axe) | 14 | 0 | 0 |
| LCP desktop (ms) | 748 (img) | 696 (img) | 32 (p) |
| CLS desktop | 0.058 | 0.003 | 0 |
| LCP mobile throttlé (ms) | 1360 (img) | 2328 (img) | 232 (p) |
| CLS mobile | 0.054 | 0.003 | 0 |
| FPS desktop / mobile | 61 / 60 | 61 / 61 | 60 / 61 |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Texte caché (reduced) | 0 | 0 | 0 |
| Focus clavier : arrêts | 12 | 12 | 3 |
| Focus clavier : dernier arrêt | « PLATS CHAUDS » | « Salades » | sortie de la page |
| Focus visible absent | 4 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Survol sans changement | 1 | 1 | 2 |
| Information par la couleur seule | 6 | 4 | 0 |
| Lien d'évitement en premier | non | non | non |
| Mouvement idle | non | non | non |
| Hero stabilisé (ms) | 4705 | 2941 (page) | 2232 |

Détail axe 404 : `.kyw-footer__note` et `span`, texte #6b787d sur #fbfaf8, 4.36:1 (seuil 4.5:1).
Détail focus visible absent (home) : 4 cas, non détaillés ici.

Taille de la page la plus lourde (carte) : ~1475 KB (html 6, JS 1 gz, CSS 5 gz, polices 375 KB, images 1089 KB).

## Audit SEO / métadonnées (audit.mjs)

- FAIL : aucun.
- WARN : 15. Principaux : titre de la home à 73 caractères (max 70) ; `twitter:card` absent sur home et carte ; pas de `robots.txt` ni de `sitemap` au niveau du site (audit) ; polices TTF/OTF livrées (7 fichiers, home et carte) au lieu de WOFF2 ; polices 375 KB.
- Résultat : `0 FAIL, 15 WARN`.
