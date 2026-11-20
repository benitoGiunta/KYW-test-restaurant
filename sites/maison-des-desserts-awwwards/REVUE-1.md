# Revue awwwards · La Maison des Desserts · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 7 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : la journée de la maison vue comme un cadran de comptoir de 8 h à 18 h, où les sections portent une heure, changent de ton avec l'heure et où la carte est rangée « heure par heure ».

Scores /10
- Design 7 : colonne d'heures, filet vertical, fonds qui glissent du crème à l'ocre puis au brun (`d-06-scroll`), titres Hedvig Letters Serif très lisibles ; la palette crème / ocre / brun reste proche du défaut « pâtisserie » et le hero n'occupe que le tiers de la largeur avec la photo (`d-01-hero`).
- Usabilité 6,5 : navigation courte, appel en CTA, carte lisible ; mais le cadran fixe opaque masque du texte au téléphone (15 positions de défilement sur 23, voir F2-1) et l'étiquette « Aujourd'hui » écrase le titre de l'histoire sur bureau (F1-1).
- Créativité 8 : le concept est appliqué partout (cadran, repères `data-heure`, fonds par tranche, 404 « Cette page est fermée », pied « La maison ferme. Rendez-vous à 8 h. ») sans WebGL gratuit.
- Contenu 6,5 : carte exacte (142 lignes, 0 écart de nom ou de prix contre donnees.json), mais une assimilation de personnes non prouvée (F1-2), une phrase de méta-discours sur la réservation et deux généralisations (F2).
- Technique 7,5 : 5 pages, 0 erreur console, 0 requête en échec, 0 lien mort, pas de débordement à 1440 ni 390, LCP mobile 1,7 à 1,9 s ; 1 violation axe de contraste, CLS mobile 0,061 (> 0,05).

