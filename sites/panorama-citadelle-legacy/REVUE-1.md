# Revue legacy · Le Panorama (panorama-citadelle) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : brasserie de la Citadelle en éditorial chaud (fond crème, titres Yeseva brun, un seul rouge cerise pour « Réserver »), photo de la Meuse en tête, carte complète en texte, bandeau brun sombre pour les trois arguments.

Scores /10 :
- Design 7 : hiérarchie nette et sobre, une seule couleur d'action (captures `d-home-haut`, `d-carte-haut`) ; le bandeau brun à trois colonnes égales est le seul gabarit « générique ».
- Usabilité 7 : navigation d'ancres de la carte correcte (top du titre à 192 px sous l'en-tête collant de 73 px), formulaire avec statut vocal ; mais prix collé au nom d'un plat sur mobile (F1).
- Créativité 5 : variante legacy, propre mais sans signature forte ; le héros photo Meuse porte tout.
- Contenu 8 : 44 plats et prix identiques à `donnees.json` (script de comparaison : 0 écart hors renommage de rubrique), horaires marqués « à confirmer », aucune invention repérée ; une partie du texte reprend le site actuel presque mot pour mot.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement, 0 lien interne mort, LCP < 1 s (QA) ; JSON-LD sans horaires, polices Google non préchargées.

