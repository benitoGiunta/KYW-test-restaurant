# Revue gabarit verger · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant « de saison » dont la roue des mois, tirée de l'horloge du visiteur, dit ce qui est mûr et affiche « la carte du mois ». Palette crème et vert sapin, condensée fine en capitales et italique Newsreader.
Méthode : planches des captures du constructeur (`.shots-verger/index2, carte, saisons, producteurs2, histoire, reservation, 404`, report.json), antérieures au dernier build (17:54) : les contrastes ont été relus dans le CSS du build, pas remesurés par axe. Tests propres sur http://127.0.0.1:4420/gabarits/verger/ : Playwright `page.clock` (mars, juillet, octobre 2026) et passage mobile 390 px des 7 pages. Auto-score avec quality-bar.md (pas de critique aveugle : pas d'outil Agent).

Scores /10
- Design 7 : système typo net (condensée 300 en capitales, italique), palette tenue, pied de page et 404 dessinés ; mais h1 desktop de 388 px de large sur 1440 et marges vides (d-01-hero), rythme répétitif d'une page à l'autre.
- Usabilité 7 : h1 visible à 390 px sur les 7 pages (top 219 px, 46,8 px de corps, visibility visible), 0 débordement, 0 élément caché après défilement complet, nav claire ; loader mobile 5 à 6 s (loaderMs) et LCP histoire 3,9 s.
- Créativité 8 : la roue des saisons pilotée par l'horloge est propre à ce sujet (index2 d-02, m-02), la branche à 12 feuilles et le « Nous sommes en … » du pied de page la prolongent.
- Contenu 6 : textes réels et bien repris du dossier, mais la mécanique « carte du mois » promet une chose fausse (F1-1) et la page saisons invente un rythme de carte (F1-2).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 FAIL audit, CLS ≤ 0,022, 60 fps mobile, h1 unique, noindex partout ; 3 pages avec un défaut de contraste dans les captures (corrigé dans le build, à confirmer).
Développeur : sémantique/SEO 7, animations 7, accessibilité 7, WPO 7 (page la plus lourde 631 Ko), responsive 8, métadonnées 7.
Score pondéré estimé : 7,1 (Honorable Mention plausible, Site of the Day non).

