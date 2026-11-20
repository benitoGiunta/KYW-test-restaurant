# Revue portfolio · Le Lodge Wépion · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 2 F2, 6 F3). Les 7 corrections annoncées par REVISION-1 sont vérifiées ; aucune n'a cassé une autre page.
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une guinguette de bord de Meuse (sable, corail, canard) où l'on déplace des « tirages » photo sur une table, sous un bandeau qui dit d'emblée que le restaurant est fermé après l'incendie et que l'équipe accueille à Erpent.

Scores /10
- Design 7,5 : palette et objets au trait cohérents, vagues canard ; encore trois cartes d'avis jaunes de même taille (capture d-05-scroll) et un lourd bloc de fermeture répété.
- Usabilité 8 : 0 cible < 24 px à 390, 768, 1024, 1440 sur 7 pages ; réservation claire (Barestho + téléphone) ; 14 liens internes résolus (0 mort), 9 liens externes conformes au dossier.
- Créativité 8 : signature « table à tirages » et bandeau pausable intacts après révision (captures d-03, d-04).
- Contenu 8 : citation, 3 titres de presse et faits conformes à `donnees.json` ; 0 « à confirmer » dans `dist/` ; reste « Il a ouvert ses portes en 2008 » (dossier : « à confirmer »), attribué à Trouve Ton Resto.
- Technique 8,5 : 7 pages x 4 largeurs (390, 768, 1024, 1440) : 0 erreur console, 0 requête en échec, scrollWidth = largeur, 0 texte hors fenêtre (Range), 0 contraste < 4,5 (canvas, opacité cumulée), 1 seul h1 par page, `lang="fr"`, noindex + mention + 1 logo KYW partout ; CLS 0,008 et LCP mobile 1,17 s (QA-revue2).

Preuves : QA-revue2.md (build exit 0, audit 0 FAIL ; captures home, carte, 404 datées après le build : `dist` 02:55, planche 03:01), mesure maison `lodge-pf2-mesure.mjs` (axe-core complet, contraste, débordement, texte coupé, balises), `lodge-pf2-cible.mjs` (balayage du slogan à 16 largeurs, axe 320, liens), extraction du texte de `dist/` confrontée à `donnees.json`/`dossier.md`, captures d-01, d-05, d-06 et hero 320/1024.

## Vérification des corrections de REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 slogan coupé | CONFIRMÉ | `Range` du slogan dans la fenêtre à 320, 360, 390, 640, 768, 820, 900, 960, 1024 (40 à 984), 1060, 1099, 1100, 1180, 1280, 1440, 1920 ; capture hero-1024 : « à Wépion » entier ; décalage de 6 % présent seulement dès 1100 px (`base.css:96`) |
| F2-1 citation | CONFIRMÉ | « L'onglet de bœuf est tout simplement excellent et j'y retournerais volontiers. » identique au dossier (grep : 1 fichier) |
| F2-2 presse | CONFIRMÉ | 3 titres complets, ponctuation identique au dossier, liens L'Avenir et DH vers les URL du dossier |
| F2-3 « à confirmer » | CONFIRMÉ | 0 fichier du `dist/` ; ligne privatisation + 0496 supprimée (terrasse relue) |
| F2-4 fermeture répétée | CONFIRMÉ en partie | plus de ligne dans le hero ni le pied (captures d-01, d-07) ; mot « Fermé » encore présent dans le bandeau défilant, le bandeau jaune et la carte « Fermé pour l'instant » (voir F2-B) ; l'audit signale toujours 6 WARN « sentence repeated » sur le bandeau |
| F2-5 formulaire | CONFIRMÉ, effet de bord | 0 `form`, 0 champ ; boutons Barestho + `tel:` ; mais la section « Votre demande » est restée (F2-A) |
| F2-6 (a) contraste slogan | CONFIRMÉ | `rgb(168, 50, 31)` à 320, 360, 390 ; axe sans `color-contrast` en violation à 320 (30 « à vérifier » = fonds animés, mesure canvas : 0 < 4,5) |
| F2-6 (b) eyebrows | CONFIRMÉ sur l'accueil | plus d'étiquette au-dessus de « Pour venir », « Avis » ; il reste « Où nous trouver » (`reservation.astro:41`) et « La maison » (histoire) |
| F2-6 (c) cartes d'avis | PARTIEL | la source n'est dite qu'une fois (« Extraits de Trouve Ton Resto, sans date ni auteur ») ; les trois cartes jaunes restent de même taille (d-05-scroll) |

