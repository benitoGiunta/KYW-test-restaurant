# Revue awwwards · Yayami Sushi · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site noir et sobre où un sceau rouge « 4,50 € les deux pièces » et son double en filet pointillé racontent que le nigiri se vend par deux, avec une carte lisible, une accroche remise et livraison, et une typographie à empattements pour le côté « maison ».

Scores /10 (relecteur seul, preuves ci-dessous)
- Design 7 : hero noir et rouge cohérent avec le client (photos sur fond noir, logo YAYAMI), carte propre (`rv1-carte-d`), mais pages « La maison » et « Commander » aux grands vides (colonne gauche de a-propos `d-03`, `d-04`), et le jumeau pointillé se perd sur le reflet du nigiri (`home/d-01-hero.png`).
- Usabilité 7 : menu mobile OK (aria-expanded true puis false après Escape), 14 Tab logiques, focus visible (outline 2 px), 0 cible < 24 px (mesuré 10 cas), mais la page Commander se déplace latéralement sur mobile (F1-1).
- Créativité 6 : un seul gag graphique (sceau/jumeau) tenu sur toutes les pages, sans loader ni WebGL ; repos animé seulement sur l'accueil (`idleMotion` faux ailleurs, noté par l'auteur) ; le reste est une mise en page éditoriale correcte mais sage.
- Contenu 7 : 47 plats + 9 menus confrontés à `donnees.json` par script : 0 écart de nom ou de prix (hors graphie œ), aucune invention chiffrée, pas d'avis ni d'histoire inventés ; texte court, un peu répétitif, deux affirmations de procédure non prouvées (F2-2, F2-3).
- Technique 7 : build présent, 0 erreur console, 0 requête en échec, axe 0 violation sur 5 pages x 2 largeurs, LCP mobile 1,0 à 1,5 s, CLS 0, 98 liens internes vérifiés (0 mort) ; pénalisé par le débordement horizontal de /reservation/ sur mobile.

