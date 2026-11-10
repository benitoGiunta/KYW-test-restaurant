# Revue awwwards · Le 54 · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 4 F2, 3 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une salle de nuit où le plan de 34 places, dressé à l'ouverture, sert de signature, de registre dans le pied de page et de champ « couverts » ; sobre, serif de grande taille, accent bleu émail.

Scores /10
- Design 7,5 : hero « Le 54 » + plan, nappe claire pour les prix, typographie nette ; le mur de photos casse la tenue (F1-1, blocs ardoise vides sur `home/d-05-scroll.png` et `le-54-item/d-05-scroll.png`).
- Usabilité 8 : réservation par téléphone, e-mail et lien du client, formulaire honnête (« rien n'est envoyé depuis cette page ») ; 0 cible < 24 px, focus visible, menu mobile fonctionnel, tab order propre (`keyboard.stops`).
- Créativité 8 : le plan comme objet unique répété à bon escient, sans GL ni gadget ; transition bleue entre pages (`d-90-transition-*`).
- Contenu 7 : prix, carte, horaires, contacts conformes au dossier (0 faux fait) ; quelques ajouts non prouvés (F2-1 à F2-4) et « trente-quatre couverts » répété 8 fois.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 violation axe (5 pages x 1440/390 px, axe-core de node_modules), 0 débordement, LCP mobile ~1 s, CLS 0 ; mais images du mur qui ne remplissent pas leur cadre.

Mesures propres (script maison, serveur 4761, 5 pages x 1440 et 390 px, défilement complet) : console et requêtes 0 ; axe 0 ; `scrollWidth` = fenêtre partout ; éléments hors cadre 0 ; cibles < 24 px 0 ; `lang="fr"`, 1 `h1`, 1 `main`, 1 `footer` (pas de doublon contentinfo), `title` et description uniques, `robots noindex, nofollow` (conforme au prompt § 3.3), canonical, OG, JSON-LD `Restaurant` (adresse, géo, horaires confirmés seulement) sur chacune ; mention « Maquette KYW, certaines données sont illustratives. » et logo `kyw-footer__logo` (un seul) sur chacune ; 404.html réelle : lang, title, h1 présents (la « 404 » du QA est la réponse brute de `serve.mjs`, faux positif connu) ; liens internes et externes listés, internes en 200 (carte, histoire, reservation, 404, og.png, favicon.svg, sitemap-index.xml) ; aucun tiret cadratin, aucune apostrophe droite, aucune espace manquante avant « : » dans le texte rendu. Menu : 55 lignes de carte vérifiées par grep sur `lacarte.html` du client (veau tonnato, œufs de truite, câpres, nobashi, cochon de lait, zarzuela, pimentos) ; prix 48 / 65 / +40 / +25 / +35 conformes au dossier.

## Findings

### F1 (majeur)
- **F1-1 · Les photos du mur ne remplissent pas leur cadre** (`src/styles/site.css:124`, `src/components/Mur.astro:9`). `.mur img { height: 100% }` est inopérant parce que `<picture>` est un parent non dimensionné : l'image garde son ratio natif et le fond `--c-line` du `figure` apparaît en grands rectangles ardoise. Mesure à 1440 px (figure / image) : accueil m1 437x729 / 454x537, m5 437x327 / 454x302 ; carte m1 437x729 / 454x302 (59 % de vide), m3 319x319 / 332x498 (rogné). À 390 px : carte m3 358x269 / 372x558 (image haute rognée en bas), accueil m3 269 / 344. Preuve visuelle : `.shots-le-54-awwwards-revue1/home/d-05-scroll.png` (blocs gris sous le bol bleu et le dessert), `le-54-item/d-05-scroll.png` (rectangle de 436x330 sous les Saint-Jacques). Correction attendue : `.mur picture { display: block; width: 100%; height: 100%; }` (ou `display: contents`), puis remesurer que chaque `img` couvre exactement son `figure` à 390, 768, 1440 px sur accueil et carte, et que le `scale: 1.04` ne crée pas de bord vide.

### F2 (mineur)
- **F2-1 · Légende non prouvée** (`src/pages/index.astro:27`) : « La salle, le soir. » ; la photo est « Salle en noir et blanc, tables dressées » (`photos/index.json`), aucune heure. Remplacer par « La salle, tables dressées. ».
- **F2-2 · Texte d'ambiance inventé** (`src/data/site.ts:72` et `src/pages/histoire.astro:28-29`) : « la salle reste petite, le service aussi » et « Le geste avant le décor. Ici, l'assiette se dresse à la main, plat après plat » ne sont pas dans le dossier ; ce sont aussi des phrases qui iraient sur n'importe quel site. Les remplacer par des faits du dossier (cuisine de saison et de marché, artisans locaux, produits de la Meuse non prouvés : s'abstenir) ou supprimer ; le titre du bloc photo peut devenir « En cuisine. ».
- **F2-3 · Créneaux présentés comme certains** (`src/data/site.ts:31`, `src/components/Footer.astro:19`, `src/pages/reservation.astro` « Midi, 12 h à 14 h. Soir, 18 h 30 à 21 h. ») : le dossier les donne « Trouve Ton Resto, à confirmer » ; le site du client ne donne que les dernières commandes (13 h, 20 h). Ajouter « à confirmer » ou n'afficher que les dernières commandes. Le pied de page dit aussi « Midi, 12 h à 14 h » avec « Fermé le mardi et le mercredi » alors que le samedi midi est fermé : ajouter « et le samedi midi ».
- **F2-4 · Alt avec ingrédients non établis** (`src/lib/photos.ts:27, 30`) : « crème et roquette » (sujet du dossier : « purée et copeaux (truffe à confirmer) ») et « grains de caviar » (sujet : « Tartare dressé sur assiette blanche »). Reprendre les `sujet` de `photos/index.json`.

