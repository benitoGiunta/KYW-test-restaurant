# QA build : dumont-bouge / portfolio (phase test, passe build)

Build : `sites/dumont-bouge-portfolio` → `dist/dumont-bouge/portfolio/`, exit 0, 6 pages (404, brunch, carte, index, maison, reservation).
Serveur local : `dist` sur 127.0.0.1:4501 (arrêté après la QA).

## Captures et planches

| Dossier de captures | Planche | Page | Contenu |
|---|---|---|---|
| `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/home/planche.png` | accueil `/dumont-bouge/portfolio/` | 13 d-*, h-01 à h-07 (repos et survol), 39 fichiers au total |
| `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/dumont-bouge-item/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/dumont-bouge-item/planche.png` | carte `/dumont-bouge/portfolio/carte/` | 39 fichiers |
| `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-portfolio-build/404/planche.png` | 404 (`/__shoot-missing-page-*`) | 27 fichiers |

Le crawl de `shoot.mjs` a capturé 3 pages (accueil, carte, 404). `audit.mjs` a crawlé 5 pages (les chemins de l'audit sont listés ci-dessous). Les pages brunch, maison et réservation n'ont pas de dossier de captures.

Planches : `planche.py` a affiché `ignoré 4`, `ignoré 480` (`--colonnes` et `--largeur` non reconnus, appelés comme fichiers). La planche a été produite à la largeur par défaut, 1920 px, 19 images pour l'accueil et la carte, et 4 colonnes par défaut pour le 404.

## Chiffres par page (report.json)

| Indicateur | accueil | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations | 0 | 0 | 1 (`color-contrast` x2, sérieux : `.kyw-footer__note` et un span, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe, à vérifier (contraste) | 35 | 18 | 0 |
| CLS bureau | 0,052 | 0 | 0 |
| LCP bureau (ms) | 136 (h1#titre.hero__nom) | 120 (img) | 60 (p) |
| CLS mobile (throttled) | 0,024 | 0 | 0 |
| LCP mobile (ms, throttled) | 1432 (h1#titre.hero__nom) | 1964 (img) | 276 (p) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (GL) | 0 | 0 | 0 |
| Cibles tactiles petites (bureau) | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Cibles hover | 7 | 7 | 2 |
| Cibles hover sans changement | 0 | 0 | 2 (h-01 « la page d'accueil », h-02 « Réalisé par ») |
| Arrêts clavier | 12 | 12 | 3 (le focus quitte la page après « Réalisé par ») |
| Focus clavier non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Mouvement réduit (texte caché / mouvement) | 0 / non | 0 / non | 0 / non |
| Mouvement au repos | oui (au top) | non | non |
| FPS défilement bureau (logiciel) | 56 | 60 | 60 |
| FPS défilement mobile | 43 | 51 | 60 |
| Hauteur de page bureau (px) | 8835 | 19052 | 900 |

Titres : accueil « Dumont Bouge | Boulangerie, pâtisserie et tea-room », carte « La carte | Dumont Bouge », 404 « Page introuvable · KYW ». Un seul h1 par page.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 10
  - accueil : 2 tirets em/en dans le texte visible ; phrase répétée 2 fois « 9h Le pain et la vitrine »
  - carte : 1 tiret em/en ; 4 phrases répétées 2 fois (« Banane, chocolat chaud, chantilly 12,00 € », « Mikado 12,50 €… », « Dumont 12,00 €… », « Comédie française 10,80 €… »)
  - brunch : 1 phrase répétée 2 fois « sauce : poivre vert, béarnaise ou Sambre-et-Meuse +3,50 €. »
  - site : pas de robots.txt ; pas de sitemap (le build a pourtant écrit `sitemap-index.xml` dans `sites/dumont-bouge-portfolio/dist`)
- Pages crawlées : 5. Page la plus lourde : `/dumont-bouge/portfolio/`, ~1142 Ko (html 7, JS 14 gz, CSS 7 gz, polices 110, images 1004).

## Remarques factuelles

- Une première tentative de capture a échoué (`ERR_CONNECTION_REFUSED`) : le serveur n'avait pas été lancé. Il a été relancé et la capture refaite.
- Le 404 est la seule page avec une violation axe (contraste du pied de page KYW, `kyw-footer__note`).
