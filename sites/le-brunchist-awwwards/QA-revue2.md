# QA revue 2 — le-brunchist / awwwards

Faits seulement (build, captures, audit). Build : `dist/le-brunchist/awwwards/`, serveur local `http://127.0.0.1:4502/le-brunchist/awwwards/`.

Journaux : `.logs/le-brunchist-awwwards-revue2-*.log`.

## Build

- `scripts/build-site.mjs sites/le-brunchist-awwwards` : exit 0, 5 pages construites (404, carte, histoire, accueil, réservation).

## Pages capturées

Dossiers de captures et planches (`planche.png`, 4 colonnes, 480 px) :

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-brunchist/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/home/planche.png` |
| Carte `/le-brunchist/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/le-brunchist-item/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/le-brunchist-item/planche.png` |
| Page 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue2/404/planche.png` |

Remarques sur la capture : `shoot.mjs --crawl --nav` n'a produit que ces trois dossiers. Histoire et réservation ne sont pas dans `.shots-le-brunchist-awwwards-revue2/`. Le script `planche.py` affiche « ignoré 4 » et « ignoré 480 » : il traite les valeurs des options comme des fichiers, sans effet sur la planche produite (19 images chacune).

## Chiffres des report.json

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 1 (`color-contrast`, serious, 2 nœuds) |
| Contraste à vérifier (axe) | 4 | 2 | 0 |
| LCP bureau (ms) | 80 | 136 | 40 |
| CLS bureau | 0 | 0 | 0 |
| LCP mobile (ms, throttled) | 944 (`p.hero__lede`) | 964 | 224 |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments débordants bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| FPS défilement mobile | 60 | 60 | 60 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : piège | non | non | non |
| Hover sans changement | 0 | 2 (« Carte », « 0474 06 92 27 ») | 2 (« la page d'accueil », « Réalisé par ») |

Détail : sur le 404, la violation `color-contrast` concerne 2 nœuds. Le bureau et le mobile ont chacun une cible de 128x20 px.

## Audit (`audit.mjs`)

- 4 pages explorées (« 4 pages crawled »), dont l'accueil et la réservation citées dans les WARN ; les deux autres ne sont pas nommées par l'audit.
- **0 FAIL, 8 WARN.**
- WARN répétition de phrase :
  - `/le-brunchist/awwwards/` : « 9 h 30 à 15 h 30 » répétée 5 fois.
  - `/le-brunchist/awwwards/reservation/` : « <jour> 9 h 30 à 15 h 30 » répétée 2 fois pour chacun des jours mercredi, jeudi, vendredi, samedi et dimanche (5 WARN).
- WARN site : pas de `robots.txt`, pas de sitemap.
- Poids de la page la plus lourde (`/le-brunchist/awwwards/`) : environ 135 Ko ; HTML 4, JS 61 (gz), CSS 6 (gz), polices 54, images 11.

## Planches

Aucune planche n'a été examinée visuellement dans ce passage : elles sont produites aux chemins indiqués ci-dessus.

## Arrêt

Serveur 4502 arrêté (PID 5974). Aucun fichier source modifié, aucun commit.
