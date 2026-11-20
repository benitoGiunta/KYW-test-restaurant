# QA revue 2 : escale-en-vue / awwwards (phase test)

Statut : **incomplet**. La capture complète a été interrompue (échec, sans report.json) et l'audit n'a pas été lancé.

## Étapes

1. Build (`scripts/q.sh escale-en-vue-awwwards-revue2-build`) : exit 0, 5 pages, journal `.logs/escale-en-vue-awwwards-revue2-build.log`.
2. Serveur (`serve.mjs dist --port 4502`) : PID 5282, répond HTTP 200 sur `/escale-en-vue/awwwards/`. Arrêté en fin de tâche (fichier PID `.logs/serve-awwwards.pid`).
3. Captures (`shoot.mjs --crawl --nav`) : lancée, bloquée sur la page d'accueil après plus de 6 min sans `report.json`. Arrêtée manuellement (exit 144). Journal : `.logs/escale-en-vue-awwwards-revue2-shoot.log`.
4. Audit (`audit.mjs`) : non lancé.

## Captures partielles

Dossier : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue2/home/` (28 fichiers PNG, aucune planche produite).
- Déjà présents : d-00 à d-07 (firstpaint, hero, scroll), d-90 à d-92 (transition, après nav, retour), h-01 à h-05 (hover/rest), k-01 à k-04 (focus clavier).
- Manquants : captures mobiles `m-*`, `report.json`, planche.

## Chiffres (report.json)

Aucun : aucun `report.json` n'a été produit. Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés et clavier ne sont pas mesurés.

## Audit

Non lancé : FAIL = non disponible, nombre de WARN = non disponible.

## Pages restantes

Les autres pages (crawl) n'ont pas été capturées.
