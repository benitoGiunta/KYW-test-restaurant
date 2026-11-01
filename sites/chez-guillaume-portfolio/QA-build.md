# QA build : chez-guillaume / portfolio (passe captures, incomplète)

## Étapes
- Build (`scripts/build-site.mjs`) : exit 0, 7 pages construites (404, agenda, carte, histoire, index, privatisation, reservation). Journal : `.logs/chez-guillaume-portfolio-build-build.log`.
- Serveur statique `dist` sur le port 4501 : répond HTTP 200 sur `/chez-guillaume/portfolio/`. Arrêté en fin de passe.
- Captures (`shoot.mjs --crawl --nav`) : **non terminées**. Le processus tournait encore plus de 5 minutes après son lancement et n'avait produit que la page d'accueil (31 fichiers dans `.shots-chez-guillaume-portfolio-build/home/`). Journal : `.logs/chez-guillaume-portfolio-build-shoot.log`, dernière ligne « shooting home ».
- Audit (`audit.mjs`) : non lancé (dépend d'une capture terminée et du serveur).
- Planches (`scripts/planche.py`) : non produites.

## Pages
- Accueil : dossier `.shots-chez-guillaume-portfolio-build/home/`, planche absente.
- Autres pages : aucune capture.

## Chiffres report.json
Aucun report.json produit : pas de chiffres à extraire (erreurs console, requêtes en échec, violations axe, CLS, LCP, débordement, éléments cachés, clavier).

## Audit
Non exécuté : nombre de FAIL et de WARN inconnu.
