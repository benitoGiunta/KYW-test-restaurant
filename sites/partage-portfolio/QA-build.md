# QA build : partage / portfolio

Passe : build · Serveur : `dist/` sur http://127.0.0.1:4501/partage/portfolio/ (arrêté après usage)
Build : `scripts/build-site.mjs sites/partage-portfolio` → exit 0, 7 pages, `dist/partage/portfolio/`.
Captures : `.shots-partage-portfolio-build/` (shoot : 3 dossiers, voir « Couverture »).

## Par page

### home (`/partage/portfolio/`)
- Captures : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/home/planche.png` (19 images)
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 0 violation
- CLS : bureau 0 · mobile 0
- LCP : bureau 244 ms (`span`) · mobile 1044 ms (`p.ardoise__accroche`)
- Débordement horizontal : non · éléments cachés (texte réduit / GL masqué) : 0 / 0 · petites cibles : 0
- Clavier : lien d'évitement en premier : non · focus non visible : 0 · focus invisible : 0
- Survol sans changement : 0
- Couleur seule (indice) : 5
- FPS défilement : 60 bureau, 60 mobile · hauteur : 7294 px bureau, 7217 px mobile
- Mouvement d'attente : actif

### partage-item (`/partage/portfolio/carte/` — dossier nommé « partage-item », c'est la seule page de ce type capturée)
- Captures : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/partage-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/partage-item/planche.png` (19 images)
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 0 violation
- CLS : bureau 0 · mobile 0
- LCP : bureau 128 ms (`p.lead`) · mobile 1124 ms (`p.lead`)
- Débordement horizontal : non · éléments cachés : 0 / 0 · petites cibles : 0
- Clavier : lien d'évitement en premier : non · focus non visible : 0 · focus invisible : 0
- Survol sans changement : 0 · couleur seule : 0
- FPS défilement : 60 bureau, 60 mobile · hauteur : 11152 px bureau, 10541 px mobile
- Mouvement d'attente : actif

### 404 (`/__shoot-missing-page-…`, page d'erreur)
- Captures : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-build/404/planche.png` (14 images)
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 2 violations (`document-title x1`, `html-has-lang x1`), sévérité sérieuse : 2
- CLS : bureau 0 · mobile 0
- LCP : bureau 36 ms · mobile 232 ms (`pre`)
- Débordement horizontal : non · éléments cachés : 0 / 0 · petites cibles : 0
- Clavier : focus non visible : 0 · focus invisible : 0
- Titre de page : vide · `<h1>` : absent
- Hauteur : 900 px bureau, 2121 px mobile · mouvement d'attente : inactif

## Couverture
- Le crawl de l'audit trouve 6 pages : `/`, `/carte/`, `/formules/`, `/salle/`, `/histoire/`, `/reservation/`.
- Le shoot n'a produit que 3 dossiers (`home`, `partage-item`, `404`). Les pages `/formules/`, `/salle/`, `/histoire/`, `/reservation/` n'ont pas de captures dans ce passage.

## Audit (`audit.mjs`)
- FAIL : 0
- WARN : 18
  - 8 × « sentence repeated 2x » sur `/partage/portfolio/` (phrases de la carte des vins)
  - 5 × « sentence repeated 2x » : « Le soir du mardi au samedi, le midi du mercredi au samedi » sur `carte/`, `formules/`, `salle/`, `histoire/`, `reservation/`
  - 1 × 404 sans `<h1>`
  - 1 × pas de `robots.txt`
  - 1 × pas de `sitemap`
- Poids : page la plus lourde `/partage/portfolio/salle/` ≈ 551 KB (HTML 4, JS 62 gz, CSS 5 gz, polices 111, images 369)

## Dépôt
- Aucun fichier source modifié, rien commité.
- `git status` montre des changements hors de ce passage (`pnpm-lock.yaml` modifié, `dist/partage/awwwards/` non suivi), non touchés ici.

## Notes d'outillage
- `scripts/planche.py` : les valeurs de `--colonnes` et `--largeur` sont aussi lues comme fichiers et affichent « ignoré 4 » / « ignoré 480 ». Les options sont bien appliquées (planche 1920 px = 4 × 480 px).
