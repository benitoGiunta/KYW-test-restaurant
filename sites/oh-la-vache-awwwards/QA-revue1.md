# QA revue 1 : oh-la-vache-awwwards (captures)

Build : `dist/oh-la-vache/awwwards/` (5 pages, sans erreur). Serveur local port 4502, arrêté après les mesures.
Captures : `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/`

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/oh-la-vache/awwwards/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/home/planche.png` |
| La carte `/oh-la-vache/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/oh-la-vache-item/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/oh-la-vache-item/planche.png` |
| Page 404 (sonde du crawl) | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-revue1/404/planche.png` |

Note : `planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (« ignoré ») ; les planches ont été produites avec les largeurs par défaut (1920 px, 19 images chacune).

## Chiffres (report.json)

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (serious : color-contrast, 5 nœuds) | 1 (serious : color-contrast, 4 nœuds) | 1 (serious : color-contrast, 2 nœuds) |
| Contrastes à vérifier (needs review) | 10 | 5 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 84 (img) | 84 (p.entete__texte) | 44 (p) |
| LCP mobile (ms, 4G lent, CPU x4) | 1180 (img) | 916 (p.entete__texte) | 260 (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran / cachés (GL) | 0 | 0 | 0 |
| Texte caché (reduced motion) | 0 | 0 | non mesuré |
| Hauteur page desktop / mobile (px) | 7223 / 6073 | 19583 / 19296 | 900 / 844 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / bloqué | 0 / non | 0 / non | 0 / non |
| Clavier : arrêts de tabulation | 12 | 12 | 2 |
| Cibles tactiles petites (desktop) | 0 | 0 | 1 (« la page d'accueil » 128x20) |

Détail axe (commun aux pages) : `.tete__nom`, `.tete__horloge` et les liens de navigation `.nl` en blanc (#ffffff) sur fond #f7f6f2, ratio 1,08:1 (seuil 4,5:1). Sur la 404 : `.kyw-footer__note` et un `span` en #6b787d sur #fbfaf8, ratio 4,36:1.

Clavier : sur l'accueil et la carte, le premier arrêt de tabulation est « Aller au contenu » (lien d'évitement) ; sur la 404, le premier arrêt est « la page d'accueil » et le focus sort de la page après le second arrêt. Le champ `skipLinkFirst` vaut `false` sur les trois pages (valeur brute du rapport).

Notes du rapport : les FPS desktop tournent en headless sur GPU logiciel (plancher, non représentatif) ; les valeurs mobiles font foi.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2 (« no robots.txt », « no sitemap » sur le site servi en local)
- 4 pages crawlées ; page la plus lourde `/oh-la-vache/awwwards/` : ~1223 Ko (JS 61 Ko gz, CSS 6 Ko gz, polices 40 Ko, images 1111 Ko)

## Fichiers

- Journaux : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-awwwards-revue1-*.log`
- Aucun fichier source modifié, aucun commit.
