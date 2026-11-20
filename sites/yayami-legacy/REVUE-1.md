# Revue legacy · Yayami Sushi · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un menu de comptoir de sushi bar sur fond noir encre, avec le nigiri rouge en vedette, la carte en lignes d'index à prix alignés et un seul geste : commander (bouton rouge) ou appeler.

Passe 1, phase test. Build OK (QA-revue1 : exit 0, 3 pages). Preuves : QA-revue1.md (captures et planches de `.shots-yayami-legacy-revue1/`, postérieures au dist : 23:55 contre 23:46), plus mes mesures ciblées (serveur local port 4731, PID 28087, arrêté) : axe-core de node_modules sur accueil, carte et `404.html` réelle à 1440, 1024, 390 et 320 px (console, requêtes, débordement, `Range`, balises), Tab sur 39 stops à 1440 et 390 px, menu mobile à 390 et 320 px, page sans script, confrontation ligne par ligne de la carte (47 plats, 9 menus) à `donnees.json`, comparaison des textes de rayons à `site-actuel/infos.json`.

## Scores /10
- Design 7 : palette noir et rouge reprise du client, hiérarchie nette, hero au nigiri bien cadré (`d-01-hero.png`) ; mais la page « La carte » est un en-tête nu avec la moitié droite vide (`yayami-item/d-01-hero.png`) et les photos de plateaux (téléphone, JPEG compressés) tirent l'ensemble vers le bas.
- Usabilité 8 : CTA toujours visibles, rail de rayons sticky avec rayon courant, statut ouvert/fermé juste (fuseau Europe/Brussels, 4 cas lus dans le code), menu `<dialog>` OK (ouverture, focus sur « La carte », clic sur ancre ferme, Échap ferme et rend le focus au bouton, à 390 et 320 px), cibles 44 px, sans script tout est visible.
- Créativité 6 : sobre et cohérent, mais une seule idée (photo qui sort du fond) ; les chiffres « 30 € » et « 10 % » en très grand sont le seul moment fort ; reste proche du thème sombre de l'ancien site.
- Contenu 6 : faits exacts (0 écart sur 47 plats, 9 menus, adresse, téléphone, horaires, zone, paiement, lien shop), aucune invention ; mais les chapeaux de rayons sont des définitions de dictionnaire copiées de l'ancien site, dont une phrase coupée, et un chapeau parle de « prix du site ».
- Technique 8 : 0 erreur console, 0 requête en échec, scrollWidth = largeur à 4 largeurs, h1 unique, `lang="fr"`, noindex, mention et logo KYW présents sur les 3 pages ; limites : CLS mobile 0,054 et JSON-LD sans horaires.

## Findings

