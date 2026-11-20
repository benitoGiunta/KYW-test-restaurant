# Revue portfolio · Carré d'herbes · passe 1
Verdict : A_CORRIGER (F0 : 0, F1 : 1, F2 : 4, F3 : 4)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une maison de bord de Meuse présentée comme un menu de salle sombre, vert forêt et cuivre, avec un cadre cuivre « carré » tracé sur la photo d'accueil et de gros prix en filigrane ; sobre, cohérent, peu de texte.

Scores /10
- Design 7 : palette vert/cuivre tenue sur 7 pages, hiérarchie des prix lisible (`carte-*` planche mobile), mais pages intérieures très aérées et uniformes (eyebrow + h1 capitales + chapô partout).
- Usabilité 7 : 0 débordement (7 pages x 1440/390), 0 cible < 24 px, menu mobile ouvert (liens 44 px), Tab visible (outline 2 px sur 8 arrêts de `/reservation/`) ; deux pages quasi jumelles « Les menus » et « Formules ».
- Créativité 6 : le cadre « carré » du hero est une vraie signature, le reste suit le gabarit velours (voir F2-4).
- Contenu 8 : 0 fait faux, 0 invention non marquée (voir « Contrôle des faits »), français propre, 0 tiret cadratin ; reste des répétitions.
- Technique 7 : build OK (QA : 7 pages), 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1364 ms (accueil) et 2364 ms (menu, limite) ; loader trop long (F1), une violation axe (F2-1).

## Findings

**F1-1 · Loader trop long.** `html.is-loaded` arrive à 3104-3175 ms (1440 px) et 3456-3477 ms (390 px, CPU x4), deux passes concordantes ; QA : héros stabilisé à 5089 ms (accueil) et 4763 ms (menu). Seuil du prompt : 2,6 s. Preuve : mesure `cdh-rev1-cible`, planche accueil `d-00-firstpaint.png` (écran vert avec « 000 »). Correction : ramener le loader à ≤ 2,2 s (tracé du filet 1,6 s lancé en parallèle, pas après le loader) ; vérifier que la stabilisation du héros passe sous 3,5 s.

**F2-1 · Violation axe `color-contrast` (serious) sur `/carte/` et `/histoire/`** (1440 et 390 px) : le chiffre filigrane `.chiffre > span` (#364538 sur #1b3730, 1,26:1, 281 px). Il est `aria-hidden` mais axe le signale quand même ; `/menu/` porte le même composant (`HeroPage.astro:9`). Correction : sortir le chiffre du texte (pseudo-élément `::before` avec `content: attr(data-chiffre)`, ou SVG en fond) pour qu'aucun nœud texte à 1,26:1 reste dans le DOM.

**F2-2 · Nom accessible du h1 faussé.** `HeroPage.astro:12` injecte `<span class="sr-only">{valeur} </span>` dans le h1 : un lecteur d'écran annonce « 4 Les menus », « 38 Formules », « 28 La maison ». Correction : retirer le span (le chiffre est décoratif, déjà `aria-hidden` ligne 9).

**F2-3 · Deux pages redondantes et nommées de façon confuse.** `/menu/` (« Les menus », plats du moment) et `/carte/` (« Formules », quatre prix) sont deux entrées d'en-tête qui se répètent : « Pas de carte à la carte : des menus en assiettes » figure sur l'accueil et sur `/menu/` ; les prix 38/55/68/85 € et le bon cadeau reviennent sur accueil, `/carte/`, `/fetes/` ; le couple « Damien Herbay est au fourneau, Anne-Sophie Gevaert-Herbay vous accueille en salle » est répété sur l'accueil et deux fois sur `/histoire/` (carte d'équipe puis paragraphe). Correction : fusionner Formules dans Les menus (prix en tête, plats dessous) ou renommer clairement (« Les prix » / « Les plats »), et ne garder la phrase des deux hôtes qu'une fois par page.

**F2-4 · Même structure sur chaque page = signe de gabarit.** Un eyebrow en petites capitales précède le titre de chaque page et de chaque section (« Quatre menus, une cuisine », « Le chef, la salle, le parc », « Noël, Nouvel An, bon cadeau », « Par téléphone, du mercredi au dimanche », « Les fêtes 2026 »…), puis un gros chiffre cuivre en filigrane (4, 38, 28, 10), puis un chapô de 500 px. Planche `carte/histoire/fetes/reservation` : les quatre pages se lisent pareil. Correction : retirer l'eyebrow là où il redit le titre (au moins sur `/reservation/` et `/fetes/`) et varier l'ouverture d'une page (photo plein cadre sur `/histoire/`).

