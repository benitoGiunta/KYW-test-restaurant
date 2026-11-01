# Audit Hallmark · Partage · 01/11/2026 (provisoire, phase 1)
Source : https://restaurantpartage.be, HTML sauvegardé le 01/11/2026 (copié dans `.hallmark/site-actuel/`), captures desktop/mobile du client. `sloplint --before` à lancer en phase 2 (HTML sauvegardé copié en `index.html` et `carte.html`).
Genre inféré : editorial parce que le site est une page blanche de texte et de photos, sans nuit ni jeu.

## La lecture en quatre lignes
- Pour quoi : des Namurois et visiteurs qui veulent une table ; l'action unique : réserver (Zenchef, rid=371394).
- Ce qui marche et reste : les photos de janvier 2026 (salle chaulée, plats, équipe), le texte de présentation, la sobriété.
- Ce qui se lit comme généré ou daté : nav et titres en capitales trackées (67, 54), trois boutons noirs remplis côte à côte (F4), portrait en pastille ronde, mur de 16 photos (83), footer noir 3 colonnes (42).
- Ce qui est cassé : carte en 5 GIF sans texte (illisible au téléphone, inaccessible), aucun horaire, logo cassé en mobile (« Logo Restaurant Partage Namur » en texte alternatif bleu), bandeau cookies qui couvre le bas de chaque écran.

## Structure du site d'origine
- Type : one-page + /carte/, /bon-cadeau/, /politique-de-confidentialite · nav : logo gauche, 3 liens, bouton rempli · footer : noir, 3 colonnes (adresse, logo et réseaux, Attablez-vous).
- Sections : hero (photo du chef en cuisine), présentation + portrait rond, boutons Menus/Bon cadeau/Réserver, réservation (iframe Zenchef) + façade, « En images » (16 photos), footer.
- Animations : aucune. Images : photos du client. Mobile : barre « Réserver | Carte » en tête, logo cassé.

## Findings par tier (sloplint `--before`, 01/11/2026, phase 2)

Commande : `sloplint .hallmark/site-actuel --genre editorial --render --before` (HALLMARK_PUPPETEER + CHROME_PATH wrapper).
Rendu : `WARN render` (polices et CSS externes WordPress/Divi non chargés hors ligne, piège 6) : la lecture visuelle reste
celle des captures du client ; les findings statiques valent. Record : `.hallmark/before.json` (28 liens, 6 champs, 2 pages).

Total : **444 FAIL · 174 REFLEX · 26 WARN** sur `index.html` et `carte.html` (détail ligne à ligne : `.hallmark/before.txt`).

- Floor : 48 (319 littéraux couleur hors tokens, thème Divi), 7a (60 blancs purs `#fff`), 10a (17 `transition: all`),
  67 (14 labels de nav en capitales à 15 px), 40 (12 contrastes sous 4,5:1, ex. « MENUS ET CARTE » à 2,41:1), 2a (4 dégradés violet-bleu du cœur WordPress).
- Reflex : 24b (149 marges hors échelle 4 px), 7b (12), 26b (4 : aucun état `:active`).
- Warn : F15 (deux largeurs de conteneur, 1080 et 2560), F21 (h1 suivi d'un h4 « Privacy Overview » du bandeau cookies), F22 (texte justifié sans césure).

Réglés par la refonte : tokens OKLCH seuls (48, 7a), transitions listées (10a), liens de nav en casse de phrase (67),
contraste des textes sur photo par scrim (40, à remesurer au tier render de la phase 3), aucun dégradé décoratif (2a),
échelle `--space-*` (24b), huit états sur les contrôles (26b), titres sans saut de niveau (F21), aucun texte justifié (F22).
