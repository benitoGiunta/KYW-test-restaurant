# QA revue 1 : cafe-fleuri / legacy (faits)

Build : `dist/cafe-fleuri/legacy/`, servi sur http://127.0.0.1:4503/cafe-fleuri/legacy/ (build OK, exit 0).
Pages auditées : 3 (accueil, carte, venir). La page 404 n'a pas été capturée dans cette passe.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/home/planche.png` |
| Carte | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/carte/planche.png` |
| Venir | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/venir/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue1/venir/planche.png` |

Les planches ont été produites avec 19 images chacune (1920 x 5280). Les options `--colonnes` et `--largeur` n'ont pas été reconnues par `scripts/planche.py` (lues comme des fichiers, avertissement « ignoré ») : la largeur et le nombre de colonnes sont ceux par défaut.

## Mesures (report.json)

| Indicateur | Accueil | Carte | Venir |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrastNeedsReview 2) | 0 (serious 0, contrastNeedsReview 1) | 0 (serious 0, contrastNeedsReview 1) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0.001 / 0 |
| LCP desktop / mobile (ms) | 372 / 716 | 444 / 764 | 392 / 712 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Texte caché (reduced motion) | 0 | 0 | non renseigné (absent du rapport) |
| Éléments couverts au survol | 0 | 0 | 0 |
| Survol à changement de couleur seul (colorOnly) | 6 | 3 | 6 |
| Suivi de curseur | non | non | non |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Arrêts clavier | 12 | 9 | 12 |
| Lien d'évitement en premier arrêt (skipLinkFirst) | false | false | false |
| Piège clavier (stuck) | false | false | false |
| Mouvement en reduced motion | non | non | non |

Notes du rapport : les FPS desktop sont mesurés en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; le mobile tourne à ralentissement CPU x4.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 14
  - `missing og:image` sur /, /carte/, /venir/ (3)
  - `no robots.txt` et `no sitemap` (2)
  - `ttf/otf font shipped` sur /, /carte/, /venir/ : 3 polices TTF par page (9)
- Pages crawlées : 3, poids le plus lourd /cafe-fleuri/legacy/ ~305 KB (HTML 3, JS 1 gz, CSS 4 gz, polices 286, images 11).

## Points non vérifiés

- La page 404 n'est pas capturée (une tentative antérieure a échoué, le serveur n'étant pas encore lancé ; la passe suivante a été interrompue par un blocage du crawl, puis reprise page par page).
- Le `skipLinkFirst: false` est reporté tel quel ; le premier arrêt clavier de l'accueil est le lien « Aller au contenu » (lien d'évitement présent, non détecté par le champ).
