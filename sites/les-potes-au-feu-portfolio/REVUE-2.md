# Revue portfolio · Les Potes au Feu · passe 2

Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : deux chefs, deux couleurs (vert sapin et moutarde) séparées par une frontière verticale qui coupe le nom, l'en-tête et chaque page en deux colonnes « à quatre mains » ; l'idée est lisible dès la première capture et tient sur les 6 pages.

Méthode : `node scripts/build-site.mjs` OK (6 pages, `dist/` identique au commit, `git status` propre), serveur `serve.mjs dist` sur les ports 4472 (shoot) et 4473 (mini-scripts), `shoot.mjs --nav` sur les 6 pages en série (captures dans `.shots-rp2/<page>/`, 6 `exit=0`), `audit.mjs`, 44 URL internes en `curl` (0 hors 200, 0 lien sans la base), puis mini-scripts Playwright (`launch()` de browser.mjs) : 30 clics souris réels dans l'en-tête (6 pages × 5 liens), défilement complet à la molette (console, `scrollWidth`, éléments `data-reveal` cachés), reduced-motion, bascule de la carte par pas de 90 px (6 hauteurs), menu mobile au toucher. Captures regardées : feuilles desktop (7) et mobile (6) des 6 pages, plus hero, bas de page, citation, focus clavier de l'accueil en pleine résolution.

## Vérification des corrections annoncées dans REVISION-1.md

