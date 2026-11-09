# Revue legacy · La Ferme Blanche d'Asie · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site sombre noir et or, titres en serif chaud, hero sur la salle à table ronde avec un panneau de titre, mis en avant du menu découverte à 29 € et des horaires du jour, tout en pages courtes (accueil, carte, réservation par téléphone, photos, contact).

Scores /10
- Design 7 : palette noir et jaune reprise du site client, hiérarchie nette (`frev1-sheet` accueil 1440 et 390 px), mais composition classique hero + panneau + listes ; aucun plat photographié (aucune photo de plat dans le dossier).
- Usabilité 8 : en-tête 64 px, menu `popover` natif à 52 px par lien, Échap ferme, focus jaune 2 px sur chaque arrêt, onglets de carte fonctionnels (4 onglets, panneaux 4/20/31/1), puce « Aujourd'hui » sur le jour courant.
- Créativité 6 : le chiffre « 29 € » géant et le pied avec le nom en grand donnent une signature ; le reste suit le patron habituel d'un site de restaurant.
- Contenu 8 : 0 fait faux, 56 noms et 56 prix de la carte retrouvés dans `donnees.json`, horaires, adresse, téléphone, e-mail, acompte, 29 €/45 €/65 € exacts ; restent les coquilles héritées de la source (F2).
- Technique 9 : build OK (6 pages), 0 erreur console, 0 requête en échec, 0 lien mort (tous les `href`/`src` internes en 200), `scrollWidth` = fenêtre à 1440 et 390 px sur 6 pages, axe 0 violation, contraste canvas 0 nœud sous le seuil, reduced-motion : 0 élément à opacité < 0,95, LCP mobile 964 ms (CPU x4 + 4G lente, deux passes identiques), CLS 0.

## Findings
Aucun F0 ni F1 : build OK, 0 erreur console, 0 lien mort, 0 fait faux, 0 invention non marquée, 0 débordement, 0 violation axe, mention + logo KYW + noindex présents sur les 6 pages (grep du `dist/` : `robots noindex`, « Maquette KYW, certaines données sont illustratives », un seul `.kyw-footer__logo`, `lang="fr"`, un `h1`, un `main`, un `footer`).

