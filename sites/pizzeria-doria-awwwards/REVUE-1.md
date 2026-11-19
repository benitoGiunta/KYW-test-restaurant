# Revue awwwards · Pizzeria Doria · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 4 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une carte rangée en « casiers » de banque, sur la salle des coffres du restaurant, en gris-béton, noir et rouge, avec une typographie condensée très grasse et des tiroirs qui s'entrouvrent.

Méthode : build et captures du QA (`QA-revue1.md`, dist 23:34 postérieur à `src/`, réutilisé) ; le QA n'a couvert que 3 pages sur 5 (accueil, carte, 404 brute), donc mesure maison ajoutée sur les 5 pages (accueil, carte, histoire, réservation, `404.html` réel) à 1440 et 390 px : axe-core complet, console, requêtes, débordement, cibles, contraste par nœud (canvas 1x1 + opacité cumulée), liens (21 internes), menu mobile, reduced-motion, Tab, 9 horloges simulées. Captures : `.shots-pizzeria-doria-awwwards-revue1/rev/`.

## Scores /10
- Design 8 : hero « PIZZERIA / DORIA » noir et rouge sur gris béton avec la photo de la salle des coffres (`home-fold-1440.png`), rigueur de grille, pied noir à filet vert-blanc-rouge ; pas de slop (aucun eyebrow, pas de trois cartes égales, pas de dégradé violet).
- Usabilité 7 : 0 violation axe sur 10 cas, 0 débordement, focus visible (outline 2 à 3 px), menu mobile OK (Échap le ferme), mais l'action principale « Réserver » mène à une procédure non prouvée (F1) et un formulaire `mailto` fragile (F2).
- Créativité 7 : le concept des casiers tient (index numéroté, 12 tiroirs, titre « Ici, la pizza se sert là où l'on gardait l'argent des autres. »), mais aucun WebGL ni loader, et l'histoire et la réservation sont des pages sobres photo + texte.
- Contenu 7 : 181 plats, 181 noms et prix identiques à `donnees.json` (script, 0 écart), horaires exacts, état ouvert/fermé juste sur 9 horloges ; mais 1 chiffre faux, 1 procédure inventée, des répétitions.
- Technique 9 : console 0, requêtes en échec 0, LCP mobile 1,0 à 1,2 s, CLS 0 à 0,002, poids accueil ~662 Ko, 21 liens internes 0 mort, `lang="fr"`, un seul h1 par page, JSON-LD `Restaurant` avec adresse, GPS et `openingHoursSpecification` exacts, `noindex, nofollow` et mention KYW présents sur les 5 pages, un seul logo KYW.

## Findings

### F1 majeur
- **F1-1 · T-invente · procédure de réservation par e-mail** : `src/pages/reservation.astro:9` (« La réservation se fait par téléphone ou par e-mail ») et `:18-24` (formulaire `mailto`, « Ouvrir mon e-mail », « la table n'est réservée qu'après réponse du restaurant »), `src/layouts/Base.astro:30` (`acceptsReservations: true`), meta description de la page (« par téléphone ou par e-mail »). Preuve : `dossier.md` § Site actuel : « bouton « Réserver une table » (outil à confirmer) et téléphone » ; `donnees.json` → `reservation.outil` « outil exact à confirmer » ; aucune mention de réservation par e-mail ni de délai de réponse. L'e-mail existe (contact), pas la procédure. Correction : écrire « Réservez par téléphone » seulement, garder l'e-mail comme simple contact (« Une question : info@pizzeriadoria.be »), retirer la phrase sur la réponse du restaurant, passer `acceptsReservations` à absent (ou conserver le formulaire en le marquant `placeholder: true` / « illustratif » dans le texte visible) et réécrire la meta description.

