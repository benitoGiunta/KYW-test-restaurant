# Revue awwwards · Makimono · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un rouleau de sushi qui se déroule : MAKIMONO en lettres noires géantes sur crème, bandes vert nori, vraies photos de plats, barres haute et basse en forme de cylindre, rideau de transition.

Scores /10
- Design 8 : hero MAKIMONO pleine largeur + photo du nigiri flambé, alternance crème / nori cohérente (`rel/s-home-1440.png`) ; baseline et boutons du hero très petits à côté du titre.
- Usabilité 6 : appel et carte au premier écran, menu mobile OK (dialog, focus sur « Fermer », Échap ferme, liens 48 px), mais la page Réserver défile en horizontal à 390 px (scrollWidth 453).
- Créativité 8 : chasse du titre, rouleau haut/bas, titre qui se déroule ; pas de scène GL, assumé.
- Contenu 8 : 73 plats confrontés à donnees.json, 0 écart de prix (183 nombres vérifiés) ; aucune invention chiffrée ; une procédure déduite (F2).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 lien mort, noindex + mention + logo KYW sur 5 pages sur 5 ; un débordement mobile, 3 JPEG orphelins de 1,7 Mo dans dist.

## Méthode et limites
- `QA-revue1.md` absent ; le shoot revue1 a échoué (« browser closed », `.logs/makimono-awwwards-revue1-shoot.log`). Les captures de `.shots-makimono-awwwards-build` (11:04 à 11:13) précèdent le dist actuel (11:28, horaires du pied condensés) : non réutilisées pour les défauts.
- Mesures faites par moi sur `dist/` (11:28), serveur port 4837 (PID 5923, tué) : 2 scripts maison (axe-core de node_modules, console, requêtes, débordement, balises, cibles, alt, 5 pages x 1440 et 390, défilement à la molette) + menu, Échap, Tab, reduced-motion, polices < 13 px. Captures dans `.shots-makimono-awwwards-revue1/rel/`.
- Non remesurés (chiffres de QA-build.md conservés, antérieurs d'un build qui n'a touché que le pied) : LCP mobile 1,0 à 1,5 s, CLS ≤ 0,012, 60 fps.

## Findings (par gravité)

### F1 (majeur)
- **F1-1 · Réserver déborde à 390 px.** `document.scrollWidth` = 453 pour 390 (`qa1.json`, reservation@390) ; la capture pleine page fait 453 px de large. Éléments au-delà de 392 px : `A.tel-geant`, `DIV.groupe-boutons`, `A.bouton` « Écrire à contact.makimono@gmail.com » (right = 453), le `<form>` et ses champs (rognés à droite sur `v-resa-390.png` et `v-resa-390b.png`). Fichier : `src/pages/reservation.astro` ligne 27 (bouton mailto avec l'adresse complète en capitales, `white-space: nowrap` probable dans `.bouton`) et `.reserver__cta` dans `src/styles/site.css`. Correction : libellé « Écrire un e-mail » (l'adresse reste visible dans le pied) ou `white-space: normal; overflow-wrap: anywhere` sur ce bouton, `min-width: 0` sur les enfants de la grille ; contrôler `scrollWidth <= clientWidth` à 320, 360, 390 px. C'est la page de conversion du site et QA-build.md ne l'avait pas capturée (accueil, carte, 404 seulement).

### F2 (mineur)
- **F2-1 · Procédure de réservation déduite.** `donnees.json` → `reservation` : « Pas de réservation de table ; commande en ligne externe et téléphone ». Le site affiche « Réserver » (nav), « Réserver et venir » (CTA accueil, à-propos), titre « Réserver et venir », intro « Une table, un groupe… : appelez ou écrivez » et un formulaire. Le dossier ne prouve ni réservation par téléphone ni par e-mail (seulement « mieux vaut réserver » sur TripAdvisor). Correction : libellés « Nous joindre et venir » / « Contact », intro « Une question, une table pour un groupe : le téléphone et l'e-mail sont ceux du restaurant » ou marquer la procédure « illustrative ».
- **F2-2 · Généralisation d'une note.** `carte.astro` ligne 17 : « Les allergies et les menus végétariens se signalent au chef » pour toute la carte ; le dossier ne le dit que pour la Creative Box. Correction : limiter à la Creative Box (déjà dit dans `boxes`) ou retirer la phrase.

