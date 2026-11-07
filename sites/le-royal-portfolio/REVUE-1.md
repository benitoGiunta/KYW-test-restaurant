# Revue portfolio · Le Royal Namur · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une ardoise de brasserie sombre, avec nom géant, trait de craie jaune, carte lisible en onglets TABLE | BAR, prix en grand, barre basse rouge brique (réserver, appeler, carte) et sections crème pour la terrasse.

Scores /10 (preuves : captures `.shots-le-royal-portfolio-revue1/`, mesures maison de la passe 1)
- Design 8 : composition tenue et cohérente (hero `d-01-hero`, terrasse `d-terrasse-full`, mobile `m-01-hero`) ; mots géants et trait de craie ont du caractère ; eyebrows et barre fixe desktop alourdissent.
- Usabilité 7 : carte de 63 lignes très lisible à 390 px (`m-02-scroll`), CTA clairs ; en-tête mobile à 3 liens seulement, formulaire de démonstration qui ne transmet rien à Zenchef.
- Créativité 7 : ardoise, craie, marquee d'état, suggestion du jour ; l'ossature reste celle du gabarit Ardoise.
- Contenu 6 : faits exacts et prudents (rien d'inventé), mais « maison maison » sur 5 lignes, phrases répétées sur 5 pages, page « La maison » presque vide.
- Technique 8 : 0 erreur console, 0 lien mort (30 URL internes en 200), 0 débordement (1440 et 390, 6 pages), 0 cible < 24 px, 0 violation axe grave, contraste 0 nœud sous le seuil (14 cas), LCP mobile 1100 ms, CLS 0.

## Contrôles de la passe
- Build OK (QA-revue1 : 7 pages, exit 0). Captures plus récentes que `dist/` (00:47 contre 00:42) : réutilisées.
- Pages non couvertes par le crawl (formules, histoire, terrasse, réservation, vraie 404) : script maison, 1440 et 390 px, axe complet, débordement, console, 12 captures ; vraie 404 capturée (`404.html` : title, lang fr, h1 unique, noindex, mise en page OK à 390 et 1440).
- Texte confronté à `donnees.json`, `dossier.md`, `carte.txt` : nom, adresse (n° 13), tél. 081 22 01 33, e-mail, horaires 12h-14h30 / 18h-22h, Zenchef, Facebook, Instagram, 63 prix de la carte, menu des fêtes 50 € / 65 €, moules 20 € « à confirmer », note Google 4,0 / 577 : 0 écart, 0 T-faux, 0 T-invente. Prudences respectées (avis 1,5/5 non repris, TripAdvisor écarté, ouverture 11h-23h signalée).
- Mention « Maquette KYW », logo KYW (un seul `kyw-footer__logo`), `noindex, nofollow` (conforme au prompt § 3.3), `lang="fr"`, un seul h1, JSON-LD `Restaurant` (adresse, 14 plages d'horaires), canonical, OG, favicon, `og.jpg`, `robots.txt`, sitemap : présents sur les 7 pages.

## Findings (par gravité)
### F0
Aucun.

### F1 majeur
- F1-1 (T-doublon) « maison maison » : le badge `maison` s'ajoute à un nom qui contient déjà « maison » sur 5 lignes de la carte (accueil et /carte/) : « Duo fondus fromage maison [MAISON] », « Duo croquettes crevettes grises maison [MAISON] », « Boulettes maison [MAISON] », « Royal Burger maison [MAISON] », « Vol-au-vent maison (poularde) [MAISON] ». Preuve : texte du `dist/index.html`, planche `le-royal-item/planche.png` (m-03 : « Boulettes maison (MAISON) »). Fichiers : `src/data/site.ts:72` (table `badges`) et `src/components/Lignes.astro:21`. Correction : ne pas poser le badge quand `nom` contient « maison » (ou retirer ces entrées de `badges`) ; garder le badge sur les seules lignes dont le nom ne le dit pas.

### F2 mineur
- F2-1 Lien trompeur : « Toute l'histoire → » (`src/pages/index.astro:84`) mène à « La maison », qui n'a pas d'histoire (`histoire: null` dans les données) : trois paragraphes dont deux déjà lus sur l'accueil. Correction : libeller « La maison → » ; sur /histoire/ ne pas redire le texte de l'accueil (voir F2-2).
- F2-2 Répétitions : « déjeuner d'affaires, dîner entre amis, pause avant ou après un spectacle » dit sur l'accueil (blocs terrasse et maison), /histoire/, /terrasse/ (chapeau) ; « la terrasse fait face au Théâtre de Namur » sur 5 pages ; « Sur la Place du Théâtre, la terrasse fait face au Théâtre » dans l'accès (accueil et /reservation/) ; phrase d'horaires répétée sur 6 pages (WARN de l'audit). Correction : une seule formulation par idée, les autres pages l'abrègent ou la retirent (chapeau de /terrasse/ : une phrase différente ou aucune).
- F2-3 Suggestion « AUJOURD'HUI, SAMEDI » (`site.ts:114-117`) : chaque jour met en avant un plat différent de la carte avec le cadre d'un plat du jour, alors que le dossier n'annonce aucun plat du jour ; la mention « à la carte tous les jours » corrige à moitié. Correction : retitrer en « À la carte » sans « aujourd'hui » (ou ne garder que mardi et jeudi, issus de l'ardoise) ; le décor rotatif peut rester.
- F2-4 Page « La maison » presque vide (`histoire-full` : une photo, trois paragraphes, une note Google) : le contenu manque, pas la mise en page. Correction : fusionner avec /terrasse/ ou l'étoffer avec des faits prouvés (cuisine de brasserie, vin du patron, spécialités du dossier), sans rien inventer.

### F3 finition
- F3-1 Format d'horaires : tableau « 12:00 à 14:30 » (accueil, /reservation/) contre « 12h à 14h30 » ailleurs. Correction : « 12h00 à 14h30 » partout.
- F3-2 Prix de la suggestion « 28 , 90 € » : espace visible avant la virgule (`d-01-hero`, `m-01-hero`). Correction : crénage ou `font-variant-numeric` du prix.
- F3-3 Méta description de l'accueil : 178 caractères (cible ≤ 160).
- F3-4 Poids : `photos/terrasse.webp` 352 Ko (> 300 Ko) ; /terrasse/ ~1,37 Mo. Recompresser (qualité 70).
- F3-5 JSON-LD : `url` pointe vers le site réel du client (`leroyalnamur.be`) et `telephone` sans indicatif (+32 81 22 01 33).
- F3-6 En-tête mobile : seuls La carte, La maison, Réserver (Menus et La terrasse accessibles par le pied de page ou la page).
- F3-7 Barre basse rouge fixe sur desktop (63 px permanents, passe sur les photos : `d-05-scroll`, `d-terrasse-full`) : redondante avec l'en-tête à 1440 ; la réserver au tactile.
- F3-8 Eyebrows au-dessus de presque chaque titre de section (« La terrasse », « La maison », « Ce qu'on en dit », « Avant ou après le spectacle », « À la carte ») : motif de gabarit récurrent ; en retirer la moitié.
- F3-9 Moules jumbo 20 € présentées comme troisième « menu » avec prix géant (`m-formules-full`) alors que les conditions sont à confirmer : sortir la ligne du bloc des menus ou réduire son poids visuel.
- F3-10 Axe (moderate) : `landmark-no-duplicate-contentinfo` et `region` sur les 7 pages (pied du site et `kyw-footer`), `heading-order` sur l'accueil. Passer le pied du site en `div role="presentation"` ou retirer le rôle contentinfo du pied du site ; localiser le saut de titre.
- F3-11 Formulaire de démonstration (/reservation/) : quatre champs saisis puis perdus au passage vers Zenchef ; sa mention est honnête. Option : ne garder que le lien Zenchef et le téléphone.
- F3-12 `heroSettledMs` 3674 sur l'accueil (QA, loader compris) : loader non re-mesuré (le code annonce 0,7 s minimum + sortie ~1,3 s) ; à mesurer en deux passes si le plafond de 2,6 s compte.

## Faux positifs écartés (ne pas corriger)
- `skipLinkFirst: false` : « Aller au contenu » est le premier arrêt (`keyboard`, stops[0]).
- Audit « pas de robots.txt / sitemap » : `dist/le-royal/portfolio/robots.txt` et `sitemap-index.xml` existent (WARN sous `base`).
- 404 « sans h1, sans title, 2 axe serious » : réponse brute du serveur ; la vraie `404.html` a title, lang et h1.
- Contraste « à vérifier » (60 accueil, 99 /carte/) : mesuré nœud par nœud (canvas 1x1, opacité cumulée, après défilement) : 0 sous le seuil sur 14 cas.
- `noHoverChange: 1` : l'onglet TABLE déjà actif.
- `<img>` de l'aperçu flottant sans `src` : volontaire (renseigné au survol, masqué aux lecteurs d'écran).

## Ce qui est bien (à ne pas casser)
1. Honnêteté des données : « conditions à confirmer », aucun avis inventé, avis négatif et TripAdvisor écartés, ouverture 11h-23h signalée sans la reprendre en horaires.
2. Carte complète de 63 lignes, lisible et rapide à 390 px, onglets TABLE | BAR, barre d'état « ouvert / fermé » juste.
3. Mobile pensé : mots géants contenus (0 débordement à 320, 360, 390), 404 « Effacé » réussie, galerie terrasse sans trou, alt des photos fidèles à `photos/index.json`.
