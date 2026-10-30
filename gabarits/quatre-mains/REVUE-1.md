# Revue gabarit quatre-mains · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : deux colonnes, vert sombre et moutarde, une par chef, qui se séparent et se rejoignent selon les pages ; la cuisine « à quatre mains » devient la mise en page.

Méthode : build existant servi sur :4412, `shoot.mjs` page par page (`.shots/qm-revue-<page>/`), `audit.mjs` (`.shots/qm-revue-audit.txt`), planches `scripts/planche.py`. Skill `jury` : non lancée comme critique extérieur, car aucun outil de sous-agent n'est disponible dans cette session (le critique aveugle exige un agent neuf). Scores ci-dessous = auto-score selon le brief de quality-bar.md, non indépendant, à lire comme estimation. Chiffres mesurés : 0 erreur console, 0 requête en échec, 0 violation axe sur les 6 pages, 0 lien interne mort (curl), audit 0 FAIL / 11 WARN.

Scores /10 :
- Design 8,0 : identité forte et cohérente (vert/moutarde, Switzer + Fragment Mono, photos virées au vert) sur `d-01-hero.png` ; perd des points sur l'en-tête qui chevauche le contenu et le contraste mobile (F1-02, F2-01).
- Usabilité 7,0 : navigation claire, CTA « Réserver » partout, clavier visible (`k-01..04`) ; mais en-tête illisible sur certaines bandes mobiles et loader mobile de 7,8 s.
- Créativité 8,0 : diptyque deux voix, citations en colonnes, liste à stage ; la mécanique est liée au sujet, pas générique.
- Contenu 6,5 : faits exacts, mais plusieurs descriptions et bios non marquées sont inventées (F1-01).
- Technique 7,0 : LCP bureau 144 à 364 ms, CLS 0, mobile 1,0 à 1,3 s sauf `les-deux-chefs` 7,7 s ; 24 à 36 fps mobile throttlé ; débordement horizontal bureau sur `les-deux-chefs`.
Estimation jury (auto-score, critique + 1,1, non indépendant) : environ 7,6 sur 10.

## Findings

### F0 (bloquant) : aucun

### F1 (majeurs)
- F1-01 T-invente. Données non marquées `placeholder: true` absentes de `donnees.json`/`dossier.md` (`gabarits/quatre-mains/src/data/site.ts`) : descriptions des plats de l'accueil et de la carte (« Trois bouchées pour ouvrir le repas », « Cuit longtemps, carottes glacées… jus réduit », « Servi dès la sortie du four, glace au chaï, poire pochée », « Rôtis et crus, jus de champignons », « Pour finir avec le café ») ; plat « Fromages de la région » (le dossier dit seulement « fromage ») ; bios des chefs (« c'est souvent lui qui pose l'assiette et raconte le producteur », « Il aime les menus courts… ») ; attribution des plats à Damien ou François, affichée en clair sur `carte` (« …jus réduit, Damien », `m-02-scroll.png`) sans « illustratif » alors que l'en-tête du fichier la déclare illustrative. Correction : passer ces champs à `placeholder: true` avec mention visible « illustratif », ou les retirer (descriptions) ; ne garder que les 5 plats vus en photo (tartare, Saint-Jacques, boeuf, rosace) avec leur formulation du dossier.
- F1-02 Mobile 390 : l'en-tête garde un texte sombre sur des bandes vertes (« Les Potes au Feu » et « Menu » quasi invisibles) : `m-05-scroll.png` (accueil, les-deux-chefs, carte `m-04`), `reservation/m-02-scroll.png`. L'en-tête passe en thème clair sur une bande sombre au franchissement des sections. Correction : recalculer le thème de l'en-tête à partir de la section sous le point y du header (IntersectionObserver avec rootMargin sur la hauteur du header), ou lui donner un fond plein.
- F1-03 `les-deux-chefs` : débordement horizontal bureau (`report.json` : overflowX true, offenders `figure.col-6.photo.photo--4x5`, `img`) ; LCP mobile 7 676 ms, élément `img` (autres pages 1,0 à 1,3 s). Correction : contenir la figure (`overflow: clip` sur le conteneur de révélation `data-reveal="scale"`, `max-width: 100%`), et `fetchpriority`/`loading` + dimensions sur l'image LCP mobile ; vérifier la taille réellement servie (`chef-*.webp` 1351 px, 149 Ko).