Horloge (demandé) : OK. `html[data-mois]` vaut 3, 7 et 10 pour les trois dates simulées ; le nom du mois, le bouton actif, la pastille et « Nous sommes en … » suivent. Aucune date en dur dans le gabarit (seul « hiver 2019 », cité du dossier, dans l'histoire).

## Findings
### F1 majeurs
- F1-1 « une donnée, un drapeau » / « rien de promis » : la pastille « La carte du mois · <mois> » (index.astro:45), l'étiquette de hero « <mois> · la carte en cours » (index.astro:23) et le « Légumes racines / Champignons / Noix … » en dessous présentent le menu réel (Saint-Jacques, Butternut, Soufflé chaï poire, relevé à une date inconnue) comme celui du mois courant. Mesuré avec l'horloge : en juillet, « JUILLET · LA CARTE EN COURS » au-dessus du menu butternut ; idem en mars. Faux six mois sur douze. Correction : libeller « La carte telle que relevée » sans mois, ou garder le mois seulement sur la roue (calendrier indicatif) et supprimer « carte en cours » / « carte du mois » ; le mois courant ne doit jamais coiffer le menu réel.
- F1-2 T-invente : la page saisons (h1 « Quatre cartes par an », « Le menu change avec le verger ») affirme un rythme de quatre cartes ; le dossier dit seulement « menu unique de saison ». Les exemples sont marqués `*` mais le titre et le chapeau, eux, ne portent aucun drapeau. Correction : h1 sans chiffre (« Ce que chaque saison apporte »), chapeau marqué « exemple », ou drapeau `placeholder` sur le titre.
- F1-3 Une donnée, un drapeau (liens roue/plats) : `platsDuMois` (site.ts) est `placeholder: false` alors que le lien plat → ingrédient → mois vient du calendrier indicatif ; la roue montre « en ce moment » Champignon / Butternut / Carotte / Poire en toute saison (index.html, bloc roue, texte statique) alors qu'en juillet la légende dit « Cerise, Fève, Courgette, Tomate ». Correction : `placeholder: true` sur le lien et ne montrer le plat réel qu'à côté d'un ingrédient du mois courant, ou l'étiqueter « plat réel, calendrier indicatif ».

### F2 mineurs
- F2-1 « le hero est vu » (desktop 1440×900) : la photo du hero (boeuf confit, assiette rouge, signature du restaurant) commence à y = 853 px, soit 47 px sous la fenêtre ; d-01-hero ne montre qu'un liseré de photo. Mobile : m-01-hero montre h1 et photo, c'est bon. Correction : hero desktop en deux colonnes ou h1 plus bas/plus petit pour que la photo tienne dans 900 px.
- F2-2 h1 sous-dimensionné sur desktop (388 px de large pour 1440 px, trois ou quatre lignes empilées) : le premier cadre manque d'échelle. Corriger par un corps de titre en `clamp` plus grand ou une mise en page asymétrique.
- F2-3 Contrastes dans les captures : `.exemple` (#dd7a8e sur #f8f6f0, 2,68:1) sur carte, histoire, et `button[data-mois-btn="10"]` sur l'accueil (report.json, `a11y.serious: 1`). Le CSS du build utilise désormais `--c-terre` (#5a4634) : à remesurer par axe sur le build courant ; `--c-accent` reste en bordure uniquement.
- F2-4 La page histoire a un LCP mobile de 3,9 s (`p.lead`, histoire/report.json) et le loader dure 5 à 6 s (loaderMs mobile, 4x CPU) : au-dessus du seuil de 2,5 s. Ne pas révéler le chapeau avant la fin du loader.
- F2-5 « Écrire un e-mail » (reservation) et le pied de page pointent vers bonjour@lespotesaufeu.be : le pied de page porte « (adresse illustrative) », le bouton de la réservation non. Donnée du dossier : e-mail `null`. Ajouter la marque ou retirer le bouton.
- F2-6 « il y a quatorze ans » (histoire.astro, site.ts) est une durée relative recopiée du site client : fausse l'an prochain (rien de daté). Écrire l'année si elle est prouvée, sinon « il y a une quinzaine d'années » n'est pas mieux : citer « avant l'ouverture, début de l'hiver 2019 » seulement.
- F2-7 Répétitions : le paragraphe « Le concept : une cuisine bistronomique… » figure deux fois sur l'accueil (audit : « sentence repeated 2x ») et une fois sur histoire ; les horaires sont répétés 2 à 4 fois par page (pied de page + corps).
- F2-8 Calendrier (site.ts) : `mois` de plusieurs ingrédients désordonnés ou ambigus (Endive [2,1], Carotte [11,10], Pomme [12,10,11], Poireau [2,11], Épinard [3,10]) ; la page saisons range Épinard au printemps seul et oublie Poireau, mais la roue d'octobre affiche « Épinard ». Un seul tableau de vérité, trié.

### F3 finition
- F3-1 Ligatures : « Boeuf », « Oeuf parfait », « Oseille », « Oeuf » dans les exemples (carte, saisons) ; écrire « Bœuf », « Œuf » en protégeant les chemins de photos (leçon cahier). Le dossier écrit « Boeuf » : choix à trancher, mais cohérent.
- F3-2 Eyebrow « Archive » sur la page saisons : sens obscur ; une étiquette au-dessus de chaque h1 (« La carte », « Une rencontre », « Réserver », « Erreur 404 ») répète le schéma eyebrow + titre sur 7 pages.
- F3-3 Audit : « 404 page has no <h1> » dans le HTML servi (h1 créé par le moteur après JS) ; mettre le h1 en dur dans 404.astro. robots.txt et sitemap : normaux sous `base`.
- F3-4 Formulaire de réservation « démonstration sans envoi » : honnête, mais les champs date/heure/couverts ne sont pas transmis à Zenchef ; l'annoncer ou les retirer.

## Ce qui est bien (à ne pas casser)
- L'horloge pilote vraiment la roue : mars, juillet et octobre donnent trois états corrects sans erreur console, repli « de saison » sans JS.
- Mobile 390 px composé : h1 visible sur les 7 pages, `scrollWidth` = 390, aucun texte caché après défilement complet, tap targets ≥ 24 px, 60 fps.
- Honnêteté des données illustratives : producteurs marqués « exemple » carte par carte avec bandeau, Sara/Jordan « photo à fournir / rôle à confirmer », boissons marquées ; mention « Maquette KYW… » + logo KYW + `noindex, nofollow` sur les 7 pages, liens Zenchef/Facebook/YouTube conformes au dossier, aucun avis inventé affiché.