Méthode et hypothèses : `QA-revue1.md` est absent ; j'ai réutilisé les captures du constructeur dans `sites/yayami-awwwards/.shots/` (home, carte, a-propos, reservation, 404 ; 23:31 à 23:45) car `dist/` (23:47) n'a aucun fichier `src/` plus récent (seul `public/kyw/kyw-signature-720.*` est postérieur aux captures). Mesures faites par moi sur `dist/` servi (port 4761, serveur arrêté) : axe-core complet, console, requêtes, débordement, texte de h1 contre sa boîte à 8 largeurs, Tab, menu, reduced-motion, liens, méta. Non mesuré : contraste nœud par nœud (axe laisse 6 à 20 « à vérifier » par page, causes lues : fond de CTA en pseudo-élément et fond de `.nav-cat`, donc incertitude de l'outil, pas un défaut établi) ; LCP et CLS repris de `report.json` du constructeur.

## Findings

### F1 (majeur)
- **F1-1 · Débordement horizontal de /reservation/ sur mobile.** Le `h1` « Commander » (`pages/reservation.astro:9`, classe `display--mega`, `styles/tokens.css:24` `--t-mega: clamp(4rem, 1rem + 14vw, 15rem)`) mesure 408 px de texte dans une boîte de 358 px à 390 px : `scrollWidth` 424 pour 390, page déplaçable (`scrollX` 34 atteint par `scrollTo`), dernière lettre coupée au bord (capture `rv1-deb-390_reservation_.png`). Mesures du même défaut : 320 px +66, 360 px +40, 412 px +30, 430 px +27 ; absent à 768 px et plus, et absent sur « La carte » et « La maison » (mots plus courts). `shoot.mjs` et le rapport du constructeur annoncent « aucun débordement » parce que le `body` est en `overflow-x: clip` alors que `html` défile. Correction : limiter ce titre à `font-size: min(var(--t-mega), 15vw)` (276 px de texte à 320 px, 336 px à 390 px, tout rentre) ou abaisser le plancher de `--t-mega` pour ce mot ; revérifier `documentElement.scrollWidth - clientWidth` = 0 à 320, 360, 390, 412, 430.

### F2 (mineurs)
- **F2-1 · Faute de français.** `pages/index.astro:50` : « retirée au Rue de Bruxelles 15 » (visible `home/m-02-scroll.png`, desktop `d-03`). Écrire « au 15 rue de Bruxelles » (adresse en forme courante, en minuscule).
- **F2-2 · « sur place ou chez vous ».** `pages/index.astro:44` suggère un repas sur place. Le dossier ne prouve que l'emporter et la livraison ; « sur place » n'y désigne que le retrait (« -10 % en venant chercher sur place ») et le dossier signale la salle comme contradiction non tranchée. Remplacer par « à emporter ou chez vous » (cohérent avec le hero).
- **F2-3 · Procédure non prouvée.** `pages/reservation.astro:10` : « on commande par téléphone ou sur le site de la maison ». `donnees.json` : commande en ligne WooCommerce, aucune mention de prise de commande par téléphone (le numéro existe, la procédure non). Reformuler : « Pas de réservation de table en ligne. La commande se fait sur le site de la maison ; téléphone : 081 34 37 89 » ou marquer illustratif. Même nuance pour le CTA « Appeler » : acceptable comme contact, pas comme « commander par téléphone ».
- **F2-4 · Pages maison et commande pauvres et vides.** « La maison » = deux paragraphes qui répètent carte, horaires et livraison (sections Horaires, Livraison, Paiement dupliquées sur /reservation/) ; colonne gauche vide sur ~40 % de la hauteur (`a-propos/d-03`, `d-04`). Le dossier ne donne ni histoire ni équipe, donc ne rien inventer : fusionner « La maison » avec la page Commander, ou y remonter les deux photos plus haut et supprimer le doublon Horaires/Livraison/Paiement.

### F3 (finition)
- **F3-1 · Deux-points orphelin en début de ligne.** Le titre de l'accueil (`index.astro:44`, `home/d-02-scroll.png`, `m-02-scroll.png`) casse avant « : sur place… ». Mettre une espace insécable avant « : » (et dans « plats chauds : à emporter », `hero__lead`) ; aucun NBSP avant « : » n'existe dans les 5 pages.
- **F3-2 · Redite.** « 10 % de remise à l'emporter, livraison dès 30 € » revient dans le bloc de l'accueil, la section zone, le pied de page, l'intro de /reservation/ et /a-propos/ ; garder le bloc et le pied.
- **F3-3 · 404.** `<link rel=canonical>` et `og:url` de `404.html` valent `/yayami/awwwards/404/` (`layouts/Base.astro:15`), la page est servie en `/404.html` ; sans effet sous noindex, à neutraliser.
- **F3-4 · Apostrophe droite** dans `data/carte.json:202` « Salade d'algues » (affichée telle quelle sur la carte) : « d’algues ».
- **F3-5 · Jumeau pointillé illisible sur le hero desktop** : il se pose sur le reflet du nigiri (`home/d-01-hero.png`, `h-01`), lisible seulement à côté du sceau (reduced-motion `r-01-hero.png`, mobile `m-01-hero.png`). Garder une zone vide autour de son point de repos.
- **F3-6 · Cartes menus de l'accueil** : deux avec photo, deux sans (Sapporo, Osaka), la quatrième coupée par la piste (`home/d-04-scroll.png`) ; photos 02 et 03 seulement disponibles de bonne qualité, assumer l'inégalité ou passer les quatre en typographie.
- **F3-7 · Pas de jury indépendant** (rapport du constructeur) : aucun score tiers ; à lancer par le superviseur.

## Vérifié sans défaut
Noms et prix de la carte (47 plats, 9 menus) ; coordonnées, horaires, URL de commande `yayami.be/shop/` ; mention « Maquette KYW, certaines données sont illustratives », un seul logo `kyw-footer__logo`, `noindex, nofollow` sur 5 pages ; `lang="fr"`, un `h1`, skip link, title/description/OG uniques, JSON-LD `Restaurant` avec adresse, coordonnées et horaires 12-14 / 18-22 ; reduced-motion sans texte invisible (3 pages) ; aucun tutoiement, aucun tiret cadratin ; images ≤ 340 Ko (udon-poulet) en AVIF/WebP, 424 Ko pour `og.png` ; `og.png` correct (nigiri, sceau, logo).

## Ce qui est bien (à ne pas casser à la révision)
1. Le sceau rouge « 4,50 € les deux pièces » et son jumeau pointillé : un motif unique, repris sur l'accueil, la carte, la 404 (« Il manque une pièce. ») et le pied « Deux pièces. ».
2. La carte : sections à grands titres avec photo détourée fond noir, prix alignés, navigation d'ancres collante ; données exactes et sans description inventée.
3. Le mobile est pensé (sceau et jumeau recomposés, piste des menus défilante au clavier, menu plein écran fonctionnel) et la performance est excellente (LCP 1,0 à 1,5 s sans loader).
