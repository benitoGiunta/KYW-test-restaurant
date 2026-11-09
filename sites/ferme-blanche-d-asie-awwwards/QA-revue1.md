# QA revue 1 — ferme-blanche-d-asie-awwwards (faits)

Build : `dist/ferme-blanche-d-asie/awwwards/` (exit 0, 5 pages construites). Serveur local : port 4502 (arrêté).
Captures : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/`
Audit : `.logs/ferme-blanche-d-asie-awwwards-revue1-audit.log` — 4 pages explorées (crawl), 0 FAIL, 7 WARN.
Note : le shoot a écrit 3 dossiers de pages (home, ferme-blanche-d-asie-item = /carte/, 404) ; la page /reservation/ citée par les WARN de l'audit n'a pas de dossier de captures.

## Pages

### home (`/ferme-blanche-d-asie/awwwards/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/home/planche.png`
- Erreurs console : 0 · Requêtes en échec : 0
- Axe : 0 violation (0 serious), 18 contrastes à vérifier (needs review)
- CLS : bureau 0 · mobile 0
- LCP : bureau 92 ms · mobile 1132 ms (throttlé)
- Chargement (load) : bureau 105 ms · mobile 2194 ms ; hauteur de page : bureau 8058 px · mobile 6525 px
- Débordement horizontal : aucun (bureau et mobile)
- Éléments cachés / gabarits : 0 cible tactile trop petite (bureau et mobile), 0 élément hors écran (glHidden), 0 texte masqué (reduced-motion)
- Clavier : 12 arrêts de tabulation, lien d'évitement présent en premier (`Aller au contenu`), 0 focus non visible, 0 focus invisible, pas de blocage
- FPS défilement : bureau 60 (pire frame 17 ms) · mobile 60 (pire frame 17 ms)

### ferme-blanche-d-asie-item (`/ferme-blanche-d-asie/awwwards/carte/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/ferme-blanche-d-asie-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/ferme-blanche-d-asie-item/planche.png`
- Erreurs console : 0 · Requêtes en échec : 0
- Axe : 0 violation (0 serious), 19 contrastes à vérifier (needs review)
- CLS : bureau 0 · mobile 0
- LCP : bureau 64 ms · mobile 1020 ms
- Chargement (load) : bureau 85 ms · mobile 1702 ms ; hauteur de page : bureau 6720 px · mobile 7683 px
- Débordement horizontal : aucun
- Éléments cachés / gabarits : 0 cible tactile trop petite, 0 élément hors écran, 0 texte masqué
- Clavier : 12 arrêts de tabulation, lien d'évitement présent en premier ; 0 focus non visible, 0 focus invisible, pas de blocage
- FPS défilement : bureau 60 · mobile 60

### 404
- Dossier : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue1/404/planche.png`
- Erreurs console : 0 · Requêtes en échec : 0
- Axe : 2 violations, toutes deux serious : `document-title` (pas de `<title>`) et `html-has-lang` (pas d'attribut `lang`) ; 0 contraste à vérifier
- CLS : bureau 0 · mobile 0
- LCP : bureau 52 ms · mobile 228 ms
- Chargement (load) : bureau 36 ms · mobile 215 ms ; hauteur : bureau 900 px · mobile 2121 px
- Débordement horizontal : aucun
- Éléments cachés / gabarits : 0 cible tactile trop petite, 0 élément hors écran, 0 texte masqué
- Clavier : 1 arrêt seulement, le focus quitte la page (`body`) ; pas de focus non visible
- Survol : aucune cible de survol détectée

## Audit (`audit.mjs`)
- Lignes FAIL : aucune (0 FAIL)
- Nombre de WARN : 7
  - `/carte/` : phrase répétée 2 fois : « Mise en bouche : salade de bœuf et avocat. »
  - `/reservation/` : phrase répétée 2 fois (3 WARN) : « Du lundi au vendredi 12 h à 14 h 30 18 h à 23 h », « Samedi 12 h à 14 h 30 18 h à minuit », « Dimanche 12 h à 15 h 30 18 h à 23 h »
  - site : la page 404 n'a pas de `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap`
