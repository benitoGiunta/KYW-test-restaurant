# QA revue 1 — le-royal / portfolio (faits)

Build : `sites/le-royal-portfolio` → `dist/le-royal/portfolio/` (7 pages, exit 0).
Serveur local : `http://127.0.0.1:4501/le-royal/portfolio/` (arrêté après la passe).
Journaux : `.logs/le-royal-portfolio-revue1-{build,shoot,audit}.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-royal/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/home/planche.png` |
| Carte (`/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/le-royal-item/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/le-royal-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-revue1/404/planche.png` |

Note : `shoot.mjs --crawl` n'a produit que 3 dossiers (accueil, carte, 404). Les pages formules, histoire, terrasse et réservation ne sont pas capturées dans cette passe ; l'audit les couvre (voir ci-dessous).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console / requêtes en échec | 0 / 0 | 0 / 0 | 0 / 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`, sur `<html>`) |
| Contraste à vérifier (axe, needs review) | 60 | 99 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau / mobile (ms) | 152 / 1100 | 60 / 1104 | 44 / 228 |
| Load bureau / mobile (ms) | 131 / 3344 | 100 / 1977 | 38 / 216 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites (bureau / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments de texte cachés (réduction de mouvement) | 0 | 0 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Survol : cibles sans changement visible | 1 | 0 | 0 |

Accueil : réduction de mouvement — mouvement détecté : non ; mouvement inactif au repos : oui. Pas de WebGL (`glOn` false) sur les trois pages.

## Audit (`audit.mjs`, 6 pages explorées)

Ligne de bilan : `0 FAIL, 12 WARN`. Pages explorées : accueil, carte, formules, histoire, terrasse, réservation. Page la plus lourde : `/terrasse/` (~1367 KB ; images 1185 KB, polices 111 KB, JS 62 KB gz, CSS 6 KB gz).

Lignes FAIL : aucune.

Lignes WARN (12) :
- `/le-royal/portfolio/` : description méta de 178 caractères (cible 50-160).
- Phrase répétée 2x « Cuisine ouverte 7 jours sur 7, de 12h à 14h30 et de 18h à 22h » : accueil, carte, formules, terrasse, histoire, réservation.
- Phrase répétée 2x « Extraits de la carte des boissons. » : accueil, carte.
- Site : la page 404 n'a pas de `<h1>`.
- Site : pas de `robots.txt`.
- Site : pas de `sitemap`.

Remarque : le sitemap est pourtant généré par le build (`sitemap-index.xml` dans `sites/le-royal-portfolio/dist`) ; l'audit ne le trouve pas à l'URL servie par le serveur local de cette passe.
