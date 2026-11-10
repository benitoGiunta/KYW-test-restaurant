# QA build : sanga / awwwards

Build : `scripts/q.sh sanga-awwwards-build-build` : exit 0, 5 pages, sortie `dist/sanga/awwwards/`.
Serveur local : port 4502 (arrêté après les captures).
Journaux : `.logs/sanga-awwwards-build-build.log`, `.logs/sanga-awwwards-build-shoot.log`, `.logs/sanga-awwwards-build-audit.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/sanga/awwwards/` | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/home/planche.png` |
| Carte `/sanga/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/sanga-item/` | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/sanga-item/planche.png` |
| 404 (page de repli du serveur) | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-sanga-awwwards-build/404/planche.png` |

Remarques sur les planches : `planche.py` ignore les options `--colonnes` et `--largeur` (lues comme fichiers, « ignoré 4 », « ignoré 480 »). Les planches sortent quand même en 1920 px de large (4 colonnes de 480 px).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations sérieuses | 1 (`label-content-name-mismatch`, `.tete__marque`) | 1 (même règle, même élément) | 2 (`document-title`, `html-has-lang`) |
| Axe, contrastes à vérifier | 83 | 131 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 148 (img) | 112 (h1#titre-carte) | 44 (pre) |
| LCP mobile (ms) | 1392 (img) | 1100 (h1#titre-carte) | 272 (pre) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments débordant (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte masqué (bureau) | 0 | 0 | 0 |
| FPS défilement bureau / mobile | 59 / 60 | 60 / 60 | 60 / 61 |
| Cibles tactiles petites (smallTargets) | 8 | 5 | 0 |
| Survol sans changement | 2 (`081 24 10 38`, `Sanga`) | 2 (`Sanga`, `La carte`) | aucun élément testé |
| Focus clavier sans indicateur visible | 0 | 0 | aucun (focus sorti de la page) |
| Focus invisible / piégé | 0 / non | 0 / non | 0 / non |
| Lien d'évitement en premier | non | non | non |
| Mouvement réduit : texte masqué / animation active | 0 / non | 0 / non | 0 / non |
| Mouvement au repos (idleMotion) | oui | oui | non renseigné |

Parcours clavier, accueil : 12 arrêts, de « Aller au contenu » à « Commander en ligne ».
Parcours clavier, carte : 12 arrêts, de « Aller au contenu » à « Appeler le 081 24 10 38 ».

## Audit (audit.mjs)

- Résultat : **0 FAIL, 3 WARN**.
- Pages explorées par l'audit : 4. Les captures n'en couvrent que 3 (accueil, carte, 404) ; la quatrième page explorée n'est pas identifiée dans le journal.
- WARN :
  1. `404 page has no <h1>`
  2. `no robots.txt`
  3. `no sitemap`
- Poids de la page la plus lourde : environ 364 KB ; 4 documents HTML ; JS 61 KB (gz) ; CSS 6 KB (gz) ; polices 90 ; images 203.

## Notes de mesure

- Les FPS bureau tournent en headless sur GPU logiciel : valeur plancher, pas une mesure réelle.
- La page 404 est celle que sert le serveur local pour une URL inexistante, pas une page du site.
