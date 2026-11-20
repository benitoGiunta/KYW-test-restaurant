# Revue portfolio · El Greco · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une maison grecque de quartier racontée par des objets bleus dessinés au trait (amphore, olivier, brochette, verre) et des photos de stock des Cyclades, fond crème et bleu marine, titre « Saveurs grecques », carte complète lisible, réservation par téléphone.

Méthode : QA-revue1.md est incomplet (crawl bloqué sur carte/, audit non lancé, 3 pages sur 5 non capturées). Captures ciblées faites par moi sur `dist/` actuel (serveur port 4510, arrêté) : 5 pages x 1440 et 390 (+ 404.html réelle, 320 px), console, requêtes, axe-core (après 3,5 s de repos), débordement, liens internes (10, 0 mort), planches des captures d'accueil déjà prises. Le blocage de la carte n'est pas reproduit : `carte/` se charge en 116 ms, 0 erreur (le crawler seul a calé). Build non relancé (dist et src datés 21:09, QA-revue1 le dit OK). Photos : 3 stocks (Pexels, dossier : aucune photo du lieu), toutes légendées « photo de stock ». Aucun poids d'image > 150 Ko, LCP mobile accueil 2064 ms, CLS 0,005 (summary.json).

Scores /10
- Design 7 : identité cohérente (bleu/crème, objets au trait, cartes-polaroïds), hiérarchie claire (planche accueil d-01 à d-07) ; mais mot final « Kalí órexi ! » rogné en bas et accueil un peu répétitif.
- Usabilité 7 : carte lisible, CTA clairs, saut au contenu OK (1er Tab = skip-link) ; dock mobile coupé à 320 px et débordement mobile sur /carte/.
- Créativité 7 : tirages à déplacer et objets flottants donnent une vraie signature ; les photos de stock limitent l'effet.
- Contenu 6 : faits conformes au dossier, marquages « à confirmer » honnêtes ; mais « Bistronomie » inventé dans le title, texte « maison » dupliqué accueil/histoire, horaires affichés 2 à 3 fois par page.
- Technique 7 : 0 erreur console, 0 violation axe, 0 lien mort, lang fr, un h1, JSON-LD présent ; un débordement horizontal mobile et une heure d'ouverture calculée sur le fuseau du visiteur.

## Findings

### F1 (majeur)
- **F1-1 Débordement horizontal sur /carte/ en mobile.** Preuve : `scrollWidth` 396 pour 390 de large (366/360 ; 324/320), seule la page carte (accueil, histoire, réservation : 390/390). Éléments fautifs : `.curtain__panel` et deux `div` plein cadre, `right` = 396 à y = 0 (mesure en script, rs-check3/4). Cause probable : le rideau de transition (`#curtain`, `src/styles/engine.css:74`, `overflow:hidden` mais un parent mesure 396) reste posé à la largeur élargie sur cette page ; la page se laisse pousser de 6 px. Correction : mesurer d'abord quel parent mesure 396 (`getBoundingClientRect` des 2 `div` parents), le contraindre à `width:100%`/`inset:0` et `overflow-x: clip` sur `html` ; refaire la mesure `scrollWidth === innerWidth` à 390, 360, 320 sur les 4 pages. PUBLIABLE exige 0 débordement.