**F3-1 · Apostrophes mélangées.** Droites dans la grande majorité (« Carré d'herbes », « d'aromates ») et typographiques dans 5 occurrences (« jusqu’à », « d’euros », `/fetes/`, `/menu/` : « d’olivier » dans les alt…). Uniformiser en ’ dans tout le texte visible.

**F3-2 · Formats d'heure mélangés.** « à partir de 10h » et « 13h15 » côte à côte avec « 12:00 à 16:00 », « 19:00 à minuit » (accueil, réservation, pied de page). Choisir un seul format (« 12 h à 16 h »).

**F3-3 · Poids d'image.** `photos/chap-parc-1080.webp` = 390 Ko (> 300 Ko) ; `terrasse-table.webp` 290 Ko, `parc-large.webp` 274 Ko. Page d'accueil la plus lourde : 1537 Ko (images 1409). Recompresser en qualité 70.

**F3-4 · Date en dur et réserve de donnée.** « fêtes 2026 » dans le h1 de `/fetes/`, le titre et le pied de page (déjà noté dans ETAT : à retirer après le 31/12). Accueil : « Gault&Millau, deux toques, 13,5/20 » sans la réserve « à confirmer (14/20 sur Trouve Ton Resto) » du dossier ; acceptable car intitulé « sur la fiche du guide », à garder ainsi.

## Contrôle des faits (extraction du `dist/` confrontée à `donnees.json`, `dossier.md`, `site-actuel/pages/_texte.txt`)
- Adresse, téléphone, horaires (jeudi-samedi midi + soir, dimanche midi, lundi-mercredi fermé), dernières commandes 13h15 / 20h15, parking 10 places, 28 ares, accès Route de Saint-Gérard : conformes.
- Prix 38 / 48 / 55 (69) / 68 (89) / 85 (113), fromages 15 € / 7 €, Noël 68 € (acompte 40 €, vin 7 € le verre, ris de veau +12 €), emporter 50 / 60 / 70 € (avant le 20 et le 27/12), bon cadeau 6 mois sauf samedi soir : conformes. Plats de la carte : tous présents dans `donnees.json` (foie gras, biche, poire, Saint-Jacques, ris de veau, poisson, desserts) ; « pithivier de biche » et « sablé Petit Bateau » viennent du site actuel.
- E-mail absent, pas de note Google/Tripadvisor, pas de GPS ni d'avis inventé : l'avis unique est cité sans nom, avec la mention « Témoignage affiché sur le site du restaurant ». 0 `T-faux`, 0 `T-invente`.
- Alt des photos : cohérents avec le champ `sujet` de `photos/index.json` ; aucun cuisinier ni plat nommé sans preuve.

## Contrôles techniques (mesures propres, 7 pages x 1440 et 390 px)
- Liens : 22 URL distinctes, 0 interne en erreur ; externes = Gault&Millau, carredherbes.be (3 chemins), Facebook, kyngroup.be, OpenStreetMap, `tel:`.
- Balises : `lang="fr"`, un seul h1 par page, ordre des titres 1 puis 2, `noindex, nofollow` (conforme au prompt portfolio), titre et description uniques, canonical, og:image, favicon, JSON-LD `Restaurant` (adresse, 7 plages d'horaires, téléphone) sur les 7 pages ; `robots.txt` et `sitemap` présents dans `dist/` (les WARN d'audit sont les faux positifs connus). Mention « Maquette KYW… » et un seul logo `kyw-footer__logo` partout.
- Reduced motion : 0 texte sous 0,5 d'opacité sur 7 pages. Contraste canvas nœud par nœud au repos : 0 écart (les 2,3 à 1,3 vus pendant le défilement sont des reveals en cours ; « Réserver » 1,44 sur `/reservation/` est un bouton à fond en pseudo-élément, faux positif).
- QA : 404 réelle `/404.html` conforme (titre « Page introuvable », h1 « Rideau », 0 violation axe) ; la « 404 » de la planche est la réponse brute du serveur.
- Hors périmètre de preuve : 6 `incomplete` axe sur fond photo (`.hero__sur`) non tranchés par axe ; lecture visuelle du hero et de la section fêtes à 1440 : texte lisible.

## Ce qui est bien
1. Contenu fidèle au dossier, tous les inconnus laissés vides plutôt qu'inventés (0 e-mail, 0 note).
2. Signature du cadre cuivre « carré » + hiérarchie des prix en grands chiffres : identité propre, lisible en 390 px (`carte-390-*`).
3. Solidité technique : 0 console, 0 débordement, CLS 0, reduced motion propre, focus visible partout, menu mobile fonctionnel.
