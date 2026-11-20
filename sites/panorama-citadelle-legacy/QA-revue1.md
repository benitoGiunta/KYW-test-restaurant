# QA revue 1 — panorama-citadelle / legacy (captures, faits)

Build : `sites/panorama-citadelle-legacy` OK (exit 0, 5 pages, `dist/panorama-citadelle/legacy/`).
Serveur de test : `dist` sur 127.0.0.1:4503 (arrêté après usage).
Crawl audit : 4 pages (`/`, `/le-panorama/`, `/la-carte/`, `/reservation-contact/`).
Captures (`shoot.mjs --crawl --nav`) : 3 dossiers seulement (voir « Écarts »).

## Pages

### 1. Accueil `/panorama-citadelle/legacy/`
- Captures : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/home/` (report.json, d-*, m-*, h-*)
- Planche : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/home/planche.png` (1920×5280, 19 images)
- Console : 0 erreur ; requêtes en échec : 0
- Axe : 0 violation
- LCP : desktop 444 ms (img) ; mobile 896 ms (img, throttled)
- CLS : desktop 0.012 ; mobile 0.002
- Débordement horizontal : non (desktop et mobile)
- Éléments hors écran / cachés (offenders) : 0 (desktop et mobile)
- Cibles tactiles < seuil : desktop 2 (`groupes@panoramanamur.be` 226×19, `081 84 11 34` 95×19) ; mobile 3 (`Le Panorama` 133×20, idem ci-dessus)
- Clavier : 12 arrêts de focus ; focus non visible : 0 ; focus invisible : 0 ; piège : non ; lien d'évitement en premier : non (« Aller au contenu » présent en 1er arrêt)
- Défilement : 60 fps, pire frame 17 ms (desktop) ; 61 fps mobile

### 2. Le lieu `/panorama-citadelle/legacy/le-panorama/`
- Captures : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/panorama-citadelle-item/` (report.json, d-*, m-*, h-*)
- Planche : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/panorama-citadelle-item/planche.png` (1920×5280, 19 images)
- Console : 0 erreur ; requêtes en échec : 0
- Axe : 0 violation
- LCP : desktop 428 ms ; mobile 756 ms
- CLS : desktop 0.005 ; mobile 0.003
- Débordement horizontal : non
- Éléments hors écran (offenders) : 0
- Cibles tactiles < seuil : desktop 0 ; mobile 1
- Clavier : 12 arrêts ; focus non visible : 0 ; invisible : 0 ; piège : non

### 3. Page 404 `/__shoot-missing-page-…`
- Captures : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/404/` (28 fichiers)
- Planche : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue1/404/planche.png` (1920×5280, 19 images)
- Console : 0 erreur ; requêtes en échec : 0
- Axe : 1 violation `color-contrast` (impact serious), 2 nœuds
- LCP : desktop 40 ms ; mobile 220 ms ; CLS 0 / 0
- Débordement horizontal : non
- Cibles tactiles < seuil : desktop 1 ; mobile 1
- Clavier : 3 arrêts (« la page d'accueil », « Réalisé par », puis focus hors page) ; focus non visible : 0

### 4. La carte `/la-carte/` et 5. Réservation `/reservation-contact/`
- Pas de dossier de captures ni de planche (non produits par le shoot, voir « Écarts »).
- Données audit (`.logs/panorama-citadelle-legacy-revue1-audit.log`) : 5 WARN pour `la-carte`, 6 WARN pour `reservation-contact`.

## Audit (`audit.mjs`)
- FAIL : 0
- WARN : 24 au total (6 sur `le-panorama`, 5 sur `la-carte`, 6 sur `reservation-contact`, le reste sur l'accueil et le contrôle global)
- Exemples de WARN : fontes TTF/OTF livrées (« use woff2 ») sur `reservation-contact` (3 fichiers) ; fontes 376 KB (`reservation-contact`) ; poids de la page la plus lourde : `/le-panorama/` ~1416 KB (images 1030 KB, fontes 376 KB, CSS 5 fichiers gzip, JS 1 fichier gzip, HTML 4).

## Écarts
- `shoot.mjs --crawl --nav` n'a produit des dossiers que pour 3 pages (accueil, le-panorama, 404) alors que l'audit en crawle 4 (la-carte et reservation-contact absentes des captures). Cause non vérifiée.
- Une première tentative a échoué parce que le serveur n'était pas démarré (refus de connexion) ; le serveur a été relancé et les captures refaites. Seule la seconde série est conservée.
- `planche.py` : les valeurs `--colonnes 4 --largeur 480` ont été lues comme fichiers (avertissements « ignoré ») ; la planche a tout de même été produite à 1920 px de large (4 × 480).
