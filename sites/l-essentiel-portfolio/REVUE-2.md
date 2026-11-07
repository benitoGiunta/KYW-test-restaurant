# Revue portfolio · L'Essentiel · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site blanc très sobre (capitales fines, filets, façade en brique avec l'enseigne dorée) dont le seul geste animé est un dressage qui se pose médaillon par médaillon dans une assiette cernée d'un anneau laiton, autour de la carte de saison (inchangé depuis la passe 1).

Scores /10 :
- Design 7 : sobriété tenue, enseigne désormais entière (`hero.png` 1440 et 390), mais le nom « L'ESSENTIEL » du hero est tronqué dès 1536 px de large (`w1920b.png` : « L'ESSENTI »).
- Usabilité 7 : 0 débordement à 1440 et 390 (14 cas), mais la page d'accueil défile horizontalement à 768 px (scrollWidth 804) et 820 px (960).
- Créativité 6 : le geste du dressage est inchangé ; des surtitres subsistent dans 13 sections intérieures (mesure ci-dessous) et la numérotation romaine reste.
- Contenu 8 : `<title>` et `og:title` corrigés, les trois phrases de procédure retirées, faits et prix inchangés (7 pages extraites et relues contre `donnees.json` et `dossier.md`).
- Technique 8 : build OK (dist postérieur à src), 0 erreur console, 0 requête en échec, axe complet 0 violation sur 14 cas, LCP desktop 2284 ms (2 passes), mobile CPU x4 + 4G 2080 / 2092 ms, CLS 0 ; mais deux défauts de mise en page entre 768 et 1920 px.

