# Revue portfolio · Les Terrasses de Crupet · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une guinguette de village en crème, vert sapin et cuivre, avec des pictogrammes au trait (parasol, frites, verre, bouteille) et des photos en tirages à cadre blanc posés de travers ; le héros est un grand titre serif posé, la carte complète est sur l'accueil.

Méthode : `dist/` (04:33) et `src/` ont été extraits ensemble du dépôt (écart de 0,07 s) ; vérifié par grep que le `dist/` contient bien les corrections annoncées. QA-revue2.md (3 pages sur 7, sa « 404 » est la réponse brute de `serve.mjs`) n'a pas été jugé suffisant : j'ai mesuré moi-même les 7 pages (dont le vrai `404.html`) à 1440 et 390 px, serveur propre sur le port 4781 (arrêté par `kill`) : axe-core complet de `node_modules`, console, requêtes, débordement, cibles < 24 px, balises, JSON-LD, 125 liens internes et assets contre les fichiers du `dist/`. Puis : LCP/CLS mobile sous CPU x4 + 4G lente (2 passes, 3 pages), 6 horloges `page.clock.install`, captures 390/768/1440, polices réellement utilisées (`CSS.getPlatformFontsForNode`), `prefers-reduced-motion`.

Scores /10
- Design 7,5 : même identité qu'en passe 1, parasol sorti du titre à 390 px (`rev2-manif-390.png`), mais le sous-titre « hors du temps » du héros est maintenant rendu en police système (F2-1) et jure avec « Un moment » en Zodiak.
- Usabilité 8 : 0 débordement sur 14 cas, 0 cible < 24 px, 125 liens internes, 0 mort, état ouvert/fermé juste sur 6 horloges sur 6 (libellé « service jusqu'à » corrigé).
- Créativité 7 : inchangée (tirages, pictos, avis posés autour du mot « Avis ») ; reste proche du gabarit guinguette.
- Contenu 7,5 : titre « Brasserie », avis marqués illustratifs sans étoiles, procédure inventée retirée, note méta retirée ; restent une phrase identique sur deux pages, des déductions de photos (F3) et des pastilles génériques.
- Technique 8 : 0 erreur console, 0 requête en échec, LCP mobile accueil 2,2 s (2216 et 2180 ms, avant 3,8 s), CLS 0,003, noindex, `lang="fr"`, JSON-LD `Restaurant` (adresse, 14 plages horaires, téléphone), 0 image > 300 Ko ; un seul reste axe (`region`, F2-2) et le défaut de police du héros.

## Vérification des corrections annoncées par REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 LCP mobile | **OK** | 2216 / 2180 ms (CPU x4, 4G lente), élément `img photos/xs/facade-ete.webp` (72 Ko), CLS 0,0032 ; `fetchpriority="high"`, `srcset` 480w/798w, aucun asset absent. Carte et réservation 1,03 à 1,09 s. La baisse du CLS est réelle (0,003, sources `SPAN`, `::after` du marquee). Réserves : F2-1 (coût visuel du `optional`) et F3-1 (`sizes`). |
| F1-2 parasol sur le titre | **OK** | 390 px : les `.obj` du manifeste sont `display:none`, `rev2-manif-390.png` propre ; 768 et 1440 px : le parasol et le verre restent de part et d'autre du titre centré (`rev2-manif-768.png`, `rev2-manif-1440.png`), aucun recouvrement du texte (les boîtes se touchent, pas les glyphes). |
| F2-1 titre « Bistronomie » | **OK** | `<title>` accueil : « Les Terrasses de Crupet \| Brasserie à Crupet (Assesse) » ; grep `dist` : 0 « bistronomie ». |
| F2-2 faux avis | **OK** | titre « Exemples d’avis (illustratifs) », 4 étiquettes « Exemple d’avis, texte illustratif », 0 étoile, 0 « Ils en parlent » (`rev2-avis.png`). Le titre est petit (eyebrow) mais lisible. |
| F2-3 procédure emporter | **OK** | « Renseignements : +32 83 655 111 », 0 « Pour commander ». |
| F2-4 « arrivée jusqu'à » | **OK** | horloges : lun 13:00 « Ouvert, service jusqu'à 14:00 », sam 19:00 « … 22:00 », mar 21:59 « … 22:00 », lun 15:00 « ouverture à 18:00 », mer 10:00 « ouverture à 12:00 ». |
| F2-5 note méta + bouton | **OK** | 0 « ne sont pas documentés » ; bouton « La maison » ; page La maison propre. |
| F2-6 répétitions | **PARTIEL** | « fera bon » : 1 seule occurrence visible (manifeste) + la description meta du client ; le paragraphe « La carte fait la part belle… » n'est plus recopié sur l'accueil. Reste : « Les Terrasses de Crupet est une brasserie au cœur du village de Crupet, dans la commune d’Assesse. » mot pour mot sur l'accueil et sur La maison (F3-2). |
| F2-7 axe contentinfo/region | **PARTIEL** | 1 seul `<footer>` par page, `landmark-no-duplicate-contentinfo` disparu sur 14 cas. Mais axe complet (annoncé « non relancé » par la révision) garde `region` (moderate, 1 nœud `.marquee`) sur 14 cas sur 14 : le bandeau d'état est hors de tout repère (F2-2). Plus aucune violation sur le vrai `404.html` en dehors de cette ligne. |
| F3-3 apostrophes | **PARTIEL, comme annoncé** | reste une apostrophe droite dans le texte visible hors données : `terrasse.astro:50` « C'est la saison… » (F3-4). |

## Findings (par gravité)
Aucun F0 ni F1 : build OK (QA : exit 0), 0 fait faux, 0 invention non marquée, 0 débordement, 0 violation axe critique ou sérieuse, 0 erreur console, 0 lien mort, mention + logo + noindex présents sur 7 pages sur 7.

### F2 mineurs
- **F2-1 · Hero : « hors du temps » rendu en police système depuis la révision.** `layouts/Base.astro:35-38` : tous les `@font-face` passent en `font-display: optional` mais seules 3 faces sur 6 sont préchargées (`zodiak-700-normal`, `zodiak-400-italic`, `satoshi-500-normal`). `.hero__titre .l2 { font-weight: 400 }` (`styles/base.css:95`) demande `zodiak-400-normal`, non préchargée : avec `optional`, la face arrive après la fenêtre de blocage et le navigateur garde la police de repli pour toute la vue. Preuve : `CSS.getPlatformFontsForNode` sur `h1 span.l2` = « Liberation Serif (SYSTEM) », 13 glyphes, aux 3 chargements consécutifs (froid, puis cache chaud) à 1440 px ; capture `rev2-chaud-1440.png` : « Un moment » en Zodiak gras, « hors du temps » en Times maigre. Même cause probable pour les citations d'avis (`rev2-avis.png`, rendu Times). `document.fonts` annonce `loaded`, donc ni axe ni shoot ne le voient. Sur Windows ou macOS le repli sera Georgia ou Times New Roman : la ligne sera aussi incohérente. Correction : précharger `zodiak-400-normal.woff2` (+ `crossorigin`) ; vérifier que le LCP mobile reste < 2,5 s (le fichier se charge en parallèle de l'image) ; sinon `font-display: swap` sur cette seule face avec `size-adjust` du repli. Contrôler à nouveau par `getPlatformFontsForNode` sur h1, `.l2`, citations et légendes.
- **F2-2 · Axe `region` (moderate) sur toutes les pages.** `components/Marquee.astro:8` : `<div class="marquee" aria-label="État du restaurant">` est posé hors `<header>`/`<main>`/`<footer>`. Mesure : 14 cas sur 14, 1 nœud chacun. Correction : le mettre dans un repère (`role="region"` avec son `aria-label`, ou l'inclure dans le `<header>`), ou le laisser et le noter comme décoratif si le bandeau est `aria-hidden` partout (ce n'est pas le cas : le texte d'état est lu).

### F3 finition
- **F3-1 · `sizes` mensonger sur la photo de façade (mobile).** `pages/index.astro:41` : `sizes="(max-width: 767px) 40vw, 600px"` alors que l'image est affichée à 328 x 328 px à 390 px (84 vw). Mesuré : à 390 px le navigateur prend le fichier 480 px (densité effective 1,46) même à 2x ou 3x. Correction : `sizes="(max-width: 767px) 84vw, 600px"` et une variante intermédiaire de 640 px (~110 Ko) pour garder le LCP sous 2,5 s.
- **F3-2 · Phrase identique sur deux pages.** « Les Terrasses de Crupet est une brasserie au cœur du village de Crupet, dans la commune d’Assesse. » (accueil, bloc « Le village, la table », et La maison, bloc « Une brasserie de village »). Varier l'une des deux (carbonnade, chalet, enfants).
- **F3-3 · Déductions de photos restées affirmées (ancien F3-5, non traité).** `pages/terrasse.astro:28` « Les longues tables… devant la façade, au bord de la rue Basse », `:50` « tout en bois » et « C'est la saison des fondues » : absents de `dossier.md` et `donnees.json` (grep : « longues », « tout en bois », « caquelon » : 0). Adoucir (« Dehors, sous la toile », supprimer « tout en bois »), ou garder la fondue comme sujet de la photo.
- **F3-4 · Apostrophes droites.** `terrasse.astro:50` « C'est » ; `<title>` de Terrasse (« d&#39;hiver ») ; la carte et la planche de l'accueil gardent « d'abbaye », « L'AIL » (données copiées de `donnees.json`, acceptable, mais l'affichage reste mixte avec « ’ » ailleurs).
- **F3-5 · Pastilles jaunes génériques (ancien F3-2, non traité).** `pages/histoire.astro:42`, `rev2-histoire.png` : « Convivialité », « Service attentionné », « Produits de qualité » sur une grande surface vide, jaune hors palette.
- **F3-6 · « Scampis à la diable (6 pièces) » (ancien F3-4, non traité).** espace ordinaire avant « (6 pièces) » : la parenthèse se coupe sur deux lignes à 390 px.
- **F3-7 · Libellé du dimanche soir.** dim 23:00 : « Fermé aujourd'hui, prochain service lundi à 12:00 » alors que le dimanche est ouvert 12-14 / 18-22 ; préférer « Fermé en ce moment, ouverture lundi à 12:00 ».

## Vérifications faites (sans écart)
- Faits : adresse Rue Basse 13, 5330 Crupet (Assesse), +32 83 655 111, Zenchef, Facebook, Instagram, horaires 12-14 / 18-22 sept jours, menus de fêtes 37 à 69 € (retrait 24 et 31 décembre, 10h-15h) : identiques à la passe 1 et au `dist/` actuel ; JSON-LD `Restaurant` avec 14 plages horaires ; description meta fidèle au dossier.
- Pied de page : 1 logo `.kyw-footer__logo`, mention « Maquette KYW, certaines données sont illustratives », `noindex, nofollow` sur 7 pages sur 7 ; 1 `<h1>` par page ; 0 tiret cadratin ; 0 tutoiement dans le texte extrait.
- Reduced-motion à 390 px : seul le mot décoratif « Avis » est atténué, tout le contenu est visible.
- Cibles : 0 lien ou bouton < 24 px sur 14 cas ; défilement horizontal : 0 (le `marquee__piste` hors fenêtre est le bandeau défilant, faux positif connu).

## Ce qui est bien (à ne pas casser à la révision)
1. Le LCP mobile de l'accueil à 2,2 s et le CLS à 0,003 : garder l'image `xs` en `fetchpriority="high"` ; toute correction de polices doit se re-mesurer sous CPU x4 + 4G.
2. La rigueur des données : carte, horaires, JSON-LD, état d'ouverture calculé juste sur 6 horloges, 0 date en dur, `404.html` propre.
3. La composition mobile (390 px) : héros sans parasol sur le titre, CTA pleine largeur, barre d'onglets fixe, aucun débordement.
