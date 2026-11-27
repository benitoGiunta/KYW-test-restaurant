# QA revue 1 : ne5t, variante legacy (captures, faits seulement)

Build : `scripts/q.sh ne5t-legacy-revue1-build` (exit 0, 7 pages, `dist/ne5t/legacy/`).
Serveur : port 4503, déjà actif (PID 17481, cwd du dépôt, sert le même `dist/`). Non lancé par cette session, non arrêté.
Captures : `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/` (3 dossiers de pages).
Journal shoot : `.logs/ne5t-legacy-revue1-shoot.log` ; audit : `.logs/ne5t-legacy-revue1-audit.log`.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/ne5t/legacy/` | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/home/planche.png` |
| Fiche restaurant `/ne5t/legacy/restaurant/` | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/ne5t-item/` | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/ne5t-item/planche.png` |
| Page 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-ne5t-legacy-revue1/404/planche.png` |

Les planches font 1920 x 5280 px et contiennent 19 images chacune. Le script `planche.py` a ignoré les options `--colonnes` et `--largeur` (lues comme des fichiers), la largeur est donc celle par défaut (4 colonnes de 480 px).

## Chiffres (report.json)

| Mesure | Accueil | Fiche restaurant | 404 |
|---|---|---|---|
| Erreurs console | 1 (404 ressource, desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (11 contrastes à vérifier) | 0 (0 contrastes à vérifier) | 2 nœuds `color-contrast` (serious) |
| LCP desktop | 472 ms (img) | 596 ms (img) | 60 ms (p) |
| LCP mobile | 1792 ms (h1#titre) | 1604 ms (img) | 288 ms (p) |
| CLS desktop | 0 | 0.001 | 0 |
| CLS mobile | 0.029 | 0.001 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Cibles tactiles petites (desktop / mobile) | 8 / 2 | 8 / 0 | 1 / 1 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / absent | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : texte masqué / animation | 0 / non | 0 / non | 0 / non |

Détails utiles :
- Accueil, cibles petites : « 081 58 88 88 » (93 x 20 px), « info@ne5t.com » (111 x 20 px) en desktop et mobile.
- Fiche restaurant, cibles petites desktop : « 081 58 88 88 » (81 x 18 px), « Accueil » (54 x 20 px).
- 404, cible petite : « la page d'accueil » (128 x 20 px), desktop et mobile.
- 404, contraste (serious) : 2 nœuds `color-contrast`.
- Accueil, erreur console : `Failed to load resource: 404`. La ressource n'est pas identifiée dans le report.
- Accueil, mobile : `throttled` présent dans le rapport, FPS de défilement et chargements relevés dans `report.json`.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 68
- Tous les WARN relevés sont « ttf/otf font shipped (use woff2) » sur les pages de l'audit (fichiers `.ttf` servis par le site, 5 polices par page environ).
- Page la plus lourde : `/ne5t/legacy/histoire/` (environ 876 Ko ; 291 Ko de polices, 576 Ko d'images).
- L'audit a parcouru 6 pages (`--crawl`) ; le shoot a capturé 3 pages (accueil, fiche restaurant, 404) : les pages histoire, infos, spa, suites n'ont pas de dossier de captures.

## Points à noter (faits)

1. Un contraste insuffisant (`color-contrast`, serious) sur la page 404.
2. Une erreur 404 de ressource sur l'accueil, desktop.
3. Les numéros et adresses de contact (« 081 58 88 88 », « info@ne5t.com ») ont des cibles tactiles de moins de 24 px sur l'accueil et la fiche.
4. Aucune erreur de débordement horizontal, aucun focus clavier invisible.
5. Le CLS mobile de l'accueil est à 0.029 ; le LCP mobile de l'accueil est à 1792 ms (élément h1).
