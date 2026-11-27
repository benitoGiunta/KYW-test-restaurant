# Revue legacy · NE5T Hôtel & Spa (restaurant Intuition) · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 2 F2, 4 F3 ; les F2 sont à corriger au passage, aucun ne bloque)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : inchangée depuis la passe 1 : une ferme en pierre de nuit, brun chaud, serif doux et corail, table à prix affichés et spa ; les pages suites sont maintenant illustrées.

Preuves et limites : `REVISION-1.md` et `QA-revue2.md` n'existent pas pour la variante legacy (seuls ceux du portfolio existent) ; la liste des corrections vient du commit `b415e3a9` (diff `src/` relu). Le shoot `.shots-ne5t-legacy-revue2` est incomplet (`summary.json` : accueil seul ; `restaurant` et `404` en `shootFailed`). J'ai donc mesuré moi-même, serveur propre sur le port 4527 (PID 5810, arrêté) : script navigateur sur les 7 pages (dont `404.html` réel) à 390 et 1440 px (console, requêtes en échec, débordement, cibles < 24 px, images cassées, texte à opacité < 0,5 après défilement, axe wcag2a/aa/21aa/22aa + best-practice) ; liens internes confrontés à `dist/` (142, 0 mort) ; grep du `dist/` ; captures pleine page `suites` 390 et 1440 et accueil 1440 lues (planches dans le scratchpad). `dist/` (08:57:54) est postérieur à `src/` (08:56:39) : build à jour, non relancé pour ne pas modifier `dist/`.

Scores /10
- Design 8 : la page suites a maintenant photos et légendes (`suites-1440`, `suites-390`), rythme sombre conservé ; galerie des duplex aux hauteurs inégales.
- Usabilité 7,5 : 0 débordement, menu et CTA inchangés ; mais cibles tactiles repassées à 29 px (F2-1).
- Créativité 6,5 : inchangée, parti pris tenu, pages intérieures proches.
- Contenu 8 : faits conformes, deux généralisations corrigées, aucune invention ; quatre « description à fournir » visibles sur suites.
- Technique 8,5 : 0 erreur console, 0 requête en échec (favicon réglé), 0 axe sérieux ou critique, 0 lien mort, images < 300 Ko.

