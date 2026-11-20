# QA revue 2 — le-lodge-wepion / legacy (faits)

Build : `sites/le-lodge-wepion-legacy` → `dist/le-lodge-wepion/legacy/` (rc 0).
Serveur local : `dist` sur 127.0.0.1:4503, arrêté après les captures.
Captures : `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-legacy-revue2/` (récapitulatif : `summary.json`).
Journaux : `.logs/le-lodge-wepion-legacy-revue2-{build,shoot,audit,planche-*}.log`.

## Pages

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-lodge-wepion/legacy/` | `.shots-le-lodge-wepion-legacy-revue2/home/` | `.shots-le-lodge-wepion-legacy-revue2/home/planche.png` |
| Cookies | `/le-lodge-wepion/legacy/cookies/` | `.shots-le-lodge-wepion-legacy-revue2/le-lodge-wepion-item/` | `.shots-le-lodge-wepion-legacy-revue2/le-lodge-wepion-item/planche.png` |
| 404 | URL inconnue (`__shoot-missing-page-…`) | `.shots-le-lodge-wepion-legacy-revue2/404/` | `.shots-le-lodge-wepion-legacy-revue2/404/planche.png` |

Le crawl a trouvé 2 pages (accueil, cookies) ; la page 404 a été capturée à part (3 dossiers au total).

## Chiffres par page (report.json)

| Indicateur | Accueil | Cookies | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| CLS bureau / mobile | 0,021 / 0,094 | 0,001 / 0,002 | 0 / 0 |
| LCP bureau / mobile (ms) | 376 / 896 | 412 / 680 | 36 / 216 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 1 / 0 | 0 / 0 | 1 / 1 |
| FPS défilement mobile | 60 | 60 | 61 |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège (stuck) / lien d'évitement en premier | non / non | non / non | non / non |
| Mouvement réduit : texte masqué / animations | 0 / non | 0 / non | 0 / non |

Détails utiles :
- Accueil : H1 « Brasserie et tea-room sur la Meuse » ; cible petite bureau : « 0496 92 55 13 » (100×17 px).
- 404 : violation `color-contrast` sur `.kyw-footer__note` et `span` (`#6b787d` sur `#fbfaf8`, 4,36:1, minimum 4,5:1) ; cible petite : « la page d'accueil » (128×20 px) en bureau et en mobile.
- Cookies : H1 « Cookies » ; aucune cible petite.
- Notes du rapport : les FPS bureau tournent en headless sur GPU logiciel (plancher, pas une mesure) ; les chiffres mobiles sont à 4× de ralentissement CPU, slow 4G.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 17 (2 pages crawlées, poids le plus lourd ≈ 942 Ko)

Liste des WARN :
- Accueil : twitter:card manquant ; 4 polices TTF/OTF livrées (format woff2 attendu) ; polices 376 Ko.
- Cookies : meta description de 32 caractères (cible 50 à 160) ; pas de lien canonique ; twitter:card manquant ; 4 polices TTF/OTF ; polices 376 Ko.
- Site : pas de robots.txt ; pas de sitemap (sitemap-index.xml et sitemap-0.xml présents dans `dist/le-lodge-wepion/legacy/`, à vérifier : l'audit ne les trouve pas à la racine du site).
