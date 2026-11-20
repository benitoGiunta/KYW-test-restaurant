# Revue portfolio · Don Dino · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 4 F2, 4 F3)

Lecture de l'idée (avant DESIGN.md) : une guinguette italienne ludique, avec objets dessinés au trait (parasol, chope, pizza), tirages photo à « attraper » sur fond vert, carte complète lisible en HTML, palette crème, vert et corail façon drapeau italien. Idée cohérente avec une brasserie-pizzeria familiale, lisible, sans signature générique.

Hypothèses : captures de `.shots-don-dino-portfolio-revue1/` (accueil, carte, 404 serveur) reprises telles quelles ; histoire, terrasse et réservation, non captées par le QA, mesurées par moi (script axe-core + console + débordement + premier arrêt de tabulation, 1440 et 390 px, `dist` servi sur le port 4617, arrêté par `kill`) et relues sur planche mobile. Build non relancé : `dist` (16:34) postérieur à `src` (16:30), QA-build exit 0.

## Scores /10
- Design 7,5 : hero sobre, tirages photo vifs sur fond vert, carte en pastilles de prix nette (`d-02-scroll` carte, `d-03-scroll` accueil) ; filigrane « Avis » à moitié masqué par les cartes (`d-05-scroll`).
- Usabilité 8 : lien d'évitement en premier sur 5 pages, menu mobile fixe, recherche et pastilles de rubriques sur la carte, réservation par tel ou dondino.be ; 0 débordement, 0 cible < 24 px (mesure).
- Créativité 8 : objets au trait, tirages à ranger, marquee d'état « Fermé en ce moment, ouverture à 18:00 » calculé depuis les horaires.
- Contenu 6,5 : prix, horaires, adresse, téléphone, Facebook conformes à `donnees.json` (114 chiffrés vérifiés par script, 0 écart de prix) ; mais genre faux dans le `<title>` et horaires de service faux dans le marquee (F1) ; coquilles de la carte PDF reprises (F2).
- Technique 7,5 : 0 erreur console et 0 requête en échec sur 6 pages, JSON-LD `Restaurant` complet, noindex, mention et logo KYW présents partout, un seul h1 par page ; LCP mobile accueil 2832 ms et loader mobile 5493 ms (throttlé), contraste 4,44 : 1 sur `.lead` corail.

## Findings

### F1 (majeurs)
- **F1-1 · T-faux · `<title>` de l'accueil.** `src/layouts/Base.astro:19` : titre par défaut `Don Dino | Bistronomie à Naninne (Namur)`. Don Dino est une brasserie-pizzeria familiale, pas une bistronomie (dossier : « Brasserie-restaurant-pizzeria », cuisine familiale et traditionnelle). Preuve : `<title>` de `dist/don-dino/portfolio/index.html`, repris dans le titre d'onglet et le partage. Correction : `Don Dino | Brasserie-pizzeria à Naninne (Namur)` (idem `og:title` si dérivé).
- **F1-2 · T-faux · marquee sur toutes les pages.** `src/components/Marquee.astro:5` : « Service du soir du lundi au dimanche ». Le restaurant sert midi ET soir 7 j sur 7 (12:00-14:30, 18:00-22:30 ; 23:30 vendredi et samedi). Présent dans le HTML des 6 pages (sans JS, et en mobile la phrase défile en bandeau toujours visible). De plus le libellé sans JS « Horaires du jour » n'annonce rien. Correction : « Midi et soir, 7 jours sur 7 » (ou dérivé : `12:00-14:30 · 18:00-22:30`) et un libellé sans JS utile (« Ouvert 7 jours sur 7 »).