### F3 (finition)
- **F3-1 · « Lundi Au Samedi » et « Dimanche (Soir) » dans le pied** : `text-transform: capitalize` sur `.pied__horaires li span` (mesuré). Passer en `text-transform: none` et écrire « lundi au samedi », « dimanche, le soir » en minuscules après la majuscule initiale de ligne seulement.
- **F3-2 · axe `landmark-no-duplicate-contentinfo` (moderate)** sur les 5 pages : `footer.pied` du site + `kyw-footer`. Seule violation axe (0 serious/critical). Piège connu : passer `.pied` en `div` fait apparaître `region` ; tester les deux.
- **F3-3 · 3 JPEG orphelins dans dist** : `01-rolls-saumon-snacke-table` (679 Ko), `05-plateau-terrasse` (517 Ko), `03-poke-bowls-et-maki` (485 Ko) + `16-dessert-gyoza-pommes`, aucune référence dans les HTML/CSS (import non utilisé dans `src/lib/photos.ts` ligne 3). Retirer les imports ; `og.png` fait 388 Ko, à recompresser sous 300 Ko.
- **F3-4 · Titre « Ce qu'on promet »** (`a-propos.astro`, `h-valeurs`) : les trois lignes sont des constats (options végétariennes signalées, recommandations du chef signalées), pas des promesses. Préférer « Ce que la carte indique ».
- **F3-5 · Hero 1440 px** : baseline en 11 px capitales et boutons de 11 px à côté d'un titre de 200 px ; la colonne texte flotte au bas d'un grand vide sous « MAKIMONO » (`v-home-hero-1440.png`). Monter la baseline à 14 px et remonter le bloc texte.
- **F3-6 · Doublon d'information au premier écran** : « Midi et soir, du lundi au samedi… » (hero) et horaires en pied : acceptable, signalé seulement.

## Vérifié sans écart
Faits (nom, adresse, tél. +32 483 03 88 47, e-mail, horaires, URL Facebook/Instagram/Deliverect/Ordering Club) conformes à `donnees.json` ; 73 plats et 183 nombres retrouvés sur `/carte/` (6 « absents » = libellés réécrits des Fillings/Toppings/Sauces, prix présents) ; Fast Box (4 x 4 pièces) et Creative Box conformes ; 21 rolls dont 13 au choix de la protéine = `carte.json` ; 0 tiret cadratin, 0 tutoiement, 0 guillemet droit, ponctuation française correcte ; title/description uniques par page, un h1, `lang="fr"`, JSON-LD Restaurant, 404.html réelle designée (h1, title, lang) ; 5 pages 200, og.png, favicon, sitemap 200 ; reduced-motion : 0 texte à l'opacité < 0,5 ; focus : outline 2 px sur 9 arrêts, lien d'évitement en premier ; cibles < 24 px : 1 lien (« Ouvrir le plan », 245 x 20, desktop seulement).

## Ce qui est bien (à ne pas casser)
1. La chasse typographique MAKIMONO et le système cylindre/nori (barres haute et basse, rideau) : identité forte et propre à CE restaurant.
2. Honnêteté du contenu : aucune histoire, équipe, avis ou chiffre inventé ; formulaire qui dit clairement qu'il ouvre la messagerie ; toutes les photos légendées d'après `sujet`.
3. Accessibilité de base solide : menu dialog avec focus piégé et Échap, lien d'évitement, focus visible, 0 erreur console, JS 60 Ko gz.