| Finding de la passe 1 | Statut passe 2 | Preuve |
| --- | --- | --- |
| F0-01 pied de page KYW invisible (desktop) | CORRIGE | `index/d-07-scroll.png` et `d-07` des 5 autres pages : colonnes d'adresse, bande « Les Potes au Feu, Namur », « Maquette KYW, certaines données sont illustratives. Réalisé par » et logo KYW visibles à 1440 px ; une seule mention par page (F3-04 réglé) ; mobile idem (`m-06-scroll.png`) |
| F0-02 nav d'en-tête inerte à la souris | CORRIGE | 30 `page.mouse.click` à scrollY 0 : 30 OK (`elementFromPoint` = copie « echo » sur la moitié moutarde, « face » sur la moitié verte et sur `reservation/`) ; à scrollY 500, 1500, 3000 sur l'accueil les 4 liens sont atteints (`hit echo`, href identique) ; focus clavier : en-tête passé sur papier, contour net (`index/k-02-focus.png`) ; burger mobile : tap sur « Les deux chefs » navigue |
| F1-01 citation Michelin | CORRIGE | `histoire/d-06` : « Un duo d'amis, Damien Gorjanec et François Schepens, revisite … sont au rendez-vous. », identique au dossier |
| F1-02 « premier service, à deux » | CORRIGE | texte de 2020 : « Le restaurant ouvre, la cuisine se fait à quatre mains. » (aucune occurrence de l'ancienne phrase) |
| F2-01 texte papier sur moutarde (carte) | CORRIGE | `rp2-shots/carte-1300…2300.png` : fin du menu du soir en papier sur vert, midi en encre sur moutarde, la limite des couleurs suit le bord des sections |
| F2-02 liste de l'accueil | CORRIGE | 6 lignes du menu réel, titre « Le menu du soir, 4 services, 67 € », fromage en note, aucun plat hors menu |
| F2-03 ordre inventé | CORRIGE | une étape « Parcours » par chef, plus de « Ensuite / Puis » |
| F2-04 photos | CORRIGE | portrait de profil lisible (`index/d-02`, `m-02`), bar en 3:2 sur réservation, légendes « photo prise en cuisine, pas le plat » |
| F2-05 loader trop long | CORRIGE EN PARTIE | desktop `loaderMs` 2 049 à 2 258 ms (3 136 à 3 262 en passe 1) ; mobile throttlé toujours 3 344 à 4 740 ms (voir F2-01) |
| F2-06 `figure tabindex` | CORRIGE | `histoire/report.json` : `keyboard.stuck: false`, plus de figure dans les arrêts |
| F2-07 formulaire | CORRIGE | formulaire retiré, bloc « Avant de venir » + 2 boutons Zenchef |
| F2-08 répétitions | CORRIGE | `audit.txt` : il ne reste que des lignes d'horaires, la ligne de frise « 2019 Avenue de la Plante » (commune aux deux chefs) et l'adresse/privatisation du bloc réservation recopiées dans le pied de page |
| F2-09 citations prêtées aux chefs | CORRIGE | une seule citation, signée « Le concept, sur le site du restaurant » (`les-deux-chefs`) |
| F2-10 identité de Sara | CORRIGE | « Personne sur la photo : à confirmer » |
| F2-11 carte complète | CORRIGE | phrase absente de dist |
| F3-01 espaces insécables | CORRIGE EN PARTIE | U+00A0 présents dans toutes les pages ; mais la citation de l'accueil laisse encore « ! » + « » » seuls sur une ligne en desktop (F3-01 ci-dessous) |
| F3-02 bœuf / œuf | CORRIGE | « Bœuf », « Œuf » dans les textes, images chargées |
| F3-03 meta 404 | CORRIGE | « sur le site des Potes au Feu » |
| F3-04 mention dupliquée | CORRIGE | une seule mention par page |
| F3-05 vides | CORRIGE EN PARTIE | carte réduite ; il reste des vides (F3-02) |
| F3-06 photos répétées | CORRIGE EN PARTIE | hero retiré de la galerie ; portraits des chefs répétés dans l'équipe, acceptable |
| F3-07 « Depuis 2020 » | REFUS ACCEPTE | fondé sur la BCE et le récit |
| F3-08 `sameAs` | CORRIGE | JSON-LD : `["https://www.facebook.com/lespotesaufeu.bistronomie/"]` |
| F3-09 `aria-labelledby` | CORRIGE | pointe vers le `h1` |
| F3-10 LCP mobile de les-deux-chefs | NON CORRIGE | LCP mobile mesuré en série : 2 376 ms (2 380 ms en passe 1), élément `img` ; la suppression de `data-reveal` n'a rien changé de mesurable (F2-02). Défilement mobile de l'accueil : 36 ips (25 en passe 1), amélioré mais non traité |

Scores /10 :
- Design 8 : frontière, nom coupé, duotone et bandes de couleur tenus sur 6 pages sans défaut de contraste visible (`index/d-01-hero.png`, `carte-sheet`), les trois vides majeurs de la passe 1 sont réduits ; il reste des plages vides de 230 à 400 px (F3-02).
- Usabilité 8 : navigation et « Réserver » cliquables à la souris sur 30 cas sur 30, focus visible, burger fonctionnel, deux boutons Zenchef et téléphone partout ; le loader mobile reste long (F2-01).
- Créativité 8 : frise à deux voix, étiquettes D et F, scène de photos liée à la liste des plats, loader qui se divise en deux couleurs, en-tête qui change de couleur au passage de la frontière.
- Contenu 8 : faits recoupés avec le dossier (adresse, téléphone, horaires, prix 67/52/40 €, Zenchef `rid=379477`, Facebook, Michelin, note Google « à confirmer »), citation Michelin exacte, vouvoiement, 0 tiret cadratin ; une réserve : « En salle, Sara et Jordan » sans marque (F1-01).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe (0 sérieuse), CLS 0, aucun débordement (`scrollWidth` 1440 et 390 sur les 6 pages), 0 élément resté caché après défilement, images toutes sous 300 Ko (max 264 Ko), polices préchargées, JSON-LD complet ; LCP mobile de les-deux-chefs à 2,38 s.

## Findings

### F0 (bloquants)

Aucun. Build OK, 0 erreur console, 0 lien mort, 0 débordement, 0 violation axe, mention + logo KYW + `noindex, nofollow` présents sur les 6 pages.

### F1 (majeurs)

**F1-01 · Rôle de Sara et Jordan affirmé sans marque : « En salle, Sara et Jordan les épaulent. »** (`src/pages/les-deux-chefs.astro`, section « Ensemble » ; `les-deux-chefs/d-05-scroll.png`, `m-04-scroll.png`).
Le dossier ne donne que « épaulés par la pétillante Sara et Jordan » ; rôles « inconnus (salle/bar probable, à confirmer) ». « En salle » est une donnée non prouvée présentée comme fait, alors que la page histoire la marque correctement (« Salle et bar (rôle illustratif) », « Salle (rôle illustratif) »). Selon la règle du prompt (donnée absente du dossier et non marquée), c'est le seul écart qui empêche `PUBLIABLE`.
Correction attendue : « Sara et Jordan les épaulent. » (formulation du site), ou ajouter « (rôle illustratif) » comme sur histoire.

### F2 (mineurs)

**F2-01 · Loader mobile trop long en throttlé.** `loaderMs` mobile : index 4 704, les-deux-chefs 4 740, histoire 4 281, carte 3 460, réservation 3 529, 404 3 344 (seuil du prompt 2,6 s) ; desktop 2 049 à 2 258 ms (conforme). Le LCP mobile est bon (0,99 à 1,16 s hors les-deux-chefs) et le loader ne se rejoue pas dans une même session (`sessionStorage`), mais le premier visiteur mobile attend 3 à 5 s sous 4× CPU. Correction attendue : en mobile, plancher 0,3 s déjà posé → vérifier que la sortie (`setLoaderExit`) ne dépasse pas ~1,2 s et que le compteur ne dépend pas du chargement des polices ; viser `loaderMs` mobile ≤ 2,6 s au prochain shoot.

**F2-02 · LCP mobile de `les-deux-chefs` inchangé (2 376 ms, limite 2 500).** `les-deux-chefs/report.json` : `mobile.vitals.lcpMs` 2 376, `lcpElement: img` ; passe 1 : 2 380. REVISION-1 annonçait la correction (portrait sans `data-reveal`) « non re-mesurée » : elle est mesurée, sans gain. Le portrait de François est le fichier `chef-francois.webp` de 149 Ko en 1351 px. Correction attendue : servir le portrait du hero en `srcset` 800/960 px (≈ 50 à 65 Ko) avec `fetchpriority="high"` et `sizes` mobile, puis re-mesurer (cible < 1,5 s).

**F2-03 · « Un dessert de saison cité par l'inspecteur : le menu change avec les produits, demandez celui du moment. »** (`carte.astro`, encart « Vu par le Guide MICHELIN 2026 », `carte/d-02-scroll.png`). Le Guide cite les cerises noires et griottes sans dire qu'il s'agit d'un dessert au menu actuel ; « demandez celui du moment » invite à demander un menu que le dossier ne décrit pas (« menu unique »). Correction attendue : « Cité par l'inspecteur du Guide MICHELIN : cerises noires et griottes, crumble de cacao, glace vanille au lait cru. » sans « de saison » ni invitation à demander.

### F3 (finitions)

**F3-01 · Orphelin « ! » + « » » en fin de citation sur desktop.** `rp2-shots/index-quote.png` : « … de l'assiette / ! » » sur une ligne seule (le U+00A0 est dans le texte, mais le découpage en mots du moteur (`data-split`) sépare « assiette » de « ! »). Correction : coller le dernier mot et la ponctuation dans le même `<span>` (ne pas scinder aux U+00A0) ou `white-space: nowrap` sur le groupe « assiette ! » ».

**F3-02 · Plages vides.** Accueil : ~400 px de vert sous la citation Michelin et ~230 px de papier avant « Réserver une table » (`index/d-06-scroll.png`) ; hero de l'accueil, ~280 px vides entre le nom et les portraits (`d-01-hero.png`, voulu par la composition) ; carte mobile, bande de papier de ~45 px entre « Le midi » et le bloc vert suivant (`carte/m-01-hero.png`). Correction : réduire le padding bas de la section avis (≈ 8 u) et la marge avant la réservation ; supprimer la bande de papier mobile de la carte.

**F3-03 · « Deux parcours ↓ » posé sur la frontière** (`index/d-01-hero.png`, x 734 px pour une frontière à 720) et à ~28 px sous la dernière ligne de texte de François ; la petite invitation est coupée visuellement et collée. Correction : la poser dans la colonne verte, avec 24 px d'air.

**F3-04 · Phrase « Aucun avis n'est cité ici sans l'accord de son auteur. »** (accueil, sous la note Google) : promesse que le dossier ne fonde pas, et l'avis Michelin est cité juste à côté. Correction : « Aucun avis client n'est cité sur cette maquette. »

**F3-05 · Note d'outil, pas un défaut du site :** `shoot.mjs --nav` écrit « no link to another page could be clicked » sur l'accueil et signale `hover.covered` pour « La carte » et « Réserver » (accueil, réservation, 404) : le test d'actionabilité de Playwright voit la copie « echo » au-dessus de la copie « face » (liens doublés par construction). Les 30 clics souris réels réussissent ; ne pas relancer de correction sur ce signal.

## Ce qui est bien (à ne pas casser)

1. La double copie d'en-tête (face papier clippée + écho encre à vrais liens) : un seul lien cliquable par point, focus clavier qui passe l'en-tête sur papier, burger mobile net ; ne pas remettre `inert` ni `background-clip: text` sur l'écho.
2. L'honnêteté des données : e-mail absent, avis inventés absents, note Google marquée « à confirmer », plats du midi et lunch marqués « illustratif », attribution aux chefs marquée, citation Michelin exacte, JSON-LD limité aux profils réels.
3. La construction du bas de page et de la carte : bande KYW claire sous les deux colonnes (z-index relatif sur `.footer` et `.kyw-footer`), sections de la carte portant leur propre couleur (fin de bascule propre), 0 débordement à 390 et 1440 px.
