# QA revue 2 : bergerie-lives, variante awwwards

Faits seulement. Build, captures et audit lancés sur `dist/bergerie-lives/awwwards/` servi en local (port 4502, arrêté ensuite). Aucun fichier source modifié.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/bergerie-lives/awwwards/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/home/planche.png` |
| Le domaine `/bergerie-lives/awwwards/le-domaine/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/bergerie-lives-item/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/bergerie-lives-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue2/404/planche.png` |

Remarque : la commande `planche.py --largeur 480` a été lue comme un fichier (`ignoré 480`) ; les planches ont été produites sans cette option (1920 x 5280 px, 19 images chacune).

## Chiffres par page (report.json)

| Mesure | Accueil | Le domaine | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious) | 0 (0 serious) | 1 (serious : color-contrast, 2 nœuds) |
| Contraste à vérifier (axe) | 21 | 20 | 0 |
| CLS desktop | 0.009 | 0.001 | 0 |
| LCP desktop (ms) | 80 | 148 | 36 |
| CLS mobile | 0.016 | 0.005 | 0 |
| LCP mobile (ms) | 2408 | 1864 | 232 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Piège clavier | non | non | non |
| Lien d'évitement en premier | non | non | non |

Notes du rapport : FPS desktop mesuré sur GPU logiciel (plancher). Mobile à 4x de ralentissement CPU, 4G lente.

## Audit (audit.mjs)

- Sortie : `0 FAIL, 2 WARN`.
- WARN : « no robots.txt », « no sitemap » (site).
- Pages crawlées : 4 ; poids de la page la plus lourde `/bergerie-lives/awwwards/` : ~1864 KB (HTML 5, JS 60 gz, CSS 5 gz, polices 60, images 1733).
- Journal complet : `/home/user/KYW-test-restaurant/.logs/bergerie-lives-awwwards-revue2-audit.log`.
