# Revue legacy · Monepi Boulangerie (mon-epi) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une vitrine de boulangerie en « registre de prix » (titres Yeseva One, lignes à points de conduite, papier crème et brun), qui met le four à bois en vedette et vend le pain comme une carte chiffrée.

Scores /10 :
- Design 7 : hero en deux colonnes (titre, index des cinq familles avec « dès x € », photo du four) cohérent et sobre (`home/d-01-hero.png`) ; photos portrait agrandies et molles (`d-05-scroll.png`), trous dans la grille de la galerie.
- Usabilité 7,5 : téléphone et adresse partout, menu mobile (popover) ouvert avec 5 liens de 52 px, 0 débordement sur 6 pages x 3 largeurs, 0 lien mort sur 6 pages.
- Créativité 6,5 : l'index-carte du hero est une vraie idée ; le reste (bandeau brun, listes, frise 1980-1996) est correct mais attendu.
- Contenu 8 : 29 lignes de carte sur 29 conformes à `donnees.json` (noms et prix, les 3 écarts apparents sont « 35 % » contre « 35% » et « - » contre « à »), horaires du lundi au jeudi marqués « à confirmer » comme dans les données, aucune invention détectée.
- Technique 6,5 : 1 erreur console (favicon 404), axe serious + moderate sur chaque page, CLS mobile 0,112, pas de JSON-LD ; 0 contraste sous seuil sur 327 nœuds de texte (4 pages, 1440 px).

