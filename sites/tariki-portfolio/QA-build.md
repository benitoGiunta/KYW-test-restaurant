# QA build : tariki-portfolio (passe build, phase test)

Serveur local : `dist/` servi sur http://127.0.0.1:4501/tariki/portfolio/ (arrêté après les captures).
Build : `scripts/build-site.mjs sites/tariki-portfolio` OK (5 pages, sitemap créé dans `sites/tariki-portfolio/dist`).
Journaux : `.logs/tariki-portfolio-build-*.log`.

## Pages

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /tariki/portfolio/ | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/home/planche.png` |
| Carte | /tariki/portfolio/carte/ | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/tariki-item/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/tariki-item/planche.png` |
| 404 (page inexistante) | /__shoot-missing-page-… | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-build/404/planche.png` |

Note : le crawl `--nav` n'a visité que 3 pages (accueil, carte, 404) ; l'audit en a listé 4 (`histoire`, `reservation` apparaissent dans les avertissements de l'audit).
Les dossiers `histoire/` et `reservation/` ne sont pas présents dans les captures.

## Chiffres des report.json

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 (color-contrast, `.kyw-footer__note` et un `span`, 4,36:1 pour 4,5:1 requis) |
| Alertes axe « à vérifier » | 16 | 10 | 0 |
| CLS desktop / mobile | 0,001 / 0 | 0,001 / 0 | 0 / 0 |
| LCP desktop (ms) | 172 | 80 | 32 |
| LCP mobile (ms) | 1208 | 1084 | 220 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 1 (« Tariki » 33x18) | 0 / 1 (« Tariki » 33x18) | 1 / 1 |
| FPS défilement desktop / mobile | 53 / 39 | 53 / 43 | 61 / 60 |
| Survol sans changement | 0 | 0 | 2 (liens « la page d'accueil », « Réalisé par ») |
| Survol : curseur suiveur | oui | oui | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : texte masqué / animation | 0 / non | 0 / non | 0 / non |
| Mouvement au repos (idle) | oui (à 35 %) | oui (à 70 %) | non |

Remarques du rapport : les FPS desktop sont mesurés en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; les chiffres mobiles correspondent à un ralentissement CPU x4 en 4G lente.
Le rapport 404 montre `settledMs` à 2143 ms et « Page introuvable » en H1.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 7
  - Phrase répétée 8 fois, « 11 h 30 à 14 h, 18 h à 21 h » (accueil)
  - Phrase répétée 4 fois, même horaire (carte)
  - Phrase répétée 2 fois, « Tariki veut dire « mon chemin ». » (histoire)
  - Phrase répétée 4 fois, même horaire (histoire)
  - Phrase répétée 4 fois, même horaire (réservation)
  - Site : pas de robots.txt
  - Site : pas de sitemap (le sitemap existe pourtant dans `dist/` : `sitemap-index.xml` créé au build, à vérifier côté serveur)
- Pages explorées par l'audit : 4. Page la plus lourde : `/tariki/portfolio/`, environ 487 Ko (HTML 5, JS 9 gz, CSS 7 gz, polices 63, images 403).

## Points à noter (faits)

- Un seul échec axe sérieux : contraste du pied de page KYW sur la page 404 (4,36:1).
- Mobile : « Tariki » (lien du logo) fait 33x18 px sur les trois pages.
- Pas de captures `histoire/` ni `reservation/`, donc pas de planche pour ces pages.
