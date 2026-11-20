# QA build : escale-en-vue, variante awwwards

Passe build, phase test. Faits seulement, extraits des `report.json` par grep/jq. Aucun fichier source modifié.

Build : `scripts/q.sh escale-en-vue-awwwards-build-build` : exit 0, 5 pages, `dist/escale-en-vue/awwwards/`.
Serveur de test : `127.0.0.1:4502`, arrêté après usage.
Audit : `escale-en-vue-awwwards-build-audit` : exit 0, **0 FAIL, 5 WARN**, 4 pages crawlées.

## Pages

### Accueil `/escale-en-vue/awwwards/`
- Captures : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/home/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- Axe : 0 violation, 0 serious. Contraste à revoir manuellement : 10.
- Desktop : LCP 60 ms (élément img), CLS 0, débordement horizontal non, éléments cachés 0, FPS scroll 60.
- Mobile (4x CPU, slow 4G) : LCP 2444 ms (élément img), **CLS 0,241**, débordement horizontal non, cibles trop petites 1 (`0493 46 79 71`, 170x23), éléments GL cachés 0, FPS scroll 60.
- Clavier : 12 arrêts, focus visible manquant 0, focus invisible 0, piège non, lien d'évitement en premier non.
- Survol : 1 cible où le changement est seulement de couleur.
- Réduction de mouvement : pas de mouvement après chargement, texte caché 0.

### Carte `/escale-en-vue/awwwards/carte/` (dossier `escale-en-vue-item`)
- Captures : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/escale-en-vue-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/escale-en-vue-item/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- Axe : 0 violation, 0 serious. Contraste à revoir : 4.
- Desktop : LCP 700 ms (élément `p.page-tete__chapeau`), CLS 0, débordement non, cibles trop petites 0, FPS 60.
- Mobile : LCP 2652 ms (élément non relevé dans le résumé), CLS 0,018, débordement non, cibles trop petites 1, éléments GL cachés 0, FPS scroll 60.
- Clavier : 12 arrêts, focus visible manquant 0, focus invisible 0, piège non.
- Survol : 2 cibles où le changement est seulement de couleur.
- Réduction de mouvement : pas de mouvement, texte caché 0.

### 404 `/__shoot-missing-page-…` (page introuvable)
- Captures : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-build/404/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- Axe : **1 violation serious**, `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8` à 4,36:1 (seuil 4,5:1).
- Desktop : LCP 36 ms, CLS 0, débordement non, cibles trop petites 0, FPS 60.
- Mobile : LCP 224 ms, CLS 0, débordement non, cibles trop petites 1, FPS scroll 60.
- Clavier : 3 arrêts, focus visible manquant 0, focus invisible 0, piège non.
- Survol : 0 cible où le changement est seulement de couleur.

## Audit (`audit.mjs`)

FAIL : aucun.

WARN (5) :
- `/escale-en-vue/awwwards/` : meta description de 177 caractères (cible 50-160).
- `/escale-en-vue/awwwards/` : phrase répétée 2 fois, « Photos : Escale en Vue ! ».
- `/escale-en-vue/awwwards/a-propos/` : phrase répétée 2 fois, « Photos : Escale en Vue ! ».
- site : pas de `robots.txt`.
- site : pas de `sitemap`.

Poids : page la plus lourde `/escale-en-vue/awwwards/` ~748 Ko (HTML 4, JS 60 gz, CSS 5 gz, polices 87, images 592).

## Remarques de méthode

- La planche a été produite avec `scripts/planche.py` ; son analyse des options `--colonnes` et `--largeur` est fausse (les valeurs sont prises pour des fichiers et ignorées). Les planches sortent à la largeur 1920 px avec 19 images chacune.
- Le crawl de l'audit compte 4 pages ; le shoot en a photographié 3 (accueil, carte, 404).
- Les FPS desktop tournent sur GPU logiciel : valeur plancher.
