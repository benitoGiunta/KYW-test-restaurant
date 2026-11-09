# QA revue 1 : ferme-blanche-d-asie-legacy (captures)

Build : `dist/ferme-blanche-d-asie/legacy/` (exit 0, 6 pages). Serveur local `dist` sur le port 4503, arrêté après capture.
Capture : `shoot.mjs --crawl --nav` (3 pages). Audit : `audit.mjs` sur `http://127.0.0.1:4503/ferme-blanche-d-asie/legacy/`.

## Pages

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /ferme-blanche-d-asie/legacy/ | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/home/ | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/home/planche.png |
| Carte (menu) | /ferme-blanche-d-asie/legacy/menu | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/ferme-blanche-d-asie-item/ | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/ferme-blanche-d-asie-item/planche.png |
| 404 | /__shoot-missing-page (page absente) | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/404/ | /home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/404/planche.png |

Résumé global : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-revue1/summary.json`.
Journaux : `.logs/ferme-blanche-d-asie-legacy-revue1-*.log`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 (45 contraste « à vérifier ») | 0 (0 à vérifier) | 2 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments cibles trop petits | 0 | 0 | 0 |
| Texte caché réduit | 0 | 0 | 0 |
| Mouvement réduit | non | non | non |
| LCP desktop (ms) | 148 | 116 | 40 |
| LCP mobile (ms, throttlé) | 988 | 828 | 244 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 61 / 61 | 61 / 60 | 61 / 61 |
| Hauteur page desktop (px) | 6043 | 2936 | 900 |
| Titre H1 | « La Ferme Blanche d’Asie » | « La carte » | aucun |
| Titre `<title>` | présent | présent | vide |
| Clavier : arrêts de focus | 12 | 12 | 0 (focus sorti de la page) |
| Focus invisible / bloqué | 0 / non | 0 / non | 0 / non |
| Survol : sans changement / couleur seule / couvertes | 1 / 5 / 0 | 1 / 5 / 0 | aucune cible |

Violations axe 404 : `document-title` et `html-has-lang` (sérieuses).
Note outil : `--nav` n'a pu cliquer aucun lien sur la 404 (« tried none found »).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 7
  - `/ferme-blanche-d-asie/legacy/` : phrase répétée 5 fois, « 12 h 00 à 14 h 30 et 18 h 00 à 23 h 00 »
  - `/ferme-blanche-d-asie/legacy/reserve` : même phrase répétée 5 fois
  - `/ferme-blanche-d-asie/legacy/contact` : « Ouvert tous les jours, midi et soir. » répété 2 fois
  - `/ferme-blanche-d-asie/legacy/contact` : « 12 h 00 à 14 h 30 et 18 h 00 à 23 h 00 » répété 5 fois
  - site : la page 404 n'a pas de `<h1>`
  - site : pas de robots.txt
  - site : pas de sitemap (audit ; le build a pourtant généré `sitemap-index.xml` dans `sites/ferme-blanche-d-asie-legacy/dist`)
- Poids : page la plus lourde `/ferme-blanche-d-asie/legacy/photos` (~2164 KB ; 2099 KB d'images, 56 KB de polices).
