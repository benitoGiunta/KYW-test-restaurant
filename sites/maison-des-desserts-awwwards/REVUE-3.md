# Revue awwwards · La Maison des Desserts · passe 3
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : la journée de la maison vue comme un cadran de comptoir de 8 h à 18 h (colonne d'heures, aiguille fixe, fonds qui passent du crème à l'ocre puis au brun), avec une carte rangée « heure par heure ».

Scores /10
- Design 7,5 : concept, palette et colonne d'heures intacts ; la frise de l'histoire et le cadran ne recouvrent plus de texte (planches `home/planche.png`, `maison-des-desserts-item/planche.png`) ; reste un fond en glissement sous une encre sombre sur la carte.
- Usabilité 7,5 : tel: correct, 86 liens internes, 0 mort, 0 débordement sur 5 pages x 4 largeurs ; 1 à 3 positions de défilement sur 45 à 50 où le cadran passe sur la colonne d'heures de la carte.
- Créativité 8 : fiction horaire tenue sur les 5 pages ; signature du cadran toujours supprimée sous 761 px (F3-5).
- Contenu 8 : faits conformes au dossier (aucun écart relevé depuis la passe 2, texte inchangé), 0 tiret cadratin, mention présente sur 5 pages ; finition F3 restante.
- Technique 7,5 : console 0, requêtes en échec 0, CLS mobile corrigé (0,0007) ; mais 1 règle axe `color-contrast` serious persiste sur la carte à 820 et 1024 px (F2-1).

Mesures de cette passe : `dist/` (05:15) postérieur à `src/` (`find -newer` vide), QA-revue3 (05:22) postérieur au dist : captures et audit réutilisés ; le QA ne couvre que l'accueil, la carte et la 404 brute (histoire et réservation absentes) : mesurées par scripts maison. Serveur propre sur le port 4837 (PID 21265, arrêté). Scripts via `scripts/q.sh` : axe-core de `node_modules` par pas de 800 px (repos 1,8 s) sur 5 pages x 1440/1024/820/390 ; contraste de la carte aux positions fautives après 1,8 s et 5 s de repos, 3 largeurs ; `Range.getClientRects` de la frise, de l'étiquette « Maison » et des libellés d'heures de la carte (820, 1024, 1280, 1440, 1536, 1920) ; recouvrement du cadran par nœud texte, pas de 300 px, 7 pages x largeurs ; CLS/LCP sous CPU x4 + réseau bridé, 4 pages x 2 passes ; liens et balises par Python sur `dist/`. La « 404 » du dossier `404/` du QA est la réponse brute de `serve.mjs` (title « Page introuvable · KYW », contraste du pied KYW 4,36 et cible de 20 px de `serve.mjs`) : faux positifs connus ; la vraie `404.html` donne 0 violation axe à 4 largeurs, 1 `h1`.

## Vérification des corrections annoncées (REVISION-2.md)

| Finding | Annonce | Verdict de la passe 3 |
|---|---|---|
| F1-1 frise « Aujourd'hui » percute son paragraphe | corrigé | Confirmé. Écart entre le libellé et le paragraphe (Range) : 111 px à 1440, 106 à 1536, 113 à 1920, 132 à 1280, 36 à 1024, 62 à 820, empilé à 390 ; 1946 et 1993 de 197 à 319 px. 0 recouvrement. |
| F2-1 contraste carte (`midi` + encre au glissement) | corrigé (0 violation) | **Partiel, non confirmé** : voir F2-1 ci-dessous. À 1440 : 0 violation (repos 1,8 et 5 s). À 1024 et 820 : violation persistante après 5 s de repos. |
| F2-2 cadran en pile verticale dans la colonne d'heures | corrigé | Confirmé : boîte 126 x 70 px à 820 et 1024, 128 x 71 à 1440. Carte : recouvrement sur 1 / 2 / 3 positions sur 45 / 46 / 50 (820 / 1024 / 1440), toutes dans la colonne d'heures (avant : 39, 37, 40). Accueil 1024 : 1 position sur 18 touche aussi du texte hors colonne d'heures (F3-1 ci-dessous). Page Histoire : cadran visible 0 fois sur 14 pas, voir F3-1. |
| F2-3 CLS mobile accueil | corrigé | Confirmé : 0,0007 aux 2 passes (avant 0,061) ; sources résiduelles `tranche 769>772` (3 px). Autres pages : 0,0101 (carte), 0,0069, 0,0038, toutes < 0,05. |
| F2-4 « Maison » contre le titre à 820 / 1024 | corrigé | Confirmé : écart entre l'étiquette et le titre 52 px à 820, 79 à 1024, 26 à 1280, 38 à 1440, 85 à 1920 (avant : -5, -10). |
| F3-1 libellés de la carte à la ligne | corrigé (règle liée à F2-4) | Confirmé : à 820 et 1024, 7 libellés d'heures sur 1 ligne, aucun dépassement de boîte, écart au corps ≥ 8 px. À 1440 « Toute la journée » passe sur 2 lignes avec 139 px de marge : sans défaut. |

## Findings

### F2 mineur