### F2 (majeurs légers, à corriger avant publication)
- **F2-1 Chapeaux de rayons génériques et phrase coupée** (`src/data/carte.json` : `texte` de chaque rayon, ex. ligne 302 ; affichés sur l'accueil « Faites votre choix » et sur `/carte/`). Preuve : accueil `d-05-scroll.png` et `yayami-item/d-04-scroll.png` : « La cuisine japonaise comprend une grande variété de riz et nouilles… », « Spécialité culinaire, sous forme d'un rouleau d'algue… », « Plutôt blonde et légère, la bière se trouve partout au Japon… ». Texte repris tel quel de `site-actuel/infos.json`, donc non inventé, mais encyclopédique : il pourrait figurer sur n'importe quel site de sushi et ne dit rien de Yayami. De plus « Une délicieuse salade, fraîche, savoureuse à servir aussi bien en entrée. » est la coupe de « …en entrée, voici la Salade japonaise! » : la phrase s'arrête sur « aussi bien en entrée » sans second terme. Correction attendue : remplacer par des chapeaux factuels tirés de la carte (ex. nigiri « 7 variétés, 4,50 € les 2 pièces » ; maki « 9 références de 5,50 € à 10 € » ; plats chauds « udon, riz japonais, gyoza, yakitori, karaage ») ; à défaut, couper la salade avant « aussi bien » ou la terminer proprement.
- **F2-2 « Toute la carte, avec les prix du site. »** (`src/pages/carte.astro:10`). Preuve : `yayami-item/d-01-hero.png`. Formule de note de travail : « du site » désigne l'ancien site du client, incompréhensible pour un visiteur. Correction : « Toute la carte, avec les prix. » (ou « Nigiri, maki, temaki, plats chauds, salades et boissons, prix compris. »).
- **F2-3 JSON-LD `Restaurant` sans horaires ni image** (`src/layouts/Base.astro:36`). Preuve : le script `application/ld+json` du dist contient nom, url, téléphone, adresse, geo, mais pas `openingHoursSpecification` ni `image`, alors que `donnees.json` fournit 7 lignes « 12:00-14:00, 18:00-22:00 ». Le prompt de revue attend adresse et horaires. Correction : ajouter `openingHoursSpecification` (Monday à Sunday, deux plages) et `image` (la photo og).
- **F2-4 CLS mobile de l'accueil 0,054** (seuil 0,05 ; QA-revue1.md, `home/report.json`). Desktop 0,039. Les polices viennent de Google Fonts en `display=swap` (`Base.astro:35`, 4 fichiers .ttf, 375 Ko) sans repli ajusté : suspect, non mesuré à la source. Correction : `size-adjust`/`ascent-override` sur le repli du display condensé (Sofia Sans Extra Condensed est bien plus étroite que le repli) ou précharger la graisse 200 ; remesurer le CLS mobile (cible < 0,05).
- **F2-5 Deux `contentinfo` par page** (axe `landmark-no-duplicate-contentinfo`, moderate, nœud `#horaires`, sur les 3 pages aux 4 largeurs ; absent de QA-revue1.md). Cause : `<footer id="horaires">` du site (`src/components/Pied.astro:5`) en plus du pied du paquet KYW. Correction : donner au pied du site `role="group"` ou le passer en `<div>` avec `aria-label`, après vérification que le nœud `region` n'apparaît pas (leçon huile-sur-le-feu : un `div role=group` seul a donné `region` moderate ; préférer un `<section aria-label="Horaires et adresse">`).

### F3 (finition)
- **F3-1 CSS dupliqué** : `src/styles/page.css` contient 36 règles identiques en double (ex. `.menus__in` lignes 95 et 148, `.matsu` 98 et 151, `.livr` 121 et 174, `.row--idx a:focus-visible` 115 et 168). ETAT.md annonce « CSS dupliqué retiré » : non, la seconde moitié (≈ lignes 148 à 262) répète la première. Supprimer le doublon.
- **F3-2 Photo 10-udon-poulet.jpg de 338 Ko** (> 300 Ko, `dist/yayami/legacy/photos/`) ; ré-encoder à ≈ 200 Ko (autres photos : 277, 226, 224, 216 Ko, proches du seuil).
- **F3-3 Anneau de focus collé au texte** sur les lignes d'index de l'accueil (`page.css:116`, `outline-offset: -2px`, aucun padding) : « NIGIRI » touche le trait gauche (capture ciblée de la ligne focalisée). Ajouter `padding-inline` à `.row--idx` ou un offset positif.
- **F3-4 Chiffres très espacés** : « 3 0 € », « 1 0 % », codes postaux « 5 0 0 0 » en graisse 200 avec tracking large (`d-05-scroll.png`) : lisibles mais se lisent « 3 0 » ; réduire l'interlettrage des chiffres de la section Livraison.
- **F3-5 Colonne vide sous la photo du Menu Matsu** sur l'accueil à 1440 px (`d-03-scroll.png` : ~400 px de noir à gauche, photo non collante) et photo de plateau faible (flou, couleurs ternes, légende « Menu Matsu. » avec un point final sur une légende de 2 mots). Rendre la figure sticky ou ajouter la composition du menu ; retirer le point.
- **F3-6 Titre de pied « À table »** (accueil, 404, `Pied.astro`) alors que la maison ne propose que l'emporter et la livraison (donnees.json, `reservation`) ; préférer « Commander » ou « Parcourir ».
- **F3-7 Page « La carte » : en-tête nu** (titre et une ligne, moitié droite vide, `yayami-item/d-01-hero.png`) ; y mettre la photo du rayon ou la bande Livraison / Emporter.

### Faux positifs de QA-revue1.md écartés (ne pas corriger)
- « 4 stops sans focus visible » (NIGIRI, MAKI, TEMAKI, PLATS CHAUDS) : l'anneau est porté par la ligne (`.row--idx:has(a:focus-visible)`, `page.css:116`), capture ciblée à l'appui. Les 39 stops à 1440 et 390 px sont visibles.
- Violation `color-contrast` de la 404 et cible 128x20 « la page d'accueil » : 404 brute de `serve.mjs` ; la vraie `404.html` a 0 violation de contraste, h1, lang, noindex, mention, logo ; ses liens sont à 44 px.
- 14 `color-contrast` « à vérifier » de l'accueil : fond grain en pseudo-élément ; mesuré à ≈ 5,9:1 sur « Livraison gratuite à partir de ce montant. ».
- WARN robots/sitemap/polices .ttf : bruit connu de l'outil sous `base`.
- `IMG` à `right` 1472 (1440) et 392 (390) : photo du hero agrandie, rognée voulue, scrollWidth intact.

## Ce qui est bien (à ne pas casser)
1. Carte exacte et complète : 47 plats et 9 menus identiques à `donnees.json` (prix, noms, détails, `Bœuf`, apostrophes, espaces insécables avant « € »), aucune donnée inventée, mention et logo KYW, noindex, 0 tiret cadratin.
2. Navigation et mobile : en-tête masthead avec CTA, rail de rayons à rayon courant, menu `<dialog>` irréprochable à 390 et 320 px, 0 débordement à 4 largeurs sur les 3 pages, contenu visible sans script.
3. Direction visuelle tenue : noir encre et rouge du logo, typographie condensée fine, hero au nigiri sans effets gratuits, un seul reveal, pas d'AI slop (pas d'eyebrow systématique, pas de trois cartes égales, pas de dégradé).

Décompte : F0 0, F1 0, F2 5, F3 7.
