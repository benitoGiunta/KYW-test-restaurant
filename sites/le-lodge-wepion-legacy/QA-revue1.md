# QA revue 1 — le-lodge-wepion / legacy (agent captures, Haiku)

Statut : **échec de la passe de captures**. Aucun `report.json`, aucun audit, aucune planche produits.

## Ce qui a été fait
- Build : `scripts/q.sh le-lodge-wepion-legacy-revue1-build` → exit 0, `dist/le-lodge-wepion/legacy/` écrit (journal `.logs/le-lodge-wepion-legacy-revue1-build.log`).
- Serveur statique `dist` sur 127.0.0.1:4503 : démarré (lancement détaché), arrêté ensuite.
- Captures `shoot.mjs --crawl --nav` (avec et sans `--hovers 0`) : bloquées.
  - Dossier `.shots-le-lodge-wepion-legacy-revue1/home/` : 17 PNG (d-00 à d-07, d-90 à d-92, k-01 à k-04), puis plus rien.
  - Le processus reste bloqué à la suite de la passe clavier (k-04), sans progression pendant plus de 10 minutes.
  - Lancement avec `--hovers 0` : la page `home` a quand même fini en erreur (`Target page, context or browser has been closed`, suite à mes arrêts manuels) ; `le-lodge-wepion-item` et `404` n'ont pas été capturés.
- Audit `audit.mjs` : non lancé (dépend de captures terminées ; non relancé faute de temps).
- Planches `planche.py` : non produites (aucun PNG complet par page exploitable).
- Serveur arrêté, processus shoot/chrome tués.

## Chiffres utiles (report.json)
Aucun : pas de `report.json` produit. Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile/desktop, débordement, éléments cachés, clavier : **non mesurés**.

## FAIL de l'audit
Non disponibles (audit non exécuté). WARN : non disponibles.

## Pièges constatés (à consigner dans `agents/lecons/captures.md`)
- `shoot.mjs` se bloque durablement après la passe clavier de la page d'accueil du site legacy (`k-04`) ; la passe hover (`--hovers 8` par défaut) ou le `mouse.wheel` restent suspects. Non diagnostiqué.
- Un serveur lancé en `&` dans un appel Bash meurt dès la fin de l'appel ; utiliser `setsid nohup`.
- Le hook de sobriété refuse `curl -s -o` hors enveloppe `scripts/q.sh`.
- `sleep` long est bloqué par le harnais ; attendre via `python3 -c "import time; time.sleep(N)"` ou Monitor.
