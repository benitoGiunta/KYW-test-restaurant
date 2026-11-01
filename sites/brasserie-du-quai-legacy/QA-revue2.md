# QA revue 2 — brasserie-du-quai-legacy

Étape : captures (agent Haiku). Source : `dist/brasserie-du-quai/legacy/` (build du 01/11/2026, 17:27).
Serveur : `http://127.0.0.1:4503/brasserie-du-quai/legacy/`.

## Serveur

- Le port 4503 était déjà occupé par un processus préexistant (PID 27527, lancé 17:03, même commande `serve.mjs dist --port 4503`, même dépôt). Notre lancement a échoué (`EADDRINUSE`, journal `.logs/serve-legacy.log`).
- Le processus 27527 n'a pas été arrêté : il ne nous appartient pas.
- Vérification : il lit `dist/` à chaque requête (`cache-control: no-cache`) ; le HTML de la page d'accueil servi a le même md5 que `dist/brasserie-du-quai/legacy/index.html` (`0f9d0e778d6c4367e5ccb24385a10c5a`). Les captures et l'audit portent donc sur le build courant.

## Captures et planches

Le shoot a produit 3 dossiers de pages ; l'audit a crawlé 6 pages (voir audit).

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-du-quai/legacy/` | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/home/planche.png` (13 desktop + 6 mobile) |
| Fiche `/brasserie-du-quai/legacy/reservation/` | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/brasserie-du-quai-item/` | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/brasserie-du-quai-item/planche.png` (13 desktop + 6 mobile) |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-brasserie-du-quai-legacy-revue2/404/planche.png` (8 desktop + 6 mobile) |

Les planches ont 4 colonnes de 480 px (largeur 1920 px). Note d'outil : `scripts/planche.py` lit `4` et `480` comme fichiers et écrit « ignoré » dans la sortie ; le résultat est correct.

## Chiffres par page (report.json)

| Mesure | Accueil | Fiche réservation | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 0 | 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| Axe : contraste à vérifier | 12 | 3 | 0 |
| LCP desktop | 272 ms | 156 ms | 48 ms |
| CLS desktop | 0 | 0,024 | 0 |
| LCP mobile | 1312 ms (`h1#hero-titre`) | 960 ms | 276 ms |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments hors cadre (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites (desktop / mobile) | 0 / 0 | 0 / 1 | 0 / 0 |
| `settledMs` desktop / mobile | 3281 / 4784 ms | 2420 / 3561 ms | 2241 / 2364 ms |
| FPS défilement desktop / mobile | 60 / 61 | 60 / 61 | 60 / 60 |
| H1 présents | 1 | 1 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles testées | 7 | 6 | 0 |
| Survol : sans changement | 1 (`h-07` « La Brasserie du Quai ») | 2 (`h-04` « La Brasserie du Quai », `h-05` « Réservation ») | 0 |
| Survol : changement de couleur seul | 5 | 3 | 0 |
| Mouvement réduit : écran encore animé à 1,5 s | non | non | non |

Détail utile :
- Accueil, cible tactile mobile : aucune.
- Fiche réservation, cible tactile mobile trop petite : `081 65 70 03` (104×22 px).
- Accueil, survol « couleur seule » : `h-01` « Réserver une table », `h-03` « Voir le banc d'écailler », `h-04` « Itinéraire dans Google Maps », `h-05` « Réserver une table », `h-06` « 9 rue du Quai, 5000 Namur ».
- Fiche réservation, survol sans changement : `h-02` « Réserver en ligne », `h-03` « 9 rue du Quai, 5000 Namur », `h-06` « Réserver ».
- Mesures desktop : le rendu headless tourne sur GPU logiciel ; les FPS desktop sont un plancher.

## Audit (`audit.mjs`)

- 6 pages crawlées ; page la plus lourde : `/brasserie-du-quai/legacy/galerie/` (~2079 KB ; images 2041 KB).
- Lignes FAIL : aucune (0 FAIL).
- Nombre de WARN : 4.
  - Titre de `/brasserie-du-quai/legacy/` : 71 caractères (limite 70).
  - Page 404 : pas de `<h1>`.
  - Pas de `robots.txt`.
  - Pas de `sitemap` (détecté par l'audit ; `dist/` contient pourtant `sitemap-index.xml` et `sitemap-0.xml`).

## Journaux

- Build : `.logs/brasserie-du-quai-legacy-revue2-build.log` (exit 0)
- Shoot : `.logs/brasserie-du-quai-legacy-revue2-shoot.log` (exit 0)
- Audit : `.logs/brasserie-du-quai-legacy-revue2-audit.log` (exit 0)
- Planches : `.logs/brasserie-du-quai-legacy-revue2-planche.log` (exit 0)
