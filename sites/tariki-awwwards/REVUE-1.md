# Revue awwwards · Tariki · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un fil doré en forme de route (Syrie, Liban, Turquie, Grèce, Namur) qui traverse chaque page et relie les rubriques de la carte, sur fond noir charbon, braises et grande serif crème ; la 404 « Vous avez quitté le chemin » casse le fil à la Grèce.

Scores /10
- Design 8 : palette noir, crème, ocre tenue sur 5 pages, grande serif Young Serif, bandeau crème de la formule « 17 € » qui rompt le noir (`home/d-01-hero.png`, `d-05-scroll.png`) ; centre du héros desktop un peu vide entre « Tariki » et la photo.
- Usabilité 8 : lien d'évitement premier arrêt clavier (Tab x1 = `skip-link`), menu mobile « Menu », CTA Réserver et Appeler dans le héros, 0 cible < 24 px, rail de la carte lisible à 390 px (`tariki-item/m-02-scroll.png`).
- Créativité 8 : la route comme signature (hero, rail de la carte, fil d'en-tête, pied, 404 cassée), cohérente et non décorative ; limite : aucune photo de plat ni de salle (le dossier n'en a pas), les visuels sont des ambiances.
- Contenu 7 : 25 plats et prix identiques à `donnees.json` (script, 0 écart), adresse, téléphone, horaires, JSON-LD exacts ; mais une procédure inventée, des légendes de trilogie inventées et un crédit photo inexact (F1, F2).
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe (5 pages x 5 largeurs, 2 positions de défilement), LCP mobile throttlé 2052 ms (accueil), CLS 0, reduced-motion 0 texte caché.

Preuves de mesure : script maison `rev1-mesure.mjs` (axe-core de node_modules, console, requêtes, `scrollWidth`, enfants hors fenêtre, masques de titres, cibles, images cassées) sur accueil, carte, histoire, réservation et vraie `404.html` à 1440, 1024, 768, 390 et 360 px : 0 écart hors le rail de la carte volontairement décalé à gauche à 390 et 360 px (liste `OL` de -214 à 504, `scrollX` de page inchangé). Liens internes du `dist/` : 0 mort. Toutes les pages : `lang="fr"`, un seul `h1`, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives », logo KYW, canonical, OG, JSON-LD `Restaurant` avec adresse et `openingHoursSpecification` exacte. Typographie du texte du `dist/` : 0 tiret cadratin, 0 apostrophe droite, 0 tutoiement, espaces avant « : » corrects, aucun filler.

## Findings

### F1 majeur
- **R1-01 · T-invente · procédure d'allergènes** : `src/data/site.ts` (`pageInfos.acces`, 4e puce) affichée sur la page réservation (« Dites-le à la personne qui vous accueille. »). Le dossier dit seulement « Allergènes signalés (fruits à coque, lait, sésame) » ; aucune consigne d'accueil n'y figure (règle `commun.md` : une procédure est une invention). Preuve : `dist/tariki/awwwards/reservation/index.html`, bloc « Bon à savoir ». Correction : garder « La carte signale les allergènes : fruits à coque, lait, sésame. » et supprimer la seconde phrase.

### F2 mineur
- **R1-02 · T-invente · légendes de la trilogie** : `src/data/site.ts` (`histoire.trilogie`) : « Bayti, Le foyer. », « Bayti le Comptoir, Le comptoir. », « Tariki, Le feu. » ne sont pas dans le dossier (seul : Bayti = foyer trouvé en Belgique, Tariki « nouveau chapitre autour du feu », prolonge sans remplacer). Visible sur `histoire` (planche, section « Trois adresses, un même chemin »). Correction : ne garder que le nom et, pour Tariki, « Il prolonge les deux autres sans les remplacer. » ; ou marquer les autres comme mise en voix illustrative.
- **R1-03 · T-faux · crédit photo** : `Footer.astro` / `site.credit` = « Photos : Tariki. » sur toutes les pages. `photos/index.json` : braises et feu de camp « possiblement banque d'images », arcades « rendu possiblement généré par IA, n'est pas le restaurant ». Les légendes sont honnêtes, le crédit global attribue pourtant la paternité à Tariki. Correction : « Visuels d'ambiance du site de Tariki, illustratifs. » ou retirer le crédit.

### F3 finition
- **R1-04 · répétition** : les horaires du midi (« 11 h 30 à 14 h ») sont dits quatre fois sur la page réservation (tableau, puce « Bon à savoir », pied) et sur l'accueil (audit WARN). Correction : sur la réservation, retirer les puces « Du mercredi au samedi… » et « Le lundi et le mardi… » qui redoublent le tableau.
- **R1-05 · survol** : QA : 3 cibles sur 7 de la carte et 1 sur 7 de l'accueil changent de couleur seule au survol (pas de second signal : soulignement, déplacement). À renforcer sur les lignes de plat si elles sont cliquables ; sinon sans objet.
- **R1-06 · glyphe** : `turşu` (« Expérience épicée ») tombe en police de repli (« ş » hors sous-ensemble, noté par le constructeur dans ETAT.md) ; non vérifié visuellement à fort zoom. Ajouter U+015E-015F au sous-ensemble ou garder tel quel.

## Faux positifs du QA écartés (preuves)
- « Lien d'évitement pas premier » : Tab x1 sur `histoire/` = `skip-link` « Aller au contenu » (cf. leçon commune).
- « 404 : contraste 4,36:1 de `.kyw-footer__note` » : non reproduit au repos, mesuré 5,49:1 (12 px) et 9,63:1 (« Réalisé par ») sur 404 et histoire à 1440 et 390 px ; état de fondu probable. Aucun `color-contrast` en violation dans mon axe (seulement « à vérifier », 7 à 20 nœuds par page, tous des textes crème sur noir ou ocre sur noir).
- « Pas de robots.txt » : sans effet, tout le site est `noindex` ; `sitemap-index.xml` et `sitemap-0.xml` existent.
- « Réservation non capturée » : relue sur les captures du constructeur (`.shots/reservation/planche.png`, postérieures à `src/`, antérieures au dernier build sans changement de `reservation.astro`) et par mesure sur le build ; histoire et 404 recapturées (`rev1-planche.png`).

## Ce qui est bien (à ne pas casser)
1. La route unique (accueil, rail de la carte, pied, 404 cassée à la Grèce) : une idée, un geste, partout ; mobile pensé, pas écrasé (`m-01-hero.png`).
2. Honnêteté du contenu : carte exacte, « Le début du voyage » non affiché faute de certitude, aucun avis ni chef inventé, légendes « illustration » sur les visuels, formulaire mailto qui dit qu'il n'envoie rien.
3. Performance et accessibilité propres : 267 Ko pour la page la plus lourde, LCP mobile 2,05 s, CLS 0, 60 FPS, reduced-motion sans texte caché.
