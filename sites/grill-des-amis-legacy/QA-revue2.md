# QA revue 2 : grill-des-amis, variante legacy

Build : `scripts/q.sh grill-des-amis-legacy-revue2-build` (exit 0, 8 pages, `dist/grill-des-amis/legacy/`).
Serveur : `http://127.0.0.1:4503/grill-des-amis/legacy/`. Captures : `.shots-grill-des-amis-legacy-revue2/`.
Journaux complets : `.logs/grill-des-amis-legacy-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/grill-des-amis/legacy/`) | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/home/planche.png` |
| Carte (`/grill-des-amis/legacy/carte/`) | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/grill-des-amis-item/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/grill-des-amis-item/planche.png` |
| Page 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-revue2/404/planche.png` |

Le crawl a visité 6 pages ; les captures sont regroupées en trois dossiers. Le dossier `home/` contient aussi `summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 2 (`document-title`, `html-has-lang`, impact serious) |
| Axe : contraste à vérifier | 49 | 69 | 0 |
| LCP desktop (ms) / élément | 140 / img | 144 / img | 40 / pre |
| LCP mobile (ms) / élément | 1024 / h1#h-hero | 1600 / img | 228 / pre |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation / piégé | 12 / non | 12 / non | 1 / non |
| Survol : changement couleur seul | 3 (Téléphoner, La carte, Réserver) | 1 (Réserver) | 0 |
| Survol : sans changement | 2 | 4 | 0 |
| Mouvement en réduit / texte masqué | non / 0 | non / 0 | non / 0 |

Notes : FPS scroll desktop 60 (worst frame 17 ms, floor headless). Mobile scroll FPS 61. Accueil : hauteur desktop 4960 px, mobile 5483 px. Aucun loader détecté (`loaderMs` null).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 11 (dont, par exemple, `missing twitter:card` sur l'accueil et la carte, et une phrase répétée 4x sur l'accueil)

## Incident d'environnement

Le serveur lancé par cette passe (`serve.mjs dist --port 4503`, journal `.logs/serve-legacy.log`) a échoué au démarrage : le port 4503 était déjà occupé par un processus antérieur (PID 8349, lancé à 02:23, non lancé par cette passe). Les captures et l'audit ont donc été faits sur ce processus, qui sert le même `dist/` sur disque, reconstruit à 02:43. Le PID 8349 n'a pas été arrêté (il ne m'appartient pas).
