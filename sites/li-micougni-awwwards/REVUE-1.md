# Revue awwwards · Li Micougni · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le nom « demi-fous » mis en scène par des titres coupés en deux moitiés décalées qui se recollent au défilement et au survol, sur fond brun-noir, avec un orange de signalétique pour les blocs de réservation ; un site de brasserie conviviale, sobre, très lisible.

Scores /10
- Design 8 : hero en Young Serif géante bien cadré, blocs orange en rupture, rythme net ; la photo du hero montre seulement la hotte (F1-2) et la carte recycle des photos hors sujet (F1-1).
- Usabilité 8 : menu `<dialog>` mobile correct (ouvert, focus sur « Fermer », Échap rend le focus à « Menu »), 0 cible < 24 px, 0 lien mort ; réservation honnête (téléphone, mailto, formulaire du client, « ce site ne transmet aucune demande ») ; rail d'ancres de la carte coupé à droite (F2-3).
- Créativité 9 : un seul geste, tenu partout (h1, logo, 404 « là qu'à moitié », transition en deux moitiés, survols qui recollent), sans GL, ni loader, ni curseur suiveur.
- Contenu 6 : carte exacte (50 plats confrontés à `donnees.json` : 0 écart de nom ou de prix), horaires marqués « à confirmer » ; mais une photo de velouté sur « Desserts », une promesse inventée sur les boulettes et une procédure inventée sur la carte.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (10 cas), 0 contraste en échec (script canvas, 10 cas), LCP mobile CPU x4 + 4G 1,84 s accueil et 2,2 s carte, CLS 0 ; seul défaut axe : `landmark-no-duplicate-contentinfo` (F2-2).

Méthode et fraîcheur : `dist/` (09:38) postérieur à `src/` (aucun fichier plus récent), captures du QA (09:45) postérieures au dist, donc réutilisées. QA limité à accueil, carte et 404 brute : j'ai mesuré moi-même les 5 pages (dont `404.html` réelle et `reservation/`) à 1440 et 390 px sur un serveur propre (port 4761, PID noté puis tué), axe-core complet de `node_modules` à 2 positions de défilement, contraste nœud par nœud, cadres d'images, liens, balises, reduced-motion, LCP/CLS sous CDP x4 + 4G en 2 passes.

## Findings (par gravité)

### F1 majeurs
- **F1-1 · Photos hors sujet sur la carte** · `src/pages/carte.astro:8` (`photoDe`). La rubrique « Desserts » est illustrée par la photo du velouté salé (œuf, croûtons, alt « Un velouté garni de croûtons… ») : capture `li-micougni-item/m-06-scroll.png` et mesure du `dist/carte/index.html` (alt « velouté » juste avant « Glaces… », « Dame blanche »…). « Les pâtes » est illustrée par `poisson` (sujet « poisson, sauce crémeuse, pommes de terre », alt « Un poisson en sauce crémeuse… »), au-dessus de « Pâtes champignons truffe ». Le champ `sujet` de `photos/index.json` ne contient aucun dessert ni plat de pâtes. Correction : retirer la photo de « Desserts » et celle de « Les pâtes » (ou ne garder une photo que si son `sujet` correspond à la rubrique ; le velouté peut aller sur « Les entrées » ou « Les plats » seulement si un plat de ce nom y figure).
- **F1-2 · Photo du hero recadrée sur la hotte, flammes coupées** · `src/styles/site.css:55-56`. `<picture>` est inline : `img { height: 100% }` ne s'applique pas, l'image fait 777 x 1034 px dans un `figure` de 777 x 485 (`overflow: hidden`), donc `object-position: 50% 62%` n'a aucun effet et seul le haut de la photo (la hotte en inox contre le mur de briques) est visible ; à 390 px : image 350 x 466 dans un cadre de 263 (mesure `getBoundingClientRect`, capture `home/d-01-hero.png`, `home/m-01-hero.png`). La même photo, entière, montre les flammes dans la carte (`m-06`) : le signal « grillades au charbon de bois » est absent du premier écran, et l'`og.png` reprend ce recadrage. Correction : `.hero__photo picture { display: block; height: 100%; }` puis régler `object-position` (flammes visibles, environ 50% 85%) et regénérer l'`og.png`.

### F2 mineurs
- **F2-1 · Invention non prouvée** · `src/data/site.ts:58` (affichée sur `/histoire/`) : « Les boulettes de Mamy Max, elles, restent. » Le dossier dit seulement que ce sont les boulettes de Mamy Max (`dossier.md`, matière 7) ; la permanence au menu est une affirmation sans source (cf. « carte évolutive » au même paragraphe). Correction : « Les boulettes de Mamy Max, servies avec des frites, sont l'un des plats de la maison. » ou retirer la phrase.
- **F2-2 · `landmark-no-duplicate-contentinfo` (moderate)**, 5 pages x 2 largeurs (`.pied`). `src/components/Footer.astro:9` est un `<footer>` de premier niveau, doublon du `<footer>` de `packages/kyw-footer`. Absent du QA (axe lancé par shoot.mjs). Correction : passer `.pied` en `<section aria-label="Contact et liens">` (ne pas toucher au paquet KYW).
- **F2-3 · Rail d'ancres de la carte coupé à droite** · `src/styles/site.css:162` (`.carte-index ul`, `overflow-x: auto`). À 1440 px : `scrollWidth` 1531 pour 1440 de large, dernier lien (« Menus ») à x = 1490 donc partiellement hors cadre ; à 1024 : 1439 ; à 390 : 1303 (défilement horizontal attendu en mobile). Aucun indice de suite. Correction : permettre le retour à la ligne (`flex-wrap: wrap`) dès 48 rem, garder le défilement en dessous.
- **F2-4 · Procédure inventée** · `src/pages/carte.astro:20` : « appelez avant de venir si un plat vous tient à cœur ». Le dossier ne dit rien de cette pratique (leçon commune : procédure = invention). Correction : « Elle évolue au fil des mois. »

### F3 finitions
- **F3-1** `public/og.png` (1200 x 630) : le bouton « Appeler » est coupé au bord bas et la photo recadrée sur la hotte ; recomposer après F1-2.
- **F3-2** `src/pages/histoire.astro:25` et `site.ts:57` : « les producteurs d'ici » et « Les escargots sont de Namur » : le dossier parle de « produits locaux » et d'un plat nommé « Escargots de Namur », pas de producteurs ni d'origine. Neutraliser : « une cuisine de saison et de produits locaux » ; « Les escargots de Namur sont servis au beurre persil ail ».
- **F3-3** Poids : la variante webp du hero `02-grill-charbon…` pèse 364 et 372 Ko (> 300 Ko) ; viser 240 Ko (largeur 960 suffit).
- **F3-4** Trois textes à 13 px : légende « Photos : Li Micougni », lien « Voir toute la carte », mention « Terrasse arrière » ; passer à 14 px.
- **F3-5** 404 bureau : 404 géant et phrase à gauche, moitié droite vide (capture `limic-aw-r1-404-d.png`) ; ajouter la photo de la salle ou de la cour.

## Écarts du QA qui ne sont pas des défauts
- 404 « 2 violations serious » (`document-title`, `html-has-lang`) : réponse brute de `serve.mjs` ; la vraie `404.html` a `lang="fr"`, `<title>Page introuvable | Li Micougni</title>`, un h1, 0 violation sérieuse.
- `contrastNeedsReview` 40 et 52 : contrôlés nœud par nœud (script canvas, opacité cumulée, 5 pages x 2 largeurs après défilement) : 0 contraste sous 4,5 (3 pour grands textes).
- « Premier arrêt Tab = lien d'évitement : non » : le premier arrêt est « Aller au contenu » (faux positif connu).
- Pas de JSON-LD d'horaires : voulu (aucun jour confirmé), le JSON-LD `Restaurant` a nom, adresse, téléphone, e-mail, `sameAs`, `hasMenu`.

## Conformité vérifiée (5 pages, 1440 et 390 px)
Build `dist/` présent (5 pages) ; 0 erreur console ; 0 requête en échec ; 0 débordement horizontal ; 1 seul h1 par page ; `lang="fr"` ; `noindex, nofollow` (conforme au prompt § 3.3) ; mention « Maquette KYW, certaines données sont illustratives » sur chaque page ; un seul logo KYW (`.kyw-footer__logo` = 1) ; 25 liens uniques, internes en 200, externes aux URL du dossier (Facebook, Instagram, formulaire `limicougni.com/contact`) ; title/description uniques, OG complet, favicon, canonical ; tirets cadratins : 0 ; vouvoiement respecté ; reduced-motion : 0 texte sous opacité 0,5, h1 posé ; données de contact, adresse (Rue des Brasseurs 110, 5000 Namur, pas le siège BCE) et horaires conformes à `donnees.json`. Aucun avis, note ni distinction affichés.

## Ce qui est bien (à ne pas casser à la révision)
1. Le geste des « demi-fous » est tenu de bout en bout (h1, logo d'en-tête, 404, transition en deux moitiés, survols) sans alourdir : CLS 0, LCP 1,8 s.
2. Honnêteté des données : horaires « à confirmer » ligne par ligne, « Horaire non publié » le samedi, réservation sans faux formulaire, mailto et formulaire du client ; 50 plats à l'euro près.
3. Mobile pensé : menu `<dialog>` orange plein écran avec focus géré, en-tête « Réserver » + « Menu » à 44 px, cartes en colonne, signature conservée.

## Hypothèses
Le correctif F1-2 suppose que `Photo.astro` rend toujours un `<picture>` (vrai pour les 3 pages) ; les cadres de l'accueil « viande » (figure 933 px pour 319 px d'image à 1440) et de la page histoire sont plus hauts que leur image mais sans fond visible : non retenus comme défaut.