Mesures de cette passe : build et captures de `QA-revue1.md` réutilisés (dist du 04:25 issu du même commit que `src/`, pas de `src/` plus récent) ; script maison sur 5 pages x 2 largeurs (axe-core complet à 4 positions, console, requêtes, débordement, mots coupés, cibles) via `scripts/q.sh` ; contrôles ciblés (contraste à 5 positions, cadran en 390, chevauchement des étiquettes d'heure à 6 largeurs, planches histoire / réservation / 404).

## Findings

### F1 majeur

**F1-1 · L'étiquette « Aujourd'hui » chevauche le titre de la page Histoire (bureau et tablette).**
`src/pages/histoire.astro:29` met `Aujourd’hui` dans `.heure` (colonne de 2 sur 12, `site.css:22`), trop étroite pour ce mot en `--t-l`. Mesure `Range.getBoundingClientRect` : le texte finit à 353 px alors que `.corps` (h2 « Fabriqué par les équipes de la maison. ») commence à 273 px à 1440 px (80 px de recouvrement) ; même défaut à 1920 (35 px), 1280 (82), 1024 (86), 820 (89) ; aucun défaut à 390. Preuve visuelle : `mdd-aw-r1-planche-d.png`, case histoire-1 (« Aujourd'huiFabriqué par les »).
Correction : réduire la taille de cette étiquette ou la mettre en `small` sous un chiffre court (« 2026 » sans date inventée : préférer « Maison » ou « 18 h »), ou laisser `.heure` passer au-dessus du titre en `grid-column: 1 / -1` quand son texte dépasse la colonne.

**F1-2 · T-faux : deux noms propres fusionnés en une seule personne.**
`src/pages/histoire.astro:32` : « Elle est signée Henry de Hucorne, dont le nom figure aussi, sous la forme « E. de Hucorne », sur le logo. » Le dossier ne dit pas que Henry et « E. » sont la même personne ; il cite au contraire « Reprise par Etienne de Hucorne en 1974 (DH 05/2020, à confirmer) » et `donnees.json` > `equipe` ne porte que « Henry de Hucorne, signataire de la carte des fêtes ». Affirmer l'identité est une invention sur une personne réelle.
Correction : retirer la seconde proposition (garder « signée Henry de Hucorne ») ou citer le logo sans l'attribuer à la même personne (« Le logo porte la mention « E. de Hucorne » »).

### F2 mineur

**F2-1 · Le cadran fixe (opaque) masque le texte au téléphone.**
`.cadran` est `position: fixed` en bas à gauche (194 x 41 px à 20, 795 sur 390 x 844) avec fond plein (`site.css:232`). Mesure : un nœud texte passe dessous à 15 positions de défilement sur 23 (accueil, pas de 300 px). Exemples vus : « Les commandes de fêtes se retirent avant la fermeture » devient « Les commandes de fêtes se … a fermeture » (`mdd-aw-r1-mob-2100.png`) ; « Crêpes Mikado … 12,80 € » partiellement caché (planche carte mobile) ; sur `/reservation/` le cadran couvre « Quartier Saint-Loup, dans le vieux Namur ».
Correction : fond semi-transparent avec flou, ou masquer le cadran sous 760 px quand un texte est dessous, ou le remonter dans l'en-tête.

**F2-2 · Contraste insuffisant sur la carte (axe, serious).**
`.plat__desc` du plat 11 du rayon 5 (chapitre à fond ocre `gouter`) : 3,69 : 1 (#4d3a25 sur #c98a45, 14 px), reproduit à 5 positions après 3 s de repos, 1440 px seulement ; 390 px : 0 nœud. La QA initiale annonçait 0 violation (axe lancé une seule fois, au repos du haut). Correction : assombrir l'encre des descriptions sur le ton `gouter` ou éclaircir ce fond (≥ 4,5 : 1 pour du texte de 14 px).

**F2-3 · Heures coupées sur deux lignes au téléphone et sur tablette.**
« 8 h 30 » et « 11 h 30 » passent à la ligne dans `.journee__h` (390 px, accueil : « 8 h / 30 », `mdd-aw-r1-mob-2100.png`) et « 8 h 30 », « 17 h 30 » dans `.heure` à 820 et 1024 px ; sur `/carte/` le sommaire casse « Après-midi », « Toute la journée », « À commander » en 2 ou 3 lignes (planche carte, case mobile). Au pied, « Rendez-vous à 8 h. » laisse « h. » seul sur la 3e ligne (planche 404 mobile). Aucun U+00A0 dans les pages (`grep` du dist : 0) alors que les données les exigent. Correction : U+00A0 dans tous les « 8 h 30 » et entre le chiffre et « h », `white-space: nowrap` ou colonne d'heures plus large sous 760 px.

**F2-4 · CLS mobile de l'accueil à 0,061 (seuil 0,05).**
`QA-revue1.md` : 0,061 (RAPPORT.md l'attribue à un décalage de 4 px du hero en fin d'intro, déjà documenté). Non corrigé ; piste du RAPPORT (restreindre `.hero__titre span { display: block }` ou réserver la hauteur du titre).

**F2-5 · Méta-discours sur la page Réservation.**
`src/pages/reservation.astro:12` : « Le site de la maison ne propose pas de formulaire de réservation de table : voici les contacts qu'elle publie. » Ce site est celui de la maison : la phrase parle d'un tiers, et annonce une absence au lieu de proposer l'action. Le h1 « Réserver, commander, venir. » promet aussi une réservation que le dossier ne prévoit pas (« Réservation de table : aucune »). Correction : « Pour une table ou une commande, appelez le 081 22 74 51 » serait une procédure non prouvée : rester sur le factuel (« Téléphone, e-mail, boutique en ligne, adresse et horaires. ») et retitrer en « Commander et venir ».

**F2-6 · Fêtes : la fermeture à 17 h du 31 décembre est omise.**
`src/data/site.ts:51` : « Le 20 décembre, la maison ferme à 17 h. » Le dossier note « 20/12 et 31/12 fermeture à 17h00 ». Le 31/12/2026 est un jeudi ordinaire (ouvert jusqu'à 18 h sur le site) : un client arrivant à 17 h 30 le 31 est mal informé. RAPPORT.md traite la ligne en « incohérence » sans la montrer. Correction : « Les 20 et 31 décembre, la maison ferme à 17 h. » (donnée du dossier, source carte des fêtes).

**F2-7 · Généralisation non prouvée : « Chaque entremets porte l'étiquette de la maison ».**
`src/pages/index.astro:61-62` : seules deux photos (07 chocolat, 08 rouge) ont une « étiquette de la maison » dans `sujet` ; la photo 10 (doré, ruban) n'en a pas, et le dossier dit seulement « toutes nos réalisations sont fabriquées par nos équipes ». Le titre et « les signe d'une étiquette » étendent un détail de deux photos à tous les entremets. Correction : titre fondé sur la phrase du dossier (« Fabriqué par les équipes de la maison. » est déjà utilisé sur l'histoire : choisir une autre formulation factuelle, par exemple les noms de la vitrine) et retirer « les signe d'une étiquette ».

### F3 finition

**F3-1** `src/data/site.ts:44` : « Les commandes de fêtes se retirent avant la fermeture » est une ligne de la « journée » quotidienne qui ne vaut que pour Noël et Nouvel An, et « se retirent » (retrait) n'est pas écrit tel quel dans le dossier (la FAQ dit retrait entre 8 h et 18 h) : ligne de remplissage qui clôt la journée sans informer.

**F3-2** `src/lib/photos.ts:19, 22` : alts avec détails non portés par le champ `sujet` (« pierre bleue », « éclairées à la tombée du jour », « mur rayé gris ») ; aligner sur `sujet` ou vérifier à l'œil (la règle commune demande le champ `sujet`).

**F3-3** `og.png` est une capture de l'accueil avec le filet vertical qui traverse le titre et le texte (« Boulangerie, pâtisserie » coupé par la ligne) : recadrer sans le filet.

**F3-4** Aucun `robots.txt` dans `dist/maison-des-desserts/awwwards/` (WARN audit) : faux positif connu sous `base` (leçon commune), noté pour mémoire ; `sitemap-index.xml` est bien présent.

## Texte : conformité au dossier (hors findings ci-dessus)
- Faits : nom, adresse (Rue Haute Marcelle 17, 5000 Namur), téléphone (081 22 74 51, `tel:+3281227451` correct), e-mail info@mddnam.be, horaires mardi à samedi 8 h à 18 h, Facebook, Instagram et boutique : conformes à `donnees.json`. Fêtes (dates ouvert / fermé, commandes 22/12 et 29/12) : conformes au dossier (source carte PDF en image, non revérifiable par pdftotext).
- Aucune invention marquée à tort : pas d'avis, pas de note, pas de récompense, pas de statistiques ; la date 1987 et la reprise de 1974 sont écartées ; « trois générations » vient de « troisième génération ».
- Carte : 142 lignes, 0 nom absent, 0 écart de prix ; 2 prix « à confirmer » affichés (chocolat chaud viennois, mignardises) conformes au dossier.
- Pas de tutoiement, pas de tiret cadratin repéré, pas de filler type « expérience unique ».
- Méta : un `h1` par page, `lang="fr"`, `noindex, nofollow` (conforme au prompt de variante), canonical, OG, JSON-LD `Restaurant` avec adresse, `geo` et horaires sur chaque page, mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW (`kyw-footer`) sur les 5 pages, un seul `<footer>`, 404 designée avec h1, title et lang.

## Fonctionnel : bilan
Console 0, requêtes en échec 0, liens internes morts 0 (23 + 15 + 17 + 16 + 15 contrôlés contre `dist/`), `scrollWidth` = fenêtre sur 5 pages x 2 largeurs, axe : 1 `color-contrast` (F2-2) sur 10 cas, 404 réelle sans violation. Mouvement réduit et clavier : conformes selon `QA-revue1.md` (0 texte caché, aucun focus invisible, lien d'évitement présent hors écran). Le seul élément hors fenêtre est `.hero__lumiere` (rai de lumière décoratif, faux positif).

## Ce qui est bien (à ne pas casser à la révision)
1. Le concept du cadran tient sur toutes les pages : colonne d'heures, fonds par tranche, carte rangée « heure par heure », 404 et pied de page dans la même fiction horaire.
2. La carte est transcrite sans écart (142 lignes) et lisible, avec les prix à confirmer assumés plutôt que cachés.
3. Les faits pratiques sont justes et accessibles partout (appel en CTA, tel: correct, JSON-LD complet, aucune donnée inventée), avec une 404 et un OG soignés.