## Findings

### F2 mineur
- **F2-A Section « Votre demande » vide de sens sur Réserver.** `src/pages/reservation.astro:28-37` : le titre « Votre demande » et la phrase « La réservation se fait sur Barestho ou par téléphone. » ouvrent une section qui répète les deux boutons déjà présents en haut de page ; au total « Réserver sur Barestho » apparaît 3 fois et le numéro 5 fois sur la page. Correction : supprimer la section 28-37 (le chapô et le bloc « Pour venir » suffisent) ou la fondre dans le chapô.
- **F2-B Bloc de fermeture encore redondant.** Bandeau défilant, bandeau jaune, carte « Fermé pour l'instant » et liste Maison redisent la même information sur chaque page (`audit.mjs` : 6 WARN « sentence repeated 2x »). Correction : retirer l'état « Fermé à Wépion / Accueil provisoire… » du bandeau défilant (garder le bandeau jaune), ou en faire un bandeau de dates seul ; varier les trois cartes d'avis (taille, rotation) pour finir F2-6c.

### F3 finition
- F3-1 `.marquee` : `aria-label` sur un `div` sans rôle (axe incomplete `aria-prohibited-attr`) et hors landmark (axe `region`, moderate, 7 pages x 4 largeurs). Correction : `role="region"` avec son `aria-label`, ou placer le bandeau dans le `header`.
- F3-2 `404.html` : `rel="canonical"` vers `/le-lodge-wepion/portfolio/404/` qui n'existe pas ; JSON-LD `openingHoursSpecification: []` vide sur les 7 pages (omettre la clé, les horaires ne sont pas connus).
- F3-3 Apostrophes mixtes inchangées (accueil : 9 droites, 15 courbes ; terrasse 5 droites pour 1 courbe) : uniformiser en `’`.
- F3-4 Page Maison : portrait de l'équipe en carré pleine colonne avec un verre dessiné pour une seule personne (non traité).
- F3-5 `og.jpg` (1200 x 630) non retouché depuis la passe 1 (photo seule, sans nom) ; mot « À table ! » coupé par le bandeau KYW (choix de gabarit).
- F3-6 « En saison, la coupe de fraises de Wépion » (tearoom) et « À la fin du repas, une seule note par table » (accueil) ajoutent une saisonnalité et une procédure que le dossier ne donne pas (« Une table = une addition » seulement) : retirer les deux membres de phrase.

Non retenu : « 404 : color-contrast 4,36:1 sur `.kyw-footer__note` » du QA, non reproduit (axe complet sur `/404.html` à 1440 et 390 : seul `region` ; canvas : 0 contraste < 4,5) ; « no robots/sitemap » de l'audit (faux positifs documentés) ; `noindex, nofollow` conforme au prompt.

## Ce qui est bien (à ne pas casser)
1. La fermeture est dite honnêtement : adresse provisoire d'Erpent, aucune note ni avis inventé, aucun horaire déduit (« jours et horaires non communiqués »), toutes les sources datées ou nommées.
2. Signature de la table à tirages, vagues canard et bandeau pausable : intactes, 0 texte masqué en mouvement réduit, 60 fps.
3. Technique propre sur 7 pages x 4 largeurs : `base` respecté (0 lien mort), mention « Maquette KYW » + logo + noindex partout, hero 320 à 1920 sans rognage.
