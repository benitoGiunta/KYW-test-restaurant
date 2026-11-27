# QA revue 1 — bienvenue-chez-vous-awwwards

Faits seulement. Build, serveur local `http://127.0.0.1:4502/bienvenue-chez-vous/awwwards/` (arrêté), captures `--crawl --nav`, audit.

## Build

- `scripts/q.sh bienvenue-chez-vous-awwwards-revue1-build` : exit 0, 5 pages construites, sitemap créé. Journal : `.logs/bienvenue-chez-vous-awwwards-revue1-build.log`.

## Pages captées (3 sur 4 crawlées)

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/bienvenue-chez-vous/awwwards/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/home/planche.png` |
| Carte `/bienvenue-chez-vous/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/bienvenue-chez-vous-item/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/bienvenue-chez-vous-item/planche.png` |
| 404 (`__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue1/404/planche.png` |

- Le crawl de l'audit compte 4 pages ; le shoot en a capté 3. La 4e, `/bienvenue-chez-vous/awwwards/reservation/`, n'a pas de dossier de captures.
- Planches : `planche.py` n'accepte pas `--colonnes` ni `--largeur` (ils sont lus comme des fichiers, « ignoré »). Les planches ont été produites avec les valeurs par défaut, 19 images chacune, 1920 × 5280 px. Journaux : `.logs/bienvenue-chez-vous-awwwards-revue1-planche-*.log`.

## Chiffres des report.json

| Métrique | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| axe violations | 0 (serious 0, contrastNeedsReview 28) | 0 (serious 0, contrastNeedsReview 40) | 1 règle : `color-contrast`, serious, 2 nœuds (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| CLS bureau / mobile | 0,001 / 0,01 | 0 / 0,004 | 0 / 0 |
| LCP bureau (ms, élément) | 76 (img.photo) | 184 (div.split-line) | 40 (p) |
| LCP mobile (ms, élément) | 1116 (img.photo) | 2380 (p.entete__intro) | 224 (p) |
| Chargement bureau (ms) | 132 | 155 | 34 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128 × 20) |
| FPS défilement bureau / mobile | 60 / 60 (pire trame 17 ms) | 60 / 60 | 60 / 60 |
| Texte caché, mouvement en réduit | 0, non | 0, non | 0, non |
| Clavier : arrêts de tabulation | 12 ; sans lien d'évitement en premier ; 0 focus non visible ; 0 focus invisible ; non bloqué | 12 ; idem ; 0 / 0 ; non bloqué | 3 ; idem ; 0 / 0 ; non bloqué |
| Survol (cibles testées / sans changement) | 7 / 1 (moves 3, pixels 3, none 1) | 7 / 2 (moves 1, color 1, pixels 3, none 2) | 2 / 2 (none 2) |

Notes : le FPS bureau tourne sous GPU logiciel, donc il est un plancher. Le mobile est en ralentissement CPU ×4 et 4G lente.

## Audit (`audit.mjs`)

- Journal : `.logs/bienvenue-chez-vous-awwwards-revue1-audit.log`.
- Lignes FAIL : **0**.
- Lignes WARN : **3**.
  - `/bienvenue-chez-vous/awwwards/reservation/` : phrase répétée 5 fois, « 12 h à 13 h 30, 19 h 30 à 21 h ».
  - `site` : pas de robots.txt.
  - `site` : pas de sitemap. (Le build a pourtant créé `sitemap-index.xml` ; le contrôle de l'audit ne le voit pas.)
- Poids de la page la plus lourde : accueil, environ 1046 Ko ; HTML 5, JS 6 (gz), CSS 6 (gz), polices 77, images 952.

## Points de vigilance (faits)

- Le contraste `#6b787d` sur `#fbfaf8` (4,36:1) est en échec sérieux sur la 404, dans le pied de page `kyw-footer__note`. C'est le seul échec axe relevé.
- La 404 expose une cible de 128 × 20 px sous la taille tactile recommandée.
- Le champ `skipLinkFirst` du rapport vaut `false` sur les trois pages, alors que le premier arrêt clavier de l'accueil et de la carte est « Aller au contenu ». Le sens exact du champ n'a pas été vérifié.
