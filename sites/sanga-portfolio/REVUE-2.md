# Revue portfolio · Sanga · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : un rouleau de plats qui défile à l'horizontale sur fond ivoire papier, trait d'encre, tampon rouge, titres verticaux ; sobre et japonisant, cohérent avec un restaurant de ramen.

Scores /10
- design 7 : le plan et le rouleau sont nettement meilleurs (grands numéros en contour à la place des blancs, `b-rouleau1-3.png`), mais le hero reste voilé de gris (`a-hero1440.png`, `c-hero390.png`).
- usabilité 8 : 5 pages x 5 largeurs (320, 390, 768, 1024, 1440) : 0 cible < 24 px, 0 texte hors fenêtre (mesuré par `Range`), menu lisible, rouleau commandable au bouton.
- créativité 7 : rouleau et sceau restent l'idée forte ; `/maison/` garde trois cartes égales (bouillons) et trois cartes d'avis.
- contenu 7 : faits inchangés et exacts, répétitions de phrases corrigées ; typographie française encore incomplète dans les « » ; photos toujours recyclées.
- technique 9 : build du 15:06 postérieur à src (15:05), QA-revue2 (15:14) postérieure ; 25 combinaisons page x largeur : 0 erreur console, 0 requête en échec, 0 violation axe (contentinfo corrigé, un seul par page), 0 débordement, 1 seul h1 ; noindex, mention et pied KYW sur les 5 pages ; LCP mobile 1,3 s et 1,4 s, CLS 0 (QA).

Méthode : QA-revue2.md (accueil, carte, 404 brute) et planches relus ; `/maison/`, `/commander/` et `404.html` couverts par un script maison (axe-core de node_modules, console, requêtes, `Range.getClientRects` contre la fenêtre, cibles, 5 pages x 5 largeurs après défilement à la molette) ; captures ciblées (hero 1440 et 390, rouleau à 3 positions, plan 1440 et 390, citations 390, hero de la carte 390) ; grep Python du dist (U+00A0, photos par page). Serveur 4621 arrêté (PID 13977).

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constat |
|---|---|---|
| F1-1 plan | corrigé | CONFIRMÉ : rue, point, nom, légende ; plus de rectangles (`d-plan1440.png`, `d-plan390.png`). Reste la taille du texte : voir F2-3 |
| F1-2 insécables | corrigé | PARTIEL : 78 U+00A0, 0 « chiffre espace € », 0 espace simple avant « ! ? » ; mais 2 espaces simples avant « : » sur l'accueil (« Autour du bol : », « La carte : ») et 0 U+00A0 à l'intérieur des « » (voir F2-1). La phrase annoncée « dans les » est fausse |
| F2-1 rouleau vide | corrigé, non recapturé | CONFIRMÉ à l'œil : grands numéros en contour sous les plats sans photo, plus de blanc (`b-rouleau1-3.png`). La photo en forme de « B » rogne toujours le gyoza |
| F2-2 mêmes photos | en partie | CONFIRMÉ en partie : pied = edamame + gyoza. Mais `/maison/` : `gyoza` 3 emplois + `gyoza-960` 2 (page puis pied), `edamame` accueil rouleau + galerie + pied ; accueil : `ramen-deux-bols` 5 emplois (F2-4) |
| F2-3 stock | refusé | accepté comme refus motivé ; à signaler dans le rapport au client (F3-1) |
| F2-4 répétitions | corrigé | CONFIRMÉ : plus de phrase identique entre accueil et maison (lecture du dist) |
| F2-5 chapeaux | corrigé | CONFIRMÉ : 0 `class="chapeau"` hors 404 (1). Reste le « 02 » rouge au-dessus de « Le rouleau » et le numéro rouge de chaque plat (fonctionnels, voir F3-2) ; cartes égales non refaites (F2-5 ci-dessous) |
| F2-6 hero | corrigé | NON CONFIRMÉ : la nappe blanche reste gris moyen sur tout le cadre en 1440 et en 390 (`a-hero1440.png`, `c-hero390.png`) ; les bols sont un peu plus colorés, le voile reste un aplat |
| F2-7 nav | corrigé, non recapturé | PARTIEL : en 390 sur la carte, « La maison » et « Commander » passent sur le bord clair du bol, ombre à peine perceptible (`f-carte390.png`) |
| F2-8 contentinfo | corrigé | CONFIRMÉ : axe 0 violation sur 25 combinaisons |
| F3-3 | corrigé | CONFIRMÉ (grep) |

## Findings

### F0 : aucun
### F1 : aucun

### F2 : mineurs
- **F2-1 · « » sans espace insécable** (dist : accueil 2, maison 4, carte 1, commander 1 espaces simples dans « … » ; `e-citation390.png`). La correction annoncée n'a pas été faite : « « » et « » » peuvent être orphelins en fin ou début de ligne à 390 px. + 2 espaces simples avant « : » sur l'accueil. Correction : U+00A0 après « et avant » (Python sur `site.ts` et les `.astro`), idem avant les deux « : ».
- **F2-2 · Hero toujours terne** (`a-hero1440.png`, `c-hero390.png`). Voile gris sur tout le cadre : la nappe devient gris moyen, l'écran paraît sale. Correction : voile limité à la bande de la nav (haut, 120 px) et à la zone du texte (gauche du « Sanga » vertical et de la phrase), le reste à 0 ; viser une nappe presque blanche.
- **F2-3 · Photos recyclées et plan lisible mais petit** : `/maison/` montre gyoza deux fois dans la page et le pied ; l'edamame sert au rouleau, à la galerie et au pied de l'accueil. Correction : sur `/maison/`, remplacer la photo du pied par un cadrage sans diptyque ou retirer l'une des deux. Plan : légende de rue 11,1 px à 390 et 8,9 px à 320 (le SVG est mis à l'échelle, le « 13 px » annoncé ne s'applique qu'à 1440) ; fixer le texte en CSS à 13 px réels (hors `viewBox`) ou grossir la police du SVG de 1,4.
- **F2-4 · Hero accueil, `ramen-deux-bols` 5 emplois** (hero 960 + 3 variantes + OG) : un seul emploi visible par page suffit ; vérifier l'origine (photo de stock non confirmée, F2-3 de la passe 1 refusé, ne pas le retirer sans source).
- **F2-5 · Cartes égales de `/maison/`** (trois bouillons, trois avis) non refaites, déclarées. Correction : les trois bouillons en une ligne continue (dl horizontale), les avis en citations alternées sans cadre.

### F3 : finitions
- **F3-1** Photos 05 et 06 d'origine incertaine : signaler « illustratif » dans RAPPORT.md et au colophon.
- **F3-2** Numéros rouges autour du rouleau (« 02 » en chapeau, « 06 », « 09 » par plat) : le compteur « 01 / 12 » suffit.
- **F3-3** Nav sur le bord clair du bol (carte, 390) : dégradé sombre de 80 px sous la nav plutôt qu'un `text-shadow`.
- **F3-4** Restent non traités et déclarés : citations retouchées, définitions des bouillons, « Rankeat », puces rouges de la carte, URL de commande, canonical de la 404, 12 px.

## Ce qui est bien (à ne pas casser)
1. Le rouleau : scène épinglée, compteur, boutons, grands numéros en contour pour les plats sans photo.
2. Plan sobre honnête (rue + point + « Schéma indicatif »), sans repère inventé.
3. Technique propre : 0 erreur, 0 débordement jusqu'à 320 px, 0 violation axe, contenu fidèle au dossier.
