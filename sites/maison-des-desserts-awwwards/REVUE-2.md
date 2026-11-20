# Revue awwwards · La Maison des Desserts · passe 2
Verdict : A_CORRIGER (0 F0, 1 F1, 4 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : la journée de la maison vue comme un cadran de comptoir de 8 h à 18 h, avec des sections qui portent une heure, des fonds qui passent du crème à l'ocre puis au brun, et une carte rangée « heure par heure ».

Scores /10
- Design 7 : concept et palette inchangés, colonne d'heures et filet tenus ; mais le cadran opaque recouvre encore du texte sur tablette et bureau (`mdd-aw-r2-planche-cadran.png`) et une étiquette de frise percute son paragraphe à 1440 px (`mdd-aw-r2-planche-hist.png`, haut).
- Usabilité 6,5 : tel: correct, menu mobile fonctionnel (ouverture, Échap, focus rendu), 14 Tab sans arrêt perdu, lien d'évitement en premier ; texte masqué par le cadran à 1024 et 1440 (37 à 40 positions sur 50 sur la carte).
- Créativité 8 : fiction horaire tenue sur les 5 pages ; au téléphone le cadran est maintenant supprimé (signature perdue, F3-5).
- Contenu 8 : les deux faits faux et les trois inventions de la passe 1 sont retirés (grep du dist) ; reste de la finition (F3).
- Technique 7 : 0 erreur console, 0 requête en échec, 86 liens internes, 0 mort, 0 débordement sur 5 pages x 4 largeurs, un seul `<footer>`, JSON-LD complet ; mais 1 violation axe de contraste non corrigée et CLS mobile de l'accueil toujours 0,061.

Mesures de cette passe : `dist/` (04:46) postérieur à `src/` (`find -newer` vide) et captures de `QA-revue2.md` (04:46-04:53) postérieures au dist : réutilisés. Serveur propre sur le port 4781 (PID 13636, arrêté). Scripts maison via `scripts/q.sh` : axe-core de `node_modules` à 4 positions de défilement + contraste canvas + débordement + console + requêtes + balises, 5 pages x 1440/1024/820/390 ; CLS et LCP sous CPU x4 + 4G lente (CDP), 2 passes, `layout-shift` avec `sources` ; recouvrement du cadran à chaque pas de 300 px ; frise et étiquettes de l'histoire à 6 largeurs ; reduced-motion ; menu ; Tab ; contraste de la carte après 4 s de repos ; liens internes confrontés aux fichiers du dist.

## Vérification des corrections annoncées (REVISION-1.md)

| Finding | Annonce | Verdict de la passe 2 |
|---|---|---|
| F1-1 « Aujourd'hui » chevauche le titre | corrigé | Partiel : l'étiquette de la page est devenue « Maison » (plus de recouvrement du titre à 1440, 1920, 1024 ; 5 px à 820, voir F2-4), mais la même étiquette « Aujourd’hui » reste dans la frise et percute son paragraphe à 1440 et 1920 px (F1-1 ci-dessous). |
| F1-2 Henry / E. de Hucorne | corrigé | Confirmé : « Elle est signée Henry de Hucorne. », « E. de Hucorne » absent des 5 pages. |
| F2-1 cadran masque le texte (téléphone) | corrigé | Confirmé à 390 px (cadran `display: none`, 0 recouvrement sur 4 pages) mais en supprimant la signature, et le défaut subsiste à 820, 1024 et 1440 px (F2-2). |
| F2-2 contraste carte | corrigé (axe non relancé) | Non corrigé (F2-1 ci-dessous) : la correction a visé le jeton du ton `gouter` alors que le texte fautif est celui du ton `midi`. |
| F2-3 heures coupées, U+00A0 | corrigé | Confirmé à 390 px : 0 heure coupée sur 5 pages, « Rendez-vous à 8 h. » d'un seul tenant, 33 / 171 / 14 U+00A0 sur accueil / carte / réservation. Résiduel : libellés sans chiffre à la ligne sur la carte à 820 et 1024 (F3-1). |
| F2-4 CLS mobile | corrigé (partiel, non résolu) | Non corrigé : 0,0606 et 0,0621 sur deux passes (F2-3 ci-dessous). |
| F2-5 réservation | corrigé | Confirmé : h1 « Commander et venir. », lede factuel, plus de méta-discours. |
| F2-6 fermeture du 31/12 | corrigé | Confirmé : « Les 20 et 31 décembre, la maison ferme à 17 h. » (conforme à la carte des fêtes du dossier). |
| F2-7 « Chaque entremets porte l'étiquette » | corrigé | Confirmé : titre « Chocolat, rouge, doré : la vitrine d’entremets. » (photos 07, 08, 10 : chocolat, glaçage rouge, doré), « les signe d’une étiquette » retiré. |
| F3-1, F3-2, F3-3 | non traités (hors périmètre de la révision) | Toujours présents (F3-2). |

## Findings

### F1 majeur

**F1-1 · L'étiquette « Aujourd’hui » de la frise recouvre le paragraphe voisin à 1440 et 1920 px (page Histoire).**
`src/data/site.ts:58` (`annee: 'Aujourd’hui'`), rendu par `src/pages/histoire.astro:18` dans `.fil-histoire__an` (boîte de 256 px). Mesure `Range.getBoundingClientRect` : à 1440 px le mot finit à 586 px, la boîte à 529 px et le paragraphe commence à 569 px (17 px de recouvrement) ; à 1920 px 733 contre 717 (16 px) ; pas de défaut à 1024, 820 et 390 px. Preuve visuelle : `mdd-aw-r2-planche-hist.png` (case du haut : « Aujourd’hui » écrase le « L » de « La troisième génération »). C'est le défaut F1-1 de la passe 1 déplacé : REVISION-1 le notait comme « autre élément, non signalé » sans le mesurer.
Correction : remplacer « Aujourd’hui » par un libellé court (« Aujourd’hui » en `small` sous un chiffre, ou « Maintenant ») ou élargir la colonne de `.fil-histoire__an` (≥ 340 px à 1440) ; tester à 1440, 1536, 1920.

### F2 mineur

**F2-1 · Contraste insuffisant sur la carte : non corrigé.**
Après 4 s de repos, axe `color-contrast` serious sur `.rayon:nth-child(5) > .plats > .plat:nth-child(11)` : 3,69 : 1 (#4d3a25 sur #c98a45, 14 px) à 1440, 1024 et 820 px (identique à la passe 1). #4d3a25 est le `--c-muted` du ton `midi` ; le fond #c98a45 est celui du ton `gouter` : le texte d'un chapitre `midi` se trouve sur le fond du chapitre suivant. La révision a modifié `--c-muted` de `gouter` (`tokens.css:45`), qui n'est pas la paire fautive. Mesure canvas (pas de 300 px, 450 ms) : 29 nœuds à 3,70 : 1 sur la carte à 1440, aussi sur les chapitres `gouter` de l'accueil (« La vitrine » 3,7 à 4,0) ; l'accueil donne aussi des 4,2 : 1 (texte `matin` sur fond `midi`) qui sont peut-être transitoires (non confirmés au repos). Axe à 390 px signale 2 nœuds `.journee__d` de l'accueil (`li[data-reveal="up"]:nth-child(5)`).
Correction : fixer l'encre de chaque chapitre sur le fond le plus foncé qu'elle croise (ou décaler le glissement du fond `journee.ts` pour qu'il n'entre pas dans un chapitre dont le texte garde l'encre précédente), ou assombrir `--c-muted` de `midi` à ≥ 4,5 : 1 sur #c98a45 (par exemple #2a1708). Relancer axe à 1440, 1024, 820.

**F2-2 · Le cadran fixe et opaque recouvre encore du texte sur tablette et bureau.**
Le correctif de F2-1 (passe 1) masque le cadran sous 760 px seulement (`site.css:272`). Mesure du recouvrement par nœud texte, pas de 300 px : carte 40 positions sur 50 à 1440, 37 sur 46 à 1024, 39 sur 45 à 820 ; accueil 9 sur 21, 6 sur 18, 6 sur 16 ; réservation 1 à 2 positions. Preuve : `mdd-aw-r2-planche-cadran.png` (« Wake up ! » à demi masqué à 1440, « Pain perdu » et « Vin chaud maison » coupés à 820 ; boîte du cadran 251 x 45 px à (40, 827), au-delà du filet, dans la colonne du contenu à partir de 273 px).
Correction : réduire le cadran à la colonne des heures (≤ 233 px à 1440, ≤ 132 px à 820) en pile verticale, ou fond translucide avec flou, ou l'intégrer à l'en-tête.

**F2-3 · CLS mobile de l'accueil à 0,061 (seuil 0,05) : non corrigé.**
Sous CPU x4 + 4G lente, deux passes : 0,0606 et 0,0621 ; sources `layout-shift` : `hero__media`, `hero__lumiere`, `hero__bas`, `tranche` (le hero et ce qui le suit se décalent d'un bloc). `min-height: 2lh` sur `.hero__titre` n'a pas changé la mesure. Autres pages : 0,004 à 0,007. LCP mobile 1,0 à 2,3 s (accueil 1,70 s, carte 1,9 s, réservation 2,2 s), < 2,5 s.
Correction : réserver la hauteur du hero (`min-height` en `svh` sur `.hero`, `aspect-ratio` sur `.hero__media`) ou repérer le décalage par `sources` avec `previousRect` / `currentRect` ; le titre n'est pas la cause.

**F2-4 · L'étiquette « Maison » touche le titre à 820 px et frôle à 1024 px.**
`src/pages/histoire.astro:29`. À 820 px le texte finit à 165 px alors que `.corps` commence à 160 px (5 px de recouvrement ; la boîte `.heure` mesure 137 px dans une colonne de 132 px) ; à 1024 px 187 contre 197 (10 px). Preuve : `mdd-aw-r2-planche-hist.png`, case du milieu (« MaisonFabriqué par les » sans espace). REVISION-1 l'avait signalé à revoir. À 1440 : 234 contre 273, correct.
Correction : `.heure .num` en `--t-m` ou `overflow-wrap`, ou `padding-right` de la colonne ≥ 24 px entre 760 et 1100 px.

### F3 finition

**F3-1** Sur `/carte/` à 820 et 1024 px, « Après-midi », « Toute la journée » et « À commander » passent sur 2 lignes dans la colonne d'heures (`.heure .num--mot`) et « À commander » dépasse sa boîte (156 contre 132 px) ; « Après-midi » est coupé au trait d'union. Aucun défaut à 390 et 1440. Correction : `white-space: nowrap` sur « Après-midi », colonne plus large entre 760 et 1100 px.

**F3-2** Les F3 de la passe 1 restent : `site.ts:44` (« Les commandes de fêtes se retirent avant la fermeture », ligne de remplissage de la journée), alts de `src/lib/photos.ts:19, 22` avec des détails absents du champ `sujet` (« pierre bleue », « éclairées à la tombée du jour », « mur rayé gris »), `og.png` avec le filet vertical qui traverse le titre et « Boulangerie, pâtisserie » (relu : toujours le cas).

**F3-3** La navigation dit « Réservation » (et le `<title>` « Réservation et accès ») alors que la page s'intitule désormais « Commander et venir. » et que le dossier ne prévoit pas de réservation de table. Aligner le libellé sur la page (« Commander et venir »).

**F3-4** Apostrophes droites dans les noms de plats de `/carte/` (14 : « salade d'herbes », « L'Apple », « Jus d'orange »), alors que le reste du site utilise U+2019. Normaliser dans `carte.ts` (hors guillemets des noms propres du client).

**F3-5** Le cadran est supprimé sous 760 px : le téléphone, canal principal d'un salon de thé, perd la signature du site (colonne d'heures et fonds par tranche restent). Un cadran de 5 rem placé dans l'en-tête ou une barre fine non recouvrante garderait l'idée.

## Texte : conformité au dossier
- Faits conformes à `donnees.json` (nom, adresse, téléphone `tel:+3281227451`, e-mail, horaires, réseaux, boutique) ; fêtes : dates ouvert/fermé, commandes 22/12 et 29/12, fermeture 17 h les 20 et 31 décembre conformes au dossier.
- Aucune invention : pas d'avis, de note, de récompense ni de statistique ; la corrections F1-2, F2-5, F2-7 n'ont pas déplacé de problème (grep des 5 pages : « E. de Hucorne », « ne propose pas », « Chaque entremets » absents).
- Pas de tiret cadratin, pas de tutoiement, pas de filler. Mention « Maquette KYW, certaines données sont illustratives » et un seul `.kyw-footer__logo` sur 5 pages, `noindex, nofollow` (conforme au prompt de variante), `lang="fr"`, un seul `h1` par page, JSON-LD `Restaurant` avec adresse et horaires sur chaque page, un seul `<footer>`.

## Fonctionnel : bilan
Console 0, requêtes en échec 0, liens internes 86 contrôlés contre `dist/` (0 mort, 0 lien racine sans base), `scrollWidth` = fenêtre sur 5 pages x 4 largeurs, axe : 1 violation (F2-1 ; l'axe à 390 signale aussi `.journee__d` de l'accueil, état à reconfirmer après correction), 404 réelle sans violation axe (les « 1,00 » du canvas sur son en-tête sont un faux positif : texte clair sur la tranche sombre dont le fond n'est pas dans la chaîne des ancêtres). Reduced-motion : 0 texte masqué (les 3 nœuds comptés sont les chiffres du cadran `display: none`, faux positifs), cadran absent. Menu mobile : ouvre (`menu-ouvert`), Échap le ferme et rend le focus. Clavier à 1440 : lien d'évitement en premier, anneau de focus 2 px visible sur 14 arrêts.

## Ce qui est bien (à ne pas casser à la révision)
1. Le concept du cadran de comptoir tient sur les 5 pages (colonne d'heures, fonds par tranche, carte « heure par heure », 404 fermée, pied « Rendez-vous à 8 h. »).
2. Les corrections de texte de la passe 1 sont propres et sans déplacement de défaut : fêtes du 20 et 31 décembre, signature Henry de Hucorne, page « Commander et venir », titre de la vitrine fondé sur les photos.
3. La typographie U+00A0 sur les heures a réglé les coupures au téléphone (0 heure coupée à 390 px sur 5 pages) et la carte reste exacte (142 lignes, aucun écart de prix constaté en passe 1, `carte.ts` retouché seulement pour les espaces).
