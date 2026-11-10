# QA build : pepite / legacy

Passe : build. Source : `dist/pepite/legacy/` (build OK, exit 0). Serveur local `serve.mjs dist --port 4503`, arrêté après captures.
Journaux : `.logs/pepite-legacy-build-*.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pepite/legacy/` | `.shots-pepite-legacy-build/home/` (report.json inclus) | `.shots-pepite-legacy-build/home/planche.png` |
| 404 (page manquante, atteinte par `--nav`) | `.shots-pepite-legacy-build/404/` (report.json inclus) | `.shots-pepite-legacy-build/404/planche.png` |

Le crawl n'a trouvé qu'une page (`/pepite/legacy/`). Aucun lien de navigation n'a été cliqué (note `--nav` : aucun lien trouvé).

## Chiffres : accueil (`home/report.json`)

- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 0 violation, 0 serious, 42 `contrastNeedsReview` (à revoir, non comptées comme violations).
- CLS : bureau 0.001 ; mobile 0.001.
- LCP : bureau 400 ms (`img.hero__img`) ; mobile 836 ms (`h1#h-titre`, mobile throttled).
- Débordement horizontal : non (bureau et mobile).
- Hauteur de page : bureau 5840 px ; mobile 6888 px.
- Éléments cachés (texte masqué en mouvement réduit) : 0. Mouvement en réduit : non.
- Cibles tactiles petites (bureau, 5) : « Voir le plan » 81x20 ; « 0476/620182 » 96x20 ; « catherine.mathieu@me.com » 207x20 ; « Facebook » 72x20 ; « Instagram » 74x20. Mobile : aucune.
- FPS : bureau 60 (scroll, pire trame 17 ms) ; mobile 61.
- Hero stabilisé après : 3834 ms (bureau), 3998 ms (mobile). Mouvement continu à l'inactivité : non.
- Clavier : 12 arrêts de tabulation ; pas de lien d'évitement en premier (`skipLinkFirst` false) ; 0 focus sans indicateur visible ; 0 focus invisible ; pas de piège.
- Survol : 7 cibles testées ; 6 changent seulement la couleur (`colorOnly`) ; 1 ne change pas (`h-04`, lien « pépite »).
- Couverture par survol : aucune cible couverte ; curseur suiveur : non.

## Chiffres : 404 (`404/report.json`)

- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 2 violations serious, toutes deux sur `html` : `document-title` (pas de `<title>`) ; `html-has-lang` (pas d'attribut `lang`).
- CLS : bureau 0 ; mobile 0. LCP : bureau 40 ms ; mobile 240 ms (élément `pre`).
- Débordement : non. Titre (`<h1>`) : aucun.
- Clavier : un seul arrêt (« body: focus left the page »), pas de lien ni de contrôle.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 9 WARN**.
- WARN (liste) :
  1. `/pepite/legacy/` : `missing twitter:card`
  2. `/pepite/legacy/` : phrase répétée 2 fois : « Boutique dès 16 h 00 Cave à manger dès 19 h 00 »
  3. site : la page 404 n'a pas de `<h1>`
  4. site : pas de `robots.txt`
  5. site : pas de `sitemap`
  6. à 4 reprises, polices `ttf/otf` livrées (utiliser woff2) : `pxigypc9…ttf`, `pximypc9…Qf1.ttf` (2 fichiers), `3qTpojO2nS2VtkB3KtkQZ2t6.ttf`

Mesure de poids : page la plus lourde ~477 KB ; HTML 5 ; JS 1 (gz) ; CSS 5 (gz) ; polices 244 ; images 223.

## Planches

Les planches incluent les captures `d-*` et `m-*` (14 images, 1920 x 4224 px). Les captures `h-*`, `k-*` et `r-*` ne sont pas dans la planche ; elles restent dans leurs dossiers.
