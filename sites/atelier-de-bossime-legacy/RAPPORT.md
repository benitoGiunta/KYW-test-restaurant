# L’Atelier de Bossimé · variante legacy · 31/10/2026

## Approche conservée vs site d'origine
| | Site d’origine | Variante legacy |
| --- | --- | --- |
| Type | multi-pages E-net (accueil one-page + carte, cuisine, réservation, contact ; salle, agenda, news, jobs) | 5 pages (même rôle, slugs courts) ; les pages non capturées liées sur le site actuel |
| Hero | slider photo plein cadre (assiette), carte crème à gauche avec logo, accroche, « Réservez une table », bandeau cookies par-dessus | Poster en `dvh` : la ferme en plein cadre, carte de papier en bas à gauche (titre, phrase, un primaire + un lien) |
| Nav | barre utilitaire + logo à gauche, six liens à droite | edge-aligned sticky : logo, trois destinations réelles, « Réserver » ; menu Popover sous 60rem ; barre « Réserver / Appeler » au téléphone |
| Accueil | 3 vignettes (×2), chèques-cadeaux, logos, texte SEO, bande « Menu à votre choix », engagement, news, club, 4 valeurs en icônes, avis E-net | index de 4 portes, Switcher midi/soir sur champ outremer, salle pleine largeur, engagement en livre de jour, clôture horaires + adresse + réservation |
| Carte | six onglets avec prix | table ledger des six formules (ancres `#onglet_*` gardées), boissons, groupes 60/120/10 |
| Réservation | iframe Zenchef + liste d’étapes en texte | Counter : Zenchef chargé à la demande + lien direct, quatre étapes, horaires |
| Contact | carte Leaflet, formulaire 7 champs, coordonnées en vrac | formulaire 7 champs honnête, coordonnées + horaires, accès / PMR / chiens en rangs, lien OpenStreetMap |
| Animations | slider auto, parallaxe, barre de partage fixe | aucune (Vellum still) |
| Footer | quatre colonnes + mentions E-net | colophon block + `KywFooter` |
Dérogations : slider → photo fixe (18) ; parallaxe et texte caché → aucun mouvement (62) ; vignettes → index de rangs (3, 8, 63) ; icônes de valeurs → table (3) ; avis E-net retiré (46a) ; club privé retiré (85) ; Leaflet → lien OSM ; onglets de la carte → table (ancres conservées).

## Axes d’amélioration traités (depuis AUDIT.md)
1. Cookies, slider, partage retirés → titre, phrase et action visibles à 1280x800 · preuve : `.hallmark/shots/localhost-4431-atelier-de-bossime-legacy-1280x800.png`, 44b muet.
2. Un système (Vellum) → 0 littéral couleur hors tokens, titres de section 52 px · preuve : `src/styles/tokens.css`, 48/78 muets.
3. Horaires en table, une fois par page, jour courant · preuve : `src/components/Horaires.astro`.
4. Carte en livre de jour, lisible au téléphone · preuve : `src/pages/notre-carte.astro`, capture `notre-carte-375.png`.
5. Focus, contrôles, gouttières, overflow · preuve : 26a, 39b, 72, 34 muets.
6. Copie coupée, coquilles corrigées · preuve : stamp `reworded`, NOTE 58 seulement sur les tables.
Non traités (matériel manquant) : heure de fermeture (non affichée), noms des plats du livret, logo vectoriel, note Google.

## Résultat sloplint
Before   Floor 93 FAIL · Reflex 88 · WARN 32 (`.hallmark/before.txt`)
After    Floor 0 FAIL · Reflex 0 ouvert (waived : 8) · Finish F6, F16 answered · WARN kept et NOTE 58 dismissed (sweep 3, `src` + 5 `--url`)
Kept     comparé à la main (sloplint : « not compared », record indexé par fichier E-net, rendu par URL de dev ; lecons.md) :
         liens 26/61 gardés à destination identique (accueil, 4 pages, 6 ancres `#onglet_*`, Zenchef rid 367643, `tel:+32478137125`, chèques-cadeaux ×3, salles, agenda ×2, news, jobs, event-bossime.be, catégorie Restaurant → accueil, `#main-menu` → Popover) ; 35 consignés `dropped` (partage ×14, avis et agence ×3, légal/cookies ×3, utilitaires E-net ×4, club privé ×1, événements datés ×5, formulaires E-net ×2, Leaflet/OSM ×2, `javascript:void` ×1) ;
         champs 7/7 du formulaire de contact (objet, civilite, nom, prenom, email, telephone, message) ; 12 champs anti-spam E-net dropped ; handlers 0/13 (analytics, dropped) ; titres et figures : contenu repris, composition nouvelle.
Dropped  listés dans le stamp de `src/styles/page.css` (lignes 6 à 13)
Reworded « Réservez une table » → « Réserver une table » ; « Notre Engagement - Produits de Bouche Issus du Circuit-Court » → « Notre engagement : le circuit court » ; « Menu a votre choix à découvrir au fil du repas » → « Un menu à votre choix » ; « Notre Vision et Mission » → « Trois accents sur le E » ; coquilles « surpirse », « solgan », « chauqe », « octobre 20226 » corrigées ou retirées ; « +32 (0)0478 » → « +32 478 13 71 25 » ; « Laissez-vous surprendre par de nouvelles saveurs… » → sans points de suspension.
Render   25 captures par sweep dans `.hallmark/shots/` (1280x800, 1440x900, 1920x1080, 1440 pleine page, 375 pleine page × 5 pages) · Compare : non généré (pas de comparaison automatique, voir Kept) ; avant : `.hallmark/site-actuel/.hallmark/before/`
Build    `node scripts/build-site.mjs sites/atelier-de-bossime-legacy` OK → `dist/atelier-de-bossime/legacy/` (6 pages, noindex + kyw-footer + mention sur les 5 routes vérifiés par grep) · `pnpm index` OK

