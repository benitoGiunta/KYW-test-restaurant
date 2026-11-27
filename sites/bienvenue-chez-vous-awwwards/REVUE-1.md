# Revue awwwards · Bienvenue chez vous · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (formée sur les captures, avant DESIGN.md) : un repas en « escales » sur fond nuit, une route verticale rouge qui relie les sections, des assiettes rondes cerclées, et le téléphone en très grand pour réserver.
Note de méthode : l'en-tête de DESIGN.md (brief, concepts) a été lu avant les captures par erreur de plage ; le jugement visuel ci-dessous repose sur les planches et captures seules.

Scores /10 :
- Design 8 : palette nuit / rouge d'enseigne cohérente, Gambetta italique pour la voix du chef, assiettes rondes sur fond sombre (planche home d-01, d-04, m-01) ; hero qui remplit l'écran à 1440 et 390.
- Usabilité 7 : téléphone et adresse au premier écran, menu mobile lisible, formulaire mailto honnête (`enctype=text/plain`) ; mais mur horizontal mobile non focalisable et canal e-mail non confirmé (F1-2, F1-3).
- Créativité 7 : route verticale, rideau rouge de transition (d-90), 404 « Mauvais palier » ; mise en page ensuite assez uniforme d'une page à l'autre.
- Contenu 6 : faits du dossier justes (prix 49/69/79/94, adresse, horaires, 2002/2016/2020) ; mais 4 formulations de procédure ou de fréquence inventées (F1-1) et photos associées à de mauvais plats (F2-2).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 débordement de page, CLS 0,001 à 0,01, LCP mobile 1116 ms (accueil) et 2380 ms (carte), 60 FPS.

Couverture : le QA n'a capté que accueil, carte et 404 brute (la « 404 » du QA est la réponse brute de serve.mjs). Histoire et réservation ont été vues ici par captures ciblées (1440 et 390, trois positions chacune) ; axe complet, console, requêtes, débordement, cibles tactiles, h1, noindex, mention et logo mesurés sur les 5 pages réelles (dont `404.html`) à 1440 et 390 px. `dist/` (08:24) est postérieur à `src/` (aucun fichier plus récent), les captures du QA sont donc valides.

## Findings

### F0 (bloquant)
Aucun. Build OK (QA-revue1 : exit 0, 5 pages), 0 fait faux, métriques et avis non inventés.

