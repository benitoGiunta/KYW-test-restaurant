# DESIGN.md : Wok de Jin, variante awwwards « La semaine à volonté »

Stack : Astro 5 (ClientRouter), GSAP, Lenis, engine verbatim du socle (copié de le-royal-awwwards). Pas d'OGL : aucun GL, motivé ci-dessous.

## Brief
- Sujet : Wok de Jin, buffet asiatique à volonté (wok, sushis, teppanyaki, fruits de mer, desserts), avenue du Bourgmestre Jean Materne 219, Jambes (Namur). Tel 081 30 68 88. Ouvert 12 h à 14 h et 18 h à 22 h 30, fermé le mardi.
- Publics : familles et grandes tablées (midi et soir de week-end), collègues du midi (16,80 €), couples et amis du soir, anniversaires, réveillon du 31/12/2026 (80 €).
- Métier du site : savoir quand venir et combien ça coûte (3 s), réserver (tel ou en ligne), voir ce qu'il y a au buffet.
- Ressources : 22 photos réelles (visages des photos 10 et 11 écartés, droit à l'image à confirmer), logo rond. Inconnus : e-mail, réseaux, avis, histoire, parking : non affichés.
- Contraintes : statique, `base` /wok-de-jin/awwwards/, noindex, pied KYW, pas de backend de réservation.
- Hypothèses : voir ETAT.md (correspondance jour/tarif, téléphone, lien de réservation).

## Trois concepts
| | A. Matière : le bol composé (territoire 4, process) | B. Formel : la semaine à volonté (territoire 5) | C. Identité : « le second passage » (territoire 1) |
|---|---|---|---|
| Phrase | Le site se compose comme un bol, on y pose des ingrédients | Le site est le planning des services : sept jours, deux services, un prix par case | Chaque section est un passage au buffet, le compteur de reprises monte |
| Règle de mise en page | colonnes de bacs | grille 7 jours, cases de 3 tons de prix | sections numérotées en passages |
| Verbe | poser | se servir (une case se remplit comme un bol) | reprendre |
| Ancre | le wok/teppanyaki composé devant le client | 3 tarifs réels + mardi fermé + deux services | « à volonté » |
| Originalité / adéquation / faisabilité / portabilité | 3 / 4 / 3 / 3 | 4 / 5 / 5 / 2 | 3 / 3 / 4 / 4 |
Test de l'échange : A et C tiennent avec n'importe quel buffet ou tapas. B ne tient qu'avec ce restaurant : ses trois prix, ses deux services, son mardi fermé. B retenu (total 16 contre 13 et 14). De A on garde un détail : « Vous composez, ils cuisent » au titre de la section wok ; de C : la reprise dans le texte (« on revient »). A (« mise en place ») frôle l'interdit : il n'est pas retenu.

## Concept Card
- Idée : le site est le planning des services de Wok de Jin, une semaine de cases dont chacune porte son prix, et on lit quand venir avant de lire quoi manger.
- Métaphore : le tableau de service affiché en cuisine, 7 jours, midi et soir, une case par service.
- Signature (et recette) : la grille de la semaine, `.jour`/`.case` ; en phase 2 les cases « se servent » une à une (stagger de remplissage par `scaleY`, motion.md « Scroll-scrubbed timeline » simplifiée en reveal) et la case du service en cours s'allume (heure Europe/Brussels par `Intl.DateTimeFormat`, motion.md « Idle state » pour sa respiration).
- Émotion (3 premières secondes) : c'est copieux, c'est clair, voilà le prix : « À volonté » en lettres de poids, trois prix sous la photo.
- Verbe : se servir (les formes montent de bas en haut comme un bol qui se remplit ; boutons, rideau et cases partagent ce geste).
- Capture : la semaine en or, rouge et noir, la case du jour allumée, le mardi hachuré.
- Ancre : les tarifs midi 16,80 €, soir 23,80 €, week-end 27,80 €, les services 12 h à 14 h et 18 h à 22 h 30, le mardi fermé.
- Théâtre : loader non (restaurant familial, l'info doit être là en 3 s, un loader retarderait l'appel) ; GL non (la photo réelle du buffet porte la matière, la grille porte la signature, 0 Ko de shader).

Le concept tient jusqu'au pied (« Mardi, on éteint. » + semaine en 7 pastilles dont le mardi hachuré), à la carte (trois prix par service, comptoirs), à la réservation (horaires en liste de la semaine) et à la 404 (« Case fermée. », le mardi du planning).

## Système
Palette (références réelles : laque cinabre chinoise, noir de fumée des laques, or des plaques chauffantes de buffet) :
- ground `#a3201c` cinabre des chaises de la salle, ink `#fff3df` papier de riz (6,9:1), muted `#f2c9b8` (5,0:1), line `#cf6358`, accent `#f3b63a` or (4,2:1 sur ground, 11:1 sur noir : surfaces, focus et gros textes), curtain et sections nuit `#170d0b`, texte nuit `#f6e9d2`, muted nuit `#d8bfae`.
- Défaut n° 1 (crème + serif + terracotta) évité : ground rouge saturé, display condensé sans empattement. Pas d'acide sur noir (or chaud), pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique (`.lib` seulement sur 5 sections), pas de 01/02/03.

Typo : Tanker (display, 400, condensé de poids, capitales, interlettrage -0,01 em, interligne 0,88 à 0,92) et Switzer (texte 400, UI 600), toutes deux Fontshare. 3 fichiers, 2 préchargés. Échelle `--t-mega` 5,5 à 17 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 17 px, `--t-s`, `--t-xs`. Prix en Tanker `tabular-nums`, insécables « 24 € » et « 12 h 30 », apostrophes courbes.

Grille : 12 colonnes, gouttière fluide 16 à 40 px, lignes fortes à la colonne 1 (alignement des titres) et à la colonne 7 (début des textes), humeurs d'espacement `--serre`, `--normal`, `--aere`. Rayon : 0 (cases carrées, comme des plaques de buffet). Cadre quatre coins : non, justifié : la grille de cases porte la structure.

Mouvement (phase 2) : ease `ease.out` pour les révélations, `ease.inOut` pour le rideau ; rideau en deux volets (noir, cinabre) qui montent. Hovers : CTA = remplissage or qui monte (fait en CSS), nav = soulignement qui se dessine (fait), liens texte = épaisseur du soulignement (fait), images : aucun. Repos : la case du service en cours respire (phase 2).

Plan de composition (familles distinctes) :
- Accueil : poster (titre + photo + 3 prix), données (la semaine), index (comptoirs), paire asymétrique (wok), média plein cadre + liste (salle et famille), statement (réveillon), pied.
- Carte : poster texte, paires décalées (5 comptoirs), données (tarifs en 4 fiches), CTA.
- La maison : poster texte, mur asymétrique (2 photos), paire inversée (famille), paire (buffet).
- Réservation : poster texte avec téléphone géant, données (horaires + accès), statement (réveillon), fiches.
Mobile 390 px : titre recalculé en `vw`, photo 4:3 sous le titre, la semaine se retourne (un jour par ligne, midi et soir côte à côte, mardi hachuré sur deux colonnes), comptoirs sans vignette, familles empilées.

Test de généricité : un modèle générique ferait un hero noir et or avec lanternes et caractères chinois, un menu à onglets et un caroussel de salle. Changé : ground rouge plein, aucun caractère chinois décoratif ni lanterne, semaine en grille de prix, mardi fermé comme élément de design.

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé : ni solde courant, ni braise, ni mise en place retenue.
3. [x] Concept Card exacte, verbe « se servir » compris.
4. [x] Concept au pied (`Footer.astro`, pastilles de semaine), carte (`carte.astro`, fiches de prix), réservation (`reservation.astro`, horaires), 404 (`404.astro` « Case fermée. »).
5. [x] Moment signature : la grille de la semaine (`Semaine.astro`), recette en phase 2 (cases qui se servent, case en cours allumée).
6. [x] Palette 6 rôles, références réelles : § Système et `tokens.css:11-21`.
7. [x] Aucun des 8 « defaults to avoid » : § Système.
8. [x] Test de généricité : ci-dessus.
9. [ ] Détails 7 vers 8 : favicon de l'identité fait (`public/favicon.svg`), sélection `::selection` or (`site.css`), focus or (`:focus-visible`), 404 dans le concept ; OG composée et pied final : OG provisoire (photo + aplat), à composer en phase 3.
10. [x] Polices : Tanker + Switzer, `public/fonts/` (3 fichiers, 2 préchargés dans `Base.astro`).
11. [x] Échelle fluide unique `tokens.css`, grands sauts (mega 17 rem, texte 1 rem).
12. [x] Display réglé : `.display` dans `site.css` (interlettrage négatif, interligne 0,92, balance).
13. [x] Corps 16 à 17 px, interligne 1,55, mesure 38 rem ; UI 13 à 14 px.
14. [x] Typographie française : insécables dans `site.ts` (`heure`, `prix`), apostrophes courbes, aucun tiret cadratin (contrôle ci-dessous).
15. [x] Grille 12 colonnes, lignes fortes cols 1 et 7 ; pas de cadre quatre coins (justifié).
16. [x] Famille de section au plus une fois par page : mesuré à la composition (voir plan).
17. [x] Hero en 3 s : nom, cuisine, action et 3 prix visibles à 1440×900 (mesure : CTA bas à 770 px).
18. [x] Mobile 390 recomposé : `site.css` § Téléphone ; mesure `scrollWidth` = 390 à 390 et 360.