Méthode : lecture de `REVUE-1.md`, `REVISION-1.md` et `QA-revue2.md` (3 pages sur 7, 404 brute, LCP de l'agent captures non repris) ; dist plus récent que src (aucun fichier de `src/` ou `public/` postérieur) ; serveur local sur le port 4617 (arrêté) ; script maison unique (launch, axe-core complet de `node_modules`, défilement par 300 px, débordement par éléments, console, requêtes, h1, logo, noindex, mention, JSON-LD) sur 7 pages x 1440/390 ; extraction du texte des 7 pages ; captures de haut de page (sans défilement préalable) et de milieu de page 7 pages x 2 largeurs ; scripts ciblés : LCP/CLS/loader (CDP), largeurs 360, 600, 700, 768, 820, 900, 1024, 1280 à 2560, reduced-motion, Tab.

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constaté |
|---|---|---|
| F1-1 | titre par défaut changé | confirmé : `<title>` et `og:title` de l'accueil « L'Essentiel \| Table gastronomique à Temploux » ; « menu unique » n'apparaît plus que dans « menu uniquement » (règle des six couverts, texte du dossier) |
| F1-2 | `aria: 'none'` | confirmé : 0 `aria-label` sur `p`/`h1`/`h2` (7 pages x 2 largeurs), axe 0 violation |
| F2-1 | landmarks | confirmé : 1 seul `<footer>` par page, 1 logo `.kyw-footer__logo`, axe complet 0 violation (dont `region` et `landmark-no-duplicate-contentinfo`) sur 14 cas ; `aside` « Accès rapides » : cibles 72 x 171 et 132 x 44 px |
| F2-2 | surtitres retirés | **partiel** : retirés en haut des 5 pages intérieures et de la 404, mais voir F2-2bis |
| F2-3 | enseigne entière | confirmé à 1440, 390, 360, 1024, 1920 (`hero.png`, `p-w.png`) ; mais le recadrage 5/6 n'a pas résolu la largeur de la colonne de texte, voir F1-3 |
| F2-4 | procédures retirées | confirmé : 0 occurrence de « choisissez l'ambiance », « pour un groupe », « appelez le restaurant », « une table, une ambiance » ; « Du mercredi au samedi, midi et soir » en place. La phrase « Réservation sur le site du restaurant, ou par téléphone » est prouvée (`donnees.json` ligne 230) |
| F2-5 | LCP desktop | confirmé : 2284 ms aux deux passes (2592 avant) ; le loader finit à 2,24 s (limite 2,6 s) |

## Findings

### F0 (bloquant) : aucun
Build OK, 0 fait faux, 0 invention non marquée, mention, logo et `noindex, nofollow` (conforme au prompt de production) sur les 7 pages.

### F1 (majeur)
- **F1-3 · nom du restaurant tronqué dans le hero dès 1536 px de large.** Preuve : `w1920b.png` (1920 x 1080) lit « L'ESSENTI » ; mesure de `Range.getBoundingClientRect()` sur le `h1` : 1440 px boîte 397 / texte 409 ; 1536 px boîte 389 / texte 429 ; 1680 à 2560 px boîte 370-378 / texte 452 (deux passes identiques, polices `loaded`). Cause : `.hero__texte { max-width: 30rem; padding-right: var(--marge) }` (`src/styles/base.css:79`) laisse 370 px au `h1` de 72 px, et le masque de lignes de SplitText coupe le débordement. Défaut préexistant (la passe 1 ne mesurait que 1440) mais visible sur la capture 1920 et sur tout grand écran. Correction : `max-width` de `.hero__texte` à au moins 36rem (ou `padding-right` réduit), ou `font-size` du `h1` borné pour que 11 caractères tiennent dans 370 px ; remesurer boîte >= texte à 1440, 1536, 1920 et 2560.

### F2 (mineur)
- **F2-6 · débordement horizontal de l'accueil à 768 et 820 px.** Preuve : scrollWidth 804 à 768 px et 960 à 820 px (0 à 600, 700, 900, 1024, 1280 et plus ; autres pages à 0) ; `window.scrollTo(300, …)` donne `scrollX` = 36 à 768 px ; `.dressage__scene` (grille à une colonne de 774 px dans une fenêtre de 768) élargie par la ligne de légende « Mignon de biche · Pomme Dauphine illustratif · Croquette illustratif… » (capture `w768-dressage.png` : légende coupée à droite, titre du plat décalé). `overflow-x: clip` sur `body` ne retient pas le défilement (`html` en `visible`). Correction : `grid-template-columns: minmax(0, 1fr)` sur `.dressage__scene` et retour à la ligne (`flex-wrap`) de la légende entre 700 et 900 px ; remesurer `scrollWidth` = largeur à 768 et 820 px.
- **F2-2bis · surtitres encore présents dans 13 sections.** Preuve (mesure du petit texte juste au-dessus d'un h1/h2) : `/menu/` « Fromages et dessert > Pour finir », « À votre table > Les règles de la carte » ; `/carte/` « Le midi, en semaine », « Le soir comme le midi » x2, « À la carte », « Accords » ; `/maison/` « L'équipe > À l'accueil », « Plusieurs ambiances » ; `/chambres/` « Les chambres > Tilleul, Ardoise… », « Tarifs > Par nuit » ; `/reservation/` « Services > Du mercredi au samedi », « Fermetures annuelles > Dates à retenir », « Votre demande ». La révision en gardait quatre ; ceux qui redisent le titre (Tarifs/Par nuit, Services/Du mercredi au samedi, Les chambres/Tilleul…, Accords/Au verre, À votre table/Les règles) n'apportent rien. Correction : les retirer ; garder ceux qui informent (« Le midi, en semaine », « Le soir comme le midi », « Première assiette »).

### F3 (finition, non traités ; inchangés depuis la passe 1)
- F3-1 slugs inversés (`/menu/` = « La carte », `/carte/` = « Menus »).
- F3-2 `/chambres/` : « Ardoise, Chambre double, douche à l'italienne » attribue un équipement propre non prouvé.
- F3-3 dressage petit sur 1440 (assiette environ 230 px à 768, `w768-dressage.png`), grands blancs.
- F3-4 chiffres romains I à V devant chaque plat (accueil et `/menu/`).
- F3-5 même photo brique et chaises utilisée sur l'accueil, `/maison/` et `/carte/`.
- F3-6 espace ordinaire avant « : » (« La carte : deux assiettes », octets `20 3a`) ; apostrophes droites partout.
- F3-7 loader sous contrainte (CPU x4, 4G lente) : `is-loaded` à 4,6 s ; la mesure LCP (2,08 s) est flatteuse car l'image se peint sous le loader. Desktop 2,24 s, conforme. À surveiller, pas à corriger en priorité.

## Contrôles sans écart (pour ne pas les rouvrir)
- 14 cas (7 pages x 1440/390) : 0 erreur console, 0 requête en échec, 0 débordement, 1 `h1`, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives. », 1 logo KYW, JSON-LD `Restaurant` (adresse, 8 plages d'horaires, téléphone), titres et descriptions uniques.
- 11 URL internes (7 pages, `robots.txt`, `sitemap-index.xml`, `favicon.svg`, `og.jpg`) à 200 ; liens externes conformes au dossier (Michelin, DH, Facebook, Instagram, lessentiel.be, OpenStreetMap, `mailto`, `tel`).
- Tab : lien d'évitement en premier arrêt, contour 2 px visible sur les 14 premiers arrêts ; reduced-motion : un seul nœud à opacité 0 (pastille « Réserver » masquée en bas de `/menu/`, comportement voulu), loader masqué.
- Hero mobile 390 et 360 : composition conservée, 0 débordement.

## Ce qui est bien (à ne pas casser)
1. L'enseigne dorée entière en hero, photo forte, cadre 5/6 propre de 360 à 1920 px.
2. Le texte relu : plats, prix, horaires, fermetures conformes ; plus de procédure inventée ; composants du dressage marqués « illustratif ».
3. Pied de page et landmarks : un seul `<footer>`, `aside` « Accès rapides », axe à 0 sur toutes les pages.
