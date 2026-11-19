# QA build : pizzeria-doria / legacy (passe build, phase test)

Statut : INCOMPLET. Build OK ; captures interrompues ; audit non lancé ; planches non produites.

## Étapes
- Build (`scripts/build-site.mjs`) : exit 0, dist/pizzeria-doria/legacy/ écrit (5 pages : 404, contact, index, menu, vins).
- Serveur 4503 : démarré (PID 15994), arrêté.
- Captures (`shoot.mjs --crawl --nav`) : lancées, interrompues manuellement après blocage sur `/menu/` (aucun fichier écrit après 23:31:28, processus resté actif plusieurs minutes). Exit 144 à l'arrêt.
  - `.shots-pizzeria-doria-legacy-build/home/` : 36 fichiers (d-*, h-*, k-*, m-*), report.json présent.
  - `.shots-pizzeria-doria-legacy-build/pizzeria-doria-item/` : dossier partiel, pas de report.json.
  - `.shots-pizzeria-doria-legacy-build/404/` : vide (la première tentative a échoué, ERR_CONNECTION_REFUSED, serveur non démarré).
- Audit (`audit.mjs`) : non lancé.
- Planches (`planche.py`) : non produites.

## Chiffres extraits : home/report.json
- Erreurs console : 0 (`errors` vide). Requêtes en échec : 0 (`failed` vide).
- Desktop : LCP 472 ms (élément img), CLS 0, débordement horizontal false, éléments hors écran : 0, petites cibles : 0, FPS défilement 61 (pire trame 17 ms), hauteur 6540 px.
- Mobile (throttled) : LCP 792 ms (h1#hero-titre), CLS 0, débordement horizontal false, petites cibles : 0, FPS 60, hauteur 8746 px.
- Axe, clavier (k-*) : rapport axe non extrait (aucune donnée dans le rapport). Captures k-01 à k-04 présentes.

## Audit
- Lignes FAIL : non disponibles (audit non lancé).
- Nombre de WARN : non disponible.

## Reste à faire
1. Relancer les captures pour `menu`, `vins`, `contact`, `404` (une page à la fois via `shoot.mjs <url> --out ...`), serveur 4503 à redémarrer.
2. Lancer `audit.mjs` sur l'URL racine.
3. Produire les planches par dossier.
