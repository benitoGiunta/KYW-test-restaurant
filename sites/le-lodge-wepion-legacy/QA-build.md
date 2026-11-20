# QA build : le-lodge-wepion / legacy (passe build, phase test)

## Statut
- Build : OK (exit 0), 3 pages (`/404.html`, `/cookies/`, `/index.html`), sortie `dist/le-lodge-wepion/legacy/`. Journal : `.logs/le-lodge-wepion-legacy-build-build.log`.
- Serveur statique port 4503 : répond HTTP 200 sur `/le-lodge-wepion/legacy/`, arrêté en fin de passe.
- Capture (`shoot.mjs --crawl --nav`) : INCOMPLÈTE. Journal `.logs/le-lodge-wepion-legacy-build-shoot.log` figé sur « shooting home » ; aucun `report.json` produit.
- Audit (`audit.mjs`) : NON EXÉCUTÉ (dépend de la capture ; non lancé faute de temps d'attente).
- Planches : NON PRODUITES (pas de `planche.png`).

## Captures disponibles : `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-legacy-build/home/`
- Présentes (17 fichiers) : `d-00-firstpaint`, `d-01-hero`, `d-02` à `d-07-scroll`, `d-90-transition-a/b/c`, `d-91-after-nav`, `d-92-back`, `k-01` à `k-04-focus`.
- Absentes : captures mobiles `m-*`, `report.json`.
- Dernière écriture de fichier : 01:15:13 (`k-04-focus.png`), aucune progression ensuite.

## Chiffres des report.json
Indisponibles : aucun `report.json` n'a été écrit. Erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés et clavier ne sont donc pas mesurés.

## Audit
Non exécuté : 0 FAIL et 0 WARN constatés, faute de résultat.

## Suite recommandée
Relancer une capture ciblée (`shoot.mjs <url> --out …`, sans `--crawl`) pour isoler la page bloquante, puis l'audit.
