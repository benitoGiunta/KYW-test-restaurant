# QA revue 2 : maison-des-desserts-legacy (faits)

Build : `dist/maison-des-desserts/legacy/` (6 pages, sans erreur). Serveur local port 4503, arrêté après usage.
Captures : `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/` (sommaire : `summary.json`, même dossier).
Audit : `/home/user/KYW-test-restaurant/.logs/maison-des-desserts-legacy-revue2-audit.log`.

## Pages capturées (3 sur 5 crawlées)

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/maison-des-desserts/legacy/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/home/planche.png` |
| Carte `/carte` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/maison-des-desserts-item/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/maison-des-desserts-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-revue2/404/planche.png` |

Galerie, jobs et contact sont crawlés par l'audit mais n'ont pas de dossier de captures.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 : `color-contrast`, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, 4,5:1 requis) |
| LCP desktop (ms) | 556 (img) | 360 (p.desc) | 36 (p) |
| CLS desktop | 0,007 | 0,001 | 0 |
| LCP mobile throttled (ms) | 996 (img) | 912 (p.lead) | 224 (p) |
| CLS mobile | 0,045 | 0 | 0 |
| FPS scroll mobile | 60 | 61 | 61 |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites (desktop) | 2 : « Voir à la carte » 100x21, « 081 22 74 51 93 » 93x21 | 1 : « Télécharger la carte d'o… » 273x18 | 1 : « la page d'accueil » 128x20 |
| Cibles tactiles petites (mobile) | 0 | 0 | 0 |
| Éléments cachés / texte réduit | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus bloqué | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 2 | 1 | 2 |
| Mouvement réduit (reduced motion) | non | non | non |

Note du rapport : les FPS desktop tournent sur GPU logiciel headless (plancher, non mesure réelle) ; les chiffres mobile sont ceux à retenir (4x CPU, 4G lente).

## Audit (audit.mjs, 5 pages crawlées)

- FAIL : 0
- WARN : 9
  - `/carte` : phrase répétée 2 fois « Petit déjeuner et sur le pouce »
  - `/galerie` : image sans width/height (décalage de mise en page)
  - site : pas de robots.txt
  - site : pas de sitemap (audit ; le build a pourtant créé `sitemap-index.xml`)
  - `/`, `/carte`, `/galerie`, `/jobs`, `/contact` : police TTF/OTF livrée (passer en woff2)
- Page la plus lourde : `/galerie`, environ 2009 KB (images 1893 KB, polices 103 KB)
- Erreurs de l'audit : aucune ligne « error » dans le journal.