Preuves : `QA-revue1.md` et planches `.shots-mon-epi-legacy-revue1/*/planche.png` (dist 08:28, captures 08:30, postérieures au `src/`, donc valables) ; mesures propres sur le serveur `dist` (port 4811, 6 pages x 1440/390/1920), planches `mon-epi-p1-planche-d.png` et `-m.png` du scratchpad (produits, galerie, contact, vraie 404 à 1440 et 390 px). La « 404 » de la planche QA est la réponse brute de `serve.mjs` : la vraie `404.html` a lang, title, h1 et mention, et se lit bien (« Cette page n'existe pas. »).

## Findings

### F0 (bloquant) : aucun
Build OK (QA : exit 0, 6 pages), 0 fait faux, 0 invention non marquée, 0 débordement, 0 lien mort, mention KYW + logo + `noindex` présents sur les 6 pages.

### F1 (majeur)
- **F1-1 · axe `label-content-name-mismatch` (serious), toutes les pages à 1440 et 1920 px.** `src/components/Header.astro:8` : `aria-label="Monepi Boulangerie, accueil"` sur le lien-logo dont le texte visible est « Monepi » + « Boulangerie » ; la virgule casse la correspondance (axe : « Text inside the element is not included in the accessible name »). Absent à 390 px (sous-titre masqué). Preuve : axe-core complet par page, nœud `<a class="wordmark">`. Correction : supprimer l'`aria-label` (le texte suffit) ou écrire `Monepi Boulangerie accueil` sans virgule.
- **F1-2 · erreur console sur chaque page : `/favicon.ico` en 404** (1440 px, premier chargement ; visible aussi dans le rapport QA de l'accueil). Le `Base.astro` ne déclare aucun `<link rel="icon">` et `public/` n'en a pas. Un PUBLIABLE exige 0 erreur console. Correction : ajouter un favicon (SVG ou PNG tiré du logo `public/kyw` n'est pas adapté : utiliser un « M » ou l'épi du logo client dans `photos/`) et `<link rel="icon" href={u('favicon.svg')}>` dans `Base.astro`.

### F2 (mineur)
- **F2-1 · `landmark-no-duplicate-contentinfo` (moderate), 6 pages x 3 largeurs.** `src/components/Footer.astro:5` `<footer class="letter">` + le `<footer>` du paquet `kyw-footer`. Correction : passer `.letter` en `<section aria-labelledby>` ou `<div>` (ne pas toucher au paquet).
- **F2-2 · CLS mobile de l'accueil 0,112 (seuil 0,05).** Reproduit en 2 passes sous CPU x4 + 4G lente (`layout-shift` avec sources : `UL.index`, `FIGURE.photo hero__photo`, `A.link`), donc bascule de police du hero (Google Fonts `display=swap`, `Base.astro:24`). L'item `a-propos` est à 0,035 (acceptable). Correction : `<link rel="preload">` des deux fichiers Yeseva One et Archivo utilisés au-dessus de la ligne de flottaison, et `size-adjust`/`ascent-override` sur le repli, ou réserver la hauteur du bloc titre.
- **F2-3 · pas de JSON-LD ni d'`og:image` sur aucune page** (`grep` du dist : 0 `ld+json`, `og:image` absent). Le prompt de relecture exige un JSON-LD d'établissement (type `Bakery`) avec adresse (Rue Es Fays 43, 5101 Loyers), téléphone et horaires (vendredi 09:00-18:00 seulement, rien d'inventé) dans `Base.astro` ou `index.astro`.
- **F2-4 · photos portrait agrandies donc molles.** `photos.json` : 03 (`03-faconnage`) et 20 (`20-petrissage`) n'ont qu'une variante 800 px alors que leur cadre `aspect-ratio: 4/5` mesure 582 x 727 px à 1440 : agrandissement x1,36 à DPR 1 et x2,5 à DPR 3 (390 px) ; `home/d-05-scroll.png` montre la pâte et la main nettement floues. Le hero 06 à 1440 charge le 800 px dans 640 x 550 (x1,15). Correction : produire une variante 1600 px pour 03 et 20 (sources 1280 px : plafond à 1280) ou limiter la hauteur du cadre à ~ 533 px.
- **F2-5 · titre de pied de page « À vendredi, à Loyers. » sur les 6 pages** (`Footer.astro:8`). Il annonce un rendez-vous le vendredi comme seul jour, alors que le dossier dit « autres jours inconnus » (un guide ancien cite aussi le dimanche matin). La phrase qui suit est correcte (« les autres jours sont à confirmer »), le titre la contredit. Correction : « Passer à la boulangerie, à Loyers. » ou « Venir à Loyers. ».

### F3 (finition)
- **F3-1 · galerie à 1440 px : cases vides** sous « Pains ronds à croûte farinée » et sous « Boulanger enfournant devant le four à bois » (`mon-epi-p1-gal-1440.png`, lignes 3 et 5 de la grille : une vignette haute et une large dans la même rangée). Aligner les rangées (`align-items`, ou `grid-auto-flow: dense` avec des hauteurs fixées).
- **F3-2 · axe `image-redundant-alt` (minor, 23 nœuds) sur la galerie** : alt identique à la légende voisine. Mettre `alt=""` quand la légende est visible, ou la légende seule.
- **F3-3 · avis copiés avec leurs fautes de saisie** (`site.ts:27-29`) : « l authenticité du pain a l ancienne », « un lieux », « Jolie petit atelier » s'affichent tels quels sur l'accueil. Source monepi.be, donc fidèle, mais l'apostrophe manquante ressemble à un bogue du site. Au choix : normaliser seulement la typographie (apostrophes, espace après la virgule) et le noter dans la page « extraits mot pour mot », ou ne garder que la citation « Du pain fait à l'ancienne… » et la troisième.
- **F3-4 · frise de l'accueil : « 1980 Début de sa formation »** (`index.astro:66`). Le dossier dit « de formation depuis 1980 » : l'année de début de formation est une lecture, pas un fait. Écrire « 1980 : boulanger-pâtissier, chocolatier et glacier de formation ».
- **F3-5 · divers** : lien de navigation « Monepi » identique au logo (préférer « La boulangerie »), polices servies par Google Fonts (dépendance externe, WARN d'audit sur 4 pages), légendes « avant l'enfournement » (photo 03) un peu au-delà du sujet « Mains façonnant des pâtons sur la pelle ».

## Ce qui est bien (à ne pas casser à la révision)
1. Fidélité du contenu : carte complète (29 lignes, 0 écart de prix), Quiches (page 404 chez le client) non reprises, horaires hors vendredi marqués « à confirmer », aucune réservation en ligne inventée (téléphone seul, comme dans `donnees.json`).
2. Hero « index de prix » : titre en deux lignes, trois lignes d'action, cinq familles avec « dès x € » et photo du four qui remplit le premier écran à 1440 x 900 (`home/d-01-hero.png`) ; identité reconnaissable, pas d'eyebrow ni de cartes égales.
3. Robustesse technique de base : `scrollWidth` = fenêtre à 390, 1440 et 1920 sur 6 pages, 0 contraste sous seuil, menu mobile en popover fonctionnel (cibles de 52 px), aucun élément caché en reduced motion, 404 designée avec mention et noindex.

## Hypothèses et limites
- Le QA n'a capturé que 3 pages ; produits, galerie, contact et la vraie 404 ont été capturées ici (une capture pleine page à 1440 et 390 px chacune). Le menu mobile ouvert a été testé par clic (état ouvert, 5 liens), non relu en capture.
- CLS et LCP mesurés sous CPU x4 + 4G lente : LCP mobile 664-692 ms (accueil), 972-988 ms (a-propos), conforme.
- Aucune correction appliquée (rôle relecteur) ; serveur de mesure (PID 19219) arrêté.
