# Revue awwwards · Carré d’herbes · passe 2
Verdict : A_CORRIGER (F0 : 0, F1 : 0, F2 : 1, F3 : 3)

Lecture en une ligne de l’idée du site : un restaurant « au compte d’assiettes », carré vert et ronds d’assiettes sur fond noir, menus comptés en cercles, titre et numéro de téléphone géants comme seule porte de réservation (inchangé depuis la passe 1).

Base de preuves : `dist/` (17:09:14) postérieur à `src/` (`find -newer` vide) et à REVISION-1 ; captures de `QA-revue2.md` (17:09 à 17:15) postérieures au dist, donc réutilisées (planches accueil, carte lues). La « 404 » de ces captures est la réponse brute de `serve.mjs` (page « Refontes de sites… » ; son axe `color-contrast` 4,36 : 1 n’est pas la vraie 404, voir ci-dessous). Mesures propres sur serveur à moi (port 4883, PID tué) : 5 pages (accueil, carte, histoire, réservation, `/404.html`) x 8 largeurs (1920, 1536, 1440, 1280, 1024, 768, 390, 320) : axe-core complet, console, requêtes, débordement, titres par `Range` et masques, typographie par texte visible, noindex, mention, lang, h1 ; liens ; en-tête au défilement ; hero ; CLS/LCP sous CPU x4 + 4G en 2 passes ; polices.

## Vérification des corrections de REVISION-1

| Point | Annoncé | Constaté | Statut |
|---|---|---|---|
| F1-1 404 « Assiette vide » | tient à 1280 à 1920 | 404.html : 0 titre tronqué à 1920, 1536, 1440, 1280, 1024, 768, 390, 320 ; capture `cdh2-404-1440.png` : « Assiette / vide » entier, finit à x≈1222 | corrigé |
| F1-2 « Quand » rogné | tient dès 1440 | réservation : aucun masque `scrollWidth > clientWidth` du h2 à 1920 à 390 ; capture 320 : « Quand » entier | corrigé |
| F2-1 CLS carte mobile | 0,0098 | 0,0102 en 2 passes identiques (source `DIV.wrap`), accueil 0,0031 ; LCP 1,24 s carte, 1,25 à 1,32 s accueil ; polices Archivo et Newsreader 400 `loaded` (display `optional`, préchargées), seule l’italique Newsreader reste en `swap` | corrigé |
| F2-2 hero « s » dans le disque | écart positif | fin du texte / début du disque (Range par nœud de texte) : 705/759 (1280), 782/854 (1440), 984/1117 (1920) ; capture `cdh2-hero-1440.png` : le « s » finit à 72 px du disque | corrigé |
| F2-3 en-tête superposé | `top--fond` dès scrollY > 8 | classe `top top--fond`, fond `rgba(23,26,21,.95)` + `blur(10px)` à 1440 et 390 après défilement, retirée au retour en haut ; capture `cdh2-head-d.png` : barre pleine, aucune ligne de titre lisible sous le logo (reste un fantôme très atténué du titre « cinq assiettes » derrière la barre, acceptable) | corrigé |
| F2-4 Gault&Millau | supprimée | 0 occurrence dans les 5 pages du `dist` et dans le texte rendu | corrigé |
| F2-5 typographie | 0 apostrophe droite, 0 espace avant ponctuation | texte visible, 5 pages x 8 largeurs : 0 apostrophe droite, 0 tiret cadratin, 0 « nombre + espace + h / € » ; 0 espace simple avant « ? » dans le HTML (les 2 signalements de mon script sur « d’assiettes ? » et « Une table ? » sont des U+00A0 aplatis par `innerText`, faux positifs) ; capture `m-04`/`m-05` carte : plus de « : » seul en début de ligne | corrigé |