**F2-1 · Contraste insuffisant sur le début du chapitre « À commander » de la carte à 820 et 1024 px (non corrigé en totalité).**
Axe `color-contrast` serious, repos de 5 s (le fond glisse avec le défilement, il ne se stabilise pas) :
- 820 px, défilement 11600 : 3,51 : 1 (#231713 sur #956635), 32 nœuds, dont `#emporter > … > .rayon:nth-child(2) > .plats > .plat:nth-child(1) > .plat__nom` et `.plat__desc`.
- 1024 px, défilement 12000 : 4,43 : 1 (#231713 sur #ab753c), 34 nœuds, mêmes sélecteurs.
- 1440 px : 0 violation. Autres pages, autres largeurs, pas de 800 px : 0 violation (accueil, histoire, réservation, 404 réelle).
Cause : pendant le glissement `gouter` vers `soir`, le fond passe à mi-chemin entre #c98a45 et le brun, l'encre reste #231713. La correction de `peindre` (`src/motion/journee.ts`) n'a pas couvert cet état (REVISION-2 l'a relevé à 4,11 puis a annoncé « 0 violation » à 1440 seulement).
Correction attendue : dans `peindre`, calculer le contraste de l'encre courante contre le fond courant et basculer sur l'encre claire (celle du ton `soir`) dès que le ratio de l'encre sombre passe sous 4,5 : 1 ; ou verrouiller le fond en deux paliers (pas de teinte intermédiaire sous un texte). Relancer axe à 820, 1024, 1440 sur `/carte/` aux défilements 11200 à 12400 avec 5 s de repos.

### F3 finition

**F3-1** Le cadran reste hors de la page Histoire (visible 0 fois sur 14 positions à 1440, `.cadran` en `visibility: hidden`, `data-ton="gouter"`) et recouvre encore du texte à de rares positions : accueil 1024 (1 position sur 18 hors colonne d'heures), carte 1 à 3 positions dans la colonne d'heures (opaque). Hypothèse : la page Histoire n'a pas de tranche horaire, donc cadran masqué par conception ; à confirmer dans `journee.ts`. Correction : fond translucide du cadran (comme `color-mix`) ou décalage de 12 px de la colonne quand le cadran passe.

**F3-2** (reporté depuis la passe 2) Alts de `src/lib/photos.ts:19, 22` avec des détails absents du champ `sujet` de `photos/index.json` : « pierre bleue » et « éclairées à la tombée du jour » (sujet : « Façade et vitrine décorée de Noël, rue Haute Marcelle »), « Un mur rayé gris » (sujet : « Salle : mur rayé, tableau et tables »). Présents dans `histoire/` et `reservation/`. Correction : alts calqués sur `sujet`. Idem `site.ts:44` (« Les commandes de fêtes se retirent avant la fermeture », ligne de remplissage de la journée), non revérifié ligne par ligne.

**F3-3** `public/og.png` est une capture de l'accueil avec l'en-tête et le filet vertical qui traverse « Boulangerie, pâtisserie » ; image de partage non composée (lue à l'écran, inchangée depuis la passe 2).

**F3-4** Navigation « Réservation » et `<title>` « Réservation et accès » sur les 5 pages (nav) alors que la page s'intitule « Commander et venir. » et que le dossier ne prévoit pas de réservation de table. Libellé à aligner (« Commander et venir »).

**F3-5** Apostrophes droites dans `carte/index.html` : 14 occurrences (`&#39;`, exemples « salade d'herbes », « L'Apple »), le reste du site en U+2019 ; normaliser dans `src/data/carte.ts` (11 lignes à `d'`). Et le cadran reste supprimé sous 761 px (`site.css:279`) : le téléphone perd la signature du site (reporté de la passe 2, décision de design à assumer).

## Texte : conformité au dossier
- Texte inchangé depuis la passe 2 (REVISION-2 n'a touché ni `site.ts`, ni `carte.ts`, ni les pages) : faits, fêtes, signature, page « Commander et venir » toujours conformes ; aucune invention (pas d'avis, de note, de récompense, de statistique).
- 0 tiret cadratin sur les 5 pages, mention « Maquette KYW, certaines données sont illustratives » sur 5 pages sur 5, `noindex, nofollow` (conforme au prompt de variante) sur 5 pages sur 5, `og:image` présent, `<title>` uniques (« La Maison des Desserts · Pâtisserie et salon de thé à Namur », « La carte », « L'histoire », « Réservation et accès », « Page introuvable »).
- Liens : 86 liens ou sources internes confrontés à `dist/` : 0 mort, 0 lien racine sans base ; externes : boutique, Facebook, Instagram, OpenStreetMap, kyngroup.be.

## Fonctionnel : bilan
Console 0 et requêtes en échec 0 sur 5 pages x 4 largeurs, `scrollWidth` = fenêtre partout, axe : 1 règle serious (F2-1), 0 critique. QA : accueil, carte et 404 : 0 erreur, LCP mobile 1692 ms (accueil) et 1912 ms (carte) < 2,5 s, CLS 0 à 0,004, FPS 60, mouvement réduit 0 texte masqué. Poids maximal ~750 Ko (images 610), aucune image > 300 Ko signalée par l'audit. `settledMs` null sur l'accueil mobile (écran encore animé au plafond de mesure : mouvement de repos voulu, `reduced.moving` faux), non traité comme défaut. Mes LCP sous réseau bridé à 400 kb/s (3 à 8 s) ne sont pas des mesures de la « 4G lente » du QA : ignorées.

## Ce qui est bien (à ne pas casser à la révision)
1. Le concept du cadran de comptoir tient sur 5 pages : colonne d'heures, filet, fonds par tranche, carte « heure par heure », 404 fermée, pied « Rendez-vous à 8 h. ».
2. Les corrections de la passe 2 sont réelles et mesurables : frise de l'histoire (≥ 106 px d'air à 1440), « Maison » dégagé à 820 et 1024, CLS mobile 0,0007, cadran réduit à la colonne d'heures.
3. Texte propre : faits conformes, fêtes du 20 et 31 décembre, signature Henry de Hucorne, 0 filler, 0 invention.
