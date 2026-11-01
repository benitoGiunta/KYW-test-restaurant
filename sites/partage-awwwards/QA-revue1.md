# QA revue 1 : partage-awwwards (captures)

Build : `dist/partage/awwwards/` (node scripts/build-site.mjs, exit 0, 5 pages, journal `.logs/partage-awwwards-revue1-build.log`).
Serveur : `http://127.0.0.1:4502/partage/awwwards/`. Le port 4502 était déjà tenu par un `serve.mjs` lancé depuis ce dépôt (PID 10810, même dist) : le lancement de cette session a échoué en EADDRINUSE et le serveur existant a été utilisé. Il n'a pas été arrêté.
Captures : `.shots-partage-awwwards-revue1/` (summary : `.shots-partage-awwwards-revue1/summary.json`).
Journaux : `.logs/partage-awwwards-revue1-shoot.log`, `.logs/partage-awwwards-revue1-audit.log`.

## Pages

### home (`/partage/awwwards/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/home/` (40 fichiers)
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/home/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (serious 0) ; contraste à vérifier : 52
- CLS : desktop 0 / mobile 0.036
- LCP : desktop 100 ms (span.hero__tage) / mobile 1192 ms (span.hero__tage)
- Débordement horizontal : aucun (desktop et mobile)
- Éléments cachés : texte masqué en mode réduit 0 ; éléments WebGL cachés 0/0
- Cibles tactiles trop petites (mobile) : 2 ("Lire la carte et les prix" 156x23, "Ouvrir le plan" 94x23)
- Clavier : 12 arrêts, premier arrêt « Aller au contenu » ; skipLinkFirst = false ; focus visible manquant 0 ; focus invisible 0 ; piégé : non
- Survol : 7 cibles, 0 sans changement ; 0 changement couleur seule
- Défilement FPS : desktop 60 / mobile 60 (headless, à prendre comme plancher)

### partage-item (`/partage/awwwards/carte/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/partage-item/` (40 fichiers)
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/partage-item/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (serious 0) ; contraste à vérifier : 306
- CLS : desktop 0 / mobile 0
- LCP : desktop 116 ms (span.d) / mobile 1048 ms (p.chapo)
- Débordement horizontal : aucun (desktop et mobile)
- Éléments cachés : texte masqué en mode réduit 0 ; éléments WebGL cachés 0/0
- Cibles tactiles trop petites (mobile) : 1 ("Ouvrir le plan" 94x23)
- Clavier : 12 arrêts, premier arrêt « Aller au contenu » ; skipLinkFirst = false ; focus visible manquant 0 ; focus invisible 0 ; piégé : non
- Survol : 7 cibles, 1 sans changement (h-07 « 081 81 00 98 », réaction none) ; 0 changement couleur seule
- Défilement FPS : desktop 60 / mobile 60

### 404 (sonde de page absente : `/__shoot-missing-page-1793544052821`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/404/` (17 fichiers)
- Planche : `/home/user/KYW-test-restaurant/.shots-partage-awwwards-revue1/404/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 2 violations serious (document-title, html-has-lang), chacune sur `html` ; contraste à vérifier : 0
- Titre de la page : vide ; pas de h1
- CLS 0/0 ; LCP desktop 32 ms (pre) / mobile 212 ms (pre)
- Débordement : aucun ; clavier : une seule étape « (body: focus left the page) »
- Note : la sonde réponse ne sert pas `dist/partage/awwwards/404.html` (fichier présent, `lang="fr"` attendu côté site) : la réponse capturée est celle du serveur statique pour une URL absente. Les deux violations ne prouvent donc pas une erreur de `404.html`.

## Audit (`audit.mjs`)
- Résultat : 0 FAIL, 3 WARN
- WARN site : « 404 page has no <h1> (design it: a way back, in the site voice) »
- WARN site : « no robots.txt »
- WARN site : « no sitemap » (le build produit `sitemap-index.xml` et `sitemap-0.xml`, non détectés par l'audit)
- Page la plus lourde : /partage/awwwards/ ~485 KB (html 5, JS 61 gz, CSS 7 gz, polices 83, images 330)

## Points à noter (faits)
- Le champ `skipLinkFirst` vaut false sur les trois pages alors que le premier arrêt clavier est « Aller au contenu » (lien d'évitement présent). Vérifier la définition du champ avant conclusion.
- Les mesures desktop FPS sont faites en headless sur GPU logiciel (plancher, pas une mesure réelle).
