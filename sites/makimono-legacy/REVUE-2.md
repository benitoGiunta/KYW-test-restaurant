# Revue legacy · Makimono · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : inchangée depuis la passe 1 : une page unique crème et vermillon, titres en slab Ultra, hero de nigiri flambés, carte à onglets et deux composeurs encadrés, ton de comptoir, action « Commander en ligne ».

Preuves : dist (11:47:42) postérieur à src ; `QA-revue2.md` absent et `.shots-makimono-legacy-revue2` en `shootFailed` (« browser closed ») : seules les captures desktop de l'accueil (11:47 à 11:48, postérieures au dist) existent ; pas de mobile ni de 404. Mesures propres (serveur 4412, PID 20079 arrêté) : 4 scripts maison via scripts/q.sh (axe-core de node_modules après défilement complet et 1,8 s de repos, console, requêtes, débordement, cibles < 24 px, balises, logo KYW, accueil et 404.html réelle x 1440/1024/768/390 ; menu popover, flèches des onglets, reduced-motion ; mots coupés des titres à 768/430/390/360/320, onglets tous activés) + confrontation de la carte à donnees.json (2 scripts Python) + 6 captures ciblées (`.shots-makimono-legacy-revue2/p2/`).

## Vérification des corrections annoncées dans REVISION-1.md
| id | annoncé | constaté |
|---|---|---|
| F1-1 | 13 rolls avec « Au choix : … » | CONFIRMÉ. 13 `ligne__choix` dans dist ; 72 paires protéine/prix des 9 rolls « prix par protéine » identiques à donnees.json (0 écart) ; les 4 rolls « Protéine au choix » (Dragon Eye, Tiger Fire, Aloha, Avocado Twist) relus à l'œil contre donnees.json, prix et nombre d'options conformes ; le prix « dès » = minimum de chaque liste (13/13), listes croissantes ; note de rubrique présente ; lisible à 1440 (rolls-1440) et à 390 (rolls-390, 14 px, wrap propre, aucune ligne coupée). |
| F1-2 | base riz vinaigré 5,50 € | CONFIRMÉ. Groupe « Base · Riz vinaigré 5,50 € » en tête de Create.Your.Bowl (composer-1440, composer-390) ; protéines, fillings 1,50 €, toppings 0,80 €, sauces 0,80 € conformes. |
| F2-1 | casse normalisée | CONFIRMÉ. 0 occurrence de « cream Cheese », « Oignons Frits », « Coco Râpé », « Foie Gras », « Tempura Flakes », « Jeunes Oignons », « Mayo Japonaise », « Chips Tortillas » dans le texte visible ; mots capitalisés restants dans les descriptions : Nori, Spicy, Teriyaki, Unagi, Goma, Korean, Soju, Arizona, Peach, Yuzu, Umeshu, Pomegranate (noms propres ou de produits). Reste « Saumon Snacké Teriyaki », « Portion de Yam Tempura », « Poulet Katsu Sauce Tropicale » : ce sont des noms de plats, hors périmètre. |
| F2-2 | un seul contentinfo | CONFIRMÉ. 1 `<footer>` par page (le `kyw-footer`), pied du site en `<section aria-label>` ; axe : 0 violation sur accueil et 404 aux 4 largeurs (aucun `region` apparu). |

Non-régression : 0 erreur ni avertissement console, 0 requête en échec ou >= 400, scrollWidth = clientWidth aux 4 largeurs sur les 2 pages, 0 élément hors cadre, 0 cible < 24 px, h1 unique, lang fr, noindex, mention « Maquette KYW, certaines données sont illustratives » et logo KYW (720 px chargé) sur les 2 pages, menu popover s'ouvre et se referme au clic d'un lien, onglets aux flèches (aria-selected et un seul panneau visible), reduced-motion : 0 élément à opacité 0. Liens externes : commande 200, PDF 200, Facebook, Instagram, Maps 302 (redirection normale), tel et mailto conformes.

Scores /10
- Design 7,5 : hero, slab et encadrés tiennent ; la carte reste une longue liste, et les titres de sous-sections se coupent en milieu de mot sur téléphone (F2-1).
- Usabilité 8 : le visiteur peut maintenant calculer un roll (liste par protéine) et un bowl (base 5,50 €), onglets et menu fiables ; 0 cible < 24 px.
- Créativité 6,5 : inchangée, parti pris trame/puits cohérent mais composition de one-page attendue.
- Contenu 8 : 62 plats sur 62 conformes à donnees.json (prix et nombres), choix de protéine restitué, casse propre, 0 invention ; reste un chapeau sans fait (F3).
- Technique 8,5 : 0 axe, 0 console, 0 débordement ; poids d'images et polices ttf inchangés (F3).

## Findings (aucun F0, aucun F1)

**F2-1 · Titres de sous-sections coupés en milieu de mot à 390 px et moins** (`src/styles/page.css`, `overflow-wrap: break-word` sur les h3 ; captures composer-390 et acc-390). « Create.Your.Bo / wl » (et « Create.Your.Roll » sur 2 lignes) dans les deux composeurs, « Accompagnement / s » dans l'onglet Accompagnements ; mesuré par rectangles de mots : 2 lignes pour 1 mot à 390, 360 et 320, 1 ligne à 430 et au-dessus. Défaut présent en passe 1, non repéré (planches limitées à l'accueil desktop et au haut de page). Pas de débordement ni de violation axe, mais le titre de la section la plus consultée sur téléphone est cassé. Correction : réduire la taille de ces h3 sous 30 rem, par exemple `font-size: clamp(1.25rem, 6.4vw, 1.95rem)` sur `.composeur h3` et `.rubrique__tete h3` (« Create.Your.Bowl » doit tenir sur 1 ligne à 320 px dans ~230 px utiles ; « Accompagnements » aussi), ou `hyphens: auto` avec `lang="fr"` pour « Accompagne-ments » ; revérifier à 390, 360 et 320.

**F3-1 · Korean Futo « 10,50 à 11,00 € »** : inchangé (hors périmètre de la révision). Choisir 11,00 € (carte) ou l'assumer dans RAPPORT.md.
**F3-2 · Hover par couleur seule** sur nav et « Commander » : inchangé.
**F3-3 · Poids et polices** : inchangés (images ~1,1 Mo au total, polices ttf via Google Fonts).
**F3-4 · Horaires** : la ligne « 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00 » répétée 6 fois : inchangé.
**F3-5 · Chapeau « Seize pièces, à partager ou pas. »** : inchangé.
**F3-6 · « dès » face à une recette qui cite une autre protéine** (Dragon Eye : recette au poulet katsu, « dès 10,00 € » alors que le poulet coûte 11,00 € ; idem Tiger Fire, Aloha, Avocado Twist) : atténué par la ligne « Au choix » juste dessous, donc F3 ; correction possible : afficher le prix de la protéine de la recette en grand et la liste en dessous.
(Pas de robots.txt : sans objet, page noindex.)

## Ce qui est bien (à ne pas casser)
1. La ligne « Au choix : … » sous chaque roll : discrète (14 px, encre pleine), triée par prix, identique au dossier ; la carte reste scannable.
2. Le composeur Bowl avec sa base à 5,50 €, alignée sur celui du Roll : on peut calculer un prix.
3. Robustesse : 0 débordement 1440 à 390, pied KYW unique sans doublon de contentinfo, menu popover et onglets au clavier, reduced-motion sans contenu caché, 404 réelle complète.
