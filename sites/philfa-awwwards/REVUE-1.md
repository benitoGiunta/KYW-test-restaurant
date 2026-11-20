# Revue awwwards · PhilFa · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le nom « Phil | Fa » coupé en deux moitiés de couleur (anthracite / moutarde) sert de fil à tout le site : héros, double choix du menu du moment, pied de page, avec une couture pointillée entre les deux moitiés.

Méthode : QA-revue1.md et ses 3 planches (dist 16:40, captures 16:47, aucune source plus récente), puis mesures propres sur le `dist/` servi (port 4923 à 4926, serveurs arrêtés par `kill`) : 5 pages × 1440 et 390 px (axe-core complet, console, requêtes, débordement, balises, liens), pages histoire et réservation jamais capturées par le QA (captures de fenêtre + planches), `404.html` réelle, contraste par canvas sur tous les nœuds texte après défilement, Tab, reduced-motion, LCP/CLS sous CPU ×4 + 4G (2 passes), texte du `dist` confronté à `donnees.json` et `dossier.md`. Captures : `.shots-philfa-awwwards-revue1/rev1/` (planches `pl-*.png`).

## Scores /10
- Design 8 : parti pris net et cohérent (deux aplats, Archivo en grand + Newsreader, couture pointillée), lisible sur `home-1440-*` et `home-390-*` ; vides un peu larges sous la frise de l'histoire.
- Usabilité 8 : « Aller au contenu » est bien le premier arrêt Tab (faux positif `skipLinkFirst`), focus 2 px visible sur 6 arrêts, 0 cible < 24 px, menu et CTA Réserver/Appeler présents sur chaque page, carte à ancres fonctionnelles (6 ancres existantes).
- Créativité 7,5 : le motif Phil | Fa est repris partout sans devenir un gadget ; pas de WebGL ni de curseur, mouvement sobre (aucun texte caché en reduced-motion : 0).
- Contenu 7,5 : 24 plats, 0 écart avec `donnees.json` (nom, description, prix) ; faits (adresse, téléphone, horaires, Barestho, réseaux, 2013, 2020, 55 / 20 places, G&M 12/20 2025) conformes ; une procédure déduite (F2-3) et quelques finitions de typographie.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = fenêtre sur 10 cas), 0 violation axe grave ou critique, 0 contraste < seuil (canvas, 8 vues), LCP mobile 1264 / 1292 ms, CLS 0,002, JSON-LD `Restaurant` avec adresse, géo et `openingHoursSpecification`, 0 lien mort.

## Findings (triés par gravité)

Aucun F0 ni F1 : build OK (QA : 5 pages, exit 0), 0 fait faux, mention « Maquette KYW, certaines données sont illustratives », logo KYW (1 image `kyw-signature`) et `meta robots noindex, nofollow` présents sur les 5 pages (conforme au prompt § 3.3).

**F2-1 · og.png rogné et en police de repli** · `dist/philfa/awwwards/og.png` (1200×630, 24 Ko), jamais refait (RAPPORT.md : « OG raffinée non refaite »). Preuve : ouverture du fichier, le « P » de « Phil » est coupé par le bord gauche, la police est un sans-serif système (pas Archivo) et la ligne « Rue de Marchovelette 21/23 · Namur » passe à cheval sur la couture des deux aplats. C'est l'aperçu de partage de chaque page. Correction : recomposer l'OG avec Archivo, « PhilFa » entièrement dans le cadre (marge ≥ 60 px), adresse dans la moitié sombre seulement ; régénérer via le script og du site.

**F2-2 · Deux alertes axe de repère (moderate) que le QA ne montre pas** · axe-core complet : `landmark-no-duplicate-contentinfo` sur les 5 pages aux deux largeurs (`<footer class="pied" aria-label="Contact et informations">` + le `<footer>` du paquet `kyw-footer`) et `landmark-unique` sur l'accueil (`<section class="bande" aria-label="La salle">` dont le nom est déjà porté par un autre repère). Correction : transformer `.pied` en `<div>`/`<section aria-label>` sans rôle contentinfo (le `kyw-footer` reste l'unique pied) ; vérifier qu'aucun `region` n'apparaît ensuite (leçon du 2026-11-10) ; renommer l'`aria-label` de `.bande` (ex. « Photos de la salle »). Pas bloquant pour la publication (aucune violation grave).