## Hero review et finish review
Aucun outil de sous-agent dans cette session : les deux reviews ont été faites par l’agent sur les captures, stampées `self`, non indépendantes.
hero-review: self · 3 findings · 3 resolved (titre sur quatre lignes à 1440 → carte 46rem, titre 15ch ; deux « Réserver une table » remplis empilés au téléphone → le primaire de la carte masqué sous 40rem, la barre porte l’action ; capture pleine page polluée par l’overlay d’erreur du serveur de dev → serveur relancé, recapture)
finish-review: self · 5 findings · 3 resolved 2 unresolved · gap : le hero mène par la ferme, l’ancien menait par une assiette
- resolved : valeurs « sans alcool » sans libellé dans la table restackée au téléphone → `data-label` ; onglet choisi rempli (F4) → cerclé ; débordement 375 de la bande « Réservez » (styles en ligne) → classes et reset mobile.
- unresolved : logo raster 270 px flou en 2x (matériel) ; la page cuisine porte cinq photos (bannière, portrait, trois assiettes), à la limite du tiers.
Ce que l’ancien site faisait mieux : il montrait une assiette dès le premier écran et donnait faim tout de suite ; ici la nourriture n’apparaît qu’au deuxième écran de /notre-cuisine et /notre-carte.

## Placeholders et faits manquants
| Élément | Où | Valeur illustrative | À remplacer par |
| --- | --- | --- | --- |
| Légendes « Tomates, fleur de bourrache, jus vert », « Canard rosé, pain maison », « Poireau grillé, herbes, galette » | /notre-cuisine, trois assiettes (`data-descriptif="true"`) | description de la photo, pas un plat de la carte du moment | le nom réel de chaque assiette |
| Légende « Volaille, carottes, sauce nappée » | /notre-carte, photo pleine largeur (`data-descriptif="true"`) | description de la photo | le nom du plat |
| Portrait | /notre-cuisine, « Ouvert à 20 ans » | photo 18, homme en tablier Bossimé, présumé Ludovic Vanackere | confirmer l’identité et légender |
| « Eau, volume à confirmer » 12 € | /notre-carte, boissons | libellé d’origine « Eau l » illisible | le volume |
| Année de fondation 2011 | /notre-cuisine | site d’origine (Mapstr dit 2010) | confirmer |
Slots texte `.fill` : 0. Aucun avis repris (le bloc E-net 4,84/5 est un module de l’agence). Données non affichées faute de source sûre : heure de fermeture (Michelin seul : 16:00 et 23:30), nombre de producteurs (40 ou 70 selon la page), toques Gault&Millau.

## Demande de matériel
- `hero` (accueil, plein cadre 1440x~830) : `14-ferme-batiment` 2000x800 ; idéal : la ferme en 3000 px de large, cadrage vertical possible pour le téléphone.
- `salle` (accueil, 1440x576) : `01-salle-service-soir` ; ok.
- `facade` (accueil, 4:5, ~530x660) : `09-facade-nuit` recadrée d’un 2000x800 ; idéal : une façade en portrait.
- `dressage` (cuisine, bannière 21:7) : `12-dressage-assiettes` ; ok.
- `portrait` (cuisine, 4:3, ~640x480) : `18-portrait-chef` 1460x600 ; idéal : portrait légendé du chef, 2000 px.
- `assiette-1..3` (cuisine, 4:5, ~410x510) : 22, 23, 24 en 1140x641 ; idéal : assiettes en portrait avec leur nom.
- `assiette` (carte, 1440x576) : `10-plat-volaille-carottes` ; ok.
- `table` (réservation, 4:5) : `05-table-brique` ; ok.
- `vitrine` (contact, bannière) : `07-vitrine-salle-jardin` ; ok.
- Logo : un SVG ou PNG 2x (le fichier actuel fait 270x88).
La photo qui changerait le plus la page : la salle ouverte sur le potager en plein jour, en grand format (3000 px), pour le hero ou la bande « La salle », qui montrerait d’un coup la ferme, la cuisine et la vue sur les jardins.

## Leçons structurelles (reportées dans agents/lecons.md)
- `sloplint --render` en dev Astro : une capture pleine page peut contenir l’overlay d’erreur Vite (« Unhandled rejection ENOENT ») laissé par une écriture de fichier pendant que le serveur tournait → relancer le serveur de dev avant le sweep et regarder la capture pleine page de l’accueil avant toute review.
- `.btn--primary` masqué au téléphone quand une barre de réservation fixe existe : sinon deux primaires identiques empilés dans le premier écran (F4 non détecté par sloplint, vu sur la capture 375).
- Une table ledger restackée en blocs au téléphone perd son `thead` : les cellules chiffrées ont besoin d’un `data-label` affiché en `::before`, sinon « 27 € » flotte sans sens.
