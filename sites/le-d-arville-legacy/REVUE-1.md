# Revue legacy · Le D’Arville · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant de campagne présenté sobrement, fond greige, serif Sentient, plaque posée sur la photo de l'étang, passe-partout pour le portrait du chef, lecture éditoriale sur neuf pages.
Scores /10 :
- design 7 : hiérarchie nette et calme (`planche home`, `pl-d1`), mais pages minces et petits textes (14 px de corps, 12 à 13 px de légendes sur 109 caractères à 1440).
- usabilité 8 : menu popover correct à 390 (ouvre, 7 liens, Escape ferme), 29 Tab avec anneau 2 px partout, barre fixe Réserver/Appeler, 0 lien interne mort (11 testés).
- créativité 5 : peu d'idée propre au lieu (vigne, orange et briques du site d'origine abandonnés au profit d'un greige neutre) ; seule signature : le passe-partout du portrait.
- contenu 7 : prix, plats, adresse, téléphone, courriel, Facebook et Zenchef conformes à `donnees.json` ; une invention légère, une légende non prouvée, trois pages très courtes.
- technique 8 : build OK (9 pages), 0 erreur console, 0 requête en échec, 0 débordement (1440 et 390), CLS ≤ 0,004, LCP mobile 932 ms (QA), 0 violation axe grave ; reste `landmark-no-duplicate-contentinfo`.

Méthode : QA-revue1.md et planches lus ; texte extrait du `dist/` des 9 pages confronté à `donnees.json`, `dossier.md` et `photos/index.json` ; script maison (axe-core complet, débordement, console, images, liens, mention, noindex, logo) sur 9 pages x 2 largeurs ; contraste par nœud (canvas), Tab, menu, reduced-motion ; captures des 6 pages non couvertes par le QA et de `/404.html`. Serveur propre sur le port 4962 (PID 32276, arrêté). Le port 4871 était pris par un autre agent.

## Findings

### F0 (bloquant) : aucun

### F1 (majeur)
- **F1-1 · T-invente · accueil, sous-titre de la section menus** : « Chasse, poissons et homard du vivier selon les arrivages. » Le dossier et `donnees.json` ne disent rien des arrivages (grep « arrivages » : 0 occurrence dans `data/restaurants/le-d-arville/`). Preuve : `rev1-txt-index.html.txt`. Correction : « Chasse, poissons et homard du vivier. » ou « La carte de saison : chasse, poissons, homard du vivier. »

### F2 (mineur)
- **F2-1 · T-invente · chambres, légende « La suite Orientale. »** (photo `17-barabas-suite-orientale`) : le champ `sujet` de `photos/index.json` dit seulement « Chambre colorée (bleu, orange, carreaux) » ; le nom de la suite vient du nom de fichier (leçon commune). La suite « Glamour » est, elle, prouvée par son `sujet`. Correction : légende et alt neutres (« Une chambre colorée de la villa Barabas »).
- **F2-2 · a11y · toutes les pages (18 cas sur 18)** : axe `landmark-no-duplicate-contentinfo` [moderate], nœud `.pied` : le pied du site et `packages/kyw-footer` sont deux `<footer>` de premier niveau (`footers=2`). Absent du QA (le shoot ne le voit pas). Correction : le pied du site en `<div>`/`<section aria-label>` ou le `kyw-footer` hors landmark contentinfo, sans repeindre le bandeau KYW.
- **F2-3 · SEO · JSON-LD `Restaurant` sur les 9 pages** : adresse, géo, téléphone, courriel présents ; ni `openingHoursSpecification`, ni `url`, `image`, `sameAs` (les deux pages Facebook du dossier). Le prompt § C attend adresse et horaires. Horaires sans heures : déclarer les jours seuls n'est pas valide, donc mettre les heures illustratives marquées `.fill` ou documenter l'absence dans RAPPORT ; ajouter au moins `url`, `image`, `sameAs`.
- **F2-4 · répétition / slop · bandeau « Une table dans la campagne de Wierde, à quelques minutes de Namur. »** répété en `h2` géant sur les 9 pages, 404 comprise (`pl-d1`, `pl-d2`). Sur les pages courtes il occupe autant que le contenu. Correction : titre propre à chaque page, ou bandeau réduit au bloc adresse/horaires hors accueil.
- **F2-5 · slop · accueil, liste des services numérotée 01 à 04** (« 01 Chambres, 02 Séminaires, 03 Chèque cadeau, 04 Traiteur de fêtes ») : chiffres décoratifs, sans ordre réel. Correction : retirer les numéros.
- **F2-6 · contenu mince · séminaires, chèque cadeau, traiteur de fêtes** : une phrase, une ligne « à confirmer », téléphone, courriel, une photo (`pl-d1`, `pl-d2`). Données absentes du dossier, donc limite honnête, mais ces trois pages dans la navigation principale paraissent vides. Correction : les regrouper sous une page « Événements et cadeaux » ou les sortir de la barre ; la phrase « la table se prend au restaurant » (séminaires) n'est pas dans le dossier, la retirer.