### F3 (finition)
- **F3-1** `site.ts:11` : `typeCuisine` « Cuisine gastronomique française inventive » (sortie dans `servesCuisine` du JSON-LD, `Base.astro:25`) n'est pas dans le dossier ; utiliser « Cuisine de saison et de marché ».
- **F3-2** « trente-quatre couverts » apparaît 8 fois (hero, plan, formules, histoire x2, réservation, 404, pied) ; la signature le justifie, mais garder 3 à 4 occurrences. À la réservation, le chapeau se coupe en « trente- / quatre » à 1440 px : utiliser un trait d'union insécable (U+2011) ou `.nw`.
- **F3-3** Contraste : les 9 + 8 « contrast needs review » d'axe ne sont pas tranchés ; les jetons texte sont à plus de 7:1, le seul cas à risque est `.salle figcaption` posé sur la photo (`site.css:98`, ombre portée seule) : échantillonner les pixels de `home/d-02-scroll.png` après correction du texte.

Non vérifié (faute de preuve, à noter pour la passe 2) : contraste mesuré en pixels de la légende sur photo ; menu mobile `<dialog>` sur un vrai téléphone (signalé dans ETAT.md) ; reduced-motion testé seulement par `report.json` (`hiddenText` 0, `moving` false).

## Ce qui est bien (à ne pas casser)
1. Le plan de 34 places, cohérent partout (dressage, registre du pied, champ « couverts » qui allume N places) et marqué « illustratif » ; la réservation reste honnête (mailto explicite, tél. et page du client).
2. Hygiène technique propre : 0 erreur, 0 axe, 0 débordement, un seul logo KYW, noindex, mention, JSON-LD limité aux horaires confirmés, lundi « à confirmer » au lieu d'une invention.
3. Carte fidèle au site du client (descriptions, suppléments, notes), sans attribution inventée aux services, et photos signalées « vues d'archives » qui ne se prétendent pas le menu du moment.
