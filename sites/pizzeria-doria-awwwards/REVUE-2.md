# Revue awwwards · Pizzeria Doria · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 7 F3)
Lecture en une ligne de l'idée du site : une carte rangée en « casiers » de banque (salle des coffres), gris béton, noir et rouge, titres condensés très gras ; inchangée depuis la passe 1, la révision n'a touché que le texte.

Méthode : `QA-revue2.md` lu, mais ses captures (00:02 à 00:06) précèdent le `dist/` reconstruit (00:12:27) : tout ce qui suit est re-mesuré sur le `dist/` actuel (serveur propre, port 4761, PID noté puis tué). Script maison unique, 5 pages (accueil, carte, histoire, réservation, `404.html` réel) x 1440 et 390 px : axe-core complet, console, requêtes, débordement (enfants hors fenêtre), cibles < 24 px, h1, lang, noindex, logo, mention. Liens internes et `/…` racine vérifiés sur les 5 `dist/*.html` (0 mort, 0 lien sans préfixe). Captures : `.shots-pizzeria-doria-awwwards-revue2/rev/r2-*.png` (accueil 1440 haut, réservation 1440 et 390 lues). Pas relancés : LCP/CLS et horloges (la révision n'a pas touché au JS ; chiffres de la passe 1 et du QA : LCP mobile 1,05 à 1,23 s, CLS 0 à 0,002).

## Vérification des corrections annoncées par REVISION-1
- F1-1 (réservation par e-mail inventée) : CORRIGÉ. `grep` du dist : 0 `<form`, 0 `acceptsReservations`, 0 « ou par e-mail », 0 « réponse du restaurant » ; `reservation/index.html` dit « Réservez par téléphone » ; l'e-mail reste en contact (« Une question : info@pizzeriadoria.be », conforme au dossier) ; meta description réécrite (« par téléphone ») ; JSON-LD sans `acceptsReservations`, avec adresse, téléphone et 9 `openingHoursSpecification`.
- F2-1 (« cinq vins ») : CORRIGÉ. Accueil : « des vins au verre et en pichet, dont une sélection choisie par Luigi » ; « cinq vins » : 0 occurrence ; « Vingt-deux bouteilles » = 22 lignes du dossier.
- F2-2 (crédit photo) : CORRIGÉ dans le pied de page de chaque page (« Photos : Pizzeria Doria et photos libres illustratives (Unsplash) »), mais voir F2-2bis : la même variable est aussi rendue en légende de photo.
- F2-3 (formulaire `mailto`) : CORRIGÉ avec F1-1 (formulaire supprimé).
- F2-4 (répétitions) : CORRIGÉ. Accueil : plus de colonne « Ouvert » dans le pied, les horaires apparaissent une fois (« Mardi » x1 dans le texte visible) ; réservation : pied réduit à « Contact », section « Venir » unique, midis d'école absents (gardés sur l'accueil). Reste l'adresse deux fois sur l'accueil (F3-7).
- Ce qui n'a pas régressé : 0 violation axe sur 10 cas (5 pages x 2 largeurs ; 3 à 8 « contrast à vérifier » par page, mêmes que la passe 1), 0 débordement, 0 console, 0 requête en échec, 0 cible < 24 px, 1 h1, `lang="fr"`, `noindex`, un seul `kyw-footer__logo`, mention KYW sur les 5 pages, 4 liens de réservation vers `tel:` ou la page réservation, `pizzy.be` libellé « Commander à emporter ».

## Scores /10
- Design 8 : hero « PIZZERIA / DORIA » noir et rouge, photo réelle de la salle des coffres (`r2-home-fold.png`), page réservation sobre et lisible à 1440 et 390 px ; colonne gauche de la réservation vide sur 500 px à 1440 (F3-6).
- Usabilité 8 : le numéro de téléphone en très grand + « Appeler la Doria » rend l'action claire et vraie (plus de procédure fantôme) ; 0 axe, 0 cible trop petite.
- Créativité 7 : concept tenu (casiers, tiroirs, 404 « Ce casier est vide. ») ; ni loader ni WebGL, histoire et réservation volontairement sobres.
- Contenu 8 : faits vérifiés contre `dossier.md` et `donnees.json` (horaires, 22 bouteilles, midis 5 à 7,50 €, suggestions de novembre, Payconiq, Eggusto +2,50 €, fior di latte sans lactose sur demande, bières, dates 2017 et 2023) ; reste une règle de jours fériés déduite (F2-1bis) et un crédit mal placé (F2-2bis).
- Technique 9 : mesures ci-dessus ; 21 liens internes 0 mort ; JSON-LD exact ; état « Fermé en ce moment. Prochain service aujourd'hui à 12 h 00. » juste (vendredi 01 h 12 à Bruxelles) ; seul bémol, poids du déploiement (F3-4).