Aucune régression constatée : 0 erreur console, 0 requête en échec, 0 violation axe (5 pages x 8 largeurs, 0 sur la vraie 404 : le 4,36 : 1 du QA vient de la page du serveur, pas du site), `incomplete` `color-contrast` (4 à 8 nœuds par page) non contrôlés nœud par nœud cette passe : repris de la passe 1 (0 texte sous 4,5 : 1), CSS et couleurs inchangés hors correctifs. 0 débordement horizontal (`scrollWidth` = fenêtre partout), 0 nœud de texte à opacité < 0,1 après défilement, un seul h1 par page, `lang="fr"`, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives. » et un seul logo KYW (`kyw-footer__logo`) sur les 5 pages, JSON-LD présent sur chaque page, 10 liens distincts : tous les internes en 200 (liens externes non testés : OSM, Facebook, kyngroup.be, carredherbes.be/reservations).

## Scores /10
- Design 8 : identité tenue, hero désormais dégagé du disque (72 px à 1440), 404 en assiette vide intacte ; reste un titre rogné à 320 px.
- Usabilité 8 : en-tête lisible au défilement (fond 95 % + flou), menu et cibles inchangés, 0 débordement jusqu’à 320 px.
- Créativité 8 : inchangé, les ronds comptés tiennent toujours.
- Contenu 8 : 0 fait faux, 0 invention, note Gault&Millau retirée, typographie française nette ; reste la répétition de Réserver (F3).
- Technique 8,5 : build OK, 0 console, 0 axe, CLS 0,01 / 0,003, LCP mobile 1,3 s.

## Findings

### F2 (mineur)
1. **F2-A · À 320 px, le h1 de la carte perd le bas-droit de son dernier mot.** Page carte, `h1` « On compte en assiettes » : le masque de la ligne « assiettes » fait 288 px pour un texte de 297 px (Range jusqu’à 313 dans une fenêtre de 320) ; capture `cdh2-carte-320.png` : le dernier « s » est coupé net à x ≈ 304. Même défaut à 2 px près sur « Réserver » (290 > 288, lisible, capture `cdh2-resa-320.png`). Absent à 360 px et au-delà (script : 0 troncature à 390 et au-dessus). Correction : plafonner la taille du h1 sous 360 px (`clamp` avec un plancher plus bas, ou `font-size: min(…, 14.5vw)`) ou laisser le masque déborder de 1 rem (`padding-right` sur `.split-line`), puis revérifier à 320 et 340 par `Range`.

### F3 (finition, non traités par REVISION-1, périmètre F1 et F2)
2. **F3-1 · Répétition sur Réserver** toujours présente : « Il n’y a pas de réservation en ligne : on réserve par téléphone. Réservation par téléphone du mercredi au dimanche, dès 10 h. » et « acompte de 40 € par personne au restaurant du 25 décembre » (formulation ambiguë). Correction : « On réserve uniquement par téléphone, du mercredi au dimanche dès 10 h. » ; « Noël : acompte de 40 € par personne pour le repas du 25 décembre. »
3. **F3-2 · Histoire** : « Au fourneau » apparaît deux fois (titre de section et rôle de Damien Herbay). Correction : rôle « Chef ».
4. **F3-3 · Hero bureau** : le h1 est décalé de 32 px à droite du chapeau et de l’adresse en dessous (x 65 contre 33 à 1440, capture `cdh2-hero-1440.png`). À aligner sur la colonne du texte ou à assumer comme marge optique. Répétition de la même photo de plat sur la carte : non reconfirmée (un seul usage de `11-plat-assiette-noire` dans le HTML de la carte), à juger à l’œil à la prochaine passe.

## Ce qui est bien (à ne pas casser)
1. Les trois correctifs de mise en page sont propres : titres 404 et « Quand » entiers du 1920 au 390, hero respirant à toutes les largeurs bureau.
2. L’en-tête à fond au défilement ne casse pas la signature (la barre redevient transparente en haut de page).
3. Performance mobile excellente et stable avec `font-display: optional` + préchargement : CLS 0,01 sur la carte, LCP ≈ 1,3 s, polices bien chargées dès la première visite en réseau lent.