### F2 (mineur)
- **F2-1 `<title>` et OG : « Bistronomie à Bouge (Namur) ».** Preuve : `<title>`, `og:title`, `twitter:title` de l'accueil ; le dossier dit « restaurant grec familial », la description meta dit elle-même « restaurant grec familial ». Mot hérité du gabarit, positionnement faux (T-faux). Correction : « El Greco | Restaurant grec à Bouge (Namur) » (3 balises) ; vérifier `src/layouts/Base.astro` ou `src/data/site.ts`.
- **F2-2 Dock mobile coupé à 320 px.** Preuve : rs-320-hist.png, liens du dock Accueil 19-91, Carte 95-156, La maison 159-250, Réserver 253-336 pour un écran de 320 : « Réserver » est rogné (« Réser »). Correction : réduire l'espacement/padding du dock sous 360 px ou passer les libellés en `font-size` plus petit, largeur max `calc(100vw - 32px)`.
- **F2-3 État « Ouvert / Fermé » du bandeau calculé sur l'heure du navigateur.** Preuve : `src/motion/setup.ts:40-42` (`new Date()`, `getHours()`) sans fuseau ; capture prise à 22:13 à Bruxelles (jeudi, fermeture 22:00) affiche « Ouvert, arrivées jusqu'à 22:00 » car le navigateur est en UTC. Correction : `Intl.DateTimeFormat('fr-BE',{timeZone:'Europe/Brussels', hour:'2-digit', minute:'2-digit', weekday:'long', hourCycle:'h23'})` pour l'heure et le jour.
- **F2-4 Promesse de réponse non sourcée sur /reservation/.** Preuve : « écrivez-nous : nous vous répondons pour confirmer votre table » ; le dossier ne documente aucun processus d'e-mail (outil non identifié), seule l'étiquette « procédure à confirmer » nuance. Correction : « Appelez-nous au +32 81 20 07 47, ou écrivez-nous. » sans engagement de réponse, ou garder l'étiquette et le marquer placeholder dans `site.ts`.
- **F2-5 Texte de « La maison » répété mot pour mot.** Preuve : le bloc « Une maison de famille » (accueil, section La maison) est repris à l'identique dans /histoire/ (2 paragraphes), plus une 3e (vins, accueil, terrasse) ; la page ne dit rien de plus que l'accueil (le dossier n'a ni fondateur, ni équipe). Correction : réduire l'accueil à une phrase + lien, ou assumer sur /histoire/ une courte section « ce que nous ne savons pas encore » marquée placeholder plutôt que doublonner.
- **F2-6 Horaires redondants.** Preuve : accueil = bloc « Quand venir » + pied de page + marquee ; /reservation/ = « Quand venir » + pied de page ; chaque page de contenu répète tout le tableau (« lundi à confirmer… ») dans le pied de page. Correction : un seul tableau par page (garder « Quand venir » sur accueil/réservation, version compacte « jeudi à dimanche » dans le pied de page).
- **F2-7 Pied de page : mot « Kalí órexi ! » rogné.** Preuve : d-07-scroll, m-06-scroll, rs-d-histoire-4 : environ le tiers bas des lettres est masqué par la barre « Maquette KYW ». C'est l'intention de gabarit mais, vu sur mobile (rs-m-carte-4), la lecture est coupée, accent « í » compris. Correction : remonter la barre mention de 0,12 em ou réduire le masque à 0,15 em de la hauteur ; garder l'effet « posé sur le bord ».

### F3 (finition)
- **F3-1 Apostrophes droites.** « Ce qu'on partage à table » (`src/pages/index.astro:95`), « Toute l'histoire », « Retour à l'accueil », « n'existe pas » (404) ; tout le reste est en apostrophe typographique ’. Uniformiser.
- **F3-2 « de El Greco ».** Meta description et og de /carte/ : « La carte de El Greco » → « La carte d'El Greco ».
- **F3-3 Citation Trustindex dont les coupes `[...]` ont disparu.** Avis « Resto familial extra ! Un goût authentique au niveau des plats et vins. Profiter de la terrasse… » : l'original contient `[...]` entre les deux phrases et « profiter » en minuscule. Remettre `[…]`. La sélection est 4 positifs sur 7 (3 avis neutres ou négatifs écartés) : à arbitrer avec le client, la note Tripadvisor 4,0 donne le contrepoids.
- **F3-4 Horaires du dossier « à confirmer » exposés en JSON-LD sans réserve.** `openingHoursSpecification` jeudi-dimanche tirées de Trouve Ton Resto, « url » vers le site réel : acceptable pour une maquette ; retirer les horaires du JSON-LD tant qu'ils ne sont pas confirmés.
- **F3-5 Format d'heure.** « 18:00 à 22:00 » : en usage belge, « 18 h à 22 h ». Cohérent partout, donc finition seulement.
- **F3-6 Légende de la 3e photo de /histoire/.** Le texte visible reprend l'alt entier : « Terrasses blanches d'Oia au-dessus de la mer (photo de stock, pas le restaurant) photo de stock » (double mention). Garder la légende courte.
- **F3-7 Slogan marqué « exemple ».** « à partager, comme à la maison exemple » : étiquette conforme à la règle placeholder, à arbitrer (ETAT.md le signale déjà).

## Vérifications conformes (pour mémoire)
Faits : nom, adresse, téléphone, e-mail, horaires jeudi à dimanche, réseaux, prix et noms de plats alignés sur `donnees.json` (relecture des 12 catégories de /carte/), note Tripadvisor 4,0/121 et Trouve Ton Resto 4,3/5, citation « Depuis 1986 » attribuée au site. Aucune invention de chiffre, prix, récompense, nom d'équipe. Mention « Maquette KYW, certaines données sont illustratives », logo KYW (`kyw-signature-720.webp`) et `noindex, nofollow` présents sur les 5 pages dont `404.html` réelle. 0 console, 0 requête en échec, 0 axe, 10 liens internes/externes testés sans 404. Le 404 « Page introuvable · KYW » vu en dev est celui du serveur de test, pas du site.

## Ce qui est bien (à ne pas casser)
1. La signature visuelle : objets bleus au trait + tirages de photos à déplacer ; elle porte l'identité sans photo du lieu et reste lisible en mobile (m-01, m-02).
2. La carte : 12 catégories exactes, prix en pastilles, lisible à 390 px et sur deux colonnes en desktop (rs-m-carte-1, rs-d-carte-2).
3. L'honnêteté des marquages : photos « de stock », horaires « à confirmer », lundi à mercredi non inventés, 404 designée (« Cette table n'existe pas »).

Non vérifié (faute de capture complète) : hover et focus clavier de /carte/, /histoire/, /reservation/ ; transitions de page sur ces pages ; reduced-motion hors accueil. Les mesures de l'accueil (summary.json : 0 petite cible, `noVisibleFocus` 0, `hiddenTextReduced` 0) sont reprises du QA existant.
