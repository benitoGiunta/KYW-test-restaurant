# QA revue 2 — partage-awwwards

Source : build `dist/partage/awwwards/` (scripts/build-site.mjs, 5 pages buildées), servi sur `http://127.0.0.1:4502/partage/awwwards/`.
Captures : `shoot.mjs --crawl --nav` ; audit : `audit.mjs`. Aucun fichier source modifié, aucun commit.

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/partage/awwwards/` | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/home/planche.png` |
| La carte | `/partage/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/partage-item/` | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/partage-item/planche.png` |
| 404 | URL inexistante (`__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/404/planche.png` |

Index de la passe : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue2/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, impact serious) |
| Axe contrastNeedsReview | 52 | 306 | 0 |
| LCP desktop | 132 ms | 96 ms | 48 ms |
| LCP mobile (throttled) | 1216 ms | 1144 ms | 252 ms |
| CLS desktop | 0 | 0 | 0 |
| CLS mobile | 0.036 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll mobile | 60 | 60 | 59 |
| H1 présents (desktop) | 1 | 1 | 0 |
| Texte caché (prefers-reduced-motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| Tabulation : arrêts | 12 | 12 | 1 (`body: focus left the page`) |
| Tabulation : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Tabulation : piège clavier | non | non | non |
| Lien d'évitement (`skipLinkFirst`) | false | false | false |
| Survol : cibles testées | 7 | 7 | 0 |
| Survol : sans changement / couleur seule / recouvert | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |

Notes : 
- Le premier arrêt clavier de l'accueil et de la carte est le lien « Aller au contenu ». Le champ `skipLinkFirst` du rapport reste à `false` sur les trois pages ; c'est le flag brut de l'outil, non interprété ici.
- Les FPS desktop sont mesurés en headless sur GPU logiciel : plancher, non mesure matérielle réelle (note de l'outil).
- Le mobile tourne avec ralentissement CPU x4 et 4G lente.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 3 WARN**.
- WARN 1 : `404 page has no <h1>`.
- WARN 2 : `no robots.txt`.
- WARN 3 : `no sitemap`.
- Pages crawlées par l'audit : 4 (« heaviest page » `/partage/awwwards/` : ~485 KB ; HTML 5 ; JS 61 (gz) ; CSS 7 (gz) ; fonts 83 ; images 330).

## Points factuels à noter

- Page 404 : 2 violations axe de gravité serious (`document-title`, `html-has-lang`), pas de H1.
- Accueil : 52 et carte : 306 contrastes marqués « needs review » par axe (non vérifiés automatiquement).
- Aucun débordement, aucune erreur console, aucune requête en échec sur les trois pages.

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/partage-awwwards-revue2-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/partage-awwwards-revue2-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/partage-awwwards-revue2-audit.log`
- Planches : `/home/user/KYW-test-restaurant/.logs/partage-awwwards-revue2-planche-*.log` (avertissements « ignoré 4 / 480 » : `planche.py` lit les valeurs de `--colonnes` et `--largeur` comme fichiers, sans effet sur la sortie, qui fait bien 4 colonnes × 480 px)

## Serveur

- Le serveur lancé à l'étape 2 (port 4502) a échoué : `EADDRINUSE`. Un serveur déjà présent (PID 10810, lancé depuis la racine du dépôt avec `serve.mjs dist`) servait le port ; c'est lui qui a été utilisé pour les captures et l'audit.
- Ce PID 10810 n'a pas été arrêté : il n'a pas été lancé par cette passe. Aucun arrêt n'a donc été fait à l'étape 5.
