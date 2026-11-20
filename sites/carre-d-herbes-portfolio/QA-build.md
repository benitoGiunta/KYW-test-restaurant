# QA build : carre-d-herbes / portfolio (passe build, phase test)

## Statut
- Build : OK (7 pages, `dist/carre-d-herbes/portfolio/`, journal `.logs/carre-d-herbes-portfolio-build-build.log`).
- Serveur local : port 4501, démarré puis arrêté.
- Captures : INCOMPLÈTES. `shoot.mjs --crawl --nav` n'a produit que la page d'accueil (25 fichiers dans `.shots-carre-d-herbes-portfolio-build/home/`). Le processus est resté bloqué sur `home` pendant plus de 10 min, puis a été arrêté (sortie 144). Les autres pages n'ont pas été capturées.
- Audit (`audit.mjs`) : non exécuté (dépend des captures et du serveur, non relancé).

## Planches
- Accueil : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-build/home/planche.png` (13 vignettes desktop, généré à partir de `d-*.png`).
- Autres pages : aucune planche (pas de capture).

## Chiffres report.json
- Aucun report.json produit (le shoot n'est pas allé à son terme).
- Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés, clavier : non mesurés.

## Audit
- FAIL : non mesuré.
- WARN : non mesuré.

## Pour relancer
- Relancer le shoot seul sur l'accueil d'abord (`shoot.mjs <url> --out …` sans `--crawl`) pour localiser la boucle, puis les pages une à une.

## Remarques
- `git status` montre `pnpm-lock.yaml` modifié (hors périmètre de cette passe, non commité).
- Garde-fou sobriété : `curl` nu refusé par le hook, il faut passer par `scripts/q.sh`.