## Vérification des corrections annoncées (passe 1)
- F1-1 suites : CORRIGÉ. Photos `23-suite-terrasse-bain` (« Suite Terrasse »), `24-duplex-vauban`, `19-duplex-salle-a-manger`, `22-cuisine-ilot` ajoutées, légendes = nom du `sujet` de `photos/index.json` ; 4 chambres sur 6 portent un slot `.fill` « description à fournir » (`suites/index.html` : 4 occurrences) ; accueil : plus de `row--link`, 6 noms non cliquables + un lien « Voir les suites et duplex ». Bon traitement (rien d'inventé).
- F2-1 favicon : CORRIGÉ. `<link rel="icon">` data-URI sur 7 pages sur 7, 0 requête 404 mesurée à 2 largeurs.
- F2-2 méta : CORRIGÉ. canonical, `og:title/description/image`, JSON-LD `Restaurant` (adresse Avenue Vauban 46, 5000 Namur, téléphone, e-mail, sans heures) présents sur 7 pages sur 7 ; JSON-LD parsé sans erreur ; `og:image` en URL absolue. Deux réserves en F3-1.
- F2-3 « sous poutres » : CORRIGÉ. Lead = « Chacune a son style, dans la pierre de la ferme. » ; les 2 occurrences restantes sont l'alt de `18-chambre-lit`, qui montre bien des poutres.
- F2-4 vins : CORRIGÉ. « Une sélection de vins à table est proposée avec chaque formule, en supplément » et « choisit aussi les rhums » (dossier ligne 23 : vin et rhum).
- F2-5 cibles tactiles : PARTIEL, avec régression (F2-1 et F2-2 ci-dessous).
- F3-1 images > 300 Ko : CORRIGÉ (`01-facade-nuit-piscine` 311 → 146 Ko, `03-ailes-batiment` 454 → 213 Ko ; plus aucun fichier > 300 Ko dans `dist/ne5t/legacy/photos`).
- F3-3 dalle 35 € : CORRIGÉ en partie : `aria-label="35 euros pour les résidents"` ; le visible reste « 35 € » et la ligne « pour les résidents, 70 € pour les autres » juste à côté (lisible à l'écran, `home-mid`).
- F3-2 polices Google et F3-6 « Heures exactes : à confirmer » : non traités (reportés à la production, acceptable).

## Findings (par gravité)

### F2 (mineur)
- **F2-1 Régression : cibles tactiles 44 px → 29 px.** `src/styles/page.css:204` (règle ajoutée en fin de fichier) `.addr a, .foot__addr a, .link, .foot__nav a { display: inline-block; min-height: 24px; padding-block: 2px; }` vient après le bloc `@media (pointer: coarse)` (lignes ~168-173) et l'écrase à spécificité égale. Mesure à 390 px tactile : liens de pied de page (`.foot__nav a`, `.foot__addr a`) et `.addr a` = 29 px de haut (avant correction : 44 px). Reste au-dessus du minimum WCAG 2.5.8 (24 px), mais l'intention du DESIGN (44 px au téléphone) est perdue sur les liens empilés. Correction : placer la règle de 24 px avant le bloc `pointer: coarse`, ou l'envelopper dans `@media (pointer: fine)`.
- **F2-2 Liens en ligne encore à 18 px au bureau.** Mesure 1440 px : « 081 58 88 88 » 81 x 18 (accueil, restaurant, spa, infos) et « la page du spa » 90 x 18 (spa), tous dans `.schedule__note` (`<a>` en ligne dans une phrase, `display: inline`) ; le correctif ne visait que `.addr a`/`.link`. Ils relèvent de l'exception « lien dans une phrase » de WCAG 2.5.8, donc pas une violation, mais le finding F2-5 de la passe 1 les citait. Correction : `.schedule__note a { display: inline-block; padding-block: 3px; }` (déjà prévu au mobile, ligne 172).

### F3 (finition)
- **F3-1 Méta : détails.** (a) `404.html` porte `canonical = …/ne5t/legacy/404/` (adresse qui n'existe pas) : retirer le canonical de la 404. (b) `servesCuisine: "Cuisine de saison"` : le dossier dit « le menu change chaque mois, au rythme des saisons » (ligne 67), formulation admissible ; à garder ou remplacer par `null` si l'on veut rester strict. `canonical` + `noindex` sur une maquette est une contradiction bénigne.
- **F3-2 Galerie des duplex irrégulière au bureau.** `suites-1440` : les trois photos (`.suites-gallery`) ont des hauteurs différentes (840 px de source pour la 1re, formats différents) : légendes sur trois lignes de base différentes. Correction : `aspect-ratio: 4 / 3; object-fit: cover` sur les trois cadres. Même chose, plus discret, pour le grand vide au-dessus de « Les suites » (colonne texte alignée en bas de deux photos empilées) : `align-self: center`.
- **F3-3 Quatre « description à fournir » visibles** (Cosy, Ne5t, Blanche, Madeleine) en tag sur la page suites : placeholder déclaré et conforme à la règle (pas d'invention), mais très visible ; à remplacer dès que le client fournit les textes.
- **F3-4 axe best-practice `landmark-no-duplicate-contentinfo` (moderate) sur les 7 pages** : deux `contentinfo` (pied du site et pied KYW). Nœud non inspecté ; composant partagé `packages/kyw-footer` : à signaler à la session mère, hors périmètre. Alt de `24-duplex-vauban` = « Duplex Vauban » (nom, ne décrit pas la photo ; `sujet` : « Salon et mezzanine du duplex Vauban »).

## Contrôles de conformité (mesurés cette passe)
- 7 pages x 2 largeurs : 0 erreur console, 0 requête en échec, 0 débordement horizontal, 0 image cassée, 0 texte à opacité < 0,5 après défilement, 1 `h1`, `lang="fr"`, axe : 0 violation sérieuse ou critique.
- Liens internes : 142 testés contre `dist/`, 0 mort.
- Mention « Maquette KYW, certaines données sont illustratives », logo KYW et `noindex` : présents sur 7 pages sur 7.
- Faits : prix, adresse, téléphone, e-mail inchangés et conformes (relus en passe 1, textes modifiés vérifiés contre `dossier.md`). Aucune invention nouvelle ; les légendes viennent de `photos/index.json`.
- Jour courant : « Vendredi · Aujourd'hui » correct (27/11/2026 est un vendredi).

## Ce qui est bien (à ne pas casser)
1. Le traitement des suites : photos et légendes issues du `sujet`, placeholder `.fill` plutôt que du texte inventé (`suites-390`).
2. Le hero de l'accueil et le mobile (menu popover, lignes de prix empilées, 0 débordement à 390 px sur 7 pages).
3. La sobriété du texte : vouvoiement, pas de filler, phrases corrigées avec exactitude (vins en supplément, rhums, style des chambres).