### F2 mineur
- **F2-1 · T-faux · « cinq vins au verre ou au pichet »** : `src/pages/index.astro:84`. Preuve : `donnees.json` catégorie « Vins au verre et pichets » = 5 lignes (verre 15 cl sélection Luigi 6 €, verre 3,5 €, 1/4, 1/2 et 1 L de pichet) : ce sont 5 formats, pas 5 vins. Correction : « un vin au verre, une sélection de Luigi à 6 € et des pichets de 25 cl à 1 L » ou simplement « des vins au verre et en pichet, dont une sélection choisie par Luigi ».
- **F2-2 · crédit photo inexact** : `src/data/site.ts:26` et le pied de page de chaque page affichent « Photos : Pizzeria Doria » alors que `histoire`, `index` et la fin de `carte` montrent des photos Unsplash (`07-stock-pizza-coupe`, `08-stock-pizza-basilic`, `09-stock-pate`, marquées `stock: true` dans `photos/index.json`). Les légendes proches disent bien « Photo libre illustrative », mais le crédit global est faux. Correction : « Photos : Pizzeria Doria et photos libres illustratives (Unsplash). »
- **F2-3 · formulaire `mailto` en `method="post" enctype="text/plain"`** : `reservation.astro:18`. Les champs partent en corps de message sans objet, et plusieurs clients (Gmail web, mobile) ignorent ce corps ; le texte « message prêt » promet plus que ce que garantit le navigateur. Correction : supprimer le formulaire (voir F1-1) ou construire un lien `mailto:…?subject=…&body=…` en JS à partir des champs, avec libellé « Préparer un e-mail ».
- **F2-4 · répétitions** : les heures d'ouverture figurent deux fois sur l'accueil (section « Heures d'ouverture » + bloc « Ouvert » du pied), deux fois sur la réservation (tableau + pied), et « Venir / adresse / plan » deux fois sur la réservation (section + pied) ; le paragraphe des midis d'école est identique sur l'accueil et la réservation (extraits `index.html`, `reservation/index.html`). Correction : sur accueil et réservation, retirer la section locale ou raccourcir le pied (garder le pied seul sur histoire, carte, 404) ; sur la réservation, ne pas dupliquer l'adresse.

### F3 finition
- **F3-1** Accueil, liste des casiers : numéros 01 à 05 puis « 10 » (Vins), sans que les 06 à 09 existent à l'écran, alors que l'intro dit « Douze casiers » : ajouter une mention « 6 des 12 casiers » ou numéroter 01 à 06 sur l'accueil (`home-1440.png`).
- **F3-2** Contraste mesuré 4,21 : 1 (seuil 4,5) pour « 22 lignes » et « 21,00 € à 39,00 € » du casier Vins à 390 px (script contraste, seul écart sur 10 cas) : assombrir le gris de ces légendes.
- **F3-3** Redondance dans la carte : « Pains (maison, 5 pièces) » puis la sous-ligne « 5 pièces » ; idem « Pains à l'ail et fior di latte (5 pièces) » (`carte/index.html`) : retirer la sous-ligne.
- **F3-4** Poids du déploiement : `dist/pizzeria-doria/awwwards/_astro/` contient des originaux non référencés par les pages (`07-stock-pizza-coupe…jpg` 634 Ko, `04-decor-bouchons…jpg` 588 Ko, `…webp` 397 Ko ; `grep` des 4 pages : 0 référence) ; `og.png` 344 Ko. Le stockage Vercel est compté : supprimer les originaux du `dist` si Astro les copie par `public/` ou les `import` inutiles. Le QA signale aussi 1 à 2 survols « sans changement » par page sans les nommer : à vérifier si le temps le permet.

## Réfutations de points du QA
- « 404 : color-contrast serious, cible 128×20 » : capture de la réponse brute de `serve.mjs`, pas de la vraie page. `404.html` mesurée à 1440 et 390 : 0 violation axe, 0 débordement, 1 h1, title, lang, noindex, mention et logo présents.
- `skipLinkFirst: false` : faux positif connu ; le premier arrêt de Tab est bien « Aller au contenu » (outline 3 px).
- 8 « contrast à vérifier » d'axe : mesurés nœud par nœud (276 à 1077 nœuds par page), 0 sous le seuil sauf F3-2.

## Ce qui est bien (à ne pas casser à la révision)
1. Le héros et le concept « casiers » : titre noir/rouge, photo réelle de la salle des coffres, index de 12 casiers, fil conducteur tenu de l'accueil à la 404 (« Ce casier est vide. »).
2. Exactitude de la donnée : 181 plats et prix sans écart, horaires et JSON-LD exacts, état « Ouvert / Fermé en ce moment » juste sur 9 horloges (dont dimanche 22 h → « demain à 12 h 00 », lundi 22 h → « jeudi à 12 h 00 »).
3. Robustesse technique : 0 console, 0 axe, 0 débordement à 390 px, reduced-motion sans texte caché (0 nœud à opacité < 0,1), menu mobile fonctionnel, LCP < 1,3 s.