### F2 (mineurs)
- **F2-1 JSON-LD sans horaires.** `src/layouts/Base.astro:11` (objet `ld`) : le `Restaurant` porte adresse, téléphone, geo, `sameAs`, mais aucun `openingHoursSpecification` (`grep -c openingHours` = 0 sur `dist/…/index.html`). Le prompt § C exige adresse et horaires structurés. Correction : ajouter `openingHoursSpecification` depuis `donnees.json` (lun-ven 12:00-14:30 et 18:00-23:00 ; sam 12:00-14:30 et 18:00-00:00 ; dim 12:00-15:30 et 18:00-23:00), et `email`.
- **F2-2 Retour à la ligne des plages d'horaires sur mobile.** `.shots-ferme-blanche-d-asie-legacy-revue1/home/m-05-scroll.png` et ma capture 390 px : « 12 h 00 à 14 h 30 et 18 h 00 à / 23 h 00 » et « … à / 00 h 00 » se coupent en deux lignes, avec un « 23 h 00 » ou « 00 h 00 » orphelin, sur les 7 jours (accueil, réservation, contact). Correction : `white-space: nowrap` par plage et passage à la ligne entre les deux plages (ou « et » sur une ligne propre), ou texte plus court ; afficher « minuit » au lieu de « 00 h 00 » comme dans le pied (« Samedi jusqu'à minuit »).
- **F2-3 Coquilles de la source recopiées sur la carte.** `menu/index.html` : « (Contient Œuf, gluten, soja, sésame,) » (majuscule et virgule avant la parenthèse fermante, aussi sur l'accueil, plat 1) ; « Tofu sautés au beurre ail » (accord et article manquant). Correction : « (contient œuf, gluten, soja, sésame) » ; « Tofu sauté au beurre d'ail » (l'intitulé exact reste à valider avec le client, signaler dans RAPPORT).
- **F2-4 Mention publique « filigrane recadré ».** `src/data/site.ts:112` (`credits`), visible dans le pied de chaque page : « Find Your Place (filigrane recadré) » annonce publiquement le retrait d'un filigrane de photographe. Garder le crédit « Photographies : Find Your Place » et retirer la parenthèse ; le droit d'usage des 10 photos reste à valider avec le client (déjà noté dans ETAT.md), à répéter dans le RAPPORT.
- **F2-5 Cibles de la page contact sous 24 px.** Mesure à 1440 et 390 px : téléphone, e-mail et lien Facebook de « Coordonnées » ont 20 px de haut (`contact/`), les autres pages 29 px au minimum. Correction : `min-block-size: 44px` (ou 24 px au moins) sur ces liens, comme le prompt § C le demande.

### F3 (finitions)
- **F3-1 Libellé « Menu » en double sur mobile.** Le bouton qui ouvre le panneau s'appelle « Menu » et le panneau contient aussi un lien « Menu » (la carte) : ambiguïté d'une capture à l'autre (`m-01-hero.png`). Renommer le lien « La carte » ou le bouton « Navigation ».
- **F3-2 Horaires répétés.** L'audit signale la même plage cinq fois par page (lun-ven). Regrouper « Lundi au vendredi » en une ligne, le samedi et le dimanche à part (même donnée, moins de répétition).
- **F3-3 Liens internes sans barre finale.** `href="/ferme-blanche-d-asie/legacy/menu"` alors que `vercel.json` impose `trailingSlash: true` : chaque clic passe par une redirection 308 ; le canonical de `404.html` pointe vers `/404/`, qui n'existe pas. Utiliser les URL avec barre finale.
- **F3-4 Poids des photos.** `photos/parking-1400.webp` 339 Ko, `jardin-1400.webp` 334 Ko, `kiosque-1400.webp` 323 Ko (> 300 Ko) ; la page Photos pèse ~2,1 Mo à 1440 px (QA) mais 271 Ko chargés sur mobile (11 images, srcset 800). Recompresser ces trois fichiers.
- **F3-5 Nom de plat reconstitué.** « Potage crème nid d'hirondelle » : la source tronquée donne « nid d » ; la complétion est plausible (la description cite le blanc d'œuf et le hâché de poulet) mais non prouvée ; à signaler au client.

## Faux positifs du QA écartés (leçons communes)
- « 404 sans `title` ni `lang`, 2 violations axe » : réponse brute de `serve.mjs`. La vraie `404.html` a `<title>`, `lang="fr"`, un `h1`, noindex, 0 violation axe, 0 débordement.
- « Pas de robots.txt / sitemap » : `dist/…/robots.txt` (Disallow: /) et `sitemap-index.xml` existent.
- « 45 contrastes à vérifier » d'axe : 0 nœud sous le seuil par script canvas 1x1 sur les 6 pages à 1440 et 390 px.
- QA n'a couvert que 3 pages ; réservation, photos, contact et 404.html relues ici (texte extrait du `dist/`, axe complet, débordement, console, liens).

## Ce qui est bien (à ne pas casser)
1. Données exactes : prix, numéros, horaires, acompte, menus de fêtes recopiés fidèlement ; avis attribués (« Trouve Ton Resto, avis d'un client ») sans note ni date inventées ; rien d'inventé hors dossier (la phrase « Mariage, anniversaire, réunion ou fête » vient du site actuel).
2. Navigation et accessibilité : menu `popover` natif, focus visible, onglets au clavier, reduced-motion sans contenu caché, un seul `footer` (pas de `landmark-no-duplicate-contentinfo`), alt descriptifs sur toutes les photos.
3. Performance : LCP mobile 964 ms sous CPU x4 + 4G lente, CLS 0, polices préchargées, srcset effectif.

## Méthode
QA-revue1.md + planches, puis `dist/` servi sur le port 4617 (PID 31587, arrêté), scripts maison (axe-core de `node_modules`, contraste canvas, débordement, console, onglets, Tab, reduced-motion, menu mobile, LCP/CLS CDP x4 deux passes). Aucun fichier du site modifié.
