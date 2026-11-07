# Revue awwwards · INCORЯECT · passe 1
Verdict : A_CORRIGER (0 F0, 0 F1, 7 F2, 4 F3)

Lecture en une ligne de l'idée (avant DESIGN.md) : une pizzeria rock dont le nom porte un R retourné, repris comme signature typographique (mot-poster pleine largeur, Я orange dans chaque titre et dans le menu), sur vert nuit, crème et orange.

Note de méthode : `QA-revue1.md` n'existe pas pour cette variante (aucun shoot récent). Preuves prises sur les captures de `.shots/` (construction-3, postérieures à tout le `src/`, vérifié par mtime) et sur mesures maison du jour, sur `dist/incorrect/awwwards/` servi sur le port 4471 : 5 pages x 1440 et 390 px, axe-core complet, contraste canvas nœud par nœud après défilement à la molette, débordement, console, requêtes, liens, clavier, menu mobile, reduced-motion, LCP/CLS sous CPU x4 + 4G lente (2 passes).

## Scores /10
- Design 8 : mot-poster INCORЯECT pleine largeur, photo du four, accent orange sur vert nuit (`home/d-01-hero.png`, `m-01-hero.png`) ; alternance sombre/crème tenue sur 4 pages.
- Usabilité 8 : menu mobile plein écran fonctionnel (`aria-expanded`, Échap ferme), focus orange 2 px sur 9 Tab, CTA Réserver toujours visible ; défaut : cibles `Ouvrir le plan` de 19 à 23 px de haut (F2-7).
- Créativité 8 : le Я est lisible comme idée et décliné partout (titres, menu, 404, « À L'ENDЯOIT ? ») ; `d-00-firstpaint.png` montre le demi-tour en cours.
- Contenu 7 : fidèle pour adresse, téléphone, carte (56 plats et prix, 0 écart contre `donnees.json`), mais 4 formulations non prouvées (F2-1 à F2-4) et 3 photos seulement.
- Technique 9 : 0 erreur console, 0 requête en échec, axe complet 0 violation sur 10 cas, 0 débordement, contraste 0 nœud sous seuil, LCP mobile 0,91 à 1,0 s, CLS 0,014 à 0,023 (deux passes identiques), reduced-motion : 0 texte à l'opacité 0.

## Findings

### F2 (à corriger)
- **F2-1 T-faux (inexact)** `src/pages/index.astro:30` : « Dessus, du kimchi maison, de la betterave, de la porchetta » à propos de la pâte. La betterave n'est sur aucune pizza (Dwight Schrute est un pain/entrée « En attendant », `donnees.json` carte). Correction : « Dessus, du kimchi maison, de la porchetta, du potimarron. » ou citer les seuls ingrédients de pizzas (Ananas Montana : kimchi maison ; Coucou petite perruche : porchetta).
- **F2-2 T-invente** page d'accueil, bloc « Farine : Bodson » : « Des moulins belges, pour des bords bien colorés. » Le lien farine/couleur des bords n'est dans aucune source (le « bords bien colorés » vient du champ `sujet` d'une photo, pas de la farine). Correction : « Des moulins belges. » (source L'Avenir).
- **F2-3 T-faux** `src/pages/carte.astro:16` : « Relevée sur la carte papier du restaurant ». La source est `site-actuel/carte.pdf`. Correction : « Relevée sur la carte du restaurant (PDF du site actuel). » ou « Relevée sur la carte en ligne ».
- **F2-4 T-invente** `/reservation/`, tuile « Animaux » : « Les chiens sont acceptés. » Le dossier dit « animaux acceptés » (G&M). Correction : « Les animaux sont acceptés. » La tuile « Terrasse » (« Une terrasse accueille les beaux jours ») est à reformuler plus simplement (« Terrasse. ») : « beaux jours » n'est pas prouvé.
- **F2-5 Visuel** `404.html` : le h1 `Erreu<span class="r">r</span> 404` se coupe entre « ERREU » et « Я 404 » à 1440 et à 390 px (`h1-404html-390.png`, `404/d-01-hero.png`). Le mot est cassé, le Я orphelin. Correction : `white-space: nowrap` sur « Erreur » (span inline-block du Я inclus dans un conteneur nowrap) ou « Erreur » / « 404 » volontairement sur deux lignes.
- **F2-6 Cohérence horaires** accueil : la ligne du hero « Du mardi au samedi » est affirmée sans réserve alors que les sources divergent (G&M : mer-sam + dim midi) ; le JSON-LD `openingHoursSpecification` pose aussi ces horaires comme certains. Les blocs « Venir » portent bien « à confirmer ». Correction : retirer « Du mardi au samedi » du hero ou y ajouter « (à confirmer) » ; accepté pour le JSON-LD si le client confirme avant mise en ligne.
- **F2-7 Cibles tactiles** (WCAG 2.5.8, mesure `getBoundingClientRect`) : « Ouvrir le plan » 95 x 19 px (mobile) et 109 x 23 px (desktop) sur toutes les pages, liens de nav « Carte » 35 x 23 et « Histoire » 50 x 23, lien « ici » 14 x 17 (réservation, texte courant, exception en ligne tolérée). Correction : `padding-block` ou `min-height: 24px` sur `.lien-plan` et les liens de nav.

### F3 (finition)
- **F3-1** `404.html` : canonical `…/incorrect/awwwards/404/` (page inexistante) ; retirer le canonical de la 404.
- **F3-2** `/carte/` : les puces d'ancre disent « Pizzas classiques », « Autour des pizzas » alors que les titres sont « Les classiques », « Autour des pizzas » ; aligner les libellés. Mention « carte papier » : voir F2-3.
- **F3-3** `/histoire/` : « Le levain vient du métier d'avant » et « il a gardé le levain » sont des interprétations (ancien boulanger, source L'Avenir) plausibles mais non écrites ; adoucir en « Ancien boulanger, il fait sa pâte au levain ».
- **F3-4** JSON-LD : `name` « Incorrect » (le reste du site écrit INCORЯECT) ; `og.png` conservé de la phase 1, non recomposé (RAPPORT.md).

## Contrôles passés (preuves)
- Faits : adresse, 081 13 85 61 (`tel:+3281138561`), Barestho, Instagram, Facebook, horaires, 56 plats/prix identiques à `donnees.json`, dates de presse exactes, 3 liens presse présents, 0 tiret cadratin, vouvoiement et typographie française corrects, 0 donnée inventée de type avis, note, e-mail, places.
- Pied et mentions : « Maquette KYW, certaines données sont illustratives » et `.kyw-footer__logo` (1 par page) sur les 5 pages ; `noindex, nofollow` conforme au prompt de variante (leçon commune) ; `lang="fr"`, 1 h1, 1 `main`, JSON-LD Restaurant avec adresse, géo et horaires, OG, favicon, 404 designée.
- Liens : 4 liens internes et 4 ancres en 200 ; liens base corrects (`/incorrect/awwwards/…`) ; liens externes non testés (réseau).
- `skipLinkFirst: false` du shoot : faux positif (le lien « Aller au contenu » est le 1er Tab).

## Ce qui est bien (à ne pas casser)
1. Le concept du Я : un seul R retourné par titre, lisible, cohérent du hero au menu mobile et à la 404.
2. Rigueur technique : LCP < 1 s, CLS < 0,025, 0 violation axe, accents des capitales intacts une fois le titre posé (`res-h1-390.png`), menu mobile et clavier propres.
3. Fidélité de la carte : 56 plats et prix exacts, nuances conservées (« version végé 20,50 », « dès 6,00 € »), horaires honnêtement marqués « à confirmer ».
