# QA build : makimono-legacy (passe build)

Faits mesurés sur `dist/makimono/legacy/`, servi en local (port 4503, arrêté après la passe). Pas d'analyse de design.

## Pages et captures

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/makimono/legacy/` | `.shots-makimono-legacy-build/home/` | `.shots-makimono-legacy-build/home/planche.png` |
| 404 (URL inexistante) | `.shots-makimono-legacy-build/404/` | `.shots-makimono-legacy-build/404/planche.png` |

Rapports bruts : `.shots-makimono-legacy-build/<page>/report.json`. Journaux : `.logs/makimono-legacy-build-*.log`.

## Chiffres par page

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 1 (`[desktop] Failed to load resource: 404`) | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 | 2 : `document-title` et `html-has-lang` (nœud `html`) |
| Contraste à vérifier (axe) | 17 | 0 |
| CLS mobile / desktop | 0 / 0,034 | 0 / 0 |
| LCP mobile / desktop | 920 ms / 468 ms (élément `img.hero__img`) | 236 ms / 28 ms (élément `pre`) |
| Débordement horizontal (mobile / desktop) | non / non | non / non |
| Éléments hors zone (offenders) | 0 | 0 |
| Cibles tactiles trop petites | 0 | 0 |
| Texte masqué réduit (reduced motion) | 0 | 0 |
| Mouvement en reduced motion | non | non |
| Fps scroll mobile / desktop | 61 / 60 | 61 / 60 |
| Hauteur de page mobile / desktop | 12 802 px / 8 827 px | 2 121 px / 900 px |
| Titre `<title>` | présent | absent |
| H1 | 1 : « Des uramaki créatifs, faits avec amour » | aucun |
| Focus clavier sans indicateur visible | 0 | 0 |
| Focus invisible | 0 | 0 |
| Focus bloqué | non | non (sortie de page au premier tab) |
| Lien d'évitement en premier | non | non |
| Survol sans changement | 0 (4 cibles, changement de couleur seul : `colorOnly` = 4) | non mesuré |
| Éléments couverts | `a « Commander en ligne »` | non mesuré |

Notes de l'outil : mesures desktop faites en rendu logiciel (plancher, pas un matériel réel) ; mobile en ralentissement CPU x4 et 4G lente. `--nav` n'a trouvé aucun lien cliquable vers une autre page.

Captures de l'accueil : 1 premier affichage, 1 hero, 6 défilements (desktop), 6 mobiles, 4 survols et 4 états repos, 4 focus clavier, 2 captures `r-` (hero et milieu, réduit). La 404 : 1 premier affichage, 6 défilements desktop, 6 mobiles, 2 `r-`.

## Audit (`audit.mjs`)

- FAIL : **0**
- WARN : **10**
  1. `/makimono/legacy/` : no favicon link
  2. `/makimono/legacy/` : sentence repeated 2x : « Mayonnaise Japonaise Sauce Spicy Sauce Teriyaki Sauce Unagi Sauce Trop… »
  3. `/makimono/legacy/` : sentence repeated 6x : « 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00 »
  4. site : 404 page has no `<h1>`
  5. site : no robots.txt
  6. site : no sitemap
  7. `/makimono/legacy/` : ttf/otf font shipped `va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ulw.ttf` (use woff2)
  8. `/makimono/legacy/` : ttf/otf font shipped `va9b4kzIxd1KFppkaRKvDRPJVDf_jh_ulw.ttf` (use woff2)
  9. `/makimono/legacy/` : ttf/otf font shipped `va9b4kzIxd1KFppkaRKvDRPJVDf_Wxjulw.ttf` (use woff2)
  10. `/makimono/legacy/` : ttf/otf font shipped `zOLy4prXmrtY-tT6.ttf` (use woff2)

Poids de la page d'accueil (audit) : ~1 419 Ko ; HTML 8, JS 1 (gz), CSS 5 (gz), polices 281, images 1 125.

## Étapes

- Build : `pnpm`-équivalent `scripts/build-site.mjs sites/makimono-legacy` : exit 0, `dist/makimono/legacy/` produit (le build écrit aussi `sitemap-index.xml` dans `sites/makimono-legacy/dist`).
- Serveur : `serve.mjs dist --port 4503`, PID 24945, arrêté.
- Captures : `shoot.mjs --crawl --nav`, exit 0, 2 pages (accueil, 404).
- Planches : `scripts/planche.py` 4 colonnes, largeur 480, 14 images par planche, produit 1920 x 4224 px.
- Aucun fichier source modifié, aucun commit.