### F2 (mineurs)
- **F2-1 · Coquilles de la carte reprises.** `src/data/carte.json` (non corrigées malgré la consigne du dossier) : « Végétariene » (Pizzas), « gorgonzala » (Fiorentina), virgules sans espace : « mozzarella,salami » (Diavola, visible sur l'accueil `d-03`), « mozzarella,fruits de mer » (Pescatora), « mozzarella,parmesan » (Bolognaise), « aubergine,sauce tomate » (Escalope parmigiana). « carbonnara » est conservé volontairement (dossier). Correction : « Végétarienne », « gorgonzola », espace après chaque virgule.
- **F2-2 · Contraste axe serious à 390 px.** `.lead` (texte `#1f1a17` sur corail `#e8483a`) : 4,44 : 1 au lieu de 4,5 : 1 sur l'accueil (section « Une grande carte, un patron joyeux ») et sur `/terrasse/` (« Le restaurant dispose d'une terrasse… »). Mesure axe-core, 20 px normal. Correction : assombrir le texte (`#120e0c`) ou éclaircir légèrement le corail, ou passer le `.lead` en gras. Le QA avait aussi relevé 4,36 : 1 sur `.kyw-footer__note` (404) : non reproduit sur `404.html` réel, à vérifier.
- **F2-3 · Performance mobile.** LCP mobile accueil 2832 ms (> 2,5 s, élément `img`), loader mobile 5493 ms throttlé (2422 ms en desktop, limite 2,6 s). Correction : précharger/prioriser l'image LCP (`fetchpriority="high"`, `loading="eager"`) et plafonner le loader à 2 s ou le sauter à la première image prête.
- **F2-4 · Couverture QA.** Le QA n'a capturé que 3 pages sur 6 et sa « 404 » est la page de repli du serveur (arrêts de tabulation différents). Aucun défaut propre trouvé sur histoire, terrasse, réservation hors F2-2. Son indicateur « lien d'évitement en premier : non » est un faux négatif (le premier arrêt est « Aller au contenu » sur les 5 pages mesurées).

### F3 (finitions)
- **F3-1** Eyebrows répétés au-dessus des titres (« Le menu », « La maison », « Avis », « Horaires ») et « Le menu » alors que la page et la nav disent « La carte ».
- **F3-2** Le filigrane « Avis » est coupé en dessous des cartes (`d-05-scroll`) et son masque déborde de 1 px (mesure : `h2` « Avis », 1440 et 390) : ajuster la hauteur de ligne ou le décaler hors des cartes.
- **F3-3** Titre « Ils en parlent » au-dessus de 4 avis fictifs : marqués « Exemple d'avis » (donc conformes, aucun avis inventé non marqué), mais le titre suggère de vrais avis ; préférer « Ce qu'on pourrait entendre » ou « Exemples d'avis ».
- **F3-4** Textes : « Ouvert 7 jours sur 7, midi et soir » dit trois fois (baseline hero histoire, dernier paragraphe, marquee) ; « La carte se veut belle pour tous les goûts » est lourd (« Une carte pour tous les goûts »).

## Vérifications sans écart
Faits (nom, adresse, tél +32 81 74 15 60, horaires 7 j dont 23:30 ven. et sam., Facebook `dondino.be`, réservation dondino.be/fr/reservations) ; aucune invention non marquée (desserts et boissons marqués « exemples illustratifs », email jamais affiché) ; vouvoiement, 0 tiret cadratin, 0 `<img>` sans alt, alts fidèles aux photos (pizza aubergine-poivron, pizzaïolo, bar, homme à la pizza) ; aucune photo agrandie (largeur affichée < largeur naturelle) ; liens internes OK (0 réponse >= 400 sur 6 pages) ; mention « Maquette KYW, certaines données sont illustratives » + logo KYW unique + noindex sur les 6 pages ; JSON-LD adresse et horaires ; `lang="fr"`.

## Ce qui est bien (à ne pas casser)
1. La carte HTML complète (115 lignes, 12 rubriques) avec pastilles de prix, recherche, rubriques, et prix tous identiques aux données.
2. Les tirages photo « à attraper » et les objets au trait : identité propre, mobile pensé (nav pilule fixe, objets conservés).
3. Le marquee d'état calculé depuis les horaires (aucune date en dur) et le formulaire honnête (« démonstration sans envoi », renvoi vers dondino.be).
