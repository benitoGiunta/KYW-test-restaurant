# QA revue 1 — tariki / awwwards (captures)

Build : `scripts/q.sh tariki-awwwards-revue1-build` → exit 0, `dist/tariki/awwwards/`.
Serveur : `dist/` sur 127.0.0.1:4502, arrêté en fin de passe.
Journaux : `.logs/tariki-awwwards-revue1-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/tariki/awwwards/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/home/planche.png` |
| Carte `/tariki/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/tariki-item/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/tariki-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue1/404/planche.png` |

Le crawl de l'audit a trouvé 4 pages (dont `/tariki/awwwards/reservation/`) ; le shoot n'en a capturé que 3 (la page réservation n'est pas dans le dossier de captures).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 (`errors` vide) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 règle `color-contrast` (2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Contrastes à revoir (axe) | 16 | 8 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 128 | 156 | 40 |
| LCP mobile throttlé (ms) | 2052 | 1928 | 220 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| FPS défilement desktop / mobile | 60 / 56 | 60 / 60 | 61 / 60 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : lien d'évitement en premier | non | non | non |
| Survol : cibles / changements de couleur seule | 7 / 1 | 7 / 3 | 2 / 0 |

Note : FPS desktop headless = GPU logiciel (indicatif). Mobile = 4x CPU, 4G lente (LCP/CLS mobile indicatifs).

## Audit (audit.mjs)

Résultat : **0 FAIL, 4 WARN** (4 pages crawlées).

- WARN `/tariki/awwwards/` : phrase répétée 4 fois « 11 h 30 à 14 h »
- WARN `/tariki/awwwards/reservation/` : phrase répétée 4 fois « 11 h 30 à 14 h »
- WARN `site` : pas de robots.txt
- WARN `site` : pas de sitemap

Poids de la page la plus lourde (`/tariki/awwwards/`) : ~267 Ko ; HTML 4, JS 61 (gz), CSS 7 (gz), polices 76, images 119.

## Faits à noter pour la revue suivante

- Violation axe `color-contrast` sur le pied de page de la page 404 (`.kyw-footer__note`, `span`).
- Le lien d'évitement (« skip link ») n'est pas le premier arrêt clavier sur les trois pages.
- Le shoot n'a pas couvert `/tariki/awwwards/reservation/`.
- Le script `planche.py` traite `--colonnes`/`--largeur` correctement ; il affiche des messages « ignoré » pour les valeurs numériques passées comme fichiers (sans effet sur la planche, 1920 px = 4 × 480).
