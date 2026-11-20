# Revue awwwards · Don Dino · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le restaurant comme un rythme hebdomadaire, « quatorze services par semaine » (7 jours x midi et soir), avec une grille d'horaires dont la case du service en cours ou à venir s'allume en rouge, sur un fond vert bouteille et crème, en capitales condensées Big Shoulders.

Périmètre : build du `dist/` du 20/11 16:42 (postérieur à `src/`, `find -newer` vide), captures du QA (`.shots-don-dino-awwwards-revue1/`, 16:42 à 16:45) réutilisées. Le QA n'a couvert que accueil, carte et une « 404 » qui est la réponse brute de `serve.mjs` (page KYW générique) : j'ai mesuré moi-même, sur mon port 4871, les 5 pages réelles (accueil, carte, histoire, réservation, `404.html`) à 1440 et 390 px (axe-core complet à 2 positions de défilement, console, requêtes, débordement, balises, JSON-LD, alt, cibles), capturé histoire, réservation et `404.html`, testé 11 horloges (`page.clock`), survol, Tab, menu mobile et mouvement réduit.

Scores /10
- Design 8 : parti pris net et tenu (vert/crème/rouge, capitales géantes, grille d'horaires comme signature), hero plein écran à 1440 et 390 px (`home/d-01-hero`, `m-01-hero`) ; retenu par les accents coupés des titres (F1-1).
- Usabilité 8,5 : téléphone et « Réserver » à portée sur chaque page, ancres de la carte (12 sur 12 présentes), Tab propre (lien d'évitement puis 7 arrêts, contour 2 px), menu mobile fonctionnel (6 liens), 0 cible < 24 px sur les 5 pages.
- Créativité 8 : la ligne d'état et la case courante sont réellement pilotées par l'heure de Bruxelles ; 11 horloges testées sur 11 justes (voir « Ce qui est bien »).
- Contenu 7 : faits tous conformes, mais une phrase absurde (F2-3), une note de production visible (F2-2), une photo qui désigne le patron sans preuve (F2-4) et une page histoire très mince.
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 0 violation axe (10 cas), `scrollWidth` = fenêtre partout, CLS 0, LCP mobile 1,26 s (QA), page la plus lourde ~688 Ko ; OG défaillante (F2-1).

## Findings

### F0 (bloquant)
Aucun. Build OK, 0 fait faux, 0 invention non marquée, mention + logo unique + `noindex, nofollow` sur les 5 pages (conforme au prompt § 3.3), `lang="fr"`, un seul `h1`.

### F1 (majeur)
- **F1-1 · Accents des capitales coupés dans les titres animés, au point de changer le sens.** Preuve : `/reservation/` h1 « Réserver un service. » s'affiche « RESERVER » (`dd-rev1-res-1440-0`, `pl-mob`), `/404.html` h1 « Cette page n'est plus à la carte. » s'affiche « PLUS A LA CARTE » (« plus à » devient « plus a »), vus à 1440 et 390 px. Cause mesurée : `.split-line-mask` en `overflow: clip` (SplitText, `src/engine/reveal.ts:29`) avec `line-height` 0,86 (`.display--mega`, `site.css:7`) ; en forçant `overflow: visible` sur les masques, l'accent « É » et le « À » réapparaissent (`dd-rev1-acc-all.png`). Même défaut visible sur les h2 splittés de l'accueil : « PATES ET GRATINES MAISON » (`home/d-03`), « VENIR A NANINNE » (`home/d-06`, `m-05`), et le h2 « Les pizzas, du four à la table » à vérifier après correction. Correction attendue : donner de la place à l'accent dans le masque, par exemple `.split-line-mask { padding-top: 0.2em; margin-top: -0.2em; }` (sur le modèle de `engine.css:68` qui traite déjà le bas), ou `overflow: visible` après la fin du reveal ; puis contrôler par capture d'élément chaque h1 et h2 contenant É, À, Â, Ê (réservation, 404, accueil) à 1440 et 390 px, et vérifier que l'accent ne touche pas la ligne du dessus (à `overflow: visible`, le « É » frôle déjà le haut des lettres de la ligne précédente sur la 404 : prévoir `line-height` de 0,92 minimum sur les titres à capitales accentuées).

### F2 (mineur)
- **F2-1 · Image OG défaillante.** `og.png` (1200 x 630) montre le titre coupé par la photo (« QUATOR », « SERVICE », « PAR SEM ») et composé en sans-serif de repli (Inter), pas en Big Shoulders. Aperçu de partage illisible. Correction : recomposer l'image avec le titre entier (« Quatorze services par semaine. » sur 3 lignes, taille réduite) dans la police du site, photo limitée au tiers droit.
- **F2-2 · Note de production visible sur la page histoire.** « Photos : Don Dino. Le portrait et la photo du four ne nomment personne : l'équipe en salle et en cuisine n'est pas présentée ici. » parle de la maquette, pas du restaurant (`histoire`, `pl-mob` bloc 4). Correction : garder « Photos : Don Dino. » et retirer la phrase (l'absence d'équipe se signale dans RAPPORT.md).
- **F2-3 · Phrase incohérente.** `src/pages/index.astro:60` : « Des spaghetti aux lasagne, la cuisine italienne côtoie les escalopes… » ; les spaghetti ne sont pas « aux lasagne ». Correction : « Spaghetti, lasagne et cannelloni côtoient les escalopes, les poissons et les viandes grillées. » (noms présents à la carte).
- **F2-4 · Photo sans identité sous le titre « Le patron est en salle. »** Sur l'accueil, le texte nomme Placido Scalisi juste au-dessus d'un homme en chemise blanche dont `photos/index.json` dit « identité non confirmée » (`home/d-04`, `m-04`). La mise en page le désigne comme le patron sans preuve. Correction : séparer le texte et la photo (la photo passe sous « Pâtes et gratinés » ou la salle), ou légender « Photo : un homme en salle » sans lien avec le nom ; l'alt actuel est déjà neutre.

### F3 (finition)
- **F3-1** Virgule du premier vers de « SEPT JOURS, / DEUX SERVICES. » qui descend sur le « C » de la ligne du dessous (`dd-rev1-home-1440-1.png`, `home/d-03`) : interligne 0,86 trop serré à cet endroit ; même correction que F1-1 (interligne).
- **F3-2** Carte, « Mixed grilled » : description « min 2 cvts - prix/cvt » (abréviations du PDF, `carte.ts`). Écrire « par couvert, minimum 2 » (le dossier dit : 35,70 € par couvert, min. 2).
- **F3-3** Histoire, à 390 px, le « : » de « « Il Condottiere » : né dans une cuisine » tombe en début de ligne (`pl-mob` bloc 4) ; mettre une espace insécable avant « : » (U+00A0, déjà de règle dans les données).
- **F3-4** Poids d'images au-dessus de 300 Ko dans `dist/_astro/` : `10-pizza-anchois-epinards` webp 353 Ko (jpg de repli 627 Ko), `03-pizza-planche-bois` jpg 391 Ko, `12-plat-escalope-salade` jpg 448 Ko ; abaisser la qualité des variantes servies. Photo 09 (homme à la pizza, source 510 px) agrandie à 40 vw sur bureau : légèrement molle.
- **F3-5** « Midi ou soir, un appel suffit. » (`reservation`) : formule non prouvée par le dossier (téléphone ou formulaire en ligne) ; la tournure « un appel suffit » est une promesse de procédure. Préférer « Réservez par téléphone ou par demande en ligne. »
- **F3-6** Page histoire très mince (deux paragraphes, deux photos) : assumé par le dossier (histoire « en une phrase » sur le site actuel), rien à inventer.

## Faux positifs du QA à ne pas corriger (et chiffres confirmés)
- « 404 : color-contrast serious » et « cible tactile 128 x 20 » : mesurés sur la page KYW générique renvoyée par `serve.mjs`, pas sur `404.html` du site. Le vrai `404.html` : 0 violation axe aux deux largeurs, 0 cible < 24 px, h1, title, lang, noindex présents, boutons « Retour à l'accueil » et « Voir la carte » à 52 px de haut.
- « Lien d'évitement en premier : non » et « survol sans changement » (4 CTA de l'accueil) : le premier Tab est « Aller au contenu » ; les deux CTA du hero changent bien au survol (captures différentes, `site.css:237-240`).
- « No robots.txt / sitemap » : `sitemap-index.xml` et `sitemap-0.xml` existent dans `dist/don-dino/awwwards/` ; l'absence de `robots.txt` est à la racine du dépôt, hors périmètre du site.
- « Contrastes à vérifier » d'axe (1 à 9 par page) : aucun passé en violation à 2 positions de défilement, 10 cas ; non retenu.

## Vérifications faites (preuves)
- Faits : adresse, téléphone, 14 plages horaires, outil de réservation (lien `https://dondino.be/fr/reservations`), Facebook, équipements, paiements, langues : 0 écart avec `donnees.json`. Carte : 115 plats sur 115 retrouvés, 0 écart de prix, 0 écart de description hors typographie (apostrophes, « « fermée » »), 0 placeholder. Note Google non affichée (conforme au dossier : 350 ou 1033 avis, à confirmer). JSON-LD `Restaurant` : adresse, téléphone, 3 `openingHoursSpecification` (midi tous les jours ; soir 22:30 ; soir 23:30 le vendredi et le samedi), pas de `aggregateRating`.
- Liens : 16 liens uniques sur 5 pages ; 4 pages internes présentes dans `dist/`, 12 ancres de la carte présentes, `#main` présent ; liens externes aux URL du dossier (dondino.be, Facebook, OpenStreetMap). 0 lien `base` cassé.
- Horloge (heure de Bruxelles, `page.clock`) : ven. 10:00 « ce midi dès 12 h » ; 12:00 « service du midi en cours, jusqu'à 14 h 30 » ; 14:30 et 17:59 « ce soir, dès 18 h » ; 22:31 « service du soir en cours, jusqu'à 23 h 30 » ; 23:31 « demain midi » ; sam. 00:10 « ce midi » ; dim. 22:30 et 23:45 et lun. 22:31 « demain midi » (case mardi midi) : 11 sur 11 corrects, case rouge et jour du jour alignés.
- Mouvement réduit (390 px, défilement complet) : 0 élément à opacité < 0,5. Menu mobile : bouton visible, 6 liens, Échap ferme.

## Ce qui est bien (à ne pas casser à la révision)
1. La signature « quatorze services » : grille d'horaires en 14 cases dont l'état est piloté par l'heure réelle, avec une ligne « Prochain service » juste à tous les instants testés ; elle donne une raison d'être au site et ne ressemble à aucun gabarit.
2. Contenu rigoureux : 115 plats sans écart, photos légendées d'après le champ `sujet`, aucune invention (avis, presse, e-mail absents plutôt qu'inventés), hypothèse de fermetures exceptionnelles inconnues à signaler dans RAPPORT.md.
3. Technique propre : 0 erreur console, 0 violation axe, focus visible partout, hero stable (CLS 0), menu mobile et lien d'évitement corrects, pied KYW unique.

## Corrections à confirmer en passe 2
Capture d'élément (1440 et 390 px, après 4 s) de : h1 de `/reservation/`, h1 de `/404.html`, h2 « Pâtes et gratinés maison », « Venir à Naninne », « Les pizzas, du four à la table », « À table. » ; ouvrir `og.png` ; relire le texte extrait du `dist/` de l'accueil, de l'histoire et de la réservation.