Preuves : QA-revue1.md et ses planches (accueil, le lieu, 404) ; captures ciblées dans `.shots-panorama-citadelle-legacy-revue1/rel/` (la carte et la réservation, que le shoot n'avait pas capturées) ; script de mesures `pcl-mesures.mjs` (axe-core complet, 5 pages x 390 et 1440 px, console, réponses 4xx, débordement, cibles, liens) ; serveur propre sur le port 4761, arrêté.

## Findings
### F1 (majeur)
- **F1-1 · Carte, mobile : le nom du homard et ses deux prix se chevauchent.** « Homard « café de Paris » (1/2 ou entier) » est écrasé contre « 39,00 € / 75,00 € » à 360, 390 et 412 px (chevauchement mesuré : 47, 40 et 34 px ; capture `rel/m-carte-ancre.png`, on lit « Paris39,00 € / 75,00 € »). Cause : `src/styles/page.css:126` (`@media (max-width: 40rem)`), la colonne du prix tient dans `10 / -1` (3 colonnes) avec `white-space: nowrap` (ligne 123) alors que ce prix double est le plus long de la carte. Correction : sous 40 rem, laisser le prix passer à la ligne (`white-space: normal; text-align: right`) ou le placer sous le nom (`grid-column: 1 / -1; justify-self: start`) pour les lignes à prix double ; revérifier à 360, 390, 412 et 768 px.

### F2 (mineur)
- **F2-1 · JSON-LD `Restaurant` sans horaires** (`src/layouts/Base.astro`, objet `jsonLd`, vu dans `dist/.../index.html`) : adresse, téléphone et géo présents, aucun `openingHoursSpecification`, ni `url`, `image`, `sameAs`. Le prompt § C exige adresse et horaires structurés. Correction : ajouter 7 jours 08:00 à 23:00 (donnée du dossier, « à confirmer » dans le texte visible), `image` (02-vue-meuse), `sameAs` (Facebook, Instagram du dossier), `url`.
- **F2-2 · axe `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages, 390 et 1440 px** : le pied du site (`.foot`) et `kyw-footer` sont deux `<footer>` de premier niveau. Le composant `packages/kyw-footer` n'est pas à modifier : passer le pied du site en `<div role="presentation">` ou en `<section aria-label="Coordonnées">`, ou lui retirer le rôle contentinfo.
- **F2-3 · Polices non préchargées, feuille Google Fonts bloquante** (`Base.astro:27-29`, 3 familles, aucun `preload`) ; l'audit QA signale aussi des fontes TTF/OTF (376 Ko) sur la réservation et ~1,4 Mo pour `/le-panorama/` (images 1 030 Ko). Correction : réduire à 2 graisses utiles et `font-display: swap` explicite (déjà dans l'URL), ou auto-héberger en woff2 ; viser des images de la galerie du lieu < 300 Ko chacune.
- **F2-4 · Page « le lieu » : première image du bloc d'ouverture en `loading="lazy"`** (`dist/.../le-panorama/index.html`, `01-salle-principale-1600.webp`, remontée par sloplint 28a). Correction : `loading="eager"` et `fetchpriority="high"` sur cette image si elle est dans la première fenêtre.

### F3 (finition)
- **F3-1 · Mention de production visible au public** : « Carte d'automne 2026 transcrite depuis le PDF du restaurant. » (`la-carte.astro:29`). À remplacer par « Pain sans gluten sur demande. » seul, ou « D'après la carte d'automne 2026 du restaurant ».
- **F3-2 · Lien Itinéraire non encodé** : `https://www.google.be/maps?q=Rte Merveilleuse 82 \n5000 Namur` contient un espace et un retour à la ligne bruts (accueil, le lieu, réservation, pieds de page). Les navigateurs le corrigent, mais encoder : `?q=Route+Merveilleuse+82,+5000+Namur`.
- **F3-3 · Cible tactile** : lien « Le Panorama » de l'en-tête 133 x 20 px sur mobile (axe sans alerte, seuil WCAG 2.2 de 24 px). Ajouter `padding-block` ou `min-height: 24px`. Les liens téléphone et e-mail en ligne (19 px de haut) sont dans la tolérance « en ligne ».
- **F3-4 · Gabarit « trois colonnes égales »** sur le bandeau brun de l'accueil (carte signée, tarte flambée, La Pano) : même poids, même hauteur. Donner plus de place à un des trois (la Pano a une belle photo disponible : `15-biere-pano`).
- **F3-5 · Texte repris du site actuel presque mot pour mot** (page « le lieu » : « Une expérience pleine de charme, du cadre à l'assiette », « plat agréé par le chef étoilé », « on prend désormais de la hauteur », « vue imprenable ») : exact et sourcé, mais peu de reformulation ; la page d'accueil totalise 713 mots visibles (sloplint WARN, seuil 450). Resserrer le chapô de l'accueil et la section « Prendre de la hauteur ».
- **F3-6 · Anglicisme repris de la carte** : rubrique « Kids » (libellé du PDF, fidèle) ; acceptable, ne pas toucher sans accord client.

## Écarts de la QA corrigés par cette revue
- Le « color-contrast serious, 2 nœuds » de la capture 404 provient de la réponse brute de `serve.mjs` (`/__shoot-missing-page`) : mesuré sur la vraie `/404.html`, axe ne remonte que `landmark-no-duplicate-contentinfo` (F2-2). La 404 est designée (h1, retour accueil et carte, noindex, pied KYW).
- `la-carte` et `reservation-contact`, absentes des captures du shoot, ont été vues ici (planches `rel/pl-mobile.png`, `pl-d1.png`, `pl-d2.png`) et mesurées : 0 erreur, 0 débordement, 0 violation autre que F2-2.
- sloplint (self, genre `editorial`) : les FAIL « no :focus-visible », « no overflow-x: clip » sont des faux positifs (`base.css:6` définit `:focus-visible`, le `.btn:active` et `:disabled` existent, le CSS est dans un fichier externe que l'outil ne lit pas ; aucun débordement mesuré). Reste vrai : 713 mots sur l'accueil et l'image paresseuse (F2-4, F3-5). Marqué `self`.

## Vérifications sans écart
- Faits : adresse Route Merveilleuse 82, 5000 Namur, 081 84 11 34, groupes@panoramanamur.be (groupes dès 7 personnes), « pas de réservation pour la terrasse », Facebook et Instagram du dossier, lien de réservation `https://www.panoramanamur.be/reservation-contact/` (outil Zenchef du site actuel, `donnees.json`), horaires 8 h à 23 h avec mention « à confirmer ». « De 12 € à 98 € » : min 12, max 98 dans les données. 44 plats identiques, 4 menus de petit-déjeuner et menu des fêtes à 110 €, 4 PDF présents dans `dist/.../cartes/`.
- Aucune donnée inventée : ni avis, ni note, ni année de réouverture, ni e-mail de réservation individuel ; le formulaire annonce qu'il n'envoie rien (statut vocal `role="status"`, validation des champs, test : message « à corriger »).
- Alt des 9 images = champ `sujet` de `photos/index.json` ; le portrait du chef (18) n'est pas utilisé.
- Chaque page : un seul `h1`, `lang="fr"`, `noindex`, mention « Maquette KYW, certaines données sont illustratives », logo `kyw-signature` unique, title et description uniques, OG et canonical, favicon, sitemap. 14 ancres de la carte existent ; 8 liens internes sans 404. Reduced-motion : 0 élément à opacité 0 sur l'accueil. Focus : « Aller au contenu » en premier arrêt, contour 2 px.
- Typographie : apostrophes courbes, espaces insécables avant « : », guillemets « », vouvoiement, aucun tiret cadratin repéré dans le texte visible.

## Ce qui est bien (ne pas casser à la révision)
1. La carte entièrement en HTML, avec navigation d'ancres collée sous l'en-tête et titres qui atterrissent correctement (top 192 px, en-tête 73 px).
2. Un seul accent rouge réservé aux actions, bandeau brun pour le contraste ; contenu lisible à 390 px (accueil et réservation sans défaut).
3. Honnêteté des données : horaires « à confirmer », formulaire de maquette explicite, rien d'inventé sur la réputation.
