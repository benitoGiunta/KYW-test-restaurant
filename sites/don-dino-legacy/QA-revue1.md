# QA revue 1 : don-dino / legacy

Build : `sites/don-dino-legacy` → `dist/don-dino/legacy/` (exit 0, 7 pages). Serveur local port 4503, arrêté après la capture.
Journaux : `.logs/don-dino-legacy-revue1-*.log`.

## Captures par page

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /don-dino/legacy/ | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/home/planche.png` |
| Carte | /don-dino/legacy/carte/ | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/don-dino-item/` | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/don-dino-item/planche.png` |
| 404 | /__shoot-missing-page-… | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/404/planche.png` |

Le crawl a relevé 6 pages ; le résumé est dans `/home/user/KYW-test-restaurant/.shots-don-dino-legacy-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 1 (serious) : `color-contrast`, 2 nœuds |
| Contraste à vérifier | 0 | 0 | 0 |
| LCP desktop | 448 ms (h1#hero-t) | 468 ms (p.lead) | 68 ms (p) |
| LCP mobile | 852 ms (h1#hero-t) | 960 ms (p.lead) | 240 ms (p) |
| CLS desktop | 0,007 | 0 | 0 |
| CLS mobile | 0,002 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px desktop | 5 | 4 | 1 |
| Cibles tactiles < 24 px mobile | 0 | 0 | 1 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus bloqué | non | non | non |

Cibles desktop < 24 px (accueil) : « Voir la carte complète » 167x22, « +32 81 74 15 60 » 109x22, « Facebook » 72x22, « rejoignez l'équipe » 132x22, « visite virtuelle » 105x22.
Cible mobile 404 : « la page d'accueil » 128x20.
Champ `keyboard.skipLinkFirst` : false sur les trois pages (premier arrêt relevé : « Aller au contenu » sur l'accueil et la carte).
Sur la 404, la séquence clavier se termine par « focus left the page » après le lien « la page d'accueil » et « Réalisé par ».

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 48 WARN** (journal : `/home/user/KYW-test-restaurant/.logs/don-dino-legacy-revue1-audit.log`).
- Exemples de WARN : `missing og:title`, `missing og:description`, `missing og:image`, `missing twitter:card` sur `/don-dino/legacy/`.
- Poids de la page la plus lourde : ~756 KB (HTML 5, JS 1, CSS 5 en gz ; polices 286, images 458).