**F2-3 · Procédure de réservation « par téléphone » non prouvée** · `src/pages/reservation.astro` (sous-titre « Deux façons de réserver une table », bloc « Par téléphone. » + bouton APPELER) et la meta description de la page (« par téléphone au +32 81 22 61 11 ou en ligne »). Preuve : `dossier.md` et `donnees.json` donnent le numéro et le seul outil de réservation (Barestho) ; rien n'indique que la table se réserve par téléphone (leçon commune du 19 : une procédure déduite est une invention). Correction : présenter le numéro comme « Téléphone » / « Une question ? » sans promettre la réservation, ou marquer le bloc `placeholder` ; Barestho reste le CTA de réservation ; réécrire sous-titre et description (« Réserver en ligne sur Barestho. Téléphone : … »).

**F3-1 · Ponctuation : espaces ordinaires avant « : » et « ; »** (aucune insécable, coupure possible en fin de ligne). Occurrences relevées dans le `dist` : carte « il a pu changer depuis… connue : il a » et « actuel de PhilFa ; les prix » et « Pour réserver : page » (double espace), histoire « repensée : le concept actuel » et « Belgique : 12/20 », 404 « Page introuvable : ni le 21 », pieds « Photos : PhilFa », « Polices : Archivo ». 0 U+00A0 sur histoire, réservation et 404 (6 sur l'accueil, 26 sur la carte pour les prix). Correction : U+00A0 avant « : » « ; » « ? » « ! » et entre nombre et « € » dans les `.astro` et `site.ts`.

**F3-2 · « au bar » non prouvé** · histoire, « On y vient pour une cuisine de brasserie… au bar, en salle de 55 places ou en terrasse de 20 places » : le dossier cite salle et terrasse, pas un service au bar (le bar est vu sur les photos 10 à 12). Correction : retirer « au bar, ».

**F3-3 · Répétition des coordonnées sur la page Réservation** · `reservation-1440-1` à `-4` : le numéro de téléphone figure dans le héros puis dans le pied « Venir », et l'adresse + les horaires sont donnés dans « Horaires / Venir » puis redits dans le pied (même schéma sur histoire et carte). Correction : sur la page Réservation, masquer le bloc « Venir / Ouvert » du pied ou ne pas répéter le téléphone dans « Venir ».

**F3-4 · Vide sous la frise 2013 / 2020 / 2025** · `histoire-1440-3` : environ 120 px de beige sans contenu avant « L'équipe » ; frise en corps 13 à 15 px dans une colonne large. Correction : réduire le `padding-block` de la section ou aligner la légende sur la ligne.

**F3-5 · Étiquettes à 13 px** · 9 nœuds texte à 13 px sur l'accueil (« Menu du moment, deux services », « Places en salle », « Photos : PhilFa », légendes de photos) ; le texte courant est ≥ 16 px. Correction : 14 px minimum pour les légendes.

Notes (pas des findings) : le `skipLinkFirst: false`, les WARN robots/sitemap et la « 404 » brute de serve.mjs du QA sont des faux positifs connus (Tab réel : « Aller au contenu » en premier ; `404.html` réelle : statut 200, 0 erreur, h1 présent, axe = repère seulement). Les 22 `contrastNeedsReview` de l'accueil sont tombés à 0 par mesure canvas (nœuds texte sur fond uni, 8 vues). « Velours moutarde » : visible sur les photos (fauteuils ocre) et cohérent avec « ocres de la salle » du dossier, formulation à garder. Le menu du moment est signalé comme sans date (note affichée).

## Ce qui est bien (à ne pas casser à la révision)
1. L'idée Phil | Fa en deux aplats avec couture, reprise dans le héros, le double choix « Ou bien » et le pied, cohérente sur 5 pages et à 390 px (`home-1440-0`, `home-390-3`).
2. Le texte : court, spécifique à PhilFa (rue de Marchovelette, croquettes, tartare au couteau, gibier), vouvoiement, 0 tiret cadratin, 0 apostrophe droite, carte fidèle à 100 % (24 plats).
3. La performance et la robustesse : LCP mobile ≈ 1,3 s sous CPU ×4 + 4G, CLS 0,002, 0 débordement, reduced-motion complet, JSON-LD complet, focus visible.
