# QA revue 1 : sanga-legacy (captures)

Build : `sites/sanga-legacy` → `dist/sanga/legacy/` (exit 0, 2 pages).
Serveur : `dist` sur 127.0.0.1:4503, arrêté après usage.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/sanga/legacy/` | `/home/user/KYW-test-restaurant/.shots-sanga-legacy-revue1/home` | `/home/user/KYW-test-restaurant/.shots-sanga-legacy-revue1/home/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-sanga-legacy-revue1/404` | `/home/user/KYW-test-restaurant/.shots-sanga-legacy-revue1/404/planche.png` |

Remarque planche : `scripts/planche.py` lit `--colonnes` et `--largeur` de façon approximative ; les valeurs `4` et `480` sont aussi traitées comme fichiers images (« ignoré 4 », « ignoré 480 »). Les planches sont produites en 1920 px de large (4 × 480), conformes à la demande.

## Chiffres (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 1 : `label-content-name-mismatch` sur `.nav__brand` (1 nœud) | 2 : `document-title` (html), `html-has-lang` (html) |
| Contraste à vérifier | 0 | non renseigné dans le résumé (`contrastNeedsRe…` tronqué) |
| CLS desktop / mobile | 0,009 / 0,033 | 0 / 0 |
| LCP desktop / mobile | 468 ms (img) / 1140 ms (img) | 40 ms / 232 ms (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 1 (`081 24 10 38`, 115×22 px) / 0 | 0 / 0 |
| FPS scroll desktop / mobile (pire trame) | 60 (17 ms) / 61 (17 ms) | 60 / 61 |
| Titre | « Sanga, ramen japonais à Namur, Rue Saint-Loup » | vide |
| H1 | « Le premier restaurant de ramen à Namur » | aucun |
| Clavier | 12 arrêts de tabulation ; 0 focus non visible ; 0 focus invisible ; pas de blocage ; lien d'évitement non premier | 1 arrêt (sortie de page) ; lien d'évitement absent |
| Survol | 6 cibles : 1 changement de couleur seulement (« Commander en ligne », « Carte » en bordure/couleur) ; 3 sans changement (`h-01`, `h-03`, `h-04`) ; 2 cibles « color only » (`h-02`, `h-06`) | 0 cible |
| Mouvement réduit | 0 texte masqué ; pas de mouvement | 0 texte masqué ; pas de mouvement |

Notes du rapport : `--nav` n'a trouvé aucun lien vers une autre page (aucune navigation testée). Le FPS desktop tourne en headless sur GPU logiciel (plancher, non mesure matérielle).

## Audit (`audit.mjs`)

Crawl : 1 page (`/sanga/legacy/`). Poids de la page la plus lourde : ~591 KB (html 4, JS 1 gz, CSS 5 gz, polices 376 KB, images 206 KB).

**FAIL : 0**
**WARN : 9**

- `/sanga/legacy/` : `twitter:card` manquant
- site : la page 404 n'a pas de `<h1>`
- site : pas de `robots.txt`
- site : pas de `sitemap`
- `/sanga/legacy/` : 4 polices TTF/OTF embarquées (utiliser WOFF2)
- `/sanga/legacy/` : polices 376 KB (moins de graisses, variable, sous-ensemble)

Journal complet : `/home/user/KYW-test-restaurant/.logs/sanga-legacy-revue1-audit.log`.

## Commit

Aucun fichier source modifié, aucun commit.
