# Revue legacy · Makimono · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique crème et rouge vermillon, titres en slab très gras, hero photo de nigiri flambés avec une carte de titre posée dessus, carte à onglets complète au centre, encadrés « sérigraphiés » à trame de points ; ton direct de comptoir fast-casual, action principale « Commander en ligne ».

Preuves : dist (11:29) postérieur à src ; QA-revue1 et captures (11:29 à 11:35) postérieures au dist, réutilisées. Mesures propres : axe-core (node_modules), console, requêtes, débordement, cibles, balises sur 2 pages (accueil, 404.html réelle) x 4 largeurs (1440, 1024, 768, 390), menu popover, onglets, reduced-motion, liens (curl), 73 plats de la carte confrontés à donnees.json (0 prix manquant), captures ciblées galerie/boxes. Hypothèse : « dès X € » est jugé contre `donnees.json` (prix par protéine).

Scores /10
- Design 7,5 : palette et slab cohérentes, hero plein écran 825 px, mobile pensé (photo 38 dvh, titre et bouton visibles en 812 px, m-01-hero) ; le haut de page est sûr mais la carte (d-02, d-03) reste une longue liste sans respiration.
- Usabilité 7 : un seul CTA plein, nav active par scrollspy, onglets OK au clavier, 0 cible < 24 px ; mais l'utilisateur ne peut pas calculer le prix de ses rolls ni de son bowl (F1-1, F1-2).
- Créativité 6,5 : trame de points et puits à bordure épaisse tiennent un parti pris ; reste une composition de one-page assez attendue.
- Contenu 6,5 : aucune invention, prix tous présents ; mais deux informations de prix déterminantes sont perdues à la transcription et la casse des ingrédients est cassée.
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = clientWidth aux 4 largeurs), LCP mobile 984 ms, CLS 0,034 desktop, 0 axe critique/sérieux sur accueil, h1 unique, lang fr, noindex, mention et logo KYW présents.

## Findings
**Aucun F0** (build OK, 0 invention, 0 lien mort, 0 débordement, 0 violation axe critique).

**F1-1 · Rolls : le choix de la protéine et son prix disparaissent** (`src/data/site.ts:49`, `carte.json` rolls ; capture m-02-scroll, d-02-scroll). Chaque roll d'origine est « au choix de la protéine (prix par protéine) » : California Classic de 7,60 € (Yam Tempura) à 9,90 € (Thon snacké, Scampis), via Saumon 8,40 €, Poulet Katsu 9,70 €. Le site affiche « California Classic 8 pièces. Saumon, avocat… dès 7,60 € » : la recette cite le saumon mais le prix est celui du yam tempura, et nulle part la page ne dit que la protéine se choisit (la mention n'existe que dans Create.Your.Roll). Le visiteur croit payer 7,60 € le roll au saumon (réel 8,40 €). Même défaut pour les 9 rolls « dès » à 8 pièces ainsi que Dragon Eye, Tiger Fire, Aloha, Avocado Twist (13 occurrences de « dès »). Correction : ajouter sous « Sushi Rolls » la note « Chaque roll existe au choix de la protéine ; le prix dépend d'elle » et, par roll, soit la liste « Yam Tempura 7,60 € · Saumon 8,40 € · … » (donnees.json `carte[0]`, descriptions), soit un tableau protéines/prix par roll ; remplacer « dès » ambigu par la protéine de la recette quand elle est citée. Retirer aussi « Saumon » de la recette affichée si le prix de base n'est pas celui du saumon.

**F1-2 · Create.Your.Bowl : la base (riz vinaigré 5,50 €) est omise** (`carte.json` bowl ; texte du site lignes « Protéine… Fillings (1,50 €) »). donnees.json : « Create.Your.Bowl (riz vinaigré 5.50 € + protéine + fillings 1.50 € + …) ». Le bloc bowl du site commence à la protéine : le prix total d'un bowl ne peut pas être calculé (le seul « riz vinaigré » visible est la portion à 4,00 € des accompagnements). Correction : ajouter un groupe « Base » « Riz vinaigré 5,50 € » (comme « Base » du Roll).

**F2-1 · Casse des ingrédients cassée** (`carte.json` descriptions ; m-02-scroll). Transcription en « Title Case » partiel : « cream Cheese », « oignons Frits », « coco Râpé », « tranche de Saumon par Dessus », « amandes Grillées », « piment Mexicain », « mayo Japonaise », « saumon Snacké façon Teriyaki », « tempura Flakes », « feuille de Nori Frit », « jeunes Oignons », « Foie Gras » (casse mêlée sur tout le menu, plats et fillings « Piments Mexicain », « Chips Tortillas »). Correction : normaliser en minuscules sauf noms propres (Nori, Teriyaki, Unagi, Spicy) ; garder la casse des noms de plats seulement.

**F2-2 · `landmark-no-duplicate-contentinfo` (moderate) sur les 2 pages, 4 largeurs** (`.pied` + pied `kyw-footer`). Correction : passer le pied du site en `<div class="pied">` (ou `role` neutre) pour ne garder que le contentinfo du composant KYW ; revérifier qu'aucun `region` n'apparaît ensuite.

**F3-1 · Korean Futo affiché « 10,50 à 11,00 € »**, fourchette qui trahit une incertitude du dossier (« à confirmer ») : choisir une valeur du dossier (11,00 € de la carte) ou le laisser en fourchette mais l'assumer dans RAPPORT.md.
**F3-2 · Hover par couleur seule sur 4 éléments** (QA-revue1, `colorOnly: 4`) : ajouter un soulignement ou un décalage au survol des liens de nav et du bouton « Commander ».
**F3-3 · Poids et polices** : images 1125 Ko et polices en ttf (4 fichiers, WARN audit) sur la page ; servir les polices en woff2 (Google Fonts `css2` renvoie du ttf selon l'UA de l'audit, vérifier avec `display=swap` et préchargement) ; aucune image seule > 300 Ko.
**F3-4 · Horaires** : la ligne « 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00 » est répétée 6 fois (WARN audit) ; regrouper en « Lundi au samedi » + dimanche, ou garder si le tableau est voulu.
**F3-5 · Chapeau « Seize pièces, à partager ou pas. »** : remplissage sans fait ; écrire « 16 pièces, 16 € ou 18 € » ou supprimer.
**F3-6 · Pas de robots.txt** : sans objet ici (page noindex), ne pas corriger ; sitemap présent.

## Ce qui est bien (à ne pas casser)
1. Contenu honnête : zéro histoire, équipe, avis ou chiffre inventé ; 73 plats, tous les prix présents ; horaires, adresse, téléphone (+32 483 03 88 47), e-mail et liens (commande, PDF, itinéraire, Facebook, Instagram : 200) conformes au dossier ; JSON-LD Restaurant avec adresse, géo et 13 plages d'horaires.
2. Robustesse : 0 débordement 1440 à 390, menu popover ouvert/fermé (Échap), onglets de carte fonctionnels (aria-selected, un seul panneau visible), reduced-motion sans contenu caché (0 élément à opacité 0), 404 réelle avec title, h1 et lang.
3. Hero mobile et signature : photo des nigiri flambés pleine largeur puis titre et CTA dans le premier écran, un seul bouton plein par écran, mention « Maquette KYW, certaines données sont illustratives » + logo KYW unique + noindex sur chaque page.