### F3 (finition)
- **F3-1 · Tailles de texte** : corps 14 px, étiquettes et légendes 12 à 13 px à 1440 (mesure `rev1-cap.txt`) ; passer le corps à 16 px et les légendes à 14 px minimum.
- **F3-2 · Cibles** : liens téléphone et courriel de séminaires, chèque cadeau, traiteur, réservation mesurent 115 x 21 et 129 x 21 px à 1440 et 390 (le `pointer: coarse` à 48 px ne les couvre pas). Passer à 24 px au moins.
- **F3-3 · Typographie** : espace ordinaire avant « ; » et « : » (4 sur l'accueil, 1 sur carte, 1 sur séminaires) : mettre U+00A0 pour éviter le retour à la ligne devant la ponctuation.
- **F3-4 · Photo du chef** : filigrane « © Morgane Ball » incrusté dans `16-chef-facade` (bas gauche, visible au passe-partout sur mobile, `m-02-scroll`). Rogner l'image ou le signaler dans RAPPORT.
- **F3-5 · Hors-ligne et SEO** : polices chargées chez Fontshare et Google (pas de préchargement, `audit.mjs` : TTF) ; pas de `robots.txt` (le sitemap existe : `sitemap-index.xml`, donc le « pas de sitemap » du QA est faux).
- **F3-6 · « Congés 2027 »** : « 20-31 décembre » est noté « (traiteur) » dans le dossier ; la page réservation le présente comme congé du restaurant. Ambigu : vérifier ou marquer.
- **F3-7 · Page photos** : 16 vues sans légende, mise en page par colonnes avec vides en bas de colonne (`pl-d1`) ; « Heures d'ouverture à confirmer par le restaurant » est souligné en pointillé comme un lien alors qu'il n'est pas cliquable.
- **F3-8 · Poids** : page photos 2,9 Mo (17 images, toutes en `loading="lazy"`) ; trois fichiers 1600 px dépassent 300 Ko (07 : 380 Ko, 08 : 327 Ko, 09 : 318 Ko).

### Faux positifs du QA (ne pas corriger)
- « Clavier : focus invisible 1 » (accueil, carte) : contredit par 29 Tab, anneau `solid 2px oklch(0.5 0.095 248)` sur chaque arrêt.
- Violation `color-contrast` de la « 404 » (4,36) : réponse brute de `serve.mjs` ; `/404.html` mesurée à part : 0 violation de contraste, 0 nœud sous le seuil (canvas, 9 pages x 2 largeurs). Les 2 « à vérifier » axe (légende du hero, légende du portrait) sont lisibles sur scrim (`rev1-cap-1440.png`).
- Lien d'évitement « non en premier » : `Aller au contenu` est le premier arrêt de Tab.

## Ce qui est bien (à ne pas casser)
1. Données exactes : Prix et plats des menus et de la carte relus un par un, adresse, téléphone, courriel, Facebook x2, Zenchef et heures marquées « à confirmer » conformes à `donnees.json` ; aucun tiret cadratin, aucune date en dur, vouvoiement tenu.
2. Technique propre : 0 erreur console, 0 débordement, `noindex`, mention « Maquette KYW… », un seul logo KYW et un seul `h1` sur les 9 pages, `lang="fr"`, mouvement réduit sans texte caché, menu mobile et barre fixe sans chevauchement à 390 x 844.
3. Hero et portrait : photo de l'étang plein cadre avec plaque lisible, portrait du chef en passe-partout ; légendes et alt tirés des `sujet` du dossier (hors suite Orientale).
