# QA revue 1 : ne5t / awwwards (phase test, rôle captures)

Statut : INCOMPLET. Build OK. Captures interrompues en cours de route (le run `shoot.mjs --crawl --nav` n'a pas terminé après plus de 10 min, bloqué sur la page `carte/`). Audit non lancé. Planches non produites.

## Étapes
1. Build `scripts/q.sh ne5t-awwwards-revue1-build` : exit 0, 5 pages, sitemap créé. Journal `.logs/ne5t-awwwards-revue1-build.log`.
2. Serveur statique `dist` sur le port 4502 : répond HTTP 200 sur `/ne5t/awwwards/`. Arrêté en fin de passe.
3. Captures `shoot.mjs` : dossiers partiels `.shots-ne5t-awwwards-revue1/home/` (captures desktop d-00 à d-92, hover h-01/h-02) et `.shots-ne5t-awwwards-revue1/ne5t-item/` (en cours). Journal `.logs/ne5t-awwwards-revue1-shoot.log`.
4. Audit `audit.mjs` : non lancé.
5. Planches `scripts/planche.py` : non produites.

## Reste à faire
- Relancer `shoot.mjs` une fois la session libérée, avec un délai de plus de 10 minutes, ou page par page (`shoot.mjs <url> --out …`).
- Lancer `audit.mjs` sur `http://127.0.0.1:4502/ne5t/awwwards/` (serveur à relancer).
- Produire les planches par dossier et extraire les chiffres des `report.json`.

## Chiffres (non calculés)
Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés, clavier : à compléter après l'étape 3 terminée.
