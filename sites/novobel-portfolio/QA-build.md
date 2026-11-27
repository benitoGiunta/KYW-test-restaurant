# QA build : novobel / portfolio (phase test, passe build)

Statut : INCOMPLET. Étapes 1 (build) OK ; étape 2 (serveur) OK ; étape 3 (captures) bloquée ; étapes 4 à 6 non faites.

## Build
- `scripts/q.sh novobel-portfolio-build-build` : exit 0, 7 pages (404, carriere, contact, index, maison, projets, services), `dist/novobel/portfolio/`.

## Captures
- Dossier : `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-build/`
- `home/` : 40 fichiers (d-*, h-*, k-*, m-*, transitions).
- `novobel-item/` : 21 fichiers, dernier `k-04-focus.png` (09:31:48) ; la capture s'est arrêtée sur `/services/` et n'a plus progressé pendant plus de 10 min.
- `404/` : vide. `summary.json` présent.
- Planches (`scripts/planche.py`) : non générées.
- report.json : non vérifiés.

## Audit (`audit.mjs`)
- Échec au premier contrôle : `FAIL site start page ... did not load as HTML`, `FAIL /novobel/portfolio/ HTTP fetch failed for an internal link`. Résultat : 2 FAIL, 0 WARN, 0 page crawlée.
- Cet échec provient d'un premier lancement où le serveur n'était pas encore démarré. Le relancement de l'audit n'a pas été fait, faute d'avoir pu terminer les captures.

## Pièges
- Le hook de sobriété refuse `curl -s -o` hors enveloppe ; le serveur doit être lancé en `nohup` et testé via `scripts/q.sh`.
- `shoot.mjs --crawl --nav` sur ce site dépasse 120 s ; à lancer en arrière-plan.
