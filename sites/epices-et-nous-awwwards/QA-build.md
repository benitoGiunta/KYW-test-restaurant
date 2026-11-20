# QA build : epices-et-nous / awwwards (phase test, passe build, rôle captures)

Build : `scripts/build-site.mjs sites/epices-et-nous-awwwards` → `dist/epices-et-nous/awwwards/` (exit 0, 5 pages, journal `.logs/epices-et-nous-awwwards-build-build.log`).
Serveur : `serve.mjs dist --port 4502`, arrêté après usage (PID 3264).
Captures : `.shots-epices-et-nous-awwwards-build/` (shoot `--crawl --nav`, 3 dossiers de page, journal `.logs/epices-et-nous-awwwards-build-shoot.log`).
Audit : `.logs/epices-et-nous-awwwards-build-audit.log`, crawl de 4 pages.

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/epices-et-nous/awwwards/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/home/planche.png` |
| Carte | `/epices-et-nous/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/epices-et-nous-item/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/epices-et-nous-item/planche.png` |
| 404 | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-awwwards-build/404/planche.png` |

Note : `scripts/planche.py` prend les options `--colonnes` et `--largeur` sous forme de paires ; leurs valeurs (`4`, `480`) sont signalées « ignorées » comme images, mais la planche est bien produite en 4 colonnes de 480 px (1920 px de large, 19 vignettes chacune).

## Chiffres (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrast à vérifier 22) | 0 (serious 0, contrast à vérifier 25) | 1 : `color-contrast`, serious, 2 nœuds (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| CLS desktop / mobile | 0 / 0 | 0 / 0,008 | 0 / 0 |
| LCP desktop (ms) | 192 (`span.poster__g`) | 396 (`p.entete__texte`) | 32 (`p`) |
| LCP mobile (ms) | 956 (`p.voixsec__texte`) | 2124 (`p.entete__texte`) | 220 (`p`) |
| Load desktop / mobile (ms) | 169 / 2179 | 102 / 1956 | 18 / 405 |
| FPS desktop / mobile (worst frame ms) | 60 (17) / 60 (17) | 60 (17) / 60 (17) | 60 (17) / 60 (17) |
| Débordement horizontal | non / non | non / non | non / non |
| Éléments cachés (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles sous la taille (smallTargets) desktop | 7 (ex. « Voir la carte » 97×22, « La carte » 52×18, « Réservation » 76×18) | 6 | 1 (« la page d'accueil » 128×20) |
| Cibles tactiles sous la taille mobile | 7 | 6 | 1 |
| Clavier : arrêts sans focus visible / focus invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : lien d'évitement en premier | non (premier arrêt « Aller au contenu ») | non | non |
| Mouvement réduit : texte masqué / animation | 0 / non | 0 / non | 0 / non |

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 7 (résumé : « 0 FAIL, 7 WARN »)
  - `/epices-et-nous/awwwards/reservation/` : phrase répétée 2 fois, horaires du lundi au samedi (×5 lignes)
  - site : pas de `robots.txt`
  - site : pas de `sitemap`
- Page la plus lourde : `/epices-et-nous/awwwards/`, environ 1019 Ko (HTML 6, JS 61 gz, CSS 6 gz, polices 98, images 849).
- Le crawl a trouvé 4 pages (accueil, carte, réservation, 404) ; les captures portent sur 3 dossiers.