### F2 (mineurs)
- F2-01 Bureau : en-tête transparent qui se superpose au texte au défilement (`accueil/d-02-scroll.png`, `d-03-scroll.png` : « Bruxelles », « La Plage d'Amée » sous les liens de nav ; `les-deux-chefs/d-02`). Correction : fond ou flou léger de l'en-tête dès le défilement.
- F2-02 Loader : 3,8 s bureau, 7,8 s mobile throttlé (`accueil/report.json` loaderMs), au-delà du plafond de 2,6 s de la grille. Correction : plafond 1,8 s, ou loader limité à la première visite (sessionStorage).
- F2-03 Fluidité mobile throttlé 24 à 36 fps (pire image 67 à 83 ms) sur toutes les pages sauf 404. Correction : alléger les révélations clip/scale simultanées, `will-change` ciblé.
- F2-04 Hover : la ligne « 01 Mises en bouche » de la liste à stage ne réagit pas (`noHoverChange`, `h-04-hover.png`), alors qu'elle est un lien ; le curseur suiveur est actif. Correction : décalage ou couleur au survol.
- F2-05 Accueil : la section citations répète deux fois la même mention d'horaires (« 12:00 à 14:00 et 19:00 à 21:00 » ×4 sur l'accueil et la réservation, WARN audit) ; adresse et privatisation répétées sur `reservation`. Correction : une seule occurrence par page, le reste en lien.
- F2-06 Cible tactile « Réalisé par » 178×22 px (< 24 px de haut) sur toutes les pages. Correction : `min-height: 24px` sur le lien.

### F3 (finitions)
- F3-01 Champ date de la réservation affiché `mm/dd/yyyy` (locale du navigateur) sur une page française : ajouter `lang="fr"` au formulaire ou un champ texte avec format indiqué.
- F3-02 `skipLinkFirst: false` dans le rapport = faux négatif connu (voir lecons.md) ; `robots.txt`/sitemap absents à la racine : normal sous `base`. Pas d'action.
- F3-03 Bandeau de 404 : bien conçue (h1 « Cette table n'existe pas », retour à l'accueil) ; le WARN « 404 sans h1 » de l'audit vise la 404 de l'origine, faux positif.

Faits vérifiés sans écart : nom, adresse (Avenue de la Plante 4, 5000 Namur), téléphone +32 81 64 04 44, horaires (lun, mar, jeu soir ; mer et ven midi et soir ; sam fermé, privatisation), Zenchef rid=379477, Facebook et YouTube, prix 67 / 52 / 40 € et suppléments +7 / +15 €, avis Michelin, histoire. E-mail, boissons, formules du midi, deux avis Google, Sara et Jordan, années 2012 à 2017 : marqués illustratifs, affichés comme tels. Mention « Maquette KYW… », logo KYW et `noindex, nofollow` présents sur les 6 pages ; JSON-LD `Restaurant` avec adresse et horaires (sans e-mail ni note inventés).

## Ce qui est bien (à ne pas casser)
1. Le diptyque vert/moutarde : une mécanique visuelle qui exprime « quatre mains » (hero, citations, 404, pied de page) et se replie en bandes sur mobile.
2. Honnêteté du contenu : les données fictives sont étiquetées « illustratif » dans l'interface, avec les vraies sources (Michelin) citées.
3. Technique de base propre : 0 console, 0 axe, 0 lien mort, reduced-motion sans texte caché (`hiddenText: 0`), focus clavier visible, vouvoiement et typographie française sans tiret cadratin.