### F1 (majeur)
- **F1-1 · T-invente · procédures et fréquences absentes du dossier, non marquées illustratives à l'écran.** `reservation.astro:14` « le chef répond entre deux services » ; `reservation.astro:43` « Dernières arrivées au début de chaque service : le repas se déroule en escales » ; `reservation.astro:52` « Sonnez, puis montez » ; `carte.astro:13` « Le chef change la carte chaque mois » (le dossier dit seulement « Les Saveurs du Mois » et des menus d'octobre/novembre ; règle commune : une fréquence ou une procédure déduite est une invention). Preuve : texte extrait de `dist/…/reservation/index.html` et `carte/index.html`, grep du dossier et de `donnees.json` négatif. Correction : supprimer ces quatre phrases ou les remplacer par des faits (« Les repas se prennent uniquement sur réservation », étage du restaurant), ou les marquer « illustratif » dans le texte.
- **F1-2 · axe `scrollable-region-focusable` (serious) à 390 px sur l'accueil** : `<div class="mur">` (mur de six assiettes défilant horizontalement) n'est pas atteignable au clavier. Preuve : axe-core de node_modules, accueil 390 px (absent à 1440 px, absent du QA qui ne lance axe qu'à 1440). Correction : `tabindex="0"`, `role="region"` et `aria-label="Assiettes du chef"` sur `.mur` (ou retirer le défilement natif), avec un focus visible.
- **F1-3 · E-mail non confirmé utilisé comme canal de réservation.** `restaurant.email` vient de `data/restaurants.json` avec la mention « à confirmer : domaine différent du site » (donnees.json, dossier.md) ; la page réservation le présente deux fois (formulaire mailto + « Ou directement à … ») et la meta description annonce « par téléphone ou par e-mail », sans mention d'incertitude à l'écran. Le téléphone (source tierce) est dans le même cas. Correction : afficher « à confirmer » à côté de l'e-mail et du téléphone sur la page réservation, ou faire du téléphone le seul canal principal et garder l'e-mail en secours explicitement illustratif ; retirer « ou par e-mail » de la description si l'adresse reste non confirmée.

### F2 (mineur)
- **F2-1 · Faute de ponctuation sur la carte.** `carte.astro:37` : « Midi, hors jours fériés. accords B + 30 €, C + 40 € » (minuscule après un point, également sur les trois autres formules) et espace simple dans « + 30 € » (à 390 px la ligne casse avant « + 54 € », capture m-03 de la carte). Correction : « Accords : B +30 €, C +40 € » avec U+00A0 entre signe, montant et « € ».
- **F2-2 · Photos associées à de mauvais plats sur la carte.** `site.ts:63-68` : « Filet pur de veau » porte la photo `plateauViande` (plateau en carton à emporter, « viande, champignons, feuilles dorées » selon index.json) ; « Dessert du moment » porte la `salade` (« Salade composée colorée, sorbet vert et feta ») ; « L'œuf parfait » porte `terrine` (« fleur croquante et agrumes »). Aucune ne montre le plat nommé ; `plateauViande` est en plus réutilisée pour la Box Bienvenue chez vous. Preuve : planche carte m-02 et `photos/index.json` (champ `sujet`). Correction : ne garder une vignette que si le `sujet` correspond (Saint-Jacques, smiley pour les douceurs, bouchées pour les grignotages), sinon supprimer la vignette.
- **F2-3 · Date en dur périmée.** `carte.astro:17` et `site.ts:60` « octobre 2026 » alors que la date du jour est fin novembre 2026 : le titre dit un mois dépassé. Correction : « Les saveurs du moment » sans mois, ou marquer la date illustrative.
- **F2-4 · Tarif des mercredis : procédure inventée.** `site.ts:82` « Tarif communiqué à la réservation » (placeholder dans le fichier, mais la page ne le dit pas à l'écran) ; le dossier dit « tarifs ambigus, à confirmer ». Correction : « Tarif à confirmer » ou « Tarif sur demande, illustratif ».
- **F2-5 · Icône jaune d'application (scan de texte) incrustée dans la photo de la carte de visite** (`09-carte-visite-serviette.jpg`, coin bas droit, visible sur histoire 1440 et 390 : cercle jaune avec « T »). C'est un artefact de capture d'écran du client. Correction : recadrer la photo au-dessus de l'icône (environ 18 % du bas et de la droite). Photo par ailleurs molle ; la réduire.
- **F2-6 · Pied de page KYW : `.kyw-footer__note` en #6b787d sur #fbfaf8 = 4,36:1** (QA 404 : serious, 2 nœuds). Le composant vient de `packages/kyw-footer` : à signaler à la session mère, pas à corriger dans le site. À 1440 et 390, mon axe n'a pas retenu cette règle sur les pages réelles (classée « à vérifier »).

### F3 (finition)
- **F3-1** `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages : le pied du site et `kyw-footer` sont deux `<footer>` de premier niveau. Recommandation : le pied du site en `<div role="presentation">` ou `<footer>` imbriqué dans `<main>`/section.
- **F3-2** Phrase d'horaires répétée 5 fois sur la page réservation (WARN audit) : acceptable, un tableau d'horaires suffirait.
- **F3-3** Survol : 1 cible sur 7 sans changement à l'accueil, 2 sur 7 sur la carte (`hovers`, QA) ; vérifier les liens de la liste de formules.
- **F3-4** Crédit « Photos : Bienvenue chez vous » : le dossier dit que le site remercie le photographe Anthony Florio pour certaines créations (à confirmer par photo) ; à noter dans le RAPPORT, aucun nom ne doit être affiché sans preuve.
- **F3-5** Ligne d'histoire « ouvre lui-même les bouteilles : à ses tables, tout passe par ses mains » (`histoire.astro:24`) : extrapolation de « cuisine, salle et cave » ; à raccourcir en « cuisine, salle et cave ».

## Contrôles passés (preuves)
- Faits : nom, adresse Rue Pépin 33 5000 Namur, téléphone +32 477 29 96 83, horaires mardi-samedi 12 h à 13 h 30 / 19 h 30 à 21 h, lundi et dimanche fermés, prix 49/69/79/94 €, suppléments d'accords, Box Tapas 199 € (174 € sans boissons), Box Bienvenue 109 €, 2002/2016/2020, Port-en-Bessin, 40 ans de métier : tous conformes à `donnees.json` et `dossier.md`. Aucun avis, note, récompense ni chiffre inventé.
- 5 pages réelles : 1 `h1`, `lang="fr"`, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives », un seul logo `.kyw-footer__logo`, 1 JSON-LD `Restaurant` avec adresse et `openingHoursSpecification`, titres et descriptions uniques, OG complet, `404.html` designée.
- Liens : tous les liens internes pointent vers des dossiers présents de `dist/` avec le préfixe `/bienvenue-chez-vous/awwwards/` ; `tel:` et `mailto:` corrects ; réseaux conformes à `donnees.json` ; 0 erreur console, 0 requête en échec, `scrollWidth` = fenêtre sur 10 cas (5 pages × 2 largeurs). Les 5 éléments « hors fenêtre » à 390 px sur l'accueil sont les assiettes du mur défilant.
- Pas de tiret cadratin, pas de ton tutoyé, apostrophes typographiques.
- Reduced-motion : texte caché 0, mouvement non respecté non (QA). Clavier : 12 arrêts, « Aller au contenu » en premier (le `skipLinkFirst: false` du QA est un faux positif connu), 0 focus invisible.

## Ce qui est bien (à ne pas casser en révision)
1. Le hero (assiette de Saint-Jacques cerclée de rouge, route verticale, téléphone et horaires dans le premier écran) et la mise en page mobile réellement recomposée.
2. L'exactitude des données : formules, accords et prix tous sourcés, aucun prix de plat inventé (`prix: null`), tarif des mercredis non chiffré.
3. Le rideau rouge de transition et la 404 « Mauvais palier » : cohérence de vocabulaire avec les « escales » et l'étage.

## À la révision (ordre)
F1-1, F1-2, F1-3, puis F2-1 à F2-5 ; F2-6 et F3-1 à la session mère si le composant partagé est en cause. Pas de QA complète : captures ciblées carte (390), accueil (390 clavier), histoire (photo recadrée), grep des quatre phrases.
