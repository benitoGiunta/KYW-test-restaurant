# QA revue 2 — li-micougni (awwwards)

Source : `dist/li-micougni/awwwards/` servi sur http://127.0.0.1:4502 (serveur arrêté après la passe). Build : OK (5 pages, exit 0).

## Dossiers de captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| / (accueil) | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/home/ | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/home/planche.png |
| /carte/ (fiche) | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/li-micougni-item/ | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/li-micougni-item/planche.png |
| 404 (page manquante) | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/404/ | /home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue2/404/planche.png |

## Chiffres (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (40 contrastNeedsReview) | 0 (52 contrastNeedsReview) | 2 (serious) : `document-title`, `html-has-lang` |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 88 (img) | 160 (span.demi__h) | 52 (pre) |
| LCP mobile (ms) | 2392 (img) | 2244 (img) | 248 (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible / sans focus visible / lien d'évitement en premier / bloqué | non / non / non / non | non / non / non / non | non / non / non / non |
| Survol : changement couleur seul / sans changement / curseur | 0 / 0 | 0 / 0 | 0 / 0 |
| Mouvement réduit : éléments en mouvement / texte masqué | non / 0 | non / 0 | non / 0 |

Notes : le rapport 404 indique « 404 page has no <h1> » dans l'audit. Le shoot a capturé 3 dossiers ; l'audit indique 4 pages crawlées (pas de dossier correspondant au quatrième).

## Audit (audit.mjs)

- Lignes FAIL : aucune (0 FAIL).
- WARN : 3
  - `404 page has no <h1> (design it: a way back, in the site voice)`
  - `no robots.txt`
  - `no sitemap`
- Poids de la page la plus lourde : ~986 KB (html 5, JS 60 gz, CSS 6 gz, fonts 72, images 842).

## Pour mémoire

Journaux : `.logs/li-micougni-awwwards-revue2-*.log`. Aucun fichier source modifié, aucun commit.
