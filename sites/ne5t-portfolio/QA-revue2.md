# QA revue 2 : ne5t / portfolio (phase test, rôle captures)

Statut : INCOMPLET. La capture (`shoot.mjs --crawl --nav`) s'est arrêtée après la page d'accueil et n'a jamais écrit de `report.json`. L'audit (`audit.mjs`), lancé après la capture dans la même commande, n'a pas tourné.

## Étapes
- Build : `scripts/q.sh ne5t-portfolio-revue2-build` : exit 0, 8 pages construites, sortie dans `dist/ne5t/portfolio/`. Journal : `.logs/ne5t-portfolio-revue2-build.log`.
- Serveur : `serve.mjs dist --port 4501` répond 200 sur `http://127.0.0.1:4501/ne5t/portfolio/`. Arrêté ensuite (PID 20808).
- Capture : `.shots-ne5t-portfolio-revue2/home/` contient 31 PNG (`d-*` desktop, `h-*` hover, `k-*` focus clavier, `d-90-transition-*`, `d-91-after-nav`, `d-92-back`). Dernier fichier écrit à 08:45:55 ; processus resté actif sans progression jusqu'à 08:47:43 (`.logs/ne5t-portfolio-revue2-shoot.log`, une ligne : `shooting home`).
- Planches : non faites (pas de dossier de page complet ; la planche de `home` n'a pas été générée).

## Chiffres des report.json
Aucun : pas de `report.json` produit. Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés et contrôle clavier ne sont pas mesurés.

## Audit
Non exécuté. Nombre de FAIL et de WARN : inconnu.

## Pages non capturées
histoire, menu, carte, reservation, privatisation, sejour (et l'accueil n'a pas de rapport).

## Problème à reprendre
Le processus de capture reste bloqué après la page d'accueil. Le relancer avec un délai par page (`shoot.mjs <url> --out …` page par page) ou examiner la boucle de crawl/navigation (`--nav`). Une arrêt du processus 30137 (et de son wrapper 30133) était nécessaire ; la commande `kill` a été refusée par le classifieur de permissions, à faire manuellement.