## Findings

### F2 mineur
- **F2-1bis · T-invente · règle des jours fériés** : `src/pages/reservation.astro:24` (« Le dimanche et les jours fériés : 18 h 00 à 21 h 30, sauf quand ils tombent un mardi ou un mercredi. ») et `src/data/site.ts:106`, affiché sur `histoire` (« Fermé le mardi et le mercredi, y compris les jours fériés qui y tombent. »). Preuve : `dossier.md` l.23 et `site-actuel/infos.json` donnent seulement « DIMANCHE & JOURS FÉRIES 18H00 – 21H30 » et « mardi et mercredi fermé » ; la règle « un férié un mardi ou un mercredi reste fermé » n'est écrite nulle part. Correction : réécrire en reprenant le client (« Dimanche et jours fériés : 18 h 00 à 21 h 30 ») et retirer le bloc « Fermetures » de l'histoire, ou marquer la précision « à confirmer ».
- **F2-2bis · crédit placé en légende d'une photo du restaurant** : `src/pages/index.astro:19` et `src/pages/histoire.astro:14` rendent `{site.credit}` en légende (« La salle des coffres. Photos : Pizzeria Doria et photos libres illustratives (Unsplash). », capture `r2-home-fold.png`) : la photo du héros est celle du client, la légende laisse croire à une photo Unsplash et double le pied de page (le WARN « phrase répétée 2 fois » du QA). Correction : légende « La salle des coffres. » (accueil) et « Entre les casiers. » (histoire) ; crédit global au pied seulement.

### F3 finition
- **F3-1** (reporté, non traité) Accueil : numéros 01 à 05 puis « 10 » alors que le texte dit « Douze casiers » (`r2-index-1440.png`).
- **F3-2** (reporté, non remesuré) Contraste 4,21 : 1 de « 22 lignes » et « 21,00 € à 39,00 € » du casier Vins à 390 px, mesuré en passe 1.
- **F3-3** (reporté) Carte : « Pains (maison, 5 pièces) » puis sous-ligne « 5 pièces » (4 occurrences de « 5 pièces » dans `carte/index.html`).
- **F3-4** (reporté) `dist/…/_astro/` : 5,3 Mo dont des originaux `.jpg` non référencés (`07-stock-pizza-coupe` 634 Ko, `04-decor-bouchons` 588 Ko, `08` 366 Ko, `09` 284 Ko ; 0 référence `.jpg` dans les 4 pages) ; stockage Vercel à ménager.
- **F3-5** Réservation à 1440 : la ligne du jour (vendredi) est décalée de ~8 px à droite des autres lignes (liseré rouge dans le flux, `r2-resa-1440-c.png`) ; compenser par une marge négative ou `box-shadow inset`.
- **F3-6** Réservation à 1440 : colonne « Par téléphone » vide sous « Une question » sur ~500 px face à la colonne horaires + plan ; déplacer « Venir » dans la colonne gauche ou centrer verticalement.
- **F3-7** Accueil : l'adresse figure dans la ligne du héros et dans « Venir » du pied ; retirer l'une des deux.

## Ce qui est bien (à ne pas casser)
1. Le héros et le concept « casiers » (titre noir/rouge, photo réelle, 404 « Ce casier est vide. »).
2. La page réservation : un seul chemin, le téléphone, en très grand, sans promesse non prouvée.
3. Robustesse : 0 axe, 0 console, 0 débordement à 390 et 1440 px, JSON-LD et état ouvert/fermé exacts.
