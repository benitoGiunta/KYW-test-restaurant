# QA revue 1 — cafe-fleuri / portfolio (faits)

Build : `scripts/q.sh cafe-fleuri-portfolio-revue1-build` — exit 0, 6 pages (404, brunch, carte, histoire, index, reservation).
Serveur local : `dist` sur 127.0.0.1:4501 (arrêté). Base testée : `/cafe-fleuri/portfolio/`.
Captures : `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/`. Crawl : 5 pages, 3 dossiers de captures.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/cafe-fleuri/portfolio/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/home/planche.png` |
| Carte `/cafe-fleuri/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/cafe-fleuri-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue1/404/planche.png` |

## Chiffres (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 1 règle : color-contrast, serious, 2 nœuds (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Contrast à vérifier (axe needs review) | 36 | 19 | 0 |
| CLS desktop / mobile | 0,004 / 0,011 | 0,002 / 0,014 | 0 / 0 |
| LCP desktop (ms, élément) | 3036 (img) | 120 (p.lead) | 56 (p) |
| LCP mobile (ms, élément) | 8720 (img) | 1176 (p.lead) | 240 (p) |
| Chargement load desktop / mobile (ms) | 162 / 2758 | 155 / 2206 | 51 / 419 |
| FPS scroll desktop / mobile | 59 (pire trame 33 ms) / 44 (pire trame 67 ms) | 60 (17 ms) / 53 (33 ms) | 61 (17 ms) / 60 (17 ms) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (GL) desktop | aucun | aucun | aucun |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Clavier : focus invisible / sans focus visible / bloqué | aucun / aucun / non | aucun / aucun / non | aucun / aucun / non ; focus sorti de la page après « Réalisé par » (body) |
| Clavier : ordre des arrêts | Aller au contenu, Café Fleuri, Accueil, La carte, Brunch, Histoire, Nous trouver, 9h, 10h30, 12h, 14h, 16h (12 arrêts) | identique | 2 liens puis sortie |
| Survol | éléments interactifs réagissent (transform) | réagissent | 1 lien sans réaction |

Notes : le LCP mobile de l'accueil (8720 ms) est le chiffre le plus élevé ; la mesure desktop FPS est un plancher (rendu logiciel headless).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 8
  - 6 × « sentence repeated 2x » sur `/cafe-fleuri/portfolio/carte/` (libellés de carte : « Café et boissons chaudes exemple 3 € », « Pancakes au saumon… », « Plateau charcuterie… », « Limonade maison exemple 4,50 € framboise », « Thé glacé maison exemple 4,50 € pêche », « Prix relevé dans un guide ancien, à confirmer. »)
  - 1 × site : pas de robots.txt
  - 1 × site : pas de sitemap
- Page la plus lourde : `/cafe-fleuri/portfolio/histoire/` (~791 Ko ; 62 Ko JS gz, 7 Ko CSS gz, 110 Ko polices, 607 Ko images).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/cafe-fleuri-portfolio-revue1-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/cafe-fleuri-portfolio-revue1-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/cafe-fleuri-portfolio-revue1-audit.log`
