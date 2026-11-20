# QA build — champs-elysees-legacy (passe build, phase test)

Build : `dist/champs-elysees/legacy/` (rc 0, 5 pages générées). Serveur local `serve.mjs dist --port 4503`, arrêté après usage.
Captures : `shoot.mjs --crawl --nav` ; 3 dossiers de pages (home, champs-elysees-item = `/la-carte/`, 404). Le crawl de l'audit en voit 4.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/champs-elysees/legacy/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/home/planche.png` |
| Carte `/champs-elysees/legacy/la-carte/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/champs-elysees-item/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/champs-elysees-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/404/planche.png` |

Résumé global : `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-build/summary.json`

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Violations axe (serious) | 0 | 0 | 1 : `color-contrast` (2 nœuds) |
| CLS desktop / mobile | 0.013 / 0.001 | 0.038 / 0.102 | 0 / 0 |
| LCP desktop / mobile (ms) | 436 / 2804 | 460 / 812 | 36 / 248 |
| LCP élément desktop / mobile | img / img | h1#h-carte / p.lead | p / p |
| Load desktop / mobile (ms) | 747 / 2772 | 798 / 1625 | 22 / 412 |
| FPS scroll desktop / mobile | 60 / 60 | 61 / 61 | 60 / 60 |
| Pire trame mobile (ms) | 17 | 17 | 33 |
| Cibles tactiles petites | 2 | 2 | 1 |
| Focus clavier sans indicateur visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Focus bloqué | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 3 | 3 | 2 |
| Survol changement couleur seul | 2 | 3 | 0 |
| Mouvement en réduit (écran encore animé) | non | non | non |
| Texte caché en réduit | 0 | 0 | 0 |
| Temps de stabilisation du premier écran (ms) | 3574 | 2960 | 2184 |
| Fichiers capturés | 37 | 37 | 27 |

## Audit (`audit.mjs`)

- 4 pages explorées depuis `http://127.0.0.1:4503/champs-elysees/legacy/`.
- FAIL : 0.
- WARN : 30. Exemple récurrent : police `ttf/otf` embarquée (utiliser woff2) sur les pages de l'audit.
- Poids de la page la plus lourde : environ 1005 Ko (images 834 Ko, polices 159 Ko).

## Pièges relevés

- Le premier lancement de `shoot.mjs` a échoué (`ERR_CONNECTION_REFUSED`) car le serveur n'était pas encore démarré : la commande précédente avait été bloquée par le hook avant exécution. Relance OK après vérification (HTTP 200).
- `scripts/planche.py` : les options `--colonnes` et `--largeur` sont aussi lues comme images (« ignoré 4 », « ignoré 480 »), mais elles s'appliquent bien (planche 1920 px = 4 × 480).
- Les planches sont produites par page ; aucun fichier source modifié, aucun commit.
