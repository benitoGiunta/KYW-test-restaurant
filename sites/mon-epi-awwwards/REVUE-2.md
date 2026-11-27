# Revue awwwards · Monepi Boulangerie · passe 2
Verdict : A_CORRIGER
(0 F0, 0 F1, 2 F2, 3 F3. Build OK, 0 erreur console, 0 requête échouée, 0 débordement, 0 lien mort, 0 fait faux, mention + logo KYW + noindex présents. Les 9 corrections annoncées par REVISION-1 sont vérifiées. Deux violations axe « serious » (aucune critique) restent sur l'accueil, invisibles dans QA-revue2 : elles justifient A_CORRIGER, pas un blocage.)

Lecture en une ligne de l'idée du site : une boulangerie lue comme une mouture, le taux d'extraction (65 / 75 / 80 %) devient le motif graphique (75 % géant, flamme en arche, barreaux de farine, jauge d'en-tête) sur fond suie.

## Preuves utilisées
- `dist/` (08:47) postérieur à `src/` (`find -newer` vide) et captures de `QA-revue2.md` (08:48) postérieures au `dist/` : réutilisées (trois planches lues : accueil, carte, 404).
- Serveur propre port 4871 (PID 16697, arrêté). Scripts maison via `scripts/q.sh` : axe-core complet de `node_modules` sur 5 pages (dont le vrai `404.html`) à 1440 et 390 px, console, requêtes, débordement, cibles < 24 px ; contraste par nœud texte (canvas 1x1, opacité cumulée, défilement par 400 px, 5 pages x 2 largeurs) ; capture de l'en-tête après défilement vers le haut (planche `.shots-mon-epi-awwwards-revue2/rev2-entete/planche.png`) ; 27 liens internes testés ; JSON-LD, OG, titres par page.
- Non remesurés (chiffres de QA-revue2 retenus, captures postérieures au `dist/`) : LCP mobile 976 ms accueil / 896 ms carte, CLS mobile 0 et 0,004, CLS desktop carte 0,014, FPS 60, poids accueil ~775 Ko.

## Vérification des corrections de REVISION-1
| id | annoncé | constat passe 2 |
|---|---|---|
| F1-1 | four daté « début des années 2000 » | OK. `index.html` : « C'est le four de l'atelier Monepi, à Loyers, construit au début des années 2000 » ; « depuis la reprise » absent du `dist/`. Cohérent avec la page histoire. |
| F1-2 | rayon sans gluten sans photo | OK. `site.ts:82` `photo: null` ; planche carte `d-06-scroll` : rayon « SANS GLUTEN » sans image de seigle. |
| F1-3 | notes des farines | OK. Blé blanc « le pain « Blé blanc », 800 g, à la levure » (carte : blé blanc, 800 g, levure) ; épeautre demi-gris « pur épeautre … et le pain d'épeautre et de seigle » (carte : mêmes lignes) ; « La plupart des pains de la carte nomment l'une d'elles » ; « pain de mie », « Chaque pain de la carte » absents. |
| F2-1 | mention « selon les pages du site client » | OK, 0 occurrence dans le `dist/`. |
| F2-2 | fond d'en-tête 0,92 | OK en pratique. Mesuré après défilement puis remontée (1440 et 390, reservation et histoire) : `.entete` en tête de pile (`elementFromPoint`), fond `rgba(23,16,12,.92)` jusqu'à 80 %, texte sous l'en-tête à luminance ≤ 35/255 dans les 50 premiers pixels. Reste une fine bande de fondu (voir F3-1). |
| F2-3 | cibles 24 px | OK. 0 lien ou bouton sous 24 px sur 5 pages x 2 largeurs, liens OSM et Facebook compris. |
| F2-4 | nom de Dirk Longin séparé du portrait | OK. Le portrait 22 n'apparaît qu'à l'accueil, sans nom ; sur l'histoire, la signature « Dirk Longin, gérant de la boulangerie » suit la photo 24 (pâtons enfournés, sans visage). |
| F2-5 | contraste « impossible » | LEVÉ par mesure : 0 nœud texte sous 4,5:1 (3:1 en grand texte) sur 5 pages x 2 largeurs, après défilement et fin de reveal. La violation `color-contrast` de la 404 de QA-revue2 vient de la réponse brute de `serve.mjs` (page de l'index générique, pas le site) ; le vrai `404.html` : 0 violation axe, 1 h1, `lang="fr"`, mention, logo, noindex. |
| H1 | « Monepi, pain au levain cuit au feu de bois » | OK, « tamisé à 75 » absent ; le 75 % reste le visuel du héros. |

## Scores /10
- Design 8 : concept tenu partout (75 % + flamme, barreaux, titres capitales, alternance suie / crème), `home/d-01-hero.png`, `m-01-hero.png`, rendu mobile pensé (échelle en colonne, `m-03-scroll`).
- Usabilité 8 : CTA tel et carte clairs, menu burger OK, 0 cible < 24 px, en-tête lisible au défilement ; point faible `.mur__rail` non atteignable au clavier (F2-2).
- Créativité 8 : un seul gag lisible (extraction = barreaux = jauge) ; carte à filets proportionnels.
- Contenu 8 : erreurs de sens de la passe 1 corrigées, faits conformes à `donnees.json`, rien d'inventé de substance ; deux adjectifs de note à surveiller (F3-2).
- Technique 7 : 0 erreur, 0 débordement, LCP mobile < 1 s, CLS ≤ 0,014, mais 2 violations axe serious sur l'accueil (F2-1, F2-2) que QA ne voit pas.

## Findings

### F2 (mineurs)
- **F2-1 · `aria-prohibited-attr` (serious), accueil, 1440 et 390 px.** `<p data-split="lines" aria-label="Un pain se lit à ce qu'il garde du grain.">` : le split de lignes pose un `aria-label` sur un `<p>` sans rôle. Mesure : axe-core complet, 1 nœud x 2 largeurs ; absent des 4 autres pages. Correction : option `aria` du SplitText désactivée (et lecture du texte réel par les lecteurs d'écran) ou, à défaut, retirer l'`aria-label` du `<p>`.
- **F2-2 · `scrollable-region-focusable` (serious), accueil, 390 px.** `<div class="mur__rail">` (`site.css:188`, `overflow-x: auto`) n'est pas atteignable au clavier : « Element should have focusable content ». Correction : `tabindex="0"`, `role="region"` et `aria-label` (« Photos de l'atelier ») sur le rail, avec un indicateur de focus.

### F3 (finition)
- **F3-1 · Bande de fondu de l'en-tête.** `rev2-entete/planche.png` (reservation 1440) : le titre « AUSSI CHEZ » dépasse dans la bande 51-64 px sous les liens de navigation (le dégradé tombe à transparent sur les 20 % bas). Lisible, mais un fond plein 100 % sur 64 px supprimerait le chevauchement.
- **F3-2 · Deux adjectifs absents du dossier.** `site.ts:40` « Le pain de tous les jours » (blé demi-gris) et `site.ts:43` « un pain dense » (petit épeautre) : descriptifs plausibles, non prouvés par `dossier.md` ni `donnees.json` (le dossier ne donne que le taux). Correction : « Le blé demi-gris, au levain ou à la levure » ; « La plus riche en grain, au levain ».
- **F3-3 · 18 fichiers `.jpg` non référencés dans `dist/…/_astro/`**, dont 3 de plus de 300 Ko (`24-enfournement` 476 Ko, `05-four-flammes` 394 Ko, `06-four-flammes-large` 368 Ko) : aucune page ne les cite (les pages servent avif/webp), mais ils pèsent dans chaque déploiement Vercel. Correction : ne pas émettre l'original (ou le supprimer du build).
- Note carte : « (65 %) » dans la composition « Épeautre et seigle complet » est la part du mélange, à côté du barreau « 65 % » du blé blanc : conforme à `donnees.json`, mais peut se lire comme un taux d'extraction.

## Ce qui est bien (à ne pas casser)
1. Le système « extraction » : 75 % géant + flamme, barreaux de farine (65 / 75 / 75 / 80 %), jauge d'en-tête.
2. La carte : lignes à filet proportionnel, prix alignés, compositions complètes, fourchettes, « appelez avant de venir » et vendredi seul horaire publié.
3. La rigueur de données et les 404/OG/JSON-LD : `Bakery` avec adresse et horaires sur chaque page, `404.html` designé sous `/mon-epi/awwwards/`, 27 liens internes à 200, `og.png` présent.
