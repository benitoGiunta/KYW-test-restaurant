# Revue portfolio · L'Essentiel · passe 3
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site blanc très sobre (capitales fines, filets, façade en brique avec l'enseigne dorée) dont le seul geste animé est un dressage qui se pose médaillon par médaillon dans une assiette cernée d'un anneau laiton, autour de la carte de saison (inchangé depuis les passes 1 et 2).

Scores /10 :
- Design 8 : nom « L'ESSENTIEL » entier à 1920 et 2560 px (`rev3-hero-1920.png`), enseigne entière, sobriété tenue ; reste la répétition de la photo brique (F3-5).
- Usabilité 8 : 0 débordement sur 35 cas (7 pages x 390, 768, 820, 1440, 1920), `scrollX` reste à 0 après `scrollTo(300, 0)` à 768 et 820 px ; la pastille « Réserver » fixe frôle la ligne de légende du dressage à 768 et 820 px (F3-8).
- Créativité 6 : geste du dressage inchangé, numérotation romaine I à V toujours devant chaque plat (F3-4).
- Contenu 7 : faits, prix et horaires conformes ; une donnée d'avis porte une date en dur et une source qui ne sont pas celles du dossier, non marquée « illustratif » (F2-7).
- Technique 9 : build OK (dist postérieur à src), axe complet 0 violation sur 35 cas, 0 erreur console, 0 requête en échec, LCP desktop 2264 et 2284 ms, CLS 0, reduced-motion sans texte à l'opacité 0.

Méthode : lecture de `REVUE-2.md`, `REVISION-2.md`, `QA-revue3.md` (3 pages sur 7, 404 brute, axe sans les violations de landmarks : non repris) ; dist plus récent que src (aucun fichier de `src/` ou `public/` postérieur) ; serveur local port 4733 (arrêté par `kill`) ; script maison unique (launch, axe-core complet de `node_modules`, défilement par 500 px, débordement par éléments, console, requêtes, h1, logo, noindex, mention, `aria-label` sur p/h1/h2, alt, JSON-LD, mesure `Range` du h1) sur 7 pages x 5 largeurs ; script ciblé (h1 à 390, 768, 820, 1024, 1536, 1920, 2560 ; dressage à 768 et 820 ; reduced-motion ; LCP/CLS CDP, deux passes desktop et deux passes mobile CPU x4 + 4G) ; extraction du texte des 7 pages et confrontation à `donnees.json` et `dossier.md`.

## Vérification des corrections annoncées (REVISION-2)
| id | annoncé | constaté |
|---|---|---|
| F0 | rien à faire | confirmé : aucun bloquant |
| F1-3 nom tronqué | `.hero__texte` max-width 36rem | **confirmé** : boîte du `h1` = texte à 390 (358), 768 (709), 820 (753), 1024 (357), 1536 (485), 1920 (466), 2560 (466) ; capture `rev3-hero-1920.png` : « L'ESSENTIEL » entier, une seule ligne visuelle |
| F2-6 débordement 768/820 | `.dressage__scene` à `minmax(0, 1fr)` | **confirmé** : scrollWidth 768 à 768 px et 820 à 820 px, colonne de la scène 709 et 753 px, 0 élément hors fenêtre, `scrollX` = 0 après `scrollTo(300, 0)` ; légende lisible sur `rev3-dress-768.png` et `rev3-dress-820.png` |
| F2-2bis surtitres | retirés dans carte, chambres, maison, menu, réservation | **confirmé** : mesure des `.petite-cap` hors pied de page à 1440 : accueil « Table gastronomique, Temploux », « Première assiette », « Deuxième assiette » ; menu « Première/Deuxième assiette » ; carte « Le midi, en semaine », « Le soir comme le midi » x2 ; maison « Temploux, XVIIe siècle » ; réservation « Votre demande » ; chambres aucun. Conforme à la liste « gardés » de la révision ; la carte « Carte : les deux assiettes » n'a plus de surtitre (test `moments[i] &&`) |

## Findings

### F0 (bloquant) : aucun
Build OK, 0 fait faux, mention « Maquette KYW, certaines données sont illustratives. » et logo (`.kyw-footer__logo` x1, un seul `<footer>`) et `noindex, nofollow` (conforme au prompt de production) sur les 7 pages.

### F1 (majeur) : aucun

### F2 (mineur)
- **F2-7 · avis Google : date en dur et source non prouvée, non marqués illustratifs.** Preuve : `src/data/site.ts:212` `{ texte: nb('4,8/5 sur plus de 1 000 avis Google'), source: 'Google, note relevée le 7 novembre 2026', placeholder: false }` ; rendu sur l'accueil (« 4,8/5 sur plus de 1 000 avis Google · Google, note relevée le 7 novembre 2026 »). Le dossier (`dossier.md:19`) donne « Google 4,8/5 : 1 052 avis (Rankeat) ou 1 039 (enprimeurclub), à confirmer » ; la note ne vient donc pas d'une lecture de Google par l'équipe, et la date « 7 novembre 2026 » n'est dans aucune donnée du client (c'est la date de la carte, `donnees.json:187`). Contraire à la règle « aucune date en dur dans un gabarit » et « avis : null sauf affichage par le site client ». Correction : source « Google, note d'après des annuaires tiers » ou retirer la date, et `placeholder: true` (le composant affiche alors « illustratif ») ; ou retirer la ligne.

### F3 (finition, non traités ; inchangés depuis la passe 1)
- F3-1 slugs inversés (`/menu/` = « La carte », `/carte/` = « Menus »).
- F3-2 `/chambres/` : « Ardoise, Chambre double, douche à l'italienne » attribue un équipement propre non prouvé.
- F3-3 dressage petit (assiette environ 230 px à 768, `rev3-dress-768.png`), grands blancs au-dessus et en dessous.
- F3-4 chiffres romains I à V devant chaque plat (accueil et `/menu/`).
- F3-5 même photo brique et chaises sur l'accueil, `/maison/` et `/carte/`.
- F3-6 espace ordinaire avant « : » (« La carte : deux assiettes », « Carte : les deux assiettes ») ; apostrophes droites partout.
- F3-7 loader sous contrainte (CPU x4, 4G lente) : `is-loaded` à 4,4 s (deux passes : 4398 et 4454 ms) ; desktop 2,27 s, conforme (< 2,6 s). LCP mobile 1252 et 1260 ms, flatteur car l'image se peint sous le loader.
- F3-8 (nouveau) à 768 et 820 px, pendant le dressage, la pastille « Réserver » fixe recouvre le bord de la légende (« Croquette illustratif » touche la pastille, `rev3-dress-768.png`, `rev3-dress-820.png`) ; remonter la légende ou réserver une marge droite sous 900 px.

## Contrôles sans écart (pour ne pas les rouvrir)
- 35 cas (7 pages x 390, 768, 820, 1440, 1920) : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth, body, éléments hors fenêtre), 1 `h1` (hors 404 : h1 présent dans `404.html`), `lang="fr"`, 0 `aria-label` sur p/h1/h2, 0 image sans alt ou cassée, JSON-LD présent sur les 6 pages de contenu, axe complet 0 violation ; 6 types d'alertes « contraste à vérifier » d'axe, toutes sur textes en reveal (non notées, cf. leçons).
- 11 URL (7 pages, `robots.txt`, `sitemap-index.xml`, `favicon.svg`, `og.jpg`) à 200 ; liens internes préfixés `/l-essentiel/portfolio/` ; `<title>` uniques sur les 7 pages.
- Textes : 0 tiret cadratin, 0 tutoiement ; prix 50, 72, 90, 14, 75, accords 30/35/38/45/48/58 présents dans `donnees.json` ; adresse, téléphone, e-mail, horaires conformes.
- Reduced-motion : 0 nœud de texte à l'opacité 0, loader levé.
- Le « 404 sans h1 » de `audit.mjs` est un faux positif (`404.html` porte un `h1`).

## Ce qui est bien (à ne pas casser)
1. L'enseigne dorée entière en hero, nom lisible du mobile à 2560 px, cadre 5/6 propre.
2. Le texte relu : plats, prix, horaires, fermetures conformes ; composants du dressage marqués « illustratif » ; plus de surtitre redondant.
3. Technique : un seul `<footer>`, axe à 0 sur toutes les pages, 0 débordement de 390 à 1920 px, LCP desktop 2,27 s.
